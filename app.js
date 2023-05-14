async function runningApp() {
  const env = require('dotenv').config();

  // Initialization and Authentication
  const Spotify = require('spotifydl-core').default; // Import the library
  const spotify = new Spotify({
    // Authentication

    clientId: env.parsed.CLIENT_ID_SPOTIFY, // <-- add your own clientId
    clientSecret: env.parsed.CLIENT_SECRET_SPOTIFY, // <-- add your own clientSecret
  });

  // Declaring the respective url in 'links' object
  const links = {
    artist: process.argv[2], // Url of the artist you want to gather info about
    album: process.argv[3], // Url of the album you want to gather info about
    song: process.argv[4], // Url of the song you want to gather info about or download
  };
  const fs = require('fs-extra');

  // Engine

  let songname = '';
  const data = await spotify.getTrack(links.song); // Waiting for the data 🥱
  console.log('Downloading: ', data.name, 'by:', data.artists.join(' ')); // Keep an eye on the progress
  const song = await spotify.downloadTrack(links.song); // Downloading goes brr brr
  fs.writeFileSync('music/' + data.name + '.mp3', song); // Let's write the buffer to the woofer (i mean file, hehehe)
  console.log('Berhasil Download: ', data.name);
  songname = 'music/' + data.name + '.mp3';

  // Save data
  let musicData = fs.readFileSync('musiclist.json');

  musicData = JSON.parse(musicData);
  musicData.music.push({ name: data.name, file: songname });

  fs.writeFile('musiclist.json', JSON.stringify(musicData), function (error) {
    console.log("Written file 'musiclist.json'... ");
  });
  // end save data

  console.log(songname);
}
runningApp();
