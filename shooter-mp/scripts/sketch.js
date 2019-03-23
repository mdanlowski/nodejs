// NEW / EXPERIMENTAL / --- add to docum.! ---
// dependency: Projectile
// var animations = new Animation(); 
// END_NEW
console.log('sketch');
var keyCode_ = "";

var plr = new Player(300, 300, 100, 10, 'green', Weapons['projectileEmitter']);

var projectiles = [];
// var hostiles = [new Enemy(300, 100, [300, 300], 2, 100, 10, 'red') ];
var hostiles = [];
// for (var i = 1; i < 31; i++) {
// 	if (i <= 10) hostiles.push(new Enemy(25*i + 100, 20, [300, 300], 2, 100, 10, 'red'));
// 	if (i > 10 && i <= 20) hostiles.push(new Enemy(25*i - 150, 120, [300, 300], 2, 100, 10, 'red'));
// 	if (i > 20 && i <= 30) hostiles.push(new Enemy(25*i - 350, 220, [300, 300], 2, 100, 10, 'red'));
// }

// ============================================   SETUP
function setup() {
	createCanvas(600, 600);
	textSize(20);
	var initialFrameCount = frameCount;
}
// ============================================   END-SETUP
// ============================================   DRAW
function draw() {
	// Render background
	background(0, 250, 100);

	// Player: calculate position and redraw; draw HP and ammo
	plr.calcPos();
	plr.redraw();
	plr.drawStats();

	for(let obj of projectiles){
		// Projectiles: calculate positions and redraw each object
		obj.calcPos();
		obj.redraw();
		obj.edges(obj, projectiles, height, width);
	}
	for(let obj of hostiles){
		// Hostiles: calculate positions depending on the move pattern and redraw each object
		obj.checkDeath(obj, hostiles); // pass a specific hostile as obj and the reference to hostiles array so that obj can be removed
		// obj.calcPos('stationary');
		obj.calcPos('random');
		obj.redraw();
		// Below, every enemy on the map checks it's own position against all "active" projectiles positions
		for(let subobj of projectiles){
			obj.collisions(subobj);
		}
	}
	// Shooting:
	if(mouseIsPressed && mouseButton === LEFT){
		if(frameCount - initialFrameCount > plr.gun.fireRate ){
			projectiles.push(new Projectile(plr, [mouseX, mouseY], plr.gun));
			initialFrameCount = frameCount;
		}
	}
	
	debugInfo(plr);
}
// ============================================   END-DRAW

function keyPressed() {
	if (keyCode === 49){
		plr.gun = Weapons['projectileEmitter'];
	}
	if (keyCode === 50){
		plr.gun = Weapons['laserRifle'];
	}
	if (keyCode === 51){
		plr.gun = Weapons['grenadeLauncher'];
	}
}

function mousePressed() {
	if (mouseButton === LEFT){
		initialFrameCount = frameCount;
		projectiles.push(new Projectile(plr, [mouseX, mouseY], plr.gun));
	}
	if( mouseButton === RIGHT ){
		hostiles.push(new Enemy(mouseX, mouseY, [mouseX, mouseY], 5, 100, 10, 'red') );
	}
}

function debugInfo(plr_){
	textSize(20);
	stroke(0);
	fill(255);
	strokeWeight(1);

	// line connecting plr & mouse
	// line(plr_.xpos, plr_.ypos, mouseX, mouseY);

	text(keyCode_, 10, 100);
	text("P: " + projectiles.length, 550, 20);
	text("E: " + hostiles.length, 550, 50);

	text(Object.values(plr.gun)[0], 10, 70);

	if(projectiles.length){
		text("last particle heading: " + Object.values(projectiles[projectiles.length-1].heading), 10, 45);
	}

	switch(keyCode_){
		case 37:
			text("LEFT_ARROW", 200, 100);
			break;
		case 38:
			text("UP_ARROW", 200, 100);
			break;
		case 39:
			text("RIGHT_ARROW", 200, 100);
			break;
		case 40:
			text("DOWN_ARROW", 200, 100);
			break;
	}

	text("plr pos: " + plr_.xpos  + ", " + plr_.ypos, 10, 20);

	textSize(15);
	fill('red');
	text("WASD - move; 1,2 - guns", 10, 590);
}