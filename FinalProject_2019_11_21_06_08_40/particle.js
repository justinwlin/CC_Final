//Particle Class
class Particle {
    //Pushes circle outwards using PI 
    constructor() {
        let a = random(TWO_PI)
        this.position = createVector(width / 2, height / 2);
        this.speed = 3
        this.velocity = createVector(cos(a) * this.speed, sin(a) * this.speed)
        this.radius = 20
    }

    //Updates
    update() {
        // Add the current speed to the position.
        this.position.add(this.velocity);
        if ((this.position.x > width) || (this.position.x < 0)) {
            this.velocity.x = this.velocity.x * -1;
        }
        if ((this.position.y > height) || (this.position.y < 0)) {
            this.velocity.y = this.velocity.y * -1;
        }

    }

    show(c) {
        // // Display circle at x position
        // let r = c[0]
        // let g = c[1]
        // let b = c[2]
        // let a = c[3]

        // Display circle at x position
        let r = 100
        let g = 150
        let b = 255
        //Sets the color and stroke to 0 b/c the borders messes it up
        noStroke()
        fill(r, g, b);
        //ellipse(this.position.x, this.position.y, this.radius, this.radius);
        image(heart, this.position.x, this.position.y, 30, 30);

        //Wanted small images to trail ahead but ended up looking really bad b/c no background refresh. 
        //Thought the fact with an ellipse trailing behind it that it would be okay, but it really just didn't work :( 
        //image(dog, this.position.x, this.position.y, this.radius, this.radius)
    }
}