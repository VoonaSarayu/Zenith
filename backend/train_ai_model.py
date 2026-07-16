import os
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.linear_model import LinearRegression
import joblib

DATA_PATH = "emily_historical_data.csv"

# 1. Load or Synthesize Emily's static training dataset
if os.path.exists(DATA_PATH):
    print(f"Loading static historical dataset from {DATA_PATH}...")
    train_df = pd.read_csv(DATA_PATH)
else:
    print(f"{DATA_PATH} not found. Generating a new static 6-month historical dataset for Emily Park...")
    # Generate realistic historical data for Emily Park
    np.random.seed(42)
    n_days = 180  # 6 months of data
    dates = pd.date_range(end="2026-07-12", periods=n_days)

    steps_list = []
    sleep_list = []
    active_list = []
    stress_list = []
    rhr_list = []

    for date in dates:
        is_weekend = date.weekday() >= 5
        if is_weekend:
            # Weekend patterns (higher activity, better sleep, lower stress/rhr)
            steps = int(np.random.normal(11500, 1500))
            sleep = round(np.random.normal(8.1, 0.4), 1)
            active = int(np.random.normal(85, 15))
            stress = int(np.random.normal(24, 5))
        else:
            # Workday patterns (lower activity, moderate sleep, higher stress/rhr)
            steps = int(np.random.normal(5500, 1000))
            sleep = round(np.random.normal(7.0, 0.6), 1)
            active = int(np.random.normal(38, 8))
            stress = int(np.random.normal(54, 12))
            # Occasional high stress / low sleep days (like Emily's Tuesday/Wednesday anomalies)
            if np.random.rand() < 0.15:  # 15% chance of high stress day
                stress = int(np.random.normal(78, 8))
                sleep = round(np.random.normal(5.0, 0.6), 1)
                steps = int(np.random.normal(4800, 800))
                active = int(np.random.normal(20, 5))
        
        # Clip values to realistic ranges
        steps = max(1000, steps)
        sleep = max(4.0, min(10.0, sleep))
        active = max(5, active)
        stress = max(10, min(95, stress))
        
        # Sympathetic cardiac coupling simulation for RHR
        rhr = int(np.round(59 + (stress / 6.2) + np.random.normal(0, 1.2)))
        rhr = max(45, min(90, rhr))
        
        steps_list.append(steps)
        sleep_list.append(sleep)
        active_list.append(active)
        stress_list.append(stress)
        rhr_list.append(rhr)

    # Calculate targets
    steps_arr = np.array(steps_list)
    sleep_arr = np.array(sleep_list)
    stress_arr = np.array(stress_list)
    active_arr = np.array(active_list)

    # Wellness Score formula
    steps_score = (np.clip(steps_arr, 0, 10000) / 10000.0) * 30
    sleep_score = np.where(sleep_arr < 7.0, (sleep_arr - 4.0) / 3.0, np.where(sleep_arr > 9.0, (12.0 - sleep_arr) / 3.0, 1.0))
    sleep_score = np.clip(sleep_score, 0, 1) * 30
    stress_score_term = (1 - (stress_arr / 100.0)) * 20
    active_score = (np.clip(active_arr, 0, 90) / 90.0) * 20
    wellness_score = np.round(steps_score + sleep_score + stress_score_term + active_score, 1)

    stress_level = []
    for s in stress_arr:
        if s < 35: stress_level.append(0)
        elif s <= 60: stress_level.append(1)
        else: stress_level.append(2)
    stress_level = np.array(stress_level)

    train_df = pd.DataFrame({
        'steps': steps_list,
        'sleep_hours': sleep_list,
        'resting_heart_rate': rhr_list,
        'stress_score': stress_list,
        'active_minutes': active_list,
        'Wellness_Score': wellness_score,
        'Stress_Level': stress_level
    })
    
    train_df.to_csv(DATA_PATH, index=False)
    print(f"Generated and saved static historical training dataset to {DATA_PATH}.")

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
