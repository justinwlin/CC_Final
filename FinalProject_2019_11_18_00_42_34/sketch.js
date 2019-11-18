let myFont;
let title = "The morning after I killed \n myself \n\n by Meggie Royer";
let turnPage = false
let backgroundColor = 0
let page = 0
stringToLoad = ""
done = false

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
    print(filtered_parsedText[i])
    for(let j = 0; j < filtered_parsedText[i].length; j++){
      if(j % newlineAtEveryWord == 0 && j != 0){
        filtered_parsedText[i].splice( j, 0, "\n")
      }
    }
    filtered_parsedText[i] = filtered_parsedText[i].join(" ")
  }
  parsedText = filtered_parsedText
  
}

function draw() {
  if(turnPage && done){
    background(backgroundColor)
    turnPage = false
    page += 1
    if(page >= parsedText.length){
      page = 0
      background(backgroundColor);
      typeWriter(title, 0, 20, 180, 20, 30);
    } else{
      stringToLoad = parsedText[page]
      typeWriter(stringToLoad, 0, 20, 280, 10, 20);
    }
  }else{
    turnPage = false
  }

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