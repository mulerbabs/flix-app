const global = {
    currentPage: window.location.pathname
    };
//Higlight active links
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }        
    });
}

async function displayPopularMovies() {
    const {results} = await fetchAPIData('movie/popular');
    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML =`
        <a href="movie-details.html?id=${movie.id}">
            ${movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }                           
            </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;
        document.querySelector('#popular-movies').appendChild(div);
    });    
   /*  const movies = await fetchAPIData('movie/popular');
    console.log(movies.results); */
}

async function displayPopularShows() {
    const {results} = await fetchAPIData('tv/popular');
    results.forEach((show) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML =`
        <a href="tv-details.html?id=${show.id}">
            ${show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />` : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
            }                           
            </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
        `;
        document.querySelector('#popular-shows').appendChild(div);
    });    
   /*  const movies = await fetchAPIData('movie/popular');
    console.log(movies.results); */
}



// Fetch data from TMDB API
async function fetchAPIData(endpoint){
    // Register key at https://www.themoviedb.org/settings/api and enter here
    // Only use this for development or very small proects. You should store your key and make requsts from a 
    // server
    const API_KEY = 'ba0a8da4e9f046970221c86a3dd7a26a';
    const API_URL = 'https://api.themoviedb.org/3/';
    
    showSpinner();

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();

    hideSpinner();
    
    return data;
}
function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

function init() {
    switch (global.currentPage) {
        case "/":
        case "/index.html":            // console.log("Home sweet Home");
            displayPopularMovies();
            break;           
        case "/shows.html":
            displayPopularShows();            // console.log("Sweet Shows");
            break; 
        case "/search.html":
            console.log("Sweet Search");
            break;
        case "/movie-details.html":
            console.log("Sweet Movie Details");
            break;
        case "/tv-details.html":
            console.log("sWeet TV Details");
            break;

        default:
            break;         
    }
    highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
//    console.log(window.location.pathname)