// selezioniamo tutti gli elementi che mostrano il tempo
const lastSeenTime = document.querySelectorAll(".lastSeen");

lastSeenTime.forEach((timeSeen) => {
  let randomChoice = Math.random(); // prendi un numero random tra 0 e 1
  let lastTimeSeen; // la variabile per il tempo

  if (randomChoice < 0.5) {
    lastTimeSeen = Math.floor(Math.random() * 61); // se il numero è sotto 0.5, mettiamo minuti
    timeSeen.innerText = lastTimeSeen + " minuti"; // aggiorna il testo con il numero di minuti
  } else {
    lastTimeSeen = Math.floor(Math.random() * 13 + 1); // se sopra 0.5, mettiamo ore
    timeSeen.innerText = lastTimeSeen + " ore"; // aggiorna il testo con il numero di ore
  }
});

// prendi gli elementi da aggiornare per l'album
const albumImg = document.getElementById("album-img");
const albumTitle = document.getElementById("album-title");
const artistName = document.getElementById("artist-name");
const artistImg = document.getElementById("artist-img");
const tracklistContainer = document.getElementById("tracklist");
const albumCover = document.getElementById("albumCover");

// funzione per ottenere i parametri dalla query dell'URL
function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search); // estrai i parametri dalla query
  return urlParams.get(name); // restituisci il parametro richiesto
}

// prendi l'ID dell'album dalla query e carica i dettagli
const albumId = getQueryParameter("id");
if (albumId) {
  getMainAlbumDetails(albumId); // chiama la funzione per ottenere i dettagli se c'è l'ID
} else {
  console.error("ID dell'album mancante nell'URL"); // se non c'è l'ID, errore
}

// funzione per formattare la durata del brano in mm:ss
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60); // calcola i minuti
  const remainingSeconds = seconds % 60; // calcola i secondi rimanenti
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`; // ritorna la durata formattata
}

// questa è la funzione che recupera i dettagli dell'album
function getMainAlbumDetails(albumId) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`) // fetch dei dettagli
    .then((response) => response.json()) // prendi la risposta come json
    .then((data) => {
      // imposta i dati dell'album nell'HTML
      albumImg.src = data.cover_medium; // immagine album
      albumTitle.innerText = data.title; // titolo album
      artistName.innerText = data.artist.name; // nome artista
      artistImg.src = data.artist.picture_medium; // immagine artista
      /*       albumCover.src = data.cover_medium;
       */ const tracks = data.tracks.data; // ottieni la lista dei brani

      tracklistContainer.innerHTML = ""; // svuota la lista dei brani

      // aggiungi i brani uno per uno
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

        tracklistContainer.appendChild(trackDiv); // aggiungi il brano al DOM

        trackDiv.addEventListener("click", () => {
          const songTitle = document.getElementById("songTitle");
          const imgIcon = document.getElementById("imgIcon");
          const songTitle2 = document.getElementById("songTitle2");
          const artistName1 = document.getElementById("artistName1");

          // aggiorna i dettagli del brano quando clicchi
          songTitle.innerText = `${track.title}, ${track.artist.name}`;
          songTitle2.innerText = `${track.title}`;
          artistName1.innerText = `${track.artist.name}`;
          albumCover.src = data.cover_medium; // aggiorna l'immagine dell'album
        });
      });
    })
    .catch((error) => {
      console.error("Errore nel recuperare i dettagli dell'album:", error); // se qualcosa va storto
    });
}

// codice per icona cuore che si riempe al click
document.querySelector(".heart").addEventListener("click", function () {
  const icon = this.querySelector("i");
  // cambia classe icona quando si clicca
  if (icon.classList.contains("bi-heart")) {
    icon.classList.remove("bi-heart");
    icon.classList.add("bi-heart-fill");
  } else {
    icon.classList.remove("bi-heart-fill");
    icon.classList.add("bi-heart");
  }
});
document.getElementById("houseBtn").addEventListener("click", () => {
  window.location.href = "homepage.html";
});

function addArtistLink(artistId, artistName) {
  const artistElement = document.getElementById("artist-name"); // prendi l'elemento dove metteremo il link

  // crea il link dinamicamente
  const artistLink = document.createElement("a"); // crea un tag <a> per il link
  artistLink.href = `artist.html?id=${artistId}`; // metti il link alla pagina dell'artista
  artistLink.textContent = artistName; // imposta il nome dell'artista come testo del link
  artistLink.style.textDecoration = "none"; // niente sottolineatura
  artistLink.style.color = "inherit"; // usa lo stesso colore del testo

  // rimuove il contenuto vecchio e mette il nuovo link
  artistElement.innerHTML = ""; // cancella quello che c'era prima dentro
  artistElement.appendChild(artistLink); // aggiungi il nuovo link all'elemento
}
