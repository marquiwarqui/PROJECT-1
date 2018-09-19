var BaseApiGET = function(fullUrl,CallBack){
    $.ajax({
        url: fullUrl,
        method: "GET"
    }).then(CallBack(response));
}