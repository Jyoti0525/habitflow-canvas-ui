
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Suspense } from 'react';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <Stars
            radius={100}
            depth={50}
            count={2000}
            factor={4}
            fade
            speed={0.5}
          />
          <ambientLight intensity={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroBackground;
