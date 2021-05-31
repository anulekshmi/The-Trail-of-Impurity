gap = randGap();                
var myObstacles = [];
var enemytypes = ["gper","oper", "pper"]
var bar1;
//let bar1=
//var greentype=["gper"]
         // instialising the enemy array (colored people )
var gamescore = 0;
//inserting images
var standimage = new Image();           //Creating the vampire object for the vampire class
standimage.src = "vamp.png";

var goodp = new Image();                    // good person class (loading the green charachter)
goodp.src = "gper.png";

var selfishp = new Image();                 // selfish person class (loading the black charachter)
selfishp.src = "oper.png";
                                 
var dishonestp = new Image();              // dishonest person class (loading the purple charachter)
dishonestp.src = "pper.png";

function startGame() {              //Player control 1
    gamearea.start();mki8
}
function everyinterval(n) {
    if (gamearea.frame % n == 0) return true;
    return false;
}
function jump() {           //Player control2
    player.speedY = -2;

}
function randGap() {
    return Math.floor(200 + Math.random() * (500 - 200 + 1));
}
var scoreText = {                                       // Result Display class 
    x: 270,
    y: 100,
    update: function (text) {                               // updates itself through info from the vampire class
        gamearea.context.fillStyle = "red";
        gamearea.context.font = "30px Consolas";
        gamearea.context.fillText(text, 290, 100);
    }
}
var player = {                                  //Player class controls the vampire class
    x: 20,
    y: 420,
    speedY: 0,
    update: function () {                      
        if (this.y < 420) {
            gamearea.context.drawImage(standimage, this.x, this.y - 40, 120, 120);
        }
        else {
            
                gamearea.context.drawImage(standimage, this.x, this.y - 40, 90, 90);
        }
    },
    update2: function () {                      
        if (player.crashWith(myObstacles[i])) {
            gamearea.context.drawImage(standimage, this.x, this.y - 40, 120, 120);
        }
        else {
            
                gamearea.context.drawImage(standimage, this.x, this.y - 40, 90, 90);
        }
    },
    
    newPos: function () {                            // position of vapire gets updated 
        if (this.y < 210) {
            this.speedY = 2;
        }
        this.y = this.y + this.speedY;
        if (this.speedY == 2 && this.y == 420) {
            this.speedY = 0;
        }

    },
    crashWith: function (obs) {                         
        if (this.x + 50 > obs.x && this.x < obs.x + obs.width && this.y + 60 > obs.y) {
            return true;
        }
        return false;
    }
}
function obstacle() {                                                               // colored people (collection class)
                                                                                    // intialises the random positions of the colored people                                          
    this.height = Math.floor(20 + Math.random() * (50 - 20 + 1));       
    this.width = Math.floor(10 + Math.random() * (20 - 10 + 1));
    this.x = 1000;
    this.y = gamearea.canvas.height - this.height;
    this.index = Math.floor(Math.random() * enemytypes.length);
    this.enemytype = enemytypes[this.index];
    this.draw = function () {
        if (this.enemytype == "gper") {
            gamearea.context.drawImage(goodp, this.x, this.y - 55, 70, this.height + 15);    //collection class defining the positions of the colored people
        }
        else if (this.enemytype == "oper") {
            gamearea.context.drawImage(selfishp, this.x, this.y - 55, 70, this.height + 15);
        }
        else {
            gamearea.context.drawImage(dishonestp, this.x, this.y - 55, 70, this.height + 15);
        }
    }
}



var gamearea = {                                                    // this class controls the game play interface
    canvas: document.createElement("canvas"),
    
    start: function () {                           // calls the start function 
        this.canvas.height = 500;                               
        this.canvas.width = 700;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.context = this.canvas.getContext("2d");
        this.frame = 0;
        this.score = 0;
        scoreText.update("Score: 0");
        this.interval = setInterval(this.updateGameArea, 5);
        window.addEventListener("keydown", jump);
    },
    updateGameArea: function () {    
        var selfishbar;
        var dishonestbar;                               // function which ends the game once the vampire crashes with any colored person 
        for (i = 0; i < myObstacles.length; i++) {
           
            if (((player.crashWith(myObstacles[i]))&&(myObstacles[i].enemytype.localeCompare("gper")==0))){//||(selfishbar.value==0 && dishonestbar.value==0)) {  //avoids the bad people
                gamearea.stop();
                return;
            }
            
            else 
            {
                //scoreText.update(player.y);
                //if(player.y==420 && myObstacles[i].enemytype.localeCompare("oper")==0)
                //{
                    player.update2();
                   if ((player.crashWith(myObstacles[i]))&&(myObstacles[i].enemytype.localeCompare("oper")==0))
                    {
                       //print("aa");
                       let selfishbar = document.getElementById("selfishBar");
                       selfishbar.value -= 0.09; //Or whatever you want to do with it.
                       //player.eaten();
                    }
                    else 
                    {
                       //print("aa");
                       if ((player.crashWith(myObstacles[i]))&&(myObstacles[i].enemytype.localeCompare("pper")==0)){
                       let dishonestbar = document.getElementById("dishonestBar");
                       dishonestbar.value -= 0.1; }//Or whatever you want to do with it.
                       //player.eaten();
                    }
                       // gamearea.context.drawImage(standimage, player.x, player.y-5, 130, 130);}
                //}
            }
            /*if(selfishbar.value==0 && dishonestbar.value==0)
            {
                gamearea.stop();
                return;
            }*/
        }
        gamearea.clear();                                       
        if (everyinterval(gap)) {
            myObstacles.push(new obstacle());
            gap = randGap();
            gamearea.frame = 0;
        }
        for (i = 0; i < myObstacles.length; i++) {
            myObstacles[i].x -= 2.5;
            myObstacles[i].draw();
        }
        player.newPos();
        player.update();                                // calls the update function of the player class using that class's object
        gamearea.frame += 1;
        gamearea.score += 0.01;
        gamescore = Math.floor(gamearea.score);
        scoreText.update("Score: " + gamescore);

    },
    clear: function () {
        gamearea.context.clearRect(0, 0, this.canvas.width, this.canvas.width);
    },
    stop: function () {                                    
        clearInterval(this.interval);
        gamearea.context.fillStyle = "red";
        gamearea.context.font = "30px Consolas";
        gamearea.context.fillText("GAME OVER!!!", 250, 250);
    },
}