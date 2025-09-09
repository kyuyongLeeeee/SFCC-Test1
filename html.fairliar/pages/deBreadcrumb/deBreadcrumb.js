(function(){
	const breadcrumb = {
		init(){
			this._bind();
		},
		_bind(){
            const depth = document.querySelectorAll('.breadcrumb > li:has(.sub)');
			const depthLink = document.querySelectorAll('.breadcrumb > li:has(.sub) > a');
			depthLink.forEach(el => {
				el.addEventListener('mouseenter', () => {
                    const depthLi = el.parentNode;
					const sub = depthLi.querySelector('.sub');
					const subHeight = sub.scrollHeight;
					sub.style.height = `${subHeight}px`;
					depthLi.classList.add('on');
				});
			});
			depth.forEach(el => {
                el.addEventListener('mouseleave', () => {
                    if (el.classList.contains('on')) {
                        el.classList.remove('on');
                        el.querySelector('.sub').removeAttribute('style');
                    }
                });
            });
		}
	}
	
	breadcrumb.init();
})();