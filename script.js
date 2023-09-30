'use strict';

///////////////////////////////////////
// Variables
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContents = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const section1 = document.querySelector('#section--1');

// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth Scroll with js
document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView();
    // document.querySelector(id).scrollIntoView({ behavior: 'smooth' }); // achieved with css scroll-behavior
  }
});

// Tabbed Content
tabsContainer.addEventListener('click', e => {
  // Active Tab
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(tab => tab.classList.remove('operations__content--active'));
  clicked.classList.add('operations__content--active');

  // Active content area
  const contentArea = document.querySelector(
    `.operations__content--${clicked.dataset.tab}`
  );
  tabsContents.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  contentArea.classList.add('operations__content--active');
});

// Menu fade Animation
const handleHover = (element, opacity) => {
  if (element.target.classList.contains('nav__link')) {
    const link = element.target;
    const linkSiblings = nav.querySelectorAll('.nav__link');
    const logo = nav.querySelector('.nav__logo');

    linkSiblings.forEach(sibling => {
      if (sibling !== link) sibling.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', e => handleHover(e, 0.5));

nav.addEventListener('mouseout', e => handleHover(e, 1));

// Sticky Nav
const header = document.querySelector('header');
const navHeight = nav.getBoundingClientRect().height;

const headerObsCallback = entries => {
  const [entry] = entries;
  const intersecting = entry.isIntersecting
    ? nav.classList.remove('sticky')
    : nav.classList.add('sticky');
};

const headerObsOpts = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(
  headerObsCallback,
  headerObsOpts
);
headerObserver.observe(header);

// Reveal Section
const sections = document.querySelectorAll('.section');

const sectionObsCallback = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObsOpts = {
  root: null,
  threshold: 0.2,
};

const sectionObserver = new IntersectionObserver(
  sectionObsCallback,
  sectionObsOpts
);

sections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// Lazy loading images
const lazyLoadImgs = document.querySelectorAll('img[data-src]');

const lazyLoadObsCallback = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  const img = entry.target;
  const src = img.dataset.src;
  img.setAttribute('src', src);

  img.addEventListener('load', () => {
    img.classList.remove('lazy-img');
  });

  observer.unobserve(img);
};

const lazyLoadObsOpts = {
  root: null,
  threshold: 1,
  rootMargin: '200px',
};

const lazyLoadImgObs = new IntersectionObserver(
  lazyLoadObsCallback,
  lazyLoadObsOpts
);
lazyLoadImgs.forEach(img => {
  lazyLoadImgObs.observe(img);
});

//// Slider
// Slider variables
const startSlider = () => {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const dotContainer = document.querySelector('.dots');

  let currSlide = 0;
  const maxSlides = slides.length;

  // Slider functions
  const initSlider = () => {
    goToSlide(0);

    createDots();

    activateDot(0);
  };

  const createDots = () => {
    slides.forEach((_, i) => {
      // const dotHtml = `<button class="dots__dot" data-slide="${i}"></button>`;
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = index => {
    const dots = document.querySelectorAll('.dots__dot');
    dots.forEach(dot => dot.classList.remove('dots__dot--active'));
    dots[index].classList.add('dots__dot--active');
  };

  const goToSlide = slideIndex => {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - slideIndex)}%)`;
    });
  };

  const nextSlide = () => {
    if (currSlide === maxSlides - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const prevSlide = () => {
    if (currSlide === 0) {
      currSlide = maxSlides - 1;
    } else {
      currSlide--;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  initSlider();

  // Slider Events
  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', prevSlide);

  window.addEventListener('keydown', e => {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  dotContainer.addEventListener('click', e => {
    const dot = e.target.closest('.dots__dot');
    const slide = dot.dataset.slide;

    goToSlide(slide);

    activateDot(slide);
  });
};

startSlider();
