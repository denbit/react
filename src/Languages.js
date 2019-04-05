import ini from './ini';

export const LanguageList=function ( lang='ua') {
    const list={ua:{},pl:{},en:{}};

    window.fetch('/languages/'+lang+'.ini').then(function(response) {
       return response.text();
    }).then( (text) =>{

        list[lang]=ini.parse(text);
        this.setState({language:list[lang]});

        console.log(list);
    });
};



