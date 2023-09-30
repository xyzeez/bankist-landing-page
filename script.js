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

const obsCallback = entries => {
  const [entry] = entries;
  const intersecting = entry.isIntersecting
    ? nav.classList.remove('sticky')
    : nav.classList.add('sticky');
};

const obsOpts = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const observer = new IntersectionObserver(obsCallback, obsOpts);
observer.observe(header);
