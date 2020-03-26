const showNewTweetArea = function() {
  $('.new-tweet').slideDown();
  $('html, body').animate({ scrollTop: '270px' }, 1000);
  $('#tweet-text').focus();
};

// Toggles sliding new tweet form into view and selecting text area
const toggleNewTweetArea = function() {
  if ($('.new-tweet').is(':hidden')) {
    showNewTweetArea();
  } else {
    $('.new-tweet').slideUp();
  }
};

$(() => {
  $('#nav-compose-button').on('click', toggleNewTweetArea);
  $('#scroll-top-button').on('click', showNewTweetArea);

  // If page is scrolled down past the top buttons, show a button
  // on bottom-right to jump to top 
  $(document).on('scroll', () => {
    if ($(document).scrollTop() > $('#nav-compose-button').position().top) {
      $('#scroll-top-button').removeClass('hidden');
    } else {
      $('#scroll-top-button').addClass('hidden');
    }
  });
});


