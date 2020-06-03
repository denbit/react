import {HashRouter} from 'react-router-dom';
import React from 'react';
import {withTranslationConsumer} from '../../services/LanguageContext';
import {withUserConsumer} from '../../services/UserContext';
import Profile from './Profile';

 const ProfileWrapper = (props) => {

  return (<HashRouter>   <Profile own={{...props}}/>

  </HashRouter>);
};
 const WrappedProfile=withTranslationConsumer(withUserConsumer(ProfileWrapper));
export {WrappedProfile};
