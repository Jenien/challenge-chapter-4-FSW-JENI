AOS.init();
document.addEventListener('DOMContentLoaded', function () {
    var owlCarousel = $('.owl-carousel');
    owlCarousel.owlCarousel({
      center: true,
      loop: true,
      margin: 10,
      nav: false,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 2 }
      }
    });
  
    var prevButton = $('.prev-button');
    var nextButton = $('.next-button');
  
    prevButton.click(function () {
      owlCarousel.trigger('prev.owl.carousel');
    });
  
    nextButton.click(function () {
      owlCarousel.trigger('next.owl.carousel');
    });
  });
  