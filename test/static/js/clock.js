function update_clock() {
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    if (hour < 10){
        hour = '0' + hour;
    }
    if (minutes < 10){
        minutes = '0' + minutes;
    }
    var el = document.getElementById("clock");
    el.textContent = hour + ':' + minutes;
}

update_clock()

setInterval(update_clock, 1000);
