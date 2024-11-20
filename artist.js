// prendi i parametri dall'url
const urlParams = new URLSearchParams(window.location.search);
const artistNewId = urlParams.get("id"); // prendi l'ID dell'artista
const artistBigImg = document.querySelector(".album img"); // immagine grande dell'artista
const artistNewName = document.querySelector(".titolo"); // nome dell'artista
const artistListeners = document.querySelector(".ascoltatori"); // numero ascoltatori

// funzione per recuperare i dettagli dell'artista
function getArtistDetails(artistNewId) {
  const artistUrl = `https://api.deezer.com/artist/${artistNewId}`; // URL per i dettagli dell'artista

  fetch(artistUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nel recuperare i dettagli dell'artista"); // errore se qualcosa va storto
      }
      return response.json(); // restituisci i dati come json
    })
    .then((data) => {
      // aggiorna i dettagli dell'artista nella pagina
      if (artistBigImg) {
        artistBigImg.src = data.picture_big; // imposta l'immagine dell'artista
      }
      if (artistNewName) {
        artistNewName.innerText = data.name; // imposta il nome dell'artista
      }
      if (artistListeners) {
        artistListeners.innerText = `${data.nb_fan} ascoltatori mensili`; // imposta il numero di ascoltatori mensili
      }

      // ora recuperiamo gli album dell'artista
      const albumsUrl = `https://api.deezer.com/artist/${artistNewId}/albums`;
      return fetch(albumsUrl); // fetch per gli album
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nel recuperare gli album dell'artista"); // errore nel recupero degli album
      }
      return response.json(); // restituisci i dati come json
    })
    .then((data) => {
      const popularTracksContainer = document.querySelector(".row.ps-4"); // selezioniamo il contenitore dei brani
      data.data.forEach((album) => {
        // per ogni album dell'artista
        const albumUrl = `https://api.deezer.com/album/${album.id}/tracks`; // URL per i brani dell'album

        fetch(albumUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Errore nel recupero dei brani: 404 Not Found"); // errore se non troviamo i brani
            }
            return response.json(); // restituisci i brani come json
          })
          .then((trackData) => {
            trackData.data.forEach((track, index) => {
              // per ogni brano nell'album
              const trackElement = document.createElement("div"); // creiamo l'elemento per il brano
              trackElement.classList.add("col", "d-flex", "align-items-center", "justify-content-between", "ps-4"); // aggiungiamo le classi CSS

              trackElement.innerHTML = `
                <p class="text-white fw-normal pe-3 pt-3">${index + 1}</p>
                <img width="45px" src="${track.album.cover_medium}" alt="" />
                <h6 class="text-white ps-3 fw-normal mb-0">${track.title}</h6>
                <div>
                  <p class="m-0 ps-5">${track.nb_streams}</p> <!-- numero di stream -->
                </div>
                <div>
                  <p class="m-0 ms-5 ps-5">${track.duration_formatted}</p> <!-- durata del brano -->
                </div>
              `;
              popularTracksContainer.appendChild(trackElement); // aggiungiamo il brano al contenitore
            });
          })
          .catch((error) => {
            console.error("Errore nel recupero dei brani:", error); // errore se non recuperiamo i brani
          });
      });
    })
    .catch((error) => {
      console.error("Errore:", error); // errore generale
      alert("Errore nel caricamento dei dati dell'artista."); // alert se qualcosa va storto
    });
}

// chiamiamo la funzione con l'ID dell'artista
getArtistDetails(artistNewId);
