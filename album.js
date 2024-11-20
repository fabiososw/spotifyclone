const albumImg = document.getElementById("album-img");
const albumTitle = document.getElementById("album-title");
const artistName = document.getElementById("artist-name");
const artistImg = document.getElementById("artist-img");
const tracklistContainer = document.getElementById("tracklist");

function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const albumId = getQueryParameter("id");
if (albumId) {
  getMainAlbumDetails(albumId);
} else {
  console.error("ID dell'album mancante nell'URL");
}

// Funzione per formattare la durata in mm:ss
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`)
  .then((response) => response.json())
  .then((data) => {
    albumImg.src = data.cover_medium;
    albumTitle.innerText = data.title;
    artistName.innerText = data.artist.name;
    artistImg.src = data.artist.picture_medium;

    const tracks = data.tracks.data;

    tracklistContainer.innerHTML = "";

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

      tracklistContainer.appendChild(trackDiv);
    });
  })
  .catch((error) => {
    console.error("Errore nel recuperare i dettagli dell'album:", error);
  });
