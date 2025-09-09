(function () {

    const kvSwiper = new Swiper(".kv_swiper", {
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
        },
    });

    if (matchMedia("screen and (min-width: 768px)").matches) {

        //pc
        const banSwiper = new Swiper(".bene_swiper", {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
       
        const outSwiper = new Swiper(".out_swiper", {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 8,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
        });
      } else {

        //mo
        const banSwiper = new Swiper(".bene_swiper", {
            slidesPerView: 1,
            spaceBetween: 16,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });

        const outSwiper = new Swiper(".out_swiper", {
            slidesPerView: 2,
            slidesPerGroup: 2,
            grid: {
                fill: 'row',
                rows: 2
            },
            spaceBetween: 8,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });

        const codSwiper = new Swiper(".coordi_swiper", {
            slidesPerView: 1,
            spaceBetween: 16,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
        });

        const commSwiper = new Swiper(".commun_swiper", {
            slidesPerView: 3,
            //slidesPerGroup: 9,
            grid: {
                fill: 'row',
                rows: 3
              },
            spaceBetween: 8,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });

    }
    
   
  

    UI_COMMON.TAB.init();
    UI_COMMON.HEADER_BANNER.init();

})();
