import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Line } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const mint = "#b8edcf";
const lilac = "#c4b7f2";
const copper = "#edb995";

function Plate({
  position,
  size = [1, 0.18, 1],
  color = "#25333b",
  glow = false,
}) {
  return (
    <RoundedBox args={size} radius={0.045} smoothness={2} position={position}>
      <meshStandardMaterial
        color={color}
        metalness={0.45}
        roughness={0.36}
        emissive={glow ? color : "#000000"}
        emissiveIntensity={glow ? 0.13 : 0}
      />
    </RoundedBox>
  );
}

function Packets({ compact }) {
  const ref = useRef();
  const count = compact ? 9 : 18;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(({ clock }) => {
    for (let i = 0; i < count; i++) {
      const t = (clock.elapsedTime * 0.14 + i / count) % 1;
      const branch = i % 3;
      const a = (branch * Math.PI * 2) / 3;
      dummy.position.set(Math.sin(a) * t * 2.3, 0.16, Math.cos(a) * t * 2.3);
      dummy.scale.setScalar(0.026 + 0.013 * Math.sin(t * Math.PI));
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[null, null, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={mint} />
    </instancedMesh>
  );
}

function System({ exploded, selected, compact, pointer, progress }) {
  const root = useRef();
  const layers = useRef([]);
  const backend = useRef();
  const network = useRef();
  const edge = useRef();
  const lattice = useRef();
  const nodes = useMemo(
    () =>
      Array.from({ length: compact ? 8 : 12 }, (_, i) => {
        const a = (i * Math.PI * 2) / (compact ? 8 : 12);
        return [
          Math.cos(a) * 0.48,
          0.7 + Math.sin(a * 2) * 0.3,
          Math.sin(a) * 0.48,
        ];
      }),
    [compact],
  );
  useFrame(({ clock }, dt) => {
    const delta = Math.min(dt, 0.05);
    const spread = (exploded ? 1 : 0) + progress.current * 0.35;
    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      -0.15 + pointer.current.x * 0.13 + progress.current * 0.16,
      4,
      delta,
    );
    root.current.rotation.x = THREE.MathUtils.damp(
      root.current.rotation.x,
      pointer.current.y * 0.035,
      4,
      delta,
    );
    layers.current.forEach((layer, i) => {
      if (layer)
        layer.position.y = THREE.MathUtils.damp(
          layer.position.y,
          0.3 + i * 0.34 + spread * i * 0.3,
          4,
          delta,
        );
    });
    backend.current.position.x = THREE.MathUtils.damp(
      backend.current.position.x,
      -1.72 - spread * 0.38,
      4,
      delta,
    );
    network.current.position.z = THREE.MathUtils.damp(
      network.current.position.z,
      -1.68 - spread * 0.38,
      4,
      delta,
    );
    edge.current.position.x = THREE.MathUtils.damp(
      edge.current.position.x,
      1.72 + spread * 0.38,
      4,
      delta,
    );
    lattice.current.rotation.y = clock.elapsedTime * 0.17;
    [backend, network, edge].forEach((ref, i) => {
      const active = selected === ["backend", "intelligence", "edge"][i];
      ref.current.position.y = THREE.MathUtils.damp(
        ref.current.position.y,
        active ? 0.18 : 0,
        5,
        delta,
      );
    });
  });
  return (
    <group ref={root} position={[0, -0.55, 0]}>
      <Plate position={[0, -0.12, 0]} size={[5.5, 0.18, 4.7]} color="#17232b" />
      <Plate
        position={[0, -0.25, 0]}
        size={[5.25, 0.1, 4.45]}
        color="#0e171e"
      />
      {!compact && (
        <gridHelper
          args={[5, 16, "#34534e", "#273b3e"]}
          position={[0, -0.015, 0]}
        />
      )}
      {[-1, 1].flatMap((x) =>
        [-1, 1].map((z) => (
          <Plate
            key={`${x}${z}`}
            position={[x * 2.48, 0.025, z * 2.08]}
            size={[0.14, 0.07, 0.14]}
            color={mint}
            glow
          />
        )),
      )}
      <Line
        points={[
          [-1.7, 0.02, 0.9],
          [-0.8, 0.02, 0.9],
          [-0.8, 0.02, 0],
          [0, 0.02, 0],
          [0, 0.02, -1.7],
        ]}
        color={lilac}
        lineWidth={1.2}
      />
      <Line
        points={[
          [0, 0.02, 0],
          [0.8, 0.02, 0],
          [0.8, 0.02, 0.95],
          [1.8, 0.02, 0.95],
        ]}
        color={copper}
        lineWidth={1.2}
      />
      {[0, 1, 2, 3].map((i) => (
        <group
          key={i}
          ref={(el) => {
            layers.current[i] = el;
          }}
          position={[0, 0.3 + i * 0.34, 0]}
        >
          <Plate
            size={[1.38, 0.16, 1.38]}
            color={i === 3 ? mint : "#386052"}
            glow={i === 3}
          />
          {i !== 3 && (
            <Plate
              position={[0, 0.105, 0.56]}
              size={[0.94, 0.035, 0.025]}
              color={mint}
              glow
            />
          )}
          {i === 3 && (
            <mesh position={[0, 0.087, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.67, 0.67]} />
              <meshStandardMaterial color="#1b392e" />
            </mesh>
          )}
        </group>
      ))}
      <group ref={backend} position={[-1.72, 0, 0.8]}>
        <Plate position={[0, 0.08, 0]} size={[1.13, 0.12, 1.15]} />
        {[0, 1, 2, 3].map((i) => (
          <group key={i} position={[0, 0.28 + i * 0.25, 0]}>
            <Plate size={[0.88, 0.18, 0.78]} color={lilac} />
            <Plate
              position={[0.23, 0, 0.401]}
              size={[0.23, 0.034, 0.015]}
              color="#f1eeff"
              glow
            />
            <Plate
              position={[-0.26, 0, 0.402]}
              size={[0.035, 0.045, 0.015]}
              color={mint}
              glow
            />
          </group>
        ))}
      </group>
      <group ref={network} position={[0, 0, -1.68]}>
        <Plate position={[0, 0.08, 0]} size={[1.18, 0.12, 1.12]} />
        <group ref={lattice}>
          {nodes.map((point, i) => (
            <group key={i}>
              <mesh position={point}>
                <sphereGeometry args={[0.065, 10, 10]} />
                <meshStandardMaterial
                  color={lilac}
                  emissive={lilac}
                  emissiveIntensity={0.3}
                />
              </mesh>
              <Line
                points={[point, nodes[(i + 3) % nodes.length]]}
                color={lilac}
                transparent
                opacity={0.5}
                lineWidth={1}
              />
            </group>
          ))}
        </group>
      </group>
      <group ref={edge} position={[1.72, 0, 0.85]}>
        <Plate position={[0, 0.08, 0]} size={[1.08, 0.12, 1.12]} />
        <Plate
          position={[0, 0.47, 0]}
          size={[0.6, 0.65, 0.62]}
          color={copper}
        />
        <mesh position={[0, 0.5, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.07, 24]} />
          <meshStandardMaterial
            color="#172a31"
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0.91, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.23, 0.245, 32]} />
          <meshBasicMaterial color={copper} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <Packets compact={compact} />
    </group>
  );
}

export default function HeroScene({
  active,
  exploded,
  selected,
  pointer,
  progress,
  onReady,
  onFailure,
}) {
  const [compact] = useState(
    () =>
      window.matchMedia("(max-width: 700px)").matches ||
      navigator.hardwareConcurrency <= 4,
  );
  const cleanup = useRef();
  useEffect(() => () => cleanup.current?.(), []);
  return (
    <Canvas
      className="studio-canvas"
      orthographic
      camera={{ position: [7.4, 6.6, 8.5], zoom: compact ? 51 : 65 }}
      dpr={[1, compact ? 1 : 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: !compact, alpha: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        const lost = (event) => {
          event.preventDefault();
          onFailure();
        };
        gl.domElement.addEventListener("webglcontextlost", lost);
        cleanup.current = () =>
          gl.domElement.removeEventListener("webglcontextlost", lost);
        onReady();
      }}
    >
      <ambientLight intensity={1.35} />
      <directionalLight position={[4, 8, 4]} intensity={3.5} color="#e6fff1" />
      <directionalLight position={[-5, 3, -2]} intensity={2} color="#b0abeb" />
      <System
        exploded={exploded}
        selected={selected}
        compact={compact}
        pointer={pointer}
        progress={progress}
      />
    </Canvas>
  );
}
