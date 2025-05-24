// Nyan Linktree JavaScript - Made with 💖 by Staiy
console.log('🌈 Nyan Linktree geladen! Nyaa~');

document.addEventListener('DOMContentLoaded', function() {
    // Konami Code Easter Egg (↑↑↓↓←→←→BA)
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;

    // Link Click Tracking
    const linkButtons = document.querySelectorAll('.link-button');
    linkButtons.forEach(button => {
        button.addEventListener('click', function(e) {
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
        button.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2) saturate(1.3)';
            createFloatingEmoji(this);
        });

        button.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
    });

    // Dynamische Sterne generieren
    createFloatingStars();
    
    // Smooth Regenbogen Cursor Trail
    createRainbowCursor();

    // Konami Code Listener
    document.addEventListener('keydown', function(e) {
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
});

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
    document.addEventListener('mousemove', function(e) {
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
window.addEventListener('beforeunload', function() {
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
    
    🎮 Versuche den Konami Code: ↑↑↓↓←→←→BA
    🎬 Genieße das echte Nyan Cat Gif im Hintergrund!
    ✨ Hover über Links für magische Effekte!
    
    Made with 💖 by Staiy - Nyaa~
`);

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
    
    // Profile Click Counter für Easter Egg
    profileImg.addEventListener('click', function(e) {
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
    
    // Control Toggle Button
    controlToggle.addEventListener('click', function() {
        game.controlMode = game.controlMode === 'keyboard' ? 'mouse' : 'keyboard';
        updateControlToggle();
    });
    
    // Mouse Controls
    gameCanvas.addEventListener('mousemove', function(e) {
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
    
    console.log('🎮 Easter Egg Game initialisiert! Klicke 5x auf das Profil-Bild!');
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
    console.log('🌈 EASTER EGG AKTIVIERT! Nyan Cat Game startet!');
    
    // Sparkle Explosion
    const profileImg = document.querySelector('.profile-img');
    createMegaSparklesBurst(profileImg);
    
    // Game starten
    setTimeout(() => {
        document.getElementById('gameOverlay').classList.remove('hidden');
        startGame();
    }, 500);
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
        game.nyanImage.onload = function() {
            game.imageLoaded = true;
            console.log('🐱 Nyan Cat GIF geladen!');
        };
        game.nyanImage.onerror = function() {
            console.log('❌ Fehler beim Laden von original.gif - verwende Fallback');
            game.imageLoaded = false;
        };
        game.nyanImage.src = 'original.gif';
    }
    
    updateUI();
    gameLoop();
    
    console.log('🎮 Nyan Cat Rainbow Collector gestartet!');
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
    
    // Update Game Objects
    updateStars();
    updateObstacles();
    updateParticles();
    
    // Collision Detection
    checkCollisions();
    
    // Level Progression
    checkLevelUp();
}

function updatePlayer() {
    const player = game.player;
    
    if (game.controlMode === 'keyboard') {
        // Movement Controls (WASD + Arrow Keys)
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
    } else if (game.controlMode === 'mouse') {
        // Smooth Mouse Following
        const targetX = game.mouseX - player.width / 2;
        const targetY = game.mouseY - player.height / 2;
        
        const smoothFactor = 0.1;
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
    
    // Obstacle Collision
    for (let i = game.obstacles.length - 1; i >= 0; i--) {
        const obstacle = game.obstacles[i];
        if (isColliding(player, obstacle)) {
            game.obstacles.splice(i, 1);
            game.lives--;
            createExplosionParticles(player.x + player.width/2, player.y + player.height/2);
            
            if (game.lives <= 0) {
                gameOver();
            } else {
                updateUI();
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
            x: game.player.x + game.player.width/2,
            y: game.player.y + game.player.height/2,
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
    startGame();
}

function closeGame() {
    game.isRunning = false;
    game.isPaused = false;
    document.getElementById('gameOverlay').classList.add('hidden');
    console.log('🎮 Game geschlossen. Auf Wiedersehen!');
}

function gameOver() {
    game.isRunning = false;
    
    document.getElementById('finalScore').textContent = `Final Score: ${game.score}`;
    document.getElementById('finalLevel').textContent = game.level;
    document.getElementById('gameOverScreen').classList.remove('hidden');
    
    console.log(`🎮 Game Over! Final Score: ${game.score}, Level: ${game.level}`);
}

function updateControlToggle() {
    const controlToggle = document.getElementById('controlToggle');
    if (game.controlMode === 'mouse') {
        controlToggle.textContent = '⌨️ Tastatur';
        controlToggle.classList.add('active');
    } else {
        controlToggle.textContent = '🖱️ Maussteuerung';
        controlToggle.classList.remove('active');
    }
}

function renderStar(star) {
    const ctx = game.ctx;
    
    ctx.save();
    ctx.translate(star.x + star.width/2, star.y + star.height/2);
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