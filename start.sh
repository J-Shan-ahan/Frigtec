#!/bin/bash
# Quick start script for Frigtec website

echo "=========================================="
echo "  Frigtec Refrigeration Solutions"
echo "  Starting Website..."
echo "=========================================="
echo ""
echo "The website will be available at:"
echo "  Local:   http://localhost:5000"
echo "  Network: http://$(hostname -I | awk '{print $1}'):5000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python app.py
