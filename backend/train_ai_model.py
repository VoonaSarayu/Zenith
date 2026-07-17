import os
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.linear_model import LinearRegression
import joblib

DATA_PATH = "emily_historical_data.csv"

# 1. Load Emily's static training dataset
if os.path.exists(DATA_PATH):
    print(f"Loading static historical dataset from {DATA_PATH}...")
    train_df = pd.read_csv(DATA_PATH)
else:
    raise FileNotFoundError(f"Stored training dataset not found at {DATA_PATH}. Please ensure the file is present before training.")

# 2. Train the AI Models
print("Training AI model for Wellness Score prediction (RandomForestRegressor)...")
X_wellness = train_df[['steps', 'sleep_hours', 'resting_heart_rate', 'stress_score', 'active_minutes']]
y_wellness = train_df['Wellness_Score']
wellness_model = RandomForestRegressor(n_estimators=100, random_state=42)
wellness_model.fit(X_wellness, y_wellness)

print("Training AI model for Stress Level classification (RandomForestClassifier)...")
X_stress = train_df[['resting_heart_rate', 'sleep_hours', 'steps']]
y_stress = train_df['Stress_Level']
stress_model = RandomForestClassifier(n_estimators=100, random_state=42)
stress_model.fit(X_stress, y_stress)

print("Training AI model for Cardiovascular Sympathetic Coupling (LinearRegression)...")
X_rhr = train_df[['stress_score']]
y_rhr = train_df['resting_heart_rate']
rhr_model = LinearRegression()
rhr_model.fit(X_rhr, y_rhr)

# 3. Save the trained AI models to disk
joblib.dump(wellness_model, 'wellness_model.joblib')
joblib.dump(stress_model, 'stress_model.joblib')
joblib.dump(rhr_model, 'rhr_model.joblib')

print("All AI models trained and saved successfully.")
