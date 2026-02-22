"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

export interface Avatar3DViewerProps {
  glbUrl: string;
  /** Map of outfit category → hex color to tint avatar clothing meshes */
  outfitColors?: Record<string, string>;
  className?: string;
}

/**
 * Maps our outfit categories to ReadyPlayerMe mesh name patterns.
 * RPM avatars use names like Wolf3D_Outfit_Top, Wolf3D_Outfit_Bottom, etc.
 * We also match generic mesh names for non-RPM models.
 */
const CATEGORY_MESH_PATTERNS: Record<string, string[]> = {
  tops:       ["outfit_top", "shirt", "top", "tshirt", "blouse"],
  bottoms:    ["outfit_bottom", "pants", "bottom", "jeans", "skirt"],
  outerwear:  ["outfit_top", "jacket", "coat", "hoodie", "outer"],
  shoes:      ["outfit_footwear", "footwear", "shoe", "boot", "sneaker"],
  accessories:["headwear", "hat", "beanie", "glasses", "accessory"],
};

/**
 * Three.js canvas that loads and renders a ReadyPlayerMe GLB avatar.
 * Includes orbit controls, studio lighting, and contact shadows.
 */
export default function Avatar3DViewer({
  glbUrl,
  outfitColors = {},
  className = "",
}: Avatar3DViewerProps) {
  return (
    <div className={`w-full rounded-2xl overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200 ${className}`}>
      <Canvas
        camera={{ position: [0, 0.8, 2.2], fov: 35 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        style={{ height: "100%" }}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <AvatarModel url={glbUrl} outfitColors={outfitColors} />
        </Suspense>

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 4]} intensity={1} castShadow />
        <directionalLight position={[-2, 3, -2]} intensity={0.3} />

        {/* Environment for realistic reflections */}
        <Environment preset="studio" />

        {/* Ground shadow */}
        <ContactShadows
          position={[0, -0.82, 0]}
          opacity={0.4}
          scale={3}
          blur={2}
          far={1}
        />

        {/* Controls */}
        <OrbitControls
          target={[0, 0.8, 0]}
          minDistance={1.2}
          maxDistance={4}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.8}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}

/**
 * Loads the GLB model, positions it at the origin, and applies outfit colors.
 * ReadyPlayerMe avatars are typically ~1.7m tall, centered at feet.
 */
function AvatarModel({
  url,
  outfitColors,
}: {
  url: string;
  outfitColors: Record<string, string>;
}) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  // Position and scale the model
  useEffect(() => {
    if (!groupRef.current) return;

    const box = new THREE.Box3().setFromObject(groupRef.current);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    groupRef.current.position.y = -box.min.y;
    groupRef.current.position.x = -center.x;
    groupRef.current.position.z = -center.z;

    const targetHeight = 1.6;
    const scale = targetHeight / size.y;
    groupRef.current.scale.setScalar(scale);
    groupRef.current.position.y = -box.min.y * scale;
  }, [scene]);

  // Apply outfit colors to matching meshes
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const meshName = child.name.toLowerCase();

      for (const [category, patterns] of Object.entries(CATEGORY_MESH_PATTERNS)) {
        const color = outfitColors[category];
        if (!color) continue;

        const matches = patterns.some((p) => meshName.includes(p));
        if (!matches) continue;

        // Clone material to avoid mutating shared instances
        if (Array.isArray(child.material)) {
          child.material = child.material.map((m) => {
            const cloned = m.clone();
            if (cloned instanceof THREE.MeshStandardMaterial) {
              cloned.color.set(color);
            }
            return cloned;
          });
        } else {
          child.material = child.material.clone();
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.color.set(color);
          }
        }
        break;
      }
    });
  }, [scene, outfitColors]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

/**
 * Simple loading spinner shown while the GLB is downloading.
 */
function LoadingIndicator() {
  return (
    <mesh position={[0, 0.8, 0]}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color="#999" wireframe />
    </mesh>
  );
}
