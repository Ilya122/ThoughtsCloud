function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        X: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        Y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

class RainDrop extends DrawableEntity {
    constructor(image, x, y, velocityX, velocityY, gravity) {
        super(image, x, y, velocityX, velocityY);
        this.Circle = { Radius: image.width / 2 };
        this.Gravity = gravity;
    }

    Update(context, canvas) {
        this.Position.X += this.Velocity.X;
        this.Position.Y += this.Velocity.Y;

        if (this.Gravity > 0) {
            this.Velocity.Y += this.Gravity;
        }

        // Check for umbrella pos and bounce
        if (this.X > canvas.width) {
            this.X = 0;
        }
    }

    Draw(context, canvas) {
        super.Draw(context, canvas);
    }

}

class Umbrealla {
    constructor() {
        var img = new Image();
        img.src = "umbrella.png";

        this.Image = img;
        this.Position = { X: 0, Y: 0 };
        this.Circle = { Radius: 64 };
        this.IsRegistered = false;
    }

    Update(context, canvas) {
        if (!this.IsRegistered) {
            let t = this;
            canvas.addEventListener("mousemove", function(e) {
                let pos = getMousePos(canvas, e);
                t.Position.X = pos.X - t.Image.width / 2;
                t.Position.Y = pos.Y - t.Image.height / 2;
            });
        }

    }
    Draw(context, canvas) {
        context.drawImage(this.Image, this.Position.X, this.Position.Y);
    }

    Collide(rainDrop) {
        var dx = rainDrop.Position.X - (rainDrop.Image.width / 2) - this.Position.X - (this.Image.width / 2);
        var dy = rainDrop.Position.Y - (rainDrop.Image.height / 2) - this.Position.Y - (this.Image.height / 2);
        var rSum = rainDrop.Circle.Radius + this.Circle.Radius;
        return (dx * dx + dy * dy <= rSum * rSum);
    }
}

class Rainy extends Weather {
    constructor(canvas) {
        super();
        this.WordsColor = "183, 234, 255";
        this.Color = "#001851";
        this.SkyColor = '#BAC3FF'

        this.Umbrealla = new Umbrealla();
        this.RainDrops = [];
        this.NumberOfDrops = 100;
    }

    Update(context, canvas) {
        let umbrella = this.Umbrealla;

        this.RainDrops.map(rainDrop => {
            if (rainDrop.Position.Y > canvas.height) {
                let randX = getRand(0, canvas.width - 10);
                rainDrop.Position.X = randX;
                rainDrop.Position.Y = -20;
                rainDrop.Velocity.X = 0;
                rainDrop.Velocity.Y = 6;
            }

            rainDrop.Velocity.Y += 0.3;
            rainDrop.Update(context, canvas);

            if (umbrella.Collide(rainDrop)) {
                let newXVel = 0;
                let newVel = -10;
                if (rainDrop.Position.X + (rainDrop.Image.width / 2) > (umbrella.Position.X + (umbrella.Image.width / 2))) {
                    newXVel = 20;
                } else {
                    newXVel = -20;
                }
                rainDrop.Velocity.X = newXVel;
                rainDrop.Velocity.Y = newVel;
            } else {
                //rainDrop.Velocity.X = 0;
            }
        });

        if (this.RainDrops.length < this.NumberOfDrops) {
            this.GenerateDrop(canvas);
        }
        this.Umbrealla.Update(context, canvas);
    }

    Draw(context, canvas) {
        super.Draw(context, canvas);
        this.Umbrealla.Draw(context, canvas);
        this.RainDrops.map(rainDrop => {
            rainDrop.Draw(context, canvas);
        });

    }

    GenerateDrop(canvas) {
        let numOfDrops = this.RainDrops.length;
        if (numOfDrops >= this.NumberOfDrops) {
            return;
        }
        var img = new Image();
        img.src = "rainDrop.png";
        let randX = getRand(0, canvas.width - 10);

        this.RainDrops.push(new RainDrop(img, randX, 0, 0, 3, 0.2));
    }

}