// "use client";

// import React, { useMemo, useRef, useState, useEffect } from "react";
// import * as THREE from "three";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Stars } from "@react-three/drei";
// import { EffectComposer, Bloom, DepthOfField, ChromaticAberration, Vignette } from "@react-three/postprocessing";

// // ===== Double Helix Points =====
// function useHelixPoints(turns = 6, segments = 300, amplitude = 0.45, phase = 0) {
//   return useMemo(() => {
//     const pts: THREE.Vector3[] = [];
//     for (let i = 0; i <= segments; i++) {
//       const t = (i / segments) * turns * Math.PI * 2;
//       const x = Math.sin(t + phase) * amplitude;
//       const y = (i / segments - 0.5) * 6; // vertical stretch
//       const z = Math.cos(t + phase) * amplitude;
//       pts.push(new THREE.Vector3(x, y, z));
//     }
//     return pts;
//   }, [turns, segments, amplitude, phase]);
// }

// // ===== DNA Strand Component =====
// function DNAHelix({ color, phase }: { color: string; phase: number }) {
//   const points = useHelixPoints(9, 500, 0.45, phase);
//   const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
//   return (
//     <mesh>
//       <tubeGeometry args={[curve, 1500, 0.035, 16, false]} />
//       <meshStandardMaterial
//         color={color}
//         emissive={color}
//         emissiveIntensity={1.5}
//         roughness={0.2}
//         metalness={0.3}
//         transparent
//         opacity={0.95}
//       />
//     </mesh>
//   );
// }

// // ===== Connecting Rungs =====
// function DNARungs() {
//   const left = useHelixPoints(9, 500, 0.45, 0);
//   const right = useHelixPoints(9, 500, 0.45, Math.PI);

//   const bars = useMemo(() => {
//     const arr: any[] = [];
//     for (let i = 0; i < left.length; i += 14) {
//       const a = left[i];
//       const b = right[i];
//       const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
//       const dir = new THREE.Vector3().subVectors(b, a);
//       const quat = new THREE.Quaternion().setFromUnitVectors(
//         new THREE.Vector3(1, 0, 0),
//         dir.clone().normalize()
//       );
//       arr.push({ mid, len: dir.length(), quat });
//     }
//     return arr;
//   }, [left, right]);

//   return (
//     <>
//       {bars.map((bar, i) => (
//         <mesh key={i} position={bar.mid} quaternion={bar.quat}>
//           <cylinderGeometry args={[0.02, 0.02, bar.len, 8]} />
//           <meshStandardMaterial
//             color={i % 2 === 0 ? "#ffae85" : "#6adfff"}
//             emissive={i % 2 === 0 ? "#ffae85" : "#6adfff"}
//             emissiveIntensity={1.2}
//             roughness={0.2}
//           />
//         </mesh>
//       ))}
//     </>
//   );
// }

// // ===== Floating Particles =====
// function FloatingParticles({ count = 120 }) {
//   const mesh = useRef<THREE.InstancedMesh>(null!);
//   const dummy = useMemo(() => new THREE.Object3D(), []);
//   const positions = useMemo(() => {
//     const arr = [];
//     for (let i = 0; i < count; i++) {
//       arr.push([
//         (Math.random() - 0.5) * 6,
//         (Math.random() - 0.5) * 6,
//         (Math.random() - 0.5) * 6,
//       ]);
//     }
//     return arr;
//   }, [count]);

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     positions.forEach((pos, i) => {
//       dummy.position.set(
//         pos[0] + Math.sin(t * 0.5 + i) * 0.1,
//         pos[1] + Math.cos(t * 0.3 + i) * 0.1,
//         pos[2] + Math.sin(t * 0.4 + i) * 0.1
//       );
//       dummy.updateMatrix();
//       mesh.current.setMatrixAt(i, dummy.matrix);
//     });
//     mesh.current.instanceMatrix.needsUpdate = true;
//   });

//   return (
//     <instancedMesh ref={mesh} args={[null, null, count]}>
//       <sphereGeometry args={[0.015, 8, 8]} />
//       <meshBasicMaterial color="#7dc9ff" transparent opacity={0.7} />
//     </instancedMesh>
//   );
// }

// // ===== Scanning Rings =====
// function ScanningRing() {
//   const ref = useRef<THREE.Mesh>(null!);
//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     ref.current.position.y = Math.sin(t * 0.6) * 3;
//   });
//   return (
//     <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
//       <torusGeometry args={[0.9, 0.01, 16, 100]} />
//       <meshBasicMaterial color="#ffae85" emissive="#ffae85" />
//     </mesh>
//   );
// }

// // ===== Main Loader =====
// export default function AdvancedDNALoader() {
//   const [mountedAt] = useState(() => performance.now());
//   const [canHide, setCanHide] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setCanHide(true), 4000); // keep it visible longer
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050b13]">
//       <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
//         <ambientLight intensity={0.3} />
//         <pointLight position={[5, 5, 5]} intensity={1.2} color="#7dc9ff" />
//         <pointLight position={[-5, -5, -5]} intensity={1} color="#ffae85" />

//         <group rotation={[0, 0, 0]}>
//           <DNAHelix color="#6adfff" phase={0} />
//           <DNAHelix color="#ffae85" phase={Math.PI} />
//           <DNARungs />
//           <ScanningRing />
//         </group>

//         <FloatingParticles />
//         <Stars radius={10} depth={30} count={500} factor={2} fade />

//         <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />

//         <EffectComposer>
//           <Bloom intensity={1.2} luminanceThreshold={0.1} luminanceSmoothing={0.9} />
//           <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={1.5} />
//           <ChromaticAberration offset={[0.0005, 0.001]} />
//           <Vignette eskil={false} offset={0.4} darkness={0.8} />
//         </EffectComposer>
//       </Canvas>
//     </div>
//   );
// }
