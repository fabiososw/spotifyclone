const div = document.getElementById("divBg");
const divProva = document.querySelectorAll("#divBg");
let arrayDiv = Array.from(divProva);

const colorArray = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF"
];

for (let i = 0; i < arrayDiv.length; i++) {
  const randomColorI = Math.floor(Math.random() * 50);
  let randomColor = colorArray[randomColorI];
  const randomDIvI = Math.floor(Math.random() * arrayDiv.length);
  arrayDiv[randomDIvI].style.backgroundColor = randomColor;
  if ((arrayDiv[randomDIvI].style.backgroundColor = " ")) {
    arrayDiv[i].style.backgroundColor = randomColor;
  }
}
//arrayDiv.forEach(element => element.style.backgroundColor = randomColor)}

document.getElementsByTagName("form")[0].addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
});

/*if(document.getElementById('input').value != 0){
  document.getElementById('searchBtn').addEventListener('click', () =>{
    document.querySelector('main').innerHTML = ''
  })
}*/

document.getElementById("houseBtn").addEventListener("click", () => {
  window.location.href = "homepage.html";
});
document.getElementById("toHomepage").addEventListener("click", () => {
  window.location.href = "homepage.html";
});
document.getElementById("searchBtn").addEventListener("click", function () {
  // prendo il valore dell'input (il nome dell'artista)
  const artistName = document.getElementById("input").value.trim();

  // se l'input è vuoto, dico all'utente di inserire qualcosa
  if (artistName === "") {
    alert("Inserisci un nome valido!");
    return;
  }

  // questa è l'URL per la ricerca su Deezer tramite RapidAPI
  const apiUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistName}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "2b8107ec5amsh419b2e6df1cbbc4p164c14jsn8671d66a70cf", // qui ci va la tua api key
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
    }
  };

  // faccio la chiamata all'API
  fetch(apiUrl, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella risposta dall'API");
      }
      return response.json();
    })
    .then((data) => {
      // se c'è almeno un risultato, prendo l'ID dell'artista
      if (data.data && data.data.length > 0) {
        const artistId = data.data[0].artist.id; // prendo l'ID del primo risultato
        // faccio il redirect alla pagina artist.html con l'ID dell'artista
        window.location.href = `artist.html?id=${artistId}`;
      } else {
        alert("Artista non trovato!"); // se non trovo nulla, avviso l'utente
      }
    })
    .catch((error) => {
      console.error("Errore:", error);
      alert("Si è verificato un errore nella ricerca dell'artista."); // se succede qualche errore nella fetch
    });
});

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // previene il comportamento di default del form (che ricaricherebbe la pagina)

  // prendo il valore dell'input (il nome dell'artista)
  const artistName = document.getElementById("input").value.trim();

  // se l'input è vuoto, dico all'utente di inserire qualcosa
  if (artistName === "") {
    alert("Inserisci un nome valido!");
    return;
  }

  // questa è l'URL per la ricerca su Deezer tramite RapidAPI
  const apiUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistName}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "2b8107ec5amsh419b2e6df1cbbc4p164c14jsn8671d66a70cf",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
    }
  };

  // faccio la chiamata all'API
  fetch(apiUrl, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella risposta dall'API");
      }
      return response.json();
    })
    .then((data) => {
      // se c'è almeno un risultato, prendo l'ID dell'artista
      if (data.data && data.data.length > 0) {
        const artistId = data.data[0].artist.id; // prendo l'ID del primo risultato
        // faccio il redirect alla pagina artist.html con l'ID dell'artista
        window.location.href = `artist.html?id=${artistId}`;
      } else {
        alert("Artista non trovato!"); // se non trovo nulla, avviso l'utente
      }
    })
    .catch((error) => {
      console.error("Errore:", error);
      alert("Si è verificato un errore nella ricerca dell'artista."); // se succede qualche errore nella fetch
    });
});
