function debiancn_getPathName() {
    return window.location.pathname;
}

function searchPackageExternal() {
    var package_name = $("#package-search-input")[0].value.toString();
    window.location.href = "https://github.com/debiancn/repo/search?utf8=✓&q=" + package_name;
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
