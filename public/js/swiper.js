const swiper = new Swiper('.swiper-container', {
    slidesPerView: 3.6,
    // spaceBetween: 50,
    slidesPerGroup: 3,
    direction: 'horizontal',
    loop: false,
    loopFillGroupWithBlank: true,
    speed: 800,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
    },
})
