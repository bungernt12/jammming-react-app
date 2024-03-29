let accessToken;

const Spotify = {
  //   generateRandomString(length) {
  //     let result = "";
  //     const characters =
  //       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //     const charactersLength = characters.length;
  //     let counter = 0;
  //     while (counter < length) {
  //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //       counter += 1;
  //     }
  //     return result;
  //   },

  getAccessTokenOnLoad() {
    const ref = window.location.href;

    //check to see if the access token is actually. so apparently this function
    //returns the search term and sets the access token.

    let accessTokenMatch = ref.match(/access_token=([^&]*)/);
    let expiresInMatch = ref.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");

      //why does all this state stuff do? I think it somehow returns the search term.
      let stateInMatch = ref.match(/state=([^&]*)/);
      if (stateInMatch) {
        return stateInMatch[1];
      }
    }
    return "";
  },

  //This method checks to see if accesstoken is defined. If not, it creates an access url. this access url
  // submitted by window.location. this causes the page to reload, which triggers,
  // getaccessTokenOnLoad, which then gets the access token from the response url.
  getAccessToken(term) {
    if (accessToken) {
      return accessToken;
    }
    // This is the authorization request that the implicit flow method told me to make.
    var client_id = "a1b0e92c7a7f4ced86ef6c4a53db9561";
    var scope = "playlist-modify-public";
    var redirect_uri = "http://localhost:3000";
    // var state = this.generateRandomString(16);

    var accessUrl = "https://accounts.spotify.com/authorize";
    accessUrl += "?response_type=token";
    accessUrl += "&client_id=" + encodeURIComponent(client_id);
    accessUrl += "&scope=" + encodeURIComponent(scope);
    accessUrl += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    accessUrl += "&state=" + encodeURIComponent(term);
    window.location = accessUrl;
  },

  async search(term) {
    if (!accessToken) {
      this.getAccessToken(term);
      return [];
    }
    const url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    try {
      const response = await fetch(url, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was poopy");
      } else {
        const jsonResponse = await response.json();
        const adjustedResultsArray = jsonResponse.tracks.items.map(
          (track, index) => {
            return {
              id: index,
              songName: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
            };
          }
        );
        return adjustedResultsArray;
      }
    } catch (error) {
      console.error("Error fetching Tague data:", error);
    }
  },

  async createPlaylist(playlistName, playlistUriArray, playlistSaved) {
    if (!accessToken) {
      this.getAccessToken("");
      return;
    }

    if (!playlistName) {
      alert("Don't forget playlist name!");
      return;
    }

    if (playlistSaved) {
      alert(
        "This playlist has already been saved. Reload the page to save another."
      );
      return;
    }

    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network error, I think...");
      }
      const userInfo = await response.json();

      //post request to make playlist, then receive playlist data as a response.
      const createPlaylistFetchUrl = `https://api.spotify.com/v1/users/${userInfo.id}/playlists`;
      const responseCreatePlaylist = await fetch(createPlaylistFetchUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
        body: JSON.stringify({ name: playlistName }),
      });
      console.log("responseCreatePlaylist", responseCreatePlaylist);
      if (!responseCreatePlaylist.ok) {
        throw new Error("Failed to create playlist");
      }
      const playlistData = await responseCreatePlaylist.json();

      // post request to add tracks.
      const addTrackFetchURL = `https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`;
      const responseAddTracksRequest = await fetch(addTrackFetchURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
        body: JSON.stringify({ uris: playlistUriArray }),
      });
      console.log("responseAddTracksRequest", responseAddTracksRequest);
      if (!responseAddTracksRequest.ok) {
        throw new Error("Failed to add tracks");
      }
      alert(
        `Nice! "${playlistName}" was saved to your spotify playlists. You should be able to find it in your library.`
      );
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  },
};

export default Spotify;
