/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Returns the number of days (rounded down) from the past to now
const getDaysElapsed = function(past) {
  let elapsedMs = Date.now() - past;
  return Math.floor(elapsedMs /= 1000 * 60 * 60 * 24);
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
          <img src='${avatars}' class='avatar'>
          <span class='name'>${name}</span>
          <span class='handle'>${handle}</span>
        </header>
        <main>${text}</main>
        <footer>${getDaysElapsed(createdAt)} days ago <span class='tweet-footer-icons'><i class="fa fa-flag"></i><i class="fa fa-retweet"></i><i class="fa fa-heart"></i></span></footer>
      </article>
  `;
  return tweet;
};

// Parses elements in array into single markup according to callback function
const getMarkupFromArray = function(array, callback) {
  const markUpArray = [];
  array.forEach(element => markUpArray.push(callback(element)));
  return markUpArray.join('');
};

// Appends tweet objects in tweetsArray into #tweets-container element
const renderTweets = function(tweetsArray) {
  const tweetsMarkup = getMarkupFromArray(tweetsArray, createTweetElement);
  $('#tweets-container').append(tweetsMarkup);
};

// Handles submission of new tweet
$(function() {
  $('#tweet-form').on('submit', (event) => {
    event.preventDefault();
    const data = $('#tweet-text').serialize();
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data
    })
      .then(res => {
        console.log(data);
        console.log(res);
      });
  });
});

// Makes ajax request for tweets and renders them on page
const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    type: 'GET'
  })
    .then(res => {
      renderTweets(res);
    });
};
loadTweets();
