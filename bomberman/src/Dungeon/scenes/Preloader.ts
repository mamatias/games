import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene{

	constructor(){
		super('preloader')
	}

	preload(): void {
		
		this.load.image('tiles', 'dungeon/tiles/dungeon_tiles_extruded.png')
		this.load.tilemapTiledJSON('dungeon', 'dungeon/tiles/dungeon-01.json')

		// this.load.atlas('faune', 'dungeon/character/fauna.png', 'dungeon/character/fauna.json')
		this.load.atlas('lizard', 'dungeon/enemies/lizard.png', 'dungeon/enemies/lizard.json')
		this.load.atlas('treasure', 'dungeon/items/treasure.png', 'dungeon/items/treasure.json')

		this.load.image('dungeon/ui-heart-empty', 'dungeon/ui/ui_heart_empty.png')
		this.load.image('dungeon/ui-heart-full', 'dungeon/ui/ui_heart_full.png')

		this.load.image('knife', 'dungeon/weapons/weapon_knife.png')
	}

	create(): void{
		this.scene.start('game')
	}
}