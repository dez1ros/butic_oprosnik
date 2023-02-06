var months = {
    0: 'Январь',
    1: 'Февраль',
    2: 'Март',
    3: 'Апрель',
    4: 'Май',
    5: 'Июнь',
    6: 'Июль',
    7: 'Август',
    8: 'Сентябрь',
    9: 'Октябрь',
    10: 'Ноябрь',
    11: 'Декабрь'
};


function update_clock() {
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var month = date.getMonth();
    var day = date.getDate();
    if (hour < 10){
        hour = '0' + hour;
    }
    if (minutes < 10){
        minutes = '0' + minutes;
    }
    var clock = document.getElementById("clock");
    clock.textContent = hour + ':' + minutes;
    var date_day = document.getElementById("date_day");
    var date_month = document.getElementById("date_month");
    date_day.textContent = day;
    date_month.textContent = months[month];
};

update_clock();

setInterval(update_clock, 1000);
