let moviesData = [];

fetch("https://api.tvmaze.com/shows")
  .then(res => res.json())
  .then(data => {
    moviesData = data;
    displayMovies(moviesData);
  });

function displayMovies(movies) {
  const container = document.getElementById("movies-container");
  container.innerHTML = "";

  movies.slice(0, 21).forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.addEventListener("click", () => {
      window.location.href = `booking.html?id=${movie.id}`;
    });

    card.innerHTML = `
      <img src="${movie.image?.medium}" alt="${movie.name}">
      <div class="movie-info">
        <h3>${movie.name}</h3>
        <p class="genre">${movie.genres[0] || "Movie"}</p>
      </div>
      <div class="overlay-dark"></div>
      <div class="overlay-text">
        <p>${movie.summary ? movie.summary.replace(/<[^>]+>/g, "").slice(0, 120) : "No description"}</p>
        <span>🎭 ${movie.genres.join(", ")}</span>
        <span>⏱ ${movie.runtime || "N/A"} min</span>
      </div>
    `;

    container.appendChild(card);
  });
}

function filterMovies() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const genreValue = document.getElementById("genreFilter").value;

  const filtered = moviesData.filter(movie => {
    const matchesSearch = movie.name.toLowerCase().includes(searchValue);
    const matchesGenre = genreValue === "" || movie.genres.includes(genreValue);
    return matchesSearch && matchesGenre;
  });

  displayMovies(filtered);
}

document.getElementById("searchInput").addEventListener("input", filterMovies);
document.getElementById("genreFilter").addEventListener("change", filterMovies);