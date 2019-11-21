class Star {
  constructor(x, y, r, g, b, diameter, name, text, starDisplay) {
    this.x = x
    this.y = y
    this.r = r
    this.g = g
    this.b = b
    this.name = name
    this.text = text
    this.diameter = diameter
    this.sizeOfGlow = 5
    this.pulsing = true
    this.sizeOfGlowMax = 20

    this.expand = false
    this.expandCounter = 0
    this.expandMax = 1000
    this.starDisplay = starDisplay

    this.backgroundSet = false
    this.typing = false
    this.doneTyping = false

    this.doneState = "Done"
  }

  show() {
    if (this.expandCounter <= this.expandMax) {
      this.displayStar()
    } else {
      if (this.typing == false) {
        this.typeWriter(this.text, 0, 20, 20, 20, 20)
        this.typing = true
        //setTimeout(this.doneTest, 1000)
        this.timeout = setTimeout(() => this.doneTest(), 5000);
      }
    }

  }


  displayStar() {
    smooth()
    noStroke()
    fill(this.r, this.g, this.b, 0)
    //Ellipse with blur
    smooth();
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.diameter + this.sizeOfGlow, this.diameter + this.sizeOfGlow); //Blur Color
    if (this.pulsing == true) {
      this.sizeOfGlow += 1
      if (this.sizeOfGlow >= this.sizeOfGlowMax) {
        this.pulsing = false
      }
    }
    else {
      this.sizeOfGlow -= 1
      if (this.sizeOfGlow <= 0) {
        this.pulsing = true
      }
    }
    //filter( BLUR, 20 );
    stroke(0);
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y, this.diameter + this.expandCounter, this.diameter + this.expandCounter); //Main Color
    if (this.expand && this.expandCounter <= this.expandMax) {
      this.expandCounter += 15
    }
  }

  checkClicked(clickX, clickY) {
    let distance = dist(clickX, clickY, this.x, this.y)
    if (distance <= this.diameter && this.expand == false) {
      print("clicked")
      this.expand = true
      this.starDisplay.star = this.name

    }
    if (this.starDisplay.star == this.doneState) {
      print("RESET")
      this.starDisplay.star = ""
      this.expand = false
      this.expandCounter = 0
      this.doneTyping = false
      this.typing = false
    }
  }

  typeWriter(sentence, n, x, y, speed, size) {
    if (n < (sentence.length)) {
      done = false
      fill(255)
      textSize(size)
      text(sentence.substring(0, n + 1), x, y);
      n++;
      setTimeout(function () {
        typeWriter(sentence, n, x, y, speed, 18)
      }, speed);
    }
  }

  doneTest() {
    print(this.starDisplay)
    this.starDisplay.star = this.doneState
    print(this.starDisplay)
  }


}