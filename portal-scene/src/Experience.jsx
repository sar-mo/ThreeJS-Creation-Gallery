import { shaderMaterial, Sparkles, useGLTF, useTexture, Center, OrbitControls } from '@react-three/drei'

import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('white'),
        uColorEnd: new THREE.Color('black')
    },
    portalVertexShader,
    portalFragmentShader
)

extend({ PortalMaterial })

export default function Experience()
{
    const portalMaterial = useRef()
    const { nodes } = useGLTF('./model/portal.glb')
    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false

    useFrame((state, delta ) => {
        portalMaterial.current.uTime += delta
    })

    console.log(nodes)

    return <>

        {/* <primitive object={ model.scene s} /> */}

        <color args={ [ '#030202' ] } attach='background'/>
        <OrbitControls makeDefault />

        <Center>
            <mesh geometry={ nodes.baked.geometry }>
                <meshBasicMaterial map={ bakedTexture } />
            </mesh>

            <mesh
                geometry={ nodes.poleLightA.geometry }
                position={nodes.poleLightA.position }
            >
                <meshBasicMaterial color='#ffffe5' />
            </mesh>

            <mesh
                geometry={ nodes.poleLightB.geometry }
                position={nodes.poleLightB.position }
            >
                <meshBasicMaterial color='#ffffe5' />
            </mesh>

            <mesh
                geometry={ nodes.portalLight.geometry }
                position={nodes.portalLight.position }
                rotation={nodes.portalLight.rotation }
            >
                <portalMaterial ref={ portalMaterial }/>
            </mesh>

            <Sparkles
                size={ 6 }
                scale={ [ 4, 2, 4 ] }
                position-y={ 1 }
                speed={ 0.2 }
                count={ 40 }
            />

        </Center>

    </>
}