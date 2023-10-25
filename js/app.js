document.addEventListener('mousemove', function(e) {
	var moveX = (e.clientX - window.innerWidth / 2) * -0.005; // Изменение оси X
	var moveY = (e.clientY - window.innerHeight / 2) * 0.01; // Изменение оси Y
  
	document.documentElement.style.setProperty('--move-x', moveX + 'deg');
	document.documentElement.style.setProperty('--move-y', moveY + 'deg');
  });

window.addEventListener('load', function () {
	var date = new Date();
	var month = date.getMonth();
	var hour = date.getHours();
  
	var season;
	if (month >= 2 && month <= 4) {
	  season = "spring";
	} else if (month >= 5 && month <= 7) {
	  season = "summer";
	} else if (month >= 8 && month <= 10) {
	  season = "autumn";
	} else {
	  season = "winter";
	}
  
	var timeOfDay;
	if (hour >= 6 && hour < 18) {
	  timeOfDay = "day";
	} else {
	  timeOfDay = "night";
	}
  
	var layer1 = document.querySelector('.layer-1');
	layer1.style.backgroundImage = `url(img/${season}-${timeOfDay}.jpg)`;
  });