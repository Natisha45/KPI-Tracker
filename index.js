        // Global data storage - shared between both views
        const appData = {
            kpiData: [
                {
                    manager: "Customer Growth Manager",
                    kpi: "New Active Customers",
                    benchmark: 22901,
                    target: 53000,
                    actual: 18000,
                    achievement: 0,
                    score: 0
                },
                {
                    manager: "Customer Growth Manager",
                    kpi: "Customer Retention Rate (%)",
                    benchmark: 0,
                    target: 10000,
                    actual: 7500,
                    achievement: 0,
                    score: 0
                },
                {
                    manager: "Customer Growth Manager",
                    kpi: "Customer Reactivation Count",
                    benchmark: 0,
                    target: 10000,
                    actual: 6200,
                    achievement: 0,
                    score: 0
                },
                {
                    manager: "Customer Growth Manager",
                    kpi: "New Online Registrations",
                    benchmark: 0,
                    target: 20000,
                    actual: 16500,
                    achievement: 0,
                    score: 0
                },
                {
                    manager: "Customer Growth Manager",
                    kpi: "Total Online Deposit Volume",
                    benchmark: 19000000,
                    target: 28578724,
                    actual: 22000000,
                    achievement: 0,
                    score: 0
                },
                {
                    manager: "Customer Growth Manager",
                    kpi: "Online Bet",
                    benchmark: 0,
                    target: 10688000,
                    actual: 8900000,
                    achievement: 0,
                    score: 0
                },
                {
                    manager: "Customer Growth Manager",
                    kpi: "Casino & Virtual Bank Deposit",
                    benchmark: 0,
                    target: 17890724,
                    actual: 13100000,
                    achievement: 0,
                    score: 0
                },
                {
                    manager: "Offline Agent Manager",
                    kpi: "New Agents Recruited",
                    benchmark: 0,
                    target: 15,
                    actual: 12,
                    achievement: 0,
                    score: 0
                },
                {
                    manager: "Offline Agent Manager",
                    kpi: "New Created Branches",
                    benchmark: 0,
                    target: 30,
                    actual: 25,
                    achievement: 0,
                    score: 0
                },
                {
                    manager: "Offline Agent Manager",
                    kpi: "New POS Agent Recruited",
                    benchmark: 0,
                    target: 30,
                    actual: 18,
                    achievement: 0,
                    score: 0
                },
                {
                    manager: "Offline Agent Manager",
                    kpi: "Offline Ticket Sales Volume",
                    benchmark: 307632,
                    target: 424533,
                    actual: 380000,
                    achievement: 0,
                    score: 0
                },
                {
                    manager: "Offline Agent Manager",
                    kpi: "Branch Retention",
                    benchmark: 0,
                    target: 0,
                    actual: 0,
                    achievement: 0,
                    score: 0
                },
                {
                    manager: "Offline Agent Manager",
                    kpi: "Total Offline Deposit Volume",
                    benchmark: 0,
                    target: 12774661,
                    actual: 9800000,
                    achievement: 0,
                    score: 0
                }
            ],
            performanceData: {}
        };

        // View switching function
        function switchView(viewName) {
            // Update view buttons
            document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            // Show/hide views
            document.querySelectorAll('.dashboard-view').forEach(view => view.classList.remove('active'));
            document.getElementById(`${viewName}-view`).classList.add('active');
            
            // Refresh data if switching to summary
            if (viewName === 'summary') {
                updateSummaryData();
                initializeSummaryDashboard();
            }
        }

        // Data synchronization function
        function updateSummaryData() {
            const kpiData = appData.kpiData;
            
            // Calculate summary metrics from tracker data
            const overallAchievement = kpiData.reduce((sum, item) => sum + item.achievement, 0) / kpiData.length;
            const targetsAchieved = kpiData.filter(item => item.actual >= item.target).length;
            const benchmarksMet = kpiData.filter(item => item.benchmark > 0 && item.actual >= item.benchmark).length;
            
            // Update performance data for summary view
            appData.performanceData = {
                overallAchievement: overallAchievement,
                targetsAchieved: targetsAchieved,
                totalTargets: kpiData.length,
                benchmarksMet: benchmarksMet,
                totalBenchmarks: kpiData.filter(item => item.benchmark > 0).length,
                teamPerformance: calculateTeamPerformance(kpiData),
                monthlyTrend: generateMonthlyTrend(overallAchievement),
                kpiAchievements: kpiData.map(item => ({
                    kpi: item.kpi,
                    achievement: item.achievement
                })).sort((a, b) => b.achievement - a.achievement)
            };
        }

        function calculateTeamPerformance(kpiData) {
            const teams = {};
            kpiData.forEach(item => {
                if (!teams[item.manager]) {
                    teams[item.manager] = { total: 0, count: 0 };
                }
                teams[item.manager].total += item.achievement;
                teams[item.manager].count += 1;
            });
            
            const result = {};
            Object.keys(teams).forEach(team => {
                result[team] = teams[team].total / teams[team].count;
            });
            return result;
        }

        function generateMonthlyTrend(currentAchievement) {
            // Generate realistic trend data based on current achievement
            return [
                { month: "Aug", achievement: Math.max(40, currentAchievement - 28) },
                { month: "Sep", achievement: Math.max(50, currentAchievement - 18) },
                { month: "Oct", achievement: Math.max(55, currentAchievement - 13) },
                { month: "Nov", achievement: currentAchievement }
            ];
        }

        // Modal Functions - COMPLETE VERSION
        function openSetupModal() {
            document.getElementById('setupModal').style.display = 'flex';
            populateSetupInputs();
        }

        function openUpdateModal() {
            document.getElementById('updateModal').style.display = 'flex';
            populateUpdateInputs();
        }

        function closeSetupModal() {
            document.getElementById('setupModal').style.display = 'none';
        }

        function closeUpdateModal() {
            document.getElementById('updateModal').style.display = 'none';
        }

        function populateSetupInputs() {
            const container = document.getElementById('setupInputs');
            container.innerHTML = '';
            
            // Create input fields for each KPI
            appData.kpiData.forEach((item, index) => {
                container.innerHTML += `
                    <div style="background: #f8f9fa; padding: 15px; margin-bottom: 15px; border-radius: 5px;">
                        <h4 style="margin-bottom: 10px; color: #2c3e50;">${item.manager} - ${item.kpi}</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <div class="input-group">
                                <label>Benchmark (Current)</label>
                                <input type="number" id="benchmark-${index}" value="${item.benchmark}">
                            </div>
                            <div class="input-group">
                                <label>Target</label>
                                <input type="number" id="target-${index}" value="${item.target}">
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        function populateUpdateInputs() {
            const container = document.getElementById('updateInputs');
            container.innerHTML = '';
            
            // Create input fields for actual values
            appData.kpiData.forEach((item, index) => {
                container.innerHTML += `
                    <div class="input-group">
                        <label>${item.manager} - ${item.kpi} (Target: ${formatNumber(item.target)})</label>
                        <input type="number" id="actual-${index}" value="${item.actual}">
                    </div>
                `;
            });
        }

        function saveSetup() {
            // Save all benchmark and target values
            appData.kpiData.forEach((item, index) => {
                const benchmarkInput = document.getElementById(`benchmark-${index}`);
                const targetInput = document.getElementById(`target-${index}`);
                
                item.benchmark = parseFloat(benchmarkInput.value) || 0;
                item.target = parseFloat(targetInput.value) || 0;
            });
            
            closeSetupModal();
            initializeTrackerDashboard(); // Refresh the display
            alert('Targets and benchmarks saved successfully!');
        }

        function saveActuals() {
            // Save all actual values
            appData.kpiData.forEach((item, index) => {
                const input = document.getElementById(`actual-${index}`);
                item.actual = parseFloat(input.value) || 0;
            });
            
            closeUpdateModal();
            initializeTrackerDashboard(); // Refresh the display
            alert('Actual values updated successfully!');
        }

        // Your existing tracker functions
        function initializeTrackerDashboard() {
            updateKpiTable();
            updateProgressVisualization();
            updatePerformanceInsights();
            updateQuickStats();
            updateOverallPerformance();
        }

        function updateKpiTable() {
            const tbody = document.getElementById('kpiTableBody');
            tbody.innerHTML = '';

            appData.kpiData.forEach(item => {
                // Calculate achievement percentage
                item.achievement = item.target === 0 ? 0 : (item.actual / item.target) * 100;
                item.score = item.achievement;

                const row = document.createElement('tr');
                row.setAttribute('data-manager', item.manager);
                
                // Determine progress bar class
                let progressClass = 'progress-low';
                if (item.achievement >= 70) progressClass = 'progress-medium';
                if (item.achievement >= 90) progressClass = 'progress-high';

                row.innerHTML = `
                    <td class="kpi-highlight">${item.manager}</td>
                    <td>${item.kpi}</td>
                    <td>${formatNumber(item.benchmark)}</td>
                    <td>${formatNumber(item.target)}</td>
                    <td>${formatNumber(item.actual)}</td>
                    <td class="achievement-cell">
                        <div class="progress-cell">
                            <span>${item.achievement.toFixed(1)}%</span>
                            <div class="progress-bar">
                                <div class="progress-fill ${progressClass}" style="width: ${Math.min(item.achievement, 100)}%"></div>
                            </div>
                        </div>
                    </td>
                    <td>${item.score.toFixed(1)}</td>
                `;
                
                tbody.appendChild(row);
            });
        }

        function updateProgressVisualization() {
            const container = document.getElementById('progressVisualization');
            container.innerHTML = '';
            
            const topKpis = [...appData.kpiData]
                .filter(item => item.target > 0)
                .sort((a, b) => b.achievement - a.achievement)
                .slice(0, 5);
            
            topKpis.forEach(item => {
                const progressDiv = document.createElement('div');
                progressDiv.className = 'performance-metric';
                
                const benchmarkStatus = item.actual >= item.benchmark ? 
                    '<span class="benchmark-indicator benchmark-achieved"></span>' : 
                    '<span class="benchmark-indicator benchmark-missed"></span>';
                
                progressDiv.innerHTML = `
                    <div>
                        <strong>${item.kpi}</strong>
                        <div class="current-progress">
                            ${benchmarkStatus} 
                            Current: ${formatNumber(item.actual)} | 
                            Target: ${formatNumber(item.target)}
                        </div>
                    </div>
                    <div class="metric-value">${item.achievement.toFixed(1)}%</div>
                `;
                
                container.appendChild(progressDiv);
            });
        }

        function updatePerformanceInsights() {
            const insights = document.getElementById('performanceInsights');
            
            const aboveTarget = appData.kpiData.filter(item => item.actual >= item.target).length;
            const aboveBenchmark = appData.kpiData.filter(item => item.benchmark > 0 && item.actual >= item.benchmark).length;
            const totalBenchmarks = appData.kpiData.filter(item => item.benchmark > 0).length;
            
            let html = `
                <div class="performance-metric">
                    <span>Targets Achieved</span>
                    <span class="metric-value">${aboveTarget}/${appData.kpiData.length}</span>
                </div>
                <div class="performance-metric">
                    <span>Benchmarks Met</span>
                    <span class="metric-value">${aboveBenchmark}/${totalBenchmarks}</span>
                </div>
                <div class="performance-metric">
                    <span>Best Performing KPI</span>
                    <span class="metric-value">${getTopPerformingKPI()}</span>
                </div>
            `;
            
            insights.innerHTML = html;
        }

        function updateQuickStats() {
            const stats = document.getElementById('quickStats');
            
            const totalTarget = appData.kpiData.reduce((sum, item) => sum + item.target, 0);
            const totalActual = appData.kpiData.reduce((sum, item) => sum + item.actual, 0);
            
            let html = `
                <div class="performance-metric">
                    <span>Total Target Value</span>
                    <span class="metric-value">${formatNumber(totalTarget)}</span>
                </div>
                <div class="performance-metric">
                    <span>Current Achievement</span>
                    <span class="metric-value">${formatNumber(totalActual)}</span>
                </div>
                <div class="performance-metric">
                    <span>Remaining Gap</span>
                    <span class="metric-value">${formatNumber(totalTarget - totalActual)}</span>
                </div>
            `;
            
            stats.innerHTML = html;
        }

        function updateOverallPerformance() {
            const totalAchievement = appData.kpiData.reduce((sum, item) => sum + item.achievement, 0);
            const avgAchievement = totalAchievement / appData.kpiData.length;
            document.getElementById('overallPerformance').textContent = `${avgAchievement.toFixed(1)}%`;
        }

        function getTopPerformingKPI() {
            const topKpi = appData.kpiData.reduce((top, item) => 
                item.achievement > top.achievement ? item : top, appData.kpiData[0]);
            return topKpi.achievement > 0 ? `${topKpi.kpi.split(' ').slice(0,2).join(' ')} (${topKpi.achievement.toFixed(1)}%)` : 'None';
        }

        // Summary dashboard functions
        function initializeSummaryDashboard() {
            updateOverallStats();
            renderTrendChart();
            renderTeamComparison();
            renderKPIDistribution();
            renderTopKPIs();
        }

        function updateOverallStats() {
            const data = appData.performanceData;
            
            document.getElementById('overallAchievement').textContent = `${data.overallAchievement.toFixed(1)}%`;
            document.getElementById('overallProgress').style.width = `${data.overallAchievement}%`;
            
            document.getElementById('targetsAchieved').textContent = 
                `${data.targetsAchieved}/${data.totalTargets}`;
            const targetsPercent = (data.targetsAchieved / data.totalTargets) * 100;
            document.getElementById('targetsProgress').style.width = `${targetsPercent}%`;
            
            document.getElementById('benchmarksMet').textContent = 
                `${data.benchmarksMet}/${data.totalBenchmarks}`;
            const benchmarksPercent = (data.benchmarksMet / data.totalBenchmarks) * 100;
            document.getElementById('benchmarksProgress').style.width = `${benchmarksPercent}%`;

            // Update progress bar colors
            updateProgressColor('overallProgress', data.overallAchievement);
            updateProgressColor('targetsProgress', targetsPercent);
            updateProgressColor('benchmarksProgress', benchmarksPercent);

            // Find top performer
            const topPerformer = Object.entries(data.teamPerformance)
                .reduce((a, b) => a[1] > b[1] ? a : b);
            document.getElementById('topPerformer').textContent = topPerformer[0].split(' ')[0];
            document.getElementById('topPerformerValue').textContent = `${topPerformer[1].toFixed(1)}%`;
        }

        function updateProgressColor(elementId, value) {
            const element = document.getElementById(elementId);
            element.classList.remove('progress-low', 'progress-medium', 'progress-high');
            
            if (value >= 80) {
                element.classList.add('progress-high');
            } else if (value >= 60) {
                element.classList.add('progress-medium');
            } else {
                element.classList.add('progress-low');
            }
        }

        function renderTrendChart() {
            const svg = document.getElementById('trendChart');
            const width = svg.clientWidth;
            const height = svg.clientHeight;
            const padding = 40;
            
            svg.innerHTML = '';
            
            // Create grid lines
            for (let i = 0; i <= 4; i++) {
                const y = padding + (i * (height - 2 * padding) / 4);
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('class', 'grid-line');
                line.setAttribute('x1', padding);
                line.setAttribute('y1', y);
                line.setAttribute('x2', width - padding);
                line.setAttribute('y2', y);
                svg.appendChild(line);
                
                // Y-axis labels
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('class', 'achievement-label');
                text.setAttribute('x', padding - 10);
                text.setAttribute('y', y + 4);
                text.setAttribute('text-anchor', 'end');
                text.textContent = `${100 - i * 25}%`;
                svg.appendChild(text);
            }
            
            // Create trend line
            const points = appData.performanceData.monthlyTrend.map((point, index) => {
                const x = padding + (index * (width - 2 * padding) / (appData.performanceData.monthlyTrend.length - 1));
                const y = height - padding - (point.achievement / 100 * (height - 2 * padding));
                return `${x},${y}`;
            }).join(' ');
            
            const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            polyline.setAttribute('class', 'trend-line');
            polyline.setAttribute('points', points);
            svg.appendChild(polyline);
            
            // Create data points and month labels
            appData.performanceData.monthlyTrend.forEach((point, index) => {
                const x = padding + (index * (width - 2 * padding) / (appData.performanceData.monthlyTrend.length - 1));
                const y = height - padding - (point.achievement / 100 * (height - 2 * padding));
                
                // Data point
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('class', 'trend-point');
                circle.setAttribute('cx', x);
                circle.setAttribute('cy', y);
                circle.setAttribute('r', 4);
                svg.appendChild(circle);
                
                // Month label
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('class', 'month-label');
                text.setAttribute('x', x);
                text.setAttribute('y', height - padding + 20);
                text.setAttribute('text-anchor', 'middle');
                text.textContent = point.month;
                svg.appendChild(text);
                
                // Achievement value
                const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                valueText.setAttribute('class', 'achievement-label');
                valueText.setAttribute('x', x);
                valueText.setAttribute('y', y - 10);
                valueText.setAttribute('text-anchor', 'middle');
                valueText.textContent = `${point.achievement.toFixed(1)}%`;
                svg.appendChild(valueText);
            });
        }

        function renderTeamComparison() {
            const container = document.getElementById('teamComparison');
            container.innerHTML = '';
            
            Object.entries(appData.performanceData.teamPerformance).forEach(([team, achievement]) => {
                const barHeight = (achievement / 100) * 150;
                const bar = document.createElement('div');
                bar.className = `team-bar ${team.includes('Offline') ? 'field' : ''}`;
                bar.style.height = `${barHeight}px`;
                bar.innerHTML = `
                    <div>${achievement.toFixed(1)}%</div>
                    <div style="margin-top: 5px; font-size: 0.8em;">${team.split(' ')[0]}</div>
                `;
                container.appendChild(bar);
            });
        }

        function renderKPIDistribution() {
            const svg = document.getElementById('kpiDistribution');
            const width = svg.clientWidth;
            const height = svg.clientHeight;
            const padding = 40;
            const barWidth = (width - 2 * padding) / appData.performanceData.kpiAchievements.length;
            
            svg.innerHTML = '';
            
            appData.performanceData.kpiAchievements.forEach((kpi, index) => {
                const barHeight = (kpi.achievement / 100) * (height - 2 * padding);
                const x = padding + (index * barWidth);
                const y = height - padding - barHeight;
                
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', x + 5);
                rect.setAttribute('y', y);
                rect.setAttribute('width', barWidth - 10);
                rect.setAttribute('height', barHeight);
                rect.setAttribute('fill', kpi.achievement >= 80 ? '#2ecc71' : 
                                           kpi.achievement >= 60 ? '#f39c12' : '#e74c3c');
                svg.appendChild(rect);
                
                // KPI label (rotated)
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('class', 'month-label');
                text.setAttribute('x', x + barWidth / 2);
                text.setAttribute('y', height - padding + 15);
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('transform', `rotate(45, ${x + barWidth / 2}, ${height - padding + 15})`);
                text.textContent = kpi.kpi.split(' ')[0];
                svg.appendChild(text);
            });
        }

        function renderTopKPIs() {
            const container = document.getElementById('topKpis');
            container.innerHTML = '';
            
            const topKPIs = appData.performanceData.kpiAchievements.slice(0, 6);
            
            topKPIs.forEach(kpi => {
                const div = document.createElement('div');
                div.className = 'kpi-item';
                div.innerHTML = `
                    <div style="display: flex; justify-content: between; align-items: center;">
                        <span>${kpi.kpi}</span>
                        <span style="font-weight: bold; color: ${kpi.achievement >= 80 ? '#2ecc71' : 
                                                               kpi.achievement >= 60 ? '#f39c12' : '#e74c3c'}">
                            ${kpi.achievement.toFixed(1)}%
                        </span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${kpi.achievement}%"></div>
                    </div>
                `;
                
                // Set progress bar color
                const progressFill = div.querySelector('.progress-fill');
                if (kpi.achievement >= 80) {
                    progressFill.classList.add('progress-high');
                } else if (kpi.achievement >= 60) {
                    progressFill.classList.add('progress-medium');
                } else {
                    progressFill.classList.add('progress-low');
                }
                
                container.appendChild(div);
            });
        }

        // Utility functions
        function formatNumber(num) {
            if (num >= 1000000) {
                return (num / 1000000).toFixed(1) + 'M';
            } else if (num >= 1000) {
                return (num / 1000).toFixed(1) + 'K';
            }
            return num.toLocaleString();
        }

        function showManager(manager) {
            document.querySelectorAll('.manager-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            const rows = document.querySelectorAll('#kpiTableBody tr');
            rows.forEach(row => {
                if (manager === 'all' || row.getAttribute('data-manager') === manager) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        // Initialize the application
        function initializeApp() {
            initializeTrackerDashboard();
            updateSummaryData(); // Pre-populate summary data
        }

        // Call this when the page loads
        window.onload = initializeApp;

        // Handle window resize for charts
        window.addEventListener('resize', function() {
            if (document.getElementById('summary-view').classList.contains('active')) {
                renderTrendChart();
                renderKPIDistribution();
            }
        });