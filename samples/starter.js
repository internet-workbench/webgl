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

	function initCube(id) {

		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( w, h );
		var ele = $("#" + id);
		ele.append(renderer.domElement);

		camera = new THREE.PerspectiveCamera( 70, w / h, 1, 1000 );
		camera.position.z = 400;

		scene = new THREE.Scene();

		var geometry = new THREE.BoxGeometry( 200, 200, 200 );

		THREE.ImageUtils.crossOrigin = 'anonymous';
		var texture = THREE.ImageUtils.loadTexture( prefix + 'textures/crate.gif' );
		texture.anisotropy = renderer.getMaxAnisotropy();

		var material = new THREE.MeshBasicMaterial( { map: texture } );

		mesh = new THREE.Mesh( geometry, material );
		scene.add( mesh );

	}

	function animateCube() {

		requestAnimationFrame( animateCube );

		mesh.rotation.x += 0.005;
		mesh.rotation.y += 0.01;

		renderer.render( scene, camera );

	}

	var g = {
		 events: {
	      "startCube" : function(e) {
	        var env = e.env;
	        var config = e.config;
	        var model = e.model;
	        var mod = e.args[0];
	        var fun = e.args[1];
	        var id = e.args[2];
	        var card = e.args[3];
	        console.log("id:" + id + " cardSize:" + card.cardSize);
	      	initCube(id);
	      	animateCube();
	      	model.cubeStarted = true;
	      }
	   }
	}
	
	return g;

});
