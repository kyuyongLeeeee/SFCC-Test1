(function(){
	const layout = {
		init(){
            //this._good();
            this._swiper();
		},
        
        _good(){
            const btn = [...document.querySelectorAll('.btn_good')];
            const icon = [...document.querySelectorAll('.icon_good')];
            const see = document.querySelector('.see_more');

            btn.forEach(e => {
                e.addEventListener('click', () => {
                    const change = e.closest('.img_box').querySelector('.icon_good');
                    UI_COMMON.CLASS_TOGGLE.init(change, 'on');
                })
            })

            icon.forEach(e => {
                e.addEventListener('click', () => {
                    UI_COMMON.CLASS_TOGGLE.init(e, 'on');
                })
            });

            see.addEventListener('click', () => {
                UI_COMMON.CLASS_TOGGLE.init(see.closest('.tab-content'), 'see_more');
            });
        },

        _swiper(){
            if (matchMedia("screen and (min-width: 768px)").matches) {
                const recoSwiper = new Swiper(".recomm_swiper", {
                    slidesPerView: 4,
                    spaceBetween: 8,
                    pagination: {
                        el: ".swiper-pagination",
                    },
                });

                const thumbsSlider = new Swiper(".thumbs_swiper", {
                    loop: true,
                    spaceBetween: 8,
                    slidesPerView: 1,
                    grid: {
                        fill: 'row',
                        rows: 3
                    },
                    freeMode: true,
                    watchSlidesProgress: true,
                });

                const imgSlider = new Swiper(".img_swiper", {
                    loop: true,
                    spaceBetween: 8,
                    navigation: {
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    },
                    thumbs: {
                      swiper: thumbsSlider,
                    },
                });

              } else {

                const recoSwiper = new Swiper(".recomm_swiper", {
                    slidesPerView: 2,
                    spaceBetween: 8,
                    pagination: {
                        el: ".swiper-pagination",
                    },
                });

                const thumbsSlider = new Swiper(".thumbs_swiper", {
                    loop: true,
                    spaceBetween: 8,
                    slidesPerView: 1,
                    pagination: {
                        el: ".swiper-pagination",
                    },
                });
              }
        },
	}
	layout.init();

    UI_COMMON.ACCORDION.init();
    UI_COMMON.TAB.init();
    
})();