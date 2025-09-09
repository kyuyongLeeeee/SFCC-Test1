(function () {
    const csteSwiper = new Swiper(".cate_swiper", {
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    if (matchMedia("screen and (min-width: 768px)").matches) {

        //pc
        
    }else{
        const ranSwiper = new Swiper(".ranking_swiper", {
            slidesPerView: 1,
            spaceBetween: 16,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    }

    UI_COMMON.TAB.init();

})();
