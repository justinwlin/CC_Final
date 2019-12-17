/*
OBJECTIVE:
Goal was to create a video camera experience that could reflect some sort of "progression" through the ages. 
- 2 Bits
- RGB
- (POKEMON) more as a fun nostalgia stage since it was a big thing in the 1999 / 2000 generation to now
- Modern age of emojis

Created small interactive minigames as you click on text, or scroll in and out of the image to look for images,
to search and find the things you want. 



REFERENCES:
Objective move over away from using OpenGL Shaders to using videos below to make code maybe more concise

https://youtu.be/nnlAH1zDBDE - image made of other images

https://www.youtube.com/watch?v=O1mYw-3Wl_Q&list=PLRqwX-V7Uu6bPhi8sS1hHJ77n3zRO9FR_&index=4 - texture application

https://www.youtube.com/watch?v=QLHMtE5XsMs&list=PLRqwX-V7Uu6bw0bVn4M63p8TMJf3OhGy8&index=6

https://webglfundamentals.org/webgl/lessons/webgl-image-processing.html

EX OF SHADER USING P5JS
https://p5js.org/examples/3d-shader-using-webcam.html

https://itp-xstory.github.io/p5js-shaders/#/./docs/examples/basic_gradient
*/

let vidCam;
let myShader;
let img;
let numCells = 10;
//IMAGES TO LOAD
let textLoad = [
	'2_chars.png',
	'4_chars.png',
	'67_pokeset.png',
	'121_testset.png', 
];

//TEXT FOR EVERY STAGE
let textToDisplay = [
	"Wow two bits, \n wonder where \n all the",
	"colors?",
	"It seems like there is still \n more hiding :o TT-TT",
	"OH WOW, POKEMONS! \n TRY TO CATCH LEGENDARY \n MEW!!",
	"IT'S THE MODERN AGE!! \n so many emojis XD \n you found everything!"
	]

let textures = [];//TEXTURE
let ctrl;
let font;
let idx;

function preload() {
	//PRELOADING FONTS AND TEXTURES FOR GL
	font = loadFont('LilitaOne-Regular.ttf');
	textLoad.forEach((t, i) => {
		textures[i] = {
			meta: Number.parseInt(t.split('_')[0]),
			img: loadImage(t, () => { })
};});}

function setup() {
	//CREATING CANVAS
	createCanvas(windowWidth, windowHeight, WEBGL);
	myShader = new p5.Shader(this._renderer, vert, frag);
	//CPATURING VIDEOS
	vidCam = createCapture(VIDEO);
	vidCam.size(800, 800);
	vidCam.hide();
	
	textFont(font);
  textSize(60);
  textAlign(CENTER, CENTER);
	idx = 0;
	
	monkey = loadImage('peekaboo.jpg');
	mew = loadImage('mew.jpg');
	
}


function mouseClicked() {
	if(idx == 0){
		if(mouseX < 1545 && mouseX > 1381 && mouseY < 251 && mouseY > 208){
			print("OVER COLUMN")
			idx += 1
		}
	}
	if(idx == 1){
		if(mouseX < 549 && mouseX > 440 && mouseY < 159 && mouseY > 45){
			idx += 1
		}
	}
	if(idx == 2){
		if(mouseX < 250 && mouseX > 140 && mouseY < 160 && mouseY > 45){
			idx += 1
		}
	}
	
}

//2 BIT STAGE
function stage1(){
		let color = 255
		let colorful = false
		
		fill(color)
		
		text(textToDisplay[0], 450, -300)
		text(textToDisplay[1], 640, -225)
		

}
//RGB STAGE
function stage2(){
	text(textToDisplay[2], 450, -300)
	if(mouseX < 549 && mouseX > 440 && mouseY < 159 && mouseY > 45){
			image(monkey, -400, -400, monkey.width / 2, monkey.height / 2)
	}
}

//POKEMON STAGE
function stage3(){
	text(textToDisplay[3], 450, -300)
	if(numCells <= 40){
		image(mew, -700, -400, monkey.width / 2, monkey.height / 2)
	}
	
}

//MODERN AGE STAGE
function stage4(){
	text(textToDisplay[4], 450, -300)
}

function draw() {
	textSize(60);
	push()
	translate(-width / 2.5, -height / 2);
	background(0);
	numCells = map(mouseX, 0, width, 30, 100);
	shader(myShader);
	let WW = 2000;
	let WH = 2000;
	
	//SETTING SHADER VARIABLES
	myShader.setUniform('iResolution', [WW, WH]);
	myShader.setUniform('aspect', WW / WH);
	myShader.setUniform('webcam', vidCam);
	myShader.setUniform('numCells', numCells);
	myShader.setUniform('palette', textures[idx].img);
	myShader.setUniform('numChars', textures[idx].meta);
	stroke(0, 255, 0);
	rect(0, 0, 800, 800, 1, 1);
	pop();
	
	//DEBUG ASPECTS
// 	push();
// 	ellipse(-800, 0, 50, 50);//Left
// 	ellipse(0, -400, 50, 50);//Up
// 	ellipse(0, 400, 50, 50);//Down
// 	ellipse(800, 0, 50, 50);//Right
// 	pop();
	push();
	if(idx == 0){
		stage1();
	}if(idx == 1){
		stage2();
	}if(idx == 2){
		stage3();
	}
	pop();
	if(idx == 3){
		stage4();
	}
	textSize(30);
	text("Move mouse left and right to \n decrease/increase pixel density. \n Click on text / images / explore to try to get \n from one stage to the other." , 500, 200);
	print(mouseX, mouseY)
}