﻿var bg_ortcal_naming = {
    left : 0,
    top  : 0,
    width: 0,
    height: 0,
	css : document.createElement("link"),
    div : document.createElement("div"),
	bdD : null,
    bdM : null,
    bdY : null,
	
	baptism : 40,

	init: function () {
		bg_ortcal_naming.css.rel = "stylesheet";
		bg_ortcal_naming.css.href= bg_ortcal_baseUrl+"css/st_names.css";
		document.body.appendChild(bg_ortcal_naming.css);
		
		bg_ortcal_naming.div.id = 'bg_ortcal_snames';
		bg_ortcal_naming.div.innerHTML = bg_ortcal_naming.html();
		document.body.appendChild(bg_ortcal_naming.div);
		bg_ortcal_naming.div.style.display = "none";
	},
	html: function() {
	var t = '<table width="100%" class="bg_ortcal_header"><tr><td></td><td width="20px" style="cursor: pointer;" onclick="bg_ortcal_naming.hide();" title="'+bg_ortcal_lang.close+'"><b>х</b></td></tr>';
		t += '<tr><td colspan="2"><p style="margin:12px 0px; font-size: 24px;">'+bg_ortcal_lang.the_title1+'</p></td></tr></table>';
		t += '<div class="bg_ortcal_separator1"></div>';
		t += '<div class="bg_ortcal_separator2"></div>';
		t += '<div id="day1" class="bg_ortcal_day"></div>';
		t += '<table width="100%" class="bg_ortcal_footer"><tr><td width="10%"></td>';
		t += '<td width="80%">'+bg_ortcal_lang.title1+'</td>';
		t += '<td width="10%"></td></tr></table>';
		t += '<div class="bg_ortcal_separator1"></div>';
		t += '<div class="bg_ortcal_separator2"></div>';
		t += '<div id="day8" class="bg_ortcal_day"></div>';
		t += '<table width="100%" class="bg_ortcal_footer"><tr><td width="10%"></td>';
		t += '<td width="80%">'+bg_ortcal_lang.title2+'</td>';
		t += '<td width="10%"></td></tr></table>';
		t += '<div class="bg_ortcal_separator1"></div>';
		t += '<div class="bg_ortcal_separator2"></div>';
		t += '<div id="day40" class="bg_ortcal_day"></div>';
		t += '<table width="100%" class="bg_ortcal_footer"><tr><td id="prevDay" width="10%" style="cursor: pointer;" onclick="bg_ortcal_naming.prevDay();" title="'+bg_ortcal_lang.prev_day+'"><b><<</b></td>';
		t += '<td id="bapID" width="80%">'+bg_ortcal_lang.title3+' '+bg_ortcal_naming.baptism+bg_ortcal_lang.title3a+'</td>';
		t += '<td id="nextDay" width="10%" style="cursor: pointer;" onclick="bg_ortcal_naming.nextDay();" title="'+bg_ortcal_lang.next_day+'"><b>>></b></td></tr></table>';
		t += '<div class="bg_ortcal_bottom1"></div>';
	return t;
	},
	show : function(d, obj) {
		bg_ortcal_naming.bdD = d.getDate();
		bg_ortcal_naming.bdM = d.getMonth()+1;
		bg_ortcal_naming.bdY = d.getFullYear();
		bg_ortcal_naming.draw ();
		bg_ortcal_naming.div.style.display = "block";

		setObj(bg_ortcal_naming.div);
		bg_ortcal_bscal.hide();
	},
	draw : function() {
		var el = document.getElementById("day1");
		el.innerHTML = bg_ortcal_naming.dayInfo(1);
		el = document.getElementById("day8");
		el.innerHTML = bg_ortcal_naming.dayInfo(8);
		el = document.getElementById("day40");
		el.innerHTML = bg_ortcal_naming.dayInfo(40);		
	},
	hide : function() {
		bg_ortcal_naming.div.style.display = "none";
	},
    pos  : function (el) {
        var r = { x: el.offsetLeft, y: el.offsetTop };
        if (el.offsetParent) {
                var tmp = bg_ortcal_naming.pos(el.offsetParent);
                r.x += tmp.x;
                r.y += tmp.y;
        }
	return r;
	},
	prevDay : function () {
		if (bg_ortcal_naming.baptism > 2) {
			bg_ortcal_naming.baptism--;
			var el = document.getElementById("bapID");
			el.innerHTML = bg_ortcal_lang.title2+' '+bg_ortcal_naming.baptism+bg_ortcal_lang.title3;		
			el = document.getElementById("day40");
			el.innerHTML = bg_ortcal_naming.dayInfo(bg_ortcal_naming.baptism);	
		}
	},
	nextDay : function () {
		if (bg_ortcal_naming.baptism < 365) {
			bg_ortcal_naming.baptism++;
			var el = document.getElementById("bapID");
			el.innerHTML = bg_ortcal_lang.title2+' '+bg_ortcal_naming.baptism+bg_ortcal_lang.title3;		
			el = document.getElementById("day40");
			el.innerHTML = bg_ortcal_naming.dayInfo(bg_ortcal_naming.baptism);	
		}
	},
	dayInfo : function(n) {
		var d = new Date(0);
		d.setFullYear(bg_ortcal_naming.bdY, bg_ortcal_naming.bdM-1, bg_ortcal_naming.bdD+n-1);
		return bg_ortcal_getDayInfo(d);
	}
};	
// Перемещение окна naming по экрану
bg_ortcal_naming.div.onmousedown = function(e) { // отследить нажатие
	
	cursorX = parseInt(bg_ortcal_naming.div.style.left)-e.pageX;
	cursorY = parseInt(bg_ortcal_naming.div.style.top)-e.pageY;

	//  отследить движение 
	document.onmousemove = function(e) {
		bg_ortcal_naming.div.style.left = e.pageX + cursorX + 'px';
		bg_ortcal_naming.div.style.top = e.pageY + cursorY + 'px';
	}

	//  отследить окончание переноса
	bg_ortcal_naming.div.onmouseup = function() {
		document.onmousemove = null;
		bg_ortcal_naming.div.onmouseup = null;
	}
}
// Запрет встроенного  Drag'n'Drop 
bg_ortcal_naming.div.ondragstart = function() {
	return false;
};
var bg_ortcal_today = {
    left : 0,
    top  : 0,
    width: 0,
    height: 0,
	css : document.createElement("link"),
    div : document.createElement("div"),
	bdD : null,
    bdM : null,
    bdY : null,
	
	offset : 0,

	init: function () {
		bg_ortcal_today.css.rel = "stylesheet";
		bg_ortcal_today.css.href= bg_ortcal_baseUrl+"css/st_names.css";
		document.body.appendChild(bg_ortcal_today.css);
		
		bg_ortcal_today.div.id = 'bg_ortcal_snames';
		bg_ortcal_today.div.innerHTML = bg_ortcal_today.html();
		document.body.appendChild(bg_ortcal_today.div);
		bg_ortcal_today.div.style.display = "none";
	},
	html: function() {
	var t = '<table width="100%" class="bg_ortcal_header"><tr><td></td><td width="20px" style="cursor: pointer;" onclick="bg_ortcal_today.hide();" title="'+bg_ortcal_lang.close+'"><b>х</b></td></tr>';
		t += '<tr><td colspan="2"><p style="margin:12px 0px; font-size: 24px;">'+bg_ortcal_lang.the_title2+'</p></td></tr></table>';
		t += '<div class="bg_ortcal_separator"></div>';
		t += '<div id="thisDay" class="bg_ortcal_day"></div>';
		t += '<table width="100%" class="bg_ortcal_footer"><tr><td id="prevDay" width="30%" style="cursor: pointer;" onclick="bg_ortcal_today.prevDay();" title="'+bg_ortcal_lang.prev_day+'"><b><< '+bg_ortcal_lang.yesterday+'</b></td>';
		t += '<td width="40%"> </td>';
		t += '<td id="nextDay" width="30%" style="cursor: pointer;" onclick="bg_ortcal_today.nextDay();" title="'+bg_ortcal_lang.next_day+'"><b>'+bg_ortcal_lang.tomorrow+' >></b></td></tr></table>';
	return t;
	},
	show : function(d, obj) {
		bg_ortcal_today.bdD = d.getDate();
		bg_ortcal_today.bdM = d.getMonth()+1;
		bg_ortcal_today.bdY = d.getFullYear();
		var el = document.getElementById("thisDay");
		el.innerHTML = bg_ortcal_today.dayInfo(1);
		bg_ortcal_today.div.style.display = "block";

		setObj(bg_ortcal_today.div);
		bg_ortcal_bscal.hide();
	},
	hide : function() {
		bg_ortcal_today.div.style.display = "none";
	},
    pos  : function (el) {
        var r = { x: el.offsetLeft, y: el.offsetTop };
        if (el.offsetParent) {
                var tmp = bg_ortcal_today.pos(el.offsetParent);
                r.x += tmp.x;
                r.y += tmp.y;
        }
	return r;
	},
	prevDay : function () {
			bg_ortcal_today.offset--;
			el = document.getElementById("thisDay");
			el.innerHTML = bg_ortcal_today.dayInfo(bg_ortcal_today.offset);	
	},
	nextDay : function () {
			bg_ortcal_today.offset++;
			el = document.getElementById("thisDay");
			el.innerHTML = bg_ortcal_today.dayInfo(bg_ortcal_today.offset);	
	},
	dayInfo : function(n) {
		var d = new Date(0);
		d.setFullYear(bg_ortcal_today.bdY, bg_ortcal_today.bdM-1, bg_ortcal_today.bdD+n-1);
		return bg_ortcal_getDayInfo(d);
	}
};	
// Перемещение окна today по экрану
bg_ortcal_today.div.onmousedown = function(e) { // отследить нажатие
	
	cursorX = parseInt(bg_ortcal_today.div.style.left)-e.pageX;
	cursorY = parseInt(bg_ortcal_today.div.style.top)-e.pageY;

	//  отследить движение 
	document.onmousemove = function(e) {
		bg_ortcal_today.div.style.left = e.pageX + cursorX + 'px';
		bg_ortcal_today.div.style.top = e.pageY + cursorY + 'px';
	}

	//  отследить окончание переноса
	bg_ortcal_today.div.onmouseup = function() {
		document.onmousemove = null;
		bg_ortcal_today.div.onmouseup = null;
	}
}
// Запрет встроенного  Drag'n'Drop 
bg_ortcal_today.div.ondragstart = function() {
	return false;
};

