// Interactive Dashboard Engine with Live AI Predictions
let currentFilter = 'all'; // 'all', 'workdays', 'weekends'
let rawWeeklyLogs = [];
let backendCoachingMessages = [];
let stepsChart, sleepChart, stressChart, hrvChart, deepSleepChart, vo2maxChart, caloriesChart;

// 1. Initial Launch
document.addEventListener('DOMContentLoaded', () => {
    loadDashboardData();
    setupListeners();
});

// Update Matplotlib static chart image paths
function updateStaticImagePaths() {
    const imgSteps = document.getElementById('img-static-steps');
    const imgSleep = document.getElementById('img-static-sleep');
    const imgStress = document.getElementById('img-static-stress');
    const imgHrv = document.getElementById('img-static-hrv');
    const imgDeepSleep = document.getElementById('img-static-deep-sleep');
    const imgVo2max = document.getElementById('img-static-vo2max');
    const imgCalories = document.getElementById('img-static-calories');

    if (imgSteps) imgSteps.src = "steps_weekly.png";
    if (imgSleep) imgSleep.src = "sleep_weekly.png";
    if (imgStress) imgStress.src = "stress_weekly.png";
    if (imgHrv) imgHrv.src = "hrv_weekly.png";
    if (imgDeepSleep) imgDeepSleep.src = "deep_sleep_weekly.png";
    if (imgVo2max) imgVo2max.src = "vo2max_weekly.png";
    if (imgCalories) imgCalories.src = "calories_weekly.png";
}

// 2. Load dynamic JSON payload containing AI predictions
function loadDashboardData() {
    fetch('dashboard_data_weekly.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('dashboard-title').innerText = data.user;
            document.getElementById('dashboard-period').innerText = `Wearable Wellness Log • ${data.week}`;
            rawWeeklyLogs = data.weekly_logs;
            backendCoachingMessages = data.coaching_messages || [];
            updateStaticImagePaths();
            updateDashboard();
        })
        .catch(err => {
            console.log("Error loading dashboard data JSON. Loading fallback data.js...", err);
            // Fallback: build weekly logs manually if offline
            rawWeeklyLogs = emilyWeeklyData.map(row => {
                let stressLvl = 'Low';
                if (row.stress_score > 60) stressLvl = 'High';
                else if (row.stress_score >= 35) stressLvl = 'Moderate';

                // Traditional formula fallback
                const steps_score = (Math.min(row.steps, 10000) / 10000.0) * 30;
                let sleep_score;
                if (row.sleep_hours < 7.0) {
                    sleep_score = (row.sleep_hours - 4.0) / 3.0;
                } else if (row.sleep_hours > 9.0) {
                    sleep_score = (12.0 - row.sleep_hours) / 3.0;
                } else {
                    sleep_score = 1.0;
                }
                const sleep_score_clamped = Math.max(0, Math.min(sleep_score, 1)) * 30;
                const stress_term = (1 - (row.stress_score / 100.0)) * 20;
                const active_score = (Math.min(row.active_minutes, 90) / 90.0) * 20;
                const wellness = Math.round((steps_score + sleep_score_clamped + stress_term + active_score) * 10) / 10;

                return {
                    ...row,
                    wellness_score: wellness,
                    stress_level: stressLvl
                };
            });

            const totalActive = rawWeeklyLogs.reduce((acc, r) => acc + r.active_minutes, 0);
            const avgSteps = Math.round(rawWeeklyLogs.reduce((acc, r) => acc + r.steps, 0) / rawWeeklyLogs.length);
            backendCoachingMessages = [
                `Outstanding active output, Emily! You logged a total of ${totalActive} active minutes this week, easily exceeding the national target of 150 minutes.`,
                `Weekly stress and sleep patterns analyzed. Protecting bedtime rest can buffer stress peaks.`,
                `Your weekly steps averaged ${avgSteps.toLocaleString()} steps/day. Try walking 10 minutes at lunch to increase daily consistency.`
            ];

            updateStaticImagePaths();
            updateDashboard();
        });
}

// 3. Setup Action Event Listeners
function setupListeners() {
    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            updateDashboard();
        });
    });

    // View Toggle Slider
    const toggleSwitch = document.getElementById('view-toggle-switch');
    toggleSwitch.addEventListener('change', (e) => {
        const interactiveHolders = document.querySelectorAll('.chart-canvas-holder');
        const staticHolders = document.querySelectorAll('.static-image-holder');
        
        if (e.target.checked) {
            interactiveHolders.forEach(h => h.style.display = 'none');
            staticHolders.forEach(h => h.style.display = 'block');
        } else {
            interactiveHolders.forEach(h => h.style.display = 'block');
            staticHolders.forEach(h => h.style.display = 'none');
            updateCharts();
        }
    });

    // Export CSV Button
    document.getElementById('export-csv-btn').addEventListener('click', exportDatasetToCSV);
}

// 4. Main Update Pipeline
function updateDashboard() {
    const filteredData = getFilteredData();
    
    // Recalculate and update metrics based on AI predictions
    calculateAndUpdateMetrics(filteredData);
    
    // Re-render Data Log Grid
    renderLogTable(filteredData);
    
    // Update Chart.js Visuals
    updateCharts(filteredData);
    
    // Update Coaching Messages Panel
    updateCoachingMessages(filteredData);
}

// 5. Data Filter Helper
function getFilteredData() {
    return rawWeeklyLogs.filter(row => {
        const dateObj = new Date(row.date);
        const dayOfWeek = dateObj.getDay(); // 0 is Sunday, 6 is Saturday
        const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
        
        if (currentFilter === 'workdays') return !isWeekend;
        if (currentFilter === 'weekends') return isWeekend;
        return true; // 'all'
    });
}

// 6. Aggregate Calculations & UI Binding
function calculateAndUpdateMetrics(data) {
    const totalDays = data.length;
    if (totalDays === 0) return;

    const sumSteps = data.reduce((acc, row) => acc + row.steps, 0);
    const sumSleep = data.reduce((acc, row) => acc + row.sleep_hours, 0);
    const sumStress = data.reduce((acc, row) => acc + row.stress_score, 0);
    const sumHeart = data.reduce((acc, row) => acc + row.resting_heart_rate, 0);
    const sumActive = data.reduce((acc, row) => acc + row.active_minutes, 0);

    const avgSteps = Math.round(sumSteps / totalDays);
    const avgSleep = (sumSleep / totalDays).toFixed(1);
    const avgStress = Math.round(sumStress / totalDays);
    const avgHeart = Math.round(sumHeart / totalDays);
    const totalActive = sumActive;

    // Apply values with animations
    animateValue('val-steps', avgSteps);
    animateValue('val-sleep', avgSleep, true);
    animateValue('val-stress', avgStress);
    animateValue('val-heart', avgHeart);
    animateValue('val-active', totalActive);

    // Apply Status Messages
    const targetSteps = 8000;
    const targetSleepMin = 7.0;
    const targetSleepMax = 9.0;
    const targetStress = 40;
    const targetHeartMin = 60;
    const targetHeartMax = 80;
    const targetWeeklyActive = 150;

    const statusSteps = document.getElementById('status-steps');
    statusSteps.innerHTML = avgSteps >= targetSteps ? `<span style="color:#10b981">✓ Meets Target</span>` : `<span style="color:#ef4444">✗ Below Target</span>`;

    const statusSleep = document.getElementById('status-sleep');
    statusSleep.innerHTML = (avgSleep >= targetSleepMin && avgSleep <= targetSleepMax) ? `<span style="color:#10b981">✓ Healthy Range</span>` : `<span style="color:#ef4444">✗ Out of Range</span>`;

    const statusStress = document.getElementById('status-stress');
    statusStress.innerHTML = avgStress < targetStress ? `<span style="color:#10b981">✓ Optimal Level</span>` : `<span style="color:#f59e0b">⚠ Elevated Level</span>`;

    const statusHeart = document.getElementById('status-heart');
    statusHeart.innerHTML = (avgHeart >= targetHeartMin && avgHeart <= targetHeartMax) ? `<span style="color:#10b981">✓ Safe Base</span>` : `<span style="color:#ef4444">⚠ Out of Range</span>`;

    const propActiveTarget = Math.round((targetWeeklyActive / 7) * totalDays);
    const statusActive = document.getElementById('status-active');
    statusActive.innerHTML = totalActive >= propActiveTarget ? `<span style="color:#10b981">✓ Exceeds Goal</span>` : `<span style="color:#ef4444">✗ Below Goal</span>`;
}

// 7. Numeric Count Animation
function animateValue(id, endVal, isFloat = false) {
    const obj = document.getElementById(id);
    let startVal = parseFloat(obj.innerText.replace(/,/g, '')) || 0;
    if (isNaN(startVal)) startVal = 0;
    
    const duration = 600;
    const startTime = performance.now();
    
    function updateNum(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress * (2 - progress);
        const currentVal = startVal + (endVal - startVal) * easeProgress;
        
        obj.innerText = isFloat ? currentVal.toFixed(1) : Math.round(currentVal).toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNum);
        }
    }
    requestAnimationFrame(updateNum);
}

// 8. Render Table Logs
function renderLogTable(data) {
    const tableBody = document.getElementById('log-table-body');
    tableBody.innerHTML = '';
    
    data.forEach(row => {
        let badgeClass = 'badge-low';
        if (row.stress_level === 'High') badgeClass = 'badge-high';
        else if (row.stress_level === 'Moderate') badgeClass = 'badge-mod';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${row.day}</strong> <span style="font-size:0.75rem;color:var(--text-secondary)">(${row.date.split('-').slice(1).join('/')})</span></td>
            <td>${row.steps.toLocaleString()}</td>
            <td>${row.sleep_hours} hrs</td>
            <td>${row.resting_heart_rate} bpm</td>
            <td><span class="badge ${badgeClass}">${row.stress_score} (${row.stress_level})</span></td>
            <td>${row.active_minutes}m</td>
        `;
        tableBody.appendChild(tr);
    });
}

// 9. Interactive Charts Updates (Chart.js)
function updateCharts(data) {
    if (!data) data = getFilteredData();
    const isStaticVisible = document.getElementById('view-toggle-switch').checked;
    if (isStaticVisible) return;

    const labels = data.map(r => r.day);
    const stepsData = data.map(r => r.steps);
    const sleepData = data.map(r => r.sleep_hours);
    const stressData = data.map(r => r.stress_score);
    const hrvData = data.map(r => r.hrv_ms);
    const deepSleepData = data.map(r => r.deep_sleep_hours);
    const vo2maxData = data.map(r => r.vo2_max);
    const caloriesData = data.map(r => r.calories_burned);

    // Chart 1: Steps Line Chart
    if (stepsChart) stepsChart.destroy();
    const ctxSteps = document.getElementById('chart-steps-canvas').getContext('2d');
    stepsChart = new Chart(ctxSteps, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Steps Count',
                data: stepsData,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                tension: 0.35,
                fill: true,
                pointBackgroundColor: '#3b82f6',
                pointHoverRadius: 7
            }, {
                label: 'Target Limit (8,000)',
                data: Array(data.length).fill(8000),
                borderColor: '#ef4444',
                borderDash: [5, 5],
                borderWidth: 1.5,
                pointRadius: 0,
                fill: false
            }]
        },
        options: getChartOptions('Steps Count', 12000)
    });

    // Chart 2: Sleep Duration Bar Chart
    if (sleepChart) sleepChart.destroy();
    const ctxSleep = document.getElementById('chart-sleep-canvas').getContext('2d');
    sleepChart = new Chart(ctxSleep, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Hours Slept',
                data: sleepData,
                backgroundColor: data.map(r => r.sleep_hours < 6.0 ? 'rgba(239, 68, 68, 0.7)' : 'rgba(139, 92, 246, 0.7)'),
                borderColor: data.map(r => r.sleep_hours < 6.0 ? '#ef4444' : '#8b5cf6'),
                borderWidth: 1.5,
                borderRadius: 6
            }]
        },
        options: getChartOptions('Sleep Duration (Hours)', 10)
    });

    // Chart 3: Stress Score Line Chart
    if (stressChart) stressChart.destroy();
    const ctxStress = document.getElementById('chart-stress-canvas').getContext('2d');
    stressChart = new Chart(ctxStress, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stress Score',
                data: stressData,
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true,
                pointBackgroundColor: '#f59e0b',
                pointHoverRadius: 7
            }, {
                label: 'Stress Limit (40)',
                data: Array(data.length).fill(40),
                borderColor: '#10b981',
                borderDash: [5, 5],
                borderWidth: 1.5,
                pointRadius: 0,
                fill: false
            }]
        },
        options: getChartOptions('Stress Level (0-100)', 100)
    });

    // Chart 4: Heart Rate Variability (HRV) Line Chart
    if (hrvChart) hrvChart.destroy();
    const ctxHrv = document.getElementById('chart-hrv-canvas').getContext('2d');
    hrvChart = new Chart(ctxHrv, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'HRV (ms)',
                data: hrvData,
                borderColor: '#ec4899',
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true,
                pointBackgroundColor: '#ec4899',
                pointHoverRadius: 7
            }, {
                label: 'Baseline Min (45)',
                data: Array(data.length).fill(45),
                borderColor: '#a78bfa',
                borderDash: [5, 5],
                borderWidth: 1.5,
                pointRadius: 0,
                fill: false
            }]
        },
        options: getChartOptions('HRV (ms)', 80)
    });

    // Chart 5: Deep Sleep Duration Bar Chart
    if (deepSleepChart) deepSleepChart.destroy();
    const ctxDeepSleep = document.getElementById('chart-deep-sleep-canvas').getContext('2d');
    deepSleepChart = new Chart(ctxDeepSleep, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Deep Sleep Hours',
                data: deepSleepData,
                backgroundColor: 'rgba(99, 102, 241, 0.7)',
                borderColor: '#6366f1',
                borderWidth: 1.5,
                borderRadius: 6
            }, {
                label: 'Goal (1.2h)',
                data: Array(data.length).fill(1.2),
                type: 'line',
                borderColor: '#10b981',
                borderDash: [5, 5],
                borderWidth: 1.5,
                pointRadius: 0,
                fill: false
            }]
        },
        options: getChartOptions('Deep Sleep (Hours)', 3)
    });

    // Chart 6: VO2 Max Line Chart
    if (vo2maxChart) vo2maxChart.destroy();
    const ctxVo2max = document.getElementById('chart-vo2max-canvas').getContext('2d');
    vo2maxChart = new Chart(ctxVo2max, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'VO2 Max',
                data: vo2maxData,
                borderColor: '#06b6d4',
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                borderWidth: 3,
                tension: 0.25,
                fill: true,
                pointBackgroundColor: '#06b6d4',
                pointHoverRadius: 7
            }]
        },
        options: getChartOptions('VO2 Max (ml/kg/min)', 45)
    });

    // Chart 7: Active Calories Burned Bar Chart
    if (caloriesChart) caloriesChart.destroy();
    const ctxCalories = document.getElementById('chart-calories-canvas').getContext('2d');
    caloriesChart = new Chart(ctxCalories, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Active Calories Burned (kcal)',
                data: caloriesData,
                backgroundColor: 'rgba(16, 185, 129, 0.7)',
                borderColor: '#10b981',
                borderWidth: 1.5,
                borderRadius: 6
            }]
        },
        options: getChartOptions('Calories (kcal)', 800)
    });
}

function getChartOptions(yLabel, yMax) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true, labels: { color: '#94a3b8', font: { family: 'Outfit', size: 11 } } }
        },
        scales: {
            x: {
                grid: { color: 'rgba(255, 255, 255, 0.04)' },
                ticks: { color: '#94a3b8', font: { family: 'Outfit', size: 11 } }
            },
            y: {
                max: yMax,
                grid: { color: 'rgba(255, 255, 255, 0.04)' },
                ticks: { color: '#94a3b8', font: { family: 'Outfit', size: 11 } },
                title: { display: true, text: yLabel, color: '#94a3b8', font: { family: 'Outfit', size: 12, weight: 'bold' } }
            }
        }
    };
}

// 10. Dynamic Coaching Message Panel Updates
function updateCoachingMessages(data) {
    const container = document.getElementById('coaching-tips-container');
    container.innerHTML = '';

    const totalDays = data.length;
    const sumSteps = data.reduce((acc, r) => acc + r.steps, 0);
    const sumSleep = data.reduce((acc, r) => acc + r.sleep_hours, 0);
    const sumStress = data.reduce((acc, r) => acc + r.stress_score, 0);
    const sumActive = data.reduce((acc, r) => acc + r.active_minutes, 0);
    const sumWellness = data.reduce((acc, r) => acc + r.wellness_score, 0);

    const avgSteps = Math.round(sumSteps / totalDays);
    const avgSleep = (sumSleep / totalDays).toFixed(1);
    const avgStress = Math.round(sumStress / totalDays);
    const avgWellness = (sumWellness / totalDays).toFixed(1);
    const totalActive = sumActive;

    let tips = [];

    if (currentFilter === 'all') {
        if (backendCoachingMessages && backendCoachingMessages.length >= 3) {
            tips = [
                {
                    type: 'active',
                    title: 'Active Output',
                    msg: backendCoachingMessages[0]
                },
                {
                    type: 'stress',
                    title: 'Sleep & Stress Pattern',
                    msg: backendCoachingMessages[1]
                },
                {
                    type: 'steps',
                    title: 'Locomotion Consistency',
                    msg: backendCoachingMessages[2]
                }
            ];
        } else {
            tips = [
                {
                    type: 'steps',
                    title: 'AI Predicted Wellness',
                    msg: `Emily, our Machine Learning models predict your average weekly Wellness Score is ${avgWellness} / 100.`
                },
                {
                    type: 'sleep',
                    title: 'Sympathetic Activation',
                    msg: `Weekly sleep patterns and stress score averages indicate your autonomic nervous system is adjusting to physical and mental strain.`
                },
                {
                    type: 'stress',
                    title: 'Active Output Guideline',
                    msg: `You logged a total of ${totalActive} active minutes this week, compared to the target benchmark of 150 minutes.`
                }
            ];
        }
    } else {
        let stressLvlText = 'Low';
        if (avgStress > 60) stressLvlText = 'High';
        else if (avgStress >= 35) stressLvlText = 'Moderate';

        if (currentFilter === 'workdays') {
            tips = [
                {
                    type: 'steps',
                    title: 'Sedentary Alert',
                    msg: `Workdays exhibit lower locomotion steps (avg ${avgSteps.toLocaleString()}). Try a 10-minute walk at lunch to increase step patterns.`
                },
                {
                    type: 'sleep',
                    title: 'Stress Mitigation',
                    msg: `Your weekday stress average predicted by AI is ${avgStress} (${stressLvlText}). Setting an alarm to transition to bed 30 minutes earlier will significantly lower this weekday strain.`
                },
                {
                    type: 'stress',
                    title: 'Activity Protection',
                    msg: `Even on workdays, you averaged ${Math.round(totalActive/totalDays)} active minutes. Continue protecting this active window as it acts as your primary buffer against work stress.`
                }
            ];
        } else if (currentFilter === 'weekends') {
            tips = [
                {
                    type: 'steps',
                    title: 'Weekend Compensation',
                    msg: `Superb! You averaged ${avgSteps.toLocaleString()} steps/day, reaching an AI-predicted Wellness Score of ${avgWellness} / 100 on Saturdays and Sundays.`
                },
                {
                    type: 'sleep',
                    title: 'Restorative Sleep',
                    msg: `Your weekend sleep averaged ${avgSleep} hours, allowing your cardiovascular system to relax down to a resting heart rate average of ${Math.round(data.reduce((a,r)=>a+r.resting_heart_rate,0)/totalDays)} bpm.`
                },
                {
                    type: 'stress',
                    title: 'Optimal Recovery',
                    msg: `AI classifies your weekend stress level as ${stressLvlText} (average score ${avgStress}). This represents a perfect recovery pattern to start the upcoming work week.`
                }
            ];
        }
    }

    tips.forEach(tip => {
        const item = document.createElement('div');
        item.className = `tip-item tip-${tip.type}`;
        item.innerHTML = `
            <div class="tip-title">${tip.title}</div>
            <p>${tip.msg}</p>
        `;
        container.appendChild(item);
    });
}

// 11. Download CSV functionality
function exportDatasetToCSV() {
    const data = getFilteredData();
    if (data.length === 0) return;

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Date,Day,Steps,Sleep Hours,Resting Heart Rate,Stress Score,Active Minutes,HRV (ms),Deep Sleep (hrs),VO2 Max,Calories Burned,AI Predicted Wellness Score,AI Predicted Stress Level\n";
    
    data.forEach(row => {
        csvContent += `${row.date},${row.day},${row.steps},${row.sleep_hours},${row.resting_heart_rate},${row.stress_score},${row.active_minutes},${row.hrv_ms},${row.deep_sleep_hours},${row.vo2_max},${row.calories_burned},${row.wellness_score},${row.stress_level}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `emily_wellness_ai_${currentFilter}_summary.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
