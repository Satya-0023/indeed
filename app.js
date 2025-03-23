let learningPath = [
    { id: 1, title: 'Introduction to Web Development', type: 'pdf', progress: 75, timeSpent: 120 },
    { id: 2, title: 'HTML Basics', type: 'video', progress: 100, timeSpent: 60 },
    { id: 3, title: 'CSS Fundamentals', type: 'pdf', progress: 50, timeSpent: 90 },
    { id: 4, title: 'JavaScript Essentials', type: 'word', progress: 25, timeSpent: 180 }
];

function updateDashboard() {
    // Update Reading Statistics
    const totalTime = learningPath.reduce((sum, resource) => sum + resource.timeSpent, 0);
    document.getElementById('totalReadingTime').textContent = totalTime;
    
    const overallProgress = Math.round(learningPath.reduce((sum, resource) => sum + resource.progress, 0) / learningPath.length);
    document.getElementById('overallProgress').textContent = overallProgress;
    document.getElementById('overallProgressBar').style.width = `${overallProgress}%`;

    // Update Progress Tracking
    const progressTracking = document.getElementById('progressTracking');
    progressTracking.innerHTML = '';
    learningPath.forEach(resource => {
        const resourceElement = document.createElement('div');
        resourceElement.innerHTML = `
            <p>${resource.title}: ${resource.progress}%</p>
            <div class="progress-bar">
                <div class="progress" style="width: ${resource.progress}%"></div>
            </div>
        `;
        progressTracking.appendChild(resourceElement);
    });

    // Update Learning Path
    const learningPathElement = document.getElementById('learningPath');
    learningPathElement.innerHTML = '';
    learningPath.forEach(resource => {
        const resourceElement = document.createElement('div');
        resourceElement.className = 'resource';
        resourceElement.draggable = true;
        resourceElement.innerHTML = `
            <h3>${resource.title}</h3>
            <p>Type: ${resource.type}</p>
            <p>Progress: ${resource.progress}%</p>
        `;
        resourceElement.addEventListener('dragstart', drag);
        learningPathElement.appendChild(resourceElement);
    });
}

function generateReport() {
    const reportType = document.getElementById('reportType').value;
    const reportResults = document.getElementById('reportResults');
    reportResults.innerHTML = '<h3>Report</h3>';
    learningPath.forEach(resource => {
        const value = reportType === 'timeSpent' ? `${resource.timeSpent} minutes` : `${resource.progress}%`;
        reportResults.innerHTML += `<p>${resource.title}: ${value}</p>`;
    });
}

function addResource() {
    const title = document.getElementById('resourceTitle').value;
    const type = document.getElementById('resourceType').value;
    if (title) {
        const newResource = {
            id: learningPath.length + 1,
            title: title,
            type: type,
            progress: 0,
            timeSpent: 0
        };
        learningPath.push(newResource);
        updateDashboard();
        document.getElementById('resourceTitle').value = '';
        addNotification(`New resource added: ${title}`);
    }
}

function addNotification(message) {
    const notifications = document.getElementById('notifications');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notifications.appendChild(notification);
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.innerHTML);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.innerHTML = data;
}

// Initialize dashboard
updateDashboard();
addNotification("Welcome to your Learning Dashboard!");