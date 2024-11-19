const lastSeenTime = document.querySelectorAll(".timeSeen");

lastSeenTime.forEach((timeSeen) => {
  let randomChoice = Math.random();
  let lastTimeSeen;
  if (randomChoice < 0.5) {
    lastTimeSeen = Math.floor(Math.random() * 61);
    timeSeen.innerText = lastTimeSeen + " minuti";
  } else {
    lastTimeSeen = Math.floor(Math.random() * 13);
    timeSeen.innerText = lastTimeSeen + " ore";
  }
});

const mainAlbumImg = document.getElementById("imgSrc");
const mainAlbumTitle = document.getElementById("albumName");
const mainAlbumArtistName = document.getElementById("artistName");
const mainAlbumSubTitle = document.getElementById("textSub");

function getMainAlbumDetails(albumId) {
  const mainAlbumUrl = ` https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`;

  fetch(mainAlbumUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nel recuperare i dettagli dell'album");
      }
      return response.json();
    })
    .then((data) => {
      const album = data;
      console.log("Titolo Album:", album.title);
      console.log("Artista Album:", album.artist.name);
      console.log("Immagine Album:", album.cover_medium);

      // Imposta i dati nel DOM
      mainAlbumImg.src = album.cover_medium;
      mainAlbumTitle.innerText = album.title;
      mainAlbumArtistName.innerText = album.artist.name;
      mainAlbumSubTitle.innerText = album.genres.data[0].name;
    })
    .catch((error) => {
      console.log("Errore nel recuperare i dettagli:", error);
    });
}

// Chiama la funzione per ottenere i dettagli dell'album con l'ID specificato
getMainAlbumDetails(554390622);

const albums = document.querySelectorAll(".album");
albums.forEach((album) => {
  album.addEventListener("click", function () {
    const albumId = album.getAttribute("data-id");
    window.location.href = `album.html?id=${albumId}`;
  });
});
