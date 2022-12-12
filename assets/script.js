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
    var movieUrl = "http://www.omdbapi.com/?apikey=trilogy&type=movie&s=" + q + "&t=" + q;
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
var getExtraMovieData = function(id) {
    var movieUrl = "http://www.omdbapi.com/?apikey=trilogy&i=" + id;
    fetch(movieUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayExtraData(data, id);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to GitHub');
    });
}

var displayExtraData = function(extraData, id){
    var director = extraData.Director;
    var runtime = extraData.Runtime;
    var plot = extraData.Plot;
    var boxOffice = extraData.BoxOffice;
    var imdbRating = extraData.imdbRating;
    var parent = document.getElementById(id).parentElement

    var ul = document.createElement('ul');
    var liDirector = document.createElement('li');
    var liRuntime= document.createElement('li');
    var liPlot = document.createElement('li');
    var liBoxOffice = document.createElement('li');
    var liImdbRating = document.createElement('li');
    var toggleButton = document.createElement('a');
    var br = document.createElement('br');

    ul.classList = 'list-group list-group-flush';
    liDirector.className = 'list-group-item';
    liRuntime.className = 'list-group-item';
    liPlot.className = 'list-group-item';
    liBoxOffice.className = 'list-group-item';
    liImdbRating.className = 'list-group-item';
    toggleButton.className = 'btn btn-primary toggle-button m-2';

    
    liDirector.textContent = 'Director: ' + director;
    liRuntime.textContent = 'Runtime: ' + runtime;
    liPlot.textContent = 'Plot: ' + plot;
    liBoxOffice.textContent = 'Box Office: ' + boxOffice;
    liImdbRating.textContent = 'IMDb Rating: ' + imdbRating;
    toggleButton.textContent = 'Show/Hide Results'

    parent.appendChild(br)
    parent.appendChild(toggleButton)
    parent.appendChild(ul)
    ul.appendChild(liDirector)
    ul.appendChild(liRuntime)
    ul.appendChild(liPlot)
    ul.appendChild(liBoxOffice)
    ul.appendChild(liImdbRating)

};

var showHide = function (target){
    if (target.nextElementSibling.style.display === "none"){
        target.nextElementSibling.style.display = "block";
        }    else{
            target.nextElementSibling.style.display = "none";
        
    }
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
        var button = document.createElement('a');
        
        card.classList = 'card h-100';
        cardBody.classList = 'card-body';
        img.classList = 'card-img-top';
        h5.classList = 'card-title';
        p.classList = 'card-text';
        button.classList = 'btn btn-primary more-data';
        a.classList = 'card-link';
        
        img.setAttribute('src', poster);
        img.setAttribute('alt', 'Poster for: ' + title);
        img.setAttribute('max-height', '350px')
        h5.textContent = title;
        p.textContent = 'Year released: ' + year;
        button.textContent = 'Click for more info';
        button.setAttribute('type', 'button')
        button.setAttribute('id', imdbID)
        a.textContent = 'https://www.imdb.com/title/' + imdbID;
        a.href = 'https://www.imdb.com/title/' + imdbID;
        a.setAttribute('target', '_blank')
        
        movieCardParent.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(h5);
        cardBody.appendChild(p);
        cardBody.appendChild(button);
        cardBody.appendChild(a);
    }
}

var toggleDescription = function(element) {
    if (element.nextElementSibling.style.display === 'none') {
        element.nextElementSibling.style.display = 'block';
    } else {
        element.nextElementSibling.style.display = 'none';
    }
};

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
        expandA.classList = 'btn btn-primary toggle-description';
        expandA.textContent = 'Click for description';
        expandDiv.className = 'collapse';
        expandDiv.setAttribute('id', bookData.items[i].id);
        expandDiv.style.display = 'none';
        descDiv.className = 'card card-body';
        ul.classList = 'list-group list-group-flush';
        liAuthor.className = 'list-group-item';
        liDate.className = 'list-group-item';
        liRating.className = 'list-group-item';
        a.className = 'card-link';
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

document.addEventListener('click', function(event) {
    if (event.target.matches('.toggle-button')) {
        showHide(event.target);
    }
});
document.addEventListener('click', function(event) {
    if (event.target.matches('.toggle-description')) {
        toggleDescription(event.target);
    }
});
document.addEventListener('click', function(event) {
    if (event.target.matches('.more-data')) {
        var moreDataID = event.target.getAttribute('id')
        getExtraMovieData(moreDataID);
        event.target.style.display='none'
        
    }
});
searchBtn.addEventListener('click', handleSearch);