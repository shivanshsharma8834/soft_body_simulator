import p5 from 'p5';
import toxi from 'toxiclibsjs';
const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;

const { GravityBehavior } = toxi.physics2d.behaviors;

const { Vec2D, Rect } = toxi.geom;

const SPRING_FORCE = 0.1;


const sketch = (p) => {

  
  let physics = new VerletPhysics2D();
    
  let bounds = new Rect(0, 0, 800, 600);
  physics.setWorldBounds(bounds);

  
  
  

  class Particle extends VerletParticle2D {
    constructor(x,y) {
      super(x,y);
      this.r = 10;
      physics.addParticle(this);
    }

    show() {
      p.circle(this.x, this.y, this.r);
    }
  } 

  class Spring extends VerletSpring2D {
    constructor(a, b, strength) {
      let length = p.dist(a.x, a.y, b.x, b.y);
      super(a, b, length, strength);
      physics.addSpring(this);
    }

    show() {
      p.stroke(0, 50);
      p.line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
  }
  
  let particles = [];
  let springs = [];

  let gravity = new GravityBehavior(new Vec2D(0,0.5));

  physics.addBehavior(gravity);
    
  // particles.push(new Particle(100, 100));
  // particles.push(new Particle(150, 100));
  // particles.push(new Particle(200, 200));
  // particles.push(new Particle(100, 200));

  // springs.push(new Spring(particles[0], particles[1], SPRING_FORCE));
  // springs.push(new Spring(particles[1], particles[2], SPRING_FORCE));
  // springs.push(new Spring(particles[2], particles[3], SPRING_FORCE));
  // springs.push(new Spring(particles[3], particles[4], SPRING_FORCE));
  // springs.push(new Spring(particles[0], particles[3], SPRING_FORCE));
  // springs.push(new Spring(particles[2], particles[4], SPRING_FORCE));

  p.setup = () => {
    p.createCanvas(800, 600);
    p.background(200);

  };




  
  p.draw = () => {
    p.background(200);
    physics.update();
    for (let i = 0; i < particles.length; i++) {
      particles[i].show();
    }

    for (let i = 0; i < springs.length; i++) {
      springs[i].show();
    }
    
    // DEBUG
    if (p.mouseIsPressed) {
      particle[0].lock();
      particle[0].x = p.mouseX;
      particle[0].y = p.mouseY;
      particle[0].unlock();
    }

    

  };
};

new p5(sketch);