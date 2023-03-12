class Vehicle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.r = 20;
        this.maxForce = 0.25;
        // limits steering force
        this.maxSpeed = 6;
    }

    flee(target) {
        return this.seek(target).mult(-1);
    }

    pursue(vehicle) {
        let target = vehicle.pos.copy();
        // seek a target in front of the target based on trajectory 
        let prediction = vehicle.vel.copy();
        prediction.mult(10);
        target.add(prediction);
        return this.arrive(target);
    }

    evade(vehicle) {
        let pursuit = this.pursue(vehicle);
        pursuit.mult(-1);
        return pursuit;
    }

    arrive(target) {
        let force = p5.Vector.sub(target, this.pos);
        let slowRadius = 100;
        let distance = force.mag()
        if (distance < slowRadius) {
            let desiredSpeed = map( distance, 0, slowRadius, 0, this.maxSpeed)
            force.setMag(desiredSpeed);
        } else {
            force.setMag(this.maxSpeed);
        }

        force.sub(this.vel);
        force.limit(this.maxForce);
        return force;
    }

    seek(target) {
        let force = p5.Vector.sub(target, this.pos);
        force.setMag(this.maxSpeed);
        force.sub(this.vel);
        force.limit(this.maxForce);
        return force;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
        //this.lifetime -= 8;
    }

    show() {
        stroke(255);
        strokeWeight(2);
        fill(255);
        push()
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        triangle(-this.r,-this.r/2,-this.r,this.r/2,this.r, 0);
        pop();
    }

    edges() {
        if (this.pos.y >= height) {
            this.pos.y = 0;
        } else if (this.pos.y <= 0) {
            this.pos.y = height;
        }
        if (this.pos.x >= width) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = width;
            this.vel.x *= -1;
        }
    }

}