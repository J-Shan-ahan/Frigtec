"""
Frigtec Refrigeration Solutions - Website Application
A simple Flask-based website with dynamic content management
"""

from flask import Flask, render_template, jsonify, send_from_directory
import json
import os

app = Flask(__name__)

# Load configuration
def load_config():
    """Load website configuration from config.json"""
    with open('config.json', 'r') as f:
        return json.load(f)

@app.route('/')
def index():
    """Main homepage"""
    config = load_config()
    return render_template('index.html', config=config)

@app.route('/services')
def services():
    """Services page"""
    config = load_config()
    return render_template('services.html', config=config)

@app.route('/about')
def about():
    """About page"""
    config = load_config()
    return render_template('about.html', config=config)

@app.route('/gallery')
def gallery():
    """Gallery page"""
    config = load_config()
    return render_template('gallery.html', config=config)

@app.route('/api/gallery')
def get_gallery_images():
    """API endpoint to get gallery images dynamically"""
    gallery_path = 'static/images/gallery'
    images = []
    
    if os.path.exists(gallery_path):
        for filename in sorted(os.listdir(gallery_path)):
            if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                images.append(f'/static/images/gallery/{filename}')
    
    return jsonify(images)

@app.route('/api/config')
def get_config():
    """API endpoint to get current configuration"""
    config = load_config()
    return jsonify(config)

@app.route('/robots.txt')
def robots():
    """Serve robots.txt for SEO"""
    return send_from_directory('static', 'robots.txt', mimetype='text/plain')

@app.route('/sitemap.xml')
def sitemap():
    """Serve sitemap.xml for SEO"""
    return send_from_directory('static', 'sitemap.xml', mimetype='application/xml')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
