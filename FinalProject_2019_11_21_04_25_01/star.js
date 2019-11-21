class Star {
  constructor(x, y, r, g, b, diameter, text) {
    this.x = x
    this.y = y
    this.r = r
    this.g = g
    this.b = b
    this.text = text
    this.diameter = diameter
    this.sizeOfGlow = 5
  }
  
  show(){
    smooth()
    noStroke()
    fill(this.r, this.g, this.b, 0)
    //Ellipse with blur
    smooth();
    noStroke();
    fill(255);
    ellipse(this.x, this.y,this.diameter + this.sizeOfGlow, this.diameter +  this.sizeOfGlow);//Blur Color
    //filter( BLUR, 20 );
    stroke(0);
    fill(this.r,this.g,this.b);
    ellipse(this.x,this.y,this.diameter,this.diameter);//Main Color

  }
  
}
  