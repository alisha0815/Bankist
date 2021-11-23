'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionOne = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// forEach loop to open modal
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button Scrolling
btnScrollTo.addEventListener('click', function (e) {
  const slcoords = sectionOne.getBoundingClientRect();
  console.log(slcoords);

  console.log(e.target.getBoundingClientRect());

  // current get scroll position
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // height, width
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // scrolling
  // window.scrollTo(
  //   slcoords.left + window.pageXOffset,
  //   slcoords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: slcoords.left + window.pageXOffset,
  //   top: slcoords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // More modern way of scrolling
  sectionOne.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// event delegation
// 1. Add event listener to common parent element
// 2. Determine what element orginated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target); // where the event happned
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/////////////// Tabbed component ///////////////
// selecting components
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// functionality on button handler
// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

// events delegation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // ignore any clicks where the result is null
  if (!clicked) return;

  // Removing tabsm contents active
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab content
  clicked.classList.add('operations__tab--active');
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const nav = document.querySelector('.nav');

// Refactoring
const hoverHandler = function (e) {
  if (e.target.classList.contains('nav__link')) {
    // console.log(this);
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        // setting this keyword manually to opacity
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};
// fading out
nav.addEventListener('mouseover', hoverHandler.bind(0.5));

// nav.addEventListener('mouseover', function (e) {
//   hoverHandler(e, 0.5);
// });

// getting back to opacity 1
nav.addEventListener('mouseout', hoverHandler.bind(1));

// Sticky Navigation
// const initialCoords = sectionOne.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   //current scroll position
//   // console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else nav.classList.remove('sticky');
// });

// window.addEventListener('scroll', function (e) {
//   console.log(e);
// });

////////////////////////////////////////////////////////
/////sticky navig ation by using intersection API //////
////////////////////////////////////////////////////////
const header = document.querySelector('.header');

// calculating nav hegiht
const navHeight = nav.getBoundingClientRect().height;

//callback function
const stickyNav = function (entries) {
  const [entry] = entries; //entries[0]
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

// createing observer
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
// creating new intersection observer
// callback function for observer
// this call back function will be called each time that the observed element (our target element) is intersecting the root element at the threshold
// whenever our target element is intersecting the viewport at 10%, this function will get called no matter if we are scrolling up or down
// entries are an array of the threshold entries
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
//   // threshold: 0.1, //the percentage of intersection at which the observer callback will becalled
// };

// // objects for observer
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(sectionOne);
