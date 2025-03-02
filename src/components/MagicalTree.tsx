import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Sparkles, Effects } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'

type Vector3 = [number, number, number]

interface BranchProps {
  position: Vector3
  rotation: Vector3
  scale?: Vector3
}

interface LeavesProps {
  position: Vector3
  color?: string
}

interface OwlProps {
  position?: Vector3
}

function Branch({ position, rotation, scale = [0.1, 1, 0.1] }: BranchProps) {
  const meshRef = useRef<THREE.Mesh>(null)

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
      scale={scale}
    >
      <cylinderGeometry args={[0.1, 0.08, 1, 8]} />
      <meshStandardMaterial
        color="#1a1a2e"
        roughness={0.4}
        metalness={0.6}
      />
    </mesh>
  )
}

function Leaves({ position, color }: LeavesProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const hue = useRef(Math.random())
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      hue.current += 0.001
      const color = new THREE.Color().setHSL(hue.current % 1, 0.8, 0.5)
      meshRef.current.material.color = color
      meshRef.current.scale.x = 1 + Math.sin(time * 0.5) * 0.1
      meshRef.current.scale.y = 1 + Math.sin(time * 0.5 + 0.5) * 0.1
      meshRef.current.scale.z = 1 + Math.sin(time * 0.5 + 1) * 0.1
    }
  })

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
      <meshPhysicalMaterial
        color={color || "#00ff88"}
        roughness={0.2}
        metalness={0.8}
        transmission={0.5}
        thickness={0.5}
      />
    </mesh>
  )
}

function Owl({ position = [2, 3, 0] }: OwlProps) {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time) * 0.1
      meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.1
    }
  })

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[0.1, 0.1, 0.2]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.1, 0.1, 0.2]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function Tree() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Trunk */}
      <Branch
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[0.2, 2, 0.2]}
      />

      {/* Main branches - more of them! */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const y = 1 + i * 0.3
        return (
          <Branch
            key={i}
            position={[
              Math.cos(angle) * (0.5 + i * 0.1),
              y,
              Math.sin(angle) * (0.5 + i * 0.1)
            ]}
            rotation={[
              Math.PI * 0.2,
              angle,
              0
            ]}
          />
        )
      })}

      {/* More leaves! */}
      {[...Array(50)].map((_, i) => {
        const angle = (i / 50) * Math.PI * 2
        const y = 1 + (i % 8) * 0.5
        const radius = 0.7 + Math.random() * 0.8
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

      {/* More sparkles! */}
      <Sparkles
        count={100}
        scale={[5, 6, 5]}
        size={6}
        speed={0.2}
        color="#00ffff"
      />
      <Sparkles
        count={50}
        scale={[4, 5, 4]}
        size={4}
        speed={0.3}
        color="#ff00ff"
      />

      <Owl />
    </group>
  )
}

export default function MagicalTree() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-black">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        shadows
        className="w-full h-full"
      >
        <color attach="background" args={['#000']} />
        <fog attach="fog" args={['#000', 5, 30]} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
        <spotLight
          position={[0, 10, 0]}
          intensity={4}
          angle={0.6}
          penumbra={1}
          color="#ffffff"
        />
        
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
