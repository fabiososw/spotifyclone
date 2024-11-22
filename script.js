const albumIds = [
  554390622, 607953262, 244296882, 113058612, 393585737, 207919462, 368313447, 597350882, 304587127, 77941202, 664052151, 316298877, 76311092, 498856381,
  6172485, 291094912, 115018, 342958, 502369701, 64169672, 14107478, 352367877, 64169872
];
const randomAlbumId = albumIds[Math.floor(Math.random() * albumIds.length)];

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
  const mainAlbumUrl = `https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "2b8107ec5amsh419b2e6df1cbbc4p164c14jsn8671d66a70cf",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
    }
  };

  fetch(mainAlbumUrl, options)
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
      </p>`;
      mainAlbumSubTitle.innerText = data.genres.data[0].name;

      // Aggiungi l'evento di click sull'immagine dell'album per andare alla pagina dell'album
      mainAlbumImg.addEventListener("click", function () {
        window.location.href = `album.html?id=${data.id}`; // reindirizza alla pagina dell'album
      });
    })
    .catch((error) => {
      console.log("errore nel recuperare i dettagli:", error);
    });
}

getMainAlbumDetails(randomAlbumId); // carica i dettagli per un album specifico

// apri album alla click
const albums = document.querySelectorAll(".album");
albums.forEach((album) => {
  album.addEventListener("click", function () {
    const albumId = album.getAttribute("data-id");
    window.location.href = `album.html?id=${albumId}`; // reindirizza alla pagina dell'album
  });
});
const salutoElement = document.getElementById("Buonasera");
const ora = new Date().getHours();

if (ora >= 5 && ora < 11) {
  salutoElement.textContent = "Buongiorno";
} else if (ora >= 11 && ora < 17) {
  salutoElement.textContent = "Buonasera";
} else {
  salutoElement.textContent = "Ascolto notturno?";
}
