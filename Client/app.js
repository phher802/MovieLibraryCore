(function ($) {
        function processForm(e) {
            var dict = {
                Title: this["title"].value,
                Director: this["director"].value,
                Genre: this["genre"].value
            };        
        }

        function getAllMovies() {
            // $("button").on('click', function(e){
            //     e.preventDefault();
            //     console.log("successfull click");
            // })
            $(document).ready(function () {
                $.ajax({
                        url: 'https://localhost:44325/api/movie',
                        dataType: 'json',
                        type: 'GET',
                        contentType: 'application/json',
                        data: JSON.stringify(dict),
                        success: function () {
                            $('.movieData').html('');
                        }
                    })
                    .then(function (data) {
                        $.each(data, function (index, value) {
                            $('.movieData').append()
                            "<tr>" +
                            "<td>" + value.movieId + "</td>"
                            "<td>" + value.Title + "</td>"
                            "<td>" + value.Director + "</td>"
                            "<td>" + value.Genre + "</td>"
                            "</tr>"
                        });

                    });
                });

            };
        });

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
    

    $('#my-form').submit(processForm);
})(jQuery);