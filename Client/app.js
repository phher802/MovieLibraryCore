(function ($) {
        function processForm(e) {
            var dict = {
                Title: this["title"].value,
                Director: this["director"].value,
                Genre: this["genre"].value
            };



            $.get("https://localhost:44325/api/movie", function (data) {

                //$('#Movies').html(JSON.stringify(data));
                let counter = 1;
                data.map(element => {
                    $('#movie-table').append(`<div>
                    <div>
                    </div> MovieID: ${element.movieId}
                    <div id = "movie${counter}Id">Title: ${element.title}</div>
                    <div>Director: ${element.director}</div>
                    <div>Genre: ${element.genre}</div>
                    </div>`)
                    counter++;
                });
                console.log(data);
            })
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
                //  });



                e.preventDefault();

            }
            $('#my-form').submit(processForm);
        })(jQuery);