import Phaser from "phaser"
import { Arena } from "./Types"

export default class Block {
    scene: Phaser.Scene
    arena: Arena
    destroyablesWalls: Object

    constructor(scene: Phaser.Scene, arena: Arena){
        this.scene = scene
        this.arena = arena
        this.destroyablesWalls = this.scene.physics.add.staticGroup()
    }

    brick01(row: number, col: number){
        // |# #|
        // |   |
        // |# #|
        let xcoord = col*this.arena.colSize
        let ycoord = row*this.arena.rowSize
        this.destroyablesWalls.create(
            xcoord,
            ycoord
            // ,
            // this.arena.rowSize,
            // this.arena.colSize,
            // 0Xff0000
        ).setOrigin(0,0)
    }

    test(obj: any){
        console.log(obj)
    }
}