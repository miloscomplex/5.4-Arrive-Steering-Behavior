let pursuer;
let target;
let target2;

function setup() {
  createCanvas(400, 400);
  pursuer = new Vehicle(250, 250);
  target = new Target(100, 100);

}


function draw() {
  background(50);

  let steering = pursuer.pursue(target);
  pursuer.applyForce(steering);

  target.update();
  target.edges();
  target.show();

  pursuer.update();
  pursuer.edges();
  pursuer.show();  


}