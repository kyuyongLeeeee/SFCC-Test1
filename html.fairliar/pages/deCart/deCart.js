(function(){
	const layout = {
		init(){
            this._good();
            this._swiper();
		},
        _good(){
            const btn = [...document.querySelectorAll('.btn_good')];
            const icon = [...document.querySelectorAll('.icon_good')];
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
        },
        _swiper(){
            const swiper1 = new Swiper(".prod_swiper", {
                slidesPerView: 4,
                spaceBetween: 8,
                loopAdditionalSlides : 1,
                navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                },
            });
        },
	}
	layout.init();

    UI_COMMON.POPUP.init();
    UI_COMMON.ACCORDION.init();
    UI_COMMON.CHECKBOX_CONTROL.init();
})();