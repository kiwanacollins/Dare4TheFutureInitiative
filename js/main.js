(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow');
            } else {
                $('.fixed-top').removeClass('bg-dark shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-dark shadow').css('top', 0);
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Causes progress
    $('.causes-progress').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

    
})(jQuery);


// Translation start

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
    // console.log(`Set cookie: ${name}=${value}`);
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            const value = c.substring(nameEQ.length, c.length);
            // console.log(`Got cookie: ${name}=${value}`);
            return value;
        }
    }
    // console.log(`Cookie ${name} not found`);
    return null;
}

function translatePage(targetLang) {
    const elementsToTranslate = document.querySelectorAll('h1, h2, p, li, a');

    elementsToTranslate.forEach(element => {
        if (targetLang === 'en') {
            // Revert to original text
            if (element.hasAttribute('data-original-text')) {
                element.textContent = element.getAttribute('data-original-text');
            }
        } else {
            // Store original text if not already done
            if (!element.hasAttribute('data-original-text')) {
                element.setAttribute('data-original-text', element.textContent);
            }

            const text = element.textContent;
            fetch(`http://localhost:3000/translate?text=${encodeURIComponent(text)}&targetLang=${encodeURIComponent(targetLang)}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    element.textContent = data.text;
                })
                .catch(error => console.error('Error:', error));
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const targetLangSelect = document.getElementById('targetLang');
    
    // Check for saved language in cookies
    const savedLang = getCookie('selectedLang');
    if (savedLang) {
        targetLangSelect.value = savedLang;
        translatePage(savedLang);
    }

    targetLangSelect.addEventListener('change', function() {
        const selectedLang = this.value;
        setCookie('selectedLang', selectedLang, 30); // Save the language selection for 30 days
        translatePage(selectedLang);
    });

    if (targetLangSelect) {
        targetLangSelect.addEventListener('change', function() {
            const selectedLang = this.value;
            setCookie('selectedLang', selectedLang, 30); // Save the language selection for 30 days
            translatePage(selectedLang);
        });
    }
});


// Translation End


