# 🌈 Nyan Cat Linktree Template 🐱

Ein pixeliges, animiertes Linktree-Template im Nyan Cat Stil!

## 🚀 Quick Start Guide

1. **Repository forken oder herunterladen**
2. **Alle "User" Vorkommen durch deinen eigenen Benutzernamen ersetzen**
3. **Profilbild austauschen**
4. **Links anpassen**
5. **Geniessen**

## 📝 Schritt-für-Schritt Anpassungsanleitung

### Datei: `index.html`

**Zeile 7:** Titel anpassen
```html
<title>🌈 DEIN_USERNAME's Nyan Linktree | Retro Pixel Art Link Collection 🐱</title>
```

**Zeile 8:** Meta-Description anpassen
```html
<meta name="description" content="Der ultimative Retro-Linktree im Nyan Cat Stil! Pixelig, animiert und voller Easter Eggs. Folge @DEIN_USERNAME auf allen Plattformen! 🌈🐱">
```

**Zeile 9:** Keywords anpassen
```html
<meta name="keywords" content="DEIN_USERNAME, Linktree, Nyan Cat, Retro, Pixel Art, Social Media, Links, Profile, 8-bit, Rainbow">
```

**Zeile 10:** Author anpassen
```html
<meta name="author" content="DEIN_USERNAME">
```

**Zeile 41:** JSON-LD Name anpassen
```json
"name": "DEIN_USERNAME",
```

**Zeile 42:** JSON-LD AlternateName anpassen
```json
"alternateName": "@DEIN_USERNAME",
```

**Zeile 44:** Profilbild URL anpassen (wenn du GitHub Pages verwendest)
```json
"image": "https://DEIN_GITHUB_USERNAME.github.io/DEIN_REPOSITORY_NAME/profile_picture.png",
```

**Zeile 45:** Website URL anpassen (wenn du GitHub Pages verwendest)
```json
"url": "https://DEIN_GITHUB_USERNAME.github.io/DEIN_REPOSITORY_NAME/",
```

**Zeilen 47-51:** Deine Social Media Links eintragen
```json
"https://instagram.com/DEIN_INSTAGRAM",
"https://twitter.com/DEIN_TWITTER",
"https://youtube.com/@DEIN_YOUTUBE",
"https://twitch.tv/DEIN_TWITCH",
"https://tiktok.com/@DEIN_TIKTOK"
```

**Zeile 71:** Angezeigter Username
```html
<h1 class="username">@DEIN_USERNAME</h1>
```

### Datei: `script.js`

**Zeile 24:** Alert-Text anpassen (optional)
```javascript
alert(`🔗 Hier würde dein ${platform} Link hin! Vergiss nicht die URLs zu ändern, DEIN_USERNAME! 😄`);
```

### Links zu deinen Profilen hinzufügen

In `index.html` findest du diese Link-Buttons (ca. Zeile 77-113):

```html
<a href="#" class="link-button instagram" data-platform="instagram">
<a href="#" class="link-button twitter" data-platform="twitter">
<a href="#" class="link-button youtube" data-platform="youtube">
<a href="#" class="link-button twitch" data-platform="twitch">
<a href="#" class="link-button tiktok" data-platform="tiktok">
<a href="#" class="link-button discord" data-platform="discord">
<a href="#" class="link-button website" data-platform="website">
```

**Ersetze die `href="#"` mit deinen echten Links:**

```html
<a href="https://instagram.com/dein_username" class="link-button instagram" data-platform="instagram">
<a href="https://twitter.com/dein_username" class="link-button twitter" data-platform="twitter">
<a href="https://youtube.com/@dein_username" class="link-button youtube" data-platform="youtube">
<a href="https://twitch.tv/dein_username" class="link-button twitch" data-platform="twitch">
<a href="https://tiktok.com/@dein_username" class="link-button tiktok" data-platform="tiktok">
<a href="https://discord.gg/dein_server" class="link-button discord" data-platform="discord">
<a href="https://deine-website.com" class="link-button website" data-platform="website">
```

## 🖼️ Profilbild anpassen

### Schritt 1: Profilbild vorbereiten
1. **Bildformat:** PNG oder JPG (PNG empfohlen für Transparenz)
2. **Optimale Größe:** 400x400 Pixel (quadratisch)
3. **Maximale Dateigröße:** Unter 1MB für beste Performance
4. **Stil:** Pixel Art funktioniert am besten mit dem Theme!

### Schritt 2: Profilbild einsetzen
**Option A: Gleichen Dateinamen beibehalten (empfohlen)**
- Ersetze einfach die vorhandene `profile_picture.png` mit deinem Bild
- Behalte den Dateinamen `profile_picture.png` bei

**Option B: Anderen Dateinamen verwenden**
Wenn du einen anderen Dateinamen verwenden möchtest, musst du folgende Stellen anpassen:

1. **In `index.html` Zeile 17:**
```html
<link rel="icon" type="image/png" href="DEIN_PROFILBILD.png">
```

2. **In `index.html` Zeile 18:**
```html
<link rel="apple-touch-icon" href="DEIN_PROFILBILD.png">
```

3. **In `index.html` Zeile 44 (JSON-LD):**
```json
"image": "https://DEIN_GITHUB_USERNAME.github.io/DEIN_REPOSITORY_NAME/DEIN_PROFILBILD.png",
```

4. **In `index.html` Zeile 68:**
```html
<img src="DEIN_PROFILBILD.png" alt="Pixel Avatar" class="profile-img">
```

### Schritt 3: CSS-Anpassungen für das Profilbild

In `styles.css` findest du diese Einstellungen (ca. Zeile 145-155):

```css
.profile-img {
    width: 120px;           /* Breite des Profilbilds */
    height: 120px;          /* Höhe des Profilbilds */
    border: 4px solid #000; /* Schwarzer Rahmen */
    image-rendering: pixelated; /* Pixel-Stil beibehalten */
    display: block;
    border-radius: 10px;    /* Abgerundete Ecken */
}
```

**Anpassungsmöglichkeiten:**
- `width` und `height`: Größe des Profilbilds ändern
- `border`: Rahmen-Stil ändern (z.B. `border: 2px solid #ff69b4;` für pinken Rahmen)
- `border-radius`: Mehr oder weniger abgerundete Ecken (0px = eckig, 50% = rund)

## 🎨 Hintergrund anpassen

### Haupt-Hintergrundfarbe ändern

**In `styles.css` Zeile 8:**
```css
body {
    background: #002654; /* Dunkelblauer Nyan Cat Hintergrund */
}
```

**Beliebte Alternativen:**
```css
background: #1a1a2e; /* Dunkellila */
background: #16213e; /* Dunkelblau-grau */
background: #0f3460; /* Mittelblau */
background: #000000; /* Schwarz */
background: #2c1810; /* Dunkelbraun */
```

### Container-Hintergrund anpassen

**In `styles.css` Zeile 88:**
```css
.container {
    background: rgba(0, 38, 84, 0.8); /* Semi-transparenter blauer Hintergrund */
    border: 2px solid rgba(255, 255, 255, 0.1); /* Leichter weißer Rahmen */
}
```

**Anpassungsoptionen:**
```css
/* Komplett transparent */
background: rgba(0, 0, 0, 0.2);

/* Andere Farben */
background: rgba(255, 105, 180, 0.1); /* Pink */
background: rgba(0, 191, 255, 0.1);   /* Cyan */
background: rgba(255, 255, 255, 0.1); /* Weiß */

/* Undurchsichtig */
background: #1a1a2e; /* Ohne Transparenz */
```

## 🌈 Hintergrund-GIF/Bild austauschen

### Lokales Hintergrund-GIF verwenden

**Standard-Einstellung in `styles.css` (Zeile 37-40):**
```css
.rainbow-bg {
    background-image: url('nyan-cat.gif');
    background-size: 1500px 1400px;
    background-repeat: repeat;
}
```

### Eigenes GIF/Bild einsetzen

**Schritt 1: Datei vorbereiten**
- **Format:** GIF für Animationen, PNG/JPG für statische Bilder
- **Empfohlene Größe:** 1500x1400px oder größer
- **Dateigröße:** Unter 5MB für gute Performance bei GIFs

**Schritt 2: Datei hinzufügen**
- Lege dein Bild in den Hauptordner (neben `index.html`)
- Benenne es z.B. `mein-hintergrund.gif`

**Schritt 3: CSS anpassen**
```css
.rainbow-bg {
    background-image: url('mein-hintergrund.gif'); /* Dein Dateiname */
    background-size: 1500px 1400px; /* Größe anpassen */
    background-repeat: repeat; /* Wiederholen */
    opacity: 0.3; /* Transparenz (0.1 = sehr durchsichtig, 1.0 = undurchsichtig) */
}
```

### Externes GIF verwenden (von Giphy etc.)

**In `styles.css` Zeile 25 (derzeit auskommentiert):**
```css
.rainbow-bg {
    /* Entferne die Kommentarzeichen und füge deine URL ein */
    background-image: url('');
    background-size: cover; /* oder 'contain' für andere Skalierung */
    background-position: center;
    background-repeat: no-repeat; /* oder 'repeat' für Kachel-Effekt */
    opacity: 0.3;
}
```

### Hintergrund-Animationen anpassen

**Background-Movement Animation (Zeile 30-35):**
```css
.rainbow-bg {
    animation: subtleMove 20s ease-in-out infinite;
}

@keyframes subtleMove {
    0%, 100% {
        transform: scale(1) translate(0, 0);
    }
    50% {
        transform: scale(1.05) translate(-10px, -5px); /* Bewegung anpassen */
    }
}
```

**Anpassungen:**
- `20s`: Animationsdauer ändern (z.B. `10s` für schneller)
- `scale(1.05)`: Zoom-Effekt (1.0 = normal, 1.1 = 10% größer)
- `translate(-10px, -5px)`: Bewegungsrichtung und -stärke

### Sterne-Overlay anpassen

**In `styles.css` (Zeile 55-75):**
```css
.rainbow-bg::before {
    background-image: 
        radial-gradient(2px 2px at 20px 30px, #fff, transparent),
        radial-gradient(2px 2px at 40px 70px, #ff69b4, transparent),
        radial-gradient(1px 1px at 90px 40px, #00bfff, transparent);
    opacity: 0.6; /* Sichtbarkeit der Sterne */
}
```

**Sterne komplett ausblenden:**
```css
.rainbow-bg::before {
    display: none;
}
```

**Andere Stern-Farben:**
```css
.rainbow-bg::before {
    background-image: 
        radial-gradient(2px 2px at 20px 30px, #ffff00, transparent), /* Gelb */
        radial-gradient(2px 2px at 40px 70px, #00ff00, transparent), /* Grün */
        radial-gradient(1px 1px at 90px 40px, #ff0000, transparent); /* Rot */
}
```

## 🎯 Bio anpassen

**Zeile 72 in `index.html`:**
```html
<p class="bio">🌈 Deine coole Bio hier 🐱 Was auch immer du magst ⭐</p>
```

## 🚀 Deployment bei GitHub Pages

1. **Repository erstellen** auf GitHub
2. **Dateien hochladen**
3. **Gehe zu Settings > Pages**
4. **Source:** Deploy from a branch
5. **Branch:** main (oder master)
6. **Folder:** / (root)
7. **Save**

Deine Seite ist dann verfügbar unter: `https://DEIN_GITHUB_USERNAME.github.io/REPOSITORY_NAME/`

## 🎮 Features

- **Responsive Design** - Funktioniert auf allen Geräten (Beta: Nicht Geprüft)
- **Pixel Art Animations** - Retro 8-bit Stil
- **SEO Optimiert** - Structured Data und Meta Tags
- **Accessibility** - Screen Reader freundlich
- **Performance** - Optimierte Ladezeiten

## 🛠️ Technische Details

- **Vanilla JavaScript** - Keine Frameworks nötig
- **CSS Animations** - Smooth Pixel Art Effekte

## 📁 Dateistruktur

```
📦 nyan-linktree/
├── 📄 index.html          # Hauptseite
├── 🎨 styles.css          # Alle Styles
├── ⚡ script.js           # JavaScript Funktionalität
├── 🖼️ profile_picture.png # Dein Profilbild
├── 🌈 nyan-cat.gif        # Nyan Cat Animation
├── 📋 README.md           # Diese Anleitung
└── 🙈 .gitignore          # Git Ignore File
```

## 🎨 Anpassungen

### Farben ändern
Die Hauptfarben findest du in `styles.css`:
- `--primary-color` - Hauptfarbe
- `--secondary-color` - Sekundärfarbe  
- `--accent-color` - Akzentfarbe

### Neue Social Media Buttons hinzufügen
1. **HTML:** Neuen Button in `index.html` hinzufügen
2. **CSS:** Stil in `styles.css` definieren
3. **JavaScript:** Plattform in `script.js` hinzufügen (optional)

## 🐛 Häufige Probleme

**Links führen nur zu Alerts?**
- Du musst die `href="#"` durch echte Links ersetzen!

**Profilbild wird nicht angezeigt?**
- Stelle sicher, dass `profile_picture.png` existiert
- Prüfe den Dateipfad

**Seite lädt nicht bei GitHub Pages?**
- Warte ein paar Minuten nach dem Setup
- Prüfe die Repository Settings

## 📞 Support

Bei Problemen oder Fragen einfach ein Issue erstellen! 

---

**Made with 💖 and lots of ☕ | Nyan Nyan! 🌈** 