showSlides(0);

function showSlides(n) {
    let slides = document.getElementsByClassName("bg");
    for (let slide of slides) {
        slide.style.display = "none";
    }
    slides[n].style.display = "block";
};

$('#carousel').on('slide.bs.carousel', function (e) {
    showSlides(e.to)
})