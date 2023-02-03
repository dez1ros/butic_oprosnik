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

var api_key = '9349823a9ec7d3b2af496b4fa21cf505';
var city = 'Moscow'
var troitsk_id = '481608';
var url = 'http://api.openweathermap.org/data/2.5/forecast?id=481608&lang=ru&units=metric&cnt=4&appid=9349823a9ec7d3b2af496b4fa21cf505&';


function update_clock() {
    var t_1 = document.getElementById("time_1");
    var t_2 = document.getElementById("time_2");
    var t_3 = document.getElementById("time_3");
    var weather_img_1 = document.getElementById("weather_img_1");
    var weather_img_2 = document.getElementById("weather_img_2");
    var weather_img_3 = document.getElementById("weather_img_3");
    var grad_1 = document.getElementById("grad_1");
    var grad_2 = document.getElementById("grad_2");
    var grad_3 = document.getElementById("grad_3");
    var des = document.getElementById("des");

    fetch(url).then(function (resp) {return resp.json() }).then(function (all_data){

        var time_1 = all_data.list[0].dt_txt.split(' ')[1].split(':')[0];
        var time_2 = all_data.list[1].dt_txt.split(' ')[1].split(':')[0];
        var time_3 = all_data.list[2].dt_txt.split(' ')[1].split(':')[0];
        var data = all_data.list;
        console.log(data[0].weather[0]["description"]);
        t_1.textContent = time_1 + ':00';
        t_2.textContent = time_2 + ':00';
        t_3.textContent = time_3 + ':00';

        des.textContent = data[0].weather[0]["description"];

        weather_img_1.src = "https://openweathermap.org/img/wn/" + data[0].weather[0]['icon'] + "@2x.png";
        weather_img_2.src = "https://openweathermap.org/img/wn/" + data[1].weather[0]['icon'] + "@2x.png";
        weather_img_3.src = "https://openweathermap.org/img/wn/" + data[2].weather[0]['icon'] + "@2x.png";

        if (Math.round(data[0].main.temp) > 0){
            grad_1.textContent = '+' + Math.round(data[0].main.temp) + '°C';

        } else{
            grad_1.textContent = Math.round(data[0].main.temp) + '°C';

        }
        if (Math.round(data[1].main.temp) > 0){
            grad_2.textContent = '+' + Math.round(data[1].main.temp) + '°C';
        } else{
            grad_2.textContent = Math.round(data[1].main.temp) + '°C';

        }
        if (Math.round(data[2].main.temp) > 0){
            grad_3.textContent = '+' + Math.round(data[2].main.temp) + '°C';
        } else{
            grad_3.textContent = Math.round(data[2].main.temp) + '°C';
        }

      });
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
}

update_clock()

setInterval(update_clock, 1000);
