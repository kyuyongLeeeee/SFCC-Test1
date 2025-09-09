(function(){
    const layout = {
		init(){
            this._btns();
		},
        _btns() {
            const btnwrap = document.querySelectorAll('.btns');

            btnwrap.forEach((_, i) => {
                let btns = btnwrap[i].querySelectorAll('.btn_secondary');

                btns.forEach((_, i) => {
                    if(btns.length == 1){
                        _.closest('.btns').classList.add('one')
                    }else(
                        _.closest('.btns').classList.remove('one')
                    )
                })
            });
        },
	}
	layout.init();

    UI_COMMON.TAB.init();
})();