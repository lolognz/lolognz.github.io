/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

$('header').css({ 'height': $(window).height() });
$(window).on('resize', function() {

    $('header').css({ 'height': $(window).height() });
    $('body').css({ 'width': $(window).width() })
});

/*----------------------------------------------------*/
/* When the user scrolls down 20px from the top of the document, show the button
/* When the user scrolls down 20px from the top of the document, slide down the navbar
/*----------------------------------------------------*/
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("myBtn").style.display = "none";
        document.getElementById("navbar").style.top = "-80px";
    }

    var windowheight = $(window).scrollTop();
    var sectionabout = document.getElementById("section-about").offsetTop;

    if (windowheight >= sectionabout) {
        document.getElementById("navbar").style.backgroundColor = "#333";
    } else {
        document.getElementById("navbar").style.backgroundColor = "transparent";
    }

}

/*----------------------------------------------------*/
/* When the user clicks on the button, 
/* scroll to the top of the document
/*----------------------------------------------------*/
function topFunction() {
    window.scroll({ top: 0, behavior: "smooth" });
}