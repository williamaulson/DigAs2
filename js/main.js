window.onload = function() {
    // William Aulson Digital Assignment #1
    // This is the code for The Poorly Named Bubble Note Game
    
    "use strict";
    
   var game = new Phaser.Game(1024, 576, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() //load assets
{
	game.load.image('background', 'assets/background.jpg');
	game.load.image('avatar', 'assets/avatar.png');
	game.load.image('bub', 'assets/bub.png');
	game.load.image('bub1', 'assets/buba.png');
	game.load.image('bub2', 'assets/bubb.png');
	game.load.image('bub3', 'assets/bubc.png');
	game.load.image('bub4', 'assets/bubd.png');
	game.load.image('bub5', 'assets/bube.png');
	game.load.image('bub6', 'assets/bubf.png');
	game.load.image('bub7', 'assets/bubg.png');
	game.load.image('bub8', 'assets/bubh.png');
	game.load.image('bub9', 'assets/bubi.png');
	game.load.image('bub10', 'assets/bubj.png');
	game.load.image('bub11', 'assets/bubk.png');
	game.load.image('bub12', 'assets/bubl.png');
	game.load.image('bub13', 'assets/bubm.png');
	game.load.image('bub14', 'assets/bubn.png');
	game.load.image('bub15', 'assets/bubo.png');
	game.load.image('bub16', 'assets/bubp.png');
	game.load.image('bub17', 'assets/bubq.png');
	game.load.image('bub18', 'assets/bubr.png');
	game.load.image('bub19', 'assets/bubs.png');
	game.load.image('bub20', 'assets/bubt.png');
	game.load.image('bubmain', 'assets/bubmain.png');
	game.load.audio('pop', 'assets/pop.mp3');
	game.load.audio('a1', 'assets/1.mp3');
	game.load.audio('a2', 'assets/2.mp3');
	game.load.audio('a3', 'assets/3.mp3');
	game.load.audio('a4', 'assets/4.mp3');
	game.load.audio('a5', 'assets/5.mp3');
	game.load.audio('a6', 'assets/6.mp3');
	game.load.audio('a7', 'assets/7.mp3');
	game.load.audio('a8', 'assets/8.mp3');
	game.load.audio('a9', 'assets/9.mp3');
	game.load.audio('a10', 'assets/10.mp3');
	game.load.audio('a11', 'assets/11.mp3');
	game.load.audio('a12', 'assets/12.mp3');
	game.load.audio('a13', 'assets/13.mp3');
	game.load.audio('a14', 'assets/14.mp3');
	game.load.audio('a15', 'assets/15.mp3');
	game.load.audio('a16', 'assets/16.mp3');
	game.load.audio('a17', 'assets/17.mp3');
	game.load.audio('a18', 'assets/18.mp3');
	game.load.audio('a19', 'assets/19.mp3');
	game.load.audio('a20', 'assets/20.mp3');
	game.load.audio('blank', 'assets/blank.mp3');
	game.load.audio('bell', 'assets/bell.mp3');
	game.load.audio('reset', 'assets/reset.mp3');
}

//variables
var style = { font: "65px Arial", fill: "#000000", align: "center" };
var pop;
var xBound = 1920;
var yBound = 1510;
var playButton;
var playButtonText = '\u25B6';
var playButtonInfo;
var resetButton;
var resetButtonText = '\u2717';
var resetButtonInfo;
var spawnButton;
var spawnButtonInfo;
var spawnButton2;
var spawnButtonInfo2;
var spawnButton3;
var spawnButtonInfo3;
var spawnButton4;
var spawnButtonInfo4;
var spawnButtonText = '\u266B';
var spawnGroup;
var avatar;
var count;
var emptyBubble;
var emptyGroup;
var currentBubbles = 0;
var totalBubbles = 50;
var timerRunning = false;
var musicTimerRunning = false;
var musicBubble;
var musicGroup;
var loop;
var audioKey;
var noteArray = [];
var rollingIndex = 0;
var playLoop;
var timerResetRunning = false;
var bell;
var reset;

function create() //create the sprites, sounds, interface, and physics to be used
{
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.world.setBounds(0, 0, xBound, yBound);
	game.add.sprite(0, 0, 'background');
	
	spawnGroup = game.add.group();
	game.physics.arcade.enable(spawnGroup);
	emptyGroup = game.add.group();
	game.physics.arcade.enable(emptyGroup);
	musicGroup = game.add.group();
	game.physics.arcade.enable(musicGroup);
	
	//play the music button
	playButton = game.add.sprite(614, 888, 'bubmain');
	playButton.scale.x = .2;
	playButton.scale.y = .2;
	game.physics.arcade.enable(playButton);
	playButton.alpha = 0;
	game.add.tween(playButton).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
	playButtonInfo = game.add.text(playButton.x + 50, playButton.y + 48, playButtonText, style);
	playButtonInfo.anchor.set(0.5);
	playButton.body.immovable = true;
	
	//reset the queued notes
	resetButton = game.add.sprite(1324, 1094, 'bubmain');
	resetButton.scale.x = .2;
	resetButton.scale.y = .2;
	game.physics.arcade.enable(resetButton);
	resetButton.alpha = 0;
	game.add.tween(resetButton).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
	resetButtonInfo = game.add.text(resetButton.x + 46, resetButton.y + 44, resetButtonText, style);
	resetButtonInfo.anchor.set(0.5);
	resetButton.body.immovable = true;
	
	//generate note bubbles
	spawnButton = game.add.sprite(1300, 280, 'bubmain');
	spawnButton.scale.x = .2;
	spawnButton.scale.y = .2;
	game.physics.arcade.enable(spawnButton);
	spawnButton.alpha = 0;
	game.add.tween(spawnButton).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
	spawnButtonInfo = game.add.text(spawnButton.x + 46, spawnButton.y + 48, spawnButtonText, style);
	spawnButtonInfo.anchor.set(0.5);
	spawnGroup.add(spawnButton);
	spawnButton.body.immovable = true;
	
	spawnButton2 = game.add.sprite(550, 400, 'bubmain');
	spawnButton2.scale.x = .2;
	spawnButton2.scale.y = .2;
	game.physics.arcade.enable(spawnButton2);
	spawnButton2.alpha = 0;
	game.add.tween(spawnButton2).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
	spawnButtonInfo2 = game.add.text(spawnButton2.x + 46, spawnButton2.y + 48, spawnButtonText, style);
	spawnButtonInfo2.anchor.set(0.5);
	spawnGroup.add(spawnButton2);
	spawnButton2.body.immovable = true;
	
	spawnButton3 = game.add.sprite(360, 1220, 'bubmain');
	spawnButton3.scale.x = .2;
	spawnButton3.scale.y = .2;
	game.physics.arcade.enable(spawnButton3);
	spawnButton3.alpha = 0;
	game.add.tween(spawnButton3).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
	spawnButtonInfo3 = game.add.text(spawnButton3.x + 46, spawnButton3.y + 48, spawnButtonText, style);
	spawnButtonInfo3.anchor.set(0.5);
	spawnGroup.add(spawnButton3);
	spawnButton3.body.immovable = true;
	
	spawnButton4 = game.add.sprite(1600, 1280, 'bubmain');
	spawnButton4.scale.x = .2;
	spawnButton4.scale.y = .2;
	game.physics.arcade.enable(spawnButton4);
	spawnButton4.alpha = 0;
	game.add.tween(spawnButton4).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
	spawnButtonInfo4 = game.add.text(spawnButton4.x + 46, spawnButton4.y + 48, spawnButtonText, style);
	spawnButtonInfo4.anchor.set(0.5);
	spawnGroup.add(spawnButton4);
	spawnButton4.body.immovable = true;
	
	//the avatar for the player
	avatar = game.add.sprite(1060, 930, 'avatar');
	avatar.anchor.set(0.5);
	game.physics.arcade.enable(avatar);
	avatar.body.allowRotation = false;
	game.camera.follow(avatar);
	
	//make audio objects
	pop = game.add.audio('pop');
	pop.allowMultiple = true;
	audioKey = {};
	for (loop = 1; loop < 21; loop = loop + 1)
	{
		audioKey["bub" + loop] = game.add.audio('a' + loop);
		audioKey['bub' + loop].allowMultiple = true;
	}
	bell = game.add.audio('bell');
	bell.allowMultiple = true;
	reset = game.add.audio('reset');
	reset.allowMultiple = true;
	
	//set game to run in fullscreen
	game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.input.onDown.add(fullScreenStart, this);
	game.paused = true;
}

//fullscreen method
function fullScreenStart()
{
	if (game.scale.isFullScreen)
	{
		game.paused = true;
		game.scale.stopFullScreen();
	}
	else
	{
		game.scale.startFullScreen(true);
		game.paused = false;
	}
}

//everything Phaser checks constantly needs to start from here
function update()
{
	game.physics.arcade.collide(avatar, resetButton, resetMusic, null, this);
	game.physics.arcade.collide(avatar, spawnGroup, spawnBubbles, null, this);
	game.physics.arcade.collide(avatar, playButton, playMusic, null, this);
	game.physics.arcade.overlap(avatar, emptyGroup, popEmpty, null, this);
	game.physics.arcade.collide(musicGroup, emptyGroup, null, null, this);
	game.physics.arcade.collide(musicGroup, musicGroup, null, null, this);
	game.physics.arcade.collide(emptyGroup, emptyGroup, null, null, this);
	game.physics.arcade.collide(emptyGroup, spawnGroup, null, null, this);
	game.physics.arcade.collide(emptyGroup, resetButton, null, null, this);
	game.physics.arcade.collide(emptyGroup, playButton, null, null, this);
	game.physics.arcade.collide(musicGroup, spawnGroup, null, null, this);
	game.physics.arcade.collide(musicGroup, resetButton, null, null, this);
	game.physics.arcade.collide(musicGroup, playButton, null, null, this);
	game.physics.arcade.overlap(avatar, musicGroup, popMusic, null, this);
	
	//defines mouse control scheme
	if (game.physics.arcade.distanceToPointer(avatar, game.input.activePointer) > 60)
	{
		game.physics.arcade.moveToPointer(avatar, 240);
	}
	else
	{
		avatar.body.velocity.set(0);
	}
}

//debug info
function render()
{
	//game.debug.cameraInfo(game.camera, 500, 32);
	//game.debug.spriteCoords(avatar, 32, 32);
}

//reset button with cooldown timer
function resetMusic()
{
	if (timerResetRunning != true)
	{
		reset.play();
		game.time.events.add(Phaser.Timer.SECOND * 5, startResetTimer, null);
		rollingIndex = 0;
		timerResetRunning = true;
	}
}

//play music, needs to be called on time intervals
function playMusicTimed()
{
	if (playLoop < rollingIndex)
	{
		noteArray[playLoop].play();
	}
	playLoop = playLoop + 1;
}

//play music with cooldown timer
function playMusic()
{
	if (musicTimerRunning != true)
	{
		bell.play();
		game.time.events.add(Phaser.Timer.SECOND * 5, startMusicTimer, null);
		if (rollingIndex > 0)
		{
			playLoop = 0; //Unsolved problem!! Repeat function can only run once per game!
			game.time.events.repeat(Phaser.Timer.SECOND * 0.4, (rollingIndex - 1), playMusicTimed, this);
		}
		musicTimerRunning = true;
	}
}

//Behavior of make bubble buttons
function spawnBubbles()
{
	if (timerRunning != true)
	{
		bell.play();
		game.time.events.add(Phaser.Timer.SECOND * 3, startTimer, this);
		if ((totalBubbles - currentBubbles) > 0) //don't overpopulate bubbles in game world
		{
			if ((totalBubbles - currentBubbles) < 10)
			{
				makeMusicBubbles(totalBubbles - currentBubbles);
			}
			else
			{
				makeMusicBubbles(7);
				makeEmptyBubbles(3);
			}
		}
		timerRunning = true;
	}
}

//helper method for spawning bubbles
function startTimer()
{
	timerRunning = false;
}

//helper method for playing music
function startMusicTimer()
{
	musicTimerRunning = false;
}

//helper function for reset button
function startResetTimer()
{
	timerResetRunning = false;
}

//helper function for spawning bubbles
function makeEmptyBubbles(count)
{
	var loop;
	for (loop = 0; loop < count; loop = loop + 1)
	{
		emptyBubble = emptyGroup.create(getBubbleX(), getBubbleY(), 'bub');
		game.physics.arcade.enable(emptyBubble)
		emptyBubble.scale.x = .2;
		emptyBubble.scale.y = .2;
		emptyBubble.body.velocity.x = game.rnd.integerInRange(-400, 400);
		emptyBubble.body.velocity.y = game.rnd.integerInRange(-400, 400);
		emptyBubble.body.collideWorldBounds = true;
		emptyBubble.body.bounce.setTo(1, 1);
	}
	currentBubbles = currentBubbles + count;
}

//helper function for spawning bubbles
function makeMusicBubbles(count)
{
	var loop;
	for (loop = 0; loop < count; loop = loop + 1)
	{
		musicBubble = musicGroup.create(getBubbleX(), getBubbleY(), getBubbleKey());
		game.physics.arcade.enable(musicBubble)
		musicBubble.scale.x = .2;
		musicBubble.scale.y = .2;
		musicBubble.body.velocity.x = game.rnd.integerInRange(-400, 400);
		musicBubble.body.velocity.y = game.rnd.integerInRange(-400, 400);
		musicBubble.body.collideWorldBounds = true;
		musicBubble.body.bounce.setTo(1, 1);
	}
	currentBubbles = currentBubbles + count;
}

//helper function for randomizing note bubbles
function getBubbleKey()
{
	return 'bub' + game.rnd.integerInRange(1,20);
}

//helper function for placing spawned bubbles
function getBubbleX()
{
	var x;
	loop = true;
	while (loop)
	{
		x = game.world.randomX; //Possible bug!! Bubble collide sounds sometimes play upon activating spawn.
		if ((x > 50) && (x < (xBound - 50)) && (Math.abs(x - avatar.x) > 300))
		{
			loop = false;
		}
	}
	return x;
}

//helper function for placing spawned bubbles
function getBubbleY()
{
	var y;
	loop = true;
	while (loop)
	{
		y = game.world.randomY; //Possible bug!! Bubble collide sounds sometimes play upon activating spawn.
		if ((y > 50) && (y < (yBound - 50)) && (Math.abs(y - avatar.y) > 300))
		{
			loop = false;
		}
	}
	return y;
}

//destroy method for empty note bubbles
function popEmpty(avatar, emptyBubble)
{
	emptyBubble.destroy();
	currentBubbles = currentBubbles - 1;
	noteArray[rollingIndex] = game.add.audio('blank');
	rollingIndex = rollingIndex + 1;
	pop.play(); //Possible bug!! Pop sounds may not play or only playing sound fragment.
}

//destroy method for filled note bubbles
function popMusic(avatar, musicBubble)
{
	musicBubble.destroy();
	currentBubbles = currentBubbles - 1;
	noteArray[rollingIndex] = audioKey[musicBubble.key];
	rollingIndex = rollingIndex + 1;
	audioKey[musicBubble.key].play();
}

};
