(function(){
	const layout = {
		init(){
            this._good();
            this._sort();
		},
        _good() {
            const buttons = document.querySelectorAll('.icon_btn.good');

            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    button.classList.toggle('on');
                });
            });
        },
        _sort(){
            const btn = document.querySelector('.sort_btn button');

            btn.addEventListener('click', () => {
                const event = btn.closest('.sort_btn');
                UI_COMMON.CLASS_TOGGLE.init(event, 'active');
            })
        },
	}
	layout.init();

    UI_COMMON.TAB.init();
    
})();