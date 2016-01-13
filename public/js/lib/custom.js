$(window).load(function() {
    $('.flexslider').flexslider({
        animation: "fade",
        animationLoop: true,
        controlNav: true,
        directionNav: false
    });
});


$(document).ready(function() {
      // $('.preloading').fadeOut();
    // $('#carousel_vertical_slide, #carousel-testimonial-1, #carousel-testimonial-2, #carousel_fade, #carousel_vertical_testimonial, #carousel_fade_icons, #carousel-support, #carousel_fade_2, #carousel_testimonial_2').carousel({
    //     interval: 3000
    // });

   $('#example').DataTable( {
        "pagingType": "full_numbers"
    });

  var $myCarousel = $('.topCarousel');
  var $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation = 'animated']");

  // Initialize carousel
  $myCarousel.carousel();({
    interval: 4000
  })


    $('#logokhan').hover(function() {
        $(this).addClass('animated tada');
    }, function() {
        $(this).removeClass('animated tada');
    });
    //            Responsive Videos
    $("#main-media").fitVids();
    ///////////// HEIGHT OF FIRST FRAME OF WEBSITE

    //////// NICE SCROLL JS
    $(function() {
        $("html").niceScroll({
            horizrailenabled: false
        });
    });
});
///////////// ANCHOR SCROLLS


$('td', 'table').each(function(i) {
    $(this).text(i+1);
});


$('table.paginated').each(function() {
    var currentPage = 0;
    var numPerPage = 10;
    var $table = $(this);
    $table.bind('repaginate', function() {
        $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
    });
    $table.trigger('repaginate');
    var numRows = $table.find('tbody tr').length;
    var numPages = Math.ceil(numRows / numPerPage);
    var $pager = $('<div class="pager"></div>');
    for (var page = 0; page < numPages; page++) {
        $('<span class="page-number"></span>').text(page + 1).bind('click', {
            newPage: page
        }, function(event) {
            currentPage = event.data['newPage'];
            $table.trigger('repaginate');
            $(this).addClass('active').siblings().removeClass('active');
        }).appendTo($pager).addClass('clickable');
    }
    $pager.insertBefore($table).find('span.page-number:first').addClass('active');
});






//
//
// Cache selectors
var lastId,
    topMenu = $(".nav"),
    topMenuHeight = topMenu.outerHeight() + 50,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function() {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
        ///////////////TWITTER

        ///////////////FANCYBOX
        $(".fancybox-media").fancybox({
            arrows: true,
            padding: 0,
            closeBtn: true,
            openEffect: 'fade',
            closeEffect: 'fade',
            prevEffect: 'fade',
            nextEffect: 'fade',
            helpers: {
                media: {},
                overlay: {
                    locked: false
                },
                buttons: false,
                title: {
                    type: 'inside'
                }
            },
            beforeLoad: function() {
                var el, id = $(this.element).data('title-id');
                if (id) {
                    el = $('#' + id);
                    if (el.length) {
                        this.title = el.html();
                    }
                }
            }
        });
    });
