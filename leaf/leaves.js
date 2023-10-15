const NUMBER_OF_LEAVES = 30;

/*
   Вызывается при полной загрузке страницы "Падающие листья".
*/
function init() {
  /* Получаем ссылку на элемент, в котором будут находиться листья */
  var container = document.getElementById('leafContainer');

  /* Заполняем пустой контейнер новыми листьями */
  for (var i = 0; i < NUMBER_OF_LEAVES; i++) {
    container.appendChild(createALeaf());
  }
}

/*
   Принимает наименьшее и наибольшее значения диапазона и
   возвращает случайное целое число в этом диапазоне.
*/
function randomInteger(low, high) {
  return low + Math.floor(Math.random() * (high - low + 1));
}

/*
   Принимает наименьшее и наибольшее значения диапазона и
   возвращает случайное число с плавающей запятой в этом диапазоне.
*/
function randomFloat(low, high) {
  return low + Math.random() * (high - low);
}

/*
   Принимает число и возвращает его значение в пикселях для CSS.
*/
function pixelValue(value) {
  return value + 'px';
}

/*
   Возвращает значение длительности для анимации падения.
*/
function durationValue(value) {
  return value + 's';
}

/*
   Использует элемент img для создания каждого листа. 
   Файл CSS "Leaves.css" реализует две анимации вращения для листьев: 
   clockwiseSpin (по часовой стрелке) и counterclockwiseSpinAndFlip (против часовой стрелки и отражение). 
   Эта функция определяет, которая из этих анимаций будет применена к каждому листу.
*/
function createALeaf() {
  /* Создаем обертывающий элемент div и пустой элемент img */
  var leafDiv = document.createElement('div');
  var image = document.createElement('img');

  /* Случайным образом выбираем изображение листа и присваиваем его новому созданному элементу */
  image.src = '/leaf/realLeaf' + randomInteger(1, 4) + '.png';

  leafDiv.style.top = '-100px';

  /* Располагаем лист случайным образом на экране */
  leafDiv.style.left = pixelValue(randomInteger(0, 8000));

  /* Случайным образом выбираем анимацию вращения */
  var spinAnimationName = Math.random() < 0.5 ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';

  /* Устанавливаем свойство -webkit-animation-name соответствующими значениями */
  leafDiv.style.animationName = 'fade, drop';
  image.style.animationName = spinAnimationName;

  /* Определяем случайную длительность для анимации появления и падения */
  var fadeAndDropDuration = durationValue(randomFloat(5, 11));

  /* Определяем другую случайную длительность для анимации вращения */
  var spinDuration = durationValue(randomFloat(4, 8));
  
  /* Задаем свойство animationDuration для анимации появления и падения */
  leafDiv.style.animationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

  /* Задаем случайную задержку для анимации появления и падения */
  var leafDelay = durationValue(randomFloat(0, 5));
  leafDiv.style.animationDelay = leafDelay + ', ' + leafDelay;

  /* Задаем свойство animationDuration для анимации вращения */
  image.style.animationDuration = spinDuration;

  // Добавляем элемент <img> в <div>
  leafDiv.appendChild(image);

  /* Возвращаем элемент leafDiv, чтобы он мог быть добавлен на страницу */
  return leafDiv;
}

/* Вызывает функцию init после полной загрузки страницы "Падающие листья" */
window.addEventListener('load', init, false);