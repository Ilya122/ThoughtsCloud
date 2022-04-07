class Sun {
    constructor(image, x, y, rotationSpeed, width, height) {
        this.Image = image;
        this.X = x;
        this.Y = y;
        this.Width = width;
        this.Height = height;
        this.RotationSpeed = rotationSpeed;
        this.AngleDegree = 0;
    }

    Update(context, canvas) {
        this.AngleDegree += this.RotationSpeed;
        if (this.AngleDegree > 360) {
            this.AngleDegree -= 360;
        }
    }

    Draw(context, canvas) {
        // rotate the canvas to the specified degrees
        context.save();
        context.translate(this.X, this.Y);
        context.rotate(this.AngleDegree * Math.PI / 180);
        context.drawImage(this.Image, -1 * this.Width / 2, -1 * this.Height / 2, this.Width, this.Height);
        context.restore();
    }
}

class Sunny extends Weather {
    constructor(canvas) {
        super();
        this.WordsColor = "255, 185, 2";
        this.Color = "#ffe0b4";

        let canvasHeight = canvas.height;
        let canvasWidth = canvas.width;

        var img = new Image();
        img.onload = function() {}
        img.src = "sun.png";

        this.Sun = new Sun(img, canvasWidth - 32, 32, 1, 64, 64);

        this.Birds = [];
    }

    Update(context, canvas) {
        if (this.Birds.length == 0) {
            for (let i = 0; i < 6; i++) {
                this.SpawnNewBird(context, canvas);
            }
        }
        this.Sun.Update(canvas);

        let toRemove = [];

        this.Birds.map(bird => {
            bird.Update(context, canvas);

            if (bird.IsGoingRight() && bird.X() > canvas.width) {
                toRemove.push(bird);
            } else if (!bird.IsGoingRight() && bird.X() < 0) {
                toRemove.push(bird);
            }
        });

        toRemove.forEach(birdToRemove => {
            const index = this.Birds.indexOf(birdToRemove);
            if (index > -1) {
                this.Birds.splice(index, 1); // 2nd parameter means remove one item only
            }
            this.SpawnNewBird(context, canvas);
        });
    }

    Draw(context, canvas) {
        this.Sun.Draw(context);
        this.Birds.map(bird => bird.Draw(context, canvas));
    }

    SpawnNewBird(context, canvas) {
        let randY = getRand(10, canvas.height - 10);
        let isRightSide = getRand(0, 100) > 50;
        let additionalVel = getRand(3, 10) / 10;

        let velocityX = isRightSide ? 3 + additionalVel : -3 + (-1 * additionalVel);
        let velocityY = 0;
        let startX = isRightSide ? 0 : canvas.width;
        this.Birds.push(new Bird(startX, randY, velocityX, velocityY));
    }
}