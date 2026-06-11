'use client'

import { useRef, useLayoutEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Float, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function AbstractGeometry() {
  const groupRef = useRef<THREE.Group>(null)
  const cityRef = useRef<THREE.Group>(null)

  // Color Palette Constants
  const TOWER_NAVY = "#072ac8"          // Persian Blue
  const ACCENT_RED = "#fcf300"          // Bright Lemon

  // 1. Load the CN Tower OBJ model and texture from the public directory
  const obj = useLoader(OBJLoader, '/model.obj')
  const texture = useTexture('/diffuse_0.png')
  
  // Set texture mapping properties correctly for standard OBJ mapping
  texture.colorSpace = THREE.SRGBColorSpace
  texture.flipY = false // OBJ diffuse maps exported from DCC software usually require flipY = false
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping

  // 2. Programmatically center, scale, and traverse the CAD model on load
  useLayoutEffect(() => {
    if (!obj || !texture) return

    // Reset scale and position to ensure bounding box calculation is idempotent across re-renders
    obj.scale.set(1, 1, 1)
    obj.position.set(0, 0, 0)

    // Calculate bounding box of the entire CAD model
    const box = new THREE.Box3().setFromObject(obj)
    const center = new THREE.Vector3()
    box.getCenter(center)
    const size = new THREE.Vector3()
    box.getSize(size)

    // Center the model's coordinates at [0, 0, 0] inside our pivot group
    obj.position.x = -center.x
    obj.position.y = -center.y
    obj.position.z = -center.z

    // Increase the target dimension to make it absolutely massive,
    // filling the screen exactly like the reference image.
    const maxDim = Math.max(size.x, size.y, size.z)
    if (maxDim > 0) {
      const scaleFactor = 120.0 / maxDim // Scaled up massively to match reference thickness
      obj.scale.set(scaleFactor, scaleFactor, scaleFactor)
    }

    // Traverse and replace materials with the textured material
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Dispose of default loaded textures/materials to free up GPU memory
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose())
          } else {
            child.material.dispose()
          }
        }

        // Apply custom textured material
        child.material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.8,
          metalness: 0.1,
          emissive: new THREE.Color(0x333333), // Brighten shadows slightly without washing out textures
          envMapIntensity: 1.0
        })
        child.material.needsUpdate = true
      }
    })
  }, [obj, texture])

  // 3. GSAP ScrollTrigger to tilt and pan the city landscape as you navigate
  useGSAP(() => {
    if (!groupRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrubbing
      }
    })

    // Create a slow vertical parallax effect on scroll instead of tilting (relative movement is robust to position tweaks)
    tl.to(groupRef.current.position, {
      y: '-=6', // Move down by 6 units as we scroll
      ease: 'none'
    }, 0)
  }, [])

  return (
    // Positioned down and back on Y/Z to center the upper pod behind the text while maintaining safety gates for clipping.
    // Tilt the model back on the X-axis by -0.55 radians to achieve the dramatic looking-up worm's-eye perspective.
    <group ref={groupRef} position={[0, -10, -12]} rotation={[-0.55, 0, 0]}>
      {/* Extremely subtle breathing animation, no intense rotation */}
      <Float speed={1} rotationIntensity={0.02} floatIntensity={0.05}>
        <group ref={cityRef}>
          {/* Render the centered, auto-scaled CN Tower OBJ model */}
          {obj && <primitive object={obj} />}
        </group>
      </Float>
    </group>
  )
}
