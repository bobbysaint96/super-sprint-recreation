/*Bobby St. Pierre
 *Recreated Game
 *Fishburn - IMM270
 */

//Moving sprites
var track, tree, player, pink, white, blue; //Image placeholders
var playerCar, aiPink, aiWhite, aiBlue; //Sprite placeholders
var playerScore = 0, aiPinkScore = 0, aiWhiteScore = 0, aiBlueScore = 0, playerLap = 0, pinkLap = 0, whiteLap = 0, blueLap = 0; //Lap holding variables
var car, wall, checkpoint, finishL; //Sprite groups
var finishLine; //Finish line
// Dimensions & initial positions of cars
var carHeight = 12;
var carWidth = carHeight*2;
var plX = 137;
var pX = plX;
var wX = plX;
var bX = plX;
var plY = 54;
var pY = plY + (carWidth/3);
var wY = pY + (carWidth/3);
var bY = wY + (carWidth/3);

function preload() {
	song = loadSound('assets/sound.mp3');
	collision = loadSound('assets/Hit_Hurt7.wav');
	track = loadImage('assets/levelbase.png');
	tree = loadImage('assets/tree_sprite.png');
	player = loadImage('assets/supersprintspriteNESRes.png');
	pink = loadImage('assets/supersprintAIPink.png');
	white = loadImage('assets/supersprintAIWhite.png');
	blue = loadImage('assets/supersprintAIBlue.png');
}

function setup() {
	song.setVolume(.2);
	song.loop();
	createCanvas(256,240);
	frameRate(30);
	car = new Group();
	wall = new Group();
	checkpoint = new Group();
	finishL = new Group();
	
	//Finish Line
	finishLine = createSprite(116,64,1,52);
	finishL.add(finishLine);
	
	//Checkpoint(s)
	var midPoint = createSprite(116,138,1,52);
	checkpoint.add(midPoint);
	
	//Colliders on edge of track
	//Counter clockwise starting at left wall
	
	// Left Wall
	var leftWall = createSprite(7,120,14,240);
	wall.add(leftWall);
	
	
	// Bottom left corner
	var lowerLeftCorner = createSprite(15,206,2,16);
	wall.add(lowerLeftCorner);
	lowerLeftCorner = createSprite(17,211,2,16);
	wall.add(lowerLeftCorner);
	lowerLeftCorner = createSprite(19,214,2,16);
	wall.add(lowerLeftCorner);
	lowerLeftCorner = createSprite(21,217,2,16);
	wall.add(lowerLeftCorner);
	lowerLeftCorner = createSprite(23,219,2,16);
	wall.add(lowerLeftCorner);
	lowerLeftCorner = createSprite(25,221,2,16);
	wall.add(lowerLeftCorner);
	lowerLeftCorner = createSprite(27,222,2,16);
	wall.add(lowerLeftCorner);
	lowerLeftCorner = createSprite(29,223,2,16);
	wall.add(lowerLeftCorner);
	lowerLeftCorner = createSprite(31,224,2,16);
	wall.add(lowerLeftCorner);
	lowerLeftCorner = createSprite(33,225,2,16);
	
	
	//Lower Wall
	var lowerWall = createSprite(128,224,256,10);
	wall.add(lowerWall);
	
	// Lower left curve
	for (var i = 0; i < 10; i++) {
	var lowerLeftCurve = createSprite(88+(i*2),226-(i*2),2,16);
	wall.add(lowerLeftCurve);
	}
	
	// Dividing Wall
	var lowerWall1 = createSprite(110,196,10,64);   // Divider Wall on bottom
	wall.add(lowerWall1);
	
	// Diagonal lower wall
	for (var i=0; i<29; i++) {
		var lowerDiagonalWall = createSprite(110+(i*2),170+(i*2),2,16);
		wall.add(lowerDiagonalWall);
	}
	
	// Lower right corner loop
	for (var i=0; i<13; i++) {
		if (i<5) {
			var lowerRightCorner = createSprite(217+(2*i),226-(i/2),2,16);
			wall.add(lowerRightCorner);
		} else if (i<12) {
			var lowerRightCorner = createSprite(217+(2*i),233-(2*i),2,16);
			wall.add(lowerRightCorner);
		} else {
			var lowerRightCorner = createSprite(217+(2*i),242-(3*i),2,16);
			wall.add(lowerRightCorner);
		}
	}
	
	// Right wall
	var rightWall = createSprite(250,120,16,240);
	wall.add(rightWall);
	
	// Upper right corner loop
	for (var i=0; i<13; i++) {
		if (i<3) {
			var upperRightCorner = createSprite(217+(2*i),33+(i),2,16);
			wall.add(upperRightCorner);
		} else if (i<9) {
			var upperRightCorner = createSprite(217+(2*i),29+(1.5*i),2,16);
			wall.add(upperRightCorner);
		} else {
			var upperRightCorner = createSprite(217+(2*i),17+(3*i),2,16);
			wall.add(upperRightCorner);
		}
	}
	
	// Upper Wall
	var upperWall = createSprite(128,20,256,40);
	wall.add(upperWall);
	
	// Top left corner
	for (var i=0; i<11; i++) {
		if (i<3) {
			var upperLeftCorner = createSprite(15+(2*i),56-(5*i),2,16);
			wall.add(upperLeftCorner);
		} else if (i<8) {
			var upperLeftCorner = createSprite(15+(2*i),50-(2*i),2,16);
			wall.add(upperLeftCorner);
		} else {
			var upperLeftCorner = createSprite(15+(2*i),43-(i),2,16);
			wall.add(upperLeftCorner);
		}
	}
	
	var innerTopWall = createSprite(128,101,138,22);
	wall.add(innerTopWall);
	
	var innerLeftWall = createSprite(60,133,6,82);
	wall.add(innerLeftWall);

	// Center track curve loop
	for (var i = 0; i < 10; i++) {
		if (i<3) {
			var innerCurve = createSprite(64+(2*i),128-(5*i),2,16);
			wall.add(innerCurve);
		} else if (i < 7) {
			var innerCurve = createSprite(64+(2*i),120-(2*i),2,16);
			wall.add(innerCurve);
		} else {
			var innerCurve = createSprite(64+(2*i),110-(i/2),2,16);
			wall.add(innerCurve);
		}
	}

	// Center track diagonal loop
	for (var i = 0; i < 32; i++) {
		var innerDiagonalWall = createSprite(130+(i*2),106+(i*2),2,16);
		wall.add(innerDiagonalWall);
	}
	
	var innerRightWall = createSprite(196,133,6,84);
	wall.add(innerRightWall);	

	//Create car sprites, set max speed, add to cars group for collisions
	
	playerCar = createSprite(plX, plY, carHeight, carWidth);
  playerCar.addAnimation("Player1", player);
	playerCar.maxSpeed = 4;
	car.add(playerCar);
	
	/*aiPink = createSprite(pX, pY, carHeight, carWidth); //Removed computer opponents
	aiPink.addAnimation("pinkCar", pink);
	aiPink.maxspeed = 4;
	car.add(aiPink);
	aiWhite = createSprite(wX, wY, carHeight, carWidth);
	aiWhite.addAnimation("whiteCar", white);
	aiWhite.maxspeed = 4;
	car.add(aiWhite);
	*/

	aiBlue = createSprite(bX, bY, carHeight, carWidth);
	aiBlue.addAnimation("blueCar", blue);
	aiBlue.maxspeed = 4;
	car.add(aiBlue);
}

function draw() {
  car.collide(wall, stopCar); //Separate functions for colliding with wall/other car
	car.displace(car, stopCar);
	image(track,0,0,track.width,track.height); //Displays Racetrack background
	
	// Scoreboard text
	textSize(11);
	fill(200,255,30);
	text(playerScore, 40, 30);
	fill(0,255,255);
	text(aiBlueScore, 232, 30);
	
	// PLAYER CAR MECHANICS //
	/* if L and R are held down at the same time right will always override left.
	 * this is how the turn system works in the original game
	 * turning system rotates car in 32nds = 11.25 degrees
	 * rotates car to face in the direction of travel */
	
	if (keyDown(RIGHT_ARROW)) {
		playerCar.rotation += 11.25;
	} else if (keyDown(LEFT_ARROW)) {
		playerCar.rotation -= 11.25;
	}
	if (keyDown(UP_ARROW)) {
		playerCar.addSpeed(.7, playerCar.rotation + 180);
	}
	playerCar.velocity.x = playerCar.velocity.x*.87;
	playerCar.velocity.y = playerCar.velocity.y*.87;
	
	// PLAYER 2 CAR MECHANICS
	
	if (keyDown(68)) {
		aiBlue.rotation += 11.25;
	} else if (keyDown(65)) {
		aiBlue.rotation -= 11.25;
	}
	
	if (keyDown(87)) {
		aiBlue.addSpeed(.7, (aiBlue.rotation + 180));
	}
	aiBlue.velocity.x = aiBlue.velocity.x*.87;
	aiBlue.velocity.y = aiBlue.velocity.y*.87;
	
	
	if (playerCar.overlap(checkpoint) == true && playerCar.velocity.x > 0) {
		playerLap = 1;
	} else if (playerCar.overlap(checkpoint) == true && playerCar.velocity.x < 0) {
		playerLap = 0;
	}
	if (aiBlue.overlap(checkpoint) == true && aiBlue.velocity.x > 0) {
		blueLap = 1;
	} else if (aiBlue.overlap(checkpoint) == true && aiBlue.velocity.x < 0) {
		blueLap = 0;
	}
	
	if (playerCar.overlap(finishL) && playerLap == 1) {
		playerScore++;
		playerLap = 0;
	}
	if (aiBlue.overlap(finishL) && blueLap == 1) {
		aiBlueScore++;
		blueLap = 0;
	}
		
	if (playerScore > 2) {
		playerWin();
	}
	if (aiBlueScore > 2) {
		aiBlueWin();
	}
	
	drawSprite(playerCar);
	//drawSprite(aiPink); //Removed AI's
	//drawSprite(aiWhite);
	drawSprite(aiBlue);
	//drawSprites(); //used for displaying the otherwise invisible walls, disabled and/or removed in actual playthrough/upload
}

function stopCar(car) {
	if (car.velocity.x != 0 && car.velocity.y != 0) {
		collision.setVolume(.2);
		collision.playMode('untilDone');
		collision.play();
	}
	car.velocity.x = car.velocity.x *.7;
	car.velocity.y = car.velocity.y *.7;
	if (car.velocity.x < .5) {
		car.velocity.x = 0;
	}
	if (car.velocity.y < .5) {
		car.velocity.y = 0;
	}
}

function playerWin() {
	fill(200,200,0);
	rect(0,0,width,height);
	fill(255,255,255);
	textAlign(CENTER);
	textSize(32);
	text('Yellow Wins!', width/2, height/2);
	noLoop();
}

function aiBlueWin() {
	fill(0,192,255);
	rect(0,0,width,height);
	fill(255,255,255);
	textAlign(CENTER);
	textSize(32);
	text('Blue Wins!', width/2, height/2);
	noLoop();
}