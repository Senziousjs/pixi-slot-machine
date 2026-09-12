# PixiJS Professional Slot Machine

Eine vollständig funktionierende, professionelle Slot-Maschine gebaut mit PixiJS und JavaScript.

## 🎰 Features

- **3 Spinning Reels** mit realistischen Animations-Effekten
- **Symbol-System** mit verschiedenen Auszahlungsquoten
- **Win Detection** für verschiedene Gewinnkombinationen
- **Particle Effects** und Konfetti-Animation bei Gewinnen
- **Balance & Bet Management** für Spielverlauf
- **Responsive Design** mit modernem UI
- **Smooth Animations** und professionelle Übergänge

## 🎲 Gewinnkombinationen

- **3 gleiche Symbole**: Multiplier basierend auf Symbol
  - 🍒 Cherry: 2x Wetteinsatz
  - 🍊 Orange: 3x Wetteinsatz
  - 🍋 Lemon: 4x Wetteinsatz
  - 🍌 Banana: 5x Wetteinsatz
  - 🍉 Watermelon: 7x Wetteinsatz
  - ⭐ Star: 20x Wetteinsatz

- **2 gleiche Symbole**: 1.5x Wetteinsatz

## 🚀 Installation

```bash
npm install
```

## 💻 Entwicklung

```bash
npm run dev
```

Die Anwendung öffnet sich automatisch unter `http://localhost:3000`

## 🏗️ Build

```bash
npm run build
```

Output wird im `dist/` Verzeichnis erstellt.

## 📁 Projektstruktur

```
pixi-slot-machine/
├── index.html          # Main HTML mit UI
├── src/
│   ├── index.js        # Entry Point
│   ├── SlotMachine.js  # Haupt-Spiellogik
│   ├── Reel.js         # Individuelle Reel-Klasse
│   └── UIManager.js    # UI-Updates
├── package.json        # Abhängigkeiten
├── vite.config.js      # Vite Konfiguration
└── README.md           # Diese Datei
```

## 🎮 Spielweise

1. **SPIN Button drücken** um die Rollen zu drehen
2. Gewinnkombinationen werden automatisch erkannt
3. Gewinn wird zu Balance hinzugefügt
4. **RESET Button** startet das Spiel neu

## 🛠️ Technologien

- **PixiJS 8.0** - WebGL Rendering Engine
- **Vite** - Fast Build Tool
- **JavaScript ES6+** - Moderne JavaScript Features

## 📝 Lizenz

MIT

## 👤 Autor

Erstellt mit ❤️ für professionelle Slot-Machine Entwicklung