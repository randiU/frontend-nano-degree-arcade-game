/*
*
***********************Enemy**********************
*
*/

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     this.x += this.speed * dt;

     //loops enemies and randomizes speed
     if (this.x >= 505) {
        this.x = 0;
        this.speed = Math.random() * 256;
     }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/*
*
*********************Player**************************
*
*/
//take out level,points,lives and make them into own object instead of constructor f
let Player = function(x,y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png'
};

let playerLivesHtml = 3;

Player.prototype.update = function() {
     if (player.y - 70 <= enemyOne.y && player.x - 70 <= enemyOne.x
     && player.y + 70 >= enemyOne.y && player.x + 70 >= enemyOne.x) {
        console.log('collided');
        this.resetPos();
    }
  
};

//adjusts players position back to the beginning
Player.prototype.resetPos = function() {
        console.log('next level');
        this.x = 200;
        this.y = 380;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};



//handles all of the inputs from the user
Player.prototype.handleInput = function(keyPress) {
    //&& this.x(or y) adds border functionality
    if (keyPress == 'left' && this.x > 0) {
        player.x -= player.speed;
        console.log(player.x, player.y);
        console.log(enemyOne.x, enemyOne.y);
    }
    if (keyPress == 'up' && this.y > -20) {
        player.y -= player.speed - 20;
        console.log(player.x, player.y);
        console.log(enemyOne.x, enemyOne.y);
    }
    if (keyPress == 'right' && this.x < 410) {
        player.x += player.speed;
        console.log(player.x, player.y);
        console.log(enemyOne.x, enemyOne.y);
    }
    if (keyPress == 'down' && this.y < 380) {
        player.y += player.speed - 20;
        console.log(player.x, player.y);
        console.log(enemyOne.x, enemyOne.y);
    }
    //if player reaches the water, resets to the beginning position
    if (player.y === -20) {
        this.resetPos();
        this.level += 1;
        console.log(this.level);
    }


    console.log('keyPress -' + keyPress);
};

/*
**********************************************************
*/

// let playerLevel = $('#currentLevel');
// // playerLevel.text("Level: " + player.level);
// let currentLives = $('#currentLives');

// console.log("Lives " + currentLives.text());
/*
*********************************************************
*/


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//enemy must start at 0 for the x, 
let enemyOne = new Enemy(0, 235, Math.random() * 256)

let allEnemies = [enemyOne];
let player = new Player(200, 380, 70);
let score = 0;
let gameLevel = 1;
let enemy = ""


// let currentLevel = player.level;
// playerLevel.text("Level: " + currentLevel.bind(player));

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
