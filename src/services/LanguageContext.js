import React from 'react';
export const Language = React.createContext({filler: {}, slides: {},contact_form:{}, profile:{}});

export const LanguageCache = {};
// export function withTranslationProvider(Component, language) {
//
//     return (<Language.Provider value={language}><Component/></Language.Provider>);
// }

export function withTranslationConsumer(Component) {
const {Consumer:LanguageConsumer} = Language;
    return (props) => <LanguageConsumer>
        {value => (value !== null ? (<Component translation={value} {...props}/>) : <Component {...props}/>)}
    </LanguageConsumer>;
}
