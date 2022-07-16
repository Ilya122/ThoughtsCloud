window.wordList = [];
canvas = drawingArea;
ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
window.weather = new Cloudy(canvas);

function OnThoughtClick() {
    var canvas = drawingArea;
    let canvasHeight = canvas.height;
    let text = thoughtBox.value;

    const wordSize = 15;
    const words = text.split(" ");
    words.map(word => {
        let randX = Math.round(getRand(0, canvas.width - 50));
        let randY = Math.round(getRand(0, 50));

        let randVel = Math.round(getRand(10, 25));
        window.wordList.push(new Word(word, randX, canvasHeight - wordSize - randY, randVel, wordSize, window.weather.WordsColor, 1.0));
    });

    thoughtBox.value = '';
}

thoughtBox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        OnThoughtClick();
    }
});

canvasAndInput.ondblclick = function() {
    canvas.requestFullscreen();
};


function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    window.weather.Update(ctx, canvas);
    window.weather.Draw(ctx, canvas);

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

function DrawA() {
    drawCanvas();
}
setInterval(DrawA, 40);

// -------------------------------- Changing weather
function ChangeHeroColor() {
    let ele = document.querySelector("#heroTitle");
    ele.style.backgroundColor = window.weather.Color;
}

function SelectCloudy() {
    window.weather = new Cloudy(canvas);
    ChangeHeroColor();
}

function SelectSunny() {
    window.weather = new Sunny(canvas);
    ChangeHeroColor();
}


function SelectRainy() {
    window.weather = new Rainy(canvas);
    ChangeHeroColor();
}