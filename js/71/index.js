function Vehicle(color){
    this.color = color
};

Vehicle.prototype.go = function(speed){
    this.speed = speed;
    console.log(`now going at speed ${speed}mph`);
}

Vehicle.prototype.print = function(){
    console.log(`Vehicles ${this.color} and current speed ${this.speed}mph.`);
}

function Plane(color){
    Vehicle.call(this, color)
}

Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.go = function(speed){
    this.speed = speed;
    console.log(`now flying at ${speed}mph`);
}

Plane.prototype.constructor = Plane;

const v1 = new Vehicle('yellow');
v1.go(30);
v1.print();

const p1 = new Plane('green');
p1.go(500);
p1.print();

///////////////////

class VehicleC{
    constructor(color){
        this.color = color;
    }
    go(speed){
        this.speed = speed;
        console.log(`now going at speed ${speed}mph`);
    }
    print(){
        console.log(`Vehicles ${this.color} and current speed ${this.speed}mph.`);
    }
}

const vc1 = new VehicleC('purple');
vc1.go(75);
vc1.print();

class PlaneC extends VehicleC{
    constructor(color){
        super(color)
    }
    go(speed){
        this.speed = speed;
        console.log(`now flying at ${speed}mph`);
    }
};

const pc1 = new PlaneC('purple');
pc1.go(750);
pc1.print();

///////////////////////

const vehicleFunctions = {
    go(speed){
        this.speed = speed;
        console.log(`now going at ${speed}mph`);
    },
    print(){
        console.log(`Vehicles ${this.color} and current speed ${this.speed}mph.`);
    }
};

function createVehicle(color){
    const v = Object.create(vehicleFunctions);
    // v.speed = speed;
    v.color = color;
    return v;
};

const v3 = createVehicle('orange');
v3.go(38);
v3.print();

const planeFunctions = Object.create(vehicleFunctions);
planeFunctions.go = function(speed){
    this.speed = speed;
    console.log(`now flying at ${speed}mph`);
};

function createPlane(color){
    const p = Object.create(planeFunctions);
    p.color = color;
    return p;
};

const p3 = createPlane('blue');
p3.go(380);
p3.print();