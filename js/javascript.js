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
/* When the user scrolls down, hide the navbar. 
/* When the user scrolls up, show the navbar */
/*----------------------------------------------------*/
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
    /*----------------------------------------------------*/
    /* When the user scrolls down 20px from the top of 
    /* the document, show the button
    /*----------------------------------------------------*/
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

/*----------------------------------------------------*/
/* When the user clicks on the button, 
/* scroll to the top of the document
/*----------------------------------------------------*/
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}