$( window ).on( 'load', windowLoaded );
function windowLoaded(){
    // search input 
    var $search = $('#search');
    // search button
    var $searchSubmit = $('#search-submit');
    // search form
    var $searchForm = $('#searchForm');
    // search timer
    var $timer = null;
    // 
    var ajaxReady = false;
    // base url
//    var baseUrl = './info/';
    var baseUrl = 'http://repo.debiancn.org/info/';
    // search result
    var $result = $('#searchForm .searchResult');
    var ajax = {
	'codename': baseUrl + 'codename.json'
    };
    $.get( ajax.codename, ajaxFn );
    function ajaxFn( data ){
	ajax.codename = data;
	for( var i in data ){
	    (function( i ){
		ajax[i] = baseUrl + i + '.json';
		$.get( ajax[i], function( data ){
		    ajax[i] = data;
//		    console.log( data , i);
		} );
	    }( i ));
	}
    }
    $search.on( 'keyup', inputFn ).on( 'parse', inputFn );
    function inputFn( event ){
	clearTimeout( $timer );
	$timer = setTimeout(function(){
	    for( var j in ajax ){
		if( !ajaxReady ){
		    if( typeof( ajax[j] ) === 'string'  ){
			return false;
		    }
		}
		ajaxReady || ( ajaxReady = true );
	    }
	    // show search result 
//	    console.log( $search.val() );
	    $result.empty();
	    if( $search.val() === "" ){
		return ;
	    }
	    for( var k in ajax ){
		if( k === 'codename' ){
		    continue ;
		}
		for( var k1 in ajax[k].main ){
//		    console.log( ajax[k].main );
		    for( var k2 in ajax[k].main[k1] ){
//			console.log( ajax[k].main[k1][k2].Package );
			let reg = new RegExp( $search.val(), 'i' );
			if( reg.test( ajax[k].main[k1][k2].Package ) ){
			    $result.append( $('<li>'+ ajax[k].main[k1][k2].Package +'</li>') );
			}
		    }
		}
	    }
	}, 150 );
    }
}
