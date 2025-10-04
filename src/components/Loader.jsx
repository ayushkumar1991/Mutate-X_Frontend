"use client";

import React, { useEffect, useState, Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * Renders a swirling cloud of particles to represent a data sphere.
 */
function DataParticles({ count = 1500 }) {
  const pointsRef = useRef();

  // Generate random positions for particles in a spherical layout
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 2.5; // Spread particles between a radius of 4 and 6.5
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  // Animate the rotation of the particle cloud
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00ffff"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}


/**
 * Represents the central animated 3D object for the loader.
 * It includes a pulsating core and five rotating rings.
 */
function AICore() {
  const coreRef = useRef();
  const rings = useRef([]);
  const lightRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Animate the core's emissive intensity for a pulsing effect
    if (coreRef.current) {
      coreRef.current.material.emissiveIntensity = 1 + Math.sin(t * 3) * 0.5;
    }
    // Animate the rotation of the rings
    if (rings.current) {
        rings.current[0].rotation.y = t * 0.2;
        rings.current[0].rotation.x = t * 0.1;
        rings.current[1].rotation.y = -t * 0.3;
        rings.current[1].rotation.z = t * 0.15;
        rings.current[2].rotation.x = -t * 0.1;
        rings.current[2].rotation.z = t * 0.25;
        rings.current[3].rotation.y = t * 0.15;
        rings.current[3].rotation.z = -t * 0.2;
        rings.current[4].rotation.x = -t * 0.25;
        rings.current[4].rotation.y = t * 0.1;
    }
    // Animate the point light for a subtle flicker
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 + Math.sin(t * 5) * 0.2;
    }
  });

  return (
    <group>
      <pointLight ref={lightRef} color="#00ffff" intensity={1.5} distance={20} />
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={1.5}
          toneMapped={false}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Orbiting Data Rings */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} ref={el => rings.current[i] = el} rotation-x={i % 2 === 0 ? Math.PI / 2 : 0} rotation-z={i * 0.5}>
            <torusGeometry args={[2.5 + i * 0.5, 0.015 + Math.random() * 0.02, 16, 100]} />
            <meshStandardMaterial 
                color={["#7873f5", "#ff6ec4", "#ffffff", "#7873f5", "#ff6ec4"][i]}
                emissive={["#7873f5", "#ff6ec4", "#ffffff", "#7873f5", "#ff6ec4"][i]}
                emissiveIntensity={1} 
                toneMapped={false} 
            />
        </mesh>
      ))}
    </group>
  );
}

/** The main animated scene for the loader */
function Scene() {
    useFrame(({ camera }) => {
        // Gently zoom the camera in for a cinematic effect
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7, 0.015);
    });

    return(
        <>
            <AICore/>
            <DataParticles/>
        </>
    )
}

/**
 * The main loader component that displays the 3D animation and a message.
 * It handles the timing and transition to the main content.
 */
export default function Loader({ onFinish }) {
  const [isClosing, setIsClosing] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Animate loading percentage
    const interval = setInterval(() => {
        setPercentage(prev => {
            if (prev >= 100) {
                clearInterval(interval);
                return 100;
            }
            return prev + 1;
        });
    }, 35);

    const closeTimer = setTimeout(() => setIsClosing(true), 3500);
    const finishTimer = setTimeout(onFinish, 4000);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(finishTimer);
      clearInterval(interval);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            height={400}
            intensity={2}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
      <div className="relative z-10 flex flex-col items-center space-y-2 pointer-events-none">
        <h2 className="text-white text-2xl md:text-4xl font-light tracking-wide animate-pulse">
          INITIATING AI CORE...
        </h2>
        <p className="text-cyan-400 text-sm uppercase tracking-wider tabular-nums">
          ANALYSING CAREER TRAJECTORY... {percentage}%
        </p>
      </div>
    </div>
  );
}