import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'

function Branch({ position, rotation, scale = [0.1, 1, 0.1] }) {
  const meshRef = useRef()

  useEffect(() => {
    if (meshRef.current) {
      gsap.from(meshRef.current.scale, {
        y: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
        delay: Math.random()
      })
    }
  }, [])

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
    >
      <cylinderGeometry args={[0.1, 0.08, 1, 8]} />
      <meshStandardMaterial
        color="#4a9c2d"
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  )
}

function Leaves({ position }) {
  const meshRef = useRef()

  useEffect(() => {
    if (meshRef.current) {
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2,
        ease: "elastic.out(1, 0.3)",
        delay: Math.random() + 0.5
      })
    }
  }, [])

  return (
    <mesh
      ref={meshRef}
      position={position}
    >
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial
        color="#68b246"
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  )
}

function Owl({ position = [2, 3, 0] }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.position.y = position[1] + Math.sin(time) * 0.1
    meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.1
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Simple owl shape */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.1, 0.1, 0.2]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh position={[-0.1, 0.1, 0.2]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
    </group>
  )
}

function Tree() {
  const groupRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.05
  })

  return (
    <group ref={groupRef}>
      {/* Trunk */}
      <Branch
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[0.2, 2, 0.2]}
      />

      {/* Main branches */}
      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI * 2
        const y = 1 + i * 0.3
        return (
          <Branch
            key={i}
            position={[
              Math.cos(angle) * 0.5,
              y,
              Math.sin(angle) * 0.5
            ]}
            rotation={[
              Math.PI * 0.2,
              angle,
              0
            ]}
          />
        )
      })}

      {/* Leaves */}
      {[...Array(20)].map((_, i) => {
        const angle = (i / 20) * Math.PI * 2
        const y = 1 + (i % 4) * 0.5
        const radius = 0.7 + Math.random() * 0.3
        return (
          <Leaves
            key={i}
            position={[
              Math.cos(angle) * radius,
              y + Math.random() * 0.5,
              Math.sin(angle) * radius
            ]}
          />
        )
      })}

      {/* Magic sparkles */}
      <Sparkles
        count={50}
        scale={[3, 4, 3]}
        size={4}
        speed={0.4}
        color="#fff"
      />

      {/* Wise owl */}
      <Owl />
    </group>
  )
}

export default function MagicalTree() {
  return (
    <div className="w-full h-[600px]">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Tree />
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minPolarAngle={Math.PI * 0.2}
          maxPolarAngle={Math.PI * 0.8}
        />
      </Canvas>
    </div>
  )
}
