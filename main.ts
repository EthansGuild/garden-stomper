namespace SpriteKind {
    export const ShopText = SpriteKind.create()
    export const NoInteractions = SpriteKind.create()
    export const CooldownTimer = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprites.readDataBoolean(otherSprite, "squishable") && (sprite.vy > 10 && sprite.bottom < otherSprite.y)) {
        sprite.vy = -150
        squish(otherSprite)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(60, 31))
})
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
scene.onOverlapTile(SpriteKind.Player, assets.tile`shopSpawnRate`, function (sprite, location) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(location.column, location.row + 2))
    sprite.setVelocity(0, 0)
    if (spawnRate == 1 && info.score() >= spawnLv2Cost) {
        info.changeScoreBy(0 - spawnLv2Cost)
        spawnRate = 2
    } else if (spawnRate == 2 && info.score() >= spawnLv3Cost) {
        info.changeScoreBy(0 - spawnLv3Cost)
        spawnRate = 3
    } else if (spawnRate == 3 && info.score() >= spawnLv4Cost) {
        info.changeScoreBy(0 - spawnLv4Cost)
        spawnRate = 4
    } else {
        sprite.sayText("not enough moolah :(", 2000, false)
    }
    updateAllShopText()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`shopGrav`, function (sprite, location) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(location.column, location.row + 2))
    sprite.setVelocity(0, 0)
    if (playerGravity == 1 && info.score() >= gravLv2Cost) {
        info.changeScoreBy(0 - gravLv2Cost)
        setPlayerGravity(2)
    } else if (playerGravity == 2 && info.score() >= gravLv3Cost) {
        info.changeScoreBy(0 - gravLv3Cost)
        setPlayerGravity(3)
    } else if (playerGravity == 3 && info.score() >= gravLv4Cost) {
        info.changeScoreBy(0 - gravLv4Cost)
        setPlayerGravity(4)
    } else {
        sprite.sayText("not enough moolah :(", 2000, false)
    }
    updateAllShopText()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(2, 31))
})
function setupShopUpgrades () {
    isInShop = false
    playerGravity = 1
    spawnRate = 1
    scoreMultiplier = 1
    luckySquishRate = 3
    enemyLifespan = 10000
    chainReaction = false
    shopText = sprites.create(assets.image`shopText`, SpriteKind.NoInteractions)
    shopText.setPosition(144, 448)
    animation.runMovementAnimation(
    shopText,
    animation.animationPresets(animation.bobbing),
    5000,
    true
    )
    gravLv2Cost = 100
    gravLv3Cost = 500
    gravLv4Cost = 3000
    spawnLv2Cost = 100
    spawnLv3Cost = 500
    spawnLv4Cost = 3000
    multLv2Cost = 100
    multLv3Cost = 500
    multLv4Cost = 3000
    luckyLv2Cost = 100
    luckyLv3Cost = 500
    luckyLv4Cost = 3000
    lifespanLv2Cost = 300
    lifespanLv3Cost = 1500
    chainUnlockCost = 1000
}
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
scene.onOverlapTile(SpriteKind.Player, assets.tile`tutBack`, function (sprite, location) {
    playTheme(0)
})
function updateChainReactionShopText () {
    chainReactionTitle = fancyText.create("Chain Reaction", 0, 0, fancyText.serif_small)
    // Update chain reaction texts
    if (!(chainReaction)) {
        chainReactionLevel = textsprite.create("Locked")
        chainReactionUpgrade = textsprite.create("Unlock for " + chainUnlockCost + "?")
    } else if (chainReaction) {
        chainReactionLevel = textsprite.create("Unlocked")
        chainReactionUpgrade = textsprite.create("MAXED", 0, 7)
    }
    chainReactionTitle.setKind(SpriteKind.ShopText)
    chainReactionLevel.setKind(SpriteKind.ShopText)
    chainReactionUpgrade.setKind(SpriteKind.ShopText)
    tiles.placeOnTile(chainReactionTitle, tiles.getTileLocation(56, 27))
    tiles.placeOnTile(chainReactionLevel, tiles.getTileLocation(56, 28))
    tiles.placeOnTile(chainReactionUpgrade, tiles.getTileLocation(56, 30))
}
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
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv4Forward`, function (sprite, location) {
    scene.setBackgroundImage(assets.image`lv4BG`)
    playTheme(4)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`shopMult`, function (sprite, location) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(location.column, location.row + 2))
    sprite.setVelocity(0, 0)
    if (scoreMultiplier == 1 && info.score() >= multLv2Cost) {
        info.changeScoreBy(0 - multLv2Cost)
        scoreMultiplier = 2
    } else if (scoreMultiplier == 2 && info.score() >= multLv3Cost) {
        info.changeScoreBy(0 - multLv3Cost)
        scoreMultiplier = 3
    } else if (scoreMultiplier == 3 && info.score() >= multLv4Cost) {
        info.changeScoreBy(0 - multLv4Cost)
        scoreMultiplier = 4
    } else {
        sprite.sayText("not enough moolah :(", 2000, false)
    }
    updateAllShopText()
})
info.onScore(1200, function () {
    tiles.setTileAt(tiles.getTileLocation(104, 4), assets.tile`lv3Forward`)
    tiles.setWallAt(tiles.getTileLocation(104, 4), false)
    music.play(music.melodyPlayable(music.siren), music.PlaybackMode.InBackground)
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
    gravTitle = fancyText.create("Player Gravity", 0, 0, fancyText.serif_small)
    // Update player gravity texts
    if (playerGravity == 1) {
        gravLevel = textsprite.create("Lv 1/4: 1x")
        gravUpgrade = textsprite.create("Buy 1.5x for " + gravLv2Cost + "?")
    } else if (playerGravity == 2) {
        gravLevel = textsprite.create("Lv 2/4: 1.5x")
        gravUpgrade = textsprite.create("Buy 2x for " + gravLv3Cost + "?")
    } else if (playerGravity == 3) {
        gravLevel = textsprite.create("Lv 3/4: 2x")
        gravUpgrade = textsprite.create("Buy 3x for " + gravLv4Cost + "?")
    } else if (playerGravity == 4) {
        gravLevel = textsprite.create("Lv 4/4: 3.0x")
        gravUpgrade = textsprite.create("MAXED", 0, 7)
    }
    gravTitle.setKind(SpriteKind.ShopText)
    gravLevel.setKind(SpriteKind.ShopText)
    gravUpgrade.setKind(SpriteKind.ShopText)
    tiles.placeOnTile(gravTitle, tiles.getTileLocation(16, 27))
    tiles.placeOnTile(gravLevel, tiles.getTileLocation(16, 28))
    tiles.placeOnTile(gravUpgrade, tiles.getTileLocation(16, 30))
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
    lastPlayedTheme = 999
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    music.stopAllSounds()
    music.play(music.createSong(assets.song`shopTheme`), music.PlaybackMode.LoopingInBackground)
    tiles.setCurrentTilemap(tilemap`level2`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(3, 31))
    mySprite.setVelocity(0, 0)
    updateAllShopText()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv1Back`, function (sprite, location) {
    scene.setBackgroundImage(assets.image`lv1BG`)
    playTheme(1)
})
function setupEffects () {
    luckyEffect = extraEffects.createCustomSpreadEffectData(
    extraEffects.createPresetColorTable(ExtraEffectPresetColor.Fire),
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Explosion),
    extraEffects.createPercentageRange(50, 100),
    extraEffects.createPercentageRange(50, 100),
    extraEffects.createTimeRange(200, 400)
    )
    enemyBurnEffect = extraEffects.createCustomSpreadEffectData(
    extraEffects.createPresetColorTable(ExtraEffectPresetColor.Fire),
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Spark),
    extraEffects.createPercentageRange(0, 0),
    extraEffects.createPercentageRange(0, 100),
    extraEffects.createTimeRange(1000, 1300),
    0,
    -100,
    extraEffects.createPercentageRange(100, 100),
    250,
    0,
    5000
    )
}
scene.onOverlapTile(SpriteKind.Enemy, sprites.dungeon.hazardLava1, function (sprite, location) {
    extraEffects.createSpreadEffectAt(enemyBurnEffect, (location.column + 0.5) * 16, location.row * 16, 100, 40)
    music.play(music.createSoundEffect(WaveShape.Noise, 3992, 4645, 255, 0, 300, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    sprites.destroy(sprite)
})
info.onScore(15, function () {
    tiles.setTileAt(tiles.getTileLocation(43, 4), sprites.builtin.forestTiles10)
    tiles.setWallAt(tiles.getTileLocation(43, 4), false)
    music.play(music.melodyPlayable(music.siren), music.PlaybackMode.InBackground)
})
info.onScore(300, function () {
    tiles.setTileAt(tiles.getTileLocation(76, 4), assets.tile`lv2Forward`)
    tiles.setWallAt(tiles.getTileLocation(76, 4), false)
    music.play(music.melodyPlayable(music.siren), music.PlaybackMode.InBackground)
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
scene.onOverlapTile(SpriteKind.Player, assets.tile`shopMult1`, function (sprite, location) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(location.column, location.row + 2))
    sprite.setVelocity(0, 0)
    if (luckySquishRate == 10000 && info.score() >= lifespanLv2Cost) {
        info.changeScoreBy(0 - lifespanLv2Cost)
        luckySquishRate = 6
    } else if (luckySquishRate == 15000 && info.score() >= lifespanLv3Cost) {
        info.changeScoreBy(0 - lifespanLv3Cost)
        luckySquishRate = 9
    } else {
        sprite.sayText("not enough moolah :(", 2000, false)
    }
    updateAllShopText()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv2Back`, function (sprite, location) {
    scene.setBackgroundImage(assets.image`lv2BG`)
    playTheme(2)
})
function updateLuckySquishRateShopText () {
    luckySquishTitle = fancyText.create("Lucky Squish Rate", 0, 0, fancyText.serif_small)
    // Update lucky squish rate texts
    if (luckySquishRate == 3) {
        luckySquishLevel = textsprite.create("Lv 1/4: 3%")
        luckySquishUpgrade = textsprite.create("Buy 6% for " + luckyLv2Cost + "?")
    } else if (luckySquishRate == 6) {
        luckySquishLevel = textsprite.create("Lv 2/4: 6%")
        luckySquishUpgrade = textsprite.create("Buy 9% for " + luckyLv3Cost + "?")
    } else if (luckySquishRate == 9) {
        luckySquishLevel = textsprite.create("Lv 3/4: 9%")
        luckySquishUpgrade = textsprite.create("Buy 12% for " + luckyLv4Cost + "?")
    } else if (luckySquishRate == 12) {
        luckySquishLevel = textsprite.create("Lv 4/4: 12%")
        luckySquishUpgrade = textsprite.create("MAXED", 0, 7)
    }
    luckySquishTitle.setKind(SpriteKind.ShopText)
    luckySquishLevel.setKind(SpriteKind.ShopText)
    luckySquishUpgrade.setKind(SpriteKind.ShopText)
    tiles.placeOnTile(luckySquishTitle, tiles.getTileLocation(40, 27))
    tiles.placeOnTile(luckySquishLevel, tiles.getTileLocation(40, 28))
    tiles.placeOnTile(luckySquishUpgrade, tiles.getTileLocation(40, 30))
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`shopMult0`, function (sprite, location) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(location.column, location.row + 2))
    sprite.setVelocity(0, 0)
    if (luckySquishRate == 3 && info.score() >= luckyLv2Cost) {
        info.changeScoreBy(0 - luckyLv2Cost)
        luckySquishRate = 6
    } else if (luckySquishRate == 6 && info.score() >= luckyLv3Cost) {
        info.changeScoreBy(0 - luckyLv3Cost)
        luckySquishRate = 9
    } else if (luckySquishRate == 9 && info.score() >= luckyLv4Cost) {
        info.changeScoreBy(0 - luckyLv4Cost)
        luckySquishRate = 12
    } else {
        sprite.sayText("not enough moolah :(", 2000, false)
    }
    updateAllShopText()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`shopMult2`, function (sprite, location) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(location.column, location.row + 2))
    sprite.setVelocity(0, 0)
    if (!(chainReaction) && info.score() >= chainUnlockCost) {
        info.changeScoreBy(0 - chainUnlockCost)
        chainReaction = true
    } else {
        sprite.sayText("not enough moolah :(", 2000, false)
    }
    updateAllShopText()
})
function updateAllShopText () {
    sprites.destroyAllSpritesOfKind(SpriteKind.ShopText)
    updateGravityShopText()
    updateSpawnRateShopText()
    updateScoreMultiplierShopText()
    updateLuckySquishRateShopText()
    updateEnemyLifeSpanShopText()
    updateChainReactionShopText()
}
function updateSpawnRateShopText () {
    spawnRateTitle = fancyText.create("Enemy Spawn Rate", 0, 0, fancyText.serif_small)
    // Update spawn rate texts
    if (spawnRate == 1) {
        spawnRateLevel = textsprite.create("Lv 1/4: 2s")
        spawnRateUpgrade = textsprite.create("Buy 1s for " + spawnLv2Cost + "?")
    } else if (spawnRate == 2) {
        spawnRateLevel = textsprite.create("Lv 2/4: 1.0s")
        spawnRateUpgrade = textsprite.create("Buy 0.5s for " + spawnLv3Cost + "?")
    } else if (spawnRate == 3) {
        spawnRateLevel = textsprite.create("Lv 3/4: 0.5s")
        spawnRateUpgrade = textsprite.create("Buy 0.25s for " + spawnLv4Cost + "?")
    } else if (spawnRate == 4) {
        spawnRateLevel = textsprite.create("Lv 4/4: 0.25s")
        spawnRateUpgrade = textsprite.create("MAXED", 0, 7)
    }
    spawnRateTitle.setKind(SpriteKind.ShopText)
    spawnRateLevel.setKind(SpriteKind.ShopText)
    spawnRateUpgrade.setKind(SpriteKind.ShopText)
    tiles.placeOnTile(spawnRateTitle, tiles.getTileLocation(24, 27))
    tiles.placeOnTile(spawnRateLevel, tiles.getTileLocation(24, 28))
    tiles.placeOnTile(spawnRateUpgrade, tiles.getTileLocation(24, 30))
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (chainReaction && !(cooldown)) {
        cooldown = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.CooldownTimer)
        cooldown.lifespan = 3000
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            if (sprites.readDataBoolean(value, "squishable")) {
                squish(value)
            }
        }
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
sprites.onDestroyed(SpriteKind.CooldownTimer, function (sprite) {
    cooldown = null
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv1Forward`, function (sprite, location) {
    scene.setBackgroundImage(assets.image`lv1BG`)
    playTheme(1)
})
info.onScore(1, function () {
	
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv3Back`, function (sprite, location) {
    scene.setBackgroundImage(assets.image`lv3BG`)
    playTheme(3)
})
function setPlayerGravity (selection: number) {
    playerGravity = selection
    if (playerGravity == 1) {
        mySprite.ay = 400
    } else if (playerGravity == 2) {
        mySprite.ay = 600
    } else if (playerGravity == 3) {
        mySprite.ay = 800
    } else if (playerGravity == 4) {
        mySprite.ay = 1200
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`smallTP`, function (sprite, location) {
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
    tiles.placeOnTile(sprite, tiles.getTileLocation(location.column, location.row - 7))
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv2Forward`, function (sprite, location) {
    scene.setBackgroundImage(assets.image`lv2BG`)
    playTheme(2)
})
function updateEnemyLifeSpanShopText () {
    enemyLifespanTitle = fancyText.create("Enemy Lifespan", 0, 0, fancyText.serif_small)
    // Update enemy lifespan texts
    if (enemyLifespan == 10000) {
        enemyLifespanLevel = textsprite.create("Lv 1/3: 10s")
        enemyLifespanUpgrade = textsprite.create("Buy 15s for " + lifespanLv2Cost + "?")
    } else if (enemyLifespan == 15000) {
        enemyLifespanLevel = textsprite.create("Lv 2/3: 15s")
        enemyLifespanUpgrade = textsprite.create("Buy 20s for " + lifespanLv3Cost + "?")
    } else if (enemyLifespan == 20000) {
        enemyLifespanLevel = textsprite.create("Lv 3/3: 20s")
        enemyLifespanUpgrade = textsprite.create("MAXED", 0, 7)
    }
    enemyLifespanTitle.setKind(SpriteKind.ShopText)
    enemyLifespanLevel.setKind(SpriteKind.ShopText)
    enemyLifespanUpgrade.setKind(SpriteKind.ShopText)
    tiles.placeOnTile(enemyLifespanTitle, tiles.getTileLocation(48, 27))
    tiles.placeOnTile(enemyLifespanLevel, tiles.getTileLocation(48, 28))
    tiles.placeOnTile(enemyLifespanUpgrade, tiles.getTileLocation(48, 30))
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv3Forward`, function (sprite, location) {
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
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = 0 - mySprite.ay / 3
    }
})
info.onScore(5000, function () {
    tiles.setTileAt(tiles.getTileLocation(132, 4), assets.tile`lv4Forward`)
    tiles.setWallAt(tiles.getTileLocation(132, 4), false)
    music.play(music.melodyPlayable(music.siren), music.PlaybackMode.InBackground)
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
function updateScoreMultiplierShopText () {
    scoreMultTitle = fancyText.create("Score Multiplier", 0, 0, fancyText.serif_small)
    // Update score multiplier texts
    if (scoreMultiplier == 1) {
        scoreMultLevel = textsprite.create("Lv 1/4: 1x")
        scoreMultUpgrade = textsprite.create("Buy 2x for " + multLv2Cost + "?")
    } else if (scoreMultiplier == 2) {
        scoreMultLevel = textsprite.create("Lv 2/4: 2x")
        scoreMultUpgrade = textsprite.create("Buy 3x for " + multLv3Cost + "?")
    } else if (scoreMultiplier == 4) {
        scoreMultLevel = textsprite.create("Lv 3/4: 3x")
        scoreMultUpgrade = textsprite.create("Buy 4x for " + multLv4Cost + "?")
    } else if (scoreMultiplier == 8) {
        scoreMultLevel = textsprite.create("Lv 4/4: 4x")
        scoreMultUpgrade = textsprite.create("MAXED", 0, 7)
    }
    scoreMultTitle.setKind(SpriteKind.ShopText)
    scoreMultLevel.setKind(SpriteKind.ShopText)
    scoreMultUpgrade.setKind(SpriteKind.ShopText)
    tiles.placeOnTile(scoreMultTitle, tiles.getTileLocation(32, 27))
    tiles.placeOnTile(scoreMultLevel, tiles.getTileLocation(32, 28))
    tiles.placeOnTile(scoreMultUpgrade, tiles.getTileLocation(32, 30))
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
function squish (sprite: Sprite) {
    updateScore(sprite)
    newlySelectedScream = randScreamList._pickRandom()
    while (newlySelectedScream == lastSelectedScream) {
        newlySelectedScream = randScreamList._pickRandom()
    }
    music.play(newlySelectedScream, music.PlaybackMode.InBackground)
    timer.throttle("action", 100, function () {
    	
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
function updateScore (sprite: Sprite) {
    if (Math.percentChance(luckySquishRate)) {
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        extraEffects.createSpreadEffectAt(luckyEffect, sprite.x, sprite.y, 200, 20)
        pointsScored = Math.constrain(curLevel, 1, 4) * (scoreMultiplier * 10)
        scorePopup("Lucky! +" + convertToText(pointsScored), sprite.x, sprite.y)
    } else {
        pointsScored = Math.constrain(curLevel, 1, 4) * scoreMultiplier
        scorePopup("+" + convertToText(pointsScored), sprite.x, sprite.y)
    }
    info.changeScoreBy(pointsScored)
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
        music.play(music.createSong(assets.song`theme4`), music.PlaybackMode.LoopingInBackground)
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
scene.onOverlapTile(SpriteKind.Player, assets.tile`bigTP`, function (sprite, location) {
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
    tiles.placeOnTile(sprite, tiles.getTileLocation(location.column, location.row - 2))
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
let pointsScored = 0
let lastSelectedScream: music.Playable = null
let randScreamList: music.SoundEffect[] = []
let newlySelectedScream: music.Playable = null
let scoreMultUpgrade: TextSprite = null
let scoreMultLevel: TextSprite = null
let scoreMultTitle: fancyText.TextSprite = null
let level4Enemies: Image[] = []
let level3Enemies: Image[] = []
let level2Enemies: Image[] = []
let level1Enemies: Image[] = []
let level0Enemies: Image[] = []
let mySprite2: Sprite = null
let curLevel = 0
let enemyLifespanUpgrade: TextSprite = null
let enemyLifespanLevel: TextSprite = null
let enemyLifespanTitle: fancyText.TextSprite = null
let spawnRateUpgrade: TextSprite = null
let spawnRateLevel: TextSprite = null
let spawnRateTitle: fancyText.TextSprite = null
let luckySquishUpgrade: TextSprite = null
let luckySquishLevel: TextSprite = null
let luckySquishTitle: fancyText.TextSprite = null
let enemyBurnEffect: SpreadEffectData = null
let luckyEffect: SpreadEffectData = null
let returnPoint: tiles.Location = null
let textSprite: TextSprite = null
let gravUpgrade: TextSprite = null
let gravLevel: TextSprite = null
let gravTitle: fancyText.TextSprite = null
let spriteImage: Image = null
let squishPrompt: Sprite = null
let jumpPrompt: Sprite = null
let partyText: Sprite = null
let chainReactionUpgrade: TextSprite = null
let chainReactionLevel: TextSprite = null
let chainReactionTitle: fancyText.TextSprite = null
let chainUnlockCost = 0
let lifespanLv3Cost = 0
let lifespanLv2Cost = 0
let luckyLv4Cost = 0
let luckyLv3Cost = 0
let luckyLv2Cost = 0
let multLv4Cost = 0
let multLv3Cost = 0
let multLv2Cost = 0
let shopText: Sprite = null
let chainReaction = false
let luckySquishRate = 0
let scoreMultiplier = 0
let isInShop = false
let gravLv4Cost = 0
let gravLv3Cost = 0
let gravLv2Cost = 0
let playerGravity = 0
let spawnLv4Cost = 0
let spawnLv3Cost = 0
let spawnLv2Cost = 0
let spawnRate = 0
let enemyLifespan = 0
let lastPlayedTheme = 0
let mySprite: Sprite = null
let cooldown: Sprite = null
game.splash("garden stomper")
tiles.setCurrentTilemap(tilemap`level1`)
setupTutorial()
setupShopUpgrades()
setupLists()
setupEffects()
mySprite = sprites.create(assets.image`idle`, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 0)
mySprite.z = 999
tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 4))
scene.cameraFollowSprite(mySprite)
setPlayerGravity(1)
scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.OnlyHorizontal)
scroller.setCameraScrollingMultipliers(0.3, 0)
lastPlayedTheme = 0
playTheme(0)
game.onUpdateInterval(250, function () {
    if (spawnRate == 4 && !(isInShop)) {
        makeEnemy()
    }
})
game.onUpdateInterval(500, function () {
    if (spawnRate == 3 && !(isInShop)) {
        makeEnemy()
    }
})
game.onUpdateInterval(2000, function () {
    if (spawnRate == 1 && !(isInShop)) {
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
game.onUpdateInterval(1000, function () {
    if (spawnRate == 2 && !(isInShop)) {
        makeEnemy()
    }
})
