/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function(){

function createTweetElement(tweetData){
  var $tweet = $("<article>").addClass("tweet");
  var $header = $("<header>");
  var $avatar = $("<img>").addClass("avatar").attr("src", tweetData.user.avatars.regular);
  var $padding = $("<div>").addClass("headerTextPadding");
  var $name = $("<h3>").addClass("name").text(tweetData.user.name);
  var $handle = $("<span>").addClass("handle").text(tweetData.user.handle);
  var $content = $("<p>").addClass("tweetContent").text(tweetData.content.text);
  var $footer = $("<footer>");
  var timeElapsed = Math.floor((Date.now() - tweetData.created_at)/(1000*60*60*24));
  var $timeStamp = $("<span>").text(timeElapsed + " days ago");
  var $heartIcon = $("<i>").attr({"class":"fa fa-heart", "aria-hidden":"true"});
  var $retweetIcon = $("<i>").attr({"class":"fa fa-retweet", "aria-hidden":"true"});
  var $flagIcon = $("<i>").attr({"class":"fa fa-flag", "aria-hidden":"true"});


  $padding = $padding.append($name).append($handle);
  $header = $header.append($avatar).append($padding);
  $footer = $footer.append($timeStamp).append($heartIcon).append($retweetIcon).append($flagIcon);

  $tweet = $tweet.append($header).append($content).append($footer);

  return $tweet;
}

function renderTweets(tweets){
  console.log("Got to renderTweets with " + tweets);
  var currentTweet;
  for (var i = 0; i < tweets.length; i++){
    currentTweet = createTweetElement(tweets[i]);
    $("#tweetFeed").prepend(currentTweet);
  }
}


function loadTweets(loadAllTweets){
  $.ajax({
    method: "get",
    url: "/tweets",
    data: $(this).serialize(),
    dataType: "json",
  }).done(function(data){

    if (loadAllTweets === true){
      renderTweets(data);
    } else if (loadAllTweets === false) {
      $("#tweetFeed").prepend(createTweetElement(data[data.length - 1]));
      // let singleTweet = [data[data.length - 1]];
      // renderTweets(singleTweet);
    }
  });
}

$("form").on("submit", function (event){
  event.preventDefault();

  var text = $("textarea").val().length;
  if (!text){
    $.flash("You didn't enter anything!");
  } else if (text > 140){
    $.flash("Check the counter -- that's way too long. So embarrassing.");
  } else {
    $.ajax({
      method: "post",
      url: "/tweets",
      data: $(this).serialize(),
      dataType: 'json'
    });
    loadTweets(false);
    $("#text").val("");
  }
});

$("#compose-button").on("click", function (){
  $("#new-tweet").slideToggle();
  $("#new-tweet textarea").focus();
})


loadTweets(true);


});