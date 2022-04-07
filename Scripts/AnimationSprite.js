class AnimationSprite {
    constructor(image, posX, posY, velocityX, velocityY) {
        this.Image = image;
        this.Position = { X: posX, Y: posY };
        this.Velocity = { X: velocityX, Y: velocityY };
        this.FlipAnimation = false;
    }

    SetUpAnimation(frameWidth, frameHeight, beginXTile, beginYTile, endXTile, endYTile) {
        this.FrameWidth = frameWidth;
        this.FrameHeight = frameHeight;
        this.AnimationConfig = { Begin: { X: beginXTile, Y: beginYTile }, End: { X: endXTile, Y: endYTile } };
        this.AnimationState = { X: beginXTile, Y: beginYTile };
    }

    Update(context, canvas) {
        this.AnimationState.X += 1;

        if (this.AnimationState.X > this.AnimationConfig.End.X) {
            this.AnimationState.Y += 1;
            this.AnimationState.X = this.AnimationConfig.Begin.X;

            if (this.AnimationState.Y > this.AnimationConfig.End.Y) {
                this.AnimationState.Y = this.AnimationConfig.Begin.Y;
            }
        }

        this.Position.X += this.Velocity.X;
        this.Position.Y += this.Velocity.Y;
    }

    Draw(context, canvas) {
        let imageX = this.AnimationState.X * this.FrameWidth;
        let imageY = this.AnimationState.Y * this.FrameHeight;

        context.save();
        if (this.FlipAnimation) {
            context.scale(-1, 1);
        }

        let modifier = this.FlipAnimation ? -1 : 1;
        context.drawImage(this.Image, imageX, imageY, this.FrameWidth, this.FrameHeight, this.Position.X * modifier, this.Position.Y,
            this.FrameWidth / 10, this.FrameHeight / 10);
        context.restore();
    }
}