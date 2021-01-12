(function($){
    function processForm( e ){
        var dict = {
            Title : this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#my-form').submit( processForm );

})(jQuery); 

$(document).ready($.get('https://localhost:44325/api/movie', function(data){
       data.map(element => {
            $('#movie-table').append(`<tr><td class ='title-click' id="${element.movieId}"><a href="" onclick="sendId(${element.movieId})">${element.title}</a></td>
                <td>${element.director}</td>
                <td>${element.genre}</td></tr>`
            );
        });
    })
)

$("#edit-button").on("click", 
    function processForm( e ){
        var dict = {
            Title : this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        contentType: 'application/json',
        type: 'put',
        data: JSON.stringify(dict),
        success: function( data, textStatus, jQxhr ){
            $('#response pre').html( '' );
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    })

    $('#edit-form').submit( data );
    }
); 

function sendId(id){
    $.get('https://localhost:44325/api/movie/' +id, function(data){
        $(".edit-section").css("display", "inline")
        data.map(element => {
            $('#movie-details').append(`<dt>Title</dt><dd>${element.title}</dd>
                <dt>Director</dt><dd>${element.director}</dd>
                <dt>Genre</dt><dd>${element.genre}</dd>`
            );
        });

    })  
}

