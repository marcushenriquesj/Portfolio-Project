# Cloudflare Pages Deployment Script
# This script builds and prepares the portfolio for deployment to Cloudflare Pages

param(
    [string]$Environment = "production",
    [string]$Version = "1.0.0"
)

Write-Host "🚀 Starting deployment process..." -ForegroundColor Green

# Set environment variables
$env:ENVIRONMENT = $Environment
$env:APP_VERSION = $Version

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing npm dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install npm dependencies." -ForegroundColor Red
        exit 1
    }
}

# Build .NET project
Write-Host "🔨 Building .NET project..." -ForegroundColor Yellow
dotnet build -c Release
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ .NET build failed." -ForegroundColor Red
    exit 1
}

# Publish .NET project
Write-Host "📤 Publishing .NET project..." -ForegroundColor Yellow
dotnet publish -c Release -o ./dist
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ .NET publish failed." -ForegroundColor Red
    exit 1
}

# Run Gulp build
Write-Host "🔧 Running Gulp build..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Gulp build failed." -ForegroundColor Red
    exit 1
}

# Check if dist directory exists
if (-not (Test-Path "dist")) {
    Write-Host "❌ Build output directory 'dist' not found." -ForegroundColor Red
    exit 1
}

# Display build summary
Write-Host "`n📊 Build Summary:" -ForegroundColor Cyan
Write-Host "   Environment: $Environment" -ForegroundColor White
Write-Host "   Version: $Version" -ForegroundColor White
Write-Host "   Build Directory: dist/" -ForegroundColor White

# Check file sizes
$cssFiles = Get-ChildItem -Path "dist/wwwroot/css" -Filter "*.min.css" -Recurse
$jsFiles = Get-ChildItem -Path "dist/wwwroot/js" -Filter "*.min.js" -Recurse
$imageFiles = Get-ChildItem -Path "dist/wwwroot/images" -Recurse

Write-Host "`n📁 Generated Files:" -ForegroundColor Cyan
Write-Host "   CSS Files: $($cssFiles.Count)" -ForegroundColor White
Write-Host "   JS Files: $($jsFiles.Count)" -ForegroundColor White
Write-Host "   Image Files: $($imageFiles.Count)" -ForegroundColor White

# Calculate total size
$totalSize = 0
Get-ChildItem -Path "dist" -Recurse -File | ForEach-Object { $totalSize += $_.Length }
$totalSizeMB = [math]::Round($totalSize / 1MB, 2)
Write-Host "   Total Size: $totalSizeMB MB" -ForegroundColor White

# Check for settings.json
if (Test-Path "dist/wwwroot/settings.json") {
    Write-Host "✅ settings.json generated successfully" -ForegroundColor Green
} else {
    Write-Host "⚠️  settings.json not found. Make sure environment variables are set." -ForegroundColor Yellow
}

Write-Host "`n🎉 Build completed successfully!" -ForegroundColor Green
Write-Host "📦 Ready for deployment to Cloudflare Pages" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Upload the contents of 'dist/' to Cloudflare Pages" -ForegroundColor White
Write-Host "2. Set environment variables in Cloudflare Pages dashboard" -ForegroundColor White
Write-Host "3. Configure build settings if using GitHub integration" -ForegroundColor White

# Optional: Open dist directory
$openDist = Read-Host "`nWould you like to open the dist directory? (y/n)"
if ($openDist -eq "y" -or $openDist -eq "Y") {
    Start-Process "dist"
}
