@echo off
cd /d "%~dp0"
set "PORTFOLIO_NODE=node"
where node >nul 2>nul
if errorlevel 1 set "PORTFOLIO_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not exist "node_modules\vite\bin\vite.js" (
  echo Dependencies are missing. Please run pnpm install first.
  pause
  exit /b 1
)
"%PORTFOLIO_NODE%" node_modules\vite\bin\vite.js --host 127.0.0.1
