(function(){
	const init = () => {
		window.innerWidth > 768 ? CTRL_HEADER.init() : CTRL_GNB.init() || CTRL_HEADER_TAB.init() || CTRL_HEADER_ACCORDION.init();

		CTRL_SEARCH.init();
	}

	const CTRL_GNB = {
		gnb: document.querySelector('.icon_btn.nav'),
		gnbTrigger: document.querySelector('.nav_wrap'),
		gnbClose: document.querySelector('.nav_wrap .icon_btn.close'),

		init(){
			this._bind();
		},
		_bind(){
			this.gnb.addEventListener('click', () => this._gnbToggle());
			this.gnbClose.addEventListener('click', () => this._ctrl());
		},
		_ctrl(){
            if (this.gnbTrigger.classList.contains('is-open')) {
				this.gnbTrigger.classList.remove('is-open');
            }
        },
		_gnbToggle(){
			this.gnbTrigger.classList.toggle('is-open');
		}
	};

	const CTRL_SEARCH = {
        body: document.querySelector('body'),
		searchTrigger: document.querySelectorAll('.btn_search'),
		searchBoard: document.querySelector('.search_wrap'),
		searchClose: document.querySelectorAll('.icon_btn.close'),
		isOpen : false,

		init(){
			this._bind();
		},
		_bind(){
			this.searchTrigger.forEach((_) => {
				_.addEventListener('click', () => this._ctrl());
			});
            this.body.addEventListener('click', e => this._clickOutside(e.target));
			this.searchClose.forEach((_) => {
				_.addEventListener('click', () => this._close());
			})
		},
        _ctrl(){
            if (this.searchBoard.classList.contains('is-open')) {
                this.searchBoard.classList.remove('is-open');
            } else {
                if (window.innerWidth <= 768) {
                    UI_COMMON.DIM._remove();
                    console.log('remove');
                } else {
                    UI_COMMON.DIM._create();
                    console.log('create');
                }
				const searchHeight = this.searchBoard.scrollHeight;
				this.searchBoard.style.height = `${searchHeight}px`;
				this.searchBoard.classList.add('is-open');
				this.isOpen = true;
            }
        },

		_close(){
			UI_COMMON.DIM._remove();
            this.searchBoard.removeAttribute('style');
			this.searchBoard.classList.remove('is-open');
            this.isOpen = false;
		},

        _clickOutside(target){
            if (this.searchBoard.classList.contains('is-open') && this.isOpen) {
                if (!target.closest('.search_wrap') && !target.closest('.btn_search')) {
                    this._close();
                }
            }

        }
	}

	const CTRL_HEADER = {
		body: document.querySelector('body'),
		header: document.querySelector('header'),
		depthOne: document.querySelectorAll('.depth_one>.gnb_tit'),
		depthTwo: document.querySelectorAll('.depth_two_wrap'),

		init(){
			this._bind();
            this._adjustMenuPosition();
		},

		_bind(){
			this.depthOne.forEach((_) => {
				_.addEventListener('mouseover', e => this._ctrl(e.target));
			});
			this.body.addEventListener('mouseover', e => this._outside(e.target));
            
		},

        _adjustMenuPosition() {
            const menuItems = document.querySelectorAll('.depth_one');
        
            menuItems.forEach(menuItem => {
                const subWrap = menuItem.querySelector('.depth_two_wrap');
                
                if (!subWrap || !subWrap.classList.contains('column')) return;

                const depthTwo = subWrap?.querySelector('.depth_two_box');
                const subMenu = subWrap.querySelector('.inner');
                if (!subMenu) return;
        
                const menuItemRect = menuItem.getBoundingClientRect(); 

                const gnbRect = document.querySelector('.gnb_menu').getBoundingClientRect(); 

                const leftOffset =  menuItemRect.left - gnbRect.left + 24; 
        
                console.log('leftOffset',leftOffset)

                subMenu.style.paddingLeft = `${leftOffset}px`;

                if (depthTwo && menuItem.offsetWidth) {
                    depthTwo.style.minWidth = `${menuItem.offsetWidth}px`;
                }
            });
        },

		_ctrl(target){
			this.depthOne.forEach((el) => { 
				el.closest('li').classList.remove("on");
				
			});
			target.closest('li').classList.add("on");  

		
			if (target.closest('li').classList.contains("on") && target.nextElementSibling) {
				this.header.classList.add('is-open');

				const searchHeight = target.nextElementSibling.scrollHeight;
				target.nextElementSibling.style.height = `${searchHeight}px`;

				GET_SIBLINGS._search(target.closest('li')).forEach((_, i) => {
					if(_.lastElementChild.classList.contains('depth_two_wrap')){
						_.lastElementChild.style.height = `${searchHeight}px`;
					} 
				});

			}else{
				this.header.classList.toggle('is-open');
				this.depthTwo.forEach((_) => { _.removeAttribute('style')});
			}
	    },

        _outside(target){
            if(this.header.classList.contains('is-open')){
                if (!target.closest('.depth_one') && !target.closest('.depth_two_wrap')) {
                    this._close();
                };
            }
        },

        _close(){
            this.header.classList.remove('is-open');
            this.depthTwo.forEach((_) => { _.removeAttribute('style')});
            this.depthOne.forEach((_) => {_.closest('li').classList.remove("on");});
        },
	};

	const CTRL_HEADER_TAB = {
        objWrap : {},
        boxWrap : {},
        $this : {},
        init(){
            this._evtBind();
			this._evtHeight();

        },
        _evtBind(){
            this.objWrap = [...document.querySelectorAll('.depth_one_mo')],
            this.boxWrap = [...document.querySelectorAll('.depth_two_mo')];
            
            this.objWrap.forEach((_, i) => {
                let obj = this.objWrap[i].querySelectorAll('ul > li');
                
                
                obj.forEach((_, i) => {
                    _.addEventListener('click', (e) => { 
                        e.preventDefault();  // 앵커 클릭 시 기본 동작(이동)을 막음
                        this.$this = _;
                        this._ctrl(this.objWrap.indexOf(_.closest('.depth_one_mo')), GET_INDEX._search(e));
                    });
                });
            });
        },
        _ctrl(i, n){
			console.log(this.boxWrap[i])
			console.log(this.boxWrap[i].children[n])
            let box = this.boxWrap[i].children[n];

            this.$this.querySelector('a').classList.add('on');
            GET_SIBLINGS._search(this.$this).forEach((_, i) => {
                _.querySelector('a').classList.remove('on');
            });

            box.classList.add('on');
            GET_SIBLINGS._search(box).forEach((_, i) => {
                _.classList.remove('on');
            });

        },
		_evtHeight(){

		}
    };

	const GET_INDEX = {
        _search(e){
            let obj = [...e.currentTarget.parentElement.children],
                index = obj.indexOf(e.currentTarget);

            return index;
        }
    };

	const GET_SIBLINGS = {
        _search(obj){
            let objWrap = obj.parentNode,
                currentObj = obj,
                siblings = [];

            for( let i = 0; i < objWrap.children.length; i++){
                if(objWrap.children[i] !== currentObj){
                    siblings.push(objWrap.children[i]);
                };
            };

            return siblings;
        },
    };

	const CTRL_HEADER_ACCORDION = {
        init() {
            this._bindEvents();
        },
        _bindEvents() {
            const triggers = document.querySelectorAll('.gnb_acc_trigger');
    
            triggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    const parent = e.currentTarget.closest('li');
                    const content = parent.querySelector('.gnb_acc_conts');
    
                    // 열려 있는 다른 아코디언 닫기
                    this._closeAllExcept(parent);
    
                    // 현재 아코디언 토글
                    if (content) {
                        this._toggleContent(content, trigger);
                    }
                });
            });
        },
        _toggleContent(content, trigger) {
            if (content.classList.contains('on')) {
                this._hideContent(content);
                trigger.classList.remove('active');
            } else {
                this._showContent(content);
                trigger.classList.add('active');
            }
        },
		_closeAllExcept(current) {
            const items = document.querySelectorAll('.gnb_acc_wrap ul li');
    
            items.forEach(item => {
                if (item !== current) {
                    const content = item.querySelector('.gnb_acc_conts');
                    const trigger = item.querySelector('.gnb_acc_trigger');
    
                    if (content) this._hideContent(content);
                    if (trigger) trigger.classList.remove('active');
                }
            });
        },
        _showContent(content) {
            content.classList.add('on'); // 'on' 클래스 추가
    
            // 'on' 상태에서만 스타일 적용
            if (content.classList.contains('on')) {
                content.style.maxHeight = `${content.scrollHeight}px`; // 실제 콘텐츠 높이를 설정
            }
        },
        _hideContent(content) {
            content.classList.remove('on'); // 'on' 클래스 제거
            content.style.maxHeight = '0'; // 높이를 0으로 설정
        }
    };
    
	init();

    window.addEventListener('resize', () => init());
})();