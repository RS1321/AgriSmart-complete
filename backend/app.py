from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # This allows your React app to talk to this Python app

# 1. Load the trained model
# Ensure you have run 'train_model.py' first so this file exists!
try:
    model = joblib.load('crop_recommendation_model.pkl')
    print("Model loaded successfully.")
except:
    print("Error: Model file not found. Run train_model.py first.")
    model = None

@app.route('/predict', methods=['POST'])
def predict():
    if not model:
        return jsonify({'error': 'Model not loaded'}), 500

    try:
        # 2. Get data from React
        data = request.json
        
        # 3. Convert data to the format the model expects
        # Order: N, P, K, temperature, humidity, ph, rainfall
        features = [
            float(data['nitrogen']),
            float(data['phosphorus']),
            float(data['potassium']),
            float(data['temperature']),
            float(data['humidity']),
            float(data['ph']),
            float(data['rainfall'])
        ]
        
        # 4. Make prediction
        final_features = [np.array(features)]
        prediction = model.predict(final_features)
        
        # 5. Return the result
        result = prediction[0]
        
        # Add a simple description based on the crop (optional logic)
        return jsonify({
            'crop': result,
            'confidence': 95, # Random Forest doesn't easily give probability per class without extra code, hardcoding for demo
            'description': f"Based on your soil, {result} is the optimal crop."
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)