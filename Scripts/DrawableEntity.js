class DrawableEntity {
    constructor(image, x, y, velocityX, velocityY) {
        this.Image = image;
        this.Position = { X: x, Y: y };
        this.Velocity = { X: velocityX, Y: velocityY };
    }

    Update(context, canvas) {
        this.Position.X += this.Velocity.X;
        this.Position.Y += this.Velocity.Y;
    }

    Draw(context, canvas) {
        context.drawImage(this.Image, this.Position.X, this.Position.Y);
    }

}