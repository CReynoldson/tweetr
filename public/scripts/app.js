/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function(){

var tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

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
  var currentTweet;
  for (var i = 0; i < tweets.length; i++){
    currentTweet = createTweetElement(tweets[i]);
    $("#tweetFeed").append(currentTweet);
  }
}

$("form").on("submit", function (event){
  event.preventDefault();
  var newTweetContent = $.ajax({
    method: "post",
    url: "/tweets",
    data: $(this).serialize()
  });
  newTweetContent.done(function (data){
  });
});































renderTweets(tweetData);

});