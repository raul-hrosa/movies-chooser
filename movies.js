const genre = { 
    28 : "Ação" ,
    12 : "Aventura",
    16 : "Animação" ,
    35 : "Comédia" ,
    80 : "Crime" ,
    99 : "Documentário" ,
    18 : "Drama" ,
    10751 : "Família" ,
    14 : "Fantasia" ,
    36 : "História" ,
    27 : "Terror" ,
    10402 : "Música" ,
    9648 : "Mistério" ,
    10749 : "Romance" ,
    878 : "Ficção científica" ,
    10770 : "Cinema TV" ,
    53 : "Thriller" ,
    10752 : "Guerra" ,
    37 : "Faroeste"
  }

function random(max) {
    return Math.floor(Math.random() * max);
}

function getRandomWord() {
    var word = 'abcdefghijklmnopqrstuvwxyz'; 
    var index = random(word.length);
    return word.charAt(index);
}

function objectToQueryString(object) {
    return Object.keys(object).map(key => key + '=' + encodeURIComponent(object[key])).join('&');
}

function getSettings(){
    return {
        async: true,
        crossDomain: true,
        url: 'https://api.themoviedb.org/3/search/movie',
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OWYxNzE3ZWQ2Mzg5N2U3NjBmNGZkNmY3YzE3MjUxMCIsInN1YiI6IjY2MDA4YWUwMzUyMGU4MDE3ZWQ4YzliYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.67NgZvrYr02gOTTkqpHHN-ymU9KbX3x7gMLvrx4fD5U'
        }
    }
}

function movieParams() {
    return {
        query: null,
        include_adult: false,
        language: "pt-BR",
        region: "BR",
        page:  random(500)
    }
}

function prepareParams() {
    var params = movieParams()
    params.query = getRandomWord()
   return params
}

function sendRequest(params, callback) {
    var settings = getSettings()
    
    settings.url = `${settings.url}?${objectToQueryString(params)}`
    $.ajax({
        ... settings,
        success: function(response) {
            var index = random(response.results.length)
            var movie = response.results[index]
            movie.genre = []
            movie.genre_ids.forEach(id => {
                movie.genre.push(genre[id])
            });

            callback(movie)
        },
        error: function(xhr, status, error) {
            if(xhr.responseJSON.status_code == 22) {
                sendRequest(prepareParams(), callback)
            }
        }
      });
}

function getRandomMovie(callback) {
    var params = prepareParams()
    sendRequest(params, callback)
}

