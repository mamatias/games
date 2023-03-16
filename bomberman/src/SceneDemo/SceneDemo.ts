import { Scene } from 'phaser'
import Player from './Player'
import Gamepad from './Gamepad'
import World from './World'
import { Arena } from './Types'

export default class SceneDemo extends Scene {
    mainCharacter!: Player
    gamepad!: Gamepad
    world!: World
    arena: Arena = {
        nRow: 10,
        nCol: 10,
        rowSize: 80,
        colSize: 80
    }

    constructor(){
        super('bomberman')
    }
    
    preload(): void{
        this.load.spritesheet('player',
            'public/images/mc_base.png',
            { frameWidth: 32, frameHeight: 48 }
        )

    }

    create(): void{
        this.gamepad = new Gamepad(this)
        this.world = new World(this, this.arena)

        this.mainCharacter = new Player(
            this,
            {x:40, y:40},
            'player',
            this.arena,
            this.gamepad
        )
        this.mainCharacter.Animate()

        this.physics.add.collider(this.mainCharacter.player, this.world.block.destroyablesWalls)

    }

    update(/* time: number, delta: number */): void {
        this.mainCharacter.UpdateMovement()
    }
}