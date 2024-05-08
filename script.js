const apiUrl = 'https://worldtimeapi.org/api/timezone/Asia/Jakarta';
let currentSystem = 'default';

function fetchTime() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            updateDisplay(data);
        })
        .catch(error => {
            console.error('Error fetching time:', error);
            document.getElementById('timezone-display').textContent = 'Error loading timezone';
            document.getElementById('date-display').textContent = 'Error loading date';
            document.getElementById('time-display').textContent = 'Error loading time';
        });
}

function updateDisplay(data) {
    const datetime = new Date(data.datetime);
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const timeZoneStr = `${data.timezone} GMT${data.utc_offset}`;
    document.getElementById('timezone-display').textContent = timeZoneStr;

    const dateStr = currentSystem === 'default' ? 
        `${datetime.getFullYear()} ${monthNames[datetime.getMonth()]} ${datetime.getDate().toString().padStart(2, '0')}` :
        `${monthNames[datetime.getMonth()]} ${datetime.getDate().toString().padStart(2, '0')} ${datetime.getFullYear()}`;
    const timeStr = currentSystem === 'default' ? 
        `${datetime.getHours().toString().padStart(2, '0')}:${datetime.getMinutes().toString().padStart(2, '0')}:${datetime.getSeconds().toString().padStart(2, '0')}` :
        `${datetime.getMinutes().toString().padStart(2, '0')}:${datetime.getSeconds().toString().padStart(2, '0')}:${datetime.getHours().toString().padStart(2, '0')}`;

    document.getElementById('date-display').textContent = dateStr;
    document.getElementById('time-display').textContent = timeStr;

    document.title = `SAO Clock - ${timeStr}`;
}

window.onfocus = function() {
    document.title = "SAO Clock";
};

window.onblur = function() {
    fetchTime();
};


function switchSystem(system) {
    currentSystem = system;
    fetchTime();
}

setInterval(fetchTime, 1000);

fetchTime();
