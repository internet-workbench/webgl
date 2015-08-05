define([
        'git/libs/master/threejs.org/three/7.1.0/three-7.1.0',
        'git/libs/master/threejs.org/detector/1.0.0/detector-1.0.0',
        'git/libs/master/threejs.org/stats/1.0.0/stats-1.0.0'
       ], function(THREE, Detector, Stats) {
	
	console.log("loaded webgl starter");
	
	var camera, scene, renderer;
	var mesh;
	
	var w = 300;
	var h = 300;
	var prefix = "https://rawgit.com/internet-workbench/webgl/master/";

	function initScene(id,width,height) {

		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( w, h );
		renderer.setClearColor( 0 );
		var ele = $("#" + id);
		ele.append(renderer.domElement);
		
		if (width) w = width;
		if (height) h = height;

		camera = new THREE.PerspectiveCamera( 70, w / h, 1, 1000 );
		camera.position.z = 600;

		scene = new THREE.Scene();
		
		var planets = [
		  { 
		    size: 50,
		    color: 0xff0000,
		    position: { x:0, y:0, z:0}
		  },
		  { 
		    size: 50,
		    color: 0x00ff00,
		    position: { x:150, y:0, z:0}
		  },
		  { 
		    size: 50,
		    color: 0x0000ff,
		    position: { x:-150, y:0, z:0}
		  }
		]
		
		for (i=0; i<planets.length; i++) {
		  var planet = planets[i];
  		  var geometry = new THREE.SphereGeometry( planet.size, 32, 32 ); 
		  var material = new THREE.MeshBasicMaterial( {color: planet.color} ); 
		  var sphere = new THREE.Mesh( geometry, material ); 
		  scene.add( sphere );
 		  sphere.position.setX(planet.position.x);
		}

		//THREE.ImageUtils.crossOrigin = 'anonymous';
		//var texture = THREE.ImageUtils.loadTexture( prefix + 'textures/crate.gif' );
		//texture.anisotropy = renderer.getMaxAnisotropy();

		//var material = new THREE.MeshBasicMaterial( { map: texture } );

		//mesh = new THREE.Mesh( geometry, material );
		//scene.add( mesh );

	}

	function animateScene() {

		requestAnimationFrame( animateScene );

		//mesh.rotation.x += 0.005;
		//mesh.rotation.y += 0.01;

		renderer.render( scene, camera );

	}

	var g = {
		 events: {
	      "startScene" : function(e) {
	        var env = e.env;
	        var config = e.config;
	        var model = e.model;
	        var mod = e.args[0];
	        var fun = e.args[1];
	        var id = e.args[2];
	        var card = e.args[3];
	        console.log("id:" + id + " cardSize:" + card.cardSize);
	      	initScene(id, card.width, card.height);
	      	animateScene();
	      	model.sceneStarted = true;
	      }
	   }
	}
	
	return g;

});
