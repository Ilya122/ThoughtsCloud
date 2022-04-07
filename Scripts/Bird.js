class Bird {
    constructor(x, y, velocityX, velocityY) {
        var img = new Image();
        img.onload = function() {}
        img.src = "birdAnimation.png";

        this.Animation = new AnimationSprite(img, x, y, velocityX, velocityY);
        this.Animation.SetUpAnimation(376, 376, 0, 0, 3, 0);

        this.Animation.FlipAnimation = velocityX < 0;
        this.IsGoingRight = () => { return velocityX > 0; };
    }

    X() {
        return this.Animation.Position.X;
    }
    Y() {
        return this.Animation.Position.Y;
    }


    Update(context, canvas) {
        this.Animation.Update(context, canvas);
    }

    Draw(context, canvas) {

        this.Animation.Draw(context, canvas);
    }
}