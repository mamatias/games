import Phaser from "phaser"

export default class Preloader extends Phaser.Scene{
    
    constructor(){
        super('preloader')
    }

    preload(): void {
        this.load.image("tiles1", "./tiles/stage01.gif")

        this.load.tilemapTiledJSON('stage01_tm1', './tiles/stage01_tm1.json')
	}

	create(): void{
		this.scene.start('game')
	}


}