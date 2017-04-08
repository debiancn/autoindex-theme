$(window).on( 'load', function(){
    // nav list
    var $navLi = $('#header .navList li');
    // nav list button
    var $navBtn = $('#header .topNav .navL .images');
    // mouse over event
    $.each( $navLi, function(){
        $(this).on( 'mouseover', function(){
            $(this).addClass('mouseover');
        }).on( 'mouseleave', function(){
            $(this).removeClass('mouseover');          
        } );
    });
    // nav list button
    $navBtn.on( 'click', function(){
        $('#header .navList').hide();
    } );
} );