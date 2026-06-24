"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function KeyboardUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    keys: THREE.Group[];
    mouse: { x: number; y: number };
    scrollY: number;
    animFrameId: number;
    velocities: { x: number; y: number; z: number }[];
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x111111, 2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xC9A96E, 3, 80);
    pointLight1.position.set(10, 10, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4444ff, 1.5, 60);
    pointLight2.position.set(-15, -10, 15);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xC9A96E, 1, 50);
    pointLight3.position.set(0, -15, 10);
    scene.add(pointLight3);

    // Key labels
    const keyLabels = [
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
      "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
      "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
      "⌘", "⇧", "⌥", "⌃", "↵", "⌫", "⇥", "␣",
      "</>", "{ }", "[ ]", "( )", "=>", "&&", "||", "!="
    ];

    // Create 3D key geometry
    const createKey = (label: string, index: number) => {
      const group = new THREE.Group();

      // Key body
      const bodyGeo = new THREE.BoxGeometry(2.2, 2.2, 0.5);
      const bodyMat = new THREE.MeshPhysicalMaterial({
        color: 0x1a1a1a,
        metalness: 0.3,
        roughness: 0.6,
        transparent: true,
        opacity: 0.85,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      group.add(body);

      // Key top face (slightly smaller, raised)
      const topGeo = new THREE.BoxGeometry(1.8, 1.8, 0.15);
      const topMat = new THREE.MeshPhysicalMaterial({
        color: 0x222222,
        metalness: 0.4,
        roughness: 0.4,
        transparent: true,
        opacity: 0.9,
      });
      const top = new THREE.Mesh(topGeo, topMat);
      top.position.z = 0.28;
      group.add(top);

      // Gold edge highlight (randomly on some keys)
      if (Math.random() > 0.6) {
        const edgeGeo = new THREE.BoxGeometry(2.25, 2.25, 0.52);
        const edgeMat = new THREE.MeshBasicMaterial({
          color: 0xC9A96E,
          transparent: true,
          opacity: 0.15,
          wireframe: false,
        });
        const edgeFrame = new THREE.Mesh(edgeGeo, edgeMat);
        group.add(edgeFrame);
      }

      // Random position in 3D space
      const spread = 35;
      const depthSpread = 20;
      group.position.set(
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * depthSpread - 5
      );

      // Random rotation
      group.rotation.set(
        Math.random() * 0.5,
        Math.random() * 0.5,
        (Math.random() - 0.5) * 0.4
      );

      // Store original position for animations
      group.userData = {
        originalX: group.position.x,
        originalY: group.position.y,
        originalZ: group.position.z,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.3 + Math.random() * 0.5,
        floatAmp: 0.3 + Math.random() * 0.5,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        label,
        index,
      };

      return group;
    };

    // Create keys
    const keyCount = Math.min(55, keyLabels.length);
    const keys: THREE.Group[] = [];
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < keyCount; i++) {
      const key = createKey(keyLabels[i], i);
      scene.add(key);
      keys.push(key);
      velocities.push({ x: 0, y: 0, z: 0 });
    }

    const mouse = { x: 0, y: 0 };
    let scrollY = 0;
    let time = 0;

    // Mouse move
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    // Click - explode keys
    const onClick = (e: MouseEvent) => {
      const clickX = (e.clientX / window.innerWidth - 0.5) * 40;
      const clickY = -(e.clientY / window.innerHeight - 0.5) * 30;

      keys.forEach((key, i) => {
        const dx = key.position.x - clickX;
        const dy = key.position.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 8 - dist) * 0.6;

        velocities[i].x += (dx / (dist + 0.1)) * force;
        velocities[i].y += (dy / (dist + 0.1)) * force;
        velocities[i].z += (Math.random() - 0.5) * force * 2;
      });
    };

    // Scroll
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    // Touch
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const clickX = (touch.clientX / window.innerWidth - 0.5) * 40;
      const clickY = -(touch.clientY / window.innerHeight - 0.5) * 30;

      keys.forEach((key, i) => {
        const dx = key.position.x - clickX;
        const dy = key.position.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 10 - dist) * 0.5;
        velocities[i].x += (dx / (dist + 0.1)) * force;
        velocities[i].y += (dy / (dist + 0.1)) * force;
        velocities[i].z += (Math.random() - 0.5) * force;
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("touchstart", onTouch);

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation loop
    let animFrameId: number;
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      time += 0.008;

      // Subtle camera parallax with mouse
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.03;

      // Scroll parallax
      const scrollOffset = scrollY * 0.015;

      keys.forEach((key, i) => {
        const ud = key.userData;
        const vel = velocities[i];

        // Apply physics
        vel.x *= 0.92;
        vel.y *= 0.92;
        vel.z *= 0.92;

        // Floating sine wave
        const floatY = Math.sin(time * ud.floatSpeed + ud.floatOffset) * ud.floatAmp;
        const floatX = Math.cos(time * ud.floatSpeed * 0.7 + ud.floatOffset) * ud.floatAmp * 0.5;

        // Spring back to original position
        const springX = (ud.originalX - key.position.x) * 0.04;
        const springY = (ud.originalY - key.position.y) * 0.04;
        const springZ = (ud.originalZ - key.position.z) * 0.04;

        key.position.x += vel.x + springX + floatX * 0.01;
        key.position.y += vel.y + springY + floatY * 0.01 - scrollOffset * (0.5 + i * 0.01);
        key.position.z += vel.z + springZ;

        // Slow rotation
        key.rotation.x += ud.rotSpeed * 0.5;
        key.rotation.y += ud.rotSpeed;
        key.rotation.z += ud.rotSpeed * 0.3;

        // Depth-based opacity/scale
        const depth = (key.position.z + 15) / 30;
        const scale = 0.6 + depth * 0.4;
        key.scale.setScalar(scale);
      });

      renderer.render(scene, camera);
    };
    animate();

    sceneRef.current = { scene, camera, renderer, keys, mouse, scrollY: 0, animFrameId: 0, velocities };

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="three-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
