var util = {};

$ = util.$ = function(id){
	return document.getElementById(id);
};

util.trim = function(str){
	return str.replace(/^\s+/, '').replace(/\s+$/, '');
};

util.stopBubble = function(evt) {
	evt= evt || window.event;
	if(evt.preventDefault) {
		evt.preventDefault();        
		evt.stopPropagation();
	}
	else {
		evt.cancelBubble=true;
		evt.returnValue=false;
	}
}

util.addListener = function(element, type, handler){
	if (element.addEventListener) {
		element.addEventListener(type, handler, false);
	}
	else {
		element.attachEvent("on" + type, handler);
	}
}

if (!String.prototype.trim){String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")}}

$c = function(s) {return document.createElement(s);}

var searchBase =
["http://www.soso.com/q?",
"http://image.soso.com/image.cgi",
"http://video.soso.com/search/",
"http://cgi.music.soso.com/fcgi-bin/m.q",
"http://sobar.soso.com/sobar.q",
"http://wenwen.soso.com/z/Search.e",
"http://news.soso.com/n.q"
];


var SOSO_SMARTBOX_INST;

var curSmbIndex = -1;

function changeCid(cid){
	if($('mycid')){
		$('mycid').value = cid;
	}
}

function doSearch(){
	if(curSmbIndex==-1){
		changeCid('dh.so2');
	}else{
		changeCid('dh.so2.smart');
	}
	$('sosoSearch').click();
}

function sosoInit(){
	
		new SoSo_SmartBox("soso",
				function(){
				doSearch();
				},
				function(){
				return true;});	
		
		var soso_input = $('soso_input');
		if(soso_input){
			util.addListener(soso_input,'focus',function(){
					});
			util.addListener(soso_input,'blur',function(){
					});
			util.addListener(soso_input,'mouseover',function(){
					soso_input.focus();
					});
		}
	
		var sosoForm = document.forms['mainSoso'];
		if(sosoForm){
			sosoForm.onsubmit=function(){
			}
		}
	util.addListener(window,'load',function(){
			var soso_input = $('soso_input');
			soso_input.value = "";
			soso_input.focus();
			setTimeout(function(){window.scrollTo(0,0);},0);
			});
}

document.write('<style>#soso_SmartPop {'+
		'border:1px solid #9BC9EC;'+
		'width:348px;'+
		'background:#fff;'+
		'z-index:99;'+
		'position:absolute;'+
		'}#soso_SmartPop div div {'+
		'height:20px;'+
		'line-height:20px;'+
		'padding-left:5px;'+
		'font-size:14px;'+
		'text-decoration:none;'+
		'color:#000;'+
		'}#soso_SmartPop div.mouseout {'+
		'background:#fff;'+
		'}#soso_SmartPop div.mouseover {'+
		'background:#D8ECFF;cursor:pointer;}</style>');

function SoSo_SmartBox(target, sCallBack, rChlCallBack,jsonpUrl,parseCallback,pointFirst) {
	var _self = this;
		var _target = $(target+'_input');
		var _rect = {};
		var _enable = false;
		var _index = -1;
		var _items = [];
		var _data = [];
		var _key = "";
		var _Skey = "";
		var _timer = null;
		var _showing = false;
		var _smartPopId = 0;
		
		var _clearSel = function() {
			for (pos in _items) {
				_items[pos].className = "mouseout";
			}
		};
	var _prevWord = util.trim(_target.value); 
		var _search = function() {
			if (typeof(sCallBack) == "function") {
				var tmp = (_index==-1)?0:_index;
					if(_showing&&_data.length!=0){
						sCallBack(_showing,_data[tmp].url,_target.value,_index);
					}else{
						sCallBack(false,null,_target.value,0);
					}
			}
		};
	
		this.search = _search;
		
		var _close = function() {
			_showing = false;
				curSmbIndex = _index = -1;
				_items = [];
				_data = [];
				_key = "";
				var tipDiv = $(_smartPopId);
				if (tipDiv && tipDiv != null) {
					tipDiv.parentNode.removeChild(tipDiv);
				}
		};
	var _open = function() {
		var tipDiv = $c("div");
			tipDiv.id = _smartPopId = target+'_SmartPop';
			tipDiv.className = target+'SmartPop';
			tipDiv.style.height = "" + _data.length * 20 + "px";
			
			for (i in _data) {
				var itemDiv = $c("div");
					itemDiv.style.height = "20px";
					itemDiv.seq = parseInt(i); 
					
					if(pointFirst){
						if(itemDiv.seq==0){
							itemDiv.className = 'mouseover';
						}
					}
				
					(function() {
					 var store = itemDiv;
					 _self.Event.add(itemDiv, "mouseover",
						 function() {
						 _clearSel();
						 store.className = "mouseover";
						 curSmbIndex =  _index = store.seq;
						 })
					 })(); (function() {
						 _self.Event.add(itemDiv, "mouseout",
							 function() {
							 _clearSel();
							 curSmbIndex = _index = -1;
							 })
						 })(); (function() {
							 _self.Event.add(itemDiv, "click",
								 function() {
								 _prevWord = _Skey = _target.value = _data[_index].word;
								 _search();
								 })
							 })();
				var tipText = $c("div");
					tipText.innerHTML = _data[i].word;
					itemDiv.appendChild(tipText);
					tipDiv.appendChild(itemDiv);
					_items.push(itemDiv);
			}
		return tipDiv;
	};
	
		var _handleEnterKeyEvent = function(e){
			if(e.keyCode==13){
				_self.Event.stop(e);
					_prevWord = _target.value;
					_search();
					return;
			}
		}
	
		var _handleKeyEvent = function(e) {
			if(e==null){
				e = window.event;
			}
			
				if (!_showing && (e.keyCode == 38 || e.keyCode == 40)) {
					_enable = true;
						_detect();
				}
			if (e.keyCode == 13 ) {
				return;
			} else {
				if (e.keyCode == 38) {
					_self.Event.stop(e);
						_clearSel(); 
						if(_items.length<=0){
							return;
						}
					
						curSmbIndex = _index = (_index < 0) ? (_items.length - 1) : (_index - 1);
						
						if(_index==-1){
							if(pointFirst){
								_items[0].className = 'mouseover';
							}
							_key = _target.value = _Skey
						}else{
							_items[_index].className = "mouseover";
								_key = _target.value = _data[_index].word
						}
				} else {
					if (e.keyCode == 40) {
						_self.Event.stop(e);
							_clearSel();
							
							if(_items.length<=0){
								return;
							}
						
							if(pointFirst&&_items.length>1&&_index==-1){
								_index = 1;
							}else{
								curSmbIndex = _index = (_index > _items.length - 1) ? 0 : (_index + 1);
							}
						if (_index == _items.length) {
							_key = _target.value = _Skey;
								if(pointFirst){
									_index = 0;
										_items[0].className = 'mouseover';
								}
						} else {
							_items[_index].className = "mouseover";
								_key = _target.value = _data[_index].word
						}
					} else {
						if (e.keyCode == 27) {
							_self.Event.stop(e);
								_clearSel();
								_close();
								_target.value = _Skey;
						}
					}
				}
			}
		};
	var _locate = function(elem){
		var _rect = {
			'top': _self.Locator.getY(_target),
				'left': _self.Locator.getX(_target),
				'width': _self.Locator.getW(_target),
				'height': _self.Locator.getH(_target)
		};
		var locator = _self.Locator;
			locator.setX(elem, _rect.left);
			locator.setY(elem, _rect.top + _rect.height);
			if (!_self.Browser.ie) {
				locator.setW(elem, _rect.width - 2);
			}
			else {
				locator.setW(elem, (document.compatMode.toLowerCase() == "backcompat") ? _rect.width : (_rect.width - 2));
			}
		_target.parentNode.appendChild(elem);
			elem.style.display = "block";
			_showing = true;
	};
	
		var soso_jpcall_inner = function(data) {
			_enable = true;
				_close();
				_Skey = _key = _target.value;
				if (_data = _parse(data)) {
					_locate(_open())
				}
		};
	
		var jpcall_name = "soso_jpcall_" + Math.round(1000000 + Math.random() * 10000000);
		eval(jpcall_name + "=function(d){soso_jpcall_inner(d);}");
		var _jsonploader = function(url) {
			var script = document.createElement("script");
				script.setAttribute("type", "text/javascript");
				script.setAttribute("src", url);
				head = document.getElementsByTagName("head")[0];
				script.onload = script.onreadystatechange = function() {
					if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
						try{
							script.parentNode.removeChild(script);
						}catch(e){}
						script = null
					}
				};
			script.onerror = function() {};
				head.appendChild(script)
		};
	
		var _start = function() {
			soso_global_smartbox_data = [];
				_enable = false;
				var url;
				if(typeof(jsonpUrl)!='function'){
					url = "http://www.soso.com/smart.q?w=" + encodeURIComponent(_target.value) + "&m=" + jpcall_name + "&_" + Math.random();}else{
						url = jsonpUrl(_target.value,jpcall_name);
					}
			_jsonploader(url);
		};
	var _parse = function(data) {
		if(typeof(parseCallback)=='function'){
			return parseCallback(data);
		}
		
			if (!data || util.trim(data) == "") {
				return false
			}
		data = data.split("\n");
			res = [];
			for (i = 0; i < data.length; i++) {
				data[i] = data[i].split("\t");
					res.push({
							word: data[i][1],
							hint: data[i][0],
							type: data[i][2]
							})
			}
		return res
	};
	var _detect = function() {
		if (_timer != null) {
			clearTimeout(_timer);
				_timer = null
		}
		_timer = setTimeout(function() {
				if (!_enable || util.trim(_target.value).length == 0) {
				_close()
				} else {
				if (rChlCallBack() && _key != _target.value) {
				_start()
				}
				}
				_timer = null
				},
				300)
	}; 
	(function() {
	 _self.Event.add(_target, "keydown",
		 function(e) {
		 _handleKeyEvent(e)
		 });
	 _self.Event.add(_target, "keypress",
		 function(e) {
		 _handleEnterKeyEvent(e)
		 });
	 _self.Event.add(_target, "blur",
		 function() {
		 _enable = false;
		 _detect()
		 _unlisten()
		 });
	 _self.Event.add(window, "resize",
		 function() {
		 _enable && _start()
		 });
	 
	 _self.Event.add(_target, "focus",
		 function() {
		 _listen()
		 });
	 
		 var _timeoutId;
		 var _listen = function() {
			 _timeoutId = setTimeout(function() {
					 if ( _prevWord != util.trim(_target.value)) {
					 _prevWord = util.trim(_target.value);
					 _enable = true;
					 _detect()
					 }
					 _timeoutId = setTimeout(arguments.callee, 80)
					 },
					 80)
		 };
	 var _unlisten = function() {
		 clearTimeout(_timeoutId)
	 };
	})()
}
SoSo_SmartBox.prototype.Event = {
	add: function(a, d, b) {
		if (a.addEventListener) {
			a.addEventListener(d, b, false)
		} else {
			a.attachEvent("on" + d, b)
		}
	},
remove: function(a, d, b) {
			if (a.removeEventListener) {
				a.removeEventListener(d, b, false)
			} else {
				a.detachEvent("on" + d, b)
			}
		},
stop: function(a) {
		  if (a.preventDefault) {
			  a.preventDefault();
				  a.stopPropagation()
		  } else {
			  a.cancelBubble = true;
				  a.returnValue = false
		  }
	  }
};

/* 定位器对象*/
SoSo_SmartBox.prototype.Locator = {
	getX: function(elem){
		return elem.offsetParent ? elem.offsetLeft + this.getX(elem.offsetParent) : elem.offsetLeft;
	},
getY: function(elem){
		  return elem.offsetParent ? elem.offsetTop + this.getY(elem.offsetParent) : elem.offsetLeft;
	  },
getW: function(elem){
		  return elem.offsetWidth;
	  },
getH: function(elem){
		  return elem.offsetHeight;
	  },
setX: function(elem, pos){
		  elem.style.left = pos + "px";
	  },
setY: function(elem, pos){
		  elem.style.top = pos + "px";
	  },
setW: function(elem, size){
		  elem.style.width = size + "px";
	  },
setH: function(elem, size){
		  elem.style.height = size + "px";
	  }
};

var ua = window.navigator.userAgent.toLowerCase();

SoSo_SmartBox.prototype.Browser = {
	ie: /msie/.test(ua),
		moz: (/gecko/.test(ua) && !/khtml/.test(ua)),
		safari: /safari/.test(ua),
		opera: /opera/.test(ua)
};

sosoInit();

home_url = /http:\/\/[^\/]*/.exec(location.href);

function openUrl(u,t){
	parent.qqweb.portal.openInWebBrowser({url:u,title:(t?t:"浏览网页"),isOpenNewTab:true});
};

function openHome(){
	if(IS_IN_WEBQQ){
		parent.qqweb.portal.openInWebBrowser({isOpenNewTab:false,url:home_url});
		return false;
	}else{
		return true;
	}
}

function openSoso(){
	if(IS_IN_WEBQQ){
		parent.qqweb.portal.openInWebBrowser({isOpenNewTab:false,url:'http://www.soso.com'});
		return false;
	}else{
		return true;
	}
}

function setHomepage(url)
{
	if (document.all)
	{
		try{
			document.body.style.behavior='url(#default#homepage)';
			document.body.setHomePage(url);
		}catch(e){
		}
	}
	else if (window.sidebar)
	{
		if(window.netscape)
		{
			try
			{ 
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
			} 
			catch (e) 
			{ 
				//				alert( "对不起，当前Firefox浏览器的设置下未能启用该功能。"); 
			}
		}
		var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components. interfaces.nsIPrefBranch);
		prefs.setCharPref('browser.startup.homepage',url);
	}
}

var home_url;
var st_get_pre;

function my_st_get(elem,para){
	if(IS_IN_WEBQQ){
		openUrl(elem.href,elem.innerText?elem.innerText:elem.textContent);
	}else{
		window.open(elem.href);
	}
	st_get(elem,st_get_pre+"."+cur_path,para);
	return false;
}

function showHotwords(data){

    var title_to_param = [];

    function genTitleToParamMap(){
        var h3s = document.getElementsByTagName('h3');
        var tables = document.getElementsByTagName('table');
        for(var i=0;i<h3s.length;++i){
            title_to_param.push(
                    {'title':util.trim(h3s[i].innerHTML),
                        'dom':tables[i].getElementsByTagName('p')[0]
                    }
                    );
        }
    }

    function displayHotwordsInDom(dom,data){

        if(!dom||!data||data.length==0){
            return;
        }

        for(var i=0;i<data.length;++i){
            var link = document.createElement('a');
            link.innerHTML = data[i].word;
            link.target='_blank';
            if(data[i].color){
                (link.style.color = data[i].color);
            }
            link.href = data[i].href?data[i].href:'http://www.youdao.com/search?keyfrom=dh.win7000&vendor=dh.win7000_3523&ue=utf8&q='+encodeURIComponent(data[i].word);
            dom.appendChild(link);
        }
        dom.parentNode.parentNode.style.visibility = 'visible';
    }

    function showLevel3Hotwords(title,data){
        for(var i=0;i<title_to_param.length;++i){
            if(title_to_param[i].title==title){
                displayHotwordsInDom(title_to_param[i].dom,data);
                return;
            }
        }
    }

    genTitleToParamMap();
    for(var i=0;i<data.length;++i){
        showLevel3Hotwords(data[i].title,data[i].data);
    }
}

function getHotwords(){
    try{
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', 'http://hao.qq.com/script/everydayKeyData.js?v='+parseInt(Math.random()*100000));
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(script);

        /*
        script = document.createElement('script');
        script.src = 'http://sou.qq.com/online/get_l2_hotwords.php?id='
            +cur_path+'&rand='+Math.random();
        head.appendChild(script);
        */
    }catch(e){
    }
}

function showHotKey(data){
    var sosoKeywords = $('sosoKeywords');
    if(sosoKeywords){
        var links = sosoKeywords.getElementsByTagName('a');
        if(links){
            for(var i=0;i<data.length&&i<links.length;++i){
                links[i].innerHTML = data[i].key;
                links[i].target='_blank';
                if(!data[i].url){
                    links[i].href = "http://www.youdao.com/search?keyfrom=dh.win7000&vendor=dh.win7000_3523&ue=utf8&q="+encodeURIComponent(data[i].key);
                }else{
                    links[i].href = data[i].url;
                }
                if(data[i].color){
                    links[i].style.color = data[i].color;
                }
            }
        }
    }
}

var  gPausePoll = false;

function updateKey(data)
{
    if(!$('sosoKeywords')){
        return;
    }

    if(data.keywords){

        var poll_start = 0;
        var poll_span = 8;
        showHotKey(data.keywords.slice(poll_start,poll_start+poll_span));

        $('sosoKeywords').onmouseover = function(){gPausePoll=true;}
        $('sosoKeywords').onmouseout = function(){gPausePoll=false;}

        setInterval(function(){
            if(gPausePoll) return;
            poll_start+=poll_span;
            if(poll_start>=data.keywords.length){
                poll_start = 0;
            }
            showHotKey(data.keywords.slice(poll_start,poll_start+poll_span) );
        },3000);
    }
}

window.onload = function(){

    getHotwords();

    if(parent&&parent.qqweb&&parent.qqweb.portal&&typeof(parent.qqweb.portal.openInWebBrowser)=="function"){
        IS_IN_WEBQQ = true;
        home_url += "/index_webqq.html";
        st_get_pre = "u01.wq.second";
    }else{
        IS_IN_WEBQQ = false;
        st_get_pre = "u01.so2";
    }

    var home_link = $('home_link');
    if(home_link){
        home_link.href = home_url;
    }

    if(IS_IN_WEBQQ){
        var mainSoso = $('mainSoso');		
        if(mainSoso){
            mainSoso.onsubmit=function(){
                var word = $('soso_input');
                var url = "http://www.youdao.com/search?keyfrom=dh.win7000&vendor=dh.win7000_3523&ue=utf8&q="+encodeURIComponent(word.value);
                openUrl(url);
                return false;
            }
        }
    }

    var logoimg = $('logoimg');
    if(logoimg){
        logoimg.href = home_url;
    }
    if(typeof(pgvMain) == 'function'){
        if(IS_IN_WEBQQ){
            pgvMain("", {virtualDomain: "hao.qq.com",virtualURL:"/"+cur_path+"_webqq.html"});
        }else{
            pgvMain();
        }
    }
}

