const NUMBER_OF_LEAVES = 25;

function init() {
  var container = document.getElementById('leafContainer');

  for (var i = 0; i < NUMBER_OF_LEAVES; i++) {
    var leaf = createALeaf();
    container.appendChild(leaf);
  }
}

function randomInteger(low, high) {
  return low + Math.floor(Math.random() * (high - low + 1));
}

function randomFloat(low, high) {
  return low + Math.random() * (high - low);
}

function pixelValue(value) {
  return value + 'px';
}

function durationValue(value) {
  return value + 's';
}

function createALeaf() {
  var leafDiv = document.createElement('div');
  var image = document.createElement('img');

 
  var month = new Date().getMonth();

  if (month >= 2 && month <= 4) { // Весна
    image.src = '/leaf/spring' + randomInteger(1, 4) + '.png';
  } else if (month >= 5 && month <= 7) { // Лето
    image.src = '/leaf/summer' + randomInteger(1, 4) + '.png';
  } else if (month >= 8 && month <= 10) { // Осень
    image.src = '/leaf/autumn' + randomInteger(1, 4) + '.png';
  } else { // Зима
    image.src = '/leaf/winter' + randomInteger(1, 4) + '.png';
  }

  leafDiv.style.top = pixelValue(randomInteger(-500, -100));
  leafDiv.style.left = pixelValue(randomInteger(-50, window.innerWidth - 50));

  var spinAnimationName = Math.random() < 0.5 ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';

  leafDiv.style.animationName = 'fade, drop';
  image.style.animationName = spinAnimationName;

  var fadeAndDropDuration = durationValue(randomFloat(5, 11));
  var spinDuration = durationValue(randomFloat(4, 8));

  leafDiv.style.animationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

  var leafDelay = durationValue(randomFloat(0, 6));
  leafDiv.style.animationDelay = leafDelay + ', ' + leafDelay;

  image.style.animationDuration = spinDuration;

  leafDiv.appendChild(image);

  return leafDiv;
}

window.addEventListener('load', init, false);