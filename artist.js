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
// id dell'artista dall'url
const urlParams = new URLSearchParams(window.location.search);
const artistNewId = urlParams.get("id");

// elementi da aggiornare
const artistBigImg = document.querySelector(".album");
const artistNewName = document.querySelector(".titolo");
const artistListeners = document.querySelector(".ascoltatori");
const artistaLiked = document.querySelector(".artistaLiked");
const artistLogo = document.getElementById("artist-img");
const tracklistContainer = document.getElementById("tracklist");

// configurazione api
const API_KEY = "2b8107ec5amsh419b2e6df1cbbc4p164c14jsn8671d66a70cf"; // chiave rapidapi
const API_HOST = "deezerdevs-deezer.p.rapidapi.com";
const BASE_URL = `https://${API_HOST}`;

const artistImg = document.getElementById("artist-img");

// funzione per ottenere i dettagli dell'artista
function getArtistDetails(artistId) {
  fetch(`${BASE_URL}/artist/${artistId}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST
    }
  })
    .then((response) => {
      if (!response.ok) throw new Error("Errore nel recuperare i dettagli dell'artista");
      return response.json();
    })
    .then((data) => {
      if (data) {
        // immagine, nome, e ascoltatori mensili
        if (artistBigImg) artistBigImg.style.backgroundImage = `url(${data.picture_big})`;
        if (artistNewName) artistNewName.innerText = data.name;
        if (artistListeners) artistListeners.innerText = `${data.nb_fan} ascoltatori mensili`;
        if (artistaLiked) artistaLiked.innerText = `Di ${data.name}`;
        if (artistImg) artistImg.src = data.picture;

        //fetch per brani di ogni artiista
        return fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=50`, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "a14a691c71msh9380c2e65ed3469p1fde94jsn0c2af8566a22",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
          }
        });
      } else {
        throw new Error("Nessun dato trovato per l'artista");
      }
    })
    .then((response) => {
      if (!response.ok) throw new Error("Errore nel recuperare i brani principali");
      return response.json();
    })
    .then((track) => {
      if (track.data) {
        // Aggiungi i brani uno per uno
        track.data.forEach((track, index) => {
          const trackDiv = document.createElement("div");

          trackDiv.classList.add("d-flex", "mt-3", "tracklist", "justify-content-between");

          trackDiv.innerHTML = `
            <div>
              <div class="col d-flex align-items-center justify-content-between ps-4">
                <p class="text-white fw-normal pe-3 pt-3">${index + 1}</p>
                <img width="45px" src="${track.album.cover_small}" alt="${track.title}" />
                <h6 class="text-white ps-3 fw-normal mb-0">${track.title}</h6>
                <div>
                  <p class="m-0 ps-5">${track.rank}</p>
                </div>
                <div>
                  <p class="m-0 ms-5 ps-5">${Math.floor(track.duration / 60)}:${track.duration % 60}</p>
                </div>
              </div>
            </div>`;

          tracklistContainer.appendChild(trackDiv);
        });
      } else {
        console.log("Nessun brano trovato");
      }
    })
    .catch((error) => {
      console.error("Errore:", error);
      alert("Impossibile caricare i dettagli dell'artista o i brani principali.");
    });
}

// funzione per cambiare lo sfondo a seconda della larghezza della finestra
function setBackground() {
  if (window.innerWidth >= 577) {
    // schermi grandi
    artistBigImg.style.backgroundImage = "";
  } else {
    // schermi piccoli
    artistBigImg.style.backgroundImage = "";
  }
}

// esegui subito quando carica la pagina
setBackground();

// resize della finestra
window.addEventListener("resize", setBackground);

//  dettagli dell'artista
getArtistDetails(artistNewId);

// numero casuale  mi piace
const randomNumber = document.getElementById("randomNumber");

const randomLikedNumber = Math.floor(Math.random() * 15 + 1);
randomNumber.innerText = `Hai messo mi piace a ${randomLikedNumber} brani`;

// funzione per aggiungere il link all'artista
function addArtistLink(artistId, artistName) {
  const artistElement = document.getElementById("artistName");

  // crea link dinamicamente
  const artistLink = document.createElement("a");
  artistLink.href = `artist.html?id=${artistId}`;
  artistLink.textContent = artistName;
  artistLink.style.textDecoration = "none";
  artistLink.style.color = "inherit";

  // rimuove il contenuto vecchio e mette il nuovo link
  artistElement.innerHTML = "";
  artistElement.appendChild(artistLink); // aggiungi il nuovo link all'elemento
}
