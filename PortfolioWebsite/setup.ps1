# Portfolio Website Setup Script
# This script sets up the development environment

Write-Host "🚀 Setting up Portfolio Website Development Environment..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js v16+ from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found. Please install npm." -ForegroundColor Red
    exit 1
}

# Check if .NET is installed
try {
    $dotnetVersion = dotnet --version
    Write-Host "✅ .NET found: $dotnetVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ .NET not found. Please install .NET 9.0 from https://dotnet.microsoft.com/" -ForegroundColor Red
    exit 1
}

# Install npm dependencies
Write-Host "📦 Installing npm dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ npm dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install npm dependencies" -ForegroundColor Red
    exit 1
}

# Restore .NET dependencies
Write-Host "🔧 Restoring .NET dependencies..." -ForegroundColor Yellow
dotnet restore

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ .NET dependencies restored successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to restore .NET dependencies" -ForegroundColor Red
    exit 1
}

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating .env template file..." -ForegroundColor Yellow
    @"
# EmailJS Configuration
EMAILJS_SERVICE_ID=your_service_id_here
EMAILJS_TEMPLATE_ID=your_template_id_here
EMAILJS_USER_ID=your_user_id_here
CONTACT_EMAIL=your-email@example.com

# Application Configuration
ENVIRONMENT=development
APP_VERSION=1.0.0
"@ | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ .env template created. Please update with your actual values." -ForegroundColor Green
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

# Test build
Write-Host "🔨 Testing build process..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build completed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 Setup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Update .env file with your EmailJS credentials" -ForegroundColor White
Write-Host "2. Test the contact form locally" -ForegroundColor White
Write-Host "3. Follow DEPLOYMENT_CHECKLIST.md for deployment" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Available commands:" -ForegroundColor Cyan
Write-Host "- npm run build    : Build for production" -ForegroundColor White
Write-Host "- npm run watch    : Watch for changes" -ForegroundColor White
Write-Host "- npm run clean    : Clean build output" -ForegroundColor White
Write-Host ""
