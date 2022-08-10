function changeToPreviousMonth() {
    const calendar = document.querySelector('.custom-calendar');
    const date = new Date(document.forms['date-form'].elements['date'].value);
    date.setDate(0);
    calendar.innerHTML = '';
    calendar.appendChild(createCalendarHeader(date));
    calendar.appendChild(createCalendarBody(date));
    const dateForm = document.forms['date-form'];
    const dateInput = dateForm.elements['date'];
    dateInput.value = date.toISOString().substring(0, 10);
}


function changeToNextMonth() {
    const calendar = document.querySelector('.custom-calendar');
    const date = new Date(document.forms['date-form'].elements['date'].value);
    date.setDate(32);
    calendar.innerHTML = '';
    calendar.appendChild(createCalendarHeader(date));
    calendar.appendChild(createCalendarBody(date));
    const dateForm = document.forms['date-form'];
    const dateInput = dateForm.elements['date'];
    dateInput.value = date.toISOString().substring(0, 10);
}


function createCalendarHeader(date) {
    const sDate = date.toLocaleString('en-US', {month: 'long', year: 'numeric'});
    const [sMonth, sYear] = sDate.split(' ');

    const downArrow = document.createElement('span');
    downArrow.innerHTML = '↓';
    downArrow.className = 'calendar-arrow';
    downArrow.onclick = changeToNextMonth;
    const upArrow = document.createElement('span');
    upArrow.innerHTML = '↑';
    upArrow.className = 'calendar-arrow';
    upArrow.onclick = changeToPreviousMonth;
    const arrows = document.createElement('div');
    arrows.className = 'calendar-header-arrows';
    arrows.appendChild(downArrow);
    arrows.appendChild(upArrow);

    const dateInfo = document.createElement('div');
    dateInfo.className = 'calendar-header-date-info';
    dateInfo.innerHTML = `${sMonth} ${sYear}`;

    const calendarHeader = document.createElement('div');
    calendarHeader.className = 'calendar-header';
    calendarHeader.appendChild(arrows);
    calendarHeader.appendChild(dateInfo);

    return calendarHeader;
}


function createCalendarBody(date) {
    // Date.getDay() returns day of week (0 is Sunday)
    // (day < 1) means day of previous month
    // (day > days in month) means day of next month
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
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


function createCalendar(date) {
    // Date(year, monthIndex, day)
    // (monthIndex == 0) means January
    const calendarHeader = createCalendarHeader(date);
    const calendarBody = createCalendarBody(date);
    const calendar = document.createElement('div');
    calendar.innerHTML = '';
    calendar.appendChild(calendarHeader);
    calendar.appendChild(calendarBody);
    return calendar;
}


document.addEventListener('DOMContentLoaded', function() {
    const date = new Date();
    const dateForm = document.forms['date-form'];
    const dateInput = dateForm.elements['date'];
    dateInput.style = 'display: none;';
    dateInput.value = date.toISOString().substring(0, 10);
    dateForm.onsubmit = function() {
        console.log(dateInput.value);
        return false;
    }
    const calendar = createCalendar(date);
    calendar.className = 'custom-calendar';
    dateInput.before(calendar);
});