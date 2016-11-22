$(document).ready(function(){

  //users in streams will be added to the nav bar (might change this later)
  var makeUsers = function() {
    var $nav = $('nav');
    for (var user in streams.users) {
      var $user = $('<button class =' + user + '>@' + user +'</button>');
      $user.text(user);
      $user.addClass('btn')
      $user.appendTo($nav);
    }
  };
  
  //makes the tweets to be fed into twittlerStream
  var makeTweets = function(filter) {
    var $tweetInput = $('.tweet-input'); 
    $tweetInput.html('');

    var index = filter.length - 1;
    while(index >= 0){
      var tweet = filter[index];
      var $tweet = $('<div class = \'twt\'></div>');
      var $time = $('<div class = \'time\'></div>');
      $time.text(tweet.created_at)
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $time.appendTo($tweetInput);
      $tweet.appendTo($tweetInput);
      index -= 1;
    }
  };

  //Adds users to nav bar
  makeUsers();

  //Starts twittler stream
  var home = function() {
    makeTweets(streams.home);
  };

  var twittlerStream = setInterval(home,1000);
  
  //filters by username
  $('button').on('click', function() {
    var $username = $(this)[0].innerHTML;
    if ($username === "Twittler") {
      clearInterval(twittlerStream);
      twittlerStream = setInterval(home,1000);
    } else {
      clearInterval(twittlerStream);
      var userStream = function () {
        makeTweets(streams.users[$username])
      };
      twittlerStream = setInterval(userStream,1000);
    }
  });


});


