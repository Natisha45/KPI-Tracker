 <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
 
        // Global data storage
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
            ]
        };

        // Modal Functions
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

        // Tracker functions
        function initializeTrackerDashboard() {
            updateKpiTable();
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
                
                // Determine achievement badge class
                let achievementClass = 'achievement-low';
                if (item.achievement >= 70) achievementClass = 'achievement-medium';
                if (item.achievement >= 90) achievementClass = 'achievement-high';

                row.innerHTML = `
                    <td class="kpi-highlight">${item.manager}</td>
                    <td>${item.kpi}</td>
                    <td>${formatNumber(item.target)}</td>
                    <td>${formatNumber(item.actual)}</td>
                    <td class="achievement-cell">
                        <span class="achievement-badge ${achievementClass}">${item.achievement.toFixed(1)}%</span>
                    </td>
                    <td>
                        <div class="completion-bar">
                            <div class="completion-fill" style="width: ${Math.min(item.achievement, 100)}%"></div>
                        </div>
                    </td>
                `;
                
                tbody.appendChild(row);
            });
        }

        // Graph functions
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
            
            // Show/hide graph based on selection
            const graphContainer = document.getElementById('graphContainer');
            const dashboardContent = document.getElementById('dashboardContent');
            
            if (manager === 'all') {
                graphContainer.classList.remove('active');
                dashboardContent.classList.remove('with-graph');
            } else {
                graphContainer.classList.add('active');
                dashboardContent.classList.add('with-graph');
                renderManagerGraph(manager);
            }
        }

        function renderManagerGraph(manager) {
            const graphCanvas = document.getElementById('graphCanvas');
            const graphTitle = document.getElementById('graphTitle');
            const graphLegend = document.getElementById('graphLegend');
            
            // Filter data for selected manager
            const managerData = appData.kpiData.filter(item => item.manager === manager);
            
            // Update graph title
            if (manager === 'Customer Growth Manager') {
                graphTitle.textContent = 'Customer Performance Overview';
            } else {
                graphTitle.textContent = `${manager.split(' ')[0]} Performance Overview`;
            }
            
            // Create progress bar graph
            graphCanvas.innerHTML = '';
            
            const progressGraph = document.createElement('div');
            progressGraph.className = 'progress-graph';
            
            managerData.forEach(item => {
                if (item.target === 0) return; // Skip items with no target
                
                const progressItem = document.createElement('div');
                progressItem.className = 'progress-item';
                
                // Calculate achievement percentage
                const achievement = (item.actual / item.target) * 100;
                
                // Determine color based on achievement
                let barColor;
                if (achievement >= 80) {
                    barColor = '#2ecc71'; // Green for high achievement
                } else if (achievement >= 60) {
                    barColor = '#f39c12'; // Orange for medium achievement
                } else {
                    barColor = '#e74c3c'; // Red for low achievement
                }
                
                progressItem.innerHTML = `
                    <div class="progress-header">
                        <div class="progress-label">${item.kpi}</div>
                        <div class="progress-percentage">${achievement.toFixed(1)}%</div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" style="width: ${Math.min(achievement, 100)}%; background-color: ${barColor};"></div>
                    </div>
                    <div class="progress-value">${formatNumber(item.actual)} / ${formatNumber(item.target)}</div>
                `;
                
                progressGraph.appendChild(progressItem);
            });
            
            graphCanvas.appendChild(progressGraph);
            
            // Update legend
            graphLegend.innerHTML = `
                <div class="legend-item">
                    <div class="legend-color" style="background-color: #2ecc71;"></div>
                    <span>High Achievement (≥80%)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background-color: #f39c12;"></div>
                    <span>Medium Achievement (60-79%)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background-color: #e74c3c;"></div>
                    <span>Low Achievement (<60%)</span>
                </div>
            `;
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

        // Initialize the application
        function initializeApp() {
            initializeTrackerDashboard();
        }

        // Call this when the page loads
        window.onload = initializeApp;
    
