
//instantiate robot array
var selectedRobot;
var robotArray = [];
  

//create Robot class
let Robot = class {
    constructor(x, y, f, positionArray) {
        this.x = x;
        this.y = y;
        this.f = f;
        this.index = 0;
        this.setPosition = this.setPosition.bind(this);
        
    }
    
    setIndex(value) {
        this.index = value;
    }

    getIndex() {
        return this.index; 
    }
    //setPosition - sets the position of the robot
    
    setPosition(y, x, f) {
        this.x = x;
        this.y = y;
        this.f = f;
    }
    
    //getPositionX - gets the x position of the robot
    getPositionX() {
        return this.x;
    }

    //getPositionY - gets the y position of the robot
    getPositionY() {
        return this.y;
    }

    //getPositionF - gets the direction of the robot
    getPositionF() {
        return this.f;
    }   
    //report - reports the position of the current robot
    report() {
        for(var i = 0; i < robotArray.length; i++) {
            console.log("Your Robot is at position 'y:'", this.x, " and position 'x:'", this.y);
        }

        console.log(this.positionArray)
    }
}

//positionArray - Used for the game logic
var positionArray = [[{available: true, robot: new Robot()},{available: true, robot: new Robot()},{available: true, robot: new Robot()},{available: true, robot: new Robot()},{available: true, robot: new Robot()}],
                    [{available: true, robot: new Robot()},{available: true, robot: new Robot()},{available: true, robot: new Robot()},{available: true, robot: new Robot()},{available: true, robot: new Robot()}], 
                    [{available: true, robot: new Robot()},{available: true, robot: new Robot()},{available: true, robot: new Robot()},{available: true, robot: new Robot()},{available: true, robot: new Robot()}], 
                    [{available: true, robot: new Robot()},{available: true, robot: new Robot()},{available: true, robot: new Robot()},{available: true, robot: new Robot()},{available: true, robot: new Robot()}], 
                    [{available: true, robot: new Robot()},{available: true, robot: new Robot()},{available: true, robot: new Robot()},{available: true, robot: new Robot()},{available: true, robot: new Robot()}]];
 
//positionArrayOutput - Used for the view
var positionArrayOutput = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

init(); 

//Starts the game.
function init() {
    rl.question("What would you like to do? \ncreate Robot and Place - type create\n", function(input) {
        if(input === 'create') {
            createRobot();
            askQuestionPlace();
        } else {
            console.log("That was not a valid input");
            init();
        }
    });
}

//Loads the main menu
function start() {
    rl.question("What would you like to do? \ncreate Robot and Place - type create\nselect Robot - type select\nmove\nrotate\nreport \n", function(input) {
        if(input === 'create') {
            createRobot();
            
            askQuestionPlace();
        } else if(input == 'select') {
            askQuestionSelect();
        } else if(input === 'move') {
            askQuestionMove();
        } else if(input === 'rotate') {
            askQuestionRotate();
        } else if(input === 'report') {
            askQuestionReport();
        } else {
            console.log("That was not a valid input");
            start();
        }
    });
}

//Creates a robot object
function createRobot() {
    var robot = new Robot(0, 0, 'north', positionArray);
    robot.setIndex(robotArray.length);
    robotArray.push(robot);
    selectedRobot = robot;
}

 //moveForward - moves the robot forward 1 position
 function moveForward() {
    //declare loop variables for later use
    var i = 0;
    var j = 0;
    var abort = false;

    //nested 'for' loop to find the position of a robot
    for(i = 0; i < positionArray.length && !abort; i++) {
        for(j = 0; j < positionArray[i].length && !abort; j++) {
            if(positionArray[i][j].available === false && positionArray[i][j].robot.getIndex() === selectedRobot.getIndex() ) {
                if(selectedRobot.f === 'north') {
                    if(i > 0) {
                        resetPosition(i, j, i -1, j);
                        place(i - 1, j, 'north');
                        abort = true;
                        break;
                    } else {
                        console.log('You cannot move in that direction');
                        abort = true;
                        break;
                    }
                } 
                else if(selectedRobot.f === 'east') {
                    if(j < 4) {
                        resetPosition(i, j, i, j+1);
                        place(i, j + 1, 'east');
                        abort = true;
                        break;
                    } else {
                        console.log('You cannot move in that direction');
                        abort = true;
                        break;
                    }
                    
                } else if(selectedRobot.f === 'south') {
                    if(i < 4) {
                        resetPosition(i, j, i+1, j);
                        place(i + 1, j, 'south');
                        
                        abort = true;
                        break;
                    } else {
                        console.log('You cannot move in that direction');
                        abort = true;
                        break;
                    }
                   
                } else if(selectedRobot.f === 'west') {
                    if(j > 0) {
                        resetPosition(i, j, i, j-1);
                        place(i, j - 1, 'west');
                        
                        abort = true;
                        break;
                    } else {
                        console.log('You cannot move in that direction');
                        abort = true;
                        break;
                    }   
                }   
            }       
        }
    }
    
}
 //moveBackward - moves the robot backwards 1 position
 function moveBackward() {
    var i = 0;
    var j = 0;
    var abort = false;

    for(i = 0; i < positionArray.length && !abort; i++) {
        for(j = 0; j < positionArray[i].length && !abort; j++) {
            if(positionArray[i][j].available === false && positionArray[i][j].robot.getIndex() === selectedRobot.getIndex() ) {
                if(selectedRobot.f === 'north') {
                    if(i < 4) {
                        resetPosition(i, j, i + 1, j);
                        place(i + 1, j, 'north');
                        
                        abort = true;
                        break;
                        
                    } else {
                        console.log('You cannot move in that direction');
                        abort = true;
                        break;
                    }
                } 
                else if(selectedRobot.f === 'east') {
                    if(j > 0) {
                        resetPosition(i, j, i, j -1);
                        place(i, j - 1, 'east');
                        abort = true;
                        break;
                    } else {
                        console.log('You cannot move in that direction');
                        abort = true;
                        break;
                    }
                    
                } else if(selectedRobot.f === 'south') {
                    if(i > 0) {
                        resetPosition(i, j, i -1, j);
                        place(i - 1, j, 'south');
                        abort = true;
                        break;
                    } else {
                        console.log('You cannot move in that direction');
                        abort = true;
                        break;
                    }
                   
                } else if(selectedRobot.f === 'west') {
                    if(j < 4) {
                        resetPosition(i, j, i, j+1);
                        place(i, j + 1, 'west');
                        abort = true;
                        
                        break;
                    } else {
                        console.log('You cannot move in that direction');
                        abort = true;
                        break;
                    }   
                }
            }            
        }
    }
}



//setRotation - sets the rotation of the robot
function setRotation(direction) {
    selectedRobot.f = direction;
    console.log("Rotate is now set at ", direction);
}


//resetPosition - resets the position of the robot in the nested array to 0
function resetPosition(x, y, newPosY, newPosX) {
    if(positionArray[newPosY][newPosX].available === false) {
        return;
    } else {
        positionArray[x][y].available = true;
        positionArrayOutput[x][y] = 0;
    }
    
}

//Prompts the user to select a Robot
function askQuestionSelect() {
    var question = '';
    
    for(var i = 0; i < robotArray.length; i++) {
        
        question += i.toString() +  " @ x position " + robotArray[i].x + ", y position " + robotArray[i].y + "\n";
    }
    rl.question("Which Robot would you like to select?\n" + question + '\n', function(answer) {
        if(parseInt(answer) > robotArray.length - 1 || parseInt(answer < 0)) {
            console.log("Your selection was incorrect");
            askQuestionSelect();
        } else {
            selectedRobot = robotArray[parseInt(answer)];
            console.log("You have selected Robot number " + selectedRobot.getIndex());
            start();
        }
    })
}

//Prompts the user to move Robot
function askQuestionMove() {
    
    rl.question('Which way would you like to move the robot? \nforward\nback\n' , function(answer) {
        if(answer.toLowerCase() === 'forward' || answer.toLowerCase() === 'back') {
            move(answer);
        } else {
            console.log('That is not a valid input');
            askQuestionMove();

        }
       
})
};

//Prompts the user to rotate the Robot
function askQuestionRotate() {
    rl.question('Which direction would you like to rotate the robot? \nNorth\nEast\nSouth\nWest\n' , function(answer) {
        var answer = answer.toLowerCase();
        
        if(answer === 'north' || answer === 'east' || answer === 'south' || answer === 'west') {
            rotate(answer);
        } else {
            console.log("That is not a valid input");
            askQuestionRotate()
        }
        
})
};

//Prompts the user where to place the robot
function askQuestionPlace() {
    var line = '';
    var pos1 = '';
    var pos2 = '';
    var pos3 = '';

    rl.question('Where would you like to place it? Example - 0 0 north will place your robot top left facing north\n', function(answer) {
        line = answer.split(' ');
        pos1 = line[0].toLowerCase();
        pos2 = line[1].toLowerCase();
        pos3 = line[2].toLowerCase();

        if(pos3 === 'north') {
            pos3 = line[2].toLowerCase();
        } else if(pos3 === 'east') {
            pos3 = line[2].toLowerCase();
        } else if(pos3 === 'south') {
            pos3 = line[2].toLowerCase();
        } else if(pos3 === 'west') {
            pos3 = line[2].toLowerCase();
        } else {
            console.log('Your input was invalid');
            askQuestionPlace();
            return;
        }
        
        if(pos1 === undefined || pos1.length > 1 || pos2 === undefined || pos2.length > 1 || pos3 === undefined) {
            
            console.log('Your input was invalid');

            askQuestionPlace();
        } else {
            
            place(pos1, pos2, pos3);
            start();
        } 
})
};

//Reports the details of the Robot(s)
function askQuestionReport() {
    for(var i = 0; i < robotArray.length; i++) {
        console.log("Robot number "+ i + " is @ y: ", robotArray[i].getPositionY(), ", x:", robotArray[i].getPositionX(), ", direction:", robotArray[i].getPositionF())

    }
    
    console.log(positionArrayOutput);
    start();
}

rl.on("close", function() {
    console.log("\nThat concludes Andrew Day's skills test!");
    process.exit(0);
});


//Places the robot on the game board
function place(x, y, f) {   
    if(positionArray[x][y].available === false) {
        console.log("There is already a robot in that position");
        start(); 
    } else {
        selectedRobot.setPosition(y, x, f);
        positionArrayOutput[x][y] = 1;
        positionArray[x][y].available = false;
        positionArray[x][y].robot = selectedRobot;
        askQuestionReport();
    }  
}

//Moves the Robot
function move(direction) {
    var direction = direction.toLowerCase();

    if(direction === 'forward') {
        moveForward();
        start();
    } else if(direction === 'back') {
        moveBackward();
        start();
    } else {
        askQuestionMove();
    }
}

//Rotates the Robot
function rotate(direction) {
    if(direction === 'north' || direction === 'east' || direction === 'south' || direction === 'west') {
        setRotation(direction);
        start();

    } else {
        console.log("That was not a valid input");
        askQuestionRotate();
    }
}