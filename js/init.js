(function($){
  $(function(){

    $('.button-collapse').sideNav();

    $('.carousel.carousel-slider').carousel({full_width: true});

     $('.slider').slider({full_width: true});

     $('.pgwSlider').pgwSlider({
    maxHeight : 500,
    intervalDuration : 4000
}
	);

    $('.modal').modal();
  }); // end of document ready
})(jQuery); // end of jQuery name space