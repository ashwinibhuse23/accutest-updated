(function ($) {
    "use strict";

    var $window = $(window);
    var $body = $('body');

    /* Preloader Effect */
    $window.on('load', function () {
        $(".preloader").fadeOut(600);
    });

    /* Sticky Header */
    if ($('.active-sticky-header').length) {
        $window.on('resize', function () {
            setHeaderHeight();
        });

        function setHeaderHeight() {
            $("header.main-header").css("height", $('header .header-sticky').outerHeight());
        }

        $window.on("scroll", function () {
            var fromTop = $(window).scrollTop();
            setHeaderHeight();
            var headerHeight = $('header .header-sticky').outerHeight()
            $("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
            $("header .header-sticky").toggleClass("active", (fromTop > 600));
        });
    }

    /* Slick Menu JS */
    $('#menu').slicknav({
        label: '',
        prependTo: '.responsive-menu'
    });

    if ($("a[href='#top']").length) {
        $(document).on("click", "a[href='#top']", function () {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return false;
        });
    }

    /* Hero Slider Layout JS */
    const hero_slider_layout = new Swiper('.hero-slider-layout .swiper', {
        effect: 'fade',
        slidesPerView: 1,
        speed: 1000,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 4000,
        },
        pagination: {
            el: '.hero-pagination',
            clickable: true,
        },
    });

    /* testimonial Slider JS */
    if ($('.testimonial-slider').length) {
        const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.testimonial-button-next',
                prevEl: '.testimonial-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
                991: {
                    slidesPerView: 1,
                },
                1200: {
                    slidesPerView: 1,
                }
            }
        });
    }

    /* Skill Bar */
    if ($('.skills-progress-bar').length) {
        $('.skills-progress-bar').waypoint(function () {
            $('.skillbar').each(function () {
                $(this).find('.count-bar').animate({
                    width: $(this).attr('data-percent')
                }, 2000);
            });
        }, {
            offset: '70%'
        });
    }

    /* Youtube Background Video JS */
    if ($('#herovideo').length) {
        var myPlayer = $("#herovideo").YTPlayer();
    }

    /* Init Counter */
    if ($('.counter').length) {
        $('.counter').counterUp({
            delay: 6,
            duration: 3000
        });
    }

    /* Image Reveal Animation */
    if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }

    /* Text Effect Animation */
    if ($('.text-anime-style-1').length) {
        let staggerAmount = 0.05,
            translateXValue = 0,
            delayValue = 0.5,
            animatedTextElements = document.querySelectorAll('.text-anime-style-1');

        animatedTextElements.forEach((element) => {
            let animationSplitText = new SplitText(element, {
                type: "chars, words"
            });
            gsap.from(animationSplitText.words, {
                duration: 1,
                delay: delayValue,
                x: 20,
                autoAlpha: 0,
                stagger: staggerAmount,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%"
                },
            });
        });
    }

    if ($('.text-anime-style-2').length) {
        let staggerAmount = 0.03,
            translateXValue = 20,
            delayValue = 0.1,
            easeType = "power2.out",
            animatedTextElements = document.querySelectorAll('.text-anime-style-2');

        animatedTextElements.forEach((element) => {
            let animationSplitText = new SplitText(element, {
                type: "chars, words"
            });
            gsap.from(animationSplitText.chars, {
                duration: 1,
                delay: delayValue,
                x: translateXValue,
                autoAlpha: 0,
                stagger: staggerAmount,
                ease: easeType,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%"
                },
            });
        });
    }

    if ($('.text-anime-style-3').length) {
        let animatedTextElements = document.querySelectorAll('.text-anime-style-3');

        animatedTextElements.forEach((element) => {
            //Reset if needed
            if (element.animation) {
                element.animation.progress(1).kill();
                element.split.revert();
            }

            element.split = new SplitText(element, {
                type: "lines,words,chars",
                linesClass: "split-line",
            });
            gsap.set(element, {
                perspective: 400
            });

            gsap.set(element.split.chars, {
                opacity: 0,
                x: "50",
            });

            element.animation = gsap.to(element.split.chars, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 90%"
                },
                x: "0",
                y: "0",
                rotateX: "0",
                opacity: 1,
                duration: 1,
                ease: Back.easeOut,
                stagger: 0.02,
            });
        });
    }

    /* Parallaxie js */
    var $parallaxie = $('.parallaxie');
    if ($parallaxie.length && ($window.width() > 991)) {
        if ($window.width() > 768) {
            $parallaxie.parallaxie({
                speed: 0.55,
                offset: 0,
            });
        }
    }

    /* Zoom Gallery screenshot */
    $('.gallery-items').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom',
        image: {
            verticalFit: true,
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }
    });

    /* Contact form validation */
    var $contactform = $("#contactForm");
    $contactform.validator({
        focus: false
    }).on("submit", function (event) {
        if (!event.isDefaultPrevented()) {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        /* Ajax call to submit form */
        $.ajax({
            type: "POST",
            url: "form-process.php",
            data: $contactform.serialize(),
            success: function (text) {
                if (text === "success") {
                    formSuccess();
                } else {
                    submitMSG(false, text);
                }
            }
        });
    }

    function formSuccess() {
        $contactform[0].reset();
        submitMSG(true, "Message Sent Successfully!")
    }

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h4 text-success";
        } else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    /* Contact form validation end */

    /* Animated Wow Js */
    new WOW().init();

    /* Popup Video */
    if ($('.popup-video').length) {
        $('.popup-video').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: true
        });
    }

    /* Services Item Active Start */
    var $service_list = $('.service-list');
    if ($service_list.length) {
        var $service_item = $service_list.find('.service-item');

        if ($service_item.length) {
            $service_item.on({
                mouseenter: function () {
                    if (!$(this).hasClass('active')) {
                        $service_item.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* Services Item Active End */

})(jQuery);
const milestones = [
    { year: "2005", text: "Ahmedabad and Vadodara operations were started." },
    { year: "2009", text: "Successfully cleared first 2 USFDA inspections." },
    { year: "2014", text: "Started CDS Services and expanded operations." },
    { year: "2017", text: "Added 125 beds at Gandhinagar facility." },
    { year: "2019", text: "Biologics Laboratory initiated in 2013." },
    { year: "2023", text: "Started Pre-clinical Services at new facility." },
    { year: "2025", text: "Completed 140+ global regulatory inspections." }
];

let currentIndex = 0;

// DOM ELEMENTS
const yearEl = document.getElementById("year");
const textEl = document.getElementById("text");
const contentBox = document.getElementById("contentBox");
const yearList = document.querySelectorAll("#yearList div");

/* --- UPDATE CONTENT WITH ANIMATION --- */
function updateContent(index) {
    if (!contentBox) return; // Guard clause

    contentBox.classList.add("fadeSlide");

    setTimeout(() => {
        if (yearEl) yearEl.textContent = milestones[index].year;
        if (textEl) textEl.textContent = milestones[index].text;

        yearList.forEach(y => y.classList.remove("active"));
        if (yearList[index]) yearList[index].classList.add("active");

        contentBox.classList.remove("fadeSlide");
    }, 300);
}

/* --- SCROLL TO CHANGE YEAR --- */
if (contentBox) {
    window.addEventListener("wheel", function (event) {
        if (event.deltaY > 0) currentIndex++;
        else currentIndex--;

        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex > milestones.length - 1) currentIndex = milestones.length - 1;

        updateContent(currentIndex);
    });
}

/* --- CLICK RIGHT SIDE YEARS --- */
if (yearList.length > 0) {
    yearList.forEach(item => {
        item.onclick = () => {
            let index = item.getAttribute("data-index");
            currentIndex = Number(index);
            updateContent(currentIndex);
        };
    });
}
/* Scrolling Ticker Section --*/
const items = document.querySelectorAll(".timeline-item");

function checkTimeline() {
    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            item.classList.add("show");
        }
    });
}


window.addEventListener("scroll", checkTimeline);
checkTimeline();
/* Scrolling Ticker Section End --*/

/*BA/BE services in numbers--*/

/*BA/BE services in numbers--*/

const numbers = document.querySelectorAll(".value");

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const num = entry.target;
            const animate = () => {
                const target = +num.getAttribute("data-target");
                let count = +num.innerText.replace(/,/g, ''); // Handle existing commas if any

                const speed = 40;
                const increment = Math.ceil(target / 100);

                if (count < target) {
                    num.innerText = count + increment;
                    setTimeout(animate, speed);
                } else {
                    // Final formatting
                    if (target === 3500) num.innerText = "3,500+";
                    else if (target === 45000) num.innerText = "45,000+";
                    else num.innerText = target.toLocaleString();
                }
            };
            animate();
            observer.unobserve(num);
        }
    });
}, {
    threshold: 0.5
});

numbers.forEach(num => {
    counterObserver.observe(num);
});




//05. Scrolling Ticker


document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".zigzag-timeline .timeline-item");

    items.forEach((item, index) => {
        item.classList.add(index % 2 === 0 ? "left" : "right");
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.3 });

    items.forEach(item => observer.observe(item));
});



document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        
        // Optional: Close other open items (Accordion effect)
        /*
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item) otherItem.classList.remove('active');
        });
        */

        item.classList.toggle('active');
        
        // Toggle the icon text
        const icon = header.querySelector('.icon-toggle');
        if (item.classList.contains('active')) {
            icon.textContent = '−';
        } else {
            icon.textContent = '+';
        }
    });
});




const items1 = document.querySelectorAll('.work-steps-item');

items1.forEach(item => {
    item.addEventListener('mouseenter', () => {
    
        items1.forEach(i => i.classList.remove('active'));
     
        item.classList.add('active');
    });
});







/* =========================
   COUNTER + PROGRESS + VIDEO
========================== */

// document.addEventListener("DOMContentLoaded", function () {

//     let counterStarted = false;
//     let progressStarted = false;

//     const counters = document.querySelectorAll(".counter");
//     const progressBars = document.querySelectorAll(".progress-bar");
//     const aboutSection = document.querySelector(".about-premium");

//     function startAnimations() {

//         const sectionTop = aboutSection.getBoundingClientRect().top;
//         const screenHeight = window.innerHeight;

//         if (sectionTop < screenHeight - 100) {

//             /* COUNTER ANIMATION */
//             if (!counterStarted) {
//                 counters.forEach(counter => {
//                     const target = +counter.getAttribute("data-target");
//                     let count = 0;
//                     const increment = target / 100;

//                     const updateCounter = () => {
//                         if (count < target) {
//                             count += increment;
//                             counter.innerText = Math.ceil(count);
//                             setTimeout(updateCounter, 20);
//                         } else {
//                             counter.innerText = target + "+";
//                         }
//                     };

//                     updateCounter();
//                 });

//                 counterStarted = true;
//             }

//             /* PROGRESS BAR ANIMATION */
//             if (!progressStarted) {
//                 progressBars.forEach(bar => {
//                     bar.style.width = bar.getAttribute("data-width");
//                 });

//                 progressStarted = true;
//             }

//         }
//     }

//     window.addEventListener("scroll", startAnimations);

// });



window.addEventListener("scroll", revealOnScroll);

function revealOnScroll() {

    let reveals = document.querySelectorAll(".reveal");
    let imageReveal = document.querySelectorAll(".image-reveal");

    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 120;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }

    for (let i = 0; i < imageReveal.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = imageReveal[i].getBoundingClientRect().top;

        if (elementTop < windowHeight - 120) {
            imageReveal[i].classList.add("active");
        }
    }
}







    function revealOnScroll() {
        let elements = document.querySelectorAll('.animate');

        elements.forEach(el => {
            let windowHeight = window.innerHeight;
            let elementTop = el.getBoundingClientRect().top;
            let revealPoint = 100;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);





    var swiper = new Swiper(".leadership-slider", {
        slidesPerView: 1.15,
        loop: true,
        speed: 800,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        }
    });

//     // Custom Arrow Controls
//     document.querySelector(".next-arrow").addEventListener("click", function () {
//         swiper.slideNext();
//     });

//     document.querySelector(".prev-arrow").addEventListener("click", function () {
//         swiper.slidePrev();
//     });


//  document.getElementById("year").textContent = new Date().getFullYear();




// document.addEventListener("DOMContentLoaded", function () {

//     const cards = document.querySelectorAll(".why-card");

//     cards.forEach(card => {
//         card.addEventListener("mousemove", function () {

//             // Remove active from all cards
//             cards.forEach(c => c.classList.remove("active-card"));

//             // Add active to clicked card
//             this.classList.add("active-card");

//         });
//     });

// });





var swiper = new Swiper(".whySlider", {
    slidesPerView: 4,
    centeredSlides: true,
    spaceBetween: 30,
    loop: true,
    speed: 1000,

    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },

    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    }
});









document.addEventListener("DOMContentLoaded", function () {

    const animatedElements = document.querySelectorAll(
        ".side-box, .about-content, .about-image-wrapper, .cert-strip"
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

});

const progressBars = document.querySelectorAll(".progress-bar");

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute("data-width");
            entry.target.style.width = width;
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});



const counters = document.querySelectorAll('.counter');

const counterObserver1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            let count = 0;

            const update = () => {
                const increment = target / 100;
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target;
                }
            };

            update();
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});





document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".expertise-card");

    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;

            if (cardTop < windowHeight - 100) {
                card.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // initial check

});











const counters1 = document.querySelectorAll('.count');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.getAttribute('data-target');
      const duration = 2500;
      const stepTime = 20;
      const increment = target / (duration / stepTime);

      const updateCount = () => {
        const current = +counter.innerText;
        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCount, stepTime);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
      observer.unobserve(counter);
    }
  });
}, { threshold: 0.3 });

counters1.forEach(counter => {
  observer.observe(counter);
});



const counters2 = document.querySelectorAll('.counter');

const startCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const duration = 1500; // total animation time
    const increment = target / (duration / 16);

    const update = () => {
        count += increment;
        if (count < target) {
            counter.innerText = Math.floor(count).toLocaleString();
            requestAnimationFrame(update);
        } else {
            counter.innerText = target.toLocaleString();
        }
    };

    update();
};

const observer1 = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter(entry.target);
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters2.forEach(counter => {
    observer.observe(counter);
});
