@echo off
setlocal

cd /d "%~dp0"

if not defined DB_NAME set "DB_NAME=clubhub4"
if not defined DB_HOST set "DB_HOST=localhost"
if not defined DB_PORT set "DB_PORT=5432"
if not defined DB_USERNAME set "DB_USERNAME=postgres"
if not defined DB_URL set "DB_URL=jdbc:postgresql://%DB_HOST%:%DB_PORT%/%DB_NAME%"

if not defined DB_PASSWORD (
    echo DB_PASSWORD is not set.
    set /p DB_PASSWORD=Enter PostgreSQL password for %DB_USERNAME%:
)

where java >nul 2>nul
if errorlevel 1 (
    echo Java was not found on PATH. Install Java 21 and try again.
    exit /b 1
)

echo.
echo Starting ClubHub...
echo Database: %DB_URL%
echo URL: http://localhost:8080
echo.

call "%~dp0mvnw.cmd" spring-boot:run
