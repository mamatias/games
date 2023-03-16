import Phaser from 'phaser'

// import HelloWorldScene from './HelloWorldScene'
import SceneDemo from './SceneDemo'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 800,
	physics: {
		default: 'arcade',
		// arcade: {
		// 	// gravity: { y: 200 },
		// },
	},
	scene: [SceneDemo],
}

export default new Phaser.Game(config)
