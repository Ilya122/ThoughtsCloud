function getRand(min, max) {
    return Math.random() * (max - min) + min;
}

class Weather {
    constructor() {
        this.WordsColor = "";
        this.Color = "#b4ddff";
        this.SkyColor = '#FFFFFF'
    }

    Update(context, canvas) {

    }

    Draw(context, canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.rect(0, 0, canvas.width, canvas.height);
        context.fillStyle = this.SkyColor;
        context.fill();
    }
}