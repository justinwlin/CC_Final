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

    this.Particles = [] //Array of particles
  }

  show() {
    let size = 20
    let x = 10
    let y = 100
    if (this.expandCounter <= this.expandMax) {
      this.displayStar()
    } else {
      if (this.typing == false) {
        this.typeWriter(this.text, 0, x, y, 20, size)
        this.typing = true
      }
      //Finished state
      if (this.starDisplay.done == this.doneState) {
        background(this.r, this.g, this.b)

        if (this.Particles.length == 0) {
          this.addParticles(10)
        }
        this.runParticles()
        stroke(5)
        textSize(size)
        fill(255)
        text(this.text, x, y)

        // print("Refreshing")
      }
    }

  }


  displayStar() {

    ellipseMode(CENTER);
    let glowRate = 1
    smooth()
    noStroke()
    fill(this.r, this.g, this.b, 0)
    //Text name
    textSize(20)
    fill(255)
    text(this.name, this.x - this.diameter / 2, this.y + this.diameter / 2 + 20);

    //Ellipse with blur
    smooth();
    noStroke();
    fill(255);
    //Outside star glow
    ellipse(this.x, this.y, this.diameter + this.sizeOfGlow, this.diameter + this.sizeOfGlow);
    //Inner main color
    stroke(0);
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y, this.diameter + this.expandCounter, this.diameter + this.expandCounter); //Main Color





    this.pulsingLogic()
    if (this.expand && this.expandCounter <= this.expandMax) {
      this.expandCounter += 15
    }
  }

  checkClicked(clickX, clickY) {
    let distance = dist(clickX, clickY, this.x, this.y)
    if (distance <= this.diameter && this.expand == false) {
      print("Clicked on: " + this.name)
      this.expand = true
      this.starDisplay.star = this.name
    }
    if (this.starDisplay.done == this.doneState) {
      this.starDisplay.done = ""
      this.starDisplay.star = ""
      this.expand = false
      this.expandCounter = 0
      this.doneTyping = false
      this.typing = false
      this.Particles = []
    }
  }

  getName() {
    return this.name
  }

  pulsingLogic() {
    let glowRate = 1
    if (this.pulsing == true) {
      this.sizeOfGlow += glowRate
      if (this.sizeOfGlow >= this.sizeOfGlowMax) {
        this.pulsing = false
      }
    } else {
      this.sizeOfGlow -= glowRate
      if (this.sizeOfGlow <= 0) {
        this.pulsing = true
      }
    }
  }

  addParticles(num) {
    //Particles 
    for (let i = 0; i < num; i++) {
      let spawnParticle = new Particle()
      this.Particles.push(spawnParticle)
    }
  }

  runParticles() {
    this.Particles.forEach(particle => {
      particle.update()
      particle.show(heart)
      print("Testing")
    });
  }

  typeWriter(sentence, n, x, y, speed, size) {
    if (n < (sentence.length)) {
      done = false
      fill(255)
      textSize(size)
      text(sentence.substring(0, n + 1), x, y);
      n++;
      //Need to use arrow function here in order to reference in same context
      setTimeout(() => {
        this.typeWriter(sentence, n, x, y, speed)
      }, speed);
    } else {
      print("Done in Star")
      this.starDisplay.done = this.doneState
      print(this.starDisplay)
    }
  }


}