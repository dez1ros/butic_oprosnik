//timeout = setTimeout(next_img, 5000);
//
//
//var i = 1;
//len = document.getElementById("len");
//function next_img(){
//    clearTimeout(timeout);
//    timeout = setTimeout(next_img, 5000);
//    if (i >= len.textContent){
//        i = 0;
//    }
//    i++;
//    document.getElementById("num").textContent = i;
//    document.getElementById("img").src='static/img/rab/' + i + '.jpg';
//
//}
//
//function do_img(){
//    i--;
//    if (i == 0){
//        i = len.textContent;
//    }
//    document.getElementById("num").textContent = i;
//    document.getElementById("img").src='static/img/rab/' + i + '.jpg';
//}

var btn_prev = document.querySelector('.tabs .prev'),
    btn_next = document.querySelector('.tabs .next');

var images = document.querySelectorAll('.photo img');
var names = document.querySelectorAll('.photo h3');
var i = 0;
btn_prev.onclick = function(){
   images[i].className = "";
   names[i].className = "";
    i = i - 1;
    if( i < 0){
      i = images.length - 1;
    }
    images[i].className = "shown";
    names[i].className = "shown";
};

btn_next.onclick = function(){
    images[i].className = "";
    names[i].className = "";
    i = i + 1; //i++
    if( i >= images.length){
      i = 0;
    }
    images[i].className = "shown";
    names[i].className = "shown";
};

timeout = setTimeout(next_img, 5000);