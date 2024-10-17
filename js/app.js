const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,

    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    on: {
    slideChange: function () {
            let videos = document.querySelectorAll('video');
            Array.prototype.forEach.call(videos, function(video){ video.pause()});
        }
    },
});

document.getElementById("saveSub").onclick = () => {window.location.href = "#uso"; swiper.slideTo(0)};
document.getElementById("copySub").onclick = () => {window.location.href = "#uso"; swiper.slideTo(1)};
document.getElementById("sliceMp3").onclick = () => {window.location.href = "#uso"; swiper.slideTo(2)};

