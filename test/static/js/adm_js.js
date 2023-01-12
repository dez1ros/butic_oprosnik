var q = document.getElementById("add")
var fon = document.getElementById("fon")

function hide(){
    q.classList.remove('show');
    q.classList.add('hide');
    fon.style.opacity = '0';
}

function show(){
    q.classList.add('show');
    q.classList.remove('hide');
    fon.style.opacity = '0.5';
}