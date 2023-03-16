import Phaser from "phaser"

export default class Game extends Phaser.Scene{
    
    constructor(){
        super('game')
    }

    preload(): void {	

	}

    create(): void {
        
        const map = this.make.tilemap({
            key: 'stage01_tm1',
            tileHeight: 32,
            tileWidth: 32
        })
        const tiles = map.addTilesetImage('tiles1')
        const layer = map.createLayer(0, tiles, 0, 0)
    }

    // update(time: number, delta: number): void {
    update(): void {
    }

}