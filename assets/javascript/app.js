var shows = ["The Simpsons", "Malcom in the Middle", "Breaking Bad", "Shameless"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayTVInfo() {
    var tvShow = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        tvShow + "&api_key=JmdbcXSaY4GSJKJRJfuc815gRUIOu4Jd&limit=10";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
                // Creating a div for the gif with id to place double click on
                var gifDiv = $(`<div id=doubleclick>`);

                // Storing the result item's rating
                var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);

                // Creating an image tag
                var tvShowImage = $("<img>");
                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                tvShowImage.attr("src", results[i].images.original_still.url);
                //gives image state of still
                tvShowImage.attr("data-state", "still");
                //gives image source of for still
                tvShowImage.attr("tvShow-still", results[i].images.original_still.url);
                //gives image source for animate
                tvShowImage.attr("tvShow-animate", results[i].images.original.url);
                // gives image a class of gif
                tvShowImage.addClass("gif");


                
                
                $("#doubleclick").dblclick(function () {
                  //double click takes everything inside div of what was double click stores it to localstorage
                     localStorage.setItem("favorite gifs",$(this)[0].innerHTML);
                     var favoriteGifs = localStorage.getItem("favorite gifs")
                    $("#favorite-gifs").html(`<div>${favoriteGifs}</div>`);
                    console.log($(this)[0].innerHTML);
                });




                // Appending the paragraph and tvShowImage we created to the "gifDiv" div we created
                gifDiv.append(tvShowImage);
                gifDiv.append(p);

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifs-appear-here").prepend(gifDiv);
            }
            //changes state of gif from still to animated or vice versa when gif is clicked
            $(".gif").on("click", function () {
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                    $(this).attr("src", $(this).attr("tvShow-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("tvShow-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });


}

// Function for displaying tv show data
function renderButtons() {

    // Deleting the tv shows prior to adding new tv shows
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < shows.length; i++) {

        // Then dynamicaly generating buttons for each tv show in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("tvShow-btn");
        // Adding a data-attribute
        a.attr("data-name", shows[i]);
        // Providing the initial button text
        a.text(shows[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a tv show button is clicked
$("#add-tv").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var tv = $("#tv-input").val().trim();

    // Adding tv show from the textbox to our array
    shows.push(tv);

    // Calling renderButtons which handles the processing of our shows array
    renderButtons();
});
// Adding a click event listener to all elements with a class of "tvShow-btn"
$(document).on("click", ".tvShow-btn", displayTVInfo);

//clears local storage and favorite gifs held there
$("#clear").on("click",function (){
    localStorage.clear();
});

// Calling the renderButtons function to display the intial buttons
renderButtons();