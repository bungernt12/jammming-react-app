let accessToken;

const Spotify = {
  generateRandomString(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  },

  getAccessTokenOnLoad() {
    const ref = window.location.href;

    //check to see if the access token is actually. so apparently this function
    //returns the search term and sets the access token.

    let accessTokenMatch = ref.match(/access_token=([^&]*)/);
    let expiresInMatch = ref.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      console.log("setting access token");
      accessToken = accessTokenMatch[1];
      console.log(accessToken);
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      let stateInMatch = ref.match(/state=([^&]*)/);
      if (stateInMatch) {
        return stateInMatch[1];
      }
    }
    return "";
  },

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
    console.log(`Access url: ${accessUrl}`);
    console.log("Access Token" + accessToken);
  },

  async search(term) {
    if (!accessToken) {
      console.log("search this", this);
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
  async createPlaylist(playlistName, playlistUriArray) {
    console.log("createPlaylist called successfully");
    if (!accessToken) {
      console.log("this", this);
      this.getAccessToken("");
      return;
    }
    try {
      console.log(`access token: ${accessToken}`);
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network error, I think...");
      }
      const userInfo = await response.json();
      console.log(userInfo);
    } catch (e) {
      console.log(e);
    }
  },
};

export default Spotify;
