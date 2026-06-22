import * as THREE from "three";
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene,
	camera,
	renderer,
	cloudParticles = [],
	rainParticles = [],
	flash,
	rain,
	rainGeo,
  directionalLight,
  ambient,
  rainDrop,
  rainMaterial,
  cloudGeo,
  cloudMaterial,
	rainCount = 15000;

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		60,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);
	camera.position.z = 1;
	camera.rotation.x = 1.16;
	camera.rotation.y = -0.12;
	camera.rotation.z = 0.27;

	 ambient = new THREE.AmbientLight(0x555555);
	scene.add(ambient);

	directionalLight = new THREE.DirectionalLight(0xffeedd);
	directionalLight.position.set(0, 0, 1);
	scene.add(directionalLight);

	flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
	flash.position.set(200, 300, 100);
	scene.add(flash);

	renderer = new THREE.WebGLRenderer();

	scene.fog = new THREE.FogExp2(0x11111f, 0.002);
	renderer.setClearColor(scene.fog.color);

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	let positions = [];
	let sizes = [];
	rainGeo = new THREE.BufferGeometry();
	for (let i = 0; i < rainCount; i++) {
		rainDrop = new THREE.Vector3(
			Math.random() * 400 - 200,
			Math.random() * 500 - 250,
			Math.random() * 400 - 200
		);
		positions.push(Math.random() * 400 - 200);
		positions.push(Math.random() * 500 - 250);
		positions.push(Math.random() * 400 - 200);
		sizes.push(30);
	}
	rainGeo.setAttribute(
		"position",
		new THREE.BufferAttribute(new Float32Array(positions), 3)
	);
	rainGeo.setAttribute(
		"size",
		new THREE.BufferAttribute(new Float32Array(sizes), 1)
	);
	rainMaterial = new THREE.PointsMaterial({
		color: 0xaaaaaa,
		size: 0.1,
		transparent: true
	});
	rain = new THREE.Points(rainGeo, rainMaterial);
	scene.add(rain);

	let loader = new THREE.TextureLoader();
	loader.load(
		"https://static.vecteezy.com/system/resources/previews/010/884/548/original/dense-fluffy-puffs-of-white-smoke-and-fog-on-transparent-background-abstract-smoke-clouds-movement-blurred-out-of-focus-smoking-blows-from-machine-dry-ice-fly-fluttering-in-air-effect-texture-png.png",
		function (texture) {
			cloudGeo = new THREE.PlaneGeometry(500, 500);
			cloudMaterial = new THREE.MeshLambertMaterial({
				map: texture,
				transparent: true
			});

			for (let p = 0; p < 25; p++) {
				let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
				cloud.position.set(
					Math.random() * 800 - 400,
					500,
					Math.random() * 500 - 450
				);
				cloud.rotation.x = 1.16;
				cloud.rotation.y = -0.12;
				cloud.rotation.z = Math.random() * 360;
				cloud.material.opacity = 0.6;
				cloudParticles.push(cloud);
				scene.add(cloud);
			}
			animate();
			window.addEventListener("resize", onWindowResize);
		}
	);
}
function animate() {
	cloudParticles.forEach((p) => {
		p.rotation.z -= 0.002;
	});
	rainGeo.attributes.size.array.forEach((r, i) => {
		r += 0.3;
	});
	const time = Date.now() * 0.005;

	rainGeo.verticesNeedUpdate = true;

	rain.position.z -= 0.222;
	if (rain.position.z < -200) {
		rain.position.z = 0;
	}

	if (Math.random() > 0.93 || flash.power > 100) {
		if (flash.power < 100)
			flash.position.set(Math.random() * 400, 300 + Math.random() * 200, 100);
		flash.power = 50 + Math.random() * 500;
	}
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

init();

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * 名称: 雷雨
 * 作者: Open Three https://openthree.github.io/three-cesium-links/
 */