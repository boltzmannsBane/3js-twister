import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import glsl from "babel-plugin-glsl/macro";
import {
  uniforms,
  vertex as vertexShader,
  fragment as fragmentShader,
} from "./shaders";
import "./App.css";

const settings = {
  speed: 0.2,
  density: 1.5,
  strength: 0.2,
};

function App() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    ref.current.appendChild(renderer.domElement);
    const geometry = new THREE.IcosahedronBufferGeometry(1, 64);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: 0.2 },
        uNoiseDensity: { value: 1.5 },
        uNoiseStrength: { value: 0.2 },
      },
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    camera.position.z = 5;
    const animate = function () {
      requestAnimationFrame(animate);
      mesh.material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  const ref = useRef();
  return <div ref={ref} />;
}

export default App;
