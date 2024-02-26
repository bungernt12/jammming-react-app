import logo from './logo.svg';
import './App.css';
import Tracklist from './Components/Tracklist/Tracklist'
import { useState } from 'react';

function App() {
  const [trackArray, setTrackArray] = useState([
    {songName: 'All My Days', artist: 'Alexi Murdoch', album: 'Tague Greatest Hits', id: '0'},
    {songName: 'Mr. Brightside', artist: 'The Killers', album: 'Some Album', id: '1'}
  ])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>test123</p>
      </header>
      <div className='body'>
        <Tracklist trackArray={trackArray} />
        <button>Save To Spotify</button>
        <button>Search</button>
      </div>

    </div>
  );
}

export default App;
