function createCalendarHeader(date) {
    const sDate = date.toLocaleString('en-US', {month: 'long', year: 'numeric'});
    const [sMonth, sYear] = sDate.split(' ');

    const calendarHeader = document.createElement('div');
    calendarHeader.className = 'calendar-header';
    calendarHeader.innerHTML = `${sMonth} ${sYear}`;

    return calendarHeader;
}


function createCalendarBody(date) {
    // Date.getDay() returns day of week (0 is Sunday)
    // (day < 1) means day of previous month
    // (day > days in month) means day of next month
    const firstDay = date.getDay();
    const numberOfDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevMonthNumberOfDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const prevMonthDaysToShow = (firstDay + 6) % 7;
    const prevMonthFirstDayToShow = prevMonthNumberOfDays - prevMonthDaysToShow + 1;
    const nextMonthDaysToShow = (7 - (numberOfDays + prevMonthDaysToShow) % 7) % 7;

    const calendarBody = document.createElement('div');
    calendarBody.className = 'calendar-body';

    function addCalendarItems(firstDay, lastDay, className) {
        for (let day = firstDay; day <= lastDay; day++) {
            const item = document.createElement('div');
            item.className = `calendar-item ${className}`;
            item.innerHTML = day;
            calendarBody.appendChild(item);
        }
    }

    addCalendarItems(prevMonthFirstDayToShow, prevMonthNumberOfDays, 'not-selected-other-calendar-item');
    addCalendarItems(1, numberOfDays, 'not-selected-calendar-item');
    addCalendarItems(1, nextMonthDaysToShow, 'not-selected-other-calendar-item');
    
    return calendarBody;
}


function createCalendar(month, year) {
    // Date(year, monthIndex, day)
    // (monthIndex == 0) means January
    const date = new Date(year, month - 1, 1);
    const calendarHeader = createCalendarHeader(date);
    const calendarBody = createCalendarBody(date);
    const calendar = document.querySelector('.custom-calendar');
    calendar.innerHTML = '';
    calendar.appendChild(calendarHeader);
    calendar.appendChild(calendarBody);
}


document.addEventListener('DOMContentLoaded', () => createCalendar(4, 2022));