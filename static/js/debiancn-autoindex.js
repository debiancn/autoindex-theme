function debiancn_getPathName() {
    return window.location.pathname;
}

$(document).ready(function(){
    $("#debiancn-current-pathname").text("您的位置："+debiancn_getPathName());
});
