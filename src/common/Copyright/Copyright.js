import style from './Copyright.module.scss'
import React from 'react'


export const Copyright = (props) => {
	return (<small className={style.copyright}>
		Developed by <a href="http://www.lgvi.top" target="_blank">Langivi Code technologies &reg;</a>
	</small>);
};