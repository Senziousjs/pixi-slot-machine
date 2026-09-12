import * as PIXI from 'pixi.js';
import { Reel } from './Reel.js';

export class SlotMachine {
    constructor(app) {
        this.app = app;
        this.reels = [];
        this.isSpinning = false;
        this.balance = 1000;
        this.bet = 10;
        this.lastWin = 0;

        // Symbol types and payout multipliers
        this.symbols = ['🍒', '🍊', '🍋', '🍌', '🍉', '⭐'];
        this.payouts = {
            '🍒': 2,
            '🍊': 3,
            '🍋': 4,
            '🍌': 5,
            '🍉': 7,
            '⭐': 20
        };

        this.reelContainer = null;
    }

    create() {
        // Create container for reels
        this.reelContainer = new PIXI.Container();
        this.reelContainer.x = 50;
        this.reelContainer.y = 80;
        this.app.stage.addChild(this.reelContainer);

        // Create 3 reels
        const reelWidth = 220;
        const reelHeight = 300;
        const spacing = 20;

        for (let i = 0; i < 3; i++) {
            const reel = new Reel(
                i * (reelWidth + spacing),
                0,
                reelWidth,
                reelHeight,
                this.symbols
            );
            reel.create();
            this.reels.push(reel);
            this.reelContainer.addChild(reel.container);
        }

        // Add title
        this.createTitle();

        // Add decorative elements
        this.createDecorations();
    }

    createTitle() {
        const title = new PIXI.Text('SLOT MACHINE', {
            fontFamily: 'Arial',
            fontSize: 48,
            fontWeight: 'bold',
            fill: 0xFFD700,
            align: 'center',
            stroke: 0x000000,
            strokeThickness: 4
        });

        title.x = (this.app.screen.width - title.width) / 2;
        title.y = 20;
        this.app.stage.addChild(title);
    }

    createDecorations() {
        // Create border around reels
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(3, 0xFFD700, 1);
        graphics.drawRect(40, 70, 720, 320);
        this.app.stage.addChild(graphics);

        // Create winning line indicator
        const winLine = new PIXI.Graphics();
        winLine.lineStyle(2, 0x00FF00, 0.7);
        winLine.moveTo(40, 230);
        winLine.lineTo(760, 230);
        this.app.stage.addChild(winLine);
    }

    spin() {
        if (this.isSpinning || this.balance < this.bet) {
            return;
        }

        this.isSpinning = true;
        this.balance -= this.bet;
        this.lastWin = 0;

        // Spin all reels with slight delays
        const spinPromises = this.reels.map((reel, index) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    reel.spin(() => {
                        if (index === this.reels.length - 1) {
                            // All reels finished spinning
                            setTimeout(() => {
                                this.checkWin();
                                this.isSpinning = false;
                                resolve();
                            }, 300);
                        } else {
                            resolve();
                        }
                    });
                }, index * 200);
            });
        });

        Promise.all(spinPromises);
    }

    checkWin() {
        const symbols = this.reels.map(reel => reel.getCurrentSymbol());

        // Check for three of a kind
        if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
            const symbol = symbols[0];
            this.lastWin = this.bet * this.payouts[symbol];
            this.balance += this.lastWin;
            this.playWinAnimation();
            return true;
        }

        // Check for two of a kind (smaller win)
        if (symbols[0] === symbols[1] || symbols[1] === symbols[2]) {
            this.lastWin = Math.floor(this.bet * 1.5);
            this.balance += this.lastWin;
            this.playWinAnimation();
            return true;
        }

        return false;
    }

    playWinAnimation() {
        // Create celebratory particles
        this.createConfetti();

        // Flash the reels
        this.reels.forEach(reel => {
            reel.flash();
        });
    }

    createConfetti() {
        for (let i = 0; i < 20; i++) {
            const particle = new PIXI.Sprite(PIXI.Texture.WHITE);
            particle.tint = Math.random() * 0xFFFFFF;
            particle.x = Math.random() * this.app.screen.width;
            particle.y = -10;
            particle.scale.set(Math.random() * 8 + 4);
            particle.alpha = 0.8;

            this.app.stage.addChild(particle);

            // Animate particle
            const velocity = {
                x: (Math.random() - 0.5) * 8,
                y: Math.random() * 5 + 5
            };

            let frame = 0;
            const animate = () => {
                particle.x += velocity.x;
                particle.y += velocity.y;
                particle.alpha -= 0.02;
                velocity.y += 0.2; // gravity

                frame++;
                if (particle.alpha > 0 && frame < 200) {
                    requestAnimationFrame(animate);
                } else {
                    this.app.stage.removeChild(particle);
                }
            };

            animate();
        }
    }

    canSpin() {
        return !this.isSpinning && this.balance >= this.bet;
    }

    reset() {
        this.balance = 1000;
        this.lastWin = 0;
        this.isSpinning = false;
        this.reels.forEach(reel => reel.reset());
    }

    getBalance() {
        return this.balance;
    }

    getBet() {
        return this.bet;
    }

    getLastWin() {
        return this.lastWin;
    }
}