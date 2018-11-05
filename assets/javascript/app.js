var shows = ["The Simpsons", "Malcom in the Middle", "Breaking Bad", "Shameless"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayTVInfo() {

  var tvShow = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  tvShow + "&api_key=JmdbcXSaY4GSJKJRJfuc815gRUIOu4Jd";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Creating a div to hold the tvShow
    var tvShowDiv = $("<div class='tvShow'>");

    // Storing the rating data
    var rating = response.rating;

    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    tvShowDiv.append(pOne);

    // Putting the entire movie above the previous movies
    $("#tvShow-view").prepend(tvShowDiv);
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
$("#add-tv").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var tv = $("#tv-input").val().trim();

  // Adding tv show from the textbox to our array
  shows.push(tv);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".tvShow-btn", displayTVInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();