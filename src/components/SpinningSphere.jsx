import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const current = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null; // transparent

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      current.clientWidth / current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(current.clientWidth, current.clientHeight);
    current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Load GLB model
    const loader = new GLTFLoader();
    let modelGroup = new THREE.Group(); // Pivot group
    scene.add(modelGroup);

    loader.load(
      "/titan.glb",
      (gltf) => {
        const model = gltf.scene;

        // Compute bounding box and center
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());

        // Create a wrapper group to center the model
        const wrapper = new THREE.Group();
        wrapper.add(model);

        // Move the model so its center is at the origin of the wrapper
        model.position.sub(center);

        // Scale the wrapper (so scaling doesn't affect centering)
        wrapper.scale.set(2, 2, 2);

        // Add the wrapper to the main group
        modelGroup.add(wrapper);
      },
      undefined,
      (error) => {
        console.error("Error loading GLB model:", error);
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the group around its own axis
      modelGroup.rotation.y += 0.01;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "400px",
        height: "400px",
        background: "transparent",
        position: "relative"
      }}
    />
  );
}

export default ThreeScene;
