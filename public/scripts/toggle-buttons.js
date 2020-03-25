// Toggles sliding new tweet form into view when 'Write a new tweet'
// button is clicked
$(() => {
  $('#nav-compose-button').on('click', function() {
    const $newTweetArea = $('.new-tweet');
    if ($newTweetArea.is(':hidden')) {
      $newTweetArea.slideDown();
      $('html, body').animate({ scrollTop: '0px' }, 1000);
      $('#tweet-text').focus();
    } else {
      $newTweetArea.slideUp();
    }
  });

  // Shows a button on button right to scroll to top if page is scrolled down
  $(document).on('scroll', () => {
    if ($(document).scrollTop() > 500) {
      $('#scroll-top-button').removeClass('hidden');
    } else {
      $('#scroll-top-button').addClass('hidden');
    }
  });

});


