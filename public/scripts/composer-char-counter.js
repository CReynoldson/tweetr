// Using jQuery and an appropriate selector, register
// an event handler to the textarea element for the form inside
// of the .new-tweet section.


$(document).ready(function (){

  var tweetArea = $('.new-tweet').find('textarea');

  $(tweetArea).on('input', function (){
    var text = $(this).val().length;
    var maxLength = 140;
    var charCount = maxLength - text;
    var counterRender = $(this).parent().find('.counter').html(charCount);

    if (charCount < 0){
      $(counterRender).css('color', 'red');
    } else {
      $(counterRender).css('color', '');
    }
  });
});