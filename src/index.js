import * as PIXI from 'pixi.js';
import { SlotMachine } from './SlotMachine.js';
import { UIManager } from './UIManager.js';

let app;
let slotMachine;
let uiManager;

async function init() {
    // Create PIXI Application
    app = new PIXI.Application({
        width: 800,
        height: 600,
        view: document.getElementById('gameCanvas'),
        backgroundColor: 0x1a1a2e,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true
    });

    // Initialize Slot Machine
    slotMachine = new SlotMachine(app);
    slotMachine.create();

    // Initialize UI Manager
    uiManager = new UIManager(slotMachine);

    // Event Listeners
    document.getElementById('spinButton').addEventListener('click', () => {
        if (slotMachine.canSpin()) {
            slotMachine.spin();
            uiManager.updateUI();
        }
    });

    document.getElementById('resetButton').addEventListener('click', () => {
        slotMachine.reset();
        uiManager.updateUI();
    });

    // Initial UI update
    uiManager.updateUI();

    console.log('Slot Machine initialized successfully!');
}

// Initialize when DOM is ready
window.addEventListener('DOMContentLoaded', init);