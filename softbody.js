import { VerletParticle2D, VerletSpring2D } from "toxiclibsjs/physics2d"

class Particle extends VerletParticle2D {
    constructor(x,y, physics_world) {
        super(x,y);
        physics_world.addParticle(this)
    }
}

class Spring extends VerletSpring2D {
    constructor(a, b, strength, physics_world) {
        let length = Math.hypot(b.x - a.x, b.y - a.y)
        super(a, b, length, strength);
        physics_world.addSpring(this)
    }
}

export class SoftBody {

    constructor(origin, spring_force, physics_world, bodyPoints) {
        this.origin_pos = origin
        this.spring_force = spring_force
        this.physics_world = physics_world
        this.soft_body_particles = []
        this.soft_body_springs = []
        this.bodyPoints = bodyPoints
        this.process_soft_body()
    }
    process_soft_body() {
        this.bodyPoints.particles.map((e) => {
            this.add_softbody_particle(e)
        })
        this.bodyPoints.springs.map((e) => {
            this.add_softbody_spring(this.soft_body_particles[e[0]], this.soft_body_particles[e[1]])
        })
    }
    draw(p) {

        p.fill(p.color(255, 105, 180))
        p.stroke(0);
        p.strokeWeight(2);
        p.beginShape();
        this.soft_body_particles.forEach((e) => {
            p.vertex(e.x, e.y)
        })
        p.vertex(this.soft_body_particles[0].x, this.soft_body_particles[0].y)
        p.endShape();
    }

    add_softbody_particle(coordinate) {
        this.soft_body_particles.push(new Particle(coordinate[0] + this.origin_pos[0], coordinate[1] + this.origin_pos[1], this.physics_world))
    }
    add_softbody_spring(particle1, particle2) {
        this.soft_body_springs.push(new Spring(particle1, particle2, this.spring_force, this.physics_world))
    }
}


