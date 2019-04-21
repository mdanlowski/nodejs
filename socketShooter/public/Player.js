function Player(guid_, initX, initY, hp_, ammo_, color_, gun_){
  this.guid = guid_;
  this.x = initX;
	this.y = initY;
	this.hp = hp_;
	this.ammo = ammo_;
	this.clr = color_;
	this.gun = gun_;

  this.initialize = function(){ return };

  this.update = function(socket){
    let beginOfLoopFC = frameCount;
    self = this;
    self.calcPos(beginOfLoopFC);
	  fill( self.clr  );
	  stroke(0);
    ellipse(self.x, self.y, 30, 30);
    // prepare and send socket event
  }
  
	this.drawStats = function(){
    fill('red');
    noStroke();
		rect(this.x - 25, this.y + 20, 0.5 * this.hp, 4
      ); stroke(1);
    }
    
    this.calcPos = function(fc){
      // function is called every frame
      // check if player moved at all to save socket bandwidth
      let beforeMove = {ox: this.x, oy: this.y};
      if (keyIsDown(65)) {
        this.x -= 2;
      }
      if (keyIsDown(68)) {
        this.x += 2;
      }
      if (keyIsDown(87)) {
        this.y -= 2;
      }
      if (keyIsDown(83)) {
        this.y += 2;
      }
      if(beforeMove.ox != this.x || beforeMove.oy != this.y){
        let data = {guid: this.guid, x: this.x, y: this.y}
        // if(frameCount - fc > 1){
          socket.emit('playerMoveEvent', data);
        // }
      }
    }
  
	this.collisions = function( obj ){ return	};
}

