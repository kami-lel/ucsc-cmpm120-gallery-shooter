class Start extends Phaser.Scene {
    constructor() {
        super('start');  // scene name

        this.my = {sprite: {}};  // Create an object to hold sprite bindings
    }

    preload() {
        /* load assets */
        this.load.setPath("./assets/images/");
        this.load.image("character_roundRed", "character_roundRed.png");
        this.load.image("item_arrow", "item_arrow.png");
    }

    create() {
        /* determine main char initial location by canvas size */
        let height = this.sys.game.canvas.height;
        let width = this.sys.game.canvas.width;
        this.player_init_y = height - 100;
        this.player_init_x = width / 2;

        /* set player related constant */
        this.player_leftmost_x = 30;
        this.player_rightmost_x = width - this.player_leftmost_x;
        this.player_x_delta = 20;  // pixel per update

        /* creat sprite */
        this.my.sprite.arrow = this.add.sprite(100, 100, 'item_arrow');
        this.my.sprite.arrow.rotation = -Math.PI/2;  // make arrow point upward
        this.my.sprite.arrow.visible = false;

        this.my.sprite.player = this.add.sprite(
                this.player_init_x, this.player_init_y, "character_roundRed");

        this.arrow_in_flight = false;  // whether arrow is in flight
        this.arrow_y_delta = 10;  // pixel per update

        /* set up keys */
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {
        /* player movement */
        if (this.keyA.isDown) {
            this.my.sprite.player.x -= this.player_x_delta;  // movement
            // make sure not going out of screen
            if (this.my.sprite.player.x < this.player_leftmost_x)
                this.my.sprite.player.x = this.player_leftmost_x;

        } else if (this.keyD.isDown) {
            this.my.sprite.player.x += this.player_x_delta;
            // make sure not going out of screen
            if (this.my.sprite.player.x > this.player_rightmost_x)
                this.my.sprite.player.x = this.player_rightmost_x;
        }

        /* arrow movement */
        if (this.arrow_in_flight) {  // already in flight
            this.my.sprite.arrow.y -= this.arrow_y_delta;
            if (this.my.sprite.arrow.y <= 0) {  // finish flight
                this.arrow_in_flight = false;
                this.my.sprite.arrow.visible = false;
            }
        } else if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            // start flight
            this.arrow_in_flight = true;
            this.my.sprite.arrow.x = this.my.sprite.player.x;
            this.my.sprite.arrow.y = this.player_init_y;
            this.my.sprite.arrow.visible = true;
        }
    }
}
