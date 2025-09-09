"use strict";
const UI_COMMON = (function (uiCommon) {

    const init = () => {
        // window.innerWidth > 768 ? HEADER_BANNER.init() : HEADER_BANNER_MO.init();
    };

    const LAYOUT_RESIZE = {
        obj: null,
        init(){
            // DOM이 로드된 후에 객체를 초기화
            document.addEventListener('DOMContentLoaded', () => {
                this.obj = document.querySelector('.content .column--grid > .inner:not(.lnb)');
                if (this.obj) {
                    this._bind();
                    this._resize();
                } else {
                    console.log('resize 대상 없음');
                }
            });
        },
        _bind(){
            window.addEventListener('resize', () => {
                this._resize();
            });
        },
        _resize(){
            if (this.obj && window.innerWidth < 1920 && window.innerWidth > 1440) {
                this.obj.style.width = `${1136 - (1920 - window.innerWidth) / 2}px`;
            }
        }
    };

    const CLASS_TOGGLE = {
        trigger: {},
        str: '',
        init(_, str) {
            this.trigger = _;
            this.str = str;
            this._toggle();
        },
        _toggle() {
            this.trigger.classList.toggle(this.str);
        },
    };

	const CTRL_SCROLL = {
		body : {},
		y: 0,
		isFix : false,
		_toggle(){
            this.body = document.querySelector('body');
			if(!this.isFix){
				this.y = window.scrollY;
				this.body.classList.add('scrollFix');
				this.isFix = true;
			} else {
				this.body.classList.remove('scrollFix');
				window.scrollTo(0, this.y);
				this.isFix = false;
			};
		}
	};

    const DIM = {
        str: '',
        
        _create(str) {
            this.str = str || 'dim';
            document.querySelector('body').insertAdjacentHTML('beforeend', `<div class="${this.str}"></div>`);
            document.querySelector('body').style.overflow = 'hidden';
            document.querySelector('.dim').style.display = 'block';
        
            const popupHeader = document.querySelector('.popup_header');
            const popupFooter = document.querySelector('.popup_footer');
            const popupContent = document.querySelector('.popup_content');
            const alertContent = document.querySelector('.type2 .popup_content') || document.querySelector('.alert .popup_content');

            const pcGap = 280;
            const mobileGap = 24;
            const alertMobileGap = 44;
    
            if (popupHeader && popupFooter && popupContent) {
                const headerHeight = popupHeader.offsetHeight;
                const footerHeight = popupFooter.offsetHeight;
                const gap = window.innerWidth <= 768 ? mobileGap : pcGap;
                const alertGap = window.innerWidth <= 768 ? alertMobileGap : pcGap;
                const availableHeight = window.innerHeight - (headerHeight + footerHeight) - gap;
                const availableHeight2 = window.innerHeight - (headerHeight + footerHeight) - alertGap;
    
                popupContent.style.maxHeight = `${availableHeight}px`;
                alertContent.style.maxHeight = `${availableHeight2}px`;
            }
        },
        _remove(str) {
            this.str = str || 'dim';
            const dimElement = document.querySelector(`.${this.str}`);
            if (dimElement) {
                dimElement.remove();
                document.querySelector('body').style.overflow = 'auto';
            }
            
            // .dim 요소가 없을 경우 오류 방지
            const dim = document.querySelector('.dim');
            if (dim) {
                dim.style.display = 'none';
            }
        }
    };
    
    const TAB = {
        objWrap : {},
        boxWrap : {},
        $this : {},
        init(){
            this._evtBind();
        },
        _evtBind(){
            this.objWrap = [...document.querySelectorAll('.tab-ctrl')],
            this.boxWrap = [...document.querySelectorAll('.tab-contents-wrap')];
            
            this.objWrap.forEach((_, i) => {
                let obj = this.objWrap[i].querySelectorAll('ul > li');
                
                
                obj.forEach((_, i) => {
                    _.addEventListener('click', (e) => { 
                        e.preventDefault();  // 앵커 클릭 시 기본 동작(이동)을 막음
                        this.$this = _;
                        this._ctrl(this.objWrap.indexOf(_.closest('.tab-ctrl')), GET_INDEX._search(e));
                    });
                });
            });
        },
        _ctrl(i, n){
            let box = this.boxWrap[i].children[n];

            this.$this.querySelector('a').classList.add('on');
            GET_SIBLINGS._search(this.$this).forEach((_, i) => {
                _.querySelector('a').classList.remove('on');
            });

            box.classList.add('on');
            GET_SIBLINGS._search(box).forEach((_, i) => {
                _.classList.remove('on');
            });

            //아코디언 안에 탭이 존재할 경우
            if(box.closest('.acc-conts').classList.contains('on') && box.classList.contains('on')){
                box.closest('.acc-conts').style.maxHeight = `${box.scrollHeight + 116}px`
            }
        }
    };

    const RADIO_TAB = {
        radioWraps: null,
        
        init() {
            this.radioWraps = document.querySelectorAll('.radio_wrap');
    
            this.radioWraps.forEach(radioWrap => {
                const radioBtns = radioWrap.querySelectorAll('.radio_group input[type="radio"]');
                const contents = radioWrap.querySelector('.radio-contents-wrap').querySelectorAll('.radio_content');
    
                // 초기 상태 설정 (첫 번째 라디오 버튼 선택)
                if (radioBtns.length > 0) {
                    const firstRadio = radioBtns[0];
                    const firstTarget = firstRadio.dataset.target;
                    contents.forEach(content => {
                        if (content.classList.contains(firstTarget)) {
                            content.classList.add('on');
                        } else {
                            content.classList.remove('on');
                        }
                    });
                }
    
                radioBtns.forEach(radio => {
                    radio.addEventListener('change', (e) => {
                        const targetClass = e.target.dataset.target;
                        contents.forEach(content => {
                            if (content.classList.contains(targetClass)) {
                                content.classList.add('on');
                            } else {
                                content.classList.remove('on');
                            }
                        });
                    });
                });
            });
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

    const ACCORDION = {
        init() {
            this._bindEvents();
        },
        _bindEvents() {
            const triggers = document.querySelectorAll('.acc-trigger');
    
            triggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    const parent = e.currentTarget.closest('li');
                    const content = parent.querySelector('.acc-conts');
    
                    if (parent.closest('.sub_accordian ul') == null) {
                        //열려 있는 다른 아코디언 닫기
                        this._closeAllExcept(parent);
                    }
    
                    // 현재 아코디언 토글
                    if (content) {
                        this._toggleContent(content, trigger);
                    }
                });
            });
        },
        _closeAllExcept(current) {
            const items = document.querySelectorAll('.accordian ul li');
    
            items.forEach(item => {
                if (item !== current) {
                    const content = item.querySelector('.acc-conts');
                    const trigger = item.querySelector('.acc-trigger');
    
                    if (content) this._hideContent(content);
                    if (trigger) trigger.classList.remove('active');
                }
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
        },
    };
    
    const RADIO_LIST = {
        init() {
            this._bindEvents();
        },
        _bindEvents() {
            document.querySelectorAll('.rd_list dl').forEach(dl => {
                dl.addEventListener('click', (e) => {
                    const radio = dl.querySelector('input[type="radio"]');
                    if (radio) {
                        radio.checked = true;
                    }
                });
            });
        }
    };

    const CHECKBOX_CONTROL = {
        init() {
            this._bindEvents();
        },
        _bindEvents() {
            const allCheckbox = document.querySelector('.check_group.all input[type="checkbox"]');
            const childCheckboxes = document.querySelectorAll('.list_agree input[type="checkbox"]');
    
            if (allCheckbox) {
                allCheckbox.addEventListener('change', (e) => {
                    childCheckboxes.forEach(checkbox => {
                        checkbox.checked = e.target.checked;
                    });
                });
    
                // 개별 체크박스 상태에 따라 전체 동의 체크박스 제어
                childCheckboxes.forEach(checkbox => {
                    checkbox.addEventListener('change', () => {
                        allCheckbox.checked = Array.from(childCheckboxes).every(cb => cb.checked);
                    });
                });
            }
        }
    };

    const POPUP = {
        init() {
            this.__bindEvents();
        },
        __bindEvents() {
            const buttons = document.querySelectorAll('[data-button-id]');
            const opens = document.querySelectorAll('[data-button-open]');
            const closed = document.querySelectorAll('.popup_closed');
    
            buttons.forEach(e => {
                e.addEventListener("click", () => {
                    const eventId = e.dataset.buttonId;

                    opens.forEach( ev => {
                        const event = ev.dataset.buttonOpen;

                        if(eventId == event){
                            CLASS_TOGGLE.init(ev, 'on');
                            DIM._create();
                        }
                    })
                })
            });

            closed.forEach(e => {
                e.addEventListener("click", () => {
                    opens.forEach( ev => {
                        ev.classList.remove('on');
                    });
                    DIM._remove();
                })
            })

        }
    };

    const HEADER_BANNER = {   
        init(){
            this._height();
		},

        _height(){
            const container = document.querySelector('.container');
            const header = document.querySelector('header');

            const pcFooter = 276;
            const moFooter = 472;

            const containerFooter = window.innerWidth <= 768 ? moFooter : pcFooter;
            container.style.padding = `${header.scrollHeight}px 0 ${containerFooter}px`;
        },
    };

    return{
        LAYOUT_RESIZE : LAYOUT_RESIZE,
		CLASS_TOGGLE : CLASS_TOGGLE,
        DIM : DIM,
        CTRL_SCROLL : CTRL_SCROLL,
        TAB : TAB,
        RADIO_TAB : RADIO_TAB,
        GET_SIBLINGS : GET_SIBLINGS, 
        ACCORDION: ACCORDION, 
        RADIO_LIST : RADIO_LIST, 
        CHECKBOX_CONTROL: CHECKBOX_CONTROL,
        POPUP : POPUP,
        HEADER_BANNER : HEADER_BANNER,
    };

})(window.uiCommon || {});