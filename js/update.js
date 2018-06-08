/*
* @Author: Administrator
* @Date:   2017-12-18 18:23:19
* @Last Modified by:   Administrator
* @Last Modified time: 2018-01-24 12:00:51
*/
/*function protocal_login(user, pass) {
    return protocal_checkresult("login", user, protocal_callcgi_one("login:" + user + "&" + pass))
}*/
function protocal_login_one(user, pass)
 {
	return protocal_checkresult_one("login",user, protocal_callcgi_one("login:"+user+"&"+pass))
 }
/**
 * [get 获取参数]
 * @param  {[type]} strParameter 参数名 [description]
 * @return {[type]}              [description]
 */
/*function protocal_get_one(name, values) {
    var result;
    if (values == null) {
        result = protocal_callcgi_one("get:" + name);
    } else {
        result = protocal_callcgi_one("get:" + name + "&" + values);
    }
    return protocal_checkresult("get", name, result);
}

function protocal_set_one(name, values) {
    return protocal_checkresult("set", name, protocal_callcgi_one("set:" + name + "%" + "%" + values));
}*/

function protocal_get_one(name,values) {
	var result;
	if (values==null){
		result = protocal_callcgi_one("get:" + name );
	}else{
		result = protocal_callcgi_one("get:" + name + "&" + values);
	}
	return protocal_checkresult_one("get",name,result);
}

function protocal_set_one(name,values) {
	return protocal_checkresult_one("set",name,protocal_callcgi_one("set:" + name + "&" + values));
}
/**
 * [parseResponseString 解析CGI返回值]
 * @param  {[type]} strtext [description]
 * @return {[type]} json text(
 * 1.get   command:get,property:name,values:value1&value2.....
 * 2.set   command:set,property:ok/fail,values:cause
 * 3.error command:error,property:cause,values:null
 * 4.login command:login,property:ok/fail,values:cause)[description]
 */
/*function protocal_parseResponseString(strtext) {
    //alert(strtext + " len:" + strtext.length);
    var retvalue = {
        "command": "",
        "property": "",
        "values": ""
    };
    //1.find command
    var pos = strtext.indexOf(":");
    if (pos == -1)
        throw "parse string none : ";
    retvalue["command"] = strtext.substr(0, pos);

    //get remian text
    strtext = strtext.substr(pos + ":".length, strtext.length - pos - ":".length);
    //2.find property
    pos = strtext.indexOf("&");
    if (pos == -1) {
        retvalue["property"] = strtext;
        return retvalue;
    } else {
        retvalue["property"] = strtext.substr(0, pos);
        //get remain text
        strtext = strtext.substr(pos + "&".length, strtext.length - pos - "&".length);
    }
    //3.find values
    retvalue["values"] = strtext;
    return retvalue;
}

function protocal_callcgi_one(strParameter) {
    var xmlhttp_object = protocal_createXHR();
    var URL = "cgi-bin/WebCGIUpdate.cgi?" + strParameter;
    var xmlhttp_status;
    if (xmlhttp_object) {
        xmlhttp_object.open("GET", URL, false);
        xmlhttp_object.setRequestHeader("If-Modified-Since", "0");
        xmlhttp_object.send();
        xmlhttp_status = xmlhttp_object.status;
        //:walertalert("status:"+xmlhttp_object.status+" respons:" + xmlhttp_object.responseText);
        if (200 == xmlhttp_status) {
            return xmlhttp_object.responseText;
        } else {
            //alert("status:"+xmlhttp_object.status+" respons:" + xmlhttp_object.responseText);
        }
        xmlhttp_object = null;
    } else {
        alert('please check the Bowser!');
    }
    return null;
}
*/
function protocal_parseResponseString_one(strtext){	
	//alert(strtext + " len:" + strtext.length);
	var retvalue = {"command":"","property":"","values":""};
	//1.find command
	var pos = strtext.indexOf(":");
	if (pos==-1)
		throw "parse string none : ";
	retvalue["command"] = strtext.substr(0,pos);
	
	//get remian text
	strtext = strtext.substr(pos+":".length,strtext.length-pos-":".length);
	//2.find property
	pos = strtext.indexOf("&");
	if (pos==-1){		
		retvalue["property"] = strtext;
		return retvalue;
	}
	else{
		retvalue["property"] = strtext.substr(0,pos);
		//get remain text
		strtext = strtext.substr(pos+"&".length,strtext.length-pos-"&".length);
	}
	//3.find values
	retvalue["values"] = strtext;
	return retvalue;
}
function protocal_callcgi_one(strParameter) {
	var xmlhttp_object = protocal_createXHR();
	var URL = "/cgi-bin/WebCGIUpdate.cgi?" + strParameter;
	var xmlhttp_status;
	if (xmlhttp_object) {
		xmlhttp_object.open("GET", URL, false);
		xmlhttp_object.setRequestHeader("If-Modified-Since", "0");
		xmlhttp_object.send();
		xmlhttp_status = xmlhttp_object.status;
		//:walertalert("status:"+xmlhttp_object.status+" respons:" + xmlhttp_object.responseText);
		if(200 == xmlhttp_status){
			return xmlhttp_object.responseText;
		}else{
			//alert("status:"+xmlhttp_object.status+" respons:" + xmlhttp_object.responseText);
		}
		xmlhttp_object = null;
	} else {
		alert('please check the Bowser!');
	}
	return null;
}
/*function protocal_checkresult(command, name, result) {
    //alert(result);
    if (result == null) {
        throw "result string is null";
    }
    var json = protocal_parseResponseString(result);

    //alert("command:"+json["command"]+" name:"+json["property"] + " values:"+json["values"]);
    if (json["command"] == "error")
        throw json["property"];

    if ((json["command"] != command) || (json["property"] != name))
        throw "return error:" + result;

    var arrayvalue = json["values"].split("&");
    if (arrayvalue.length < 1)
        throw "return:" + result + " none values";
    if (command == "set" || command == "login") {
        if (arrayvalue[0] == "SUCCESS") {
            return arrayvalue;
        } else if(arrayvalue[0] == "FAILED_RETRY") {
            return arrayvalue;           
        } else if(arrayvalue[0] == "TOOSNOTENOUGH"){
            return arrayvalue;
        } else if(arrayvalue[0] == "FAILED"){
            return arrayvalue;           
        } else if(arrayvalue[0] == "FILE_ERROR"){
            return arrayvalue;           
        } else if(arrayvalue[0] == "FAILED_RESTORE"){
            return arrayvalue;           
        } else if(arrayvalue[0] == "NONEEDUPGRADE"){
            return arrayvalue;
        } else if(arrayvalue[0] == "UPMAINROOTFS"){
            return arrayvalue;
        } else if(arrayvalue[0] == "NEEDMAINUP"){
            return arrayvalue;    
        } else if(arrayvalue[0] == "UPUPGRADEPRO"){
            return arrayvalue;
        } else if(arrayvalue[0] == "UPGRADENOW"){
            return arrayvalue;
        } else if(arrayvalue[0] == "ok"){
        	return arrayvalue;
        } else if(arrayvalue[0] == "fail"){
        	if (arrayvalue.length==2)
				throw arrayvalue[1];
			else
				throw "return get fail none cause or more 1 causes."+result;
        }
        else
            throw "get command return none SUCCESS/NEEDMAINUP/FAILED_RETRY/TOOSNOTENOUGH/FAILED/FILE_ERROR/FAILED_RESTORE/NONEEDUPGRADE/UPMAINROOTFS/UPUPGRADEPRO/UPGRADENOW. " + result;
    } else if (command == "get") {
        return arrayvalue;
    } else throw "not support command." + result;
}

function protocal_createXHR() {
    //alert('in createXHR');
    var xmlhttp = null;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else if (window.ActiveXObject)
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    else
        xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
    if (xmlhttp) {; //alert('create xmlhttp success!');
    } else
        alert('create xmlhttp error!');
    return xmlhttp;
}*/

function protocal_checkresult_one(command,name,result){
	//alert(result);
	if (result==null){
		return "result string is null";
	}
	var json = protocal_parseResponseString_one(result);
	
	//alert("command:"+json["command"]+" name:"+json["property"] + " values:"+json["values"]);
	if (json["command"]=="error")
		throw json["property"];	
	
	if ( (json["command"]!=command) || (json["property"]!=name))
		throw "return error:"+result;
	
	var arrayvalue = json["values"].split("&");
	if (arrayvalue.length<1)
		throw "return:"+result+" none values";
	if (command == "set" || command == "login") {
        if (arrayvalue[0] == "SUCCESS") {
            return arrayvalue;
        } else if(arrayvalue[0] == "FAILED_RETRY") {
            return arrayvalue;           
        } else if(arrayvalue[0] == "TOOSNOTENOUGH"){
            return arrayvalue;
        } else if(arrayvalue[0] == "FAILED"){
            return arrayvalue;           
        } else if(arrayvalue[0] == "FILE_ERROR"){
            return arrayvalue;           
        } else if(arrayvalue[0] == "FAILED_RESTORE"){
            return arrayvalue;           
        } else if(arrayvalue[0] == "NONEEDUPGRADE"){
            return arrayvalue;
        } else if(arrayvalue[0] == "UPMAINROOTFS"){
            return arrayvalue;
        } else if(arrayvalue[0] == "NEEDMAINUP"){
            return arrayvalue;    
        } else if(arrayvalue[0] == "UPUPGRADEPRO"){
            return arrayvalue;
        } else if(arrayvalue[0] == "UPGRADENOW"){
            return arrayvalue;
        } else if(arrayvalue[0] == "ok"){
        	return arrayvalue;
        } else if(arrayvalue[0] == "fail"){
        	if (arrayvalue.length==2)
				throw arrayvalue[1];
			else
				throw "return get fail none cause or more 1 causes."+result;
        }
        else
            throw "get command return none SUCCESS/NEEDMAINUP/FAILED_RETRY/TOOSNOTENOUGH/FAILED/FILE_ERROR/FAILED_RESTORE/NONEEDUPGRADE/UPMAINROOTFS/UPUPGRADEPRO/UPGRADENOW. " + result;
    } else if (command == "get") {
        return arrayvalue;
    } else throw "not support command." + result;
}
/*
 * @Author: Administrator
 * @Date:   2017-09-01 08:56:39
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-01-24 12:00:09
 */
/**
 * cgi登录，解析
 * @param  {[type]} user [description]
 * @param  {[type]} pass [description]
 * @return {[type]} cgi字符串 [description]
 */
function protocal_createXHR() {
	//alert('in createXHR');
	var xmlhttp = null;
	if (window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else if (window.ActiveXObject)
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	else
		xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
	if (xmlhttp) {; //alert('create xmlhttp success!');
	} else
		alert('create xmlhttp error!');
	return xmlhttp;
}
/**
 * [get 获取参数]
 * @param  {[type]} strParameter 参数名 [description]
 * @return {[type]}              [description]
 */

/**
 * [parseResponseString 解析CGI返回值]
 * @param  {[type]} strtext [description]
 * @return {[type]} json text(
 * 1.get   command:get,property:name,values:value1&value2.....
 * 2.set   command:set,property:ok/fail,values:cause
 * 3.error command:error,property:cause,values:null
 * 4.login command:login,property:ok/fail,values:cause)[description]
 */





