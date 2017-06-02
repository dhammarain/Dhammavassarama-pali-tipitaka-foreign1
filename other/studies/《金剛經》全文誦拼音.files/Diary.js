function JAD(cid,ftcr,toolbgcr,tblbgcr,key){
	var sfrm= "<iframe marginwidth=0 marginheight=0 frameborder=0 scrolling=no allowTransparency=true ";
	if (typeof(JADTail)=='object')	
		JADTail.innerHTML = sfrm + "src='http://unstat.baidu.com/bdun.bsc?tn=mfzq&cv=1&cid=114226&csid=103&rkcs=5&bgcr="
		+tblbgcr.substring(1)+"&ftcr="+ftcr.substring(1)+"&rk=1&bd=0&bdas=0' width=625 height=40/>";

	if (typeof(JADBar)!='object') return;
	var today= new Date();
	var s= "<iframe allowTransparency=\"true\" marginwidth=0 marginheight=0 frameborder=0 scrolling=no align=center ";
	switch (today.getSeconds() % 1) {
	case 0:
		s = sfrm+"src='http://61.151.248.109/blog/ad/3721.htm' width=135 height=200 align=center/>";
		break;
	case 2:
		s = sfrm+"src='http://union.sogou.com/cpc/partner.php?pid=mfzq&type=5' width=120 height=455 align=center/>";
		break;
	}
	JADBar.innerHTML = s;
}


function SelectAct(Url,Opt) {
	var Str = CheckString('cRec');
	if(Str==''){alert("请指定记录!");return;}
	Str = Url + Str.substring(0,Str.length-1);
	
	if (Opt == 1) {location.href = (Str);return;}
	
	var http = new ActiveXObject("Microsoft.XMLHTTP");
	http.open("POST",Str,false);
	http.setRequestHeader("Content-Type","text/html");	
	http.send(Str);
	if(http.status == 200)	alert(http.responseText);
	else document.write(http.responseText);
}

function CheckString(checkName) {	
	if(eval(checkName)==null) return '';
	if (eval(checkName).length==null) return eval(checkName).value+',';
	var Str = new String();
	for(i=0;i<eval(checkName).length;i++){
		if(eval(checkName)[i].checked)	Str +=eval(checkName)[i].value+',';
	}
	return Str;
}

function SendPad(p) {
	var RecStr = CheckString('iFriend');
	if(RecStr==''){alert("请选择好友");return false;}
	RecStr = RecStr.substring(0,RecStr.length-1);
	location.href = ('PostWords.aspx?Cid='+p+'&Rec='+RecStr);
}

function SelectAll(checkName) {
	if(eval(checkName)==null) return;
	if(eval(checkName).length==null) eval(checkName).checked = true;
	else for(var i=0;i<eval(checkName).length;i++) eval(checkName)[i].checked = true;
}

function SelectNot(checkName) {
	if(eval(checkName)==null) return;
	if(eval(checkName).length==null) eval(checkName).checked = !eval(checkName).checked;
	else for(var i=0;i<eval(checkName).length;i++) eval(checkName)[i].checked = !eval(checkName)[i].checked;
}

function PostDiary(p) {
	window.open("/Blog/PostWords.aspx?cid="+p,
	"PostWords","width=450,height=300,resizable=yes,scrollbars=yes,status=no,left=300,top=200");
}

function ToolBox(m,p,q) {
	window.open('/blog/DiaryTools.aspx?cid='+m+'&tid='+p+'&rid='+q);
}

function SoGo(){
	var key=document.getElementById('iSoKey').value;
	window.open('http://www.baidu.com/baidu?tn=mfzq&ct=&lm=&z=&rn=&word='+key);
}

function StkGo() {
	var info=parseInt(document.getElementById('sStkInfo').value);
	var code=document.getElementById('iStkCode').value;
	var reg = /^\d{6}$/;
	if (! reg.test(code)) {
		if (info == 0) {alert('请输入有效代码(6位数字)');return'';}
		else code='';
	}
	switch (info)
	{
		case 0:location.href='/Blog/Diary.aspx?stk='+code;return;
		case -1:location.href='/Blog/Diary.aspx?fid=V&stk='+code;return;
		case -10:location.href='/mfpage/datachannel/gd.asp?gpdm='+code;return;
		case -11:location.href='/MFPortal/DataChannel/DataChannel.aspx?action=G3&gpdm='+code;return;
		case -12:location.href='/MFpage/DataChannel/stock_show.asp?gpdm='+code;return;
	}
	if (code=='') location.href='/Blog/Diary.aspx?data=I&cid=1088&bid='+info;
	else location.href='/Blog/Diary.aspx?data=I&stk='+code+'&bid='+info;
} 

var SpecialDay="";
var arrdd=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var MonthNow = new String;

function SetCalShow(opt,whereX,whereY,where) {
	if (where != null && eval(where).innerHTML=='') CalShow(0,0,0,where,0);
	if (opt==1)
	{	//alert("top:"+window.event.clientX+" left:"+window.event.clientY);
		if (CalLayer.style.display != '') {
				if(whereX>-1 && whereY>-1){
					CalLayer.style.top = whereY;CalLayer.style.left = whereX > 580 ? 580:whereX;
				}
				CalLayer.style.display = '';
		}
		return;
	}
	if (CalLayer.style.display == '') CalLayer.style.display = 'none';
}

function CalSel(where) {
  node = document.getElementById("CalendarURL");if (node==null) return;
  calendarURL = node.value;
  location.href = calendarURL+'&dir=L&key='+MonthNow+'-'+eval(where).innerHTML+
  (calendarURL.charAt(calendarURL.length-1) == 'S' ? '':' 23:59:59.999'); 
}

function CalCell(dm,todayIF,classnow) {
	if (dm>todayIF) return "<td"+classnow+">"+dm+"</td>";
	if(dm==todayIF) return "<td class=DateTodayCell onclick=CalSel(this)>"+dm+"</td>";
	dt = MonthNow+"-"+dm;
	if(SpecialDay.indexOf(dt)>=0) return "<td class=DateSpecialCell onclick=CalSel(this)>"+dm+"</td>";
	return "<td"+classnow+" onclick=CalSel(this)>"+dm+"</td>";
}

function CalShow(yy,mm,showStyle,where,dd) {
	var today = new Date();
	if (yy==0) { yy=today.getYear();mm=today.getMonth()+1;}
	dd=yy*12+mm+dd;	yy = parseInt(dd/12);mm = dd %12;if (mm==0) {mm=12;yy--;}
	
	var todayIF = 32;
	if (yy==today.getYear() && mm==today.getMonth()+1) todayIF = today.getDate();
	
	dd=arrdd[mm-1];
	
	if(mm==2) {
		if (yy%4==0 || (yy%100==0 && yy%400==0)) {dd=29;arrdd[1]=29;} else {dd=28;arrdd[1]=28;}
	}
	
	MonthNow = yy+"-"+mm;
	var tablesplit = '<table border=0 cellpadding=0 cellspacing=0><tr height=3 class=toolbg><td> </td></tr></table>';
	var click = "<span onclick=CalShow("+yy+","+mm+","+showStyle+",'"+where+"',";
	var tablehead = click+"-12)><<</span>"+click+"-1)>　<　</span>:: <b>"+MonthNow+"</b> ::"+click+"1)>　>　</span>"+click+"12)>>></span></td></tr>";
	var tabledate = '<table Style="table-layout:fixed;width:163;border:0" cellspacing=1 cellpadding=1 class=DateBorder align=center>';
	var trdate = '<tr height=18 class=DateCell align=center valign=middle>';

	if (showStyle ==1) {
		Hout='<table Style="table-layout:fixed;width:170;border:0" cellspacing=0 cellpadding=0 align=center><tr height=23 class=toolbar align=center valign=middle><td>';
		Hout+=tablehead;
		Hout+="</table>"+tablesplit+tabledate+trdate;	
	}
	else {
		Hout=tabledate+'<td class=dateHead colspan=7>';
		Hout+=tablehead+trdate;
	}
	Hout+='<td class=DateWeekendCell width=21>日</td><td width=21>一</td><td  width=21>二</td><td width=21>三</td><td width=21>四</td><td width=21>五</td><td class=DateWeekendCell width=21>六</td></tr>';
	Hout+=trdate;
	today.setFullYear(yy,mm-1,1);
	wdaystart=today.getDay();
	wdayend = wdaystart + dd;
	loop = wdayend > 35 ? 42:35;
	for(i=1;i<=loop;i++) {
		j = i % 7;
		var classnow = (j==0||j==1) ? " class=DateWeekEndCell":"";
		if (wdaystart<i && i<=wdayend) {	
			cs=i-wdaystart;Hout+=CalCell(cs,todayIF,classnow);
		}
		else {
			Hout+="<td"+classnow+"> </td>";
		}
		if (j==0) Hout+=(i==loop)?"":"</tr>"+trdate;
	}
	Hout+="</tr></table>";	
	if (showStyle ==1) Hout+=tablesplit;
	eval(where).innerHTML=Hout;
}