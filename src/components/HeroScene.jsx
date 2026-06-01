import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";

function CoreMesh() {
  const meshRef = useRef(null);
  const ringRef = useRef(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.28;
      meshRef.current.rotation.y += delta * 0.34;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.18;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.4;
    }
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.45, 1]} />
          <meshStandardMaterial
            color="#22f3ff"
            wireframe
            transparent
            opacity={0.95}
            emissive="#8b5cf6"
            emissiveIntensity={0.45}
          />
        </mesh>
      </Float>

      <mesh ref={ringRef} scale={1.75}>
        <torusKnotGeometry args={[1, 0.16, 128, 22]} />
        <meshStandardMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.35}
          emissive="#22f3ff"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

function OrbitingParticles() {
  const pointsRef = useRef(null);

  const positions = useMemo(() => {
    const particles = 900;
    const pos = new Float32Array(particles * 3);
    for (let i = 0; i < particles; i += 1) {
      const radius = 2.6 + Math.random() * 2.4;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 1.8;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.1;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#4f7cff"
        size={0.038}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 7], fov: 55 }}>
        <color attach="background" args={["#03060f"]} />
        <ambientLight intensity={0.25} />
        <pointLight position={[4, 3, 4]} intensity={1.1} color="#22f3ff" />
        <pointLight position={[-4, -3, -2]} intensity={1.2} color="#8b5cf6" />
        <Stars radius={90} depth={60} count={2200} factor={4} fade speed={1.4} />
        <OrbitingParticles />
        <CoreMesh />
      </Canvas>
    </div>
  );
}

export default HeroScene;
