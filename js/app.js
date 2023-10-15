document.addEventListener('mousemove', function(e) {
	var moveX = (e.clientX - window.innerWidth / 2) * -0.005; // Изменение оси X
	var moveY = (e.clientY - window.innerHeight / 2) * 0.01; // Изменение оси Y
  
	document.documentElement.style.setProperty('--move-x', moveX + 'deg');
	document.documentElement.style.setProperty('--move-y', moveY + 'deg');
  });