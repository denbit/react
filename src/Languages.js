import ini from './ini';

export const LanguageList=function () {
    const list={ua:{},pl:{},en:{}};

    window.fetch('/languages/ua.ini').then(function(response) {
       return response.text();
    }).then( (text) =>{

        list.ua=ini.parse(text);
        this.setState({language:list.ua});

        console.log(list);
    });
};



