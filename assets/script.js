var googleKey = "AIzaSyAK1n111P0xYxlHtbKVeGFq5IZDT_K95eM";

var searchBtn = document.querySelector('.search-btn');
var userSearch = document.querySelector('.user-input');
var movieCardParent = document.querySelector('.movie-card-parent');
var bookCardParent = document.querySelector('.book-card-parent');
var buttonParent = document.querySelector('.button-parent');
var descParent = document.querySelector('.desc-parent');

var handleSearch = function(event) {
    event.preventDefault();
    var q = userSearch.value.trim();
    getBookData(q);
    getMovieData(q);
}

searchBtn.addEventListener('click', handleSearch);

var getBookData = function(q) {
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=" + q;
    fetch(bookUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayBooks(data);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to GitHub');
    });
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
    movieCardParent.innerHTML = null;

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

        card.classList = 'card h-100';
        cardBody.classList = 'card-body';
        img.classList = 'card-img-top';
        h5.classList = 'card-title';
        p.classList = 'card-text';
        a.classList = 'card-link';

        img.setAttribute('src', poster);
        img.setAttribute('alt', 'Poster for: ' + title);
        img.setAttribute('max-height', '350px')
        h5.textContent = title;
        p.textContent = 'Year released: ' + year;
        a.textContent = 'https://www.imdb.com/title/' + imdbID;
        a.href = 'https://www.imdb.com/title/' + imdbID;
        a.setAttribute('target', '_blank')

        movieCardParent.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(h5);
        cardBody.appendChild(p);
        cardBody.appendChild(a);
    }
}

var displayBooks = function(bookData) {

    bookCardParent.innerHTML = null;
    
    for (var i = 0; i < bookData.items.length; i++) {
        var title = bookData.items[i].volumeInfo.title;
        var author = bookData.items[i].volumeInfo.authors;
        var cover = bookData.items[i].volumeInfo.imageLinks.thumbnail;
        var rating = bookData.items[i].volumeInfo.averageRating;
        var date = bookData.items[i].volumeInfo.publishedDate;
        var description = bookData.items[i].volumeInfo.description;
        var link = bookData.items[i].volumeInfo.infoLink;
        
        var card = document.createElement('div');
        var cardBodyTop = document.createElement('div');
        var cardBodyBottom = document.createElement('div');
        var img = document.createElement('img');
        var h5 = document.createElement('h5');
        var expandA = document.createElement('a');
        var expandDiv = document.createElement('div');
        var descDiv = document.createElement('div');
        var ul = document.createElement('ul');
        var liAuthor = document.createElement('li');
        var liDate = document.createElement('li');
        var liRating = document.createElement('li');
        var a = document.createElement('a');

        card.classList = 'card h-100';
        cardBodyTop.classList = 'card-body';
        cardBodyBottom.classList = 'card-body';
        img.classList = 'card-img-top';
        h5.classList = 'card-title';
        expandA.classList = 'btn btn-primary';
        expandA.setAttribute('data-bs-toggle', 'collapse');
        expandA.setAttribute('href', '#collapseExample');
        expandA.setAttribute('role', 'button');
        expandA.setAttribute('aria-expanded', 'false');
        expandA.setAttribute('aria-controls', 'collapseExample');
        expandA.textContent = 'Click for description';
        expandDiv.classList = 'collapse';
        expandDiv.setAttribute('id', 'collapseExample');
        descDiv.classList = 'card card-body';
        ul.classList = 'list-group list-group-flush';
        liAuthor.classList = 'list-group-item';
        liDate.classList = 'list-group-item';
        liRating.classList = 'list-group-item';
        a.classList = 'card-link';
        a.setAttribute('target', '_blank')

        img.setAttribute('src', cover);
        img.setAttribute('alt', 'Cover of the book: ' + title);
        img.setAttribute('max-height', '350px')
        h5.textContent = title;
        descDiv.textContent = description;
        liAuthor.textContent = 'Author: ' + author;
        liDate.textContent = 'Release date: ' + date;
        liRating.textContent = 'Rating: ' + rating;
        a.textContent = link;
        a.href = link;

        bookCardParent.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardBodyTop);
        cardBodyTop.appendChild(h5);
        cardBodyTop.appendChild(expandA);
        cardBodyTop.appendChild(expandDiv);
        card.appendChild(ul);
        ul.appendChild(liAuthor);
        ul.appendChild(liDate);
        ul.appendChild(liRating);
        card.appendChild(cardBodyBottom);
        cardBodyBottom.appendChild(a);

        expandDiv.appendChild(descDiv);
    }
}