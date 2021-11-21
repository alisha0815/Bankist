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
