

  $(function() {
        $(window).scroll(function() {
            if ($(".navbar").offset().top > $(window).height()) {
                $(".navbar-purity").addClass("sticky");
            }
            else {
                $(".navbar-purity").removeClass("sticky");
            }
        });

    });