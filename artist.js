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
// prendi l'id dell'artista dall'url
const urlParams = new URLSearchParams(window.location.search);
const artistNewId = urlParams.get("id");

// prendi gli elementi da aggiornare
const artistBigImg = document.querySelector(".album");
const artistNewName = document.querySelector(".titolo");
const artistListeners = document.querySelector(".ascoltatori");
const artistaLiked = document.querySelector(".artistaLiked");
const artistLogo = document.getElementById("artist-img");

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
      if (!response.ok) throw new Error("errore nel recuperare i dettagli dell'artista");
      return response.json();
    })
    .then((data) => {
      if (data) {
        // aggiorna immagine, nome, e ascoltatori mensili
        if (artistBigImg) artistBigImg.style.backgroundImage = `url(${data.picture_big})`;
        if (artistNewName) artistNewName.innerText = data.name;
        if (artistListeners) artistListeners.innerText = `${data.nb_fan} ascoltatori mensili`;
        if (artistaLiked) artistaLiked.innerText = `Di ${data.name}`;
        if (artistImg) artistImg.src = `${data.picture}`;

        // chiama la funzione per aggiungere il link all'artista
        addArtistLink(data.id, data.name); // passa l'id e il nome dell'artista
      } else {
        console.log("Nessun dato trovato");
      }
    })
    .catch((error) => {
      console.error("errore:", error);
      alert("impossibile caricare i dettagli dell'artista.");
    });
}

// funzione per cambiare lo sfondo a seconda della larghezza della finestra
function setBackground() {
  if (window.innerWidth >= 577) {
    // per schermi grandi
    artistBigImg.style.backgroundImage = "";
  } else {
    // per schermi piccoli
    artistBigImg.style.backgroundImage = "";
  }
}

// esegui subito quando carica la pagina
setBackground();

// ascolta il resize della finestra
window.addEventListener("resize", setBackground);

// prendi i dettagli dell'artista
getArtistDetails(artistNewId);

// codice per il numero casuale dei mi piace
const randomNumber = document.getElementById("randomNumber");

const randomLikedNumber = Math.floor(Math.random() * 15 + 1);
randomNumber.innerText = `Hai messo mi piace a ${randomLikedNumber} brani`;

// funzione per aggiungere il link all'artista
function addArtistLink(artistId, artistName) {
  const artistElement = document.getElementById("artistName"); // prendi l'elemento dove metteremo il link

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

// prendi l'id dell'artista dall'url
function getArtistIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search); // parametri url
  return urlParams.get("id"); // ritorna l'id
}

// chiama l'api e stampa le top tracks
function getTopTracks(artistId) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=5`, {
    method: "GET"
  })
    .then((response) => {
      if (!response.ok) throw new Error("errore nel recuperare le tracce");
      return response.json(); // trasformo in json
    })
    .then((data) => {
      const topTracksContainer = document.getElementById("top-tracks"); // contenitore dove mettere le tracce
      if (topTracksContainer) {
        topTracksContainer.innerHTML = ""; // pulisci eventuale contenuto vecchio

        // ciclo sulle tracce
        data.data.forEach((track, index) => {
          // crea il div di ogni traccia
          const trackElement = document.createElement("div");
          trackElement.classList.add("col", "d-flex", "align-items-center", "justify-content-between", "ps-4");

          // html di ogni traccia
          trackElement.innerHTML = `
            <p class="text-white fw-normal pe-3 pt-3">${index + 1}</p>
            <img width="45px" src="${track.album.cover}" alt="${track.album.title}" />
            <h6 class="text-white ps-3 fw-normal mb-0">${track.title}</h6>
            <div>
              <p class="m-0 ps-5">${track.rank.toLocaleString()}</p>
            </div>
            <div>
              <p class="m-0 ms-5 ps-5">${formatDuration(track.duration)}</p>
            </div>
          `;

          // aggiungi il div al contenitore
          topTracksContainer.appendChild(trackElement);
        });
      }
    })
    .catch((error) => {
      console.error("errore:", error);
      alert("impossibile caricare le tracce dell'artista.");
    });
}

// funzione per formattare durata in mm:ss
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60); // minuti
  const remainingSeconds = seconds % 60; // secondi
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`; // formatta
}

// prendi l'id dinamicamente dall'url
const artistId = getArtistIdFromUrl();

// controlla se c'è un id e carica le tracce
if (artistId) {
  getTopTracks(artistId); // chiama funzione per tracce
} else {
  console.error("id dell'artista non trovato nell'url");
  alert("id dell'artista non trovato.");
}
document.getElementById("houseBtn").addEventListener("click", () => {
  window.location.href = "homepage.html";
});
