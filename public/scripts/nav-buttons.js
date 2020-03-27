// Scrolls to, reveals, and focuses on the 'compose new tweet' form
const showNewTweetArea = function() {
  $('.new-tweet').slideDown();
  $('html, body').animate({ scrollTop: '0px' }, 1000);
  $('#tweet-text').focus();
};

// Toggles visibility of 'compose new tweet' form
const toggleNewTweetArea = function() {
  if ($('.new-tweet').is(':hidden')) {
    showNewTweetArea();
  } else {
    $('.new-tweet').slideUp();
  }
};

$(() => {
  $('#nav-compose-button').on('click', toggleNewTweetArea);

  // If page is scrolled down past the nav toggler, show a fixed button on 
  // bottom-right of screen to jump up to 'new tweet' form.
  $(document).on('scroll', () => {
    if ($(document).scrollTop() > $('#nav-compose-button').position().top) {
      $('#scroll-top-button').removeClass('hidden');
    } else {
      $('#scroll-top-button').addClass('hidden');
    }
  });

  $('#scroll-top-button').on('click', showNewTweetArea);
  $('.brand').on('click', showNewTweetArea);
});


