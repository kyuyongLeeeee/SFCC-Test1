(function () {
	
    if (typeof l !== "undefined") {
        window.alert("listo-survey error!");
        return
    }
    function t(t, e, l, s) {
        if (! s) {
            t.append(e)
        } else {
            t.append(l)
        }
    }
    function e(t) {
        const [e, l, s, i] = t.split(",");
        if (Number(i) <= .5) 
            return false;
        
        if (Number(e) + Number(l) + Number(s) > 460) 
            return false;
        
        return true
    }
    var l = document;
    var s = window;
    var i = l.getElementsByTagName("listo-survey")[0].getAttribute("data-args");
    var o = l.createElement("div");
    o.style.display = "none";
    o.style.position = "fixed";
    o.style.alignItems = "center";
    o.style.justifyContent = "center";
    o.style.right = "10px";
    o.style.top = "10px";
    o.style.width = "40px";
    o.style.height = "40px";
    o.style.background = "rgba(0, 0, 0, .1)";
    o.style.borderRadius = "100%";
    o.innerHTML = '<img src="../../assets/images/icon/ico-close.svg" alt="" style="width:5.5vw; height: 5.5vw;">';
    o.style.zIndex = 1e7;
    o.style.cursor = "pointer";
    var r = l.createElement("div");
    var a = l.createElement("div");
    var y = l.createElement("iframe");
    var n = l.getElementsByTagName("listo-survey")[0].getAttribute("data-shape");
    var h = l.getElementsByTagName("listo-survey")[0].getAttribute("data-color");
    var d = l.getElementsByTagName("listo-survey")[0].getAttribute("data-src");
    var p = l.getElementsByTagName("listo-survey")[0].getAttribute("data-size");
	var iconNo = l.getElementsByTagName("listo-survey")[0].getAttribute("data-icon-no");
	var $survey = '<div class="survey-btn04" style="font-size:0">설문 열기</div>';

    switch (iconNo) {
        case '1':
            $survey = '<div class="survey-btn01" style="font-size:0">설문 열기</div>';
            break;
        case '2':
            $survey = '<div class="survey-btn02" style="font-size:0">설문 열기</div>';
            break;
        case '3':
            $survey = '<div class="survey-btn03" style="font-size:0">설문 열기</div>';
            break;
        case '4':
            $survey = '<div class="survey-btn04" style="font-size:0">설문 열기</div>';
            break;
        default:
            $survey;
    }

    if (! p) 
        p = 50;
    
    var v = l.getElementsByTagName("listo-survey")[0].getAttribute("data-position");
    var g = e(h)
        ? "white"
        : "black";
    var f = p * .6;
    var m = {
        close: '<div class="survey-close"></div>',
        add: $survey ,// 디폴트 아이콘
        text: '<svg xmlns="http://www.w3.org/2000/svg" width="' + f + '" height="' + f + '" viewBox="0 0 24 24"></svg><path d="M0 0h24v24H0z" fill="none"/><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" fill="' + g + '"/></svg>',
        rate: '<svg xmlns="http://www.w3.org/2000/svg" width="' + f + '" height="' + f + '" viewBox="0 0 24 24"><path d="M0 0h24v24H0zm15.35 6.41l-1.77-1.77c-.2-.2-.51-.2-.71 0L6 11.53V14h2.47l6.88-6.88c.2-.19.2-.51 0-.71z" fill="none"/><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 14v-2.47l6.88-6.88c.2-.2.51-.2.71 0l1.77 1.77c.2.2.2.51 0 .71L8.47 14H6zm12 0h-7.5l2-2H18v2z" fill="' + g + '"/></svg>',
        widget: '<svg xmlns="http://www.w3.org/2000/svg" width="' + f + '" height="' + f + '" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z" fill="' + g + '"/></svg>'
    };
    r.style.position = "fixed";
    if (v === "bottom-right") {
        r.style.bottom = "83px";
		r.style.zIndex = "100";
        r.style.right = "20px"
    } else if (v === "bottom-left") {
        r.style.bottom = "140px";
        r.style.left = "20px"
    } else if (v === "top-right") {
        r.style.top = "20px";
        r.style.right = "20px"
    } else if (v === "top-left") {
        r.style.top = "20px";
        r.style.left = "20px"
    }
    a.style.display = "flex";
    a.style.alignItems = "center";
    a.style.justifyContent = "center";
    a.style.width = "48px";
    a.style.height ="48px";
    a.style.cursor = "pointer";
    a.style.borderRadius = "100%";
    a.style.background = "none";
    var c = l.createElement("img");
    var w = false;
    if (d) {
        if (!/http/.test(d)) {
            var b = d.split("DPOj7sG");
            c.src = atob(b[1]) + "userFiles" + atob(b[0])
        } else {
            c.src = d
        } c.onload = function () {
            c.style.width = p + "px";
            c.style.height = p + "px";
            c.style.borderRadius = "100%";
            c.style.cursor = "pointer";
            w = true;
            t(r, a, c, true)
        };
        c.onerror = function () {
            t(r, a, c, false)
        }
    } else {
        t(r, a, c, false)
    } y.style.position = "fixed";
    y.style.visibility = "hidden";
    y.style.border = "none";
    y.style.transition = "all .2s";    
    y.style.background = "rgba(255, 255, 255, .3)";
    l.body.appendChild(r);
    l.body.appendChild(y);
    l.body.appendChild(o);
    a.innerHTML = m[n];
    function u() {
        if (y.style.visibility == "hidden") {
            y.style.width = 0;
            y.style.maxWidth = 0;
            y.style.height = 0;
            y.style.maxHeight = 0;
            r.style.display = "block";
            o.style.display = "none";
            o.style.opacity = 0
        } else {
            if (window.matchMedia("(min-width: 600px)").matches) {
                y.style.width = "80%";
                y.style.maxWidth = "428px";
                y.style.height = "80%";
                y.style.maxHeight = "678px";
                y.style.boxShadow = "1px 1px 2px #e9ecef, 0 0 25px #868e96, 0 0 5px #e9ecef";
                y.style.borderRadius = "10px";
                r.style.display = "block";
                o.style.display = "none";
                o.style.opacity = 0;
                y.style.top = "initial";
                y.style.left = "initial";
                var t = Number(p) / 1.5 + 20 + "px";
                if (v === "bottom-right") {
                    y.style.bottom = t;
                    y.style.right = t
                } else if (v === "bottom-left") {
                    y.style.bottom = t;
                    y.style.left = t
                } else if (v === "top-right") {
                    y.style.top = t;
                    y.style.right = t
                } else if (v === "top-left") {
                    y.style.top = t;
                    y.style.left = t
                }
            } else {
                y.style.width = "100%";
                y.style.maxWidth = "100%";
                y.style.height = "100%";
                y.style.maxHeight = "100%";
                y.style.boxShadow = "";
                y.style.borderRadius = 0;
				y.style.zIndex = "500";
                r.style.display = "none";
                o.style.opacity = 1;
                o.style.transition = "opacity .3s";
                setTimeout(() => {
                    o.style.display = "flex"
                }, 1000);
                if (v === "bottom-right") {
                    y.style.bottom = 0;
                    y.style.right = 0
                } else if (v === "bottom-left") {
                    y.style.bottom = 0;
                    y.style.left = 0
                } else if (v === "top-right") {
                    y.style.top = 0;
                    y.style.right = 0
                } else if (v === "top-left") {
                    y.style.top = 0;
                    y.style.left = 0
                }
            }
        }
    }
    function x() {
        if (y.style.visibility == "hidden") {
            if (! w) {
                r.append(a);
                a.innerHTML = m.close
            }
            setTimeout(() => {
                y.src = "https://respond.listovey.com/rs/" + i + "?" + Math.random()
            }, 300);
            y.style.visibility = "visible";
            u()
        } else {
            y.src = "";
            y.style.visibility = "hidden";
            u();
            a.innerHTML = m[n]
        }
    }
    r.addEventListener("click", x);
    o.addEventListener("click", x);
    s.addEventListener("resize", function () {
        u()
    })
})();