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
├── config.json                     # Website configuration (EDIT THIS!)
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

## Installation & Setup

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Step 1: Install Dependencies

```bash
# Navigate to the project directory
cd /run/media/john/space/Documents/Freelance/Frigtec

# Install required Python packages
pip install -r requirements.txt
```

### Step 2: Configure Your Website

Edit the `config.json` file to customize your website content:

```json
{
  "company": {
    "name": "Frigtec",
    "phone": "+61 XXX XXX XXX",      // Update with real phone
    "email": "info@frigtec.com.au",  // Update with real email
    "address": "Your Address Here"    // Update with real address
  },
  "services": [
    // Add, remove, or modify services
  ]
}
```

### Step 3: Run the Website

```bash
# Start the Flask development server
python app.py
```

The website will be available at: **http://localhost:5000**

To access from other devices on your network, use: **http://YOUR_IP_ADDRESS:5000**

## Updating Content

### Changing Text Content
Edit `config.json` to update:
- Company information (name, phone, email, address)
- Hero section (title, subtitle, call-to-action)
- Services (add/remove/modify service cards)
- About section content
- Social media links

### Adding/Removing Gallery Images
1. Add images to `static/images/gallery/` folder
2. Images are automatically detected and displayed
3. Supported formats: JPG, JPEG, PNG, GIF
4. For best results, use landscape-oriented images (16:9 or 4:3 ratio)

### Changing the Logo
Replace `static/images/branding/logo.png` with your new logo file (keep the same filename)

## Customization

### Colors
Edit `static/css/style.css` and modify the CSS variables at the top:

```css
:root {
    --primary-color: #d4a574;      /* Gold/bronze accent color */
    --secondary-color: #1a1a1a;    /* Dark background color */
    --text-color: #333;            /* Main text color */
    /* ... */
}
```

### Layout & Styling
All styles are in `static/css/style.css` - well-organized and commented for easy customization.

### Functionality
JavaScript functionality is in `static/js/script.js` including:
- Mobile menu toggle
- Gallery carousel
- Smooth scrolling
- Form handling
- Animations

## Deployment

### For Production Use:

1. **Use a production WSGI server** (not Flask's development server):
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

2. **Set up a reverse proxy** (nginx or Apache)

3. **Use a proper domain name** and SSL certificate

4. **Disable debug mode** in `app.py`:
   ```python
   app.run(debug=False, host='0.0.0.0', port=5000)
   ```

### Hosting Options:
- **PythonAnywhere** (easy, free tier available)
- **Heroku** (simple deployment)
- **DigitalOcean** (more control)
- **AWS/Google Cloud** (scalable)

## Browser Support

✅ Chrome (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Edge (latest)
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## API Endpoints

The application provides REST API endpoints:

- `GET /` - Main website
- `GET /api/gallery` - Returns list of gallery images (JSON)
- `GET /api/config` - Returns current configuration (JSON)

## Troubleshooting

**Images not loading?**
- Check that images are in `static/images/gallery/` folder
- Verify file extensions are lowercase (.jpg, .png, etc.)

**Website not accessible from other devices?**
- Make sure firewall allows port 5000
- Use your computer's IP address, not localhost

**Styles not applying?**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors (F12)

## Support

For issues or questions about this website, contact the developer or refer to:
- Flask documentation: https://flask.palletsprojects.com/
- HTML/CSS/JavaScript resources: https://developer.mozilla.org/

## License

This website is created for Frigtec Refrigeration Solutions.

---

**Built with ❤️ using Flask, HTML5, CSS3, and JavaScript**
