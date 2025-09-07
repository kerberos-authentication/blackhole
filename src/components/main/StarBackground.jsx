// src/components/main/StarsCanvas.jsx
import { useRef, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { Suspense } from "react";
import StaticStarsSVG from '../sub/StaticStarsSVG';

// 🔁 Efficient, static, pseudo-random point generator
const memoizedPoints = (() => {
  const points = new Float32Array(5001); // 3 coords x ~1667 points
  for (let i = 0; i < points.length; i++) {
    const x = Math.sin(i + 42) * 10000;
    points[i] = (x - Math.floor(x)) * 2 - 1; // normalized between -1 and 1
  }
  return points;
})();

// 🌌 Pure WebGL Starfield Component
const StarBackground = () => {
  const ref = useRef();

  useLayoutEffect(() => {
    const animate = () => {
      const obj = ref.current;
      if (obj) {
        obj.rotation.x -= 0.001;
        obj.rotation.y -= 0.0015;
        requestAnimationFrame(animate);
      }
    };
    requestIdleCallback(() => requestAnimationFrame(animate));
  }, []);

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={memoizedPoints}
        stride={3}
        frustumCulled
      >
        <PointMaterial
          transparent
          color="#AFF"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// 🎨 Canvas Wrapper (client-only)
const StarsCanvas = () => {
  if (typeof window === "undefined")  {
    // Server-side: return fallback SVG
    return (    <div className="w-full h-auto fixed inset-0 z-[19] pointer-events-none">
      <StaticStarsSVG />
    </div>    );                      }

// Client-side: render WebGL canvas
  return (
    <div className="w-full h-auto fixed inset-0 z-[19] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarsCanvas;



  //Server-side SVG Heavy calculation
      {/* <div className="w-full h-auto fixed inset-0 z-[20] pointer-events-none">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[...Array(100)].map((_, i) => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const r = Math.random() * 0.3 + 0.2;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={r}
                fill="#aaf"
                opacity="0.8"
              />
            );
          })}
        </svg>
      </div> */}
      ////////////////////////////

//End
/*
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { Suspense } from "react";

function pseudoRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// 🟦 Generate a deterministic set of points

function generatePoints(seed = 42) {
  const points = new Float32Array(5001);
  for (let i = 0; i < points.length; i++) {
    points[i] = pseudoRandom(i + seed) * 2 - 1; // between -1 and 1
  }
  return points;
}

const spherePoints = generatePoints(); // SSR-safe static generation

const StarBackground = (props) => {
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={spherePoints}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#Aff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 z-[20] pointer-events-none">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);

export default StarsCanvas;

*/
