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
  // console.log(entry);

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

/////////////////////////////////////////////////////////
//////////////////// Reveal Sections ////////////////////
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry); //target

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, //set it something greater than 0, section is only revealed when it is 15 % visible.
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

/////////////////////////////////////////////////////////
/////////////// Lazy loading images ////////////////////

const imgTargets = document.querySelectorAll('img[data-src');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // once image loading is done, remove blurry class
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null, //set root to entire viewport
  threshold: 0, //start with 0 and then adjust threshold
  rootMargin: '200px', // image load a little bit earlier
});

// loop over images
imgTargets.forEach(img => imgObserver.observe(img));

/////////////////////////////////////////////////////////
////////////////////// Slider ///////////////////////////

const slides = document.querySelectorAll('.slide');

// buttons
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

// current slide
let curSlide = 0;
// tell js to stop sliding
const maxSlide = slides.length;

// scale down the slides for better view
// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.3) translateX(-1000px)'; //scaling down and moving to left
// slider.style.overflow = 'visible';

// putting slides side by side
slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

// function for moving to next slide
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);

// function for next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};
// function for previous slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
};
// Next slide
btnRight.addEventListener('click', nextSlide);

// Previous slide
btnLeft.addEventListener('click', prevSlide);

//the first slide should be 0%, second should be 100%, 200%...because translateX will basically move them to position 100%
