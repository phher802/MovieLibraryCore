(function ($) {
    function processForm(e) {
        var dict = {
            Title: this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function (data, textStatus, jQxhr) {
                $('#response pre').html(data);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }

        });

        e.preventDefault();

    }

    $('#my-form').submit(processForm);
})(jQuery);

$(document).ready($.get('https://localhost:44325/api/movie', function (data) {
    data.map(element => {
        $('#movie-table').append(`<tr><td class='title-click' id="${element.movieId}"><a href="#edit-form" onclick="sendId(${element.movieId})">${element.title}</a></td>
                <td>${element.director}</td>
                <td>${element.genre}</td></tr>`);
    });
}))


$("#edit-button").on("click", 
    $("#edit-form").submit(function(e){
        e.preventDefault();
        var dict = {
            Title : this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie/?id=' + this["movieId"].value,
            dataType: 'json',
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                console.log(data);
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
    })
    
);



function getMovie(e) {
    e.preventDefault();
    let search = $('#movieId').val();

    // let search = searchOption.toLowerCase();

    //  let defaultSearch = ('select option:selected');
    $.get('https://localhost:44325/api/movie',
        function (data) {

            search = String(search);
            newSearch = search.toLowerCase();
            var selectedProperty = document.getElementById('search-property').selectedIndex;

            let filterData = data.filter((movie) => {
                if(selectedProperty != 0){
                    return propertyBasedSearch(movie, selectedProperty, newSearch);
                }
                else if (selectedProperty === 0) {
                    return indiscriminateSearch(movie, newSearch);
                } else {
                    return false;
                }
            })
            $('#movie-table').html('');
            filterData.map(function(element) {
                $('#movie-table').append(`<tr><td class ='title-click' id="${element.movieId}"><a href="#edit-form" onclick="sendId(${element.movieId})">${element.title}</a></td>
            <td>${element.director}</td>
            <td>${element.genre}</td>
            </tr>`);
            });
        }
    )
};
$('#search-field').submit(getMovie);


function sendId(id){
    $(".edit-section").css("display", "inline");
    $.get("https://localhost:44325/api/movie/" +id, function(data){
        $('#movie-id').attr("value", id);
        $('#movie-title-big').html(data.title);
        $('#movie-title').attr("value", data.title);
        $('#movie-director').attr("value", data.director);
        $('#movie-genre').attr("value", data.genre);
    })  
}


function propertyBasedSearch(movie, selectedProperty, searchTerm){
    let property = "";
    switch(selectedProperty){
        case 1:
            property = "title";
            break;
        case 2:
            property = "director";
            break;
        case 3:
            property = "genre";
            break;
        default:
            return false;
    }

    let movieProperty = movie[property].toLowerCase();
    if (movieProperty != null && movieProperty.includes(searchTerm)){
        return true;
    }
    return false;
}

function indiscriminateSearch(movie, searchTerm){
    let movieTitle = movie.title.toLowerCase();        
    let movieDirector = movie.director.toLowerCase();
    let movieGenre = movie.genre.toLowerCase();
    if((movieTitle != null && movieTitle.includes(searchTerm)) || 
    (movieDirector != null && movieDirector.includes(searchTerm)) ||
    (movieGenre != null && movieGenre.includes(searchTerm))){
        return true;
    }
    return false;
}