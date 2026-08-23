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

def load_reviews():
    """Load Google reviews from reviews.json"""
    try:
        with open('reviews.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

@app.route('/')
def index():
    """Main homepage"""
    config = load_config()
    reviews = load_reviews()
    return render_template('index.html', config=config, reviews=reviews)

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

@app.route('/services/aircon-installation')
def service_aircon():
    """Air Conditioning Installation service page"""
    config = load_config()
    return render_template('service_aircon.html', config=config)

@app.route('/services/refrigeration-maintenance')
def service_refrigeration():
    """Refrigeration Maintenance service page"""
    config = load_config()
    return render_template('service_refrigeration.html', config=config)

@app.route('/services/emergency-breakdown')
def service_emergency():
    """Emergency Breakdown Repairs service page"""
    config = load_config()
    return render_template('service_emergency.html', config=config)

@app.route('/services/hvac-service')
def service_hvac():
    """HVAC-R Service page"""
    config = load_config()
    return render_template('service_hvac.html', config=config)

@app.route('/environment')
def environment():
    """Environmental Responsibility page"""
    config = load_config()
    return render_template('environment.html', config=config)

@app.route('/codes-of-practice')
def codes_of_practice():
    """Codes of Practice & Industry Standards page"""
    config = load_config()
    return render_template('codes_of_practice.html', config=config)

@app.route('/api/gallery')
def get_gallery_images():
    """API endpoint to get gallery images dynamically from service folders"""
    images = []
    
    # Define service folders in order
    service_folders = [
        'static/images/services/aircon-installation',
        'static/images/services/refrigeration-maintenance',
        'static/images/services/emergency-breakdown',
        'static/images/services/hvac-service'
    ]
    
    # Collect images from all service folders
    for folder in service_folders:
        if os.path.exists(folder):
            for filename in sorted(os.listdir(folder)):
                if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                    # Create the web path
                    web_path = folder.replace('static/', '/static/')
                    images.append(f'{web_path}/{filename}')
    
    return jsonify(images)

@app.route('/api/gallery/<category>')
def get_category_gallery(category):
    """API endpoint to get gallery images for a specific service category"""
    images = []
    folder = f'static/images/services/{category}'
    
    if os.path.exists(folder):
        for filename in sorted(os.listdir(folder)):
            if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                web_path = folder.replace('static/', '/static/')
                images.append(f'{web_path}/{filename}')
    
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
