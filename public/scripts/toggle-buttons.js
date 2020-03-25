const showNewTweet = function() {
  $('.new-tweet').slideDown();
  $('html, body').animate({ scrollTop: '270px' }, 1000);
  $('#tweet-text').focus();
};

// Toggles sliding new tweet form into view and selecting text area
const toggleShowNewTweet = function() {
  if ($('.new-tweet').is(':hidden')) {
    showNewTweet();
  } else {
    $('.new-tweet').slideUp();
  }
};

$(() => {
  // Performs toggle when top nav, or show when bottom-right buttons is clicked
  $('#nav-compose-button').on('click', toggleShowNewTweet);
  $('#scroll-top-button').on('click', showNewTweet);

  // If page is scrolled down, shows a button on bottom-right to jump to top 
  $(document).on('scroll', () => {
    if ($(document).scrollTop() > 500) {
      $('#scroll-top-button').removeClass('hidden');
    } else {
      $('#scroll-top-button').addClass('hidden');
    }
  });
});


