window.onload = function () {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var ship = spaceship.create(width / 2, height / 2, 0, 0),
		shipMirrored = [],
		numOfMirrors = 0;

	var portal1 = portal.create(100, 100, 25),
		portal2 = portal.create(600, 300, 15);

	ship.setAngle( Math.random() * Math.PI * 2);
	for (var i = 0; i < numOfMirrors; i ++) {
		shipMirrored.push(spaceship.create(Math.random() * width, Math.random() * height, 0, 0));
		shipMirrored[i].setAngle(Math.random() * Math.PI * 2);
	}

	console.log("portal");
	console.log(portal1);
	portal1.setLink(portal2);
	console.log("link");
	console.log(portal1.linkPortal);
	console.log(portal2.linkPortal);

	updateFrame(); // update calculations and render animations

	function updateFrame() {
		// clear context
		context.clearRect(0, 0, width, height);

		// every context draw must be under clear context exe line.
	context.beginPath();
	context.arc(portal1.position.x, portal1.position.y, portal1.radius, 0, Math.PI * 2, false);
	context.arc(portal2.position.x, portal2.position.y, portal2.radius, 0, Math.PI * 2, false);
	context.fill();

		// update ship properties
		ship.update();
		for (var i = 0; i < numOfMirrors; i ++) {
			shipMirrored[i].update();
		}

		/* ==== ==== ==== mock up collision detection for portals ==== ==== ==== */
		if (portal1.detectCollision(ship.getParticle().getPosition())) {
			portal1.swapToLink(ship);
		}
		else if (portal2.detectCollision(ship.getParticle().getPosition())) {
			portal2.swapToLink(ship);
		}
		/* ==== ==== ====  ==== ==== ====  ==== ==== ====  ==== ==== ==== */

		// reder ship animation
		ship.render(context, width, height, "rgba(0, 0, 0, 0.5");
		for (var i = 0; i < numOfMirrors; i ++) {
			shipMirrored[i].render(context, width, height, "rgba(255, 255, 255, 0.5");
		}
		// refresh recursive animation frame
		requestAnimationFrame(updateFrame);
	}

	// // /* /* Event listener */ */
	/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */

	document.body.addEventListener("keydown", function(event){
		switch (event.keyCode) {
			case 38: // up
				ship.setThrusting(true);
				// mirrored
				for (var i = 0; i < numOfMirrors; i ++) {
					shipMirrored[i].setThrusting(true);
				}
				break;
			case 32: // spacebar
				if (ship.isAutoThrust()) {
					ship.setAutoThrust(false);
				// mirrored
					for (var i = 0; i < numOfMirrors; i ++) {
						shipMirrored[i].setAutoThrust(false);
					}
				}
				else {
					ship.setAutoThrust(true);
				// mirrored
					for (var i = 0; i < numOfMirrors; i ++) {
						shipMirrored[i].setAutoThrust(true);
					}
				}
				break;
			case 16: // shift
				if (ship.isDrifting()) {
					ship.setDrifting(false);
				// mirrored
					for (var i = 0; i < numOfMirrors; i ++) {
						shipMirrored[i].setDrifting(false);
					}
				}
				else {
					ship.setDrifting(true);
				// mirrored
					for (var i = 0; i < numOfMirrors; i ++) {
						shipMirrored[i].setDrifting(true);
					}
				}
				break;
			case 40: // down
				ship.brake();
				ship.setBrakeUsing(true);
				// mirrored
				for (var i = 0; i < numOfMirrors; i ++) {
					shipMirrored[i].brake();
					shipMirrored[i].setBrakeUsing(true);
				}
				break;
			case 37: // left
				ship.angle -= ship.turnRate;
				// mirrored
				for (var i = 0; i < numOfMirrors; i ++) {
					if (i % 2 == 0) {
						shipMirrored[i].angle += shipMirrored[i].turnRate;
					}
					else {
						shipMirrored[i].angle -= shipMirrored[i].turnRate;
					}
				}
				break;
			case 39: //right
				ship.angle += ship.turnRate;
				// mirrored
				for (var i = 0; i < numOfMirrors; i ++) {
					if (i % 2 == 0) {
						shipMirrored[i].angle -= shipMirrored[i].turnRate;
					}
					else {
						shipMirrored[i].angle += shipMirrored[i].turnRate;
					}
				}
				break;
			default:
				break;
		}
		console.log ("keycode = " + event.keyCode);
	});
	document.body.addEventListener("keyup", function(event){
		switch (event.keyCode) {
			case 38: // up
				ship.setThrusting(false);
				// mirrored
				for (var i = 0; i < numOfMirrors; i ++) {
					shipMirrored[i].setThrusting(false);
				}
				break;
			case 40: // down
				ship.setBrakeUsing(false);
				// mirrored
				for (var i = 0; i < numOfMirrors; i ++) {
					shipMirrored[i].setBrakeUsing(false);
				}
				break;
			case 37: // left
				break;
			case 39: //right
				break;
			default:
				break;
		}
	});
}