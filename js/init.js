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

    $('.modal').modal();

    $('.tooltipped').tooltip({delay: 50});

    $('ul.tabs').tabs();

    $("#gallery").unitegallery();	


    // OWL
   $("#owl-demo").owlCarousel({
 
      autoPlay: 3000, //Set AutoPlay to 3 seconds
 
      items : 6,
      // itemsDesktop : [1199,3],
      // itemsDesktopSmall : [979,3]
 
  });

  }); // end of document ready
})(jQuery); // end of jQuery name space