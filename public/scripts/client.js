/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Escapes user input using document.createTextNode
const escape = function(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Returns the number of days (rounded down) from the past to now
const getDaysElapsed = function(past) {
  let elapsedMs = Date.now() - past;
  return Math.floor((elapsedMs /= 1000 * 60 * 60 * 24));
};

// Creates and returns HTML of a tweet enclosed in <article>
const createTweetElement = function(tweetObj) {
  const {
    user: { name, avatars, handle },
    content: { text },
    created_at: createdAt
  } = tweetObj;
  const tweet = `
      <article class='tweet'>
        <header>
          <img src='${escape(avatars)}' class='avatar'>
          <span class='name'>${escape(name)}</span>
          <span class='handle'>${escape(handle)}</span>
        </header>
        <main>${escape(text)}</main>
        <footer>${getDaysElapsed(createdAt)} days ago <span class='tweet-footer-icons'><i class="fa fa-flag"></i><i class="fa fa-retweet"></i><i class="fa fa-heart"></i></span></footer>
      </article>
  `;
  return tweet;
};

// Parses elements in array into single markup according to callback function
// Last element appears first in markup
const getMarkupFromArray = function(array, callback) {
  const markUpArray = [];
  array.forEach(element => markUpArray.unshift(callback(element)));
  return markUpArray.join("");
};

// Appends tweet objects in tweetsArray into #tweets-container element
const renderTweets = function(tweetsArray) {
  const tweetsMarkup = getMarkupFromArray(tweetsArray, createTweetElement);
  $("#tweets-container").html(tweetsMarkup);
};

// Makes ajax request for tweets and renders them on page
const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    type: 'GET',
    dataType: 'JSON'
  })
    .then(res => {
      renderTweets(res);
    })
    .catch(error => {
      renderError('Something went wrong when fetching tweets!', 'We apologize for the inconvenience.');
    });
};

$(() => {
  loadTweets();

  // Handles submission of new tweet
  $("#tweet-form").on("submit", event => {
    event.preventDefault();

    // Validation and error feedback of tweet length
    const $error = $("#new-tweet-error");
    $error.slideUp();
    const tweet = $("#tweet-text").val();

    if (!tweet) {
      $error.html('<i class="fa fa-exclamation-triangle"></i> Your tweet was empty! Please enter something to tweet! <i class="fa fa-exclamation-triangle"></i>');
      return $error.slideDown();
    }

    if (tweet.length > 140) {
      $error.html('<i class="fa fa-exclamation-triangle"></i> Please respect our character limit! <i class="fa fa-exclamation-triangle"></i>');
      return $error.slideDown();
    }

    // Disable submit button until ajax resolves to prevent duplicate tweets
    $('#tweet-form').children('button').prop('disabled', true);

    // Ajax post request passing in the tweet then rerendering the tweets
    const data = $("#tweet-text").serialize();
    $.ajax({
      url: "/tweets",
      type: "POST",
      data
    })
      .then(res => {
        $("#tweet-text").val("");
        updateCounter();
        loadTweets();
        $('#tweet-form').children('button').prop('disabled', false);
      })
      .catch(error => {
        renderError('Something went wrong when posting your tweet!', 'We apologize for the inconvenience.');
        $('body').html(errorMessage);
      });
  });
});

const renderError = function(heading, message) {
  const errorMessage = `
        <div class="error">
          <h1>${heading}</h1>
          <p>${message}</p>
        </div>
      `;
  $('body').html(errorMessage);
};