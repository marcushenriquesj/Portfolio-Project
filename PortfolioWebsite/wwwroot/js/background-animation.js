// TV Static Background Animation with Wave Patterns and Ripple Effects
// Enhanced with collision avoidance and dot ripple effects
// Based on bahamas10/tvstatic and wave-ripple math tutorials

class BackgroundAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.isDarkMode = false;
        this.time = 0;
        this.animationId = null;
        
        // TV Static dots configuration - UNIFORM SIZE
        this.dots = [];
        this.dotCount = 1500; // Reduced for better collision detection performance
        this.dotRadius = 1.5; // Uniform size for all dots
        this.minDistance = 4; // Minimum distance between dots
        this.collisionForce = 0.3; // Strength of collision avoidance
        this.maxDots = 1500; // Maximum number of dots to maintain performance
        
        // Wave configuration
        this.waves = [
            { amplitude: 0.2, frequency: 0.3, speed: 0.2, phase: 0 },
            { amplitude: 0.15, frequency: 0.5, speed: 0.3, phase: Math.PI / 3 },
            { amplitude: 0.1, frequency: 0.7, speed: 0.15, phase: Math.PI / 2 }
        ];
        
        // Ripple configuration - DOTS MOVING AWAY FROM CLICK
        this.rippleRadius = 150; // Radius of ripple effect on dots
        this.rippleStrength = 3.0; // How strongly dots are pushed away
        
        // Dot spawning configuration
        this.spawnCount = 15; // Number of dots to spawn on button click
        this.spawnSpeed = 2.0; // Initial speed of spawned dots
        
        // Noise configuration
        this.noiseScale = 0.015;
        this.noiseOffset = 0;
        
        // Initialize permutation table for Perlin noise
        this.p = new Array(512);
        for (let i = 0; i < 256; i++) {
            this.p[i] = Math.floor(Math.random() * 256);
        }
        for (let i = 0; i < 256; i++) {
            this.p[256 + i] = this.p[i];
        }
        
        this.initializeDots();
        this.setupEventListeners();
        this.resize();
        this.animate();
    }
    
    initializeDots() {
        this.dots = [];
        for (let i = 0; i < this.dotCount; i++) {
            let attempts = 0;
            let x, y;
            
            // Ensure dots don't start too close to each other
            do {
                x = Math.random() * this.width;
                y = Math.random() * this.height;
                attempts++;
            } while (this.isTooCloseToExisting(x, y) && attempts < 30);
            
            this.dots.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                opacity: Math.random() * 0.8 + 0.2,
                phase: Math.random() * Math.PI * 2
            });
        }
    }
    
    isTooCloseToExisting(x, y) {
        for (let dot of this.dots) {
            const dx = x - dot.x;
            const dy = y - dot.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.minDistance) {
                return true;
            }
        }
        return false;
    }
    
    setupEventListeners() {
        // Listen for window resize
        window.addEventListener('resize', () => {
            this.resize();
        });
        
        // Listen for click events on UI elements (buttons, cards, etc.)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.mud-button, .mud-card, .mud-paper, .navigation-card')) {
                // Get the click position relative to the canvas
                const rect = this.canvas.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const clickY = e.clientY - rect.top;
                
                // Spawn new dots at the click location
                this.spawnDots(clickX, clickY);
                
                // Also trigger the ripple effect
                this.triggerDotRipple(clickX, clickY);
            }
        });
        
        // Listen for clicks anywhere on the canvas for dot ripple effect
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            this.triggerDotRipple(clickX, clickY);
        });
    }
    
    spawnDots(spawnX, spawnY) {
        // Spawn new dots at the specified location
        for (let i = 0; i < this.spawnCount; i++) {
            // Random angle for spreading out
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * this.spawnSpeed + 0.5;
            
            // Create new dot at spawn location
            const newDot = {
                x: spawnX,
                y: spawnY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                opacity: Math.random() * 0.8 + 0.2,
                phase: Math.random() * Math.PI * 2
            };
            
            this.dots.push(newDot);
        }
        
        // Remove oldest dots if we exceed the maximum
        if (this.dots.length > this.maxDots) {
            const excess = this.dots.length - this.maxDots;
            this.dots.splice(0, excess);
        }
    }
    
    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.initializeDots();
    }
    
    // Perlin noise implementation for natural wave patterns
    noise(x, y) {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        
        const u = this.fade(x);
        const v = this.fade(y);
        
        const A = this.p[X] + Y;
        const AA = this.p[A];
        const AB = this.p[A + 1];
        const B = this.p[X + 1] + Y;
        const BA = this.p[B];
        const BB = this.p[B + 1];
        
        return this.lerp(v, this.lerp(u, this.grad(this.p[AA], x, y), this.grad(this.p[BA], x - 1, y)), this.lerp(u, this.grad(this.p[AB], x, y - 1), this.grad(this.p[BB], x - 1, y - 1)));
    }
    
    fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    lerp(t, a, b) { return a + t * (b - a); }
    grad(hash, x, y) {
        const h = hash & 15;
        const grad_x = 1 + (h & 7);
        const grad_y = grad_x & 1 ? grad_x : -grad_x;
        return (grad_x * x + grad_y * y) * 0.5;
    }
    
    updateTheme(isDarkMode) {
        this.isDarkMode = isDarkMode;
    }
    
    triggerDotRipple(clickX, clickY) {
        // Apply ripple effect to dots - make them move away from click point
        this.dots.forEach(dot => {
            const dx = dot.x - clickX;
            const dy = dot.y - clickY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // If dot is within ripple radius, push it away
            if (distance < this.rippleRadius && distance > 0) {
                // Calculate angle from click point to dot
                const angle = Math.atan2(dy, dx);
                
                // Calculate force based on distance (stronger when closer)
                const force = (this.rippleRadius - distance) / this.rippleRadius;
                
                // Apply velocity change to push dot away
                dot.vx += Math.cos(angle) * force * this.rippleStrength;
                dot.vy += Math.sin(angle) * force * this.rippleStrength;
            }
        });
    }
    
    animate() {
        this.time += 0.016; // ~60 FPS
        this.noiseOffset += 0.01;
        
        // Clear canvas completely - NO TRAILS
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Update and draw dots
        this.updateDots();
        this.drawDots();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    updateDots() {
        this.dots.forEach(dot => {
            // Add wave motion using Perlin noise
            const noiseX = this.noise(dot.x * this.noiseScale + this.noiseOffset, dot.y * this.noiseScale) * 0.5;
            const noiseY = this.noise(dot.x * this.noiseScale, dot.y * this.noiseScale + this.noiseOffset) * 0.5;
            
            // Add wave patterns
            let waveX = 0, waveY = 0;
            this.waves.forEach(wave => {
                waveX += Math.sin(this.time * wave.speed + dot.x * wave.frequency + wave.phase) * wave.amplitude;
                waveY += Math.cos(this.time * wave.speed + dot.y * wave.frequency + wave.phase) * wave.amplitude;
            });
            
            // Calculate collision avoidance
            let collisionX = 0, collisionY = 0;
            this.dots.forEach(other => {
                if (other === dot) return;
                
                const dx = dot.x - other.x;
                const dy = dot.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // If dots are too close, push them apart
                if (distance < this.minDistance && distance > 0) {
                    const force = (this.minDistance - distance) / distance;
                    collisionX += dx * force;
                    collisionY += dy * force;
                }
            });
            
            // Update velocity with collision avoidance
            dot.vx += noiseX + waveX + collisionX * this.collisionForce;
            dot.vy += noiseY + waveY + collisionY * this.collisionForce;
            
            // Limit speed for uniform motion
            const speed = Math.sqrt(dot.vx * dot.vx + dot.vy * dot.vy);
            if (speed > 1.0) {
                dot.vx = (dot.vx / speed) * 1.0;
                dot.vy = (dot.vy / speed) * 1.0;
            }
            
            // Update position
            dot.x += dot.vx;
            dot.y += dot.vy;
            
            // Wrap around edges
            if (dot.x < 0) dot.x = this.width;
            if (dot.x > this.width) dot.x = 0;
            if (dot.y < 0) dot.y = this.height;
            if (dot.y > this.height) dot.y = 0;
        });
    }
    
    drawDots() {
        this.dots.forEach(dot => {
            // Calculate color based on theme - UNIFORM SIZE
            let color;
            if (this.isDarkMode) {
                // Dark mode: brighter, more contrast
                const intensity = Math.random() * 0.6 + 0.4;
                color = `rgba(${Math.floor(200 * intensity)}, ${Math.floor(220 * intensity)}, ${Math.floor(255 * intensity)}, ${dot.opacity})`;
            } else {
                // Light mode: softer, muted tones
                const intensity = Math.random() * 0.4 + 0.2;
                color = `rgba(${Math.floor(100 * intensity)}, ${Math.floor(150 * intensity)}, ${Math.floor(200 * intensity)}, ${dot.opacity * 0.6})`;
            }
            
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, this.dotRadius, 0, Math.PI * 2); // Use uniform radius
            this.ctx.fill();
        });
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Global animation instances
const backgroundAnimations = new Map();

// Blazor interop functions
window.initializeBackgroundAnimation = function(canvas) {
    console.log('🎬 Initializing background animation');
    const animation = new BackgroundAnimation(canvas);
    backgroundAnimations.set(canvas, animation);
};

window.updateBackgroundTheme = function(canvas, isDarkMode) {
    const animation = backgroundAnimations.get(canvas);
    if (animation) {
        animation.updateTheme(isDarkMode);
    }
};

window.triggerRipple = function(canvas, x, y) {
    const animation = backgroundAnimations.get(canvas);
    if (animation) {
        animation.triggerDotRipple(x, y);
    }
};

console.log('🎯 Background animation script loaded');
