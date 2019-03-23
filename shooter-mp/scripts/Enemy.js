// Blueprint for npc

function Enemy(initX, initY, heading_, vel_, hp_, ammo_, color_){
	this.xpos = initX;
	this.ypos = initY;
	this.velx = vel_;
	this.vely = vel_;

	let xoff = 0.01;// * rand();
	let yoff = 0.01;// * rand();
	// this.accx = 0.05;
	// this.accy = 0.05;

	this.hp = hp_;
	this.ammo = ammo_;
	this.color = color_;

	this.heading = {
		x : 0.01*(heading_[0] - this.xpos),
		y : 0.01*(heading_[1] - this.ypos)
	}

	this.redraw = function(){
		fill( this.color );
		stroke(0);
		strokeWeight(1);
		ellipse(this.xpos, this.ypos, 22, 22);
		fill('red');
		noStroke();
		rect(this.xpos - 25, this.ypos + 20, 0.5 * this.hp, 4);
		stroke(1);
	}

	this.checkDeath = function( _self_, enemyArr ){
		if(this.hp <= 0){
			this.xpos = -100;
			this.ypos = -100;
			enemyArr.splice( enemyArr.indexOf( _self_ ), 1 );
		}
	}

	this.attack = function(){

	}

	this.calcPos = function( moveFashion ){
		// !!!!!!!!!!!!! to implement
		switch(moveFashion){
			case 'stationary':
				break;

			case 'random':
				this.xpos = noise(xoff)*width;
 				this.ypos = noise(yoff)*height;
 					xoff += (0.005 + 0.005 * rand());
    				yoff += (0.009 + 0.005 * rand());
				break;

			case 'panic':
				this.xpos = noise(xoff)*width;
 				this.ypos = noise(yoff)*height;
 					xoff += 0.009;
    				yoff += 0.011;
				break;

			case 'follow': // !!!!!!!!!!!!! to implement
				break;
		}
		// this.velx += this.accx * 10*random(-1,1);
		// this.vely += this.accy * 10*random(-1,1);
		
		// this.xpos += this.velx * random(-1,1);
		// this.ypos += this.vely * random(-1,1);

		// this.accx = 0;
		// this.accy = 0;

	}

	this.collisions = function( obj ){
		if (obj instanceof Projectile){
			// console.log("collis. check");

		  if((obj.xpos >= this.xpos-20 && obj.xpos <= this.xpos+20) && (obj.ypos >= this.ypos-20 && obj.ypos <= this.ypos+20 )){
		  	// console.log("HIT !");

		  	obj.xpos = -100; obj.ypos = -100;
		  	this.hp -= obj.dmg;
		  }

		}
		else return;
	}

	this.behaviour = function(){
	}
}


// ============== tool functions for move mechanics
function rand(){
	return 0.01 * Math.round(100*Math.random() - 50);
}