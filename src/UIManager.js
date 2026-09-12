export class UIManager {
    constructor(slotMachine) {
        this.slotMachine = slotMachine;
        this.balanceElement = document.getElementById('balance');
        this.betElement = document.getElementById('bet');
        this.winElement = document.getElementById('win');
        this.spinButton = document.getElementById('spinButton');
    }

    updateUI() {
        this.balanceElement.textContent = this.slotMachine.getBalance();
        this.betElement.textContent = this.slotMachine.getBet();
        this.winElement.textContent = this.slotMachine.getLastWin();

        // Update button state
        this.spinButton.disabled = !this.slotMachine.canSpin();

        // Flash win display if there's a win
        if (this.slotMachine.getLastWin() > 0) {
            this.winElement.style.color = '#FFD700';
            this.winElement.style.fontSize = '18px';
            setTimeout(() => {
                this.winElement.style.color = '#FFFFFF';
                this.winElement.style.fontSize = '14px';
            }, 500);
        }
    }
}