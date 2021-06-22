$(".btn").on("click", function () {
    location.reload();
});

$(document).ready(function () {
    console.log("ready")
    $("body").scroll(function () {
        console.log('logging');
        $('#header').css("opacity", 1 - $("body").scrollTop() / 700);
    });
})



/*var resizeId;

$(window).resize(function(){
    var fontSize = window.getComputedStyle(document.getElementById("xd")).fontSize;

    clearTimeout(resizeId);
    resizeId = setTimeout(afterResizing, 500);
})

function afterResizing(){
    if(!$("#xd").visible()){
        $("#xd").css("font-size", 10)
    }
}*/