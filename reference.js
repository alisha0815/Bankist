// selecting elements
// selecting entire html document
console.log(document.documentElement);
// head
console.log(document.head);
// body
console.log(document.body);

// the first element that matches
const header = document.querySelector('.header');

// selecting multiple elements
// returns node list
const allSEctions = document.querySelectorAll('.section');
console.log(allSEctions);

// id
document.getElementById('#section--3');

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

document.getElementsByClassName('btn');

// Creating and Inserting elements
// insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');

// message.textContent =
//   'We use cookies for imporved functionality and analaytics';

message.innerHTML =
  'We use cookies for imporved functionality and analaytics. <button class="btn btn--close-cookie">Got it!</button>';

//insert it into DOM
// header.prepend(message); //the first child of header
header.append(message); // the last child of header

// insert the elemnt into multiple places
// header.append(message.cloneNode(true));

// insert as sibling
// header.before(message)  // insert before the header element
// header.after(message) //after

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message)
  });

console.log(message);

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color); // not working
console.log(message.style.backgroundColor); //only inline styles working

console.log(getComputedStyle(message)); // all the CSS properties
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// modofy css
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// Custom properties
document.documentElement.style.setProperty('--color-primary', 'orangered');

/// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); //Bankist logo
console.log(logo.src); //http://127.0.0.1:8080/img/logo.png
console.log(logo.className); //nav__logo

// set
logo.alt = 'Beautilful minimulist logo';

// Non-standard
console.log(logo.designer); //undefined, not standard
console.log(logo.getAttribute('designer')); //Jonas
logo.setAttribute('company', 'Bankist');

// image
console.log(logo.src);
console.log(logo.getAttribute('src')); //relative

// link
const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

//Data attributes
console.log(logo.dataset.versionNumber); //3.0

// classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); //not includes

//Don't use
// logo.className = 'jonas'

// Event Handlers
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: great!');
  //   h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// Event bubbling
// generating random number
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// random color
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

console.log(randomColor(0, 255));

// navlink bubbling
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);

  // stop propagation
  //   e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Container', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Nav', e.target, e.currentTarget);
});

// DOM Traversing
const hOne = document.querySelector('h1');

// Going downwards: Selecting child element
console.log(hOne.querySelectorAll('.highlight'));
// direct child
console.log(hOne.childNodes);
console.log(hOne.children);

hOne.firstElementChild.style.color = 'white';
hOne.lastElementChild.style.color = 'blue';

// Going upwards: selecting parents
console.log(h1.parentNode);
console.log(h1.parentElement);

// closest parent element
h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

// going sideways (selecting only direct siblings)
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// Selecting all the siblings
console.log(h1.parentElement.children);

console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function (el) {
  if (el !== 'h1') el.style.transform = 'scale(0.5)';
});
