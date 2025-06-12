namespace SpriteKind {
    export const ShopText = SpriteKind.create()
    export const NoInteractions = SpriteKind.create()
}
sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    timer.after(enemyLifespan, function () {
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
function setupShopUpgrades () {
    isInShop = false
    playerGravity = 4
    spawnRate = 1
    scoreMultiplier = 1
    luckySquishRate = 9
    enemyLifespan = 10000
    chainReaction = false
    myEffect = extraEffects.createCustomSpreadEffectData(
    extraEffects.createPresetColorTable(ExtraEffectPresetColor.Fire),
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Explosion),
    extraEffects.createPercentageRange(50, 100),
    extraEffects.createPercentageRange(50, 100),
    extraEffects.createTimeRange(200, 400)
    )
    shopText = sprites.create(assets.image`shopText`, SpriteKind.NoInteractions)
    shopText.setPosition(80, 448)
    animation.runMovementAnimation(
    shopText,
    animation.animationPresets(animation.bobbing),
    5000,
    true
    )
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = 0 - mySprite.ay / 3
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
function updateGravityShopText () {
    gravTitle = textsprite.create("Player Gravity")
    // Update player gravity texts
    if (playerGravity == 1) {
        gravLevel = textsprite.create("Lv 1/4: 1x")
        gravUpgrade = textsprite.create("Buy 1.5x for 100?")
    } else if (playerGravity == 2) {
        gravLevel = textsprite.create("Lv 2/4: 1.5x")
        gravUpgrade = textsprite.create("Buy 2x for 500?")
    } else if (playerGravity == 3) {
        gravLevel = textsprite.create("Lv 3/4: 2x")
        gravUpgrade = textsprite.create("Buy 2.5x for 3000?")
    } else if (playerGravity == 4) {
        gravLevel = textsprite.create("Lv 4/4: 2.5x")
        gravUpgrade = textsprite.create("MAXED", 0, 7)
    }
    gravTitle.setKind(SpriteKind.ShopText)
    gravLevel.setKind(SpriteKind.ShopText)
    gravUpgrade.setKind(SpriteKind.ShopText)
    tiles.placeOnTile(gravTitle, tiles.getTileLocation(11, 27))
    tiles.placeOnTile(gravLevel, tiles.getTileLocation(11, 28))
    tiles.placeOnTile(gravUpgrade, tiles.getTileLocation(11, 30))
}
function scorePopup (text: string, x: number, y: number) {
    textSprite = textsprite.create(text)
    textSprite.setOutline(1, 15)
    textSprite.setPosition(x, y)
    textSprite.ay = 40
    textSprite.vy = -40
    textSprite.lifespan = 1000
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`shop`, function (sprite, location) {
    returnPoint = tiles.getTileLocation(location.column, location.row + 2)
    isInShop = true
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    music.stopAllSounds()
    music.play(music.createSong(assets.song`shopTheme`), music.PlaybackMode.LoopingInBackground)
    tiles.setCurrentTilemap(tilemap`level2`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(3, 31))
    mySprite.setVelocity(0, 0)
    updateAllShopText()
})
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
function updateAllShopText () {
    sprites.destroyAllSpritesOfKind(SpriteKind.ShopText)
    updateGravityShopText()
    updateSpawnRateShopText()
}
function updateSpawnRateShopText () {
    // Update spawn rate texts
    if (spawnRate == 1) {
    	
    } else if (spawnRate == 2) {
    	
    } else if (spawnRate == 3) {
    	
    } else if (spawnRate == 4) {
    	
    }
}
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
info.onScore(1, function () {
	
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv3Forward`, function (sprite, location) {
    scene.setBackgroundImage(assets.image`lv3BG`)
    playTheme(3)
})
function setPlayerGravity () {
    if (playerGravity == 1) {
        mySprite.ay = 400
    } else if (playerGravity == 2) {
        mySprite.ay = 600
    } else if (playerGravity == 3) {
        mySprite.ay = 800
    } else if (playerGravity == 4) {
        mySprite.ay = 1000
    }
}
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
scene.onOverlapTile(SpriteKind.Player, assets.tile`shopExit`, function (sprite, location) {
    music.stopAllSounds()
    playTheme(curLevel)
    isInShop = false
    tiles.setCurrentTilemap(tilemap`level1`)
    tiles.placeOnTile(mySprite, returnPoint)
    mySprite.setVelocity(0, 0)
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
        if (Math.percentChance(luckySquishRate)) {
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
            extraEffects.createSpreadEffectAt(myEffect, otherSprite.x, otherSprite.y, 200, 20)
            pointsScored = Math.constrain(curLevel, 1, 4) * (scoreMultiplier * 10)
            scorePopup("Lucky! +" + convertToText(pointsScored), otherSprite.x, otherSprite.y)
        } else {
            pointsScored = Math.constrain(curLevel, 1, 4) * scoreMultiplier
            scorePopup("+" + convertToText(pointsScored), otherSprite.x, otherSprite.y)
        }
        info.changeScoreBy(pointsScored)
        sprite.vy = -150
        squish(otherSprite)
    }
})
let pointsScored = 0
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
let returnPoint: tiles.Location = null
let textSprite: TextSprite = null
let gravUpgrade: TextSprite = null
let gravLevel: TextSprite = null
let gravTitle: TextSprite = null
let spriteImage: Image = null
let squishPrompt: Sprite = null
let jumpPrompt: Sprite = null
let partyText: Sprite = null
let shopText: Sprite = null
let myEffect: SpreadEffectData = null
let chainReaction = false
let luckySquishRate = 0
let scoreMultiplier = 0
let spawnRate = 0
let playerGravity = 0
let isInShop = false
let enemyLifespan = 0
let lastPlayedTheme = 0
let mySprite: Sprite = null
game.splash("garden stomper")
scene.setBackgroundImage(assets.image`lv1BG`)
tiles.setCurrentTilemap(tilemap`level1`)
setupTutorial()
setupShopUpgrades()
setupLists()
mySprite = sprites.create(assets.image`idle`, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 0)
mySprite.z = 999
tiles.placeOnTile(mySprite, tiles.getTileLocation(100, 4))
scene.cameraFollowSprite(mySprite)
setPlayerGravity()
scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.OnlyHorizontal)
scroller.setCameraScrollingMultipliers(0.3, 0)
lastPlayedTheme = 0
playTheme(0)
game.onUpdateInterval(250, function () {
    if (spawnRate == 4 && !(isInShop)) {
        makeEnemy()
    }
})
game.onUpdateInterval(2000, function () {
    if (spawnRate == 1 && !(isInShop)) {
        makeEnemy()
    }
})
game.onUpdateInterval(1000, function () {
    if (spawnRate == 2 && !(isInShop)) {
        makeEnemy()
    }
})
// footsteps
forever(function () {
    if ((controller.left.isPressed() || controller.right.isPressed()) && mySprite.isHittingTile(CollisionDirection.Bottom)) {
        timer.throttle("action", 200, function () {
            music.play(music.createSoundEffect(WaveShape.Sine, 123, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        })
    }
})
game.onUpdateInterval(500, function () {
    if (spawnRate == 3 && !(isInShop)) {
        makeEnemy()
    }
})
