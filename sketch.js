let ground;
let displayScore = 0; // displays amount of pipes passed
let updatedDisplayScore = false;
let populationSize = 100;
let population;
let alive = populationSize; // used to display total alive population
let gameSpeed = 1; // you get it
let nextConnectionNumber = 1000;
let randomPipeHeights = [];
let networkVisualizer;
let displayVisuals = true;

// visual assets
let bg, groundImg, birdImg, pipeUpImg, pipeDownImg;
let flappyFont;
let hitSound, flapSound, pointSound, failSound;

function preload() {
	// images
	bg = loadImage("bg.png");
	groundImg = loadImage("ground.png");
	birdImg = loadImage("bird.png");
	pipeUpImg = loadImage("pipeup.png");
	pipeDownImg = loadImage("pipedown.png");

	// font
	flappyFont = loadFont("flappy-font.ttf");

	// sounds
	hitSound = loadSound("hit-sound.wav");
	flapSound = loadSound("flap-sound.mp3");
	pointSound = loadSound("point-sound.mp3");
	failSound = loadSound("fail-sound.mp3");
}

// runs on startup
function setup() {
	createCanvas(1000, 1320);
	ground = new Ground();
	frameRate(60);

	population = new Population(populationSize);
	networkVisualizer = new NetworkVisualizer(population.population[0].brain, 250, 400, 600, 500);
}

// main game loop
function draw() {
	image(bg, 0, 0, 1000, 1320); // display background
	if (displayVisuals) {
		networkVisualizer.show(population.bestBird);
	}

	for (let i = 0; i < gameSpeed; i++) {
		// if birds alive, then update, otherwise start a new generation
		if (population.allDead() === false) {
			population.updateBirds();
		} else {
			randomPipeHeights = [];
			timer = 100;
			displayScore = 0;
			alive = populationSize;
			population.naturalSelection();
		}

		ground.update();
	}

	// displaying/showing all the visual stuff

	if (population.allDead() === false) {
		population.showBirds(birdImg);
	}

	ground.show(groundImg); // ground

	// display score
	textFont(flappyFont);
	fill(255);
	textSize(100);
	stroke(0);
	strokeWeight(12);
	textAlign(CENTER, CENTER);
	text(displayScore, width / 2, 160);
	if (displayVisuals) {
		textFont("sans-serif");
		textSize(50);
		noStroke();
		textAlign(LEFT);
		textStyle(BOLD);
		text("Generation: " + population.generation, 30, 60);
		text("Population: " + alive, 30, 140);
	}
}

function keyPressed() {
	// turn on lines to show bird vision
	if (key === "v") {
		displayVisuals = !displayVisuals;
	}

	// change game speed
	if (key === "q") {
		gameSpeed = 1;
	}
	if (key === "w") {
		gameSpeed = 2;
	}
	if (key === "e") {
		gameSpeed = 5;
	}
	if (key === "r") {
		gameSpeed = 10;
	}
	if (key === "t") {
		gameSpeed = 30;
	}
	if (key === "y") {
		gameSpeed = 650;
	}
}
