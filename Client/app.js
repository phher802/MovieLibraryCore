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
            $('#movie-table').append(`<tr><td id="${element.MovieId}">${element.Title}</td>
                <td>${element.Director}</td>
                <td>${element.Genre}</td></tr>`
            );
        });
    })
)



    
        // $("button").on('click', function(e){
        //     e.preventDefault();
        //     console.log("successfull click");
        // })
        
        
        // $(document).ready(function () {
        //     console.log("Hi, you're doing good so far.")
        //     $.ajax({
        //         url: 'https://localhost:44325/api/movie',
        //         dataType: 'json',
        //         type: 'GET',
        //         contentType: 'application/json',
        //         data: JSON.stringify(dict),
        //         success: function () {
        //             $('.movie-table').html('');
        //         }
        //     })
        //     .then(function (data) {
        //         $.each(data, function (index, ) {
        //             console.log("here's another.")
        //             $('#movie-table').append()
        //             "<tr>" +
        //             "<td >" + "<a>" + value.Title + "</a>" + "</td>"
        //             "<td>" + value.Director + "</td>"
        //             "<td>" + value.Genre + "</td>"
        //                 "</tr>"
        //         });

        //     });
        // });
    


