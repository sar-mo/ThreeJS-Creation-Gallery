import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Player from './Player.jsx'
import { Level } from './Level.jsx'
import { Physics } from '@react-three/rapier'

import useGame from './stores/useGame.js'

export default function Experience()
{
    const blocksCount = useGame((state) => { return state.blocksCount })
    const blocksSeed = useGame((state) => { return state.blocksSeed })
    console.log(blocksCount)

    return <>

        <color args={ [ '#bdedfc' ] } attach='background' />

        {/* <OrbitControls makeDefault /> */}

        <Lights />

        <Physics>
            <Level count={ blocksCount } seed={ blocksSeed } />
            <Player />
        </Physics>

    </>
}