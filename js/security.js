// JavaScript Document
var usernameone = getCookienameone( "usernameone" ),
	pwdone = getCookiepwdone( "passone" );
if ( usernameone=="dsppa" && pwdone=="dsppa" ){}else {
	location.href = './index.html';
}

function getCookienameone( cnameone ) {
	var nameone = cnameone + "=";
	var ca = document.cookie.split( ';' );
	for ( var i = 0; i < ca.length; i++ ) {
		var c = ca[ i ].trim();
		if ( c.indexOf( nameone ) == 0 ) return c.substring( nameone.length, c.length );
	}
	return "";
}

function getCookiepwdone( cpassone ) {
	var passone = cpassone + "=";
	var ca = document.cookie.split( ';' );
	for ( var i = 0; i < ca.length; i++ ) {
		var c = ca[ i ].trim();
		if ( c.indexOf( passone ) == 0 ) return c.substring( passone.length, c.length );
	}
	return "";
}

function setCookie( cnameone, cvaluenameone, cpassone, cvaluepassone ) {
	document.cookie = cnameone + "=" + cvaluenameone;
	document.cookie = cpassone + "=" + cvaluepassone;
}