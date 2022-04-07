class Word {
    constructor(text, x, y, velocityY, size, color, alpha = 1.0) {
        this.Text = text;
        this.X = x;
        this.Y = y;
        this.Color = color;
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
        context.fillStyle = `rgba(${this.Color}, ` + this.Alpha + ")";
        context.font = `${this.Size}pt Arial`;
        context.fillText(this.Text, this.X, this.Y);
    }
    IsStopped() {
        return this.Alpha < 0;
    }
}