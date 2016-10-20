function debiancn_getPathName() {
    return window.location.pathname;
}

$(document).ready(function(){
    $("#debiancn-current-pathname").text("您的位置："+debiancn_getPathName());
    var timelist = $(".debiancn-table-time");
    for (var i=0; i<timelist.length; i++) {
        var b = timelist[i];
        var mytext = b.textContent;
        var date = new Date(Date.parse(b.textContent));
        b.textContent = date.toLocaleString();
    }
});
