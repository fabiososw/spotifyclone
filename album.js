const lastSeenTime = document.querySelectorAll(".lastSeen");

lastSeenTime.forEach((timeSeen) => {
  let randomChoice = Math.random(); // scegliamo un numero random
  let lastTimeSeen; // variabile per il tempo

  if (randomChoice < 0.5) {
    lastTimeSeen = Math.floor(Math.random() * 61); // se è sotto 0.5, mettiamo minuti
    timeSeen.innerText = lastTimeSeen + " minuti"; // tempo in minuti
  } else {
    lastTimeSeen = Math.floor(Math.random() * 13 + 1); // altrimenti ore
    timeSeen.innerText = lastTimeSeen + " ore"; // tempo in ore
  }
});
// selezioniamo gli elementi nel DOM
const albumImg = document.getElementById("album-img");
const albumTitle = document.getElementById("album-title");
const artistName = document.getElementById("artist-name");
const artistImg = document.getElementById("artist-img");
const tracklistContainer = document.getElementById("tracklist");

// funzione per prendere il parametro dalla query
function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search); // ottieni i parametri dall'url
  return urlParams.get(name); // restituisci il parametro richiesto
}

// prendi l'ID dell'album dalla query
const albumId = getQueryParameter("id");
if (albumId) {
  getMainAlbumDetails(albumId); // se c'è l'ID, prendi i dettagli
} else {
  console.error("ID dell'album mancante nell'URL"); // errore se non c'è l'ID
}

// funzione per formattare la durata del brano in mm:ss
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60); // calcola i minuti
  const remainingSeconds = seconds % 60; // calcola i secondi rimanenti
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`; // ritorna la durata formattata
}

// fai la fetch per i dettagli dell'album
fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`)
  .then((response) => response.json()) // prendi i dati come json
  .then((data) => {
    albumImg.src = data.cover_medium; // imposta l'immagine dell'album
    albumTitle.innerText = data.title; // imposta il titolo dell'album
    artistName.innerText = data.artist.name; // imposta il nome dell'artista
    artistImg.src = data.artist.picture_medium; // imposta l'immagine dell'artista

    const tracks = data.tracks.data; // ottieni la lista dei brani

    tracklistContainer.innerHTML = ""; // puliamo il contenitore dei brani

    // cicliamo i brani e li aggiungiamo al DOM
    tracks.forEach((track, index) => {
      const trackDiv = document.createElement("div");
      trackDiv.classList.add("d-flex", "mt-3", "tracklist", "justify-content-between");

      trackDiv.innerHTML = `
      
          <div class="d-flex align-items-center">
            <span class="me-3">${index + 1}</span>
            <div>
              <span class="text-white d-flex align-items-start">${track.title}</span> 
              <span class="sottotitolo d-flex align-items-start">${track.artist.name}</span>
            </div>
          </div>
        
          <div class="d-none d-sm-flex justify-content-end ms-auto" style="margin-right: 40%;">
            <p class="ascolti">${track.rank || "N/A"}</p>
          </div>
          <div class="d-none d-sm-flex">
            <p class="durata">${formatDuration(track.duration)}</p>
          </div>
          <div class="d-flex d-sm-none">
            <p>
              <i class="bi bi-three-dots-vertical text-white"></i>
            </p>
          </div>
        `;

      tracklistContainer.appendChild(trackDiv); // aggiungi il brano al container
      trackDiv.addEventListener("click", () => {
        const songTitle = document.getElementById("songTitle");
        const imgIcon = document.getElementById("imgIcon");
        const songTitle2 = document.getElementById("songTitle2");
        const artistName1 = document.getElementById("artistName1");
        const albumCover = document.getElementById("albumCover");

        songTitle.innerText = `${track.title}, ${track.artist.name}`;
        songTitle2.innerText = `${track.title}`;
        artistName1.innerText = `${track.artist.name}`;
        albumCover.innerText = `${albumImg}`;
      });
    });
  })
  .catch((error) => {
    console.error("Errore nel recuperare i dettagli dell'album:", error); // errore se qualcosa va storto
  });

//funzione per icona cuore che si riempe al click
document.querySelector(".heart").addEventListener("click", function () {
  const icon = this.querySelector("i");
  if (icon.classList.contains("bi-heart")) {
    icon.classList.remove("bi-heart");
    icon.classList.add("bi-heart-fill");
  } else {
    icon.classList.remove("bi-heart-fill");
    icon.classList.add("bi-heart");
  }
});
