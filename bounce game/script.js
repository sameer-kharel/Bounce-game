let canvas = document.getElementById('game'),
 ctx = canvas.getContext('2d'),
 ballRadius = 9,
 x = canvas.width / (Math.floor(Math.random() * 10) + 3),
 y = canvas.height - 40,
 dx = 2,
 dy = -2;
let paddleHeight = 12,
    paddleWidth = 72;

// paddle start position 

let paddleX = (canvas.width - paddleWidth) / 2;

//bricks

let rowCount = 5,
    columnCount = 9,
    brickWidth = 54,
    brickHeight = 18,
    brickPadding = 12,
    topOffset = 40,
    leftOffset = 33,
    score = 0;

//Brick array 

let bricks = []
for (let c= 0; c< columnCount; c++){
    bricks[c] = []
    for(let r =0; r< rowCount; r++){

        //set positionof bricks 

        bricks[c][r] = {x : 0, y : 0, status : 1}
    }
}
// mouse moveing eventistener and function

document.addEventListener("mousemove", mouseMoveHandler, false)

//move paddle with mouse

function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft
    if (relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth / 2
    }
}
// draw paddle

function drawPaddle(){
    ctx.beginPath()
    ctx.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 30)
    ctx.fillStyle = '#333'
    ctx.fill()
    ctx.closePath()
}

// draw ball

function drawBall(){
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2 )
    ctx.fillStyle = '#333'
    ctx.fill()
    ctx.closePath()
}

// draw Bricks

function drawBricks(){
    for (let c = 0; c < columnCount; c++){
        for(let r = 0; r < rowCount; r++){
            if (bricks[c][r].status ===1){
                let brickX = (c * (brickWidth + brickPadding)) + 
                leftOffset
                let brickY = (r * (brickHeight + brickPadding)) +
                topOffset
                bricks[c][r].x = brickX
                bricks[c][r].y = brickY
                ctx.beginPath()
                ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30)
                ctx.fillStyle = '#333'
                ctx.fill()
                ctx.closePath()
            }
        }
    }

}

//trak score
function trackScore(){
    ctx.font = 'bold 16px sans-serif'
    ctx.fillStyle = '#333'
    ctx.fillText('score : ' + score, 8, 24 )

}

//check ball hit bricks
function hitDetection(){
    for (let c = 0; c < columnCount; c++){
        for (let r = 0; r < rowCount; r++){
            let b = bricks[c][r]
            if(b.status === 1){
                if(x > b.x && x < b.x + brickWidth && 
                    y > b.y && y < b.y + brickHeight ){
                        dy = -dy
                        b.status = 0
                        score++
                        // check win
                        if(score === rowCount * columnCount){
                            alert('you are the champion!')
                            document.location.reload()
                        }
                    }
            }
        }
    }
}

// main function
function init(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    trackScore()
    drawBricks()
    drawBall()
    drawPaddle()
    hitDetection()

    // detect left right movement
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx
    }

    // detect top wall
    if (y + dy < ballRadius){
        dy = -dy
    } else if (y + dy > canvas.height - paddleHeight - ballRadius && x > paddleX && x < paddleX + paddleWidth){
        // detect paddle hits
        dy = -dy
    } else if (y + dy > canvas.height - ballRadius){
        // if ball doesn't hit the paddle
        alert("Game over! suta.")
        document.location.reload()
    }

    // move ball 
    x += dx
    y += dy
}

setInterval(init, 10)