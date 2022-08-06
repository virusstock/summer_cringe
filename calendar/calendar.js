
function createCalendar(month, year) {
    // Date(year, monthIndex, day)
    // monthIndex starts from 0 for January
    // (day < 1) means day of previous month
    // (day > days in month) means day of next month
    const date = new Date(year, month - 1, 1);
    const firstDay = date.getDay();
    const numberOfDays = new Date(year, month, 0).getDate();
    const prevMonthDays = (firstDay + 6) % 7;
    const prevMonthNumberOfDays = new Date(year, month - 1, 0).getDate();






    const calendarHeader = document.createElement('div');
    calendarHeader.className = 'calendar-header';
    calendarHeader.innerHTML = date.toDateString();

    const calendarBody = document.createElement('div');
    calendarBody.className = 'calendar-body';

    let daysCount = 0;
    for (let i = prevMonthNumberOfDays - prevMonthDays + 1; i <= prevMonthNumberOfDays; i++) {
        const item = document.createElement('div');
        item.className = 'calendar-item not-selected-other-calendar-item';
        item.innerHTML = i;
        calendarBody.appendChild(item);
        daysCount++;
    }
    for (let i = 1; i <= numberOfDays; i++) {
        const item = document.createElement('div');
        item.className = 'calendar-item not-selected-calendar-item';
        item.innerHTML = i;
        calendarBody.appendChild(item);
        daysCount++;
    }
    for (let i = 1; i <= (7 - (daysCount % 7)) % 7; i++) {
        const item = document.createElement('div');
        item.className = 'calendar-item not-selected-other-calendar-item';
        item.innerHTML = i;
        calendarBody.appendChild(item);
    }

    const calendar = document.querySelector('.custom-calendar');
    calendar.innerHTML = '';
    calendar.appendChild(calendarHeader);
    calendar.appendChild(calendarBody);
}


document.addEventListener('DOMContentLoaded', () => createCalendar(4, 2022));