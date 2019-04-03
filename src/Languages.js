import ini from './ini';
export const LanguageList=function () {
    let list={ua:{},pl:{},en:{}};
    var ua='';
    window.fetch('/languages/ua.ini').then(function(response) {
       // alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
       // alert(response.status); // 200

        return response.text();
    }).then(function (text) {
        ua=text;
        ua=ini.parse(ua);
        console.log(ua);
        return ua;
    });
    console.log(ua);
    return list;


}();



