#!/bin/bash

echo "======================================"
echo " Bootstrapping Sierra Leone Server... "
echo "======================================"

# Detect environment
if [ -d "/data/data/com.termux/files/usr" ]; then
    echo "[!] Termux environment detected."
    export PLATFORM_MODE="termux"
    
    echo "Installing Termux dependencies..."
    pkg update -y
    pkg install nodejs postgresql redis git -y
    
    echo "Starting background services..."
    pg_ctl -D $PREFIX/var/lib/postgresql start
    redis-server --daemonize yes
else
    echo "[!] Standard Linux environment detected."
    export PLATFORM_MODE="linux"
    
    echo "Ensure you have Docker, Node.js v18+, and Nginx installed."
fi

# Setup Environment File
if [ ! -f .env ]; then
    echo "Copying .env.example to .env..."
    cp .env.example .env
fi

echo "Installing NPM Workspaces..."
npm install

echo "Running Database Migrations..."
npm run migrate:latest --workspace=@sls/database

echo "======================================"
echo " Setup Complete! Run 'npm run dev' "
echo "======================================"
