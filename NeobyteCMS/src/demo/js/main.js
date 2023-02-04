(function() {
  'use strict';

  $('a.page-scroll').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location
      .hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 40
        }, 900);
        return false;
      }
    }
  });

  // Show Menu on Book
  $(window).bind('scroll', function() {
    var navHeight = $(window).height() - 500;
    if ($(window).scrollTop() > navHeight) {
      $('.navbar-default').addClass('on');
    } else {
      $('.navbar-default').removeClass('on');
    }
  });

  $('body').scrollspy({
    target: '.navbar-default',
    offset: 80
  });

  // Contact form
  $('.contact-form').on('submit', function(event) {
    event.preventDefault();
    window.alert('Thanks! Your submission has been received.');
  });

  // Hide nav on click
  $(".navbar-nav li a").click(function(event) {
    // check if window is small enough so dropdown is created
    var toggle = $(".navbar-toggle").is(":visible");
    if (toggle) {
      $(".navbar-collapse").collapse('hide');
    }
  });

  // Nivo Lightbox (only initialize if we're not in the editor)
  if (!window.isCMS) {
    var i = 0;

    // Loop through each gallery
    $('.cms-gallery').each(function() {
      var gallery = this;
      i++;

      // Loop through each link in the gallery
      $(gallery).find('a').each(function() {
        var a = this;
        var img = $(a).find('img');
        var caption = $(img).attr('data-caption');
        var alt = $(img).attr('alt');

        // Shim the appropriate attributes and initialize Nivo
        $(a)
          .attr('data-lightbox-gallery', 'gallery-' + i)
          .attr('data-caption', caption)
          .attr('title', caption)
          .nivoLightbox({
            effect: 'slideDown',
            keyboardNav: true
          });

        console.log(a);
      });
    });  
  }
}());