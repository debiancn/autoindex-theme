$( window ).on( 'load', windowLoaded );

// convenient tool to add .endsWith method to String
if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function(str) {
        return this.slice(-str.length) == str;
    };
}

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
//  var baseUrl = 'http://repo.debiancn.org/info/';
    var baseUrl = '/.theme/info/';
    // search result
    var $result = $('#searchForm .searchResult');
    // result list
    var $list = [];
    var $listBool = false;
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
//                  console.log( data , i);
                } );
            }( i ));
        }
    }

    $search.on( 'keyup', inputFn ).on( 'parse', inputFn ).on( 'focus', inputFn );
    $search.on( 'blur', hideFn );

    function inputFn( event ){
	$result.show();
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
//          console.log( $search.val() );
            $result.empty();
	    $list = [];
            if( $search.val() === "" ){
                return 0;
            }
            for( var k in ajax ){
                if( k === 'codename' ){
                    continue ;
                }
                for( var k1 in ajax[k].main ){
//                  console.log( ajax[k].main );
                    for( var k2 in ajax[k].main[k1] ){
//                      console.log( ajax[k].main[k1][k2].Package );
                        let reg = new RegExp( $search.val(), 'i' );
                        if( reg.test( ajax[k].main[k1][k2].Package ) ) {
                            // Right here. We should implement things
                            // carefully here. WIP.
                            var pkg = ajax[k].main[k1][k2];
                            pkg.Codename = k;
                            // Ignore -dbgsym packages
                            if (pkg.Package.endsWith('-dbgsym')) {
                                continue;
                            }
			    $listBool = false;
			    for( var i=0; i<$list.length; i++ ){
				if( $list[i].Package === pkg.Package ){
				    if(	$list[i].Architecture === pkg.Architecture &&
					$list[i].Codename === pkg.Codename &&
					$list[i].Version === pkg.Version
				    ){
					console.log( pkg.Package, pkg.Architecture, pkg.Codename, pkg.Version );
					$listBool = true;
					break;
				    }
				} 
			    }
			    if( $listBool ){
				continue;
			    }
//                          console.log(pkg);
                            $result.append( $('<li><a href="/'+ pkg.Filename + '">' +
					      pkg.Package + ':' +
					      pkg.Architecture + '/' +
					      pkg.Codename + '/' +
					      pkg.Version + '</a></li>') );
			    $list.push({
				"Package":pkg.Package,
				"Architecture":pkg.Architecture,
				"Codename":pkg.Codename,
				"Version":pkg.Version
			    });
                        }
                    }
                }
            }
        }, 150 );
    }

    function hideFn(){
	$result.hide();
    }
}

