import * as THREE from "three";
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
    import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader.js";
    import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";

    window.addEventListener('load',e=>{
        init();
        addMesh();
        render();
    });

    let scene1,scene2,renderer,camera,orbit;

    let renderer2;

    let dracoLoader,loader,textureLoader;

    let renderTarget;

    function init(){
        renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
        renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(renderer.domElement);

        renderer2 = new THREE.WebGLRenderer({alpha:true,antilias:true});
        renderer2.setSize(256,256);
        renderer2.domElement.style.position = "absolute";
        renderer2.domElement.style.left = "0";
        renderer2.domElement.style.top = "0";
        document.body.appendChild(renderer2.domElement)

        camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,0.1,2000);
        camera.add(new THREE.PointLight(0xffffff,1,1000,0.01));
        camera.position.set(10,10,10);

        orbit = new OrbitControls(camera,renderer.domElement);
        orbit.enableDamping = true;

        scene1 = new THREE.Scene();
        scene1.add(new THREE.GridHelper(10,10));
        scene1.add(new THREE.AmbientLight(0xffffff,1.0));

        scene2 = new THREE.Scene();
        scene2.add(new THREE.AxesHelper(5,5));
        scene2.background = new THREE.Color("#ffffff");

        textureLoader = new THREE.TextureLoader();
        dracoLoader = new DRACOLoader().setDecoderPath('../three/examples/jsm/libs/draco/gltf/')
        loader = new GLTFLoader().setDRACOLoader(dracoLoader);
    }

    function addMesh() {

        let geometry2 = new THREE.BoxGeometry(1,1,1);
        for(let i =0;i< 5;i++){
            let materialB = new THREE.MeshBasicMaterial({
                color:0xffffff * Math.random()
            });
            let meshB = new THREE.Mesh(geometry2,materialB);
            meshB.position.x = Math.random() * 5 - 2.5;
            meshB.position.y = Math.random() * 5 - 2.5;
            meshB.position.z = Math.random() * 5 - 2.5;
            scene2.add(meshB);
        }

        renderTarget = new THREE.WebGLRenderTarget(512,512);
        renderTarget.texture.mapping = THREE.CubeUVReflectionMapping;
        console.log(renderTarget);


        let geometry = new THREE.TorusKnotGeometry(2,0.5,64,8);

        let material = new THREE.ShaderMaterial({
            uniforms: {
                tDiffuse: { value: renderTarget.texture },
                uRefractionRatio: { value: 1.0 / 1.5 }, // 空气->玻璃 (1/1.5)
                uChromaticAberration: { value: 0.02 },
                uFresnelBias: { value: 0.1 },
                uFresnelScale: { value: 1.0 },
                uFresnelPower: { value: 2.0 }
            },
            vertexShader: `
                varying vec3 vWorldNormal;
                varying vec3 vNormal;
                varying vec3 vPositionNormal;
                varying vec3 vViewPosition;
                varying mat4 vProjectionMatrix;

                void main() {
                    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                    vWorldNormal = normalize(mat3(modelMatrix) * normal);
                    vNormal = normalize( normalMatrix * normal);
                    vPositionNormal = normalize(( modelViewMatrix * vec4(position, 1.0) ).xyz);
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    vViewPosition = -mvPosition.xyz;

                    vProjectionMatrix = projectionMatrix;

                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform float uRefractionRatio;
                uniform float uChromaticAberration;
                uniform float uFresnelBias;
                uniform float uFresnelScale;
                uniform float uFresnelPower;

                varying vec3 vWorldNormal;
                varying vec3 vViewPosition;
                varying mat4 vProjectionMatrix;
                varying vec3 vNormal;
                varying vec3 vPositionNormal;

                void main() {
                    // 归一化法线和视线方向
                    vec3 normal = normalize(vWorldNormal);
                    vec3 viewDir = normalize(vViewPosition);

                    // 菲涅尔反射
                    float fresnel = uFresnelBias +
                                   uFresnelScale * pow(1.0 + dot(normal, viewDir), uFresnelPower);

                    // 折射向量（考虑色散）
                    vec3 refractR = refract(viewDir, normal, uRefractionRatio - uChromaticAberration);
                    vec3 refractG = refract(viewDir, normal, uRefractionRatio);
                    vec3 refractB = refract(viewDir, normal, uRefractionRatio + uChromaticAberration);

                    // 计算屏幕空间UV
                    vec4 coordR = vProjectionMatrix * vec4(vViewPosition + refractR, 1.0);
                    vec4 coordG = vProjectionMatrix * vec4(vViewPosition + refractG, 1.0);
                    vec4 coordB = vProjectionMatrix * vec4(vViewPosition + refractB, 1.0);

                    // 透视除法并转换到[0,1]范围
                    vec2 uvR = (coordR.xy / coordR.w) * 0.5 + 0.5;
                    vec2 uvG = (coordG.xy / coordG.w) * 0.5 + 0.5;
                    vec2 uvB = (coordB.xy / coordB.w) * 0.5 + 0.5;

                    // 采样背景纹理
                    float r = texture2D(tDiffuse, uvR).r;
                    float g = texture2D(tDiffuse, uvG).g;
                    float b = texture2D(tDiffuse, uvB).b;

                    // 混合菲涅尔反射
                    vec3 refractionColor = vec3(r, g, b);


                    //添加内发光
                    float a = pow(1.0 + (-0.98) * abs(dot(vNormal,vPositionNormal)) , 3.0);
                    vec3 rangeColor = vec3(0.0,0.0,1.0);//内发光颜色蓝色

                    //混合内发光
                    gl_FragColor = vec4(mix(refractionColor,rangeColor,a),1.0 - a);
                }
            `,
            transparent: true,
            side: THREE.BackSide // 渲染球体内部
        });
        let mesh = new THREE.Mesh(geometry,material);
        scene1.add(mesh);
    }

    function render() {
        renderer.setRenderTarget(renderTarget);
        renderer.render(scene2,camera);
        renderer2.render(scene2,camera);

        renderer.setRenderTarget(null);
        renderer.render(scene1,camera);


        orbit.update();
        requestAnimationFrame(render);
    }