$( window ).on( 'load', windowLoaded );

// convenient tool to add .endsWith method to String
if (typeof String.prototype.endsWith != 'function') {
        String.prototype.endsWith = function(str) {
                return this.slice(-str.length) == str;
        };
}

// compatible implementation of string representation of a node
var getDomString = (function() {
        var DIV = document.createElement("div");

        if ('outerHTML' in DIV) {
                return function(node) {
                        return node.outerHTML;
                };
        };

        return function(node) {
                var div = DIV.cloneNode();
                div.appendChild(node.cloneNode(true));
                return div.innerHTML;
        };
})();

// Modifying prototype to provide filesize conversion
Object.defineProperty(Number.prototype,'fileSize',{value:function(a,b,c,d){
        return (a=a?[1e3,'k','B']:[1024,'K','iB'],b=Math,c=b.log,
                d=c(this)/c(a[0])|0,this/b.pow(a[0],d)).toFixed(2)
                +' '+(d?(a[1]+'MGTPEZY')[--d]+a[2]:'Bytes');
},writable:false,enumerable:false});

// pop-up result window when clicked
function popPackageDescription(pkg) {
        var popNode = document.createElement("div");
        var headerNode = document.createElement("h2");
        headerNode.appendChild(document.createTextNode(pkg.Package));
        popNode.appendChild(headerNode);
        popNode.appendChild(document.createElement("hr"));
        var bodyNode = document.createElement("table");
        // XXX: could be better here
//      console.log(pkg);
        //bodyNode.append($('<tr><td>描述：</td><td>' + pkg.Description + '</td></tr>')[0]); // too lang
        bodyNode.append($('<tr><td>架构：</td><td>' + pkg.Architecture + '</td></tr>')[0]);
        bodyNode.append($('<tr><td>发行版：</td><td>' + pkg.Codename + '</td></tr>')[0]);
        bodyNode.append($('<tr><td>版本：</td><td>' + pkg.Version + '</td></tr>')[0]);
        bodyNode.append($('<tr><td>大小：</td><td>' + (parseInt(pkg.Size)).fileSize() + '</td></tr>')[0]);
        bodyNode.append($('<tr><td>SHA256：</td><td>' + pkg.SHA256 + '</td></tr>')[0]);
        bodyNode.append($('<tr><td>链接：</td><td><a href="' + pkg.Filename + '">' + pkg.Filename + '</a></td></tr>')[0]);
        popNode.appendChild(bodyNode);

        $.fancybox.open(getDomString(popNode));
        return false;
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
        //  var baseUrl = './info/';
        //  var baseUrl = 'http://repo.debiancn.org/info/';
        var baseUrl = '/info/';
        // search result
        var $result = $('#searchForm .searchResult');
        var $list = {};
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
                                                        for ( var i=0; i<$list.length; i++ ){
                                                                if( $list[i].Package == pkg.Package ){
                                                                        if($list[i].Architecture === pkg.Architecture &&
                                                                                $list[i].Codename === pkg.Codename &&
                                                                                $list[i].Version === pkg.Version
                                                                        ){
                                                                                console.log( pkg.Package, pkg.Architecture, pkg.Codename, pkg.Version );
                                                                                $listBool = true;
                                                                                break;
                                                                        }
                                                                }
                                                        }
                                                        if ( $listBool ) {
                                                                continue;
                                                        }
//                                                      console.log(pkg);
                                                        var search_result_node = $('<li>' + pkg.Package + ':' + pkg.Architecture + '/' + pkg.Codename + '/' + pkg.Version + '</li>');
                                                        search_result_node.data('pkg', pkg);
                                                        search_result_node.click(function(){popPackageDescription($(this).data('pkg'));});//popPackageDescription(pkg)};
                                                        $result.append(search_result_node);
                                                        $list.push({
                                                                "Package": pkg.Package,
                                                                "Architecture": pkg.Architecture,
                                                                "Codename": pkg.Codename,
                                                                "Version": pkg.Version
                                                        });
                                                }
                                        }
                                }
                        }
                }, 150 );
        }

        function hideFnReal(result_node) {
                result_node.hide();
        }
        function hideFn() {
                setTimeout(hideFnReal, 100, $result);
        }
}

