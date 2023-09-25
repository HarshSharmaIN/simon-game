var buttonColors = ["red","green","blue","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function (){
    if (!started) {
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    // console.log(userchosenColor);

    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentlevel){
    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]){
        if (gamePattern.length === userClickedPattern.length){
            setTimeout (function (){
                nextSequence();
            },1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function nextSequence (){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);
    // console.log(randomNumber);

    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor);
    // console.log(gamePattern);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound (name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress (currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}