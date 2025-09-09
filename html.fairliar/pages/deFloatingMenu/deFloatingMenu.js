(function () {
    const FLOATING_MENU = {
        floating: document.querySelector('.floating_btn'),
        topBtn: document.querySelector('.btn_top'),
        container: document.querySelector('.container'),
        bottomNav: document.querySelector('.bottom_nav'),

        init() {
            this._bind();
        },
        _bind() {
            const initBottom = window.getComputedStyle(this.floating).bottom;

            window.addEventListener('scroll', () => {
                this._scroll(initBottom);
            });

            this.topBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        },
        _scroll(bottom) {
            const scrollPos = window.scrollY || document.documentElement.scrollTop;
        
            scrollPos > 0
                ? this.topBtn.parentNode.classList.add('scroll')
                : this.topBtn.parentNode.classList.remove('scroll');
        
            const footer = document.querySelector('.footer');
            let footerHeight = 0;
            
            if (footer) {
                footerHeight = footer.offsetHeight;
                if (this.bottomNav) {
                    footerHeight -= this.bottomNav.offsetHeight;
                }
            }
        
            const scrollRange =
                window.innerHeight > 768
                    ? scrollPos >= this.container.scrollHeight - window.innerHeight
                    : footer && footer.getBoundingClientRect().y <= window.innerHeight - footerHeight;
        
            const floatingPos = scrollRange ? `calc(${bottom} + ${footerHeight}px)` : bottom;
        
            this.floating.style.bottom = floatingPos;
           
        },
    };

    FLOATING_MENU.init();
})();
