namespace SpriteKind {
    export const NoInteractions = SpriteKind.create()
}
sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    timer.after(10000, function () {
        if (sprites.readDataBoolean(sprite, "squishable")) {
            sprite.sayText("bye!")
            sprites.setDataBoolean(sprite, "squishable", false)
            for (let index = 0; index < 4; index++) {
                sprite.setFlag(SpriteFlag.Invisible, true)
                pause(100)
                sprite.setFlag(SpriteFlag.Invisible, false)
                pause(100)
            }
            sprites.destroy(sprite)
        }
    })
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -130
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv2Forward`, function (sprite, location) {
    scene.setBackgroundImage(assets.image`lv2BG`)
    playTheme(2)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv2Back`, function (sprite, location) {
    scene.setBackgroundImage(assets.image`lv2BG`)
    playTheme(2)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`bigTP`, function (sprite, location) {
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
    tiles.placeOnTile(sprite, tiles.getTileLocation(location.column, location.row - 2))
})
function setupTutorial () {
    partyText = sprites.create(assets.image`partyText`, SpriteKind.NoInteractions)
    partyText.setPosition(96, 32)
    animation.runMovementAnimation(
    partyText,
    animation.animationPresets(animation.bobbing),
    5000,
    true
    )
    jumpPrompt = sprites.create(assets.image`jumpPrompt`, SpriteKind.NoInteractions)
    jumpPrompt.setPosition(272, 48)
    animation.runMovementAnimation(
    jumpPrompt,
    animation.animationPresets(animation.bobbing),
    5000,
    true
    )
    squishPrompt = sprites.create(assets.image`squishPrompt`, SpriteKind.NoInteractions)
    squishPrompt.setPosition(432, 32)
    animation.runMovementAnimation(
    squishPrompt,
    animation.animationPresets(animation.bobbing),
    5000,
    true
    )
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv1Forward`, function (sprite, location) {
    scene.setBackgroundImage(assets.image`lv1BG`)
    playTheme(1)
})
function flip (sprite: Sprite) {
    spriteImage = sprite.image.clone()
    if (!(sprites.readDataBoolean(sprite, "flipped"))) {
        spriteImage.flipX()
        sprites.setDataBoolean(sprite, "flipped", true)
    } else {
        sprites.setDataBoolean(sprite, "flipped", false)
    }
    sprite.setImage(spriteImage)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.stopAnimation(animation.AnimationTypes.All, mySprite)
    if (controller.right.isPressed()) {
        mySprite.setImage(assets.image`idle`)
    } else {
        animation.runImageAnimation(
        mySprite,
        assets.animation`walkLeft`,
        100,
        true
        )
    }
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, mySprite)
    if (controller.left.isPressed()) {
        animation.runImageAnimation(
        mySprite,
        assets.animation`walkLeft`,
        100,
        true
        )
    } else {
        mySprite.setImage(assets.image`idle`)
    }
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, mySprite)
    if (controller.right.isPressed()) {
        animation.runImageAnimation(
        mySprite,
        assets.animation`walkRight`,
        100,
        true
        )
    } else {
        mySprite.setImage(assets.image`idle`)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv4Forward`, function (sprite, location) {
    scene.setBackgroundImage(assets.image`lv4BG`)
    playTheme(4)
})
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    if (!(sprites.readDataBoolean(sprite, "grounded"))) {
        sprites.setDataBoolean(sprite, "grounded", true)
        sprites.setDataBoolean(sprite, "squishable", true)
        sprite.ay = 400
        if (Math.percentChance(50)) {
            flip(sprite)
            sprite.vx = 50
        } else {
            sprite.vx = -50
        }
    } else {
        if (sprite.isHittingTile(CollisionDirection.Left)) {
            flip(sprite)
            sprite.vx = 50
        } else if (sprite.isHittingTile(CollisionDirection.Right)) {
            flip(sprite)
            sprite.vx = -50
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`smallTP`, function (sprite, location) {
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
    tiles.placeOnTile(sprite, tiles.getTileLocation(location.column, location.row - 7))
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.stopAnimation(animation.AnimationTypes.All, mySprite)
    if (controller.left.isPressed()) {
        mySprite.setImage(assets.image`idle`)
    } else {
        animation.runImageAnimation(
        mySprite,
        assets.animation`walkRight`,
        100,
        true
        )
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv3Forward`, function (sprite, location) {
    scene.setBackgroundImage(assets.image`lv3BG`)
    playTheme(3)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tutBack`, function (sprite, location) {
    playTheme(0)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv1Back`, function (sprite, location) {
    scene.setBackgroundImage(assets.image`lv1BG`)
    playTheme(1)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv3Back`, function (sprite, location) {
    scene.setBackgroundImage(assets.image`lv3BG`)
    playTheme(3)
})
info.onScore(20, function () {
    tiles.setTileAt(tiles.getTileLocation(43, 4), sprites.builtin.forestTiles10)
    tiles.setWallAt(tiles.getTileLocation(43, 4), false)
})
function makeEnemy () {
    if (curLevel == 0) {
        mySprite2 = sprites.create(level0Enemies._pickRandom(), SpriteKind.Enemy)
        tiles.placeOnTile(mySprite2, tiles.getTileLocation(randint(31, 39), 0))
    } else if (curLevel == 1) {
        mySprite2 = sprites.create(level1Enemies._pickRandom(), SpriteKind.Enemy)
        tiles.placeOnTile(mySprite2, tiles.getTileLocation(randint(54, 69), 0))
    } else if (curLevel == 2) {
        mySprite2 = sprites.create(level2Enemies._pickRandom(), SpriteKind.Enemy)
        tiles.placeOnTile(mySprite2, tiles.getTileLocation(randint(82, 97), 0))
    } else if (curLevel == 3) {
        mySprite2 = sprites.create(level3Enemies._pickRandom(), SpriteKind.Enemy)
        tiles.placeOnTile(mySprite2, tiles.getTileLocation(randint(110, 125), 0))
    } else if (curLevel == 4) {
        mySprite2 = sprites.create(level4Enemies._pickRandom(), SpriteKind.Enemy)
        tiles.placeOnTile(mySprite2, tiles.getTileLocation(randint(138, 153), 0))
    }
    sprites.setDataBoolean(mySprite2, "grounded", false)
    sprites.setDataBoolean(mySprite2, "squishable", false)
    sprites.setDataBoolean(mySprite2, "flipped", false)
    mySprite2.setVelocity(0, 50)
}
function squish (sprite: Sprite) {
    timer.throttle("action", 100, function () {
        newlySelectedScream = randScreamList._pickRandom()
        while (newlySelectedScream == lastSelectedScream) {
            newlySelectedScream = randScreamList._pickRandom()
        }
        music.play(newlySelectedScream, music.PlaybackMode.InBackground)
    })
    sprites.setDataBoolean(sprite, "squishable", false)
    sprite.vx = 0
    sprite.sy = 0.5
    timer.after(1000, function () {
        for (let index = 0; index < 4; index++) {
            sprite.setFlag(SpriteFlag.Invisible, true)
            pause(100)
            sprite.setFlag(SpriteFlag.Invisible, false)
            pause(100)
        }
        sprites.destroy(sprite)
    })
}
function playTheme (num: number) {
    if (lastPlayedTheme == num) {
        return
    }
    music.stopAllSounds()
    lastPlayedTheme = num
    curLevel = num
    if (num == 1) {
        music.play(music.createSong(assets.song`theme1`), music.PlaybackMode.LoopingInBackground)
    } else if (num == 2) {
        music.play(music.createSong(assets.song`theme2`), music.PlaybackMode.LoopingInBackground)
    } else if (num == 3) {
        music.play(music.createSong(assets.song`theme3`), music.PlaybackMode.LoopingInBackground)
    } else if (num == 4) {
    	
    }
}
function setupLists () {
    level0Enemies = [assets.image`cake`, assets.image`pizza`, assets.image`taco`]
    level1Enemies = [assets.image`cat`, assets.image`dog`, assets.image`monkey`]
    level2Enemies = [assets.image`bat`, assets.image`snake`, assets.image`duck`]
    level3Enemies = [assets.image`crab`, assets.image`goldFish`, assets.image`yellowStripedFish`]
    level4Enemies = [assets.image`dino`, assets.image`ghost`, assets.image`shroom`]
    randScreamList = [
    music.createSoundEffect(WaveShape.Sawtooth, 2932, 2581, 255, 0, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Logarithmic),
    music.createSoundEffect(WaveShape.Sawtooth, 957, 1, 255, 0, 400, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear),
    music.createSoundEffect(WaveShape.Sine, 2537, 430, 255, 0, 500, SoundExpressionEffect.Warble, InterpolationCurve.Linear),
    music.createSoundEffect(WaveShape.Triangle, 1, 1, 255, 0, 500, SoundExpressionEffect.Warble, InterpolationCurve.Linear)
    ]
    lastSelectedScream = randScreamList._pickRandom()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprites.readDataBoolean(otherSprite, "squishable") && (sprite.vy > 10 && sprite.bottom < otherSprite.y)) {
        info.changeScoreBy(1)
        sprite.vy = -100
        squish(otherSprite)
    }
})
let lastSelectedScream: music.Playable = null
let randScreamList: music.SoundEffect[] = []
let newlySelectedScream: music.Playable = null
let level4Enemies: Image[] = []
let level3Enemies: Image[] = []
let level2Enemies: Image[] = []
let level1Enemies: Image[] = []
let level0Enemies: Image[] = []
let mySprite2: Sprite = null
let curLevel = 0
let spriteImage: Image = null
let squishPrompt: Sprite = null
let jumpPrompt: Sprite = null
let partyText: Sprite = null
let mySprite: Sprite = null
let lastPlayedTheme = 0
game.splash("garden stomper")
lastPlayedTheme = 0
setupTutorial()
setupLists()
scene.setBackgroundImage(assets.image`lv1BG`)
tiles.setCurrentTilemap(tilemap`level1`)
mySprite = sprites.create(assets.image`idle`, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 0)
mySprite.ay = 400
tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 4))
scene.cameraFollowSprite(mySprite)
game.onUpdateInterval(2000, function () {
    makeEnemy()
})
// footsteps
forever(function () {
    if ((controller.left.isPressed() || controller.right.isPressed()) && mySprite.isHittingTile(CollisionDirection.Bottom)) {
        timer.throttle("action", 200, function () {
            music.play(music.createSoundEffect(WaveShape.Sine, 123, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        })
    }
})
