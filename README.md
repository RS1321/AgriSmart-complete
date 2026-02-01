🌱 AgriSmart AI - Intelligent Crop Recommendation System

AgriSmart AI is a modern, full-stack web application designed to help farmers make data-driven decisions. It analyzes soil and weather parameters to recommend the most suitable crop and provides an AI-powered "Agronomist" for personalized care advice.

🚀 Features

🧪 Precision Crop Prediction: Uses a Random Forest Machine Learning model (trained on agricultural data) to predict the best crop based on Nitrogen, Phosphorus, Potassium, pH, Temperature, Humidity, and Rainfall.

🤖 AI Agronomist: Integrated Google Gemini AI to generate instant, personalized care guides (Irrigation, Pests, Fertilizers) for the recommended crop.

🎨 Modern UI: A beautiful, responsive interface built with React, TypeScript, and Tailwind CSS.

⚡ Real-time Analysis: Instant feedback via a Flask (Python) backend.

🛠️ Tech Stack

Frontend

Framework: React (Vite)

Language: TypeScript

Styling: Tailwind CSS

Icons: Lucide React

Animations: Framer Motion

Backend

Server: Flask (Python)

Machine Learning: Scikit-learn (Random Forest Classifier)

Data Handling: Pandas, Numpy

Model Storage: Joblib

⚙️ Installation & Setup

Follow these steps to run the project locally.

1. Clone the Repository

git clone [https://github.com/YOUR_USERNAME/AgriSmart-Complete.git](https://github.com/YOUR_USERNAME/AgriSmart-Complete.git)
cd AgriSmart-Complete


2. Setup the Backend (Python)

Open a terminal and navigate to the backend folder:

cd backend


Install the required Python libraries:

# If pip doesn't work directly, use python -m pip
python -m pip install flask flask-cors pandas numpy scikit-learn joblib


Train the AI Model (Creates the .pkl file):

python train_model.py


Start the Server:

python app.py


The backend will run on http://127.0.0.1:5000

3. Setup the Frontend (React)

Open a new terminal and navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the Website:

npm run dev


The frontend will run on http://localhost:8080 (or 5173).

🔑 AI Configuration (Gemini API)

To use the "Generate AI Care Guide" feature, you need a Google Gemini API Key.

Get a key from Google AI Studio.

Open frontend/src/components/CropPredictionForm.tsx.

Find the variable const apiKey and paste your key inside the quotes:

const apiKey = "YOUR_ACTUAL_API_KEY_HERE";


📸 Usage

Enter your soil data (N, P, K, pH) and weather conditions.

Click "Predict Best Crop" to see the ML model's recommendation.

Click "✨ Generate AI Care Guide" to ask Gemini for a detailed farming strategy.

🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request.

📝 License

This project is open-source and available under the MIT License.
