var times = {
    '00': 'Ночью',
    '03': 'Ночью',
    '06': 'Утром',
    '09': 'Утром',
    '12': 'Днём',
    '15': 'Днём',
    '18': 'Вечером',
    '21': 'Вечером',
};

var api_key = '9349823a9ec7d3b2af496b4fa21cf505';
var city = 'Moscow'
var troitsk_id = '481608';
var url = 'http://api.openweathermap.org/data/2.5/forecast?id=481608&lang=ru&units=metric&cnt=10&appid=9349823a9ec7d3b2af496b4fa21cf505&';
function update_weather() {
        var t_1 = document.getElementById("time_1");
        var t_2 = document.getElementById("time_2");
        var t_3 = document.getElementById("time_3");
        var t_4 = document.getElementById("time_4");
        var weather_img_1 = document.getElementById("weather_img_1");
    var weather_img_2 = document.getElementById("weather_img_2");
    var weather_img_3 = document.getElementById("weather_img_3");
    var weather_img_4 = document.getElementById("weather_img_4");
    var grad_1 = document.getElementById("grad_1");
    var grad_2 = document.getElementById("grad_2");
    var grad_3 = document.getElementById("grad_3");
    var grad_4 = document.getElementById("grad_4");
    var grad = document.getElementById("grad");
    var des = document.getElementById("des");
    var vlaj = document.getElementById("vlaj");
    var dav = document.getElementById("dav");

    fetch(url).then(function (resp) {return resp.json() }).then(function (all_data){
        var data = all_data.list;
        var time1 = data[2];
        var time2 = data[4];
        var time3 = data[6];
        var time4 = data[8];
        var time = data[0];
        var time_1 = time1.dt_txt.split(' ')[1].split(':')[0];
        var time_2 = time2.dt_txt.split(' ')[1].split(':')[0];
        var time_3 = time3.dt_txt.split(' ')[1].split(':')[0];
        var time_4 = time4.dt_txt.split(' ')[1].split(':')[0];
        console.log(data);

        vlaj.textContent = time.main['humidity'] + '%';
        dav.textContent =  Math.round(time.main['pressure'] * 0.75006) + " мм рт. ст.";
        des.textContent = capitalizeFirstLetter(time.weather[0]["description"]);

        t_1.textContent = times[time_1];
        t_2.textContent = times[time_2];
        t_3.textContent = times[time_3];
        t_4.textContent = times[time_4];


        console.log(time1.weather[0]['icon'] + ".png");
        weather_img_1.src = "static/img/" + time1.weather[0]['icon'] + ".png";
        weather_img_2.src = "static/img/" + time2.weather[0]['icon'] + ".png";
        weather_img_3.src = "static/img/" + time3.weather[0]['icon'] + ".png";
        weather_img_4.src = "static/img/" + time4.weather[0]['icon'] + ".png";

        grad_1.textContent = Math.round(time1.main.temp) + '°';
        grad_2.textContent = Math.round(time2.main.temp) + '°';
        grad_3.textContent = Math.round(time3.main.temp) + '°';
        grad_4.textContent = Math.round(time4.main.temp) + '°';
        grad.textContent = Math.round(time.main.temp) + '°';
      });
};


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

update_weather();

setInterval(update_weather, 1000 * 60 * 5);