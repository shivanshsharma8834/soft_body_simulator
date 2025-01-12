import p5 from 'p5';
import toxi from 'toxiclibsjs';
const { VerletPhysics2D} = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;
import { SoftBody } from './softbody';
const SPRING_FORCE = 0.1;

const sketch = (p) => {
  let physics = new VerletPhysics2D();
  let bounds = new Rect(0, 0, 800, 600);
  physics.setWorldBounds(bounds);
  let bodyParticles = {
    particles : [
        [0, 0],
        [100, 0],
        [100, 100],
        [0, 100],
    ],
    springs : [
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 2],
        [1, 3],
        [2, 3]
    ]
  } 
  let my_soft_body = new SoftBody(origin=[200,300], SPRING_FORCE, physics, bodyParticles)
  let gravity = new GravityBehavior(new Vec2D(0,0.5));
  physics.addBehavior(gravity);

  p.setup = () => {
    p.createCanvas(800, 600);
    p.background(200);
  };
  // Main Draw Function 
  p.draw = () => {
    p.background(200);
    p.stroke(0)
    my_soft_body.draw(p)
    physics.update();

    if (p.mouseIsPressed) {
      my_soft_body.soft_body_particles[0].lock();
      my_soft_body.soft_body_particles[0].x = p.mouseX;
      my_soft_body.soft_body_particles[0].y = p.mouseY;
      my_soft_body.soft_body_particles[0].unlock();
    }
  };
};

new p5(sketch);