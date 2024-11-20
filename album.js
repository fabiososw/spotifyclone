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
      trackDiv.classList.add("d-flex", "justify-content-between", "mt-3", "tracklist");

      trackDiv.innerHTML = `
          <div class="d-flex align-items-center">
            <span class="me-3">${index + 1}</span>
            <div>
              <span class="text-white">${track.title}</span> <br />
              <span class="sottotitolo">${track.artist.name}</span>
            </div>
          </div>
          <div class="d-none d-sm-flex">
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
    });
  })
  .catch((error) => {
    console.error("Errore nel recuperare i dettagli dell'album:", error); // errore se qualcosa va storto
  });
