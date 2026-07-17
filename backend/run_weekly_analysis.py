import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import joblib
import json

# Set custom dark style to match index.css visual hierarchy
plt.rcParams['figure.facecolor'] = '#090d16'
plt.rcParams['axes.facecolor'] = '#111625'
plt.rcParams['text.color'] = '#f8fafc'
plt.rcParams['axes.labelcolor'] = '#94a3b8'
plt.rcParams['xtick.color'] = '#94a3b8'
plt.rcParams['ytick.color'] = '#94a3b8'
plt.rcParams['grid.color'] = '#1e293b'
plt.rcParams['grid.alpha'] = 0.5
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = ['Outfit', 'DejaVu Sans', 'Arial']

# 1. Load Trained AI Machine Learning Models (Scikit-Learn Joblib)
print("Loading trained AI Models...")
wellness_clf = joblib.load('wellness_model.joblib')
stress_clf = joblib.load('stress_model.joblib')
rhr_clf = joblib.load('rhr_model.joblib')

print("\nProcessing Emily Park's 7-day wearable wellness log (wellness_data_7day.csv)...")

# 2. Load Data
df = pd.read_csv('wellness_data_7day.csv')
df['date'] = pd.to_datetime(df['date'])

# 3. Executing AI model inference on the log
X_wellness = df[['steps', 'sleep_hours', 'resting_heart_rate', 'stress_score', 'active_minutes']]
df['Wellness_Score'] = np.round(wellness_clf.predict(X_wellness), 1)

X_stress = df[['resting_heart_rate', 'sleep_hours', 'steps']]
predicted_levels = stress_clf.predict(X_stress)
level_labels = {0: 'Low', 1: 'Moderate', 2: 'High'}
df['Stress_Level'] = [level_labels[lvl] for lvl in predicted_levels]

df['predicted_rhr'] = np.round(rhr_clf.predict(df[['stress_score']])).astype(int)

# 4. Compute Weekly Summary Metrics
avg_steps = df['steps'].mean()
avg_sleep = df['sleep_hours'].mean()
avg_rhr = df['resting_heart_rate'].mean()
avg_stress = df['stress_score'].mean()
total_active = df['active_minutes'].sum()
avg_wellness = df['Wellness_Score'].mean()

highest_stress_row = df.loc[df['stress_score'].idxmax()]
highest_stress_date = highest_stress_row['date'].strftime('%Y-%m-%d')
highest_stress_val = int(highest_stress_row['stress_score'])

# 5. Create 7 Matplotlib Plots
days_labels = df['date'].dt.strftime('%a')

# Plot 1: Daily Steps Line Chart
fig1 = plt.figure(figsize=(10, 4))
plt.plot(days_labels, df['steps'], marker='o', color='#3b82f6', linewidth=2.5, label='Steps')
plt.axhline(8000, color='#ef4444', linestyle='--', label='Target (8k)')
plt.title("Emily Park - Weekly Steps Trend", fontsize=12, fontweight='bold')
plt.ylabel("Steps")
plt.grid(True, linestyle='--', alpha=0.3)
plt.legend(facecolor='#111625', edgecolor='#1e293b', labelcolor='#f8fafc')
plt.tight_layout()
plt.savefig("steps_weekly.png", dpi=150, facecolor='#090d16')
plt.close()

# Plot 2: Daily Sleep Hours Bar Chart
fig2 = plt.figure(figsize=(10, 4))
bar_colors = ['#ef4444' if h < 6.0 else '#8b5cf6' for h in df['sleep_hours']]
plt.bar(days_labels, df['sleep_hours'], color=bar_colors, width=0.5, label='Sleep Duration')
plt.axhline(7.0, color='#10b981', linestyle='--', label='Rec Min (7h)')
plt.title("Emily Park - Weekly Sleep Hours", fontsize=12, fontweight='bold')
plt.ylabel("Hours")
plt.grid(True, linestyle='--', alpha=0.3)
plt.legend(facecolor='#111625', edgecolor='#1e293b', labelcolor='#f8fafc')
plt.tight_layout()
plt.savefig("sleep_weekly.png", dpi=150, facecolor='#090d16')
plt.close()

# Plot 3: Daily Stress Score Line Chart
fig3 = plt.figure(figsize=(10, 4))
plt.plot(days_labels, df['stress_score'], marker='x', color='#f59e0b', linewidth=2.5, label='Stress Score')
plt.axhline(40, color='#10b981', linestyle='--', label='Target (<40)')
plt.title("Emily Park - Weekly Stress Score", fontsize=12, fontweight='bold')
plt.ylabel("Score (0-100)")
plt.grid(True, linestyle='--', alpha=0.3)
plt.legend(facecolor='#111625', edgecolor='#1e293b', labelcolor='#f8fafc')
plt.tight_layout()
plt.savefig("stress_weekly.png", dpi=150, facecolor='#090d16')
plt.close()

# Plot 4: HRV Line Chart
fig4 = plt.figure(figsize=(10, 4))
plt.plot(days_labels, df['hrv_ms'], marker='s', color='#ec4899', linewidth=2.5, label='HRV')
plt.axhline(45, color='#a78bfa', linestyle='--', label='Baseline Min (45ms)')
plt.title("Emily Park - Heart Rate Variability (HRV)", fontsize=12, fontweight='bold')
plt.ylabel("HRV (ms)")
plt.grid(True, linestyle='--', alpha=0.3)
plt.legend(facecolor='#111625', edgecolor='#1e293b', labelcolor='#f8fafc')
plt.tight_layout()
plt.savefig("hrv_weekly.png", dpi=150, facecolor='#090d16')
plt.close()

# Plot 5: Deep Sleep Bar Chart
fig5 = plt.figure(figsize=(10, 4))
plt.bar(days_labels, df['deep_sleep_hours'], color='#6366f1', width=0.5, label='Deep Sleep')
plt.axhline(1.2, color='#10b981', linestyle='--', label='Goal (1.2h)')
plt.title("Emily Park - Nightly Deep Sleep Hours", fontsize=12, fontweight='bold')
plt.ylabel("Deep Sleep (h)")
plt.grid(True, linestyle='--', alpha=0.3)
plt.legend(facecolor='#111625', edgecolor='#1e293b', labelcolor='#f8fafc')
plt.tight_layout()
plt.savefig("deep_sleep_weekly.png", dpi=150, facecolor='#090d16')
plt.close()

# Plot 6: VO2 Max Line Chart
fig6 = plt.figure(figsize=(10, 4))
plt.plot(days_labels, df['vo2_max'], marker='^', color='#06b6d4', linewidth=2.5, label='VO2 Max')
plt.title("Emily Park - Cardiovascular VO2 Max Trend", fontsize=12, fontweight='bold')
plt.ylabel("VO2 Max (ml/kg/min)")
plt.grid(True, linestyle='--', alpha=0.3)
plt.legend(facecolor='#111625', edgecolor='#1e293b', labelcolor='#f8fafc')
plt.tight_layout()
plt.savefig("vo2max_weekly.png", dpi=150, facecolor='#090d16')
plt.close()

# Plot 7: Calories Burned Bar Chart
fig7 = plt.figure(figsize=(10, 4))
plt.bar(days_labels, df['calories_burned'], color='#10b981', width=0.5, label='Active Calories')
plt.title("Emily Park - Active Calories Burned", fontsize=12, fontweight='bold')
plt.ylabel("Calories (kcal)")
plt.grid(True, linestyle='--', alpha=0.3)
plt.legend(facecolor='#111625', edgecolor='#1e293b', labelcolor='#f8fafc')
plt.tight_layout()
plt.savefig("calories_weekly.png", dpi=150, facecolor='#090d16')
plt.close()

# Smart Dynamic Coaching Recommendations
# Steps
if avg_steps >= 8000:
    steps_msg = f"Excellent consistency, Emily! Your weekly steps averaged {avg_steps:,.0f} steps/day, successfully exceeding the 8,000-step benchmark for healthy physical activity."
else:
    steps_msg = f"Your weekly steps averaged {avg_steps:,.0f} steps/day, short of the 8,000-step benchmark. Try adding a 10-minute walk on weekdays to close this gap."

# Stress & Sleep
if highest_stress_val > 50:
    stress_msg = f"On {highest_stress_row['date'].strftime('%A')} ({highest_stress_row['date'].strftime('%b %d')}), your sleep dropped to {highest_stress_row['sleep_hours']:.1f} hours, and your stress peaked at {highest_stress_val}. Prioritizing early rest on busy weekdays can help buffer your stress."
else:
    stress_msg = f"Your stress levels remained stable this week. On {highest_stress_row['date'].strftime('%A')}, your stress peaked at only {highest_stress_val} with {highest_stress_row['sleep_hours']:.1f} hours of sleep, representing an excellent recovery pattern."

# Active minutes
if total_active >= 150:
    active_msg = f"Outstanding activity level, Emily! You logged a total of {total_active} active minutes this week, easily exceeding the national target of 150 minutes."
else:
    active_msg = f"Your total active output this week was {total_active} minutes, which is below the recommended 150 minutes of moderate activity. Try to incorporate short brisk walks or exercises."

coaching_messages = [active_msg, stress_msg, steps_msg]

# Compile and Package dynamic data payload
weekly_logs = []
for idx, row in df.iterrows():
    weekly_logs.append({
        "date": row['date'].strftime('%Y-%m-%d'),
        "day": row['date'].strftime('%a'),
        "steps": int(row['steps']),
        "sleep_hours": float(row['sleep_hours']),
        "resting_heart_rate": int(row['resting_heart_rate']),
        "stress_score": int(row['stress_score']),
        "active_minutes": int(row['active_minutes']),
        "hrv_ms": int(row['hrv_ms']),
        "deep_sleep_hours": float(row['deep_sleep_hours']),
        "vo2_max": float(row['vo2_max']),
        "calories_burned": int(row['calories_burned']),
        "wellness_score": float(row['Wellness_Score']),
        "stress_level": row['Stress_Level']
    })

payload = {
    "user": "Emily Park (AI Enabled)",
    "first_name": "Emily",
    "week": "July 6 - July 12, 2026",
    "metrics": {
        "avg_steps": round(avg_steps, 1),
        "avg_sleep": round(avg_sleep, 1),
        "avg_stress": round(avg_stress, 1),
        "total_active_minutes": int(total_active),
        "avg_resting_heart_rate": round(avg_rhr, 1),
        "avg_wellness_score": round(avg_wellness, 1),
        "highest_stress_day": {
            "date": highest_stress_date,
            "score": highest_stress_val
        }
    },
    "coaching_messages": coaching_messages,
    "weekly_logs": weekly_logs
}

with open("dashboard_data_weekly.json", "w") as f:
    json.dump(payload, f, indent=4)

print("AI-driven weekly backend processing completed successfully. Generated 7 trends.")
