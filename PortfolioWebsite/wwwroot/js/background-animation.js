// Fluid TV Static Background Animation with Smooth Wave Patterns
// Enhanced with acceleration-based physics and gradient colors
// Based on fluid dynamics and natural wave simulation

class BackgroundAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.time = 0;
        this.animationId = null;
        
        // Fluid dots configuration
        this.dots = [];
        
        // Detect mobile devices and reduce dot count for better performance
        const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.dotCount = isMobile ? 500 : 1500; // Reduced for mobile devices
        this.minDistance = 4; // Closer spacing for better coverage
        this.maxDots = isMobile ? 600 : 2000; // Reduced max dots for mobile
        this.maxSpeed = 0.2; // Slower for smoother movement
        
        // Dot size variation
        this.minDotRadius = 0.8; // Minimum dot size
        this.maxDotRadius = 2.5; // Maximum dot size
        
        // Diagonal wave configuration - ADJUSTED FOR SQUIGGLY WAVES
        this.waveAmplitude = 35; // Reduced amplitude for softer waves
        this.waveWavelength = 300; // Increased wavelength for gentler waves
        this.waveFrequency = 2.5; // Reduced frequency for softer movement
        this.waveSpeed = 0.25; // Slower speed for gentler waves
        this.waveInfluence = 1.2; // Reduced influence for softer effect
        
        // Fluid dynamics configuration - ADJUSTED TO PREVENT BLOBBING
        this.acceleration = 0.2; // Gentler acceleration
        this.damping = 0.99; // More damping for stability
        this.cohesionRadius = 40; // Smaller radius to prevent large clusters
        this.cohesionForce = 0.005; // Much weaker cohesion
        this.separationForce = 0.15; // Stronger separation to prevent clustering
        this.alignmentForce = 0.01; // Weaker alignment
        this.dispersionForce = 0.02; // New force to spread dots apart
        
        // Enhanced wave configuration
        this.waves = [
            { amplitude: 0.12, frequency: 0.001, speed: 0.08, phase: 0 },
            { amplitude: 0.08, frequency: 0.002, speed: 0.12, phase: Math.PI / 3 },
            { amplitude: 0.06, frequency: 0.0008, speed: 0.06, phase: Math.PI / 2 },
            { amplitude: 0.1, frequency: 0.003, speed: 0.1, phase: Math.PI / 4 }
        ];
        
        // Enhanced noise configuration
        this.noiseScale = 0.006;
        this.noiseOffset = 0;
        
        // Color gradient configuration
        this.colorPalettes = {
            light: [
                { r: 100, g: 150, b: 255, a: 0.6 }, // Softer blue
                { r: 150, g: 200, b: 255, a: 0.5 }, // Light blue
                { r: 200, g: 220, b: 255, a: 0.4 }, // Very light blue
                { r: 120, g: 180, b: 240, a: 0.7 }  // Medium blue
            ],
            dark: [
                { r: 80, g: 120, b: 255, a: 0.8 },  // Bright blue
                { r: 120, g: 160, b: 255, a: 0.7 }, // Medium bright blue
                { r: 160, g: 200, b: 255, a: 0.6 }, // Light bright blue
                { r: 100, g: 140, b: 255, a: 0.9 }  // Intense blue
            ]
        };
        
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
            } while (this.isTooCloseToExisting(x, y) && attempts < 20);
            
            this.dots.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 0.4, // Even slower initial velocity
                vy: (Math.random() - 0.5) * 0.4,
                ax: 0, // Acceleration
                ay: 0,
                opacity: Math.random() * 0.5 + 0.3, // Lower opacity for subtlety
                phase: Math.random() * Math.PI * 2,
                colorIndex: Math.floor(Math.random() * 4), // For gradient variation
                radius: Math.random() * (this.maxDotRadius - this.minDotRadius) + this.minDotRadius, // Varying sizes
                originalX: x, // Store original position for wave effect
                originalY: y
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
    }
    
    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.initializeDots();
    }
    
    // Enhanced Perlin noise for smoother wave patterns
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
    
  
    
    // Calculate diagonal wave effect with Perlin noise for non-linear movement
    calculateWaveEffect(dot) {
        // Create a squiggly, non-linear wave field using enhanced Perlin noise
        // Multiple noise layers for organic, flowing movement
        
        // Primary wave direction (diagonal) - softer base
        const diagonalPosition = (dot.originalX + dot.originalY) / this.waveWavelength;
        const wavePhase = this.time * this.waveSpeed;
        const baseWave = Math.sin(2 * Math.PI * (diagonalPosition - wavePhase));
        
        // Enhanced Perlin noise for squiggly distortion
        const noiseScale = 0.01; // Increased scale for more squiggly effect
        const noiseX = this.noise(dot.originalX * noiseScale + this.time * 0.15, dot.originalY * noiseScale) * 0.8;
        const noiseY = this.noise(dot.originalX * noiseScale, dot.originalY * noiseScale + this.time * 0.2) * 0.8;
        
        // Secondary noise layer for additional squiggly variation
        const secondaryNoiseX = this.noise(dot.originalX * 0.02 + this.time * 0.08, dot.originalY * 0.02) * 0.5;
        const secondaryNoiseY = this.noise(dot.originalX * 0.02, dot.originalY * 0.02 + this.time * 0.12) * 0.5;
        
        // Tertiary noise for fine squiggly details
        const tertiaryNoiseX = this.noise(dot.originalX * 0.03 + this.time * 0.05, dot.originalY * 0.03) * 0.3;
        const tertiaryNoiseY = this.noise(dot.originalX * 0.03, dot.originalY * 0.03 + this.time * 0.08) * 0.3;
        
        // Combine base wave with multiple noise layers for squiggly movement
        const waveValue = baseWave * 0.5 + noiseX * 0.3 + secondaryNoiseX * 0.15 + tertiaryNoiseX * 0.05;
        const waveValueY = baseWave * 0.4 + noiseY * 0.35 + secondaryNoiseY * 0.2 + tertiaryNoiseY * 0.05;
        
        // Calculate wave influence with softer intensity
        const waveInfluenceX = this.waveAmplitude * waveValue * this.waveInfluence;
        const waveInfluenceY = this.waveAmplitude * waveValueY * this.waveInfluence;
        
        // Add additional squiggly variation based on position
        const positionNoiseX = this.noise(dot.originalX * 0.005 + this.time * 0.1, dot.originalY * 0.005) * 0.4;
        const positionNoiseY = this.noise(dot.originalX * 0.005, dot.originalY * 0.005 + this.time * 0.15) * 0.4;
        
        // Final squiggly displacement combining all noise layers
        const finalDisplacementX = waveInfluenceX + positionNoiseX * this.waveAmplitude * 0.3;
        const finalDisplacementY = waveInfluenceY + positionNoiseY * this.waveAmplitude * 0.3;
        
        return { dx: finalDisplacementX, dy: finalDisplacementY };
    }
    
    animate() {
        this.time += 0.016;
        this.noiseOffset += 0.003; // Even slower noise change
        
        // Clear canvas completely - NO TRAILS
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Update and draw dots
        this.updateDots();
        this.drawDots();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    updateDots() {
        this.dots.forEach(dot => {
            // Reset acceleration
            dot.ax = 0;
            dot.ay = 0;
            
            // Apply fluid dynamics forces
            this.applyFluidForces(dot);
            
            // Apply wave motion with smoother noise
            const noiseX = this.noise(dot.x * this.noiseScale + this.noiseOffset, dot.y * this.noiseScale) * 0.2;
            const noiseY = this.noise(dot.x * this.noiseScale, dot.y * this.noiseScale + this.noiseOffset) * 0.2;
            
            // Apply wave patterns with reduced amplitude
            let waveX = 0, waveY = 0;
            this.waves.forEach(wave => {
                waveX += Math.sin(this.time * wave.speed + dot.x * wave.frequency + wave.phase) * wave.amplitude;
                waveY += Math.cos(this.time * wave.speed + dot.y * wave.frequency + wave.phase) * wave.amplitude;
            });
            
            // Apply forces as acceleration
            dot.ax += noiseX + waveX;
            dot.ay += noiseY + waveY;
            
            // Update velocity with acceleration
            dot.vx += dot.ax * this.acceleration;
            dot.vy += dot.ay * this.acceleration;
            
            // Apply damping for natural deceleration
            dot.vx *= this.damping;
            dot.vy *= this.damping;
            
            // Limit speed for smooth movement
            const speed = Math.sqrt(dot.vx * dot.vx + dot.vy * dot.vy);
            if (speed > this.maxSpeed) {
                dot.vx = (dot.vx / speed) * this.maxSpeed;
                dot.vy = (dot.vy / speed) * this.maxSpeed;
            }
            
            // Update original position (for wave calculation)
            dot.originalX += dot.vx;
            dot.originalY += dot.vy;
            
            // Calculate wave effect
            const waveEffect = this.calculateWaveEffect(dot);
            
            // Apply wave displacement to visual position
            dot.x = dot.originalX + waveEffect.dx;
            dot.y = dot.originalY + waveEffect.dy;
            
            // Wrap around edges with smooth transition
            if (dot.originalX < -10) dot.originalX = this.width + 10;
            if (dot.originalX > this.width + 10) dot.originalX = -10;
            if (dot.originalY < -10) dot.originalY = this.height + 10;
            if (dot.originalY > this.height + 10) dot.originalY = -10;
        });
    }
    
    applyFluidForces(dot) {
        let cohesionX = 0, cohesionY = 0;
        let separationX = 0, separationY = 0;
        let alignmentX = 0, alignmentY = 0;
        let dispersionX = 0, dispersionY = 0;
        let neighborCount = 0;
        
        this.dots.forEach(other => {
            if (other === dot) return;
            
            const dx = dot.originalX - other.originalX; // Use original positions for physics
            const dy = dot.originalY - other.originalY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.cohesionRadius && distance > 0) {
                neighborCount++;
                
                // Cohesion: move toward center of neighbors (very weak)
                cohesionX += other.originalX;
                cohesionY += other.originalY;
                
                // Alignment: align with neighbor velocities (very weak)
                alignmentX += other.vx;
                alignmentY += other.vy;
                
                // Separation: avoid crowding (stronger)
                if (distance < this.minDistance * 2) {
                    const force = (this.minDistance * 2 - distance) / distance;
                    separationX += dx * force;
                    separationY += dy * force;
                }
            }
            
            // Dispersion: push dots apart to prevent clustering
            if (distance < 50 && distance > 0) {
                const force = (50 - distance) / 50;
                dispersionX += dx * force;
                dispersionY += dy * force;
            }
        });
        
        if (neighborCount > 0) {
            // Apply very weak cohesion force
            cohesionX /= neighborCount;
            cohesionY /= neighborCount;
            const cohesionDx = cohesionX - dot.originalX;
            const cohesionDy = cohesionY - dot.originalY;
            dot.ax += cohesionDx * this.cohesionForce;
            dot.ay += cohesionDy * this.cohesionForce;
            
            // Apply very weak alignment force
            alignmentX /= neighborCount;
            alignmentY /= neighborCount;
            dot.ax += alignmentX * this.alignmentForce;
            dot.ay += alignmentY * this.alignmentForce;
        }
        
        // Apply separation force
        dot.ax += separationX * this.separationForce;
        dot.ay += separationY * this.separationForce;
        
        // Apply dispersion force
        dot.ax += dispersionX * this.dispersionForce;
        dot.ay += dispersionY * this.dispersionForce;
    }
    
    drawDots() {
        const palette = this.colorPalettes.dark;
        
        this.dots.forEach(dot => {
            const color = palette[dot.colorIndex];
            const opacity = color.a * dot.opacity;
            
            // Create gradient for each dot using its individual radius
            const gradient = this.ctx.createRadialGradient(
                dot.x, dot.y, 0,
                dot.x, dot.y, dot.radius * 1.5
            );
             
            gradient.addColorStop(0, `rgba(${color.r + 30}, ${color.g + 30}, ${color.b + 30}, ${opacity})`);
            gradient.addColorStop(0.6, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.7})`);
            gradient.addColorStop(1, `rgba(${color.r - 15}, ${color.g - 15}, ${color.b - 15}, 0)`);
            
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
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
window.initializeBackground = function(canvas) {
    const animation = new BackgroundAnimation(canvas);
    backgroundAnimations.set(canvas, animation);
};


