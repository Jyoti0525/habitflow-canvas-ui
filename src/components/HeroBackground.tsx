
import { Canvas } from '@react-three/fiber';
import { Stars, Cloud } from '@react-three/drei';
import { Suspense } from 'react';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <Suspense fallback={null}>
          <Stars radius={50} depth={50} count={1000} factor={4} fade speed={1} />
          <Cloud
            opacity={0.5}
            speed={0.4}
            width={10}
            depth={1.5}
            segments={20}
          />
          <ambientLight intensity={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroBackground;
