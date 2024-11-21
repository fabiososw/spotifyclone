// tempo casuale dell'ultima volta online
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

// dati album
const mainAlbumImg = document.getElementById("imgSrc");
const mainAlbumTitle = document.getElementById("albumName");
const mainAlbumArtistName = document.getElementById("artistName");
const mainAlbumSubTitle = document.getElementById("textSub");

// funzione per prendere i dettagli dell'album
function getMainAlbumDetails(albumId) {
  const mainAlbumUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`;

  fetch(mainAlbumUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("errore nel recuperare i dettagli dell'album");
      }
      return response.json();
    })
    .then((data) => {
      // imposta i dettagli dell'album nella pagina
      mainAlbumImg.src = data.cover_medium;
      mainAlbumTitle.innerText = data.title;
      mainAlbumArtistName.innerHTML = `<p class="text-white mt-1" id="artistName" style="font-size: 0.7rem;">
  <a class="text-white mt-1" id="artist-link" href="artist.html?id=${data.artist.id}" style="text-decoration: none; color: inherit; font-size: 0,7rem;">
    ${data.artist.name}
  </a>
</p>
`;
      mainAlbumSubTitle.innerText = data.genres.data[0].name;
    })
    .catch((error) => {
      console.log("errore nel recuperare i dettagli:", error);
    });
}

getMainAlbumDetails(554390622); // carica i dettagli per un album specifico

// apri album alla click
const albums = document.querySelectorAll(".album");
albums.forEach((album) => {
  album.addEventListener("click", function () {
    const albumId = album.getAttribute("data-id");
    window.location.href = `album.html?id=${albumId}`; // redirige alla pagina dell'album
  });
});

// funzione per cercare artista
function handleArtistClick(event) {
  event.preventDefault();

  const artistName = event.target.textContent.trim(); // prendi nome dell'artista dal link
  console.log("artista:", artistName);

  // fetch per cercare l'artista nell'api di deezer
  fetch(`https://api.deezer.com/search/artist?q=${encodeURIComponent(artistName)}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("errore nel recupero dei dati");
      }
      return response.json();
    })
    .then((data) => {
      if (data.data.length > 0) {
        const artist = data.data[0]; // prendi il primo artista trovato
        window.location.href = `artist.html?id=${artist.id}`; // redirigi alla pagina dell'artista
      } else {
        alert("artista non trovato");
      }
    })
    .catch((error) => {
      console.error("errore:", error);
    });
}

// dettagli artista
const artistNewId = new URLSearchParams(window.location.search).get("id");
const artistBigImg = document.querySelector(".album img");
const artistNewName = document.querySelector(".titolo");
const artistListeners = document.querySelector(".ascoltatori");

function getArtistDetails(artistNewId) {
  const artistUrl = `https://api.deezer.com/artist/${artistNewId}`;

  fetch(artistUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("errore nel recuperare i dettagli dell'artista");
      }
      return response.json();
    })
    .then((data) => {
      // aggiorna i dettagli dell'artista nella pagina
      if (artistBigImg) {
        artistBigImg.src = data.picture_big;
      }
      if (artistNewName) {
        artistNewName.innerText = data.name;
      }
      if (artistListeners) {
        artistListeners.innerText = `${data.nb_fan} ascoltatori mensili`;
      }

      // fetch degli album dell'artista
      const albumsUrl = `https://api.deezer.com/artist/${artistNewId}/albums`;
      return fetch(albumsUrl);
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("errore nel recuperare gli album dell'artista");
      }
      return response.json();
    })
    .then((data) => {
      const popularTracksContainer = document.querySelector(".row.ps-4"); // contenitore per i brani
      data.data.forEach((album) => {
        const albumUrl = `https://api.deezer.com/album/${album.id}/tracks`;

        fetch(albumUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("errore nel recupero dei brani");
            }
            return response.json();
          })
          .then((trackData) => {
            trackData.data.forEach((track, index) => {
              const trackElement = document.createElement("div");
              trackElement.classList.add("col", "d-flex", "align-items-center", "justify-content-between", "ps-4");

              trackElement.innerHTML = `
                <p class="text-white fw-normal pe-3 pt-3">${index + 1}</p>
                <img width="45px" src="${track.album.cover_medium}" alt="" />
                <h6 class="text-white ps-3 fw-normal mb-0">${track.title}</h6>
                <div>
                  <p class="m-0 ps-5">${track.nb_streams}</p>
                </div>
                <div>
                  <p class="m-0 ms-5 ps-5">${track.duration_formatted}</p>
                </div>
              `;
              popularTracksContainer.appendChild(trackElement);
            });
          })
          .catch((error) => {
            console.error("errore nel recupero dei brani:", error);
          });
      });
    })
    .catch((error) => {
      console.error("errore:", error);
    });
}

getArtistDetails(artistNewId); // carica i dettagli dell'artista
