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
        context.scale(1, 1);
    }

}

class Cloudy extends Weather {
    constructor(canvas) {
        super();
        this.WordsColor = "183, 234, 255";
        this.Color = "#b4ddff";
        this.SkyColor = '#C9F8FF'
        this.clouds = [];

        let canvasHeight = canvas.height;
        let canvasWidth = canvas.width;

        for (let i = 0; i < 30; i++) {
            var img = new Image();
            img.src = "cloud1.png";
            let randX = Math.round(getRand(0, canvasWidth - 50));
            let randY = Math.round(getRand(0, canvasHeight - 50));
            let randVelX = Math.round(getRand(1, 5)) / 10;

            this.clouds.push(new Cloud(img, randX, canvasHeight - img.height - randY, randVelX, 0));
        }

        for (let i = 0; i < 30; i++) {
            var img = new Image();
            img.src = "cloud2.png";
            let randX = Math.round(getRand(0, canvasWidth - 50));
            let randY = Math.round(getRand(0, canvasHeight - 50));
            let randVelX = Math.round(getRand(1, 5)) / 10;

            this.clouds.push(new Cloud(img, randX, canvasHeight - img.height - randY, randVelX, 0));
        }

        for (let i = 0; i < 3; i++) {

            var img = new Image();
            img.src = "cloud3.png";
            let randX = Math.round(getRand(0, canvasWidth - 50));
            let randY = Math.round(getRand(0, canvasHeight - 50));
            let randVelX = Math.round(getRand(1, 5)) / 10;

            this.clouds.push(new Cloud(img, randX, canvasHeight - img.height - randY, randVelX, 0));
        }
    }

    Update(context, canvas) {
        this.clouds.map(cloud => {
            cloud.Update(canvas);
        });
    }

    Draw(context, canvas) {
        super.Draw(context, canvas);
        this.clouds.map(cloud => {
            cloud.Draw(context);
        });
    }
}