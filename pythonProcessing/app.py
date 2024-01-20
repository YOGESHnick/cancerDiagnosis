import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from the request
        data = request.get_json()

        # Extract features from the JSON data
        features = [
            float(data['radius_mean']),
            float(data['texture_mean']),
            float(data['perimeter_mean']),
            float(data['area_mean']),
            float(data['smoothness_mean']),
            float(data['compactness_mean']),
            float(data['concavity_mean']),
            float(data['concave_points_mean']),
            float(data['symmetry_mean']),
            float(data['fractal_dimension_mean']),
            float(data['radius_se']),
            float(data['texture_se']),
            float(data['perimeter_se']),
            float(data['area_se']),
            float(data['smoothness_se']),
            float(data['compactness_se']),
            float(data['concavity_se']),
            float(data['concave_points_se']),
            float(data['symmetry_se']),
            float(data['fractal_dimension_se']),
            float(data['radius_worst']),
            float(data['texture_worst']),
            float(data['perimeter_worst']),
            float(data['area_worst']),
            float(data['smoothness_worst']),
            float(data['compactness_worst']),
            float(data['concavity_worst']),
            float(data['concave_points_worst']),
            float(data['symmetry_worst']),
            float(data['fractal_dimension_worst'])
        ]

        input_features = np.array(features).reshape(1, -1)

        prediction = model.predict(input_features)

        # Prepare JSON response
        response = {'prediction_text': f'The predicted diagnosis is {prediction[0]}'}

        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
