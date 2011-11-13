var width = 320, 
	height = 500,
	gLoop,
	c = document.getElementById('c'), 
	ctx = c.getContext('2d');
			
	c.width = width;
	c.height = height;


var clear = function(){
	ctx.fillStyle = 'black';
	ctx.clearRect(0, 0, width, height);
	ctx.beginPath();
	ctx.rect(0, 0, width, height);
	ctx.closePath();
	ctx.fill();
}

var howManyCircles = 10, circles = [];

for (var i = 0; i < howManyCircles; i++) 
	circles.push([Math.random() * width, Math.random() * height, Math.random() * 100, Math.random() / 2]);

var DrawCircles = function(){
	for (var i = 0; i < howManyCircles; i++) {
		ctx.fillStyle = 'rgba(255, 255, 0, ' + circles[i][3] + ')';
		ctx.beginPath();
		ctx.arc(circles[i][0], circles[i][1], 3, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}
};

var MoveCircles = function(e){
	for (var i = 0; i < howManyCircles; i++) {
		if (circles[i][1] - circles[i][2] > height) {
			circles[i][0] = Math.random() * width;
			circles[i][2] = Math.random() * 100;
			circles[i][1] = 0 - circles[i][2];
			circles[i][3] = Math.random() / 2;
		}
		else {
			circles[i][1] += e;
		}
	}
};


var player = new (function(){
	var self = this;
	self.image = new Image();

	self.image.src = "space_ship.png"
	self.width = 64;
	self.height = 64;
	self.frames = 0;
	self.actualFrame = 0;
	self.X = 0;
	self.Y = 400;	
	
	self.setPosition = function(x, y){
		self.X = x;
		self.Y = y;
	}
	
	self.interval = 0;
	self.draw = function(){
		try {
			ctx.drawImage(self.image, 0, self.height * self.actualFrame, self.width, self.height, self.X, self.Y, self.width, self.height);
		} 
		catch (e) {
		};
		
		if (self.interval == 4 ) {
			if (self.actualFrame == self.frames) {
				self.actualFrame = 0;
			}
			else {
				self.actualFrame++;
			}
			self.interval = 0;
		}
		self.interval++;		
	}
	
	self.moveLeft = function(){
		if (self.X > 0) {
			self.setPosition(self.X - 5, self.Y);
		}
	}
	
	self.moveRight = function(){
		if (self.X + self.width < width) {
			self.setPosition(self.X + 5, self.Y);
		}
	}
	
	self.shoot = function(){
		//alert("bullet spawns at " + this.X + this.Y);
		spawnBullet();
	}
	
	
})();


document.onmousemove = function(e){
	if (player.X + c.offsetLeft > e.pageX) {
		player.moveLeft();
	} else if (player.X + c.offsetLeft < e.pageX) {
		player.moveRight();
	}
}

document.onmousedown = function(e){
		player.shoot();
}

var bullets = [];


var Bullet = function(){
	var self=this;
	
	self.firstColor = '#FF8C00';
	self.secondColor = '#EEEE00';
	self.onCollide = function(){
		//baddy.fallStop();
	};
	
	
	self.X = player.X + 28;
	self.Y = player.Y;
	
	self.setPosition = function(){
		//self.X = x + 1;;
		self.Y = self.Y - 5;
	}
	
	self.draw = function(){
		 //alert ("bulletshot");
		 ctx.fillStyle = "rgba(255, 255, 0, 0.5)";  
		 ctx.fillRect (self.X, self.Y, 5, 5);  
	};
	
	//alert(player.X);
	return self;
};


var spawnBullet = function(){
	bullets[i] = new Bullet();
	
}

var checkCollision = function(){
	bullets.forEach(function(bullet, ind){
		//if X. Y cordinates are near the enermy thing. KILL IT
		
	})
	}

var GameLoop = function(){
	clear();
	MoveCircles(5);
	DrawCircles();
	player.draw();
	//for each bullet. bullet.draw
	 //move bullets
	 for(i=0;i<bullets.length;i++) {
		 bullets[i].setPosition();
		 bullets[i].draw();
	  }

	 //are they hitting each other?
	 checkCollision();
	 
	/*
	// like this->
	bullets.forEach(function(bullet){
		bullet.setPosition();
		bullet.draw();
	});
	
	*/
	 
	 
	gLoop = setTimeout(GameLoop, 1000 / 50);
}

GameLoop();
