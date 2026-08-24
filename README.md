# Frigtec Refrigeration Solutions - Website

A modern, responsive website for Frigtec Refrigeration Solutions built with Python Flask. Features a dynamic photo gallery, easy content management through JSON configuration, and a clean, professional design that works seamlessly on all devices.

## Features

✨ **Modern & Responsive Design**
- Clean, professional aesthetic with gold/bronze branding colors
- Fully responsive layout that works on desktop, tablet, and mobile devices
- Smooth animations and transitions

🖼️ **Dynamic Photo Gallery**
- Auto-loading image carousel with navigation controls
- Thumbnail grid view
- Click thumbnails to jump to specific images
- Auto-advance slideshow (pauses on hover)
- Keyboard navigation support (arrow keys)

⚙️ **Easy Content Management**
- All content managed through `config.json` file
- Update company info, services, contact details without touching code
- Images automatically loaded from the gallery folder

📱 **Mobile-Friendly**
- Responsive navigation with hamburger menu
- Touch-friendly controls
- Optimized images and performance

## Project Structure

```
Frigtec/
├── app.py                          # Flask application
├── config.json                     # Website configuration 
├── requirements.txt                # Python dependencies
├── README.md                       # This file
├── templates/
│   └── index.html                  # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css              # Stylesheet
│   ├── js/
│   │   └── script.js              # JavaScript functionality
│   └── images/
│       ├── branding/
│       │   ├── logo.png           # Main logo
│       │   └── logo-alt.png       # Alternative logo
│       └── gallery/
│           ├── project-01.jpg     # Gallery images
│           ├── project-02.jpg
│           └── ...
└── assets/                         # Original assets (can be deleted after setup)
```
