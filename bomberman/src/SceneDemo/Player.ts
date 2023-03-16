import Phaser from "phaser"
import Gamepad from "./Gamepad"
import { Coord, Arena } from "./Types"



export default class Player {
    player: Phaser.Physics.Arcade.Sprite
    velocity: integer
    scale: integer
    currentPosition: Coord
    nextPosition: Coord
    texture: string
    arena: Arena
    scene: Phaser.Scene
    gamepad: Gamepad

    constructor(
        scene: Phaser.Scene,
        position: Coord,
        texture: string,
        arena: Arena,
        gamepad: Gamepad
    ){
        this.velocity=220
        this.scale = 1.5

        this.currentPosition = position
        this.nextPosition = position

        this.texture = texture

        this.arena = arena
        this.scene = scene
        this.gamepad = gamepad

        this.player = this.scene.physics.add.sprite(
            this.currentPosition.x,
            this.currentPosition.y,
            texture
        )
        this.player.setScale(this.scale)
        // this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)
    }

    Animate(){
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'stand',
            frames: [{ key: this.texture, frame: 4 }],
            frameRate: 20
        })

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'up',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 9, end: 12 }),
            frameRate: 10,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'down',
            frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 13, end: 17 }),
            frameRate: 10,
            repeat: -1
        })

    }

    UpdateMovement(){
        if (this.gamepad.gameKeys.left.isDown) {
            this.player.setVelocityX(-this.velocity)
            this.player.setVelocityY(0)
            this.player.anims.play('left', true)
            return;
        }

        if (this.gamepad.gameKeys.right.isDown) {
            this.player.setVelocityX(this.velocity)
            this.player.setVelocityY(0)
            this.player.anims.play('right', true)
            return;
        }

        if (this.gamepad.gameKeys.up.isDown) {
            this.player.setVelocityX(0)
            this.player.setVelocityY(-this.velocity)
            this.player.anims.play('up', true)
            return;
        }

        if (this.gamepad.gameKeys.down.isDown) {
            this.player.setVelocityX(0)
            this.player.setVelocityY(this.velocity)
            this.player.anims.play('down', true)
            return;
        }

        this.player.setVelocityX(0)
        this.player.setVelocityY(0)
        this.player.anims.play('stand')
    }
}