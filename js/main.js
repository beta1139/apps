(function () {
    'use strict';

    var navToggle = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('nav-links');
    var backToTop = document.getElementById('back-to-top');
    var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    var sections = [];

    navAnchors.forEach(function (anchor) {
        var id = anchor.getAttribute('href').slice(1);
        var section = document.getElementById(id);
        if (section) {
            sections.push({ id: id, el: section, link: anchor });
        }
    });

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var open = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    function onScroll() {
        var scrollY = window.scrollY || window.pageYOffset;

        if (backToTop) {
            backToTop.classList.toggle('visible', scrollY > 400);
        }

        var current = sections[0];
        sections.forEach(function (section) {
            if (scrollY >= section.el.offsetTop - 120) {
                current = section;
            }
        });

        navAnchors.forEach(function (a) {
            a.classList.remove('active');
        });
        if (current) {
            current.link.classList.add('active');
        }
    }

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    document.querySelectorAll('.game-carousel').forEach(function (carousel) {
        var imgs = carousel.querySelectorAll('img');
        if (imgs.length < 2) {
            return;
        }

        var delay = parseInt(carousel.getAttribute('data-delay') || '5000', 10);
        var startDelay = parseInt(carousel.getAttribute('data-start-delay') || '0', 10);
        var index = 0;

        function showNext() {
            imgs[index].classList.remove('is-active');
            index = (index + 1) % imgs.length;
            imgs[index].classList.add('is-active');
        }

        setTimeout(function () {
            setInterval(showNext, delay);
        }, startDelay);
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();
