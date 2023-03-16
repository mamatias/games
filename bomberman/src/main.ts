import Phaser from 'phaser'

import Preloader from './Stage01/Scenes/Preloader'
import Game from './Stage01/Scenes/Game'
// import GameUI from './Stage01/Scenes/GameUI'

export default new Phaser.Game({
	type: Phaser.AUTO,
	width: 600,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false
		}
	},
	scene: [Preloader
		, Game
		// , GameUI
	],
	scale: {
		zoom: 1
	}
})