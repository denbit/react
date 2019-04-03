import ini from './ini';

export const LanguageList=function () {
    let list={ua:{},pl:{},en:{}};

    window.fetch('/languages/ua.ini').then(function(response) {
       return response.text();
    }).then( (text) =>{let
        ua=text;
        ua=ini.parse(ua);

        list.ua=ua;
        console.log(list);
    });
    return list;
}();



