// Updates the character counter as 140 minus the characters in the text area
// Turns red when counter is negative (i.e characters exceed 140)
$(document).ready(function() {
  $('#tweet-text').on('keyup', function(event) {
    const textArea = $(this);
    let textLength = textArea.val().length;
    const counterDisplay = textArea.siblings('.counter');
    counterDisplay.text(140 - textLength);
    if (textLength <= 140) {
      counterDisplay.removeClass('too-long');
    } else {
      counterDisplay.addClass('too-long');
    }
  });
});