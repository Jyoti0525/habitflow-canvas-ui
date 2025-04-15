
import { Canvas } from '@react-three/fiber';
import { Stars, Cloud, Float } from '@react-three/drei';
import { Suspense } from 'react';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 to-gray-800">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <Stars 
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            fade
            speed={1}
          />
          <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            <Cloud
              opacity={0.5}
              speed={0.4}
              segments={20}
              depth={1.5}
            />
          </Float>
          <Float speed={2} rotationIntensity={2} floatIntensity={1}>
            <Cloud
              opacity={0.3}
              speed={0.3}
              segments={15}
              depth={2}
              position={[-4, 2, 0]}
            />
          </Float>
          <ambientLight intensity={0.3} />
          <directionalLight position={[0, 10, 5]} intensity={1} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroBackground;
