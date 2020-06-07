import React from "react";
import tabStyle from './tabs.module.scss'
import {translate} from '../../func.list';
import {withTranslationConsumer} from '../../services/LanguageContext';

function SuccessModal({translation}) {
	return (
			<section>
                <div className={tabStyle.id_label}>
                    <h2>{translate(translation,'calculation_section.success_tab_title')}</h2>
                </div>
                <hr/>

			</section>
	)

}

export default withTranslationConsumer(SuccessModal)
