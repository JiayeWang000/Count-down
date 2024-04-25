dayjs.extend(window.dayjs_plugin_arraySupport);
dayjs.extend(window.dayjs_plugin_customParseFormat);
dayjs.extend(window.dayjs_plugin_duration);
const days = document.querySelector('#countdown #days .number');
const hours = document.querySelector('#countdown #hours .number');
const minutes = document.querySelector('#countdown #minutes .number');
const seconds = document.querySelector('#countdown #seconds .number');

var intervalFlag = false;
var interval;
const time = dayjs();

const warning = document.querySelector('#input-warning');

const recevieDate = () => {
    var userInput = document.querySelector('#input-date').value;
    document.querySelector('#input-date').value = "";
    if (!dayjs(userInput, 'YYYY-MM-DD HH:mm:ss', true).isValid() || dayjs(userInput).diff(time) < 0) {
        warning.innerText = "Please submit valid format or date!";
        warning.style = "color:red";
        return;
    }
    warning.innerText = "";
    resetIntervel(intervalFlag);
    updateTime(userInput);

}

const recevieOption = () => {
    var year = document.querySelector('#year').value;
    var month = document.querySelector('#month').value;
    var day = document.querySelector('#day').value;
    var hour = document.querySelector('#hour').value;
    var minute = document.querySelector('#minute').value;

    var date = `${year}-${month}-${day} ${hour}:${minute}:00`;
    if (dayjs(date).diff(time) < 0) {
        warning.innerText = "Please submit valid format or date!";
        warning.style = "color:red";
        return;
    }
    warning.innerText = "";
    resetIntervel(intervalFlag);
    updateTime(date);

}

const displayCountdown = (date) => {
    var now = dayjs();
    var future = dayjs(date);
    var diff = future.diff(now);
    var duration = dayjs.duration(diff);

    var day = Math.floor(duration.asDays());
    var remaining = duration.asDays() - day;
    var rest = dayjs.duration(remaining, 'days');
    var hour = rest.hours();
    var minute = rest.minutes();
    var second = rest.seconds();

    days.innerHTML = `${day < 10 ? '0' : ''}${day}`;
    hours.innerHTML = `${hour < 10 ? '0' : ''}${hour}`;
    minutes.innerHTML = `${minute < 10 ? '0' : ''}${minute}`;
    seconds.innerHTML = `${second < 10 ? '0' : ''}${second}`;
}


const updateTime = (future) => {


    intervalFlag = true;
    interval = setInterval(() => {
        displayCountdown(future);
    }, 1000);


}

const resetIntervel = (flag) => {
    if (flag) {
        clearInterval(interval);
        flag = false;
    }
}

const loadOption = () => {
    var now = dayjs();
    var yearNow = now.year();

    for (let i = 0; i < 10; i++) {
        let newYear = document.createElement('option');
        newYear.value = yearNow + i;
        newYear.innerHTML = yearNow + i;
        let yearSlect = document.querySelector('#year');
        yearSlect.appendChild(newYear);
    }
    for (let i = 0; i < 12; i++) {
        let newMonth = document.createElement('option');
        newMonth.value = i + 1;
        newMonth.innerHTML = `${i + 1 < 10 ? '0' : ''}${i + 1}`
        let monthSlect = document.querySelector('#month');
        monthSlect.appendChild(newMonth);
    }
    for (let i = 0; i < 31; i++) {
        let newDay = document.createElement('option');
        newDay.value = i + 1;
        newDay.innerHTML = `${i + 1 < 10 ? '0' : ''}${i + 1}`
        let daySlect = document.querySelector('#day');
        daySlect.appendChild(newDay);
    }
    for (let i = 0; i < 23; i++) {
        let newHour = document.createElement('option');
        newHour.value = i;
        newHour.innerHTML = `${i < 10 ? '0' : ''}${i}`
        let hourSlect = document.querySelector('#hour');
        hourSlect.appendChild(newHour);
    }
    for (let i = 0; i < 59; i++) {
        let newMinute = document.createElement('option');
        newMinute.value = i;
        newMinute.innerHTML = `${i < 10 ? '0' : ''}${i}`
        let minuteSlect = document.querySelector('#minute');
        minuteSlect.appendChild(newMinute);
    }
}



const inputBtn = document.querySelector("#input-submit");

inputBtn.addEventListener('click', recevieDate);

const optionBtn = document.querySelector("#option-submit");
optionBtn.addEventListener('click', recevieOption);

loadOption();

