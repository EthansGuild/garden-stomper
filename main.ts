namespace SpriteKind {
    export const NoInteractions = SpriteKind.create()
    export const CooldownTimer = SpriteKind.create()
    export const ShopText = SpriteKind.create()
    export const UpgradeUI = SpriteKind.create()
    export const Flower = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(60, 31))
})
sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    timer.after(15000, function () {
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
function setupLevel (num: number) {
    if (lastSelectedLevel == num) {
        return
    }
    music.stopAllSounds()
    sprites.destroyAllSpritesOfKind(SpriteKind.Flower)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    lastSelectedLevel = num
    curLevel = num
    updateScoreboard(info.score())
    showScoreboard()
    hideScorecount()
    if (num == 0) {
        music.play(music.createSong(assets.song`theme0`), music.PlaybackMode.LoopingInBackground)
    } else if (num == 1) {
        scroller.setLayerImage(scroller.BackgroundLayer.Layer1, assets.image`lv1BG`)
        music.play(music.createSong(assets.song`theme1`), music.PlaybackMode.LoopingInBackground)
    } else if (num == 2) {
        scroller.setLayerImage(scroller.BackgroundLayer.Layer1, assets.image`lv2BG`)
        music.play(music.createSong(assets.song`theme2`), music.PlaybackMode.LoopingInBackground)
    } else if (num == 3) {
        scroller.setLayerImage(scroller.BackgroundLayer.Layer1, assets.image`lv3BG`)
        music.play(music.createSong(assets.song`theme3`), music.PlaybackMode.LoopingInBackground)
    } else if (num == 4) {
        scroller.setLayerImage(scroller.BackgroundLayer.Layer1, assets.image`lv4BG`)
        music.play(music.createSong(assets.song`theme4`), music.PlaybackMode.LoopingInBackground)
    } else if (num == 5) {
        scroller.setLayerImage(scroller.BackgroundLayer.Layer1, assets.image`lv5BG`)
        music.play(music.createSong(assets.song`theme5`), music.PlaybackMode.LoopingInBackground)
    } else if (num == 6) {
        music.play(music.createSong(assets.song`theme1`), music.PlaybackMode.LoopingInBackground)
    }
}
function hideScoreboard () {
    scoreboardBG.setFlag(SpriteFlag.Invisible, true)
    boardTitleText.setFlag(SpriteFlag.Invisible, true)
    boardScoreTitleText.setFlag(SpriteFlag.Invisible, true)
    boardScoreText.setFlag(SpriteFlag.Invisible, true)
}
function introSeq () {
    extraEffects.createSpreadEffectAt(extraEffects.createSingleColorSpreadEffectData(1, ExtraEffectPresetShape.Twinkle), 40, 60, 100, 60, 40)
    extraEffects.createSpreadEffectAt(extraEffects.createSingleColorSpreadEffectData(1, ExtraEffectPresetShape.Twinkle), 80, 60, 100, 60, 40)
    extraEffects.createSpreadEffectAt(extraEffects.createSingleColorSpreadEffectData(1, ExtraEffectPresetShape.Twinkle), 120, 60, 100, 60, 40)
    openText1 = textsprite.create("A game by Ethan B")
    openText1.setOutline(1, 15)
    openText1.setPosition(80, 50)
    openText1.z = 1
    openText2 = textsprite.create("Submission for Sensei")
    openText2.setOutline(1, 15)
    openText2.setPosition(80, 60)
    openText2.z = 1
    openText3 = textsprite.create("Game Jam: Garden Party")
    openText3.setOutline(1, 15)
    openText3.setPosition(80, 70)
    openText3.z = 1
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    pause(3000)
    color.startFade(color.originalPalette, color.Black, 500)
    pause(500)
    sprites.destroy(openText1)
    sprites.destroy(openText2)
    sprites.destroy(openText3)
    storyPart1()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(2, 31))
})
function setupShopUpgrades () {
    isInShop = false
    spawnRate = 1
    scoreMultiplier = 1
    luckySquishRate = 4
    setPlayerSpeed(1)
    flowerRate = 1
    chainReaction = false
    shopText = sprites.create(assets.image`shopText`, SpriteKind.NoInteractions)
    shopText.setPosition(144, 448)
    animation.runMovementAnimation(
    shopText,
    animation.animationPresets(animation.bobbing),
    5000,
    true
    )
    speedLv2Cost = 50
    speedLv3Cost = 250
    speedLv4Cost = 1500
    spawnLv2Cost = 60
    spawnLv3Cost = 400
    spawnLv4Cost = 2400
    multLv2Cost = 60
    multLv3Cost = 400
    multLv4Cost = 2400
    luckyLv2Cost = 70
    luckyLv3Cost = 350
    luckyLv4Cost = 2100
    flowerLv2Cost = 300
    flowerLv3Cost = 1500
    chainUnlockCost = 1000
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameStarted && !(endCutscene) && mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -150
    }
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom) && !(partyActive)) {
        combo = 0
    }
})
function hideScorecount () {
    scorecountBG.setFlag(SpriteFlag.Invisible, true)
    countScoreText.setFlag(SpriteFlag.Invisible, true)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv2Forward`, function (sprite, location) {
    setupLevel(2)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv2Back`, function (sprite, location) {
    setupLevel(2)
})
function showScoreCount () {
    scorecountBG.setFlag(SpriteFlag.Invisible, false)
    countScoreText.setFlag(SpriteFlag.Invisible, false)
}
function updateChainReactionShopText () {
    chainReactionTitle = fancyText.create("Chain Reaction", 0, 0, fancyText.serif_small)
    // Update chain reaction texts
    if (!(chainReaction)) {
        chainReactionLevel = textsprite.create("Locked")
        chainReactionUpgrade = textsprite.create("Unlock for $" + chainUnlockCost + "?")
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
    4000,
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
    squishPrompt.setPosition(400, 36)
    animation.runMovementAnimation(
    squishPrompt,
    animation.animationPresets(animation.bobbing),
    5500,
    true
    )
}
function setPlayerSpeed (selection: number) {
    playerSpeed = selection
    if (playerSpeed == 1) {
        controller.moveSprite(mySprite, 70, 0)
    } else if (playerSpeed == 2) {
        controller.moveSprite(mySprite, 90, 0)
    } else if (playerSpeed == 3) {
        controller.moveSprite(mySprite, 110, 0)
    } else if (playerSpeed == 4) {
        controller.moveSprite(mySprite, 130, 0)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv1Forward`, function (sprite, location) {
    setupLevel(1)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tutForward`, function (sprite, location) {
    setupLevel(0)
})
function reloadMainTilemap () {
    tiles.setCurrentTilemap(tilemap`level1`)
    if (maxLevelAttained >= 1) {
        openLevel1()
    }
    if (maxLevelAttained >= 2) {
        openLevel2()
    }
    if (maxLevelAttained >= 3) {
        openLevel3()
    }
    if (maxLevelAttained >= 4) {
        openLevel4()
    }
    if (maxLevelAttained >= 5) {
        openInf()
    }
}
function updateFlowerRateShopText () {
    flowerTitle = fancyText.create("Flower Spawnrate", 0, 0, fancyText.serif_small)
    // Update flower rate texts
    if (flowerRate == 1) {
        flowerLevel = textsprite.create("Lv 1/3: 60s")
        flowerUpgrade = textsprite.create("Buy 45s for $" + flowerLv2Cost + "?")
    } else if (flowerRate == 2) {
        flowerLevel = textsprite.create("Lv 2/3: 45s")
        flowerUpgrade = textsprite.create("Buy 30s for $" + flowerLv3Cost + "?")
    } else if (flowerRate == 3) {
        flowerLevel = textsprite.create("Lv 3/3: 30s")
        flowerUpgrade = textsprite.create("MAXED", 0, 7)
    }
    flowerTitle.setKind(SpriteKind.ShopText)
    flowerLevel.setKind(SpriteKind.ShopText)
    flowerUpgrade.setKind(SpriteKind.ShopText)
    tiles.placeOnTile(flowerTitle, tiles.getTileLocation(48, 27))
    tiles.placeOnTile(flowerLevel, tiles.getTileLocation(48, 28))
    tiles.placeOnTile(flowerUpgrade, tiles.getTileLocation(48, 30))
}
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    if (gameStarted && !(endCutscene) && mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -150
    }
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
function scorePopup (text: string, x: number, y: number) {
    textSprite = textsprite.create(text)
    textSprite.setOutline(1, 15)
    textSprite.setPosition(x, y)
    textSprite.ay = 40
    textSprite.vy = -40
    textSprite.lifespan = 1000
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`shopLucky`, function (sprite, location) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(location.column, location.row + 2))
    sprite.setVelocity(0, 0)
    if (luckySquishRate == 4 && info.score() >= luckyLv2Cost) {
        info.changeScoreBy(0 - luckyLv2Cost)
        luckySquishRate = 8
        music.play(music.createSoundEffect(WaveShape.Square, 1, 957, 255, 255, 200, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else if (luckySquishRate == 8 && info.score() >= luckyLv3Cost) {
        info.changeScoreBy(0 - luckyLv3Cost)
        luckySquishRate = 12
        music.play(music.createSoundEffect(WaveShape.Square, 254, 1264, 255, 255, 200, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else if (luckySquishRate == 12 && info.score() >= luckyLv4Cost) {
        info.changeScoreBy(0 - luckyLv4Cost)
        luckySquishRate = 16
        music.play(music.createSoundEffect(WaveShape.Square, 518, 1703, 255, 255, 200, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else if (luckySquishRate == 16) {
        sprite.sayText("already maxed out!", 2000, false)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    } else {
        sprite.sayText("not enough moolah :(", 2000, false)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    }
    updateAllShopText()
})
function updateScoreboard (score: number) {
    doublecheckThresholds()
    if (lastSelectedLevel == 0) {
        fancyText.setText(boardTitleText, "TUT")
        fancyText.setText(boardScoreText, "" + score + "/" + tutCompleteThreshold)
        setColorGreenIfLevelComplete(0)
    } else if (lastSelectedLevel == 1) {
        fancyText.setText(boardTitleText, "LV1")
        fancyText.setText(boardScoreText, "" + score + "/" + lv1CompleteThreshold)
        setColorGreenIfLevelComplete(1)
    } else if (lastSelectedLevel == 2) {
        fancyText.setText(boardTitleText, "LV2")
        fancyText.setText(boardScoreText, "" + score + "/" + lv2CompleteThreshold)
        setColorGreenIfLevelComplete(2)
    } else if (lastSelectedLevel == 3) {
        fancyText.setText(boardTitleText, "LV3")
        fancyText.setText(boardScoreText, "" + score + "/" + lv3CompleteThreshold)
        setColorGreenIfLevelComplete(3)
    } else if (lastSelectedLevel == 4) {
        fancyText.setText(boardTitleText, "LV4")
        fancyText.setText(boardScoreText, "" + score + "/" + lv4CompleteThreshold / 1000 + "k")
        setColorGreenIfLevelComplete(4)
    } else if (lastSelectedLevel == 5) {
        fancyText.setText(boardTitleText, "INF")
        fancyText.setText(boardScoreText, convertToText(score))
        setColorGreenIfLevelComplete(5)
    }
    fancyText.setText(countScoreText, "$" + score)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`shop`, function (sprite, location) {
    returnPoint = tiles.getTileLocation(location.column, location.row + 2)
    isInShop = true
    lastSelectedLevel = 999
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    music.stopAllSounds()
    music.play(music.createSong(assets.song`shopTheme`), music.PlaybackMode.LoopingInBackground)
    scroller.setLayerImage(scroller.BackgroundLayer.Layer1, assets.image`tmp`)
    tiles.setCurrentTilemap(tilemap`level2`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(3, 31))
    mySprite.setVelocity(0, 0)
    updateAllShopText()
    hideScoreboard()
    showScoreCount()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameStarted && !(endCutscene) && (chainReaction && (!(isInShop) && !(cooldown)))) {
        cooldown = sprites.create(assets.image`tmp`, SpriteKind.CooldownTimer)
        cooldown.lifespan = 25000
        chainActive = true
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            if (sprites.readDataBoolean(value, "squishable")) {
                squish(value)
            }
        }
        chainActive = false
        animation.runImageAnimation(
        chainUI,
        assets.animation`chainRefillAnim`,
        1500,
        false
        )
    } else if (!(gameStarted) && titleScreenActive) {
        titleScreenActive = false
        music.stopAllSounds()
        music.play(music.createSong(assets.song`startJingle`), music.PlaybackMode.InBackground)
        animation.stopAnimation(animation.AnimationTypes.All, textSprite2)
        timer.background(function () {
            for (let index = 0; index < 4; index++) {
                textSprite2.setFlag(SpriteFlag.Invisible, true)
                pause(100)
                textSprite2.setFlag(SpriteFlag.Invisible, false)
                pause(100)
            }
        })
        timer.after(1500, function () {
            color.startFade(color.originalPalette, color.Black, 500)
        })
        timer.after(2000, function () {
            sprites.destroy(textSprite2)
            startGame()
        })
    }
})
function updateSpeedShopText () {
    speedTitle = fancyText.create("Player Speed", 0, 0, fancyText.serif_small)
    // Update player gravity texts
    if (playerSpeed == 1) {
        speedLevel = textsprite.create("Lv 1/4: 70")
        speedUpgrade = textsprite.create("Buy 90 for $" + speedLv2Cost + "?")
    } else if (playerSpeed == 2) {
        speedLevel = textsprite.create("Lv 2/4: 90")
        speedUpgrade = textsprite.create("Buy 110 for $" + speedLv3Cost + "?")
    } else if (playerSpeed == 3) {
        speedLevel = textsprite.create("Lv 3/4: 110")
        speedUpgrade = textsprite.create("Buy 130 for $" + speedLv4Cost + "?")
    } else if (playerSpeed == 4) {
        speedLevel = textsprite.create("Lv 4/4: 130")
        speedUpgrade = textsprite.create("MAXED", 0, 7)
    }
    speedTitle.setKind(SpriteKind.ShopText)
    speedLevel.setKind(SpriteKind.ShopText)
    speedUpgrade.setKind(SpriteKind.ShopText)
    tiles.placeOnTile(speedTitle, tiles.getTileLocation(40, 27))
    tiles.placeOnTile(speedLevel, tiles.getTileLocation(40, 28))
    tiles.placeOnTile(speedUpgrade, tiles.getTileLocation(40, 30))
}
function summonFlower () {
    // dont spawn for tutorial and end
    if (curLevel < 1 || curLevel > 5) {
        return
    }
    // only 3 flowers can exist at once
    if (sprites.allOfKind(SpriteKind.Flower).length > 3) {
        return
    }
    makeFlowerUIPopup()
    // set its location based on current level
    if (curLevel == 1) {
        curLevelFlowerLocations = lv1FlowerLocations
    } else if (curLevel == 2) {
        curLevelFlowerLocations = lv2FlowerLocations
    } else if (curLevel == 3) {
        curLevelFlowerLocations = lv3FlowerLocations
    } else if (curLevel == 4) {
        curLevelFlowerLocations = lv4FlowerLocations
    } else if (curLevel == 5) {
        curLevelFlowerLocations = lv5FlowerLocations
    }
    newFlower = sprites.create(assets.image`evilFlower`, SpriteKind.Flower)
    newFlower.z = 5
    overlappingWithAnotherFlower = true
    // ensure flowers do not overlap
    while (overlappingWithAnotherFlower) {
        tiles.placeOnTile(newFlower, curLevelFlowerLocations._pickRandom())
        overlappingWithAnotherFlower = false
        for (let value2 of sprites.allOfKind(SpriteKind.Flower)) {
            if (mySprite.overlapsWith(value2)) {
                overlappingWithAnotherFlower = true
            }
        }
    }
}
function startGame () {
    sprites.destroyAllSpritesOfKind(SpriteKind.NoInteractions)
    info.showScore(false)
info.setScore(0)
    tiles.setCurrentTilemap(tilemap`level1`)
    mySprite = sprites.create(assets.image`idle`, SpriteKind.Player)
    mySprite.ay = 450
    mySprite.z = 999
    tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 4))
    scene.cameraFollowSprite(mySprite)
    lastSelectedLevel = -1
    maxLevelAttained = 0
    curLevel = -1
    endCutscene = false
    gameStarted = true
    partyActive = false
    setupTutorial()
    setupEnding()
    setupShopUpgrades()
    setupLists()
    setupScoreboardUI()
    hideScoreboard()
    hideScorecount()
    setupPartyUI()
    updateUpgradeUI()
    setupFlowerLocations()
    setupChainReactionUI()
    color.startFade(color.Black, color.originalPalette, 500)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`shopSpeed`, function (sprite, location) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(location.column, location.row + 2))
    sprite.setVelocity(0, 0)
    if (playerSpeed == 1 && info.score() >= speedLv2Cost) {
        info.changeScoreBy(0 - speedLv2Cost)
        setPlayerSpeed(2)
        music.play(music.createSoundEffect(WaveShape.Square, 1, 957, 255, 255, 200, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else if (playerSpeed == 2 && info.score() >= speedLv3Cost) {
        info.changeScoreBy(0 - speedLv3Cost)
        setPlayerSpeed(3)
        music.play(music.createSoundEffect(WaveShape.Square, 254, 1264, 255, 255, 200, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else if (playerSpeed == 3 && info.score() >= speedLv4Cost) {
        info.changeScoreBy(0 - speedLv4Cost)
        setPlayerSpeed(4)
        music.play(music.createSoundEffect(WaveShape.Square, 518, 1703, 255, 255, 200, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else if (playerSpeed == 4) {
        sprite.sayText("already maxed out!", 2000, false)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    } else {
        sprite.sayText("not enough moolah :(", 2000, false)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    }
    updateAllShopText()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`infForward`, function (sprite, location) {
    setupLevel(5)
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
    evilFlowersEffect = extraEffects.createCustomSpreadEffectData(
    [10, 15],
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Spark),
    extraEffects.createPercentageRange(0, 0),
    extraEffects.createPercentageRange(0, 100),
    extraEffects.createTimeRange(2000, 3000),
    0,
    -60,
    extraEffects.createPercentageRange(0, 100),
    -30,
    0,
    5000
    )
    flowerExplodeEffect = extraEffects.createCustomSpreadEffectData(
    [10, 15],
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Cloud),
    extraEffects.createPercentageRange(0, 0),
    extraEffects.createPercentageRange(0, 100),
    extraEffects.createTimeRange(2000, 3000),
    0,
    -60,
    extraEffects.createPercentageRange(0, 100),
    -30,
    0,
    5000
    )
    flowerSmogHorizontalEffect = extraEffects.createCustomSpreadEffectData(
    [
    10,
    15,
    10,
    15
    ],
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Cloud),
    extraEffects.createPercentageRange(50, 100),
    extraEffects.createPercentageRange(50, 100),
    extraEffects.createTimeRange(5000, 5000),
    100,
    0,
    extraEffects.createPercentageRange(50, 100),
    0,
    0,
    5000
    )
    flowerSmogVerticalEffect = extraEffects.createCustomSpreadEffectData(
    [
    10,
    15,
    10,
    15
    ],
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Cloud),
    extraEffects.createPercentageRange(50, 100),
    extraEffects.createPercentageRange(50, 100),
    extraEffects.createTimeRange(5000, 5000),
    0,
    150,
    extraEffects.createPercentageRange(50, 100),
    0,
    0,
    5000
    )
    wateringCanEffect = extraEffects.createCustomSpreadEffectData(
    [10, 15],
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Twinkle),
    extraEffects.createPercentageRange(50, 100),
    extraEffects.createPercentageRange(50, 100),
    extraEffects.createTimeRange(1000, 1000),
    70,
    -80,
    extraEffects.createPercentageRange(50, 100),
    200,
    0,
    500
    )
}
scene.onOverlapTile(SpriteKind.Enemy, sprites.dungeon.hazardLava1, function (sprite, location) {
    extraEffects.createSpreadEffectAt(enemyBurnEffect, (location.column + 0.5) * 16, location.row * 16, 100, 40)
    music.play(music.createSoundEffect(WaveShape.Noise, 3992, 4645, 255, 0, 300, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    sprites.destroy(sprite)
})
info.onScore(15, function () {
    if (maxLevelAttained == 0) {
        openLevel1()
        music.play(music.melodyPlayable(music.siren), music.PlaybackMode.InBackground)
        maxLevelAttained = 1
        timer.after(500, function () {
            game.showLongText("You unlocked level 1!", DialogLayout.Center)
        })
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameStarted && !(endCutscene)) {
        animation.stopAnimation(animation.AnimationTypes.All, mySprite)
        if (controller.right.isPressed()) {
            mySprite.setImage(assets.image`idle`)
        } else {
            animation.runImageAnimation(
            mySprite,
            assets.animation`walkLeft`,
            175 - playerSpeed * 25,
            true
            )
        }
    }
})
function setupEnding () {
    storyEndText = sprites.create(assets.image`storyEndText`, SpriteKind.NoInteractions)
    storyEndText.setPosition(3344, 84)
    animation.runMovementAnimation(
    storyEndText,
    animation.animationPresets(animation.bobbing),
    4500,
    true
    )
    congratsEndText = sprites.create(assets.image`congratsEndText`, SpriteKind.NoInteractions)
    congratsEndText.setPosition(3536, 136)
    animation.runMovementAnimation(
    congratsEndText,
    animation.animationPresets(animation.bobbing),
    5000,
    true
    )
}
function TURN_ON_THE_LIGHTS () {
    if (!(partyActive)) {
        partyFX.setFlag(SpriteFlag.Invisible, false)
        partyActive = true
        timer.after(6000, function () {
            for (let index = 0; index < 4; index++) {
                music.play(music.createSoundEffect(WaveShape.Sawtooth, 2713, 2142, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                pause(150)
            }
            music.play(music.createSoundEffect(WaveShape.Sawtooth, 2713, 2142, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        })
        timer.after(6800, function () {
            for (let index = 0; index < 2; index++) {
                partyFX.setFlag(SpriteFlag.Invisible, true)
                pause(300)
                partyFX.setFlag(SpriteFlag.Invisible, false)
                pause(300)
            }
            partyFX.setFlag(SpriteFlag.Invisible, true)
            partyActive = false
        })
    }
}
info.onScore(300, function () {
    if (maxLevelAttained == 1) {
        openLevel2()
        music.play(music.melodyPlayable(music.siren), music.PlaybackMode.InBackground)
        maxLevelAttained = 2
        timer.after(500, function () {
            game.showLongText("You unlocked level 2!", DialogLayout.Center)
        })
    }
})
function openLevel2 () {
    tiles.setTileAt(tiles.getTileLocation(76, 4), assets.tile`lv2Forward`)
    tiles.setWallAt(tiles.getTileLocation(76, 4), false)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`shopSpawnRate`, function (sprite, location) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(location.column, location.row + 2))
    sprite.setVelocity(0, 0)
    if (spawnRate == 1 && info.score() >= spawnLv2Cost) {
        info.changeScoreBy(0 - spawnLv2Cost)
        spawnRate = 2
        music.play(music.createSoundEffect(WaveShape.Square, 1, 957, 255, 255, 200, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else if (spawnRate == 2 && info.score() >= spawnLv3Cost) {
        info.changeScoreBy(0 - spawnLv3Cost)
        spawnRate = 3
        music.play(music.createSoundEffect(WaveShape.Square, 254, 1264, 255, 255, 200, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else if (spawnRate == 3 && info.score() >= spawnLv4Cost) {
        info.changeScoreBy(0 - spawnLv4Cost)
        spawnRate = 4
        music.play(music.createSoundEffect(WaveShape.Square, 518, 1703, 255, 255, 200, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else if (spawnRate == 4) {
        sprite.sayText("already maxed out!", 2000, false)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    } else {
        sprite.sayText("not enough moolah :(", 2000, false)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    }
    updateAllShopText()
})
function storyPart4 () {
    sprites.destroyAllSpritesOfKind(SpriteKind.NoInteractions)
    scene.setBackgroundImage(assets.image`lv4BG`)
    tiles.setCurrentTilemap(tilemap`cutsceneTilemap4`)
    s1 = sprites.create(assets.image`bat`, SpriteKind.NoInteractions)
    tiles.placeOnTile(s1, tiles.getTileLocation(7, 1))
    s1.z = 10
    s2 = sprites.create(assets.image`snake`, SpriteKind.NoInteractions)
    tiles.placeOnTile(s2, tiles.getTileLocation(2, 3))
    s2.z = 10
    s3 = sprites.create(assets.image`ghost`, SpriteKind.NoInteractions)
    tiles.placeOnTile(s3, tiles.getTileLocation(5, 6))
    s3.z = 10
    color.startFade(color.Black, color.originalPalette, 500)
    timer.after(2000, function () {
        music.play(music.createSoundEffect(WaveShape.Noise, 1879, 1, 255, 0, 1000, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
        animation.runImageAnimation(
        s1,
        assets.animation`batAnim`,
        200,
        true
        )
        extraEffects.createSpreadEffectOnAnchor(s1, flowerExplodeEffect, 100)
        animation.runImageAnimation(
        s2,
        assets.animation`snakeAnim`,
        200,
        true
        )
        extraEffects.createSpreadEffectOnAnchor(s2, flowerExplodeEffect, 100)
        animation.runImageAnimation(
        s3,
        assets.animation`ghostAnim`,
        200,
        true
        )
        extraEffects.createSpreadEffectOnAnchor(s3, flowerExplodeEffect, 100)
    })
    pause(4000)
    color.startFade(color.originalPalette, color.Black, 500)
    pause(500)
    storyPart5()
}
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    if (gameStarted && !(endCutscene)) {
        animation.stopAnimation(animation.AnimationTypes.All, mySprite)
        if (controller.left.isPressed()) {
            animation.runImageAnimation(
            mySprite,
            assets.animation`walkLeft`,
            175 - playerSpeed * 25,
            true
            )
        } else {
            mySprite.setImage(assets.image`idle`)
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    if (gameStarted && !(endCutscene)) {
        animation.stopAnimation(animation.AnimationTypes.All, mySprite)
        if (controller.right.isPressed()) {
            animation.runImageAnimation(
            mySprite,
            assets.animation`walkRight`,
            175 - playerSpeed * 25,
            true
            )
        } else {
            mySprite.setImage(assets.image`idle`)
        }
    }
})
function storyPart2 () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Flower)
    sprites.destroyAllSpritesOfKind(SpriteKind.NoInteractions)
    scene.setBackgroundImage(assets.image`lv2BG`)
    tiles.setCurrentTilemap(tilemap`cutsceneTilemap2`)
    scene.centerCameraAt(80, 60)
    s1 = sprites.create(assets.image`car`, SpriteKind.NoInteractions)
    tiles.placeOnTile(s1, tiles.getTileLocation(7, 5))
    s1.z = 10
    s2 = sprites.create(assets.image`football guy`, SpriteKind.NoInteractions)
    tiles.placeOnTile(s2, tiles.getTileLocation(6, 2))
    s2.z = 10
    s3 = sprites.create(assets.image`dino`, SpriteKind.NoInteractions)
    tiles.placeOnTile(s3, tiles.getTileLocation(1, 4))
    s3.z = 10
    color.startFade(color.Black, color.originalPalette, 500)
    timer.after(2000, function () {
        music.play(music.createSoundEffect(WaveShape.Noise, 1879, 1, 255, 0, 1000, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
        animation.runImageAnimation(
        s1,
        assets.animation`carAnim`,
        220,
        true
        )
        extraEffects.createSpreadEffectOnAnchor(s1, flowerExplodeEffect, 100)
        animation.runImageAnimation(
        s2,
        assets.animation`guyAnim`,
        200,
        true
        )
        extraEffects.createSpreadEffectOnAnchor(s2, flowerExplodeEffect, 100)
        animation.runImageAnimation(
        s3,
        assets.animation`dinoAnim`,
        180,
        true
        )
        extraEffects.createSpreadEffectOnAnchor(s3, flowerExplodeEffect, 100)
    })
    pause(4000)
    color.startFade(color.originalPalette, color.Black, 500)
    pause(500)
    storyPart3()
}
function openLevel4 () {
    tiles.setTileAt(tiles.getTileLocation(132, 4), assets.tile`lv4Forward`)
    tiles.setWallAt(tiles.getTileLocation(132, 4), false)
}
function updateLuckySquishRateShopText () {
    luckySquishTitle = fancyText.create("Lucky Squish Rate", 0, 0, fancyText.serif_small)
    // Update lucky squish rate texts
    if (luckySquishRate == 4) {
        luckySquishLevel = textsprite.create("Lv 1/4: 4%")
        luckySquishUpgrade = textsprite.create("Buy 8% for $" + luckyLv2Cost + "?")
    } else if (luckySquishRate == 8) {
        luckySquishLevel = textsprite.create("Lv 2/4: 8%")
        luckySquishUpgrade = textsprite.create("Buy 12% for $" + luckyLv3Cost + "?")
    } else if (luckySquishRate == 12) {
        luckySquishLevel = textsprite.create("Lv 3/4: 12%")
        luckySquishUpgrade = textsprite.create("Buy 16% for $" + luckyLv4Cost + "?")
    } else if (luckySquishRate == 16) {
        luckySquishLevel = textsprite.create("Lv 4/4: 16%")
        luckySquishUpgrade = textsprite.create("MAXED", 0, 7)
    }
    luckySquishTitle.setKind(SpriteKind.ShopText)
    luckySquishLevel.setKind(SpriteKind.ShopText)
    luckySquishUpgrade.setKind(SpriteKind.ShopText)
    tiles.placeOnTile(luckySquishTitle, tiles.getTileLocation(32, 27))
    tiles.placeOnTile(luckySquishLevel, tiles.getTileLocation(32, 28))
    tiles.placeOnTile(luckySquishUpgrade, tiles.getTileLocation(32, 30))
}
function openLevel1 () {
    tiles.setTileAt(tiles.getTileLocation(43, 4), sprites.builtin.forestTiles10)
    tiles.setWallAt(tiles.getTileLocation(43, 4), false)
}
function setupFlowerLocations () {
    lv1FlowerLocations = [tiles.getTileLocation(55, 5), tiles.getTileLocation(64, 6), tiles.getTileLocation(69, 5)]
    lv2FlowerLocations = [tiles.getTileLocation(83, 5), tiles.getTileLocation(90, 4), tiles.getTileLocation(93, 8)]
    lv3FlowerLocations = [tiles.getTileLocation(111, 5), tiles.getTileLocation(115, 8), tiles.getTileLocation(121, 4)]
    lv4FlowerLocations = [tiles.getTileLocation(142, 3), tiles.getTileLocation(145, 14), tiles.getTileLocation(152, 5)]
    lv5FlowerLocations = [tiles.getTileLocation(167, 5), tiles.getTileLocation(174, 7), tiles.getTileLocation(187, 10)]
}
info.onScore(6000, function () {
    if (maxLevelAttained == 3) {
        openLevel4()
        music.play(music.melodyPlayable(music.siren), music.PlaybackMode.InBackground)
        maxLevelAttained = 4
        timer.after(500, function () {
            game.showLongText("You unlocked level 4!", DialogLayout.Center)
        })
    }
})
function showScoreboard () {
    scoreboardBG.setFlag(SpriteFlag.Invisible, false)
    boardTitleText.setFlag(SpriteFlag.Invisible, false)
    boardScoreTitleText.setFlag(SpriteFlag.Invisible, false)
    boardScoreText.setFlag(SpriteFlag.Invisible, false)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`shopMultiplier`, function (sprite, location) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(location.column, location.row + 2))
    sprite.setVelocity(0, 0)
    if (scoreMultiplier == 1 && info.score() >= multLv2Cost) {
        info.changeScoreBy(0 - multLv2Cost)
        scoreMultiplier = 2
        music.play(music.createSoundEffect(WaveShape.Square, 1, 957, 255, 255, 200, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else if (scoreMultiplier == 2 && info.score() >= multLv3Cost) {
        info.changeScoreBy(0 - multLv3Cost)
        scoreMultiplier = 3
        music.play(music.createSoundEffect(WaveShape.Square, 254, 1264, 255, 255, 200, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else if (scoreMultiplier == 3 && info.score() >= multLv4Cost) {
        info.changeScoreBy(0 - multLv4Cost)
        scoreMultiplier = 4
        music.play(music.createSoundEffect(WaveShape.Square, 518, 1703, 255, 255, 200, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else if (scoreMultiplier == 4) {
        sprite.sayText("already maxed out!", 2000, false)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    } else {
        sprite.sayText("not enough moolah :(", 2000, false)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    }
    updateAllShopText()
})
function openLevel3 () {
    tiles.setTileAt(tiles.getTileLocation(104, 4), assets.tile`lv3Forward`)
    tiles.setWallAt(tiles.getTileLocation(104, 4), false)
}
function setupPartyUI () {
    partyFX = sprites.create(assets.image`partyFXBase`, SpriteKind.NoInteractions)
    partyFX.setFlag(SpriteFlag.RelativeToCamera, true)
    partyFX.setFlag(SpriteFlag.Invisible, true)
    partyFX.setPosition(80, 60)
    partyFX.z = 9999
}
function setupChainReactionUI () {
    chainUI = sprites.create(assets.image`chainLocked`, SpriteKind.NoInteractions)
    chainUI.setPosition(144, 100)
    chainUI.z = 21
    chainUI.setFlag(SpriteFlag.RelativeToCamera, true)
}
function updateAllShopText () {
    sprites.destroyAllSpritesOfKind(SpriteKind.ShopText)
    updateScoreboard(info.score())
    updateUpgradeUI()
    updateSpawnRateShopText()
    updateScoreMultiplierShopText()
    updateSpeedShopText()
    updateLuckySquishRateShopText()
    updateFlowerRateShopText()
    updateChainReactionShopText()
}
function updateSpawnRateShopText () {
    spawnRateTitle = fancyText.create("Enemy Spawn Rate", 0, 0, fancyText.serif_small)
    // Update spawn rate texts
    if (spawnRate == 1) {
        spawnRateLevel = textsprite.create("Lv 1/4: 2s")
        spawnRateUpgrade = textsprite.create("Buy 1s for $" + spawnLv2Cost + "?")
    } else if (spawnRate == 2) {
        spawnRateLevel = textsprite.create("Lv 2/4: 1s")
        spawnRateUpgrade = textsprite.create("Buy 0.5s for $" + spawnLv3Cost + "?")
    } else if (spawnRate == 3) {
        spawnRateLevel = textsprite.create("Lv 3/4: 0.5s")
        spawnRateUpgrade = textsprite.create("Buy 0.25s for $" + spawnLv4Cost + "?")
    } else if (spawnRate == 4) {
        spawnRateLevel = textsprite.create("Lv 4/4: 0.25s")
        spawnRateUpgrade = textsprite.create("MAXED", 0, 7)
    }
    spawnRateTitle.setKind(SpriteKind.ShopText)
    spawnRateLevel.setKind(SpriteKind.ShopText)
    spawnRateUpgrade.setKind(SpriteKind.ShopText)
    tiles.placeOnTile(spawnRateTitle, tiles.getTileLocation(16, 27))
    tiles.placeOnTile(spawnRateLevel, tiles.getTileLocation(16, 28))
    tiles.placeOnTile(spawnRateUpgrade, tiles.getTileLocation(16, 30))
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv4Forward`, function (sprite, location) {
    setupLevel(4)
})
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    if (!(sprites.readDataBoolean(sprite, "grounded"))) {
        sprites.setDataBoolean(sprite, "grounded", true)
        if (sprites.readDataBoolean(sprite, "squishable")) {
            sprite.ay = 400
            if (Math.percentChance(50)) {
                flip(sprite)
                sprite.vx = 50
            } else {
                sprite.vx = -50
            }
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
    if (gameStarted && !(endCutscene)) {
        animation.stopAnimation(animation.AnimationTypes.All, mySprite)
        if (controller.left.isPressed()) {
            mySprite.setImage(assets.image`idle`)
        } else {
            animation.runImageAnimation(
            mySprite,
            assets.animation`walkRight`,
            175 - playerSpeed * 25,
            true
            )
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    info.changeScoreBy(-4)
    updateScoreboard(info.score())
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    timer.throttle("action", 100, function () {
        extraEffects.createSpreadEffectAt(extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Explosion), otherSprite.x, otherSprite.y, 100, 30, 20)
    })
})
function titleScreen () {
    sprites.destroyAllSpritesOfKind(SpriteKind.NoInteractions)
    scene.setBackgroundImage(assets.image`tmp`)
    tiles.setCurrentTilemap(tilemap`none`)
    scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`stars`)
    color.startFade(color.Black, color.originalPalette, 500)
    pause(100)
    music.play(music.createSong(assets.song`menuTheme`), music.PlaybackMode.LoopingInBackground)
    titleScreenActive = true
    title = sprites.create(img`
        ..................................................................................11111111111...111111..................
        ...........111111111...........11111.........11111111111.........................11faffaffaa1...1fafa1......11111.......
        .........111afaffaaa11........1affa111......1ffffaafaafa1111.....11111111.......1ffafafaaaff1...1aaffa1.....1ffa11......
        .......11faffaffaafaf11.......1ffafaa11.....1afaffaafffafaa11....1afffaa11111...1afffafffafa1...1faaaa1.....1afaf1......
        .......1aafafaaaffaffa1.......1faaffaa1.....1fffaf11111afffa1....1faffafaffa11..11aafafafaaf1...1affaf11....1afaa1......
        ......1affaaa1111afaff1......1faffffaf11....1ffa11....11aaff1....1afaffaaaffa1...1faaffaaf111...1aafaaa1....1aaff1......
        .....11afaf11....11faf1......1afa111afa1....1aff1...11affaff1....1affaffffafa11..1fff11111......1affafa1....1ffaf1......
        .....1faaf1........111.......1af11.1faaf1...1afa1111aaafafa11....1fafafaaffafa1..1afa1..........1fffaafa1...1affa1......
        ....1afaf1...................1fa1..1aaff1...1ffaafafaffaa111.....1a91111aa9aff1..1ff91..........1faa99af1...11aff1......
        ....1aaa1....................1af111199fa1...11a999f9911111.......19911.1199a991..19991..........19f9999aa1...19af1......
        ....1a991....................1999999a9991....19f9999a11..........1a991..119f991..19a911111......19999999a1...19f91......
        ....1f91.........1111111111..19a999999991....199a9999911.........19991...119991..199999f91......19a9999991...1aa91......
        ...19991.....11111999f99991.199999999aa991...19a99999f91.........199991...199991.199999aa1......19a99199991..19ff1......
        ...19a91.....19999999a99991.1999999119f991...199f1119a911........199991....19991.19f9999a1......11f99119991..19f91......
        ...19991.....1f999999991111.1f99111.19a991....19991119a911........1f991....1f991.199111911.......19f91199f1..19a91......
        ...199f1.....19911999a91...119911...19ff91....19f91.119991........1aa91....1a991.1991..11........19a91.19a11.19a991.....
        ...199911....11111199f91...19911....199f991...19a91..199f91.......19a91...11f911.1f991...........19991..1991.199991.....
        ....19a91.........199a91...19a1.....199a991...19a91..119991.......19a91..119991..1f991...........19991..19991199f91.....
        ....199911........199f91..119a1.....1999991...19aa1...19a911......19a91.1199991..19a91...........19a91..1a991199991.....
        ....19f9911......1199991..19f11.....19a99991..19f91...199f91......19f9111999f91..19991...........199991.1fa99999991.....
        .....1a999111111119999f1..1991......19f99991..19991...199a991.....11f911999fa11..19a91111111111..199991..1f9999a991.....
        .....1a999999f999999991..199a1......19999991..19f91...19999911.....19999999991...19a99999a99991..19a991..1f9999f991.....
        ......1999999a999999911..199a1......19a99991..19a11....19f9991.....1f99999a911...19f99999f99991..19f991..1a9999f991.....
        ......119999f999999911...199f1......19f99991..1a91.....19f99911....1a9999aa11....19f99999f99911..1af991..1a9999a991.....
        .......11999a9999991.....119a1......19f99991..1f91.....19f99991...11a9999a11.....19a99999ff991..11a9991..1999999991.....
        .........1111111111.......1111......11111111..1191.....19a99991...19f99911.......111199999a991..19a9991...1999f9991.....
        ...............................................111.....11111111...111111............1111111111..19f9991...199af9991.....
        ................................................................................................1111111...119a99991.....
        ...........................................................................................................11111111.....
        ........................................................................................................................
        ........................................................................................................................
        ................eeeee....eeeeeeeeeeeeeee.....eee..........................................................eeeeeeee......
        ...........eeeeee5544ee.ee4555455445554ee..ee554ee......e...........ee.....eeeeeeeee....eeeeeeeeeee.....eee445555eee....
        .......eeeee4444444444eee544444444444444e.ee44444e....eeeee........eeee..eee4555445e...e4555444445ee...ee5544444444ee...
        .....eee555544444444444eee44444444444eeeeee544444ee...e455e.......ee55e.ee544eeee44ee..e44444444444e...e544444444445ee..
        ....ee55444444444444444e.eeeee4444eeee..ee54444444e..ee444e.......e545e.e544ee..e444e..e44444444444e...e444eeeeee4444e..
        ...ee444444eee444444444e.....e4444e....ee544444444e..e4444ee.....ee445e.e44ee.eee444e..e44444444444e...e44ee....e4444e..
        ...e444444ee.eeeee4444ee.....e4444e...ee4444444444e..e54444e....ee4444e.e44eeee5444ee.ee444eeee444ee..ee44e.....e4444e..
        ...e44444ee.......eeeee......e4444e...e54444444444e..e54444ee...e54444e.e4445554444e..e4444e..eeeee...e444eeeeeee4444e..
        ...e44444ee..................e444ee..ee5444eee4444e..e444444e..ee54444e.e444444eeeee..e444ee..........e4444445554444ee..
        ...e444444eee................e444e...e5444ee.ee444e..e444444e..e544444e.e4444eee......e444e...........e4444444444eeee...
        ...e44444444eeeeee...........e444e..ee544ee...e444e.ee444444e.ee544444e.e4444e........e444e...........e444444eeeee......
        ...ee4444444444444eee........e444e..e4444e....e444e.e4444444eee444444ee.e4444e........e444eeee........e444444e..........
        .....e44444444444444ee.......e44ee..e444ee...e4444e.e44444444e4444444e..ee444e........e444455eee......e444444ee.........
        .....eeee4444444444444e.....ee44e...e444e....e4444e.e44444444e4444444e...e444ee.......e44444445e......e44ee444ee........
        .........eeee444444444ee....e444e...e444e....e4444e.e444ee44444444444e...e4444e.......e44444444e......e44eeee44ee.......
        ............ee444444444e....e444e...ee44e...ee4444e.e44eee444444eee44e...e4444e.......e444eee4ee......e444e.ee44ee......
        .............ee44444444e...ee444e....e44eeeee44444e.e44e.ee44444e.ee4e...e44444e......e44ee.eee.......e444e..e444ee.....
        ............ee444444444e...e444ee....e444444444444e.e44e..e44444e..e4e...e44444e......e44e............e444ee..e444e.....
        ...eeeeeeeeee4444444444e...e444e.....e444444444444e.e44e..e4444ee..e4e...e4444e.......e44e.............e444e..ee444e....
        ..ee445555444444444444ee...e444e.....e44444444444ee.ee4e..e4444e...e4e...e4444e.......e444ee...........e444ee..e444e....
        ..e44444444444444444eee....e444e.....e44444444444e...e4e..ee444e...e4e...e4444e.......e4445eeeeeeee....e4444e..e444ee...
        ..e4444447444444477ee....774444e.....e44444444444e...e4e...e4475...e44e..e4544e...7...e74444474755e....e4444e..74444e...
        ..e474444744777eee5....7757444ee.75.7e777477744475..ee4e...5747..7.e777..7574ee...777.774477447774e.77777447757774447...
        ..e75ee7777eee577.75.77.75777ee.77.7577eee77e7777557ee777777e7777.77e777.757e777.775.7e77ee77577ee7.7..77777.77.77ee57..
        ..77757777757777777777777777775777777775777777757777777777577777777757777777777775777777557777777777777755777777755775..
        ..777777777777775577775577777777777775577777777777777767777777577777767777777776777777777777777555577767776777777777776.
        .676676667777777777777667777766666776677677777677767777677777777777777677666667776666667777776777777666666767766766676..
        6667677666667766666677676777766667777777767767667666676666677666676767677667776767777677766666666677666667667677766666.6
        666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
        `, SpriteKind.NoInteractions)
    title.setPosition(80, 50)
    textSprite2 = textsprite.create("Press A to start")
    textSprite2.setOutline(1, 15)
    textSprite2.setPosition(80, 100)
    animation.runMovementAnimation(
    textSprite2,
    animation.animationPresets(animation.bobbing),
    10000,
    true
    )
}
function stompFlower (sprite: Sprite) {
    extraEffects.createSpreadEffectOnAnchor(sprite, flowerExplodeEffect, 100)
    sprites.destroy(sprite)
    TURN_ON_THE_LIGHTS()
}
info.onScore(2500, function () {
    if (maxLevelAttained == 2) {
        openLevel3()
        music.play(music.melodyPlayable(music.siren), music.PlaybackMode.InBackground)
        maxLevelAttained = 3
        timer.after(500, function () {
            game.showLongText("You unlocked level 3!", DialogLayout.Center)
        })
    }
})
function storyPart5 () {
    sprites.destroyAllSpritesOfKind(SpriteKind.NoInteractions)
    scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`tmp`)
    scene.setBackgroundImage(assets.image`lv1BG`)
    tiles.setCurrentTilemap(tilemap`cutsceneTilemap1`)
    farmer = sprites.create(assets.image`farmerIdleSurprised`, SpriteKind.NoInteractions)
    tiles.placeOnTile(farmer, tiles.getTileLocation(28, 8))
    scene.cameraFollowSprite(farmer)
    color.startFade(color.Black, color.originalPalette, 500)
    story.spriteSayText(farmer, "Help!")
    story.spriteSayText(farmer, "Help!")
    hero = sprites.create(assets.image`idle`, SpriteKind.NoInteractions)
    hero.setPosition(550, 120)
    animation.runImageAnimation(
    hero,
    assets.animation`walkLeft`,
    100,
    true
    )
    story.spriteMoveToLocation(hero, 520, 120, 40)
    animation.stopAnimation(animation.AnimationTypes.All, hero)
    hero.setImage(assets.image`heroIdleLeft`)
    farmer.setImage(assets.image`farmerSurprisedRight`)
    story.spriteSayText(farmer, "Oh, Hero!")
    game.showLongText("Help! My flowers made everyone party until they drop! You must stomp my flowers and use their powers to crash everyone's parties, saving them!", DialogLayout.Bottom)
    color.startFade(color.originalPalette, color.Black, 500)
    pause(500)
    titleScreen()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`endForward`, function (sprite, location) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    setupLevel(6)
    hideScoreboard()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv3Forward`, function (sprite, location) {
    setupLevel(3)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`shopFlower`, function (sprite, location) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(location.column, location.row + 2))
    sprite.setVelocity(0, 0)
    if (flowerRate == 1 && info.score() >= flowerLv2Cost) {
        info.changeScoreBy(0 - flowerLv2Cost)
        flowerRate = 2
        music.play(music.createSoundEffect(WaveShape.Square, 254, 1264, 255, 255, 200, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else if (flowerRate == 2 && info.score() >= flowerLv3Cost) {
        info.changeScoreBy(0 - flowerLv3Cost)
        flowerRate = 3
        music.play(music.createSoundEffect(WaveShape.Square, 518, 1703, 255, 255, 200, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else if (flowerRate == 3) {
        sprite.sayText("already maxed out!", 2000, false)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    } else {
        sprite.sayText("not enough moolah :(", 2000, false)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    }
    updateAllShopText()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`win`, function (sprite, location) {
    if (gameStarted && !(endCutscene)) {
        endCutscene = true
        music.stopAllSounds()
        controller.moveSprite(mySprite, 0, 0)
        mySprite.setVelocity(0, 0)
        mySprite.ay = 0
        music.play(music.createSong(assets.song`endingJingle`), music.PlaybackMode.InBackground)
        animation.runImageAnimation(
        mySprite,
        assets.animation`spin`,
        125,
        true
        )
        timer.after(2000, function () {
            animation.runImageAnimation(
            mySprite,
            assets.animation`spinToRockOn`,
            125,
            false
            )
            timer.after(1000, function () {
                animation.runImageAnimation(
                mySprite,
                assets.animation`rockOn`,
                300,
                true
                )
                timer.after(3000, function () {
                    game.setGameOverMessage(true, "Won in " + game.runtime() / 1000 + " seconds!")
                    game.gameOver(true)
                })
            })
        })
    }
})
function doublecheckThresholds () {
    if (info.score() >= lv4CompleteThreshold && maxLevelAttained < 5) {
        maxLevelAttained = 5
    } else if (info.score() >= lv3CompleteThreshold && maxLevelAttained < 4) {
        maxLevelAttained = 4
    } else if (info.score() >= lv2CompleteThreshold && maxLevelAttained < 3) {
        maxLevelAttained = 3
    } else if (info.score() >= lv1CompleteThreshold && maxLevelAttained < 2) {
        maxLevelAttained = 2
    } else if (info.score() >= tutCompleteThreshold && maxLevelAttained < 1) {
        maxLevelAttained = 1
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flower, function (sprite, otherSprite) {
    if (!(partyActive) && (sprite.vy > 10 && sprite.bottom < otherSprite.y)) {
        sprite.vy = -150
        stompFlower(otherSprite)
    }
})
// disable default menu behavior
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
function storyPart3 () {
    sprites.destroyAllSpritesOfKind(SpriteKind.NoInteractions)
    scene.setBackgroundImage(assets.image`lv3BG`)
    tiles.setCurrentTilemap(tilemap`cutsceneTilemap3`)
    s1 = sprites.create(assets.image`goldFish`, SpriteKind.NoInteractions)
    tiles.placeOnTile(s1, tiles.getTileLocation(9, 1))
    s1.z = 10
    s2 = sprites.create(assets.image`yellowStripedFish`, SpriteKind.NoInteractions)
    tiles.placeOnTile(s2, tiles.getTileLocation(5, 4))
    s2.z = 10
    s3 = sprites.create(assets.image`crab`, SpriteKind.NoInteractions)
    tiles.placeOnTile(s3, tiles.getTileLocation(1, 3))
    s3.z = 10
    color.startFade(color.Black, color.originalPalette, 500)
    timer.after(2000, function () {
        music.play(music.createSoundEffect(WaveShape.Noise, 1879, 1, 255, 0, 1000, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
        animation.runImageAnimation(
        s1,
        assets.animation`fish1Anim`,
        220,
        true
        )
        extraEffects.createSpreadEffectOnAnchor(s1, flowerExplodeEffect, 100)
        animation.runImageAnimation(
        s2,
        assets.animation`fish2Anim`,
        200,
        true
        )
        extraEffects.createSpreadEffectOnAnchor(s2, flowerExplodeEffect, 100)
        animation.runImageAnimation(
        s3,
        assets.animation`crabAnim`,
        180,
        true
        )
        extraEffects.createSpreadEffectOnAnchor(s3, flowerExplodeEffect, 100)
    })
    pause(4000)
    color.startFade(color.originalPalette, color.Black, 500)
    pause(500)
    storyPart4()
}
function setColorGreenIfLevelComplete (level: number) {
    if (maxLevelAttained > level) {
        fancyText.setColor(boardTitleText, 5)
        fancyText.setColor(boardScoreTitleText, 7)
        fancyText.setColor(boardScoreText, 7)
    } else {
        fancyText.setColor(boardTitleText, 1)
        fancyText.setColor(boardScoreTitleText, 1)
        fancyText.setColor(boardScoreText, 1)
    }
}
sprites.onDestroyed(SpriteKind.CooldownTimer, function (sprite) {
    cooldown = null
chainUI.setImage(assets.image`chainReady`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`shopChain`, function (sprite, location) {
    tiles.placeOnTile(sprite, tiles.getTileLocation(location.column, location.row + 2))
    sprite.setVelocity(0, 0)
    if (!(chainReaction) && info.score() >= chainUnlockCost) {
        info.changeScoreBy(0 - chainUnlockCost)
        chainReaction = true
        music.play(music.createSoundEffect(WaveShape.Square, 518, 1703, 255, 255, 200, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        game.showLongText("Congrats! You unlocked a new ability!", DialogLayout.Center)
        game.showLongText("Press A to stomp all enemies at once! (Cooldown: 25s)", DialogLayout.Center)
        chainUI.setImage(assets.image`chainReady`)
    } else if (chainReaction) {
        sprite.sayText("already maxed out!", 2000, false)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    } else {
        sprite.sayText("not enough moolah :(", 2000, false)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    }
    updateAllShopText()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tutBack`, function (sprite, location) {
    setupLevel(0)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv1Back`, function (sprite, location) {
    setupLevel(1)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv3Back`, function (sprite, location) {
    setupLevel(3)
})
function makeFlowerUIPopup () {
    flowerAlert1 = fancyText.create("A flower has grown!", 0, 0, fancyText.geometric_sans_6)
    fancyText.setFrame(flowerAlert1, assets.image`popupFrame`)
    flowerAlert1.setPosition(80, 86)
    flowerAlert1.setFlag(SpriteFlag.RelativeToCamera, true)
    flowerAlert1.z = 9998
    flowerAlert1.lifespan = 3000
    flowerAlert2 = fancyText.create("Stomp it!", 0, 0, fancyText.geometric_sans_6)
    fancyText.setFrame(flowerAlert2, assets.image`popupFrame`)
    flowerAlert2.setPosition(80, 100)
    flowerAlert2.setFlag(SpriteFlag.RelativeToCamera, true)
    flowerAlert2.z = 9998
    flowerAlert2.lifespan = 3000
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`shopExit`, function (sprite, location) {
    music.stopAllSounds()
    setupLevel(curLevel)
    isInShop = false
    reloadMainTilemap()
    tiles.placeOnTile(mySprite, returnPoint)
    mySprite.setVelocity(0, 0)
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
    } else if (curLevel == 5) {
        mySprite2 = sprites.create(level5enemies._pickRandom(), SpriteKind.Enemy)
        tiles.placeOnTile(mySprite2, tiles.getTileLocation(randint(166, 189), 0))
    } else {
        return
    }
    sprites.setDataBoolean(mySprite2, "grounded", false)
    sprites.setDataBoolean(mySprite2, "squishable", true)
    sprites.setDataBoolean(mySprite2, "flipped", false)
    mySprite2.z = 1
    mySprite2.setVelocity(0, 50)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`lv4Back`, function (sprite, location) {
    setupLevel(4)
})
function updateScoreMultiplierShopText () {
    scoreMultTitle = fancyText.create("Score Multiplier", 0, 0, fancyText.serif_small)
    // Update score multiplier texts
    if (scoreMultiplier == 1) {
        scoreMultLevel = textsprite.create("Lv 1/4: 1x")
        scoreMultUpgrade = textsprite.create("Buy 2x for $" + multLv2Cost + "?")
    } else if (scoreMultiplier == 2) {
        scoreMultLevel = textsprite.create("Lv 2/4: 2x")
        scoreMultUpgrade = textsprite.create("Buy 3x for $" + multLv3Cost + "?")
    } else if (scoreMultiplier == 3) {
        scoreMultLevel = textsprite.create("Lv 3/4: 3x")
        scoreMultUpgrade = textsprite.create("Buy 4x for $" + multLv4Cost + "?")
    } else if (scoreMultiplier == 4) {
        scoreMultLevel = textsprite.create("Lv 4/4: 4x")
        scoreMultUpgrade = textsprite.create("MAXED", 0, 7)
    }
    scoreMultTitle.setKind(SpriteKind.ShopText)
    scoreMultLevel.setKind(SpriteKind.ShopText)
    scoreMultUpgrade.setKind(SpriteKind.ShopText)
    tiles.placeOnTile(scoreMultTitle, tiles.getTileLocation(24, 27))
    tiles.placeOnTile(scoreMultLevel, tiles.getTileLocation(24, 28))
    tiles.placeOnTile(scoreMultUpgrade, tiles.getTileLocation(24, 30))
}
function squish (sprite: Sprite) {
    updateScore(sprite)
    newlySelectedScream = randScreamList._pickRandom()
    while (newlySelectedScream == lastSelectedScream) {
        newlySelectedScream = randScreamList._pickRandom()
    }
    music.play(newlySelectedScream, music.PlaybackMode.InBackground)
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
scene.onOverlapTile(SpriteKind.Player, assets.tile`infBack`, function (sprite, location) {
    setupLevel(5)
    showScoreboard()
})
info.onScore(14000, function () {
    if (maxLevelAttained == 4) {
        openInf()
        music.play(music.melodyPlayable(music.siren), music.PlaybackMode.InBackground)
        maxLevelAttained = 5
        timer.after(500, function () {
            game.showLongText("Congrats! You unlocked Infinite Mode! Go past it to end the game.", DialogLayout.Center)
        })
    }
})
function updateScore (sprite: Sprite) {
    if (chainActive) {
        pointsScored = Math.constrain(curLevel, 1, 5) * scoreMultiplier
        scorePopup("+" + convertToText(pointsScored), sprite.x, sprite.y)
        info.changeScoreBy(pointsScored)
        updateScoreboard(info.score())
        return
    }
    if (Math.percentChance(luckySquishRate)) {
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        extraEffects.createSpreadEffectAt(luckyEffect, sprite.x, sprite.y, 200, 20)
        pointsScored = Math.constrain(curLevel, 1, 5) * (scoreMultiplier * 10)
        scorePopup("Lucky! +" + convertToText(pointsScored), sprite.x, sprite.y)
    } else if (combo > 1) {
        comboModifier = Math.constrain(1 + combo * 0.5, 2, 4)
        pointsScored = Math.constrain(curLevel, 1, 5) * scoreMultiplier * comboModifier
        scorePopup("Combo! x" + comboModifier + " +" + convertToText(pointsScored), sprite.x, sprite.y)
    } else {
        pointsScored = Math.constrain(curLevel, 1, 5) * scoreMultiplier
        scorePopup("+" + convertToText(pointsScored), sprite.x, sprite.y)
    }
    combo += 1
    info.changeScoreBy(pointsScored)
    updateScoreboard(info.score())
}
function updateUpgradeUI () {
    sprites.destroyAllSpritesOfKind(SpriteKind.UpgradeUI)
    for (let index32 = 0; index32 <= spawnRate - 1; index32++) {
        pip = sprites.create(assets.image`spawnRatePip`, SpriteKind.UpgradeUI)
        pip.setFlag(SpriteFlag.RelativeToCamera, true)
        pip.z = 10000
        pip.setPosition(157, 3 + index32 * 5)
    }
    for (let index42 = 0; index42 <= scoreMultiplier - 1; index42++) {
        pip = sprites.create(assets.image`multiplierPip`, SpriteKind.UpgradeUI)
        pip.setFlag(SpriteFlag.RelativeToCamera, true)
        pip.z = 10000
        pip.setPosition(152, 3 + index42 * 5)
    }
    for (let index5 = 0; index5 <= luckySquishRate / 4 - 1; index5++) {
        pip = sprites.create(assets.image`luckyPip`, SpriteKind.UpgradeUI)
        pip.setFlag(SpriteFlag.RelativeToCamera, true)
        pip.z = 10000
        pip.setPosition(147, 3 + index5 * 5)
    }
    for (let index6 = 0; index6 <= playerSpeed - 1; index6++) {
        pip = sprites.create(assets.image`speedPip`, SpriteKind.UpgradeUI)
        pip.setFlag(SpriteFlag.RelativeToCamera, true)
        pip.z = 10000
        pip.setPosition(142, 3 + index6 * 5)
    }
    for (let index7 = 0; index7 <= flowerRate - 1; index7++) {
        pip = sprites.create(assets.image`flowerPip`, SpriteKind.UpgradeUI)
        pip.setFlag(SpriteFlag.RelativeToCamera, true)
        pip.z = 10000
        pip.setPosition(137, 3 + index7 * 5)
    }
    // make chain blip
    if (chainReaction) {
        pip = sprites.create(assets.image`chainPip`, SpriteKind.UpgradeUI)
        pip.setFlag(SpriteFlag.RelativeToCamera, true)
        pip.z = 10000
        pip.setPosition(132, 3)
    }
}
function setupLists () {
    level0Enemies = [assets.image`cake`, assets.image`pizza`, assets.image`taco`]
    level1Enemies = [assets.image`duck`, assets.image`shroom`, assets.image`monkey`]
    level2Enemies = [assets.image`dino`, assets.image`car`, assets.image`football guy`]
    level3Enemies = [assets.image`crab`, assets.image`goldFish`, assets.image`yellowStripedFish`]
    level4Enemies = [assets.image`bat`, assets.image`ghost`, assets.image`snake`]
    level5enemies = [
    assets.image`bat`,
    assets.image`ghost`,
    assets.image`snake`,
    assets.image`crab`,
    assets.image`goldFish`,
    assets.image`yellowStripedFish`,
    assets.image`dino`,
    assets.image`car`,
    assets.image`football guy`,
    assets.image`duck`,
    assets.image`shroom`,
    assets.image`monkey`,
    assets.image`cake`,
    assets.image`pizza`,
    assets.image`taco`
    ]
    randScreamList = [
    music.createSoundEffect(WaveShape.Sawtooth, 2932, 2581, 255, 0, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Logarithmic),
    music.createSoundEffect(WaveShape.Sawtooth, 957, 1, 255, 0, 400, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear),
    music.createSoundEffect(WaveShape.Sine, 2537, 430, 255, 0, 500, SoundExpressionEffect.Warble, InterpolationCurve.Linear),
    music.createSoundEffect(WaveShape.Triangle, 123, 123, 255, 0, 500, SoundExpressionEffect.Warble, InterpolationCurve.Linear),
    music.createSoundEffect(WaveShape.Sawtooth, 957, 474, 255, 0, 500, SoundExpressionEffect.Warble, InterpolationCurve.Linear),
    music.createSoundEffect(WaveShape.Square, 781, 1, 255, 0, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear)
    ]
    lastSelectedScream = randScreamList._pickRandom()
}
function setupScoreboardUI () {
    tutCompleteThreshold = 15
    lv1CompleteThreshold = 300
    lv2CompleteThreshold = 2500
    lv3CompleteThreshold = 6000
    lv4CompleteThreshold = 14000
    scoreboardBG = sprites.create(assets.image`scoreboardBG`, SpriteKind.NoInteractions)
    scoreboardBG.setFlag(SpriteFlag.RelativeToCamera, true)
    scoreboardBG.setPosition(80, 20)
    scoreboardBG.z = 9001
    boardTitleText = fancyText.create("TUT", 0, 1, fancyText.art_deco_11)
    boardTitleText.setFlag(SpriteFlag.RelativeToCamera, true)
    boardTitleText.setPosition(98, 22)
    boardTitleText.z = 9002
    boardScoreTitleText = fancyText.create("Score", 0, 1, fancyText.geometric_serif_7)
    boardScoreTitleText.setFlag(SpriteFlag.RelativeToCamera, true)
    boardScoreTitleText.setPosition(61, 16)
    boardScoreTitleText.z = 9002
    boardScoreText = fancyText.create("0/0", 60, 1, fancyText.tiny_4)
    boardScoreText.setFlag(SpriteFlag.RelativeToCamera, true)
    boardScoreText.setPosition(76, 26)
    boardScoreText.z = 9002
    scorecountBG = sprites.create(assets.image`scorecountBG`, SpriteKind.NoInteractions)
    scorecountBG.setFlag(SpriteFlag.RelativeToCamera, true)
    scorecountBG.setPosition(25, 9)
    scorecountBG.z = 9002
    countScoreText = fancyText.create("$0", 0, 1, fancyText.geometric_serif_7)
    fancyText.setTextFlag(countScoreText, fancyText.Flag.AlwaysOccupyMaxWidth, false)
    countScoreText.setFlag(SpriteFlag.RelativeToCamera, true)
    countScoreText.setPosition(10, 8)
    countScoreText.z = 9002
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.floorDark3, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`myTile18`)
    controller.moveSprite(mySprite, 0, 0)
    mySprite.ay = 0
    mySprite.setVelocity(0, 0)
    music.stopAllSounds()
    for (let index = 0; index < 2000; index++) {
        music.play(music.melodyPlayable(music.footstep), music.PlaybackMode.UntilDone)
    }
    pause(1000)
})
function openInf () {
    tiles.setTileAt(tiles.getTileLocation(160, 4), assets.tile`infForward`)
    tiles.setWallAt(tiles.getTileLocation(160, 4), false)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprites.readDataBoolean(otherSprite, "squishable") && true) {
        if (partyActive) {
            squish(otherSprite)
        } else if (sprite.vy > 10 && sprite.bottom < otherSprite.y) {
            sprite.vy = -150
            squish(otherSprite)
        }
    }
})
function storyPart1 () {
    color.startFade(color.Black, color.originalPalette, 500)
    scene.setBackgroundImage(assets.image`lv1BG`)
    tiles.setCurrentTilemap(tilemap`cutsceneTilemap1`)
    house = sprites.create(assets.image`house`, SpriteKind.NoInteractions)
    tiles.placeOnTile(house, tiles.getTileLocation(7, 6))
    house.y += 8
    house.scale = 2
    cameraLock = sprites.create(assets.image`tmp`, SpriteKind.NoInteractions)
    cameraLock.setPosition(120, 128)
    scene.cameraFollowSprite(cameraLock)
    music.play(music.createSong(assets.song`cutsceneTheme1`), music.PlaybackMode.InBackground)
    pause(1000)
    timer.background(function () {
        story.spriteMoveToLocation(cameraLock, 300, 128, 50)
    })
    pause(500)
    music.play(music.melodyPlayable(music.thump), music.PlaybackMode.InBackground)
    farmer = sprites.create(assets.image`farmerIdle`, SpriteKind.NoInteractions)
    tiles.placeOnTile(farmer, tiles.getTileLocation(7, 9))
    farmer.z = 10
    flower1 = sprites.create(assets.image`flower1`, SpriteKind.NoInteractions)
    tiles.placeOnTile(flower1, tiles.getTileLocation(17, 9))
    flower1.z = 10
    flower2 = sprites.create(assets.image`flower2`, SpriteKind.NoInteractions)
    tiles.placeOnTile(flower2, tiles.getTileLocation(18, 9))
    flower2.z = 10
    flower3 = sprites.create(assets.image`flower3`, SpriteKind.NoInteractions)
    tiles.placeOnTile(flower3, tiles.getTileLocation(19, 9))
    flower3.z = 10
    pause(500)
    animation.runImageAnimation(
    farmer,
    assets.animation`farmerWalkRight`,
    100,
    true
    )
    timer.background(function () {
        for (let index = 0; index < 8; index++) {
            music.play(music.createSoundEffect(WaveShape.Sine, 123, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            pause(300)
        }
    })
    story.spriteMoveToLocation(farmer, 262, 152, 70)
    animation.stopAnimation(animation.AnimationTypes.All, farmer)
    farmer.setImage(assets.image`farmerIdleRight`)
    pause(1000)
    farmer.setImage(assets.image`farmerWatering`)
    extraEffects.createSpreadEffectOnAnchor(farmer, wateringCanEffect, 2000, 0, 40)
    music.play(music.createSoundEffect(WaveShape.Noise, 35, 1, 255, 0, 2000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    pause(2000)
    farmer.setImage(assets.image`farmerIdleRight`)
    pause(1000)
    animation.runImageAnimation(
    farmer,
    assets.animation`farmerWalkLeft`,
    100,
    true
    )
    story.spriteMoveToLocation(farmer, 240, 152, 70)
    animation.stopAnimation(animation.AnimationTypes.All, farmer)
    farmer.setImage(assets.image`farmerSurprisedRight`)
    scene.cameraShake(4, 500)
    flower2.setImage(assets.image`evilFlower`)
    flower2.setKind(SpriteKind.Flower)
    extraEffects.createSpreadEffectOnAnchor(flower2, flowerExplodeEffect, 100)
    extraEffects.createSpreadEffectOnAnchor(flower2, evilFlowersEffect, 5000)
    music.play(music.createSoundEffect(WaveShape.Noise, 1396, 1, 255, 0, 1000, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
    pause(2000)
    scene.cameraShake(4, 500)
    flower3.setImage(assets.image`evilFlower`)
    flower3.setKind(SpriteKind.Flower)
    extraEffects.createSpreadEffectOnAnchor(flower3, flowerExplodeEffect, 100)
    extraEffects.createSpreadEffectOnAnchor(flower3, evilFlowersEffect, 5000)
    music.play(music.createSoundEffect(WaveShape.Noise, 1396, 1, 255, 0, 1000, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
    story.spriteMoveToLocation(farmer, 230, 152, 70)
    pause(1000)
    scene.cameraShake(4, 3000)
    extraEffects.createSpreadEffectAt(flowerSmogHorizontalEffect, -30, 0, 3000, 25, 80)
    flower1.setImage(assets.image`evilFlower`)
    flower1.setKind(SpriteKind.Flower)
    extraEffects.createSpreadEffectOnAnchor(flower1, flowerExplodeEffect, 100)
    extraEffects.createSpreadEffectOnAnchor(flower1, evilFlowersEffect, 5000)
    timer.background(function () {
        for (let index = 0; index < 32; index++) {
            music.play(music.createSoundEffect(WaveShape.Noise, 1396, 1, 255, 0, 1000, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
            pause(500)
        }
    })
    animation.runImageAnimation(
    farmer,
    assets.animation`farmerWalkLeft`,
    100,
    true
    )
    timer.background(function () {
        story.spriteMoveToLocation(cameraLock, 300, 60, 25)
    })
    story.spriteMoveToLocation(farmer, 100, 152, 70)
    color.startFade(color.originalPalette, color.Black, 500)
    scene.cameraShake(2, 19000)
    extraEffects.createSpreadEffectAt(flowerSmogHorizontalEffect, -30, 0, 19000, 25, 80)
    pause(500)
    storyPart2()
}
let laser: Sprite = null
let flower3: Sprite = null
let flower2: Sprite = null
let flower1: Sprite = null
let cameraLock: Sprite = null
let house: Sprite = null
let pip: Sprite = null
let comboModifier = 0
let pointsScored = 0
let lastSelectedScream: music.Playable = null
let randScreamList: music.SoundEffect[] = []
let newlySelectedScream: music.Playable = null
let scoreMultUpgrade: TextSprite = null
let scoreMultLevel: TextSprite = null
let scoreMultTitle: fancyText.TextSprite = null
let level5enemies: Image[] = []
let level4Enemies: Image[] = []
let level3Enemies: Image[] = []
let level2Enemies: Image[] = []
let level1Enemies: Image[] = []
let level0Enemies: Image[] = []
let mySprite2: Sprite = null
let flowerAlert2: fancyText.TextSprite = null
let flowerAlert1: fancyText.TextSprite = null
let hero: Sprite = null
let farmer: Sprite = null
let title: Sprite = null
let spawnRateUpgrade: TextSprite = null
let spawnRateLevel: TextSprite = null
let spawnRateTitle: fancyText.TextSprite = null
let luckySquishUpgrade: TextSprite = null
let luckySquishLevel: TextSprite = null
let luckySquishTitle: fancyText.TextSprite = null
let s3: Sprite = null
let s2: Sprite = null
let s1: Sprite = null
let partyFX: Sprite = null
let congratsEndText: Sprite = null
let storyEndText: Sprite = null
let wateringCanEffect: SpreadEffectData = null
let flowerSmogVerticalEffect: SpreadEffectData = null
let flowerSmogHorizontalEffect: SpreadEffectData = null
let flowerExplodeEffect: SpreadEffectData = null
let evilFlowersEffect: SpreadEffectData = null
let enemyBurnEffect: SpreadEffectData = null
let luckyEffect: SpreadEffectData = null
let overlappingWithAnotherFlower = false
let newFlower: Sprite = null
let lv5FlowerLocations: tiles.Location[] = []
let lv4FlowerLocations: tiles.Location[] = []
let lv3FlowerLocations: tiles.Location[] = []
let lv2FlowerLocations: tiles.Location[] = []
let lv1FlowerLocations: tiles.Location[] = []
let curLevelFlowerLocations: tiles.Location[] = []
let speedUpgrade: TextSprite = null
let speedLevel: TextSprite = null
let speedTitle: fancyText.TextSprite = null
let textSprite2: TextSprite = null
let chainUI: Sprite = null
let chainActive = false
let returnPoint: tiles.Location = null
let lv4CompleteThreshold = 0
let lv3CompleteThreshold = 0
let lv2CompleteThreshold = 0
let lv1CompleteThreshold = 0
let tutCompleteThreshold = 0
let textSprite: TextSprite = null
let spriteImage: Image = null
let flowerUpgrade: TextSprite = null
let flowerLevel: TextSprite = null
let flowerTitle: fancyText.TextSprite = null
let maxLevelAttained = 0
let playerSpeed = 0
let squishPrompt: Sprite = null
let jumpPrompt: Sprite = null
let partyText: Sprite = null
let chainReactionUpgrade: TextSprite = null
let chainReactionLevel: TextSprite = null
let chainReactionTitle: fancyText.TextSprite = null
let countScoreText: fancyText.TextSprite = null
let scorecountBG: Sprite = null
let combo = 0
let partyActive = false
let mySprite: Sprite = null
let endCutscene = false
let chainUnlockCost = 0
let flowerLv3Cost = 0
let flowerLv2Cost = 0
let luckyLv4Cost = 0
let luckyLv3Cost = 0
let luckyLv2Cost = 0
let multLv4Cost = 0
let multLv3Cost = 0
let multLv2Cost = 0
let spawnLv4Cost = 0
let spawnLv3Cost = 0
let spawnLv2Cost = 0
let speedLv4Cost = 0
let speedLv3Cost = 0
let speedLv2Cost = 0
let shopText: Sprite = null
let chainReaction = false
let flowerRate = 0
let luckySquishRate = 0
let scoreMultiplier = 0
let spawnRate = 0
let isInShop = false
let openText3: TextSprite = null
let openText2: TextSprite = null
let openText1: TextSprite = null
let boardScoreText: fancyText.TextSprite = null
let boardScoreTitleText: fancyText.TextSprite = null
let boardTitleText: fancyText.TextSprite = null
let scoreboardBG: Sprite = null
let curLevel = 0
let lastSelectedLevel = 0
let titleScreenActive = false
let gameStarted = false
setupEffects()
gameStarted = false
titleScreenActive = false
let gameLoading = false
let cooldown: Sprite = null
game.setDialogFrame(assets.image`dialogFrame`)
game.setDialogCursor(assets.image`dialogCursor`)
game.setDialogTextColor(1)
scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.OnlyHorizontal, scroller.BackgroundLayer.Layer1)
scroller.setCameraScrollingMultipliers(0.3, 0, scroller.BackgroundLayer.Layer1)
scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`stars`)
scroller.scrollBackgroundWithSpeed(-13, 13, scroller.BackgroundLayer.Layer0)
introSeq()
game.onUpdateInterval(250, function () {
    if (!(isInShop)) {
        if (spawnRate == 4 && !(partyActive) || spawnRate == 3 && partyActive) {
            makeEnemy()
        }
    }
})
game.onUpdateInterval(125, function () {
    if (!(isInShop)) {
        if (spawnRate == 4 && partyActive) {
            makeEnemy()
        }
    }
})
game.onUpdateInterval(2000, function () {
    if (!(isInShop)) {
        if (spawnRate == 1 && !(partyActive)) {
            makeEnemy()
        }
    }
})
game.onUpdateInterval(1000, function () {
    for (let value3 of sprites.allOfKind(SpriteKind.Flower)) {
        extraEffects.createSpreadEffectOnAnchor(value3, evilFlowersEffect, 100)
    }
})
game.onUpdateInterval(1000, function () {
    if (!(isInShop)) {
        if (spawnRate == 2 && !(partyActive) || spawnRate == 1 && partyActive) {
            makeEnemy()
        }
    }
})
game.onUpdateInterval(45000, function () {
    if (flowerRate == 2 && !(isInShop)) {
        summonFlower()
    }
})
game.onUpdateInterval(60000, function () {
    if (flowerRate == 1 && !(isInShop)) {
        summonFlower()
    }
})
game.onUpdateInterval(1500, function () {
    if (curLevel == 4) {
        laser = sprites.create(assets.image`laser`, SpriteKind.Projectile)
        laser.z = 1001
        laser.vy = 50
        laser.lifespan = 10000
        laser.setFlag(SpriteFlag.GhostThroughWalls, true)
        tiles.placeOnTile(laser, tiles.getTileLocation(randint(138, 153), 0))
        laser.y += -30
    }
})
// footsteps
forever(function () {
    if (!(endCutscene) && gameStarted && ((controller.left.isPressed() || controller.right.isPressed()) && mySprite.isHittingTile(CollisionDirection.Bottom))) {
        timer.throttle("action", (175 - playerSpeed * 25) * 2, function () {
            music.play(music.createSoundEffect(WaveShape.Sine, 123, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        })
    }
})
game.onUpdateInterval(30000, function () {
    if (flowerRate == 3 && !(isInShop)) {
        summonFlower()
    }
})
game.onUpdateInterval(500, function () {
    if (!(isInShop)) {
        if (spawnRate == 3 && !(partyActive) || spawnRate == 2 && partyActive) {
            makeEnemy()
        }
    }
})
game.onUpdateInterval(500, function () {
    if (partyActive) {
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1176, 1571, 255, 0, 250, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        timer.after(250, function () {
            music.play(music.createSoundEffect(WaveShape.Sawtooth, 1571, 693, 255, 0, 250, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        })
    }
})
game.onUpdateInterval(100, function () {
    if (sprites.allOfKind(SpriteKind.Enemy).length < 20) {
        for (let value4 of sprites.allOfKind(SpriteKind.Enemy)) {
            if (!(sprites.readDataBoolean(value4, "grounded")) && sprites.readDataBoolean(value4, "squishable")) {
                extraEffects.createSpreadEffectAt(extraEffects.createSingleColorSpreadEffectData(1, ExtraEffectPresetShape.Twinkle), value4.x, value4.y, 100, 0, 20)
            }
        }
    }
})
game.onUpdateInterval(60, function () {
    if (partyFX) {
        partyFX.image.replace(2, 13)
        partyFX.image.replace(4, 2)
        partyFX.image.replace(5, 4)
        partyFX.image.replace(7, 5)
        partyFX.image.replace(9, 7)
        partyFX.image.replace(8, 9)
        partyFX.image.replace(10, 8)
        partyFX.image.replace(3, 10)
        // eliminate the extra color
        partyFX.image.replace(13, 3)
    }
})
