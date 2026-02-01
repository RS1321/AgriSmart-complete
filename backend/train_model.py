import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# ---------------------------------------------------------
# 1. DATA PREPARATION
# ---------------------------------------------------------
# Load the dataset from the CSV file
# This expects a file named 'Crop_recommendation.csv' in the same directory
try:
    df = pd.read_csv('Crop_recommendation.csv')
    print(f"Dataset loaded successfully: {len(df)} records found.")
    print("\nDataset Head:")
    print(df.head())
except FileNotFoundError:
    print("Error: 'Crop_recommendation.csv' file not found.")
    print("Please ensure the CSV file is in the same directory as this script.")
    exit()

# Check for any missing values (just in case)
if df.isnull().sum().sum() > 0:
    print("Warning: Missing values found. Dropping missing rows...")
    df = df.dropna()

# Separate features (X) and target label (y)
# The dataset typically has these columns: N, P, K, temperature, humidity, ph, rainfall, label
X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y = df['label']

# ---------------------------------------------------------
# 2. MODEL TRAINING
# ---------------------------------------------------------
# Split data into training and testing sets (80% train, 20% test)
# stratify=y ensures we get a balanced mix of crops in both train and test sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Initialize Random Forest Classifier
# n_estimators=100 means we build 100 decision trees
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Train the model
print("\nTraining Model...")
model.fit(X_train, y_train)

# ---------------------------------------------------------
# 3. EVALUATION
# ---------------------------------------------------------
# Make predictions on the test set
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)

print(f"Model Accuracy: {accuracy * 100:.2f}%")

# ---------------------------------------------------------
# 4. TESTING A NEW PREDICTION
# ---------------------------------------------------------
# Let's test with new data: High Nitrogen & Rainfall -> Should be Rice (if in dataset)
sample_input = [[90, 42, 43, 20, 82, 6, 200]] 
prediction = model.predict(sample_input)
print(f"\nTest Prediction for inputs {sample_input}: {prediction[0]}")

# ---------------------------------------------------------
# 5. SAVING THE MODEL
# ---------------------------------------------------------
# Save the model to a file to use in your API later
joblib.dump(model, 'crop_recommendation_model.pkl')
print("\nModel saved as 'crop_recommendation_model.pkl'")