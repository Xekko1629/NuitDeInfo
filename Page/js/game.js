var scene = new THREE.Scene();
scene.background = new THREE.Color("black");
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth-3, window.innerHeight-3	 );
document.body.appendChild( renderer.domElement );

var grounded;
var gravity = -0.01;

var terrain = [];

//Room
var room = new THREE.Mesh( new THREE.BoxGeometry(175,100,175,12,12,12), new THREE.MeshBasicMaterial({color: 0x404040, wireframe:true}));
scene.add(room);

var j = 0;
var colorRand;

//cube
var cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
var cubeMaterial = new THREE.MeshPhysicalMaterial( { color: "red" } );
var cube = new THREE.Mesh( cubeGeometry,cubeMaterial );
cube.position.set(0, 0, 0);
cube.rotation.y += 4.70;
cube.setCastShadow = true;
cube.receiveShadow = true;


var mat = new THREE.LineBasicMaterial( { color: "black", linewidth: 2 } );

var cubeFrame = new THREE.LineSegments(new THREE.EdgesGeometry(cubeGeometry), mat );

	


camera.position.set(0,2,5);
cube.add(camera);
cube.add(cubeFrame);
camera.lookAt(cube.position);





//lightconst 
color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.PointLight(color, intensity, 0, 3);
camera.add(light);



scene.add( cube );
createTerrain();



var animate = function () {
	requestAnimationFrame( animate );
	updatePlayer();
	collision();

	renderer.render( scene, camera );
};

function updatePlayer() {

	//camera controls
	camera.lookAt(cube.position);

	if (Key.isDown(Key.LEFT)){
		camera.translateX(-0.1);
	}

	if (Key.isDown(Key.RIGHT)){
		camera.translateX(0.1);
	}

	if (Key.isDown(Key.UP)){
		//camera.translateY(0.05);
		camera.translateZ(-0.05);
	}

	if (Key.isDown(Key.DOWN)){
		//camera.translateY(-0.05);
		camera.translateZ(0.05);
	}

	//player controls
	if (Key.isDown(Key.SPACE)){
		if (grounded == true) {
		cube.translateY(0.1);
		grounded = false;
		gravity = 0.9;}
	}

	if (Key.isDown(Key.SHIFT)){
		cube.translateY(-0.1);
	}
	if (Key.isDown(Key.Zero)){
		cube.translateY(0.2);
	}

	if (Key.isDown(Key.Q)){
		cube.rotateY(0.05);
	}

	if (Key.isDown(Key.D)){
		cube.rotateY(-0.05);
	}
	if (Key.isDown(Key.Z)){
		cube.translateZ(-0.1);
	}
	if (Key.isDown(Key.S)){
		cube.translateZ(0.1);
	}

}

function createCube(width, height, depth, x, y, z){

	var cubeGeometry = new THREE.BoxGeometry( width, height, depth );
	var cubeMaterial = new THREE.MeshPhysicalMaterial( { color: "#8B4513" } );
	var cube = new THREE.Mesh( cubeGeometry,cubeMaterial );


	scene.add(cube);

	cube.translateX(x);
	cube.translateY(y);
	cube.translateZ(z);

	terrain.push(cube);

}

function createTerrain(){
	createCube(5 /*width*/, 1/*height*/, 7.5/*depth*/, -1/*x*/, -1/*y*/, 0/*z*/);
	createCube(3, 1, 3, 4, -1, 0);
	createCube(3, 1, 3, 9, -1, 0);
	createCube(3, 1, 3, 16, -1, 0);
	createCube(2, 1, 4, 20, 1.5, -4);
	createCube(2, 1, 2, 23, 3.5, -9);
	createCube(2, 1, 2, 25.5, 4.25, -14);
	createCube(2, 1, 2, 24, 5.25, -18);
	createCube(25, 1, 5, 8.5, 5.50, -19);
	createCube(2.5, 1, 0.50, -9, 5.50, -19);
	createCube(2.5, 1, 0.50, -13.5, 5.50, -20.5);
	createCube(2.5, 1, 0.50, -18, 5.50, -18.5);
	createCube(10, 1, 10, -28, 5.50, -19);
	createCube(1, 0.5, 1, -28, 6, -19);
}



function collision(){
	hitbox = new THREE.Box3().setFromObject(cube);

	var originPoint = cube.position.clone();
	if (j%60==0){
		colorRand = Math.random() * 0xffffff;
	}
	grounded = false;
	for (var vertexIndex = 0; vertexIndex < cube.geometry.vertices.length; vertexIndex++)
	{		
		var localVertex = cube.geometry.vertices[vertexIndex].clone();
		var globalVertex = localVertex.applyMatrix4( cube.matrix );
		var directionVector = globalVertex.sub( cube.position );
		
		var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
		var distance = originPoint.distanceTo(directionVector.clone().normalize());
		var collisionResults = ray.intersectObjects(terrain);

		if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
			collisionResults[0].object.material.color.set( colorRand );
			//console.log(distance);
			//cube.position.set(originPoint.x, originPoint.y+0.01, originPoint.z);
			//cube.translateY(collisionResults[0].distance);

			if (collisionResults[0].object.position.x == -28 && collisionResults[0].object.position.y == 6){
				cube.position.set(0,0,0);
			}

			grounded = true;

			if (grounded ==  true && collisionResults[0].distance < 0.5){
				if (collisionResults[0].distance+0.1<0.5) {cube.translateY(0.1);}
				else if (collisionResults[0].distance+0.05<0.5) {cube.translateY(0.05);}
				else if (collisionResults[0].distance+0.01<0.5) {cube.translateY(0.01);}
				
			}
		}

	
	}
		if (grounded == false){
		cube.position.y += gravity;
		if (gravity >= -0.01){
			gravity -= 0.1;	
		}
	}
	if(cube.position.y < -10){
		cube.position.set(0,0,0);
	}
	j++;
}

animate();