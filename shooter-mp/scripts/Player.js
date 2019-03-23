// Blueprint for player

// Player.prototype = Object.create(GameObject.prototype);

function Player(initX, initY, hp_, ammo_, color_, gun_){
	this.xpos = initX;
	this.ypos = initY;
	this.hp = hp_;
	this.ammo = ammo_;
	this.clr = color_;
	this.gun = gun_;

	this.redraw = function(){
		fill( this.clr );
		stroke(0);
		ellipse(this.xpos, this.ypos, 25, 25);

	}

	this.drawStats = function(){
		fill('red');
		noStroke();
		rect(this.xpos - 25, this.ypos + 20, 0.5 * this.hp, 4);
		stroke(1);
	}


	this.calcPos = function(){
		if (keyIsDown(65)) {
			this.xpos -= 2;
		}
		if (keyIsDown(68)) {
			this.xpos += 2;
		}
		if (keyIsDown(87)) {
			this.ypos -= 2;
		}
		if (keyIsDown(83)) {
			this.ypos += 2;
		}

	}

	this.collisions = function( obj ){

	}

}

// export { Player };

/* KEY CODES:
  37 = LEFT_ARROW
  38 = UP_ARROW
  39 = RIGHT_ARROW
  40 = DOWN_ARROW
  32 = SPACE
  W A S D = 87 65 83 68
  49 = 1 key
	50 = 2 key
*/