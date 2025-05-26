// Nyan Linktree JavaScript - Made with 💖 by Darcci
console.log('🌈 Nyan Linktree geladen! Nyaa~');

document.addEventListener('DOMContentLoaded', function () {
    // Konami Code Easter Egg (↑↑↓↓←→←→BA)
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;

    // Link Click Tracking
    const linkButtons = document.querySelectorAll('.link-button');
    linkButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const platform = this.getAttribute('data-platform');
            console.log(`📊 Link geklickt: ${platform}`);

            // Sparkle Burst Effekt
            createSparklesBurst(e.target);

            // Nyan Sound (optional)
            playNyanSound();

            // Prevent default if no href
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert(`🔗 Hier würde dein ${platform} Link hin! Vergiss nicht die URLs zu ändern, User! 😄`);
            }
        });

        // Hover Effekte
        button.addEventListener('mouseenter', function () {
            this.style.filter = 'brightness(1.2) saturate(1.3)';
            createFloatingEmoji(this);
        });

        button.addEventListener('mouseleave', function () {
            this.style.filter = '';
        });
    });

    // Dynamische Sterne generieren
    createFloatingStars();

    // Smooth Regenbogen Cursor Trail
    createRainbowCursor();

    // Konami Code Listener
    document.addEventListener('keydown', function (e) {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateNyanMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Auto-Update Zeit für Rainbow Background
    setInterval(updateRainbowIntensity, 3000);

    // Initialize Easter Egg Game
    setTimeout(() => {
        initEasterEggGame();
    }, 1000);

    // Mobile Touch Detection und Touch-Controls Initialisierung
    if (isMobileDevice()) {
        initTouchControls();
        console.log('📱 Mobile Touch-Controls aktiviert!');
    }
});

// Mobile Device Detection
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Touch Controls Initialisierung - Joystick 
function initTouchControls() {
    const touchControls = document.getElementById('touchControls');
    if (!touchControls) return;

    const joystickKnob = document.getElementById('joystickKnob');
    const joystickBase = joystickKnob.parentElement;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let centerX = 0;
    let centerY = 0;
    let maxDistance = 35; // Maximum distance from center
    let sensitivity = 1.5; // Joystick sensitivity multiplier
    let animationFrame = null;

    // Get joystick center position
    function updateJoystickCenter() {
        const rect = joystickBase.getBoundingClientRect();
        centerX = rect.width / 2;
        centerY = rect.height / 2;
    }

    // Convert joystick position to movement input
    function updateMovementFromJoystick() {
        if (!game || !game.isRunning) return;

        // WICHTIG: Stelle sicher dass wir im keyboard mode sind für Joystick
        if (game.controlMode !== 'keyboard') {
            game.controlMode = 'keyboard';
        }

        // Calculate distance from center
        const deltaX = (currentX - centerX) * sensitivity;
        const deltaY = (currentY - centerY) * sensitivity;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Normalize to movement direction (deadzone of 8px)
        if (distance > 8) {
            const normalizedX = deltaX / (maxDistance * sensitivity);
            const normalizedY = deltaY / (maxDistance * sensitivity);

            // Convert to keyboard-style inputs mit niedrigerer Threshold für mehr Responsiveness
            game.keys['KeyA'] = normalizedX < -0.2;
            game.keys['ArrowLeft'] = normalizedX < -0.2;
            game.keys['KeyD'] = normalizedX > 0.2;
            game.keys['ArrowRight'] = normalizedX > 0.2;
            game.keys['KeyW'] = normalizedY < -0.2;
            game.keys['ArrowUp'] = normalizedY < -0.2;
            game.keys['KeyS'] = normalizedY > 0.2;
            game.keys['ArrowDown'] = normalizedY > 0.2;

            // Debug output
            nyanDebug.log('PLAYER', 'VERBOSE', `Joystick: X=${normalizedX.toFixed(2)}, Y=${normalizedY.toFixed(2)}, Keys: ${Object.keys(game.keys).filter(k => game.keys[k]).join(',')}`);
        } else {
            // Reset all movement keys when in deadzone
            game.keys['KeyA'] = false;
            game.keys['ArrowLeft'] = false;
            game.keys['KeyD'] = false;
            game.keys['ArrowRight'] = false;
            game.keys['KeyW'] = false;
            game.keys['ArrowUp'] = false;
            game.keys['KeyS'] = false;
            game.keys['ArrowDown'] = false;
        }
    }

    // Kontinuierliches Update für smooth movement
    function joystickUpdateLoop() {
        if (isDragging) {
            updateMovementFromJoystick();
            animationFrame = requestAnimationFrame(joystickUpdateLoop);
        }
    }

    // Position joystick knob
    function positionKnob(x, y) {
        const deltaX = x - centerX;
        const deltaY = y - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Constrain to circle
        if (distance <= maxDistance) {
            currentX = x;
            currentY = y;
        } else {
            // Clamp to edge of circle
            const angle = Math.atan2(deltaY, deltaX);
            currentX = centerX + Math.cos(angle) * maxDistance;
            currentY = centerY + Math.sin(angle) * maxDistance;
        }

        // Update knob position immediately
        joystickKnob.style.transform = `translate(${currentX - centerX}px, ${currentY - centerY}px)`;

        // Start continuous update loop if not already running
        if (isDragging && !animationFrame) {
            joystickUpdateLoop();
        }
    }

    // Reset joystick to center
    function resetJoystick() {
        isDragging = false;
        currentX = centerX;
        currentY = centerY;
        joystickKnob.style.transform = 'translate(0px, 0px)';
        joystickKnob.classList.remove('dragging');

        // Cancel animation frame
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }

        // Stop all movement immediately
        if (game && game.keys) {
            game.keys['KeyA'] = false;
            game.keys['ArrowLeft'] = false;
            game.keys['KeyD'] = false;
            game.keys['ArrowRight'] = false;
            game.keys['KeyW'] = false;
            game.keys['ArrowUp'] = false;
            game.keys['KeyS'] = false;
            game.keys['ArrowDown'] = false;
        }

        nyanDebug.log('PLAYER', 'INFO', 'Joystick reset');
    }

    // Sensitivity adjustment functions
    window.adjustJoystickSensitivity = function (newSensitivity) {
        sensitivity = Math.max(0.5, Math.min(3.0, newSensitivity));
        nyanDebug.log('PLAYER', 'INFO', `Joystick Sensitivity: ${sensitivity}`);
    };

    // Initialize joystick center
    updateJoystickCenter();
    currentX = centerX;
    currentY = centerY;

    // Touch Events
    joystickKnob.addEventListener('touchstart', (e) => {
        e.preventDefault();
        updateJoystickCenter();

        const touch = e.touches[0];
        const rect = joystickBase.getBoundingClientRect();
        startX = touch.clientX - rect.left;
        startY = touch.clientY - rect.top;

        isDragging = true;
        joystickKnob.classList.add('dragging');

        // Force keyboard mode for joystick
        if (game) {
            game.controlMode = 'keyboard';
        }

        nyanDebug.log('PLAYER', 'INFO', 'Joystick drag started');
    }, { passive: false });

    joystickBase.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();

        const touch = e.touches[0];
        const rect = joystickBase.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        positionKnob(x, y);
    }, { passive: false });

    joystickBase.addEventListener('touchend', (e) => {
        e.preventDefault();
        resetJoystick();
    }, { passive: false });

    joystickBase.addEventListener('touchcancel', (e) => {
        e.preventDefault();
        resetJoystick();
    }, { passive: false });

    // Mouse Events (für Desktop-Testing)
    joystickKnob.addEventListener('mousedown', (e) => {
        e.preventDefault();
        updateJoystickCenter();

        const rect = joystickBase.getBoundingClientRect();
        startX = e.clientX - rect.left;
        startY = e.clientY - rect.top;

        isDragging = true;
        joystickKnob.classList.add('dragging');

        // Force keyboard mode for joystick
        if (game) {
            game.controlMode = 'keyboard';
        }

        nyanDebug.log('PLAYER', 'INFO', 'Joystick drag started (mouse)');
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();

        const rect = joystickBase.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        positionKnob(x, y);
    });

    document.addEventListener('mouseup', (e) => {
        if (isDragging) {
            e.preventDefault();
            resetJoystick();
        }
    });

    // Window resize handling
    window.addEventListener('resize', () => {
        updateJoystickCenter();
        resetJoystick();
    });

    nyanDebug.log('PLAYER', 'INFO', 'Joystick initialized with sensitivity:', sensitivity);
}

// Sparkles Burst Effekt
function createSparklesBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = centerX + 'px';
        sparkle.style.top = centerY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.fontSize = '16px';

        const angle = (i / 12) * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const targetX = centerX + Math.cos(angle) * distance;
        const targetY = centerY + Math.sin(angle) * distance;

        sparkle.style.transition = 'all 1s ease-out';
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.style.left = targetX + 'px';
            sparkle.style.top = targetY + 'px';
            sparkle.style.opacity = '0';
            sparkle.style.transform = 'scale(2) rotate(360deg)';
        }, 50);

        setTimeout(() => {
            document.body.removeChild(sparkle);
        }, 1000);
    }
}

// Floating Emoji Effekt
function createFloatingEmoji(element) {
    const emojis = ['🌈', '⭐', '✨', '🦄', '🎵', '💫', '🌟'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    const floatingEmoji = document.createElement('div');
    floatingEmoji.innerHTML = emoji;
    floatingEmoji.style.position = 'fixed';
    floatingEmoji.style.left = (element.getBoundingClientRect().right - 20) + 'px';
    floatingEmoji.style.top = (element.getBoundingClientRect().top + 10) + 'px';
    floatingEmoji.style.pointerEvents = 'none';
    floatingEmoji.style.zIndex = '1000';
    floatingEmoji.style.fontSize = '20px';
    floatingEmoji.style.transition = 'all 2s ease-out';

    document.body.appendChild(floatingEmoji);

    setTimeout(() => {
        floatingEmoji.style.transform = 'translateY(-100px) scale(0)';
        floatingEmoji.style.opacity = '0';
    }, 100);

    setTimeout(() => {
        document.body.removeChild(floatingEmoji);
    }, 2000);
}

// Dynamische Sterne
function createFloatingStars() {
    const starsContainer = document.querySelector('.stars');

    setInterval(() => {
        const star = document.createElement('div');
        star.innerHTML = '⭐';
        star.style.position = 'absolute';
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.top = '-20px';
        star.style.fontSize = (Math.random() * 10 + 10) + 'px';
        star.style.animation = 'fall 5s linear';
        star.style.opacity = Math.random() * 0.8 + 0.2;

        starsContainer.appendChild(star);

        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, 5000);
    }, 2000);

    // CSS für fallende Sterne
    if (!document.querySelector('#falling-stars-style')) {
        const style = document.createElement('style');
        style.id = 'falling-stars-style';
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Smooth Regenbogen Cursor Trail
function createRainbowCursor() {
    const trail = [];
    const maxTrailLength = 20; // Mehr Partikel für smootheren Effekt
    let animationId;
    let mouseX = 0;
    let mouseY = 0;

    // Mouse Position tracking
    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth trail animation loop
    function updateTrail() {
        // Neue Position hinzufügen
        trail.push({
            x: mouseX,
            y: mouseY,
            time: Date.now(),
            life: 1.0
        });

        // Alte Positionen entfernen
        while (trail.length > maxTrailLength) {
            trail.shift();
        }

        // Trail-Elemente aktualisieren
        trail.forEach((point, index) => {
            let trailElement = document.querySelector(`#cursor-trail-${index}`);
            if (!trailElement) {
                trailElement = document.createElement('div');
                trailElement.id = `cursor-trail-${index}`;
                trailElement.style.position = 'fixed';
                trailElement.style.pointerEvents = 'none';
                trailElement.style.borderRadius = '50%';
                trailElement.style.zIndex = '9998';
                trailElement.style.willChange = 'transform, opacity';
                document.body.appendChild(trailElement);
            }

            // Smooth interpolation für bessere Performance
            const age = Date.now() - point.time;
            const normalizedAge = age / 800; // Lebensdauer 800ms
            const life = Math.max(0, 1 - normalizedAge);

            // Regenbogen-Farben mit smooth transition
            const hue = (index * 18 + Date.now() * 0.1) % 360; // Rotating rainbow
            const saturation = 100;
            const lightness = 50 + life * 20; // Heller am Anfang

            // Größe basierend auf Position in der Spur
            const baseSize = 6 + (maxTrailLength - index) * 0.3;
            const size = baseSize * life;

            // Smooth positioning mit subpixel precision
            const smoothX = point.x - size / 2;
            const smoothY = point.y - size / 2;

            // Apply styles efficiently
            trailElement.style.cssText = `
                position: fixed;
                left: ${smoothX}px;
                top: ${smoothY}px;
                width: ${size}px;
                height: ${size}px;
                background: hsl(${hue}, ${saturation}%, ${lightness}%);
                opacity: ${life * 0.9};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                box-shadow: 0 0 ${size * 2}px hsla(${hue}, ${saturation}%, ${lightness}%, 0.6);
                transform: scale(${life}) rotate(${age * 0.5}deg);
                will-change: transform, opacity;
            `;

            // Entferne verblasste Elemente
            if (life <= 0) {
                trailElement.remove();
            }
        });

        // Cleanup alter Trail-Elemente
        document.querySelectorAll('[id^="cursor-trail-"]').forEach((el, index) => {
            if (index >= trail.length) {
                el.remove();
            }
        });

        animationId = requestAnimationFrame(updateTrail);
    }

    // Start the smooth animation loop
    updateTrail();

    // Cleanup bei Blur
    window.addEventListener('blur', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });

    window.addEventListener('focus', () => {
        updateTrail();
    });
}

// Konami Code Aktivierung
function activateNyanMode() {
    console.log('🎉 NYAN MODE AKTIVIERT! Du hast den Konami Code gefunden!');

    // Extreme Rainbow Mode
    document.body.style.animation = 'rainbow-extreme 0.5s infinite';

    // CSS für extreme Rainbow
    if (!document.querySelector('#nyan-mode-style')) {
        const style = document.createElement('style');
        style.id = 'nyan-mode-style';
        style.textContent = `
            @keyframes rainbow-extreme {
                0% { filter: hue-rotate(0deg) saturate(2); }
                25% { filter: hue-rotate(90deg) saturate(2) brightness(1.2); }
                50% { filter: hue-rotate(180deg) saturate(2); }
                75% { filter: hue-rotate(270deg) saturate(2) brightness(1.2); }
                100% { filter: hue-rotate(360deg) saturate(2); }
            }
        `;
        document.head.appendChild(style);
    }

    // Extra Nyan Cats spawnen
    for (let i = 0; i < 5; i++) {
        setTimeout(() => spawnTemporaryNyanCat(), i * 500);
    }

    // Nach 10 Sekunden zurück zu normal
    setTimeout(() => {
        document.body.style.animation = '';
        console.log('Nyan Mode deaktiviert. Nyaa~');
    }, 10000);
}

// Temporäre Nyan Cats spawnen
function spawnTemporaryNyanCat() {
    const tempCat = document.createElement('div');
    tempCat.className = 'nyan-cat';
    tempCat.style.position = 'fixed';
    tempCat.style.top = Math.random() * (window.innerHeight - 100) + 'px';
    tempCat.style.left = '-100px';
    tempCat.style.zIndex = '1001';
    tempCat.innerHTML = `
        <div class="cat-body">
            <div class="cat-head"></div>
            <div class="cat-tail"></div>
        </div>
        <div class="rainbow-trail"></div>
    `;

    document.body.appendChild(tempCat);

    // Animation über Bildschirm
    setTimeout(() => {
        tempCat.style.transition = 'transform 3s linear';
        tempCat.style.transform = `translateX(${window.innerWidth + 200}px)`;
    }, 100);

    setTimeout(() => {
        document.body.removeChild(tempCat);
    }, 3500);
}

// Random Sparkle (für Konami Code)
function createRandomSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.fontSize = '20px';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        document.body.removeChild(sparkle);
    }, 1000);
}

// Rainbow Background Intensität
function updateRainbowIntensity() {
    const rainbow = document.querySelector('.rainbow-bg');
    const intensity = 0.1 + Math.random() * 0.1;
    rainbow.style.opacity = intensity;
}

// Sound Funktionen (Web Audio API)
function playNyanSound() {
    // Hier könntest du einen echten Nyan Cat Sound hinzufügen
    // const audio = new Audio('nyan-sound.mp3');
    // audio.volume = 0.3;
    // audio.play().catch(() => {});
    console.log('🎵 Nyan! (Sound würde hier abgespielt werden)');
}

// Performance Optimierung: Cleanup bei Page Unload
window.addEventListener('beforeunload', function () {
    // Alle Animationen stoppen
    document.querySelectorAll('[id^="cursor-trail-"]').forEach(el => {
        el.remove();
    });
    console.log('🧹 Cleanup abgeschlossen');
});

// Console Easter Egg
console.log(`
    🌈 ===== NYAN LINKTREE ===== 🌈
    
         /\\_/\\  
        ( o.o ) 
         > ^ <
    
    🎮 Versuche doch das Easter Egg Game zu finden!
    ✨ Hover über Links für magische Effekte!
    
    
    
    Made with 💖 by Darcci & Flimanda - Nyaa~
`);

// ==================== CHEAT COMMANDS ====================
// Geheime Cheat-Commands für Debugging

window.nyanCheats = {
    // God Mode - Unverwundbarkeit
    godMode: function (enable = true) {
        if (!game.isRunning) {
            console.log('❌ Spiel muss laufen für Cheats!');
            return;
        }
        game.godMode = enable;
        console.log(enable ? '🛡️ GOD MODE AKTIVIERT! Du bist unverwundbar!' : '💀 God Mode deaktiviert');
        return enable ? 'God Mode ON' : 'God Mode OFF';
    },

    // Level direkt setzen
    setLevel: function (level) {
        if (!game.isRunning) {
            console.log('❌ Spiel muss laufen für Cheats!');
            return;
        }
        const oldLevel = game.level;
        game.level = Math.max(1, Math.min(999, level));
        game.player.speed = Math.min(12, 5 + game.level * 0.3);
        updateUI();
        console.log(`🚀 Level von ${oldLevel} auf ${game.level} gesetzt!`);
        return `Level: ${game.level}`;
    },

    // Score hinzufügen
    addScore: function (points = 1000) {
        if (!game.isRunning) {
            console.log('❌ Spiel muss laufen für Cheats!');
            return;
        }
        game.score += points;
        updateUI();
        console.log(`💰 ${points} Punkte hinzugefügt! Neuer Score: ${game.score}`);
        return `Score: ${game.score}`;
    },

    // Player-Geschwindigkeit ändern
    setSpeed: function (speed = 10) {
        if (!game.isRunning) {
            console.log('❌ Spiel muss laufen für Cheats!');
            return;
        }
        game.player.speed = Math.max(1, Math.min(20, speed));
        console.log(`⚡ Player-Geschwindigkeit auf ${game.player.speed} gesetzt!`);
        return `Speed: ${game.player.speed}`;
    },

    // Laser komplett deaktivieren
    disableLasers: function (disable = true) {
        game.lasersDisabled = disable;
        if (disable) {
            // Alle aktiven Laser entfernen
            game.lasers = [];
            game.laserWarnings = [];
        }
        nyanDebug.log('CHEAT', 'INFO', disable ? 'LASER DEAKTIVIERT! Keine Laser mehr!' : 'Laser wieder aktiviert');
        return disable ? 'Lasers OFF' : 'Lasers ON';
    },

    // Star Rain - viele Sterne spawnen
    starRain: function (count = 20) {
        if (!game.isRunning) {
            console.log('❌ Spiel muss laufen für Cheats!');
            return;
        }
        for (let i = 0; i < count; i++) {
            setTimeout(() => spawnStar(), i * 100);
        }
        console.log(`⭐ STAR RAIN! ${count} Sterne gespawnt!`);
        return `${count} stars spawned`;
    },

    // Bildschirm leeren
    clearScreen: function () {
        if (!game.isRunning) {
            console.log('❌ Spiel muss laufen für Cheats!');
            return;
        }
        game.obstacles = [];
        game.lasers = [];
        game.laserWarnings = [];
        console.log('🧹 Bildschirm geleert! Alle Hindernisse entfernt!');
        return 'Screen cleared';
    },

    // Leben hinzufügen
    addLives: function (lives = 1) {
        if (!game.isRunning) {
            console.log('❌ Spiel muss laufen für Cheats!');
            return;
        }
        game.lives += lives;
        updateUI();
        console.log(`❤️ ${lives} Leben hinzugefügt! Leben: ${game.lives}`);
        return `Lives: ${game.lives}`;
    },

    // Teleport Player
    teleport: function (x = 100, y = 300) {
        if (!game.isRunning) {
            console.log('❌ Spiel muss laufen für Cheats!');
            return;
        }
        game.player.x = Math.max(0, Math.min(game.canvas.width - game.player.width, x));
        game.player.y = Math.max(0, Math.min(game.canvas.height - game.player.height, y));
        console.log(`🌀 Player teleportiert zu (${game.player.x}, ${game.player.y})!`);
        return `Position: (${game.player.x}, ${game.player.y})`;
    },

    // Alle Cheats anzeigen
    help: function () {
        console.log(`
🌈 ===== NYAN CAT CHEAT COMMANDS ===== 🌈

🛡️  nyanCheats.godMode(true/false)     - Unverwundbarkeit
🚀  nyanCheats.setLevel(40)            - Level setzen
💰  nyanCheats.addScore(5000)          - Punkte hinzufügen  
⚡  nyanCheats.setSpeed(15)            - Geschwindigkeit ändern
🚫  nyanCheats.disableLasers(true)     - Laser deaktivieren
⭐  nyanCheats.starRain(30)            - Sterne-Regen
🧹  nyanCheats.clearScreen()           - Bildschirm leeren
❤️  nyanCheats.addLives(5)             - Leben hinzufügen
🌀  nyanCheats.teleport(200, 100)      - Player teleportieren
🧪  testCheats()                       - Cheat-System testen

KURZE ALIASE:
⚡  god()                              - God Mode AN
⚡  ungod()                            - God Mode AUS  
⚡  lvl(50)                            - Level setzen
⚡  cheat.help()                       - Diese Hilfe

Beispiel: nyanCheats.godMode(true)
Nyaa~ Viel Spaß beim Schummeln, Darcci! 😈
        `);
        return 'Cheat commands listed in console';
    },

    // Status anzeigen
    status: function () {
        if (!game) {
            console.log('❌ Game object nicht gefunden!');
            return 'Game not found';
        }

        console.log(`
🎮 ===== GAME STATUS ===== 🎮
Running: ${game.isRunning}
Level: ${game.level}
Score: ${game.score}
Lives: ${game.lives}
God Mode: ${game.godMode || false}
Lasers Disabled: ${game.lasersDisabled || false}
Player Speed: ${game.player ? game.player.speed : 'N/A'}
Player Position: (${game.player ? game.player.x : 'N/A'}, ${game.player ? game.player.y : 'N/A'})
        `);
        return 'Status displayed in console';
    },

    // Force-Start für Testing
    forceStart: function () {
        console.log('🚀 Force-Starting Game für Cheat-Testing...');
        if (typeof activateEasterEggGame === 'function') {
            activateEasterEggGame();
            return 'Game overlay activated';
        } else {
            console.log('❌ activateEasterEggGame function not found');
            return 'Failed to start game';
        }
    }
};

// Kurze Aliase
window.cheat = window.nyanCheats;
window.god = () => nyanCheats.godMode(true);
window.ungod = () => nyanCheats.godMode(false);
window.lvl = (level) => nyanCheats.setLevel(level);

// ==================== DEBUG SYSTEM ====================
// Sauberes Debug-System ohne Console-Spam

window.nyanDebug = {
    enabled: false,
    level: 'INFO', // ERROR, WARN, INFO, VERBOSE
    categories: {
        GAME: true,
        LASER: true,
        COLLISION: true,
        CHEAT: true,
        PLAYER: false,
        PARTICLES: false
    },

    // Debug-Level Prioritäten
    levels: {
        'ERROR': 0,
        'WARN': 1,
        'INFO': 2,
        'VERBOSE': 3
    },

    // Debug-Nachricht ausgeben
    log: function (category, level, message, ...args) {
        if (!this.enabled) return;
        if (!this.categories[category]) return;
        if (this.levels[level] > this.levels[this.level]) return;

        const emoji = {
            'ERROR': '❌',
            'WARN': '⚠️',
            'INFO': 'ℹ️',
            'VERBOSE': '🔍'
        };

        console.log(`${emoji[level]} [${category}] ${message}`, ...args);
    },

    // Debug aktivieren/deaktivieren
    toggle: function (enabled = !this.enabled) {
        this.enabled = enabled;
        console.log(enabled ? '🔧 DEBUG AKTIVIERT!' : '🔇 DEBUG DEAKTIVIERT!');
        return enabled ? 'Debug ON' : 'Debug OFF';
    },

    // Debug-Level setzen
    setLevel: function (level) {
        if (!this.levels.hasOwnProperty(level)) {
            console.log('❌ Ungültiger Level! Verfügbar: ERROR, WARN, INFO, VERBOSE');
            return;
        }
        this.level = level;
        console.log(`🔧 Debug-Level auf ${level} gesetzt!`);
        return `Debug Level: ${level}`;
    },

    // Kategorie an/ausschalten
    setCategory: function (category, enabled = true) {
        if (!this.categories.hasOwnProperty(category)) {
            console.log('❌ Ungültige Kategorie! Verfügbar:', Object.keys(this.categories).join(', '));
            return;
        }
        this.categories[category] = enabled;
        console.log(`🔧 Debug-Kategorie ${category}: ${enabled ? 'AN' : 'AUS'}`);
        return `${category}: ${enabled ? 'ON' : 'OFF'}`;
    },

    // Status anzeigen
    status: function () {
        console.log(`
🔧 ===== DEBUG STATUS ===== 🔧
Enabled: ${this.enabled}
Level: ${this.level}
Categories:
${Object.entries(this.categories).map(([cat, enabled]) =>
            `  ${enabled ? '✅' : '❌'} ${cat}`).join('\n')}
        `);
        return 'Debug status displayed';
    },

    // Hilfe anzeigen
    help: function () {
        console.log(`
🔧 ===== DEBUG COMMANDS ===== 🔧

🔄  nyanDebug.toggle()                 - Debug an/aus
📊  nyanDebug.setLevel('VERBOSE')      - Level setzen
📂  nyanDebug.setCategory('LASER', true) - Kategorie an/aus
📋  nyanDebug.status()                 - Status anzeigen
🧹  nyanDebug.clear()                  - Console leeren

LEVEL: ERROR < WARN < INFO < VERBOSE
KATEGORIEN: GAME, LASER, COLLISION, CHEAT, PLAYER, PARTICLES

Beispiel: nyanDebug.toggle(true)
        `);
        return 'Debug help displayed';
    },

    // Console leeren
    clear: function () {
        console.clear();
        console.log('🧹 Console geleert!');
        return 'Console cleared';
    }
};

// Kurze Aliase für Debug
window.debug = window.nyanDebug;
window.dbg = (category, message, ...args) => nyanDebug.log(category, 'INFO', message, ...args);

// Praktische Debug-Shortcuts mit Fallback
window.debugOn = () => {
    if (window.nyanDebug && typeof window.nyanDebug.toggle === 'function') {
        return window.nyanDebug.toggle(true);
    } else {
        console.log('❌ Debug-System nicht verfügbar! Lade die Seite neu.');
        return 'Debug system not available';
    }
};

window.debugOff = () => {
    if (window.nyanDebug && typeof window.nyanDebug.toggle === 'function') {
        return window.nyanDebug.toggle(false);
    } else {
        console.log('❌ Debug-System nicht verfügbar! Lade die Seite neu.');
        return 'Debug system not available';
    }
};

window.debugVerbose = () => {
    if (window.nyanDebug && typeof window.nyanDebug.setLevel === 'function') {
        return window.nyanDebug.setLevel('VERBOSE');
    } else {
        console.log('❌ Debug-System nicht verfügbar! Lade die Seite neu.');
        return 'Debug system not available';
    }
};

window.debugQuiet = () => {
    if (window.nyanDebug && typeof window.nyanDebug.setLevel === 'function') {
        return window.nyanDebug.setLevel('ERROR');
    } else {
        console.log('❌ Debug-System nicht verfügbar! Lade die Seite neu.');
        return 'Debug system not available';
    }
};

// Debug-Ausgabe für Cheat-System (nur einmal beim Laden)
console.log('🎮 Nyan Linktree geladen! Tippe "nyanCheats.help()" für Cheats!');
console.log('🔧 Debug-System geladen! Tippe "nyanDebug.help()" für Debug-Commands!');

// Debug-System Test
console.log('🔧 Debug-Test: nyanDebug =', typeof window.nyanDebug);
console.log('🔧 Debug-Test: nyanDebug.toggle =', typeof window.nyanDebug?.toggle);

// Test-Funktion um zu prüfen ob Cheats funktionieren
window.testCheats = function () {
    console.log('🧪 Testing Cheat System...');
    console.log('Game object exists:', typeof game !== 'undefined');
    console.log('Game is running:', game ? game.isRunning : 'game undefined');
    console.log('nyanCheats object:', typeof nyanCheats !== 'undefined');
    console.log('Available cheat functions:', Object.keys(nyanCheats || {}));
    return 'Test complete - check console output';
};

// Debug-System Test-Funktion
window.testDebug = function () {
    console.log('🔧 Testing Debug System...');
    console.log('nyanDebug exists:', typeof window.nyanDebug !== 'undefined');
    console.log('nyanDebug.toggle exists:', typeof window.nyanDebug?.toggle);
    console.log('debugOn exists:', typeof window.debugOn);
    console.log('debugOff exists:', typeof window.debugOff);

    if (typeof window.nyanDebug !== 'undefined' && typeof window.nyanDebug.toggle === 'function') {
        console.log('✅ Debug-System funktioniert!');
        console.log('Versuche: debugOn() oder nyanDebug.toggle(true)');
    } else {
        console.log('❌ Debug-System hat Probleme!');
    }
    return 'Debug test complete';
};

// ==================== EASTER EGG GAME ====================

// Game Variables
let game = {
    canvas: null,
    ctx: null,
    isRunning: false,
    isPaused: false,
    score: 0,
    level: 1,
    lives: 3,
    controlMode: 'keyboard', // 'keyboard' oder 'mouse'
    mouseX: 0,
    mouseY: 0,
    nyanImage: null, // Für das original.gif
    imageLoaded: false,
    player: {
        x: 100,
        y: 300,
        width: 60,
        height: 40,
        speed: 5,
        color: '#ff69b4'
    },
    stars: [],
    obstacles: [],
    particles: [],
    laserWarnings: [], // Neue Laser-Warnungen
    lasers: [], // Aktive Laser
    keys: {},
    lastTime: 0
};

// Easter Egg Trigger - 5x Klick auf Profil-Bild
let profileClickCount = 0;
let profileClickTimer = null;

// Game Initialization
function initEasterEggGame() {
    const profileImg = document.querySelector('.profile-img');
    const gameOverlay = document.getElementById('gameOverlay');
    const gameCanvas = document.getElementById('gameCanvas');
    const closeGameBtn = document.getElementById('closeGameBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const restartBtn = document.getElementById('restartBtn');
    const closeGameOverBtn = document.getElementById('closeGameOverBtn');
    const controlToggle = document.getElementById('controlToggle');
    const startGameBtn = document.getElementById('startGameBtn');
    const closeStartBtn = document.getElementById('closeStartBtn');

    // Profile Click Counter für Easter Egg
    profileImg.addEventListener('click', function (e) {
        e.preventDefault();
        profileClickCount++;

        // Visual Feedback
        profileImg.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
            profileImg.style.transform = '';
        }, 200);

        // Reset Timer
        clearTimeout(profileClickTimer);
        profileClickTimer = setTimeout(() => {
            profileClickCount = 0;
        }, 2000);

        if (profileClickCount === 5) {
            profileClickCount = 0;
            activateEasterEggGame();
        } else if (profileClickCount >= 3) {
            // Hint nach 3 Klicks
            createFloatingHint(profileImg, `${5 - profileClickCount} weitere Klicks...`);
        }
    });

    // Game Controls
    closeGameBtn.addEventListener('click', closeGame);
    closeGameOverBtn.addEventListener('click', closeGame);
    pauseBtn.addEventListener('click', togglePause);
    restartBtn.addEventListener('click', restartGame);

    // Start-Screen Controls
    startGameBtn.addEventListener('click', function () {
        nyanDebug.log('GAME', 'INFO', 'Start-Button geklickt!');
        hideStartScreenAndStartGame();
    });

    closeStartBtn.addEventListener('click', function () {
        console.log('❌ Start-Screen geschlossen');
        closeGame();
    });

    // Control Toggle Button
    controlToggle.addEventListener('click', function () {
        if (isMobileDevice()) {
            // Mobile: Touch -> Joystick (Keyboard) -> Touch
            if (game.controlMode === 'touch') {
                game.controlMode = 'keyboard'; // Joystick Mode
                nyanDebug.log('GAME', 'INFO', 'Switched to Joystick mode');
            } else {
                game.controlMode = 'touch';   // Canvas Touch Mode
                nyanDebug.log('GAME', 'INFO', 'Switched to Touch mode');
            }
        } else {
            // Desktop: Keyboard -> Mouse -> Keyboard
            game.controlMode = game.controlMode === 'keyboard' ? 'mouse' : 'keyboard';
            nyanDebug.log('GAME', 'INFO', 'Switched to', game.controlMode, 'mode');
        }
        updateControlToggle();
    });

    // Mouse Controls
    gameCanvas.addEventListener('mousemove', function (e) {
        if (game.isRunning && game.controlMode === 'mouse') {
            const rect = gameCanvas.getBoundingClientRect();
            game.mouseX = (e.clientX - rect.left) * (gameCanvas.width / rect.width);
            game.mouseY = (e.clientY - rect.top) * (gameCanvas.height / rect.height);
        }
    });

    // Keyboard Controls
    document.addEventListener('keydown', (e) => {
        if (game.isRunning) {
            game.keys[e.code] = true;

            // ESC zum Schließen
            if (e.code === 'Escape') {
                closeGame();
            }
            // Space zum Pausieren
            if (e.code === 'Space') {
                e.preventDefault();
                togglePause();
            }
        }
    });

    document.addEventListener('keyup', (e) => {
        if (game.isRunning) {
            game.keys[e.code] = false;
        }
    });

    // Canvas Setup
    game.canvas = gameCanvas;
    game.ctx = gameCanvas.getContext('2d');

    // Touch Support für Canvas hinzufügen
    if (isMobileDevice()) {
        setupCanvasTouchControls();
        // Standardmäßig Touch-Modus auf Mobile
        game.controlMode = 'touch';
        updateControlToggle();
    }

    nyanDebug.log('GAME', 'INFO', 'Easter Egg Game initialisiert! Klicke 5x auf das Profil-Bild!');
}

function createFloatingHint(element, text) {
    const hint = document.createElement('div');
    hint.textContent = text;
    hint.style.position = 'fixed';
    hint.style.left = (element.getBoundingClientRect().right + 10) + 'px';
    hint.style.top = (element.getBoundingClientRect().top) + 'px';
    hint.style.pointerEvents = 'none';
    hint.style.zIndex = '9999';
    hint.style.fontSize = '12px';
    hint.style.color = '#ff69b4';
    hint.style.fontFamily = 'Press Start 2P';
    hint.style.textShadow = '1px 1px 0 #000';
    hint.style.transition = 'all 2s ease-out';

    document.body.appendChild(hint);

    setTimeout(() => {
        hint.style.transform = 'translateY(-50px)';
        hint.style.opacity = '0';
    }, 100);

    setTimeout(() => {
        document.body.removeChild(hint);
    }, 2000);
}

function activateEasterEggGame() {
    console.log('🌈 EASTER EGG AKTIVIERT! Nyan Cat Game wird geladen!');

    // Sparkle Explosion
    const profileImg = document.querySelector('.profile-img');
    createMegaSparklesBurst(profileImg);

    // Zeige erstmal nur das Overlay mit Start-Screen (nicht das Spiel)
    setTimeout(() => {
        document.getElementById('gameOverlay').classList.remove('hidden');
        showStartScreen();
    }, 500);
}

function showStartScreen() {
    const startScreen = document.getElementById('gameStartScreen');
    const gameContent = document.getElementById('gameContent');

    // Zeige Start-Screen, verstecke Game-Content
    startScreen.style.display = 'flex';
    gameContent.classList.add('hidden');

    console.log('📺 Start-Screen angezeigt');
}

function hideStartScreenAndStartGame() {
    const startScreen = document.getElementById('gameStartScreen');
    const gameContent = document.getElementById('gameContent');

    // Verstecke Start-Screen, zeige Game-Content
    startScreen.style.display = 'none';
    gameContent.classList.remove('hidden');

    // Touch-Controls wieder anzeigen (falls auf Mobile)
    const touchControls = document.getElementById('touchControls');
    if (touchControls && isMobileDevice()) {
        touchControls.style.display = 'flex';
    }

    // Jetzt erst das echte Spiel starten
    startGame();

    nyanDebug.log('GAME', 'INFO', 'Spiel gestartet vom Start-Screen');
}

function createMegaSparklesBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = ['✨', '🌟', '⭐', '💫', '🦄'][Math.floor(Math.random() * 5)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = centerX + 'px';
        sparkle.style.top = centerY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.fontSize = (Math.random() * 20 + 16) + 'px';

        const angle = (i / 30) * Math.PI * 2;
        const distance = 80 + Math.random() * 120;
        const targetX = centerX + Math.cos(angle) * distance;
        const targetY = centerY + Math.sin(angle) * distance;

        sparkle.style.transition = 'all 1.5s ease-out';
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.style.left = targetX + 'px';
            sparkle.style.top = targetY + 'px';
            sparkle.style.opacity = '0';
            sparkle.style.transform = 'scale(3) rotate(720deg)';
        }, 50);

        setTimeout(() => {
            document.body.removeChild(sparkle);
        }, 1500);
    }
}

function startGame() {
    resetGame();
    game.isRunning = true;
    game.isPaused = false;

    // Load Nyan Cat GIF
    if (!game.nyanImage) {
        game.nyanImage = new Image();
        game.nyanImage.onload = function () {
            game.imageLoaded = true;
            console.log('🐱 Nyan Cat GIF geladen!');
        };
        game.nyanImage.onerror = function () {
            console.log('❌ Fehler beim Laden von original.gif - verwende Fallback');
            game.imageLoaded = false;
        };
        game.nyanImage.src = 'original.gif';
    }

    updateUI();
    gameLoop();

    nyanDebug.log('GAME', 'INFO', 'Nyan Cat Rainbow Collector gestartet!');
}

function resetGame() {
    game.score = 0;
    game.level = 1;
    game.lives = 3;
    game.player = {
        x: 100,
        y: 300,
        width: 60,
        height: 40,
        speed: 5,
        color: '#ff69b4'
    };
    game.stars = [];
    game.obstacles = [];
    game.particles = [];
    game.laserWarnings = [];
    game.lasers = [];
    game.keys = {};

    document.getElementById('gameOverScreen').classList.add('hidden');
}

function gameLoop(currentTime = 0) {
    if (!game.isRunning) return;

    const deltaTime = currentTime - game.lastTime;
    game.lastTime = currentTime;

    if (!game.isPaused) {
        update(deltaTime);
        render();
    }

    requestAnimationFrame(gameLoop);
}

function update(deltaTime) {
    // Player Movement
    updatePlayer();

    // Spawn Stars
    if (Math.random() < 0.02 + (game.level * 0.005)) {
        spawnStar();
    }

    // Spawn Obstacles
    if (Math.random() < 0.008 + (game.level * 0.002)) {
        spawnObstacle();
    }

    // Spawn Laser Warnings (nur ab Level 40 und wenn nicht deaktiviert!)
    if (game.level >= 40 && !game.lasersDisabled && Math.random() < 0.003 + ((game.level - 40) * 0.001)) {
        spawnLaserWarning();
    }

    // Update Game Objects
    updateStars();
    updateObstacles();
    updateLaserWarnings();
    updateLasers();
    updateParticles();

    // Collision Detection
    checkCollisions();

    // Level Progression
    checkLevelUp();
}

function updatePlayer() {
    const player = game.player;

    if (game.controlMode === 'keyboard') {
        // Movement Controls (WASD + Arrow Keys + Touch D-Pad)
        if (game.keys['KeyW'] || game.keys['ArrowUp']) {
            player.y = Math.max(0, player.y - player.speed);
        }
        if (game.keys['KeyS'] || game.keys['ArrowDown']) {
            player.y = Math.min(game.canvas.height - player.height, player.y + player.speed);
        }
        if (game.keys['KeyA'] || game.keys['ArrowLeft']) {
            player.x = Math.max(0, player.x - player.speed);
        }
        if (game.keys['KeyD'] || game.keys['ArrowRight']) {
            player.x = Math.min(game.canvas.width - player.width, player.x + player.speed);
        }
    } else if (game.controlMode === 'mouse' || game.controlMode === 'touch') {
        // Smooth Mouse/Touch Following
        const targetX = game.mouseX - player.width / 2;
        const targetY = game.mouseY - player.height / 2;

        // Angepasster Smooth-Factor für Touch (etwas reaktiver)
        const smoothFactor = game.controlMode === 'touch' ? 0.15 : 0.1;
        player.x += (targetX - player.x) * smoothFactor;
        player.y += (targetY - player.y) * smoothFactor;

        // Bounds checking
        player.x = Math.max(0, Math.min(game.canvas.width - player.width, player.x));
        player.y = Math.max(0, Math.min(game.canvas.height - player.height, player.y));
    }
}

function spawnStar() {
    game.stars.push({
        x: game.canvas.width,
        y: Math.random() * (game.canvas.height - 30),
        width: 20,
        height: 20,
        speed: 2 + Math.random() * 2,
        rotation: 0,
        color: ['#ffff00', '#ff69b4', '#00bfff', '#ff0000', '#00ff00'][Math.floor(Math.random() * 5)]
    });
}

function spawnObstacle() {
    game.obstacles.push({
        x: game.canvas.width,
        y: Math.random() * (game.canvas.height - 50),
        width: 30,
        height: 50,
        speed: 3 + Math.random() * 2,
        color: '#666'
    });
}

// Laser Warning System
function spawnLaserWarning() {
    // Nur horizontale Laser
    const y = Math.random() * (game.canvas.height - 60) + 30;
    game.laserWarnings.push({
        type: 'horizontal',
        x: 0,
        y: y,
        width: game.canvas.width,
        height: 12, // Etwas dicker für bessere Sichtbarkeit
        warningTime: 120, // 2 Sekunden bei 60fps
        maxWarningTime: 120,
        blinkPhase: 0
    });
    nyanDebug.log('LASER', 'INFO', 'LASER WARNING: Level ' + game.level + ' - Horizontaler Laser bei Y=' + Math.round(y));
}

function updateLaserWarnings() {
    for (let i = game.laserWarnings.length - 1; i >= 0; i--) {
        const warning = game.laserWarnings[i];
        warning.warningTime--;
        warning.blinkPhase += 0.3; // Blink-Geschwindigkeit

        // Wenn Warnung abgelaufen ist, spawne den echten Laser
        if (warning.warningTime <= 0) {
            spawnLaser(warning);
            game.laserWarnings.splice(i, 1);
        }
    }
}

function spawnLaser(warning) {
    // Nur horizontale Laser die 2 Sekunden bleiben
    game.lasers.push({
        type: 'horizontal',
        x: 0, // Volle Breite
        y: warning.y,
        width: game.canvas.width, // Komplette Bildschirmbreite
        height: warning.height,
        speed: 0, // Laser bewegt sich nicht!
        life: 120, // 2 Sekunden Lebensdauer (bei 60fps)
        maxLife: 120,
        intensity: 1.0
    });
    nyanDebug.log('LASER', 'INFO', 'LASER FIRED: Level ' + game.level + ' - Horizontaler Laser aktiviert für 2 Sekunden!');
}

function updateLasers() {
    for (let i = game.lasers.length - 1; i >= 0; i--) {
        const laser = game.lasers[i];
        laser.life--;

        // Laser bewegt sich nicht mehr - bleibt einfach stehen
        // Nur Lebensdauer wird reduziert

        // Fade out in den letzten 30 Frames (0.5 Sekunden)
        if (laser.life <= 30) {
            laser.intensity = laser.life / 30;
        } else {
            laser.intensity = 1.0; // Volle Intensität für die meiste Zeit
        }

        // Entferne wenn Lebensdauer abgelaufen
        if (laser.life <= 0) {
            game.lasers.splice(i, 1);
            nyanDebug.log('LASER', 'INFO', 'LASER DEACTIVATED: Laser verschwunden!');
        }
    }
}

function updateStars() {
    for (let i = game.stars.length - 1; i >= 0; i--) {
        const star = game.stars[i];
        star.x -= star.speed;
        star.rotation += 0.1;

        if (star.x + star.width < 0) {
            game.stars.splice(i, 1);
        }
    }
}

function updateObstacles() {
    for (let i = game.obstacles.length - 1; i >= 0; i--) {
        const obstacle = game.obstacles[i];
        obstacle.x -= obstacle.speed;

        if (obstacle.x + obstacle.width < 0) {
            game.obstacles.splice(i, 1);
        }
    }
}

function updateParticles() {
    for (let i = game.particles.length - 1; i >= 0; i--) {
        const particle = game.particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.02;

        if (particle.life <= 0) {
            game.particles.splice(i, 1);
        }
    }
}

function checkCollisions() {
    const player = game.player;

    // Star Collection
    for (let i = game.stars.length - 1; i >= 0; i--) {
        const star = game.stars[i];
        if (isColliding(player, star)) {
            game.stars.splice(i, 1);
            game.score += 10 * game.level;
            createCollectParticles(star.x, star.y, star.color);
            updateUI();
        }
    }

    // Obstacle Collision (außer im God Mode)
    if (!game.godMode) {
        for (let i = game.obstacles.length - 1; i >= 0; i--) {
            const obstacle = game.obstacles[i];
            if (isColliding(player, obstacle)) {
                game.obstacles.splice(i, 1);
                game.lives--;
                createExplosionParticles(player.x + player.width / 2, player.y + player.height / 2);

                if (game.lives <= 0) {
                    gameOver();
                } else {
                    updateUI();
                }
            }
        }
    }

    // Laser Collision (tödlicher als normale Hindernisse, außer im God Mode)
    if (!game.godMode) {
        for (let i = game.lasers.length - 1; i >= 0; i--) {
            const laser = game.lasers[i];
            if (isCollidingWithLaser(player, laser)) {
                nyanDebug.log('COLLISION', 'INFO', 'LASER HIT! Nyan Cat wurde gegrillt!');
                game.lives--;
                createLaserHitParticles(player.x + player.width / 2, player.y + player.height / 2);

                // Laser-Hit ist schwerwiegender - mehr Partikel
                createExplosionParticles(player.x + player.width / 2, player.y + player.height / 2);

                if (game.lives <= 0) {
                    gameOver();
                } else {
                    updateUI();
                }
                break; // Nur ein Laser-Hit pro Frame
            }
        }
    }
}

function isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y;
}

function isCollidingWithLaser(player, laser) {
    // Laser haben eine etwas kleinere Hitbox für faireres Gameplay
    const margin = 3;
    return player.x < laser.x + laser.width - margin &&
        player.x + player.width > laser.x + margin &&
        player.y < laser.y + laser.height - margin &&
        player.y + player.height > laser.y + margin;
}

function createCollectParticles(x, y, color) {
    for (let i = 0; i < 8; i++) {
        game.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            life: 1,
            color: color,
            size: Math.random() * 4 + 2
        });
    }
}

function createExplosionParticles(x, y) {
    for (let i = 0; i < 15; i++) {
        game.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 1,
            color: '#ff4444',
            size: Math.random() * 6 + 3
        });
    }
}

function createLaserHitParticles(x, y) {
    // Spezielle Laser-Hit Partikel (mehr und intensiver)
    for (let i = 0; i < 25; i++) {
        game.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 15,
            vy: (Math.random() - 0.5) * 15,
            life: 1.5,
            color: ['#ff0000', '#ff4444', '#ffaa00', '#ffffff'][Math.floor(Math.random() * 4)],
            size: Math.random() * 8 + 4
        });
    }

    // Zusätzliche Funken-Effekte
    for (let i = 0; i < 10; i++) {
        game.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 20,
            vy: (Math.random() - 0.5) * 20,
            life: 0.8,
            color: '#ffffff',
            size: Math.random() * 3 + 1
        });
    }
}

function checkLevelUp() {
    const newLevel = Math.floor(game.score / 200) + 1;
    if (newLevel > game.level) {
        game.level = newLevel;
        game.player.speed = Math.min(8, 5 + game.level * 0.3);
        updateUI();

        // Level Up Effect
        createLevelUpEffect();
    }
}

function createLevelUpEffect() {
    for (let i = 0; i < 20; i++) {
        game.particles.push({
            x: game.player.x + game.player.width / 2,
            y: game.player.y + game.player.height / 2,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 1.5,
            color: '#ffff00',
            size: Math.random() * 8 + 4
        });
    }
}

function render() {
    const ctx = game.ctx;

    // Clear Canvas mit Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, game.canvas.height);
    gradient.addColorStop(0, '#001e3d');
    gradient.addColorStop(1, '#002654');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

    // Render Player (Nyan Cat Style)
    renderPlayer();

    // Render Stars
    game.stars.forEach(star => renderStar(star));

    // Render Obstacles
    game.obstacles.forEach(obstacle => renderObstacle(obstacle));

    // Render Laser Warnings (unter allem anderen)
    game.laserWarnings.forEach(warning => renderLaserWarning(warning));

    // Render Lasers (über Warnungen aber unter Player)
    game.lasers.forEach(laser => renderLaser(laser));

    // Render Particles
    game.particles.forEach(particle => renderParticle(particle));

    // Render Player Trail
    renderPlayerTrail();
}

function renderPlayer() {
    const ctx = game.ctx;
    const player = game.player;

    if (game.imageLoaded && game.nyanImage) {
        // Render das echte Nyan Cat GIF
        ctx.imageSmoothingEnabled = false; // Pixel-perfect für das GIF

        // Das GIF in der Player-Größe rendern
        ctx.drawImage(
            game.nyanImage,
            player.x,
            player.y,
            player.width * 1.5, // Etwas größer für bessere Sichtbarkeit
            player.height * 1.5
        );

        // Zusätzlicher Rainbow Trail hinter dem echten Nyan Cat
        const trailColors = ['#FF0000', '#FF8800', '#FFFF00', '#00FF00', '#0088FF', '#4400FF', '#FF00FF'];
        const time = Date.now() * 0.01;

        for (let i = 0; i < trailColors.length; i++) {
            ctx.fillStyle = trailColors[i];
            const waveY = Math.sin(time + i * 0.5) * 4;
            const alpha = 0.8 - (i * 0.1); // Fade out effect
            ctx.globalAlpha = alpha;

            ctx.fillRect(
                player.x - 15 - (i * 10),
                player.y + 10 + i * 3 + waveY,
                20,
                4
            );
        }
        ctx.globalAlpha = 1.0; // Reset alpha

    } else {
        // Fallback: Einfaches Nyan Cat wenn GIF nicht lädt
        ctx.fillStyle = '#FFB6C1';
        ctx.fillRect(player.x, player.y, player.width, player.height);

        // Simple fallback design
        ctx.fillStyle = '#808080';
        ctx.fillRect(player.x + player.width - 15, player.y + 5, 12, 12);

        ctx.fillStyle = '#000000';
        ctx.fillRect(player.x + player.width - 12, player.y + 8, 2, 2);
        ctx.fillRect(player.x + player.width - 8, player.y + 8, 2, 2);

        // Fallback rainbow trail
        const trailColors = ['#FF0000', '#FF8800', '#FFFF00', '#00FF00', '#0088FF', '#4400FF', '#FF00FF'];
        for (let i = 0; i < trailColors.length; i++) {
            ctx.fillStyle = trailColors[i];
            ctx.fillRect(player.x - 10 - (i * 6), player.y + 8 + i * 2, 12, 3);
        }

        // Text wenn GIF nicht geladen
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '8px Arial';
        ctx.fillText('Loading GIF...', player.x, player.y - 10);
    }
}

function renderObstacle(obstacle) {
    const ctx = game.ctx;

    ctx.fillStyle = obstacle.color;
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 5;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    // Danger Lines
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(obstacle.x, obstacle.y + i * 15);
        ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + i * 15);
        ctx.stroke();
    }
}

function renderParticle(particle) {
    const ctx = game.ctx;

    ctx.fillStyle = particle.color;
    ctx.globalAlpha = particle.life;
    ctx.shadowColor = particle.color;
    ctx.shadowBlur = 5;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
}

function renderPlayerTrail() {
    // Keine zusätzlichen Trails mehr - das GIF hat schon seinen eigenen Trail
}

function updateUI() {
    document.getElementById('gameScore').textContent = `Score: ${game.score}`;
    document.getElementById('gameLevel').textContent = `Level: ${game.level}`;
    document.getElementById('gameLives').textContent = `Lives: ${game.lives}`;
}

function togglePause() {
    game.isPaused = !game.isPaused;
    document.getElementById('pauseBtn').textContent = game.isPaused ? 'Resume' : 'Pause';
}

function restartGame() {
    // Touch-Controls wieder anzeigen (falls auf Mobile)
    const touchControls = document.getElementById('touchControls');
    if (touchControls && isMobileDevice()) {
        touchControls.style.display = 'flex';
    }

    startGame();
}

function closeGame() {
    game.isRunning = false;
    game.isPaused = false;
    document.getElementById('gameOverlay').classList.add('hidden');
    nyanDebug.log('GAME', 'INFO', 'Game geschlossen. Auf Wiedersehen!');
}

function gameOver() {
    game.isRunning = false;

    // Touch-Controls verstecken beim Game Over
    const touchControls = document.getElementById('touchControls');
    if (touchControls) {
        touchControls.style.display = 'none';
    }

    document.getElementById('finalScore').textContent = `Final Score: ${game.score}`;
    document.getElementById('finalLevel').textContent = game.level;
    document.getElementById('gameOverScreen').classList.remove('hidden');

    nyanDebug.log('GAME', 'INFO', `Game Over! Final Score: ${game.score}, Level: ${game.level}`);
}

function updateControlToggle() {
    const controlToggle = document.getElementById('controlToggle');
    if (!controlToggle) return;

    if (isMobileDevice()) {
        // Mobile: zwischen Touch und Joystick wechseln
        if (game.controlMode === 'touch') {
            controlToggle.textContent = '👆 Touch-Steuerung';
            controlToggle.classList.add('active');
        } else if (game.controlMode === 'keyboard') {
            controlToggle.textContent = '🕹️ Joystick-Steuerung';
            controlToggle.classList.remove('active');
        }
    } else {
        // Desktop: zwischen Keyboard und Maus wechseln
        if (game.controlMode === 'keyboard') {
            controlToggle.textContent = '⌨️ Tastatur';
            controlToggle.classList.remove('active');
        } else if (game.controlMode === 'mouse') {
            controlToggle.textContent = '🖱️ Maussteuerung';
            controlToggle.classList.add('active');
        }
    }
}

function renderStar(star) {
    const ctx = game.ctx;

    ctx.save();
    ctx.translate(star.x + star.width / 2, star.y + star.height / 2);
    ctx.rotate(star.rotation);

    // Star Shape
    ctx.fillStyle = star.color;
    ctx.shadowColor = star.color;
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function renderLaserWarning(warning) {
    const ctx = game.ctx;

    // Blink-Effekt basierend auf verbleibender Zeit
    const timeRatio = warning.warningTime / warning.maxWarningTime;
    const blinkSpeed = Math.max(0.2, timeRatio * 0.8); // Schneller blinken wenn Zeit abläuft
    const alpha = (Math.sin(warning.blinkPhase * blinkSpeed) + 1) * 0.5;

    // Farbe wird intensiver je näher der Laser kommt
    const intensity = 1 - timeRatio;
    const red = Math.floor(255 * (0.5 + intensity * 0.5));

    ctx.save();
    ctx.globalAlpha = alpha * (0.4 + intensity * 0.5);

    // Nur horizontale Warnung - voller roter Strich
    const gradient = ctx.createLinearGradient(0, warning.y, 0, warning.y + warning.height);
    gradient.addColorStop(0, `rgba(${red}, 0, 0, 0.3)`);
    gradient.addColorStop(0.5, `rgba(${red}, 0, 0, 1)`);
    gradient.addColorStop(1, `rgba(${red}, 0, 0, 0.3)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, warning.y, game.canvas.width, warning.height);

    // Zusätzliche Warnstreifen oben und unten
    ctx.fillStyle = `rgba(255, 255, 0, ${alpha * 0.8})`;
    ctx.fillRect(0, warning.y - 3, game.canvas.width, 3);
    ctx.fillRect(0, warning.y + warning.height, game.canvas.width, 3);

    // Zusätzlicher Glow-Effekt
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 10;
    ctx.fillStyle = `rgba(255, 0, 0, ${alpha * 0.3})`;
    ctx.fillRect(0, warning.y - 5, game.canvas.width, warning.height + 10);

    ctx.restore();
}

function renderLaser(laser) {
    const ctx = game.ctx;

    ctx.save();
    ctx.globalAlpha = laser.intensity;

    // Nur horizontaler Laser - voller roter Strich über komplette Breite
    const gradient = ctx.createLinearGradient(0, laser.y, 0, laser.y + laser.height);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0.2)');
    gradient.addColorStop(0.3, 'rgba(255, 50, 50, 0.9)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)'); // Weißer Kern
    gradient.addColorStop(0.7, 'rgba(255, 50, 50, 0.9)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0.2)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, laser.y, game.canvas.width, laser.height);

    // Intensiver Glow-Effekt über die komplette Breite
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 20;
    ctx.fillStyle = `rgba(255, 0, 0, ${0.4 * laser.intensity})`;
    ctx.fillRect(0, laser.y - 5, game.canvas.width, laser.height + 10);

    // Zusätzliche helle Kernlinie
    ctx.shadowBlur = 0;
    ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * laser.intensity})`;
    ctx.fillRect(0, laser.y + laser.height / 2 - 1, game.canvas.width, 2);

    // Laser-Partikel-Effekte über die gesamte Breite
    if (Math.random() < 0.5) {
        const sparkX = Math.random() * game.canvas.width;
        const sparkY = laser.y + Math.random() * laser.height;

        game.particles.push({
            x: sparkX,
            y: sparkY,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            life: 0.6,
            color: ['#ffffff', '#ff0000', '#ffaa00'][Math.floor(Math.random() * 3)],
            size: Math.random() * 3 + 1
        });
    }

    ctx.restore();
}

// Canvas Touch Controls Setup
function setupCanvasTouchControls() {
    const canvas = game.canvas;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isTouching = false;

    // Touch Start
    canvas.addEventListener('touchstart', function (e) {
        e.preventDefault();
        if (!game.isRunning) return;

        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        touchStartX = (touch.clientX - rect.left) * (canvas.width / rect.width);
        touchStartY = (touch.clientY - rect.top) * (canvas.height / rect.height);
        touchStartTime = Date.now();
        isTouching = true;

        // Direkte Touch-Position für kontinuierliche Bewegung
        if (game.controlMode === 'touch') {
            game.mouseX = touchStartX;
            game.mouseY = touchStartY;
        }
    }, { passive: false });

    // Touch Move - für kontinuierliche Bewegung
    canvas.addEventListener('touchmove', function (e) {
        e.preventDefault();
        if (!game.isRunning || !isTouching) return;

        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const currentX = (touch.clientX - rect.left) * (canvas.width / rect.width);
        const currentY = (touch.clientY - rect.top) * (canvas.height / rect.height);

        if (game.controlMode === 'touch') {
            game.mouseX = currentX;
            game.mouseY = currentY;
        }
    }, { passive: false });

    // Touch End - Swipe Detection
    canvas.addEventListener('touchend', function (e) {
        e.preventDefault();
        if (!game.isRunning || !isTouching) return;

        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;

        isTouching = false;

        // Kurzer Touch = Tap, Langer Touch oder Bewegung = Swipe/Drag ignorieren
        if (touchDuration < 200) {
            // Tap-Verhalten hier implementieren falls gewünscht
        }
    }, { passive: false });

    // Touch Cancel
    canvas.addEventListener('touchcancel', function (e) {
        e.preventDefault();
        isTouching = false;
    }, { passive: false });
} 