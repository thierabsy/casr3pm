$( document ).ready(function(){
 $(".button-collapse").sideNav();

 $(".letering").textillate({ initialDelay: 500, in: { delay: 3, effect: 'fadeInRight', shuffle: false } });


    setTimeout(function() {
        $(".topBtn").removeClass("topBtn").addClass("fadeInRight")
    }, 2000);

   $('.slider').slider({full_width: true});

   $('.parallax').parallax();

   $('nav').scrollFix({
     top: 32
    });
     $('.topOfThePage').scrollFix({
       top:0
    });
     $('.smallLineFixed').scrollFix({
       top:30
    });
     $('.smallLineNav').scrollFix({
       top:96
    });


  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    }
  );
})
