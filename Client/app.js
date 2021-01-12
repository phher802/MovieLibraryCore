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
        $('#movie-table').append(`<tr><td class ='title-click' id="${element.movieId}"><a onclick="sendId(${element.movieId})">${element.title}</a></td>
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
    console.log("button clicked");
    let search = $('#movieId').val();
    console.log(search);

    $.get('https://localhost:44325/api/movie',
        function (data) {
            search = String(search);
            //  var findMovie = $('option:selected',this).data('section');
            let filterData = data.filter((movie) => {
                if ((movie.title != null && movie.title.includes(search)) || (movie.director != null && movie.director.includes(search)) ||
                (movie.genre != null && movie.genre.includes(search))) {
                    return true;
                } else {
                    return false;
                }
            })
            $('#movie-table').html('');
            filterData.map(function(element) {
                $('#movie-table').append(`<tr><td class ='title-click' id="${element.movieId}"><a onclick="sendId(${element.movieId})">${element.title}</a></td>
            <td>${element.director}</td>
            <td>${element.genre}</td></tr>`);
            });
        })

};
$('#search-field').submit(getMovie);


function sendId(id){
    $.get("https://localhost:44325/api/movie/" +id, function(data){
        $(".edit-section").css("display", "inline");
        $('#movie-id').attr("value", id);
        $('#movie-title-big').html(data.title);
        $('#movie-title').attr("value", data.title);
        $('#movie-director').attr("value", data.director);
        $('#movie-genre').attr("value", data.genre);
    })  
}
