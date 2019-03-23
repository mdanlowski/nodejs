// Blueprint for a projectile object

function Projectile(origin_, heading_, weapon_){
	this.birthFrameCount = frameCount;
	this.xpos = origin_.xpos;
	this.ypos = origin_.ypos;
	this.heading = {
		x : 0.01*(heading_[0] - this.xpos),
		y : 0.01*(heading_[1] - this.ypos)
	}
	// this.weapon = weapon_;
	this.vel = weapon_.projSpeed;
	this.dmg = weapon_.damage;

	this.calcPos = function() {
		// let headingMag = Math.sqrt(this.heading.x, this.heading.y);
		this.xpos += (1/headingMag(this.heading)) * this.vel * this.heading.x;
		this.ypos += (1/headingMag(this.heading)) * this.vel * this.heading.y;

	}

	this.edges = function( _self_, projctlArr, worldH, worldW ){
		if (this.xpos < 0 || this.xpos > worldW || this.ypos < 0 || this.ypos > worldH){
			let remIndx = projctlArr.indexOf(_self_);
			// display len of the projectle array that holds prctls
			// currently within the edges of the world (map)
			// console.log(projctlArr.length);
			projctlArr.splice(remIndx, 1);
		}
	}

	this.redraw = function(){ 
		// could it be simplified by passing projType into function???
		switch(weapon_.projType){
			case "bullet":
				noStroke();
				fill("red");
				ellipse(this.xpos, this.ypos, 6, 6);
				break;

			case "laser":
				strokeWeight(3);
				stroke("magenta");
					// let laserLineX = this.xpos + (1/headingMag(this.heading.x, this.heading.y))*150*this.heading.x;
					let laserLineX = this.xpos + (1/headingMag(this.heading)) * 150 * this.heading.x;
					let laserLineY = this.ypos + (1/headingMag(this.heading)) * 150 * this.heading.y;
				line(this.xpos, this.ypos, laserLineX, laserLineY );
				break;

			case "grenade":
				strokeWeight(3);
				stroke("black");
				fill("brown");
				ellipse(this.xpos, this.ypos, 10, 10);
					// grenade explosion
					if (frameCount - this.birthFrameCount > 50) {
						// animations is global for main game loop
						animations.drawAnimAt(this.xpos, this.ypos, "explosion", frameCount);
						// kill the projectile
						this.xpos = -100; this.ypos = -100;
						
					}
				break;
		}
	}
}

// ============ some mechanics maths ===========
// !!!!!!!!!!!!!!!!!!!!!!!!!!! DESCRIBE THE STRUGGLE
// var headingMag = (hx, hy) => Math.sqrt(hx**2 + hy**2);
function headingMag(ph){ 
	return Math.sqrt( ph.x**2 + ph.y**2 ); // UNDEF?!?!?
};