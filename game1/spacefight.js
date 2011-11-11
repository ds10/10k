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
	var that = this;
	that.image = new Image();

	that.image.src = "space_ship.png"
	that.width = 64;
	that.height = 64;
	that.frames = 0;
	that.actualFrame = 0;
	that.X = 0;
	that.Y = 400;	
	
	that.setPosition = function(x, y){
		that.X = x;
		that.Y = y;
	}
	
	that.interval = 0;
	that.draw = function(){
		try {
			ctx.drawImage(that.image, 0, that.height * that.actualFrame, that.width, that.height, that.X, that.Y, that.width, that.height);
		} 
		catch (e) {
		};
		
		if (that.interval == 4 ) {
			if (that.actualFrame == that.frames) {
				that.actualFrame = 0;
			}
			else {
				that.actualFrame++;
			}
			that.interval = 0;
		}
		that.interval++;		
	}
	
	that.moveLeft = function(){
		if (that.X > 0) {
			that.setPosition(that.X - 5, that.Y);
		}
	}
	
	that.moveRight = function(){
		if (that.X + that.width < width) {
			that.setPosition(that.X + 5, that.Y);
		}
	}
	
	that.shoot = function(){
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


var Bullet = function(x, y, type){
	var that=this;
	
	that.firstColor = '#FF8C00';
	that.secondColor = '#EEEE00';
	that.onCollide = function(){
		//baddy.fallStop();
	};
	
	that.x = ~~ x;
	that.y = y;
	that.type = type;
	
	that.draw = function(){
		ctx.fillStyle = 'rgba(255, 255, 255, 1)';
		ctx.fillRect(player.X, player.Y, 20, 20);
	};

	alert(player.x);
	return that;
};


var spawnBullet = function(){
	bullets[i] = new Bullet();
	
}

var GameLoop = function(){
	clear();
	MoveCircles(5);
	DrawCircles();
	player.draw();
	//for each bullet. bullet.move
	gLoop = setTimeout(GameLoop, 1000 / 50);
}

GameLoop();
