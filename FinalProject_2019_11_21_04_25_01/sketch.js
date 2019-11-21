let myFont;
let title = "types of people: \n \t stars edition";
let turnPage = false
let backgroundColor = 0
let page = -1
stringToLoad = ""
done = false

let stars = []
//(x, y, r, g, b, diameter, text)
whiteDwarf = new Star(104,119 , 201, 255, 251, 25, "white dwarf")
pulsar = new Star(241,49 , 255, 51, 153, 50, "pulsar")
superNova = new Star(398,169 , 51, 51, 204, 100, "super nova")
blueGiant = new Star(160,292, 0, 102, 255, 75, "blue giant")
polar = new Star(358,301, 102, 204, 255, 25, "polar")

function preload() {
  myFont = loadFont('cursiveFont.ttf');
  parsedText = loadStrings('MorningAfterIKilledMySelf.txt');
}

function setup() {
  createCanvas(500, 400);
  textFont(myFont);
  background(backgroundColor);
  typeWriter(title, 0, 20, 180, 20, 30);
  let newlineAtEveryWord = 10
  
  let filtered_parsedText = parsedText.filter(word => word.length > 1)
  for(let i = 0; i < filtered_parsedText.length; i++){
    filtered_parsedText[i] = filtered_parsedText[i].trim()
    filtered_parsedText[i] = filtered_parsedText[i].split(" ")
    // for(let j = 0; j < filtered_parsedText[i].length; j++){
    //   if(j % newlineAtEveryWord == 0 && j != 0){
    //     filtered_parsedText[i].splice( j, 0, "\n")
    //   }
    // }
    filtered_parsedText[i] = filtered_parsedText[i].join(" ")
  }
  parsedText = filtered_parsedText
  print(parsedText)
  
  stars.push(whiteDwarf)
  stars.push(pulsar)
  stars.push(superNova)
  stars.push(blueGiant)
  stars.push(polar)
  
}

function draw() {
  if(turnPage){
    background(0)
    stars.forEach(star => star.show())
  }

}

function mouseClicked(){
  print(mouseX + "," + mouseY)
  print("----")
}

function keyTyped() {
  //normal voting
  if (key === "p") {
    turnPage = true
  }
}

//Sentence, starting point, x, y, speed
function typeWriter(sentence, n, x, y, speed, size) {
  if (n < (sentence.length)) {
    done = false
    fill(255)
    textSize(size)
    text(sentence.substring(0, n + 1), x, y);
    n++;
    setTimeout(function() {
      typeWriter(sentence, n, x, y, speed)
    }, speed);
  }else{
    done = true
  }
}



