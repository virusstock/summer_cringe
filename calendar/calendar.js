
document.addEventListener('DOMContentLoaded', function() {

    const calendar = document.querySelector('.custom-calendar');

    for (let i = 1; i <= 30; i++) {
        const item = document.createElement('div');
        item.className = 'calendar-item not-selected-calendar-item';
        item.innerHTML = i;
        calendar.appendChild(item);
    }
});