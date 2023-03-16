import Phaser from "phaser"
import { Arena } from "./Types"
import sceneMap from "./SceneDemo_map.json"
import Block from "./Block"

export default class World{
    arena: Arena
    scene: Phaser.Scene
    block: Block
    constructor(scene: Phaser.Scene, arena: Arena){
        this.arena = arena
        this.scene = scene

        this.debugGrid()

        this.block = new Block(scene, arena)

        sceneMap.map(
            (value) => {
                this.block.brick01(value.row, value.col)
            }
        )
        
    }

    debugGrid(){
        // Debug grid
        for(let row=0; row < this.arena.nRow; row++){
            for(let col=0; col < this.arena.nCol; col++){
                this.scene.add.rectangle(
                    col*this.arena.colSize+this.arena.colSize/2,
                    row*this.arena.rowSize+this.arena.rowSize/2,
                    this.arena.colSize,
                    this.arena.rowSize,
                    123123123
                )
                this.scene.add.rectangle(
                    col*this.arena.colSize+this.arena.colSize/2,
                    row*this.arena.rowSize+this.arena.rowSize/2,
                    this.arena.colSize-2,
                    this.arena.rowSize-2,
                    0
                )
                this.scene.add.circle(
                    col*this.arena.colSize+this.arena.colSize/2,
                    row*this.arena.rowSize+this.arena.rowSize/2,
                    15,
                    100
                )
                this.scene.add.text(
                    col*this.arena.colSize+this.arena.colSize/2,
                    row*this.arena.rowSize+this.arena.rowSize/2,
                    ""+((col+1)+this.arena.nRow*row),
                    // {
                    //     // fontFamily: 'Georgia,"Goudy Bookletter 1911",Times, serif',
                    //     align: 'center'
                    // }
                ).setOrigin(0.5)
                this.scene.add.text(
                    col*this.arena.colSize+this.arena.colSize/2,
                    row*this.arena.rowSize+(this.arena.rowSize*0.8),
                    "("+(col*this.arena.colSize+this.arena.colSize/2)+", "+(row*this.arena.rowSize+this.arena.rowSize/2)+")",
                    // {
                    //     // fontFamily: 'Georgia,"Goudy Bookletter 1911",Times, serif',
                    //     align: 'center'
                    // }
                ).setOrigin(0.5, 0)
                .setScale(0.7)
            }
        }
        
    }


}