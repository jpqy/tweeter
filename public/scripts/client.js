/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Returns the number of days (rounded down) from the past to now
const getDaysElapsed = past => {
  let elapsedMs = Date.now() - past;
  console.log(elapsedMs);
  return Math.floor(elapsedMs /= 1000 * 60 * 60 * 24);
};

const createTweetElement = tweetObj => {
  const {
    user: { name, avatars, handle },
    content: { text },
    created_at: createdAt
  } = tweetObj;
  const articleHTML = `
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
  return articleHTML;
};



const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$(document).ready(() => {
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});