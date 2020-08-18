import React, {useEffect} from 'react';
import tabStyle from './tabs.module.scss'
import {translate} from '../../func.list';
import {withTranslationConsumer} from '../../services/LanguageContext';
import style from './dataProcess.module.scss'

function DataProcess({translation,stageActions:{secondStep:{ids}},methods:{startDataProcess}}) {
    useEffect(()=>startDataProcess(ids),[])
    const ProccessWindow = (<section>
        <div className={tabStyle.id_label}>
            <h2>{translate(translation,'calculation_section.process_tab_title')}</h2>
        </div>
        <hr/>
        <div className={style.loader}>

        </div>
    </section>);
    const SuccessWindow = (<section>
        <div className={tabStyle.id_label}>
            <h2>{translate(translation,'calculation_section.success_tab_title')}</h2>
        </div>
        <hr/> </section>);
	return (ProccessWindow);

}

export default withTranslationConsumer(DataProcess)
