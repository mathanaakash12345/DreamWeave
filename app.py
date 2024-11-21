from flask import Flask, request, jsonify
from flask_cors import CORS
import model  # Import model.py

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/send-data', methods=['POST'])
def receive_data():
    data = request.get_json()
    if data['data'] == 1:
        # Trigger the function to capture a scribble and get caption
        imagePath, caption = model.capture_scribble()
        
        # Return the image path and caption in the response
        return jsonify({
            # 'message': 'Scribble processed',
            'imagePath': "./saved_drawings/drawing.png",
            'caption': caption 
        }), 200
    return jsonify({'message': 'Invalid data'}), 400

if __name__ == '__main__':
    app.run(debug=True)


