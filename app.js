class Word {
    constructor(text, x, y, velocityY, size, alpha = 1.0) {
        this.Text = text;
        this.X = x;
        this.Y = y;
        this.VelocityY = velocityY;
        this.Size = size;
        this.Alpha = alpha;
    }

    Update() {
        this.VelocityY -= 1;
        this.Y -= this.VelocityY;
        this.Alpha -= 0.02; // decrease opacity (fade out)
    }

    Draw(context) {
        context.fillStyle = "rgba(183, 234, 255, " + this.Alpha + ")";
        context.font = `${this.Size}pt Arial`;
        context.fillText(this.Text, this.X, this.Y);
    }

    IsStopped() {
        return this.Alpha < 0;
    }
}

class Cloud {
    constructor(image, x, y, velocityX, velocityY) {
        this.Image = image;
        this.X = x;
        this.Y = y;
        this.VelocityX = velocityX;
        this.VelocityY = velocityY;
    }

    Update(canvas) {
        this.X += this.VelocityX;
        this.Y += this.VelocityY;

        if (this.X > canvas.width) {
            this.X = 0;
        }
    }

    Draw(context) {
        context.drawImage(this.Image, this.X, this.Y);
    }

}

window.wordList = [];
window.clouds = [];

function getRand(min, max) {
    return Math.random() * (max - min) + min;
}

function CreateClouds() {
    var canvas = document.getElementById('drawingArea');
    let canvasHeight = canvas.height;

    for (let i = 0; i < 3; i++) {
        var img = new Image();
        img.onload = function() {}
        img.src = "cloud1.png";
        let randX = Math.round(getRand(0, 600));
        let randY = Math.round(getRand(0, 300));
        let randVelX = Math.round(getRand(1, 5)) / 10;

        window.clouds.push(new Cloud(img, randX, canvasHeight - img.height - randY, randVelX, 0));
    }
    for (let i = 0; i < 9; i++) {
        var img = new Image();
        img.onload = function() {}
        img.src = "cloud2.png";
        let randX = Math.round(getRand(0, 600));
        let randY = Math.round(getRand(0, 300));
        let randVelX = Math.round(getRand(1, 5)) / 10;

        window.clouds.push(new Cloud(img, randX, canvasHeight - img.height - randY, randVelX, 0));
    }

}
CreateClouds();

function OnThoughtClick() {
    var canvas = document.getElementById('drawingArea');
    let canvasHeight = canvas.height;
    let input = document.getElementById("thoughtBox");
    let text = input.value;

    const wordSize = 15;
    const words = text.split(" ");
    words.map(word => {
        let randX = Math.round(getRand(0, 300));
        let randVel = Math.round(getRand(10, 15));
        window.wordList.push(new Word(word, randX, canvasHeight - wordSize, randVel, wordSize, 1.0));
    });

    input.value = '';
}

var input = document.getElementById("thoughtBox");
input.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        OnThoughtClick();
    }
});


canvas = document.getElementById('drawingArea');
ctx = canvas.getContext('2d');


function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < window.clouds.length; i++) {
        let cloud = window.clouds[i];
        cloud.Update(canvas);
        cloud.Draw(ctx);
    }

    ctx.font = '12px serif';

    let len = window.wordList.length;
    let toRemove = [];

    for (let i = 0; i < len; i++) {
        let word = window.wordList[i];
        word.Update();
        word.Draw(ctx);

        if (word.IsStopped()) {
            toRemove.push(word);
        }
    }

    toRemove.forEach(word => {
        const index = window.wordList.indexOf(word);
        if (index > -1) {
            window.wordList.splice(index, 1); // 2nd parameter means remove one item only
        }
    });
}

intervalId = 0;

function DrawA() {
    drawCanvas();
}


setInterval(DrawA, 40);