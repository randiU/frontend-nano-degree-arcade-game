/*
*
***********************Enemy**********************
*
*/

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each instance 
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

     //loops enemies
     if (this.x >= 505) {
        this.x = 0;
     }
     //checks for collision and starts player over if collision occurs.
     if (player.y - 40 <= this.y && player.x - 65 <= this.x
     && player.y + 40 >= this.y && player.x + 65 >= this.x) {
        console.log('collided');
        player.resetPos();
        playerGameInfo.deductLife();
        playerGameInfo.loseGame();
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



Player.prototype.update = function() {
  
};

//adjusts players position back to the beginning
Player.prototype.resetPos = function() {
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
        setTimeout(function() {
            player.resetPos()
            playerGameInfo.addPoints()
            playerGameInfo.updateLevel();
        }, 200);
    }

    console.log('keyPress -' + keyPress);
};


/*
*
*
*************Game Info***************
*
*
*/

//updates the lives, points, and level 
const playerGameInfo = {
    lives: 3,
    points: 0,
    deductLife: function() {
        this.lives -= 1;
        let playerLives = $('#currentLives');
        playerLives.text("Lives: " + this.lives);
        console.log('life taken away', this.lives);

    },
    addPoints: function() {
        this.points += pointIncrement;
        console.log(this.points);
        let playerPoints = $('#currentPoints');
        playerPoints.text("Points: " + this.points);
        console.log('you earned 10 points!');
    },

    //Each time a player earns 10 points/enters water they move on to next level.
    updateLevel: function() {
        //Updates enemy speed. 
        let level = this.points / pointIncrement;
        //Increments speed by 100 each time player reaches water
        lowerBound += boundIncrement;
        upperBound += boundIncrement;
        //Gets new array of random numbers to assign to enemies
        let levelSpeeds = getEnemySpeeds(lowerBound, upperBound);
        //Assigns new speeds to enemies
        enemyOne.speed  = levelSpeeds[0];
        enemyTwo.speed = levelSpeeds[1];
        enemyThree.speed = levelSpeeds[2];
    },
    loseGame: function() {
        if (this.lives < 1) {
            console.log('you lost!');

        };
    }

}

//Starting boundaries for enemy speeds.
let lowerBound = 20;
let upperBound = 150;

//Returns 3 random numbers within designated range
const getEnemySpeeds = function(lowerBound, upperBound) {
    return [boundRandom(lowerBound,upperBound), boundRandom(lowerBound,upperBound), boundRandom(lowerBound,upperBound)];

};

//Creates random number with designated range based off of lowerBound and UpperBound.
const boundRandom = function(lowerBound, upperBound) {
    return Math.random() * (upperBound - lowerBound + 1) + lowerBound;
};


/*
*********************************************************
*/


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//enemy must start at 0 for the x, 

let pointIncrement = 10;
let boundIncrement = 100;
let levelSpeedInit = getEnemySpeeds(lowerBound, upperBound);

let enemyOne = new Enemy(0, 235, levelSpeedInit[0]);
let enemyTwo = new Enemy(0, 140, levelSpeedInit[1]);
let enemyThree = new Enemy(0, 60, levelSpeedInit[2]);

let allEnemies = [enemyOne, enemyTwo, enemyThree];
let player = new Player(200, 380, 70);
let enemy = ""



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
