// Escapes user input using document.createTextNode
const escape = function(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Creates and returns HTML of a tweet enclosed in article.tweet tags using
// template string and escaping user inputs
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
        <footer><time class='timeago' datetime='${new Date(createdAt).toISOString()}'></time> <span class='tweet-footer-icons'><i class='fa fa-flag'></i><i class='fa fa-retweet'></i><i class='fa fa-heart'></i></span></footer>
      </article>
  `;
  return tweet;
};

// Parses elements in array into single markup according to callback function
// Last element appears first in markup
const getMarkupFromArray = function(array, callback) {
  const markUpArray = [];
  array.forEach(element => markUpArray.unshift(callback(element)));
  return markUpArray.join('');
};

// Appends tweet objects in tweetsArray into #tweets-container element
const renderTweets = function(tweetsArray) {
  const tweetsMarkup = getMarkupFromArray(tweetsArray, createTweetElement);
  $('#tweets-container').html(tweetsMarkup);
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
      $('time.timeago').timeago();
    })
    .catch(error => {
      renderError('Something went wrong when fetching tweets!', 'We apologize for the inconvenience.');
    });
};

const postTweet = function(event) {
  event.preventDefault();

  // Validation and error feedback of tweet length via sliding of error div
  const $error = $('#new-tweet-error');
  $error.slideUp();
  const tweet = $('#tweet-text').val();

  if (!tweet) {
    $error.html("<i class='fa fa-exclamation-triangle'></i> Your tweet was empty! Please enter something to tweet!");
    return $error.slideDown();
  }

  if (tweet.length > 140) {
    $error.html("<i class='fa fa-exclamation-triangle'></i> Please respect our character limit!");
    return $error.slideDown();
  }

  // Disable submit button until ajax resolves, to prevent duplicate tweets
  $('#tweet-form').children('button').prop('disabled', true);

  // Ajax POST request
  const data = $('#tweet-text').serialize();
  $.ajax({
    url: '/tweets',
    type: 'POST',
    data
  })
    .then(res => {
      $('#tweet-text').val('');
      updateCounter();
      loadTweets();
      $('#tweet-form').children('button').prop('disabled', false);
    })
    .catch(error => {
      renderError('Something went wrong when posting your tweet!', 'We apologize for the inconvenience.');
      $('body').html(errorMessage);
    });
};

// Readies a new tweet with original tweeter's handle and message
const reTweet = function($tweet) {
  showNewTweetArea();
  const handle = $tweet.find('.handle').text();
  const tweetText = $tweet.find('main').text();
  $('#tweet-text').val(`"${tweetText}" - ${handle}`);
  updateCounter();
};

$(() => {
  // Renders tweets on initial page load
  loadTweets();

  // Listener for tweet button
  $('#tweet-form').on('submit', postTweet);

  // Listener for retweet button
  $('main').on('click', event => {
    if ($(event.target).hasClass('fa-retweet')) {
      const $tweet = $(event.target).parents('article');
      reTweet($tweet);
    }
  });

});

const renderError = function(heading, message) {
  const errorMessage = `
        <div class='error'>
          <h1>${heading}</h1>
          <p>${message}</p>
        </div>
      `;
  $('body').html(errorMessage);
};