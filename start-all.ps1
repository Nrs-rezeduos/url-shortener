Write-Host "Starting URL Shortener Application" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

# Start Backend
Write-Host "`nStarting Backend Server..." -ForegroundColor Yellow
$backendPath = "D:\Vibathon\url-shortener\backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host 'Backend Server Starting...' -ForegroundColor Cyan; npm install; npm run dev"

# Wait a bit for backend to initialize
Write-Host "Waiting for backend to initialize (5 seconds)..." -ForegroundColor Gray
Start-Sleep -Seconds 5

# Start Frontend
Write-Host "`nStarting Frontend Server..." -ForegroundColor Yellow
$frontendPath = "D:\Vibathon\url-shortener\frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host 'Frontend Server Starting...' -ForegroundColor Cyan; npm install; npm run dev"

# Open browser
Write-Host "`nOpening browser in 5 seconds..." -ForegroundColor Green
Start-Sleep -Seconds 5
Start-Process "http://localhost:5173"

Write-Host "`nSetup Complete!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:3001" -ForegroundColor Cyan
Write-Host "`nPress any key to exit this window..."
Read-Host