class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.frogVelocity = 700
        this.frogMaxVelocity = 800
        this.frogBounce = 0.5

        // hop points for player one
        this.hopPoint = new Phaser.Math.Vector2()
        this.canHop = true

        // hop points for player two
        this.hopPointTwo = new Phaser.Math.Vector2()
        this.canHopTwo = true

        //center target
        this.targetX = centerX
        this.targetY = centerY
    }

    create() {


        this.add.sprite(centerX, centerY, 'circle')
        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys()


        //creation of player one frog and its properties
        this.frog = this.physics.add.sprite(200, 375, 'frog').setOrigin(0.5).setScale(0.80)
        this.frog.body.setSize(180, 180)
        //this.frog.setCollideWorldBounds(true)
        //this.frog.setBounce(this.frogBounce)
        this.frog.setImmovable()
        this.frog.setMaxVelocity(this.frogMaxVelocity, this.frogMaxVelocity )
        //this.frog.setDragY(this.frogDragY)
        this.frog.setDepth(1)
        this.frog.destroyed = false 
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        //creation of player two frog and its properties
        this.frogTwo = this.physics.add.sprite(760, 375, 'frog').setOrigin(0.5).setScale(0.80)
        this.frogTwo.body.setSize(180, 180)
        //this.frogTwo.setCollideWorldBounds(true)
        //this.frogTwo.setBounce(this.frogBounce)
        this.frogTwo.setImmovable()
        this.frogTwo.setMaxVelocity(this.frogMaxVelocity, this.frogMaxVelocity )
        //this.frogTwo.setDragY(this.frogDragY)
        this.frogTwo.setDepth(1)
        this.frogTwo.destroyed = false 


         // Create the projectile sprite for player one
         this.attack = this.physics.add.sprite(this.frog.x, this.frog.y).setOrigin(0.5).setActive(false)

         // Create the projectile sprite for player two
         this.attackTwo = this.physics.add.sprite(this.frogTwo.x, this.frogTwo.y).setOrigin(0.5).setActive(false)
         

    }

    update() {

        // movement inputs for player one
        if(Phaser.Input.Keyboard.JustDown(keyS)) {
            if(this.frog.y < 525 && this.canHop) {
                //hop to test
                
                if(this.frog.y == 375){
                    this.hopPoint.x = this.frog.x + 100
                    //console.log(this.hopPoint)
                }
                else if(this.frog.y == 75){
                    this.hopPoint.x = this.frog.x - 100
                }
                else {
                    this.hopPoint.x = this.frog.x
                }
                //this.hopPoint.x = this.frog.x
                this.hopPoint.y = this.frog.y + 150
                console.log(this.hopPoint)
                this.physics.moveToObject(this.frog, this.hopPoint, this.frogVelocity)
                this.canHop = false
            }
        }
        else if(Phaser.Input.Keyboard.JustDown(keyW)) {
            if(this.frog.y > 75 && this.canHop) {
                //hop to test
                if(this.frog.y == 525){
                    this.hopPoint.x = this.frog.x - 100
                    //console.log(this.hopPoint)
                }
                else if(this.frog.y == 225){
                    this.hopPoint.x = this.frog.x + 100
                }
                else {
                    this.hopPoint.x = this.frog.x
                }
                //this.hopPoint.x = this.frog.x
                this.hopPoint.y = this.frog.y - 150
                this.physics.moveToObject(this.frog, this.hopPoint, this.frogVelocity)
                this.canHop = false
            }
        }

        // attack input
        if(Phaser.Input.Keyboard.JustDown(keyD)) {
            // shoot out projectile at an angle
            this.attack.setPosition(this.frog.x, this.frog.y)
            this.physics.velocityFromRotation(this.angle, 2000, this.attack.body.velocity) // Adjust speed as needed
            

        }


        // movement inputs for player two
        // down
        if(Phaser.Input.Keyboard.JustDown(cursors.down)) {
            if(this.frogTwo.y < 525 && this.canHopTwo) {
                //hop to test
                if(this.frogTwo.y == 375){
                    this.hopPointTwo.x = this.frogTwo.x - 100
                    //console.log(this.hopPoint)
                }
                else if(this.frogTwo.y == 75){
                    this.hopPointTwo.x = this.frogTwo.x + 100
                }
                else {
                    this.hopPointTwo.x = this.frogTwo.x
                }
                this.hopPointTwo.y = this.frogTwo.y + 150
                this.physics.moveToObject(this.frogTwo, this.hopPointTwo, this.frogVelocity)
                this.canHopTwo = false
            }
        }
        // up
        else if(Phaser.Input.Keyboard.JustDown(cursors.up)) {
            if(this.frogTwo.y > 75 && this.canHopTwo) {
                //hop to test
                if(this.frogTwo.y == 525){
                    this.hopPointTwo.x = this.frogTwo.x + 100
                //console.log(this.hopPoint)
                }
                else if(this.frogTwo.y == 225){
                    this.hopPointTwo.x = this.frogTwo.x - 100
                }
                else {
                    this.hopPointTwo.x = this.frogTwo.x
                }
                this.hopPointTwo.y = this.frogTwo.y - 150
                this.physics.moveToObject(this.frogTwo, this.hopPointTwo, this.frogVelocity)
                this.canHopTwo = false
            }
        }

        // attack input
        if(Phaser.Input.Keyboard.JustDown(cursors.left)) {
            // shoot out projectile at an angle
            this.attackTwo.setPosition(this.frogTwo.x, this.frogTwo.y)
            this.physics.velocityFromRotation(this.angleTwo, 2000, this.attackTwo.body.velocity) // Adjust speed as needed
            

        }

        
        const tolerance = 10;

        // check to see if frog ONE has reached hop point
        const distance = Phaser.Math.Distance.BetweenPoints(this.frog, this.hopPoint)

        if (this.frog.body.speed > 0)
        {
            if (distance < tolerance)
            {
                console.log('distance')
                this.frog.body.reset(this.hopPoint.x, this.hopPoint.y)
                this.canHop = true
            }
        }

        // check to see if frog TWO has reached hop point

        const distanceTwo = Phaser.Math.Distance.BetweenPoints(this.frogTwo, this.hopPointTwo)

        if (this.frogTwo.body.speed > 0)
        {

            if (distanceTwo < tolerance)
            {
                this.frogTwo.body.reset(this.hopPointTwo.x, this.hopPointTwo.y)
                this.canHopTwo = true
            }
        }


        // collisions
        //this.physics.world.collide(this.frog, this.enemyGroup, this.enemyCollision, null, this) //enemy vs frog

        // gladiator practice 

        // rotate sprite
        this.angle = Phaser.Math.Angle.Between(this.frog.x, this.frog.y, this.targetX, this.targetY);
        this.frog.rotation = this.angle

        // rotate sprite
        this.angleTwo = Phaser.Math.Angle.Between(this.frogTwo.x, this.frogTwo.y, this.targetX, this.targetY)
        this.frogTwo.rotation = this.angleTwo
    }
}