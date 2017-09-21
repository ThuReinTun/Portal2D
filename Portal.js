var portal = {
	position: null,
	radius: null,
	angle: null, // angle to output the object

	fixedAngle: null,
	linkPortal: null, // link must be a portal object
	isOpen: null,
	isVisible: null,

	create: function (x, y, radius, angle) {
		var obj = Object.create(this);

		obj.position = vector.create(x, y);
		obj.setRadius(radius);
		obj.setAngle(angle || 0);
		obj.setFixedAngle(true);

		obj.isOpen = true;
		obj.isVisible = true;

		return obj;
	},

	getPosition: function () {
		return this.position;
	},
	getRadius: function () {
		return this.radius;
	},
	getAngle: function () {
		return this.angle;
	},
	isFixedAngle: function () {
		return this.fixedAngle;
	},
	getLink: function () {
		return this.linkPortal;
	},

	setPosition: function (x, y) {
		this.position.x = x;
		this.position.y = y;
	},
	setRadius: function (radius) {
		this.radius = radius;
	},
	setAngle: function (val) {
		this.angle = val;
	},
	setFixedAngle: function (val) {
		this.fixedAngle = val;
	},
	setLink: function (p2) {
		this.linkPortal = p2;
		p2.linkPortal = this;
	},

	detectCollision: function (objPosition) {
		if ((objPosition.x > this.position.x - this.radius) && (objPosition.x < this.position.x + this.radius)) {
			if ((objPosition.y > this.position.y - this.radius) && (objPosition.y < this.position.y + this.radius)) {
				return true;
			}
		}
		return false;
	},
	swapToLink: function (obj) {
		var x = this.linkPortal.position.x;
		var y = this.linkPortal.position.y;
		var radius = this.linkPortal.radius;

		// portal offset to exclude the portal tranported obj out of the radius
		var portalOffset = vector.create(0, 0);
		portalOffset.setMagnitude(radius * 2);

		if (this.getLink().isFixedAngle()) {
			portalOffset.setDirection(this.getLink().angle);
			// set new position and push obj out offset zone
			obj.particle.setPosition(x, y);
			obj.particle.position.addTo(portalOffset);

			// set direction of spaceship particle velocity
			obj.particle.setVelocity(obj.particle.getVelocity().getMagnitude(), portalOffset.getDirection());
			// set turn angle of the spaceship
			obj.setAngle(portalOffset.getDirection());
		}
		else {
			portalOffset.setDirection(obj.particle.getVelocity().getDirection());
			// set new position and push obj out offset zone
			obj.particle.setPosition(x, y);
			obj.particle.position.addTo(portalOffset);
		}
		

	}
}