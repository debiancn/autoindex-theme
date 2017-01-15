$.get('./Debian.html',function( data ){
	data = data.split('<pre>')[1];
	data = data,split('</pre>')[0];
	console.log( data );
});