class RainDrop extends DrawableEntity {
    constructor(image, x, y, velocityX, velocityY) {
        super(image, x, y, velocityX, velocityY);
    }

    Update(context, canvas) {
        super.Update(context, canvas);

        // Check for umbrella pos and bounce
        if (this.X > canvas.width) {
            this.X = 0;
        }
    }

}

class Umbrealla {
    constructor() {
        var img = new Image();
        img.src = "umbrella.png";

        this.Image = img;
        this.Position = { X: 0, Y: 0 };

        this.IsRegistered = false;
    }

    Update(context, canvas) {

        if (!this.IsRegistered) {
            let t = this;
            canvas.addEventListener("mousemove", function(e) {
                var cRect = canvas.getBoundingClientRect(); // Gets CSS pos, and width/height
                var canvasX = Math.round(e.clientX - cRect.left); // Subtract the 'left' of the canvas 
                var canvasY = Math.round(e.clientY - cRect.top); // from the X/Y positions to make  
                t.Position.X = canvasX - t.Image.width / 2;
                t.Position.Y = canvasY - t.Image.height / 2;
            });
        }

    }
    Draw(context, canvas) {
        context.drawImage(this.Image, this.Position.X, this.Position.Y);
    }

    GetMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            X: evt.clientX - rect.left,
            Y: evt.clientY - rect.top
        };
    }
}
class Rainy extends Weather {
    constructor(canvas) {
        super();
        this.WordsColor = "183, 234, 255";
        this.Color = "#001851";

        this.Umbrealla = new Umbrealla();
        this.RainDrops = [];
        this.NumberOfDrops = 25;
    }

    Update(context, canvas) {
        this.RainDrops.map(rainDrop => {
            if (rainDrop.Position.Y > canvas.height) {
                let randX = getRand(0, canvas.width - 10);
                rainDrop.Position.X = randX;
                rainDrop.Position.Y = -20;
                rainDrop.Velocity.Y = 5;

            }

            rainDrop.Velocity.Y += 0.5;
            rainDrop.Update(context, canvas);
        });

        if (this.RainDrops.length < this.NumberOfDrops) {
            this.GenerateDrop(canvas);
        }
        this.Umbrealla.Update(context, canvas);
    }

    Draw(context, canvas) {
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

        this.RainDrops.push(new RainDrop(img, randX, 0, 0, 5));
    }

}