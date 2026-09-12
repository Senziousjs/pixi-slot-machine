import * as PIXI from 'pixi.js';

export class Reel {
    constructor(x, y, width, height, symbols) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.symbols = symbols;
        this.container = null;
        this.symbolSprites = [];
        this.currentSymbolIndex = 0;
        this.isSpinning = false;
        this.spinSpeed = 0;
        this.targetSpeed = 0;
    }

    create() {
        this.container = new PIXI.Container();
        this.container.x = this.x;
        this.container.y = this.y;

        // Create mask for reel (clipping)
        const mask = new PIXI.Graphics();
        mask.drawRect(0, 0, this.width, this.height);
        this.container.mask = mask;
        this.container.addChild(mask);

        // Create symbol display
        this.symbolDisplay = new PIXI.Container();
        this.symbolDisplay.y = this.height / 2 - 40;
        this.container.addChild(this.symbolDisplay);

        // Initialize with random symbol
        this.currentSymbolIndex = Math.floor(Math.random() * this.symbols.length);
        this.displaySymbol(this.symbols[this.currentSymbolIndex]);

        // Add border
        const border = new PIXI.Graphics();
        border.lineStyle(3, 0xFFD700, 1);
        border.drawRect(0, 0, this.width, this.height);
        this.container.addChild(border);

        return this.container;
    }

    displaySymbol(symbol) {
        this.symbolDisplay.removeChildren();

        const text = new PIXI.Text(symbol, {
            fontFamily: 'Arial',
            fontSize: 80,
            fill: 0xFFFFFF,
            align: 'center',
            dropShadow: true,
            dropShadowColor: 0x000000,
            dropShadowBlur: 4,
            dropShadowDistance: 3
        });

        text.x = (this.width - text.width) / 2;
        text.y = -40;
        this.symbolDisplay.addChild(text);
    }

    spin(callback) {
        if (this.isSpinning) return;

        this.isSpinning = true;
        const spins = Math.floor(Math.random() * 5) + 5; // 5-9 complete spins
        const totalRotations = spins * this.symbols.length;
        let rotation = 0;

        // Random final symbol
        this.currentSymbolIndex = Math.floor(Math.random() * this.symbols.length);

        const animate = () => {
            rotation++;
            const easeProgress = rotation / totalRotations;

            // Easing: start fast, slow down at the end
            const easeValue = easeProgress < 0.7
                ? easeProgress
                : 0.7 + (easeProgress - 0.7) * 0.3;

            // Update symbol display with spinning effect
            if (rotation % 1 === 0) {
                const displayIndex = (this.currentSymbolIndex + Math.floor(rotation % this.symbols.length)) % this.symbols.length;
                this.displaySymbol(this.symbols[displayIndex]);

                // Scale animation for spinning effect
                const scale = 1 + Math.sin(rotation * 0.3) * 0.05;
                this.symbolDisplay.scale.set(scale);
            }

            if (rotation < totalRotations) {
                requestAnimationFrame(animate);
            } else {
                // Final symbol
                this.displaySymbol(this.symbols[this.currentSymbolIndex]);
                this.symbolDisplay.scale.set(1);
                this.isSpinning = false;
                if (callback) callback();
            }
        };

        animate();
    }

    flash() {
        let flashes = 0;
        const maxFlashes = 6;

        const flashAnimation = () => {
            this.container.alpha = flashes % 2 === 0 ? 0.5 : 1;
            flashes++;

            if (flashes < maxFlashes) {
                setTimeout(flashAnimation, 100);
            } else {
                this.container.alpha = 1;
            }
        };

        flashAnimation();
    }

    getCurrentSymbol() {
        return this.symbols[this.currentSymbolIndex];
    }

    reset() {
        this.currentSymbolIndex = Math.floor(Math.random() * this.symbols.length);
        this.displaySymbol(this.symbols[this.currentSymbolIndex]);
        this.isSpinning = false;
    }
}