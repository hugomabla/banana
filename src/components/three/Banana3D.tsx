'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Banana geometry generator
function createBananaGeometry() {
  const geometry = new THREE.BufferGeometry()
  const positions = []
  const normals = []
  const uvs = []
  const indices = []

  const segments = 32
  const radialSegments = 16
  const length = 3
  const maxRadius = 0.6

  for (let i = 0; i <= segments; i++) {
    const v = i / segments
    const z = (v - 0.5) * length
    
    // Banana curve - curved along Z axis
    const curveX = Math.sin(v * Math.PI) * 0.3
    const curveY = Math.sin(v * Math.PI) * 0.15
    
    // Radius varies along length
    const radius = maxRadius * Math.sin(v * Math.PI) * (0.8 + 0.4 * Math.sin(v * Math.PI * 2))

    for (let j = 0; j <= radialSegments; j++) {
      const u = j / radialSegments
      const angle = u * Math.PI * 2
      
      const x = curveX + Math.cos(angle) * radius
      const y = curveY + Math.sin(angle) * radius
      
      positions.push(x, y, z)
      uvs.push(u, v)
      
      // Normal
      const nx = Math.cos(angle)
      const ny = Math.sin(angle)
      const nz = 0
      normals.push(nx, ny, nz)
    }
  }

  // Generate indices
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * (radialSegments + 1) + j
      const b = a + 1
      const c = (i + 1) * (radialSegments + 1) + j
      const d = c + 1
      indices.push(a, b, d)
      indices.push(d, c, a)
    }
  }

  geometry.setIndex(indices)
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geometry.computeVertexNormals()

  return geometry
}

// Banana mesh component
interface BananaMeshProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  animated?: boolean
  scrollProgress?: number
}

function BananaMesh({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = 1,
  animated = false,
  scrollProgress = 0,
}: BananaMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [geometry] = useState(() => createBananaGeometry())

  // Materials
  const bananaMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xFFE666,
    roughness: 0.4,
    metalness: 0.0,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2,
    sheen: 0.5,
    sheenColor: 0xF0C078,
  })

  const stemMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x8B6914,
    roughness: 0.8,
    metalness: 0.0,
  })

  // Animation
  useFrame((state, delta) => {
    if (!meshRef.current || !animated) return
    
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.y = time * 0.15
    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1
    meshRef.current.position.y = Math.sin(time * 1.2) * 0.15
  })

  // Scroll-based animation
  useEffect(() => {
    if (!animated || !meshRef.current) return
    meshRef.current.rotation.z = scrollProgress * Math.PI * 0.5
    meshRef.current.scale.setScalar(1 + scrollProgress * 0.2)
  }, [scrollProgress, animated])

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <mesh geometry={geometry} material={bananaMaterial} castShadow receiveShadow />
      {/* Stem */}
      <mesh
        position={[0.2, 0.1, -1.4]}
        rotation={[-Math.PI / 6, 0, 0]}
        scale={[0.15, 0.5, 0.15]}
      >
        <cylinderGeometry args={[1, 1, 1, 8]} />
        <meshPhysicalMaterial attach="material" color={0x8B6914} roughness={0.8} />
      </mesh>
      {/* Tip */}
      <mesh
        position={[-0.1, 0, 1.4]}
        scale={[0.3, 0.3, 0.4]}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshPhysicalMaterial attach="material" color={0xFFE666} roughness={0.4} metalness={0.0} clearcoat={0.3} clearcoatRoughness={0.2} sheen={0.5} sheenColor={0xF0C078} />
      </mesh>
    </group>
  )
}

// Hero 3D Banana Scene
export function Hero3DBanana({ className, scrollY = 0 }: { className?: string; scrollY?: number }) {
  const progress = Math.min(scrollY / 1000, 1)

  return (
    <div className={cn('relative w-full h-full min-h-[600px]', className)}>
      <Canvas
        camera={{ position: [0, 0.5, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <color attach="background" args={[0x0A0A0A]} />
        <fog attach="fog" args={[0x0A0A0A, 2, 10]} />

        <Environment
          preset="studio"
          background={false}
        />

        <directionalLight position={[5, 10, 7]} intensity={3} castShadow>
          <orthographicCamera attach="light.shadow.camera" args={[-5, 5, 5, -5, 0.1, 50]} />
        </directionalLight>
        <directionalLight position={[-5, 5, -5]} intensity={1.5} />
        <pointLight position={[0, 3, 3]} color={0xFFE666} intensity={2} distance={10} decay={2} />
        <pointLight position={[0, -2, -3]} color={0xF0C078} intensity={1} distance={10} decay={2} />

        <BananaMesh 
          animated 
          scrollProgress={progress}
          position={[0, 0, 0]}
          rotation={[-0.1, 0.3, 0.2]}
          scale={1.5}
        />

        <Float
          rotationIntensity={0.5}
          floatIntensity={1.5}
          speed={1.5}
        >
          <BananaMesh 
            animated 
            position={[-2.5, -0.5, -1]}
            rotation={[0.2, -0.5, -0.3]}
            scale={0.7}
          />
        </Float>

        <Float
          rotationIntensity={0.5}
          floatIntensity={1.2}
          speed={1.2}
        >
          <BananaMesh 
            animated 
            position={[2.5, 0.5, -1.5]}
            rotation={[-0.2, 0.5, 0.3]}
            scale={0.6}
          />
        </Float>

        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.3}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  )
}

// Interactive 3D Card
interface Interactive3DCardProps {
  children: React.ReactNode
  className?: string
  [key: string]: any
}

export function Interactive3DCard({ 
  children, 
  className,
  ...props 
}: Interactive3DCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      setCoords({ x, y })
    }

    const handleLeave = () => {
      setCoords({ x: 0, y: 0 })
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  const transformStyle = {
    transform: "perspective(1000px) rotateY(" + (coords.x * 15) + "deg) rotateX(" + (-coords.y * 15) + "deg)",
    transformStyle: 'preserve-3d' as const,
    transition: 'transform 0.3s ease-out',
  }

  return (
    <div
      ref={ref}
      className={cn('relative group cursor-pointer', className)}
      style={transformStyle}
      {...props}
    >
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-br from-banana-500/10 via-transparent to-cream-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        style={{ transform: 'translateZ(-1px)' }}
      />
    </div>
  )
}

// Full 3D Scene for feature sections
export function Banana3DScene({ className }: { className?: string }) {
  return (
    <div className={cn('relative w-full h-[400px] lg:h-[500px]', className)}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <color attach="background" args={[0x0A0A0A]} />

        <Environment preset="city" background={false} />

        <directionalLight position={[5, 10, 5]} intensity={2} />
        <directionalLight position={[-5, 5, -5]} intensity={1} />
        <pointLight position={[0, 3, 3]} color={0xFFE666} intensity={1.5} distance={10} decay={2} />

        <BananaMesh animated position={[-1.5, 0, 0]} scale={1.2} />
        <BananaMesh animated position={[1.5, 0, 0]} rotation={[0, Math.PI, 0]} scale={1.2} />
        <BananaMesh animated position={[0, 1.5, -1]} rotation={[Math.PI / 2, 0, 0]} scale={0.8} />
        <BananaMesh animated position={[0, -1.5, -1]} rotation={[-Math.PI / 2, 0, 0]} scale={0.8} />

        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          autoRotate 
          autoRotateSpeed={0.2}
          enableDamping
          minZoom={0.5}
          maxZoom={3}
        />
      </Canvas>
    </div>
  )
}
