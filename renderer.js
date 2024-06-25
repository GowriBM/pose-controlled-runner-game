let game;

window.onload = function () {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    game = new Phaser.Game(config);

    function preload() {
        this.load.image('background', 'assets/background.png');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 48 });
        // Load obstacle spritesheets or images
    }

    function create() {
        this.add.image(400, 300, 'background');

        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        // Initialize pose detection and setup event listeners for pose changes
        setupPoseDetection();
    }

    function update() {
        // Handle player controls based on keyboard or pose input
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    function setupPoseDetection() {
        // Set up MediaPipe Pose detection and handle pose updates
        window.electron.receiveSettings((settings) => {
            // Initialize Pose detection based on settings
        });

        // Example event listener for pose updates
        setInterval(() => {
            const poseData = {}; // Replace with actual pose detection logic
            window.electron.sendPoseData(poseData);
        }, 1000 / 30); // Send pose data every 30 frames (adjust as needed)
    }
};

