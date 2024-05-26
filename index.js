const gameboard = document.querySelector("#gamecontainer");
const ctx = gameboard.getContext("2d");
const restartbtn = document.querySelector("#restartbtn");
const scoretext = document.querySelector("#scoretext");
const gamewidth = gameboard.width;
const gameheight = gameboard.height;
const backcolor = "forestgreen";
const paddle1color = "red";
const paddle2color = "black";
const paddleborder = "black";
const ballcolor = "yellow";
const ballbordercolor = "black";
const ballradius = 12.5;
const paddlespeed = 50;
let interval;
let ballspeed = 1;
let ballx = gamewidth / 2;
let bally = gameheight / 2;
let ballxdirection = 0;
let ballydirection = 0;
let player1score = 0;
let player2score = 0;
let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
}
let paddle2 = {
    width: 25,
    height: 100,
    x: gamewidth - 25,
    y: gameheight - 100
}

window.addEventListener("keydown", changedirection);
restartbtn.addEventListener("click", restart);

gamestart();

function gamestart() {
    createball();
    refresh();
};
function refresh() {
    interval = setTimeout(() => {
        clearboard();
        drawpaddle();
        moveball();
        drawball(ballx, bally);
        checkhit();
        refresh();
    }, 10)
};
function drawpaddle() {
    ctx.strokeStyle = paddleborder;
    ctx.fillStyle = paddle1color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.fillStyle = paddle2color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};
function createball() {
    ballspeed = 1;
    if (Math.round(Math.random() * 2 == 1)) {
        ballxdirection = 1;
    }
    else {
        ballxdirection = -1;
    }
    if (Math.round(Math.random() * 2 == 1)) {
        ballydirection = 1;
    }
    else {
        ballydirection = -1;
    }
    ballx = gamewidth / 2;
    bally = gameheight / 2;
    drawball(ballx, bally);
};
function moveball() {
    ballx += (ballspeed * ballxdirection);
    bally += (ballspeed * ballydirection);
};
function drawball() {
    ctx.fillStyle = ballcolor;
    ctx.strokeStyle = ballbordercolor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballx, bally, ballradius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};
function checkhit() {
    if (bally <= 0 + ballradius) {
        ballydirection *= -1;
    }
    if (bally >= gameheight - ballradius)
        ballydirection *= -1;
    if (ballx < 0) {
        player2score += 1;
        updatescore();
        createball();
        return;
    }
    if (ballx > gamewidth) {
        player1score += 1;
        updatescore();
        createball();
        return;
    }
    if (ballx <= paddle1.x + paddle1.width + ballradius) {
        if (bally > paddle1.y && bally < paddle1.y + paddle1.height) {
            ballxdirection *= -1;
            ballspeed += 0.5;
        }
    }
    if (ballx >= paddle2.x - ballradius) {
        if (bally > paddle2.y && bally < paddle2.y + paddle2.height) {
            ballxdirection *= -1;
            ballspeed += 0.5;
        }
    }
};
function changedirection() {
    const keypressed = event.keyCode;
    const paddle1up = 87;
    const paddle1down = 83;
    const paddle2up = 38;
    const paddle2down = 40;

    switch (keypressed) {
        case (paddle1up):
            if (paddle1.y > 0)
                paddle1.y -= paddlespeed;
            break;
        case (paddle1down):
            if (paddle1.y < 400)
                paddle1.y += paddlespeed;
            break;
        case (paddle2up):
            if (paddle2.y > 0)
                paddle2.y -= paddlespeed;
            break;
        case (paddle2down):
            if (paddle2.y < 400)
                paddle2.y += paddlespeed;
            break;
    }
};
function updatescore() {
    scoretext.textContent = `${player1score} : ${player2score}`;
};
function restart() {
    player1score = 0;
    player2score = 0;
    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    }
    paddle2 = {
        width: 25,
        height: 100,
        x: gamewidth - unit,
        y: gameheight - 100
    }
    ballspeed = 1;
    ballx = 0;
    bally = 0;
    ballxdirection = 0;
    ballydirection = 0;
    updatescore();
    clearInterval(interval);
    gamestart();
};
function clearboard() {
    ctx.fillStyle = backcolor;
    ctx.fillRect(0, 0, gamewidth, gameheight);
};