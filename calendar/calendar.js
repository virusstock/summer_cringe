class CalendarPage {

    // Date(year, monthIndex, day)
    // (monthIndex == 0) means January
    // Date.getDay() returns day of week (0 is Sunday)
    // (day < 1) means day of previous month
    // (day > days in month) means day of next month
    // (month < 1) means month of previous year
    // (month > months in year) means month of next year

    constructor(date) { 
        this.date = date ? new Date(date) : new Date();
    }

    get nextMonthDate() {
        return new Date(this.date.getFullYear(), this.date.getMonth() + 1);
    }

    get prevMonthDate() {
        return new Date(this.date.getFullYear(), this.date.getMonth() - 1);
    }

    get firstDayDate() {
        return new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    }

    get lastDayDate() {
        return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
    }

    toNext() {
        this.date = this.nextMonthDate;
    }

    toPrev() {
        this.date = this.prevMonthDate;
    }

    get next() {
        return new CalendarPage(this.nextMonthDate);
    }

    get prev() {
        return new CalendarPage(this.prevMonthDate);
    }

    get monthName() {
        return this.date.toLocaleString('en-US', {month: 'long'});
    }

    get monthIndex() {
        return this.date.getMonth();
    }

    get year() {
        return this.date.getFullYear();
    }

    get firstDay() {
        return this.firstDayDate.getDay();
    }

    get lastDay() {
        return this.lastDayDate.getDay();
    }

    get days() {
        return this.lastDayDate.getDate();
    }

    get weeks() {
        return Math.ceil((this.prev.lastDay + this.days) / 7);
    }
}


function createCalendarControl(downArrowOnClick, upArrowOnClick) {

    const downArrow = document.createElement('span');
    downArrow.innerHTML = '↓';
    downArrow.className = 'calendar-arrow';
    downArrow.onclick = downArrowOnClick;

    const upArrow = document.createElement('span');
    upArrow.innerHTML = '↑';
    upArrow.className = 'calendar-arrow';
    upArrow.onclick = upArrowOnClick;

    const control = document.createElement('div');
    control.className = 'calendar-control';
    control.appendChild(downArrow);
    control.appendChild(upArrow);

    return control;
}


function createCalendarMonthInfo(calendarPage) {

    const monthInfo = document.createElement('div');
    monthInfo.className = 'calendar-month-info';
    monthInfo.innerHTML = `${calendarPage.monthName} ${calendarPage.year}`;

    return monthInfo;
}


function createCalendarBody(calendarPage) {

    const prevPage = calendarPage.prev;

    const days = calendarPage.days;
    const prevMonthDays = prevPage.days;
    const prevMonthDaysToShow = prevPage.lastDay;
    const prevMonthFirstDayToShow = prevMonthDays - prevMonthDaysToShow + 1;
    const nextMonthDaysToShow = (7 - calendarPage.lastDay) % 7;

    const body = document.createElement('div');
    body.className = 'calendar-body';

    function addItems(firstDay, lastDay, className) {
        for (let day = firstDay; day <= lastDay; day++) {
            const item = document.createElement('div');
            item.className = `calendar-item ${className}`;
            item.innerHTML = day;
            body.appendChild(item);
        }
    }

    addItems(prevMonthFirstDayToShow, prevMonthDays, 'not-selected-other-calendar-item');
    addItems(1, days, 'not-selected-calendar-item');
    addItems(1, nextMonthDaysToShow, 'not-selected-other-calendar-item');
    
    return body;
}


function updateCalendar(calendar, calendarPage) {
    
    const monthInfo = calendar.querySelector('.calendar-month-info');
    const body = calendar.querySelector('.calendar-body');

    const newMonthInfo = createCalendarMonthInfo(calendarPage);
    const newBody = createCalendarBody(calendarPage);

    monthInfo.replaceWith(newMonthInfo);
    body.replaceWith(newBody);
}


function createCalendar(date) {

    const calendar = document.createElement('div');
    calendar.className = 'custom-calendar';

    const calendarPage = new CalendarPage(date);
    
    const monthInfo = createCalendarMonthInfo(calendarPage);
    const body = createCalendarBody(calendarPage);
    const control = createCalendarControl(
        () => {
            calendarPage.toNext();
            updateCalendar(calendar, calendarPage);
        },
        () => {
            calendarPage.toPrev();
            updateCalendar(calendar, calendarPage);
        }
    );

    const header = document.createElement('div');
    header.className = 'calendar-header';
    header.appendChild(control);
    header.appendChild(monthInfo);

    calendar.appendChild(header);
    calendar.appendChild(body);
    
    return calendar;
}
