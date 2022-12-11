var googleKey = "AIzaSyAK1n111P0xYxlHtbKVeGFq5IZDT_K95eM";

var searchBtn = document.querySelector('.search-btn');
var userSearch = document.querySelector('.user-input');
var cardParent = document.querySelector('.movie-card-parent');

var handleSearch = function(event) {
    event.preventDefault();
    var q = userSearch.value.trim();
    // getBookData(q)
    getMovieData(q);
}

searchBtn.addEventListener('click', handleSearch);

var getBookData = function(q) {

}

var getMovieData = function(q) {
    var movieUrl = "http://www.omdbapi.com/?apikey=trilogy&s=" + q + "&t=" + q;
    fetch(movieUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayMovies(data);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to GitHub');
    });
}

var displayMovies = function(movieData) {
    console.log(movieData.Search);
    for (var i = 0; i < movieData.Search.length; i++) {
        var title = movieData.Search[i].Title;
        var poster = movieData.Search[i].Poster;
        var year = movieData.Search[i].Year;
        var imdbID = movieData.Search[i].imdbID;

        console.log(title);
        console.log(poster);
        console.log(year);

        var card = document.createElement('div');
        var cardBody = document.createElement('div');
        var img = document.createElement('img');
        var h5 = document.createElement('h5');
        var p = document.createElement('p');
        var a = document.createElement('a');

        card.classList = 'card';
        cardBody.classList = 'card-body';
        img.classList = 'card-img-top';
        h5.classList = 'card-title';
        p.classList = 'card-text';
        a.classList = 'card-link';

        img.setAttribute('src', poster);
        img.src = poster;
        img.alt = 'Poster of the movie';
        h5.textContent = title;
        p.textContent = year;
        a.textContent = 'https://www.imdb.com/title/' + imdbID;
        a.href = 'https://www.imdb.com/title/' + imdbID;

        cardParent.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(h5);
        cardBody.appendChild(p);
        cardBody.appendChild(a);
    }
}