(function($){
  $(function(){

    $('.button-collapse').sideNav();

    $('.carousel.carousel-slider').carousel({full_width: true});

     $('.slider').slider({full_width: true});

     $('.pgwSlider').pgwSlider({
    maxHeight : 400,
    intervalDuration : 4000
}
	);

  }); // end of document ready
})(jQuery); // end of jQuery name space