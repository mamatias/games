import Phaser from "phaser"

export default class Gamepad {
    gameKeys: {
        up?: any
        down?: any
        left?: any
        right?: any
        space?: any
    }

    constructor(scene: Phaser.Scene){
        this.gameKeys = scene.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.UP,
            'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'space': Phaser.Input.Keyboard.KeyCodes.SPACE,
        });
    }
}