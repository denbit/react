import React, {useState} from 'react';
import styles from './uploadFile.module.scss';
import tabStyle from '../tabs.module.scss';
import {translate} from '../../../func.list';
import {withTranslationConsumer} from '../../../services/LanguageContext';
import {AlreadyUploadedBtn} from './AlreadyUploadedBtn';
import {UploadFileBtn} from './UploadFileBtn';
import {OpenEditorBtn} from './OpenEditorBtn';
import {CollectionUploadedFilesBtn} from './CollectionUploadedFilesBtn';
import {CategoryBtn} from './CategoryBtn';

function UploadFile({translation, methods: {initUpload, removeFileFromState, addFileClick}, stageActions: {firstStep: {selectedCategories}, secondStep: {selectedFiles}}}) {
    const [currentlySelected, setCurrentlySelected] = useState(0);

    return (
        <section>
            <div className={tabStyle.id_label}>
                <h2>{translate(translation, 'calculation_section.upload_file')}</h2>
            </div>
            <hr/>
            <div className={styles.wrapper}>
                {selectedCategories && selectedCategories.map((category, index) => {
                    return (
                        <div key={category.id} className={styles['category-container']}>
                            <CategoryBtn onClick={() => {
                                setCurrentlySelected(index);
                            }} name={category.name}
                                         id={category.id} isActive={index === currentlySelected} />
                            {index === currentlySelected && <>

                                <CollectionUploadedFilesBtn categoryType={category.type} selectedFiles={selectedFiles} removeFileFromState={removeFileFromState}/>
                                <AlreadyUploadedBtn categoryType={category.type} selectedFiles={selectedFiles[category.type]} addFileClick={addFileClick}/>
                                <OpenEditorBtn/>
                                <UploadFileBtn onUpload={(input) => initUpload(input, category.type)} />

                            </>
                            }
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default withTranslationConsumer(UploadFile);
