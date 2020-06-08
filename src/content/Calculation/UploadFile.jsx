import React, {useState} from 'react';
import styles from './uploadFile.module.scss';
import tabStyle from './tabs.module.scss';
import {translate} from '../../func.list';
import {withTranslationConsumer} from '../../services/LanguageContext';
import Button from '../../commonComponents/Button/Button';

function CategoryBtn({onClick, name, isActive}) {
    return (
        <>
            <div className={styles['category-btn']}>
                <Button small text={name} onClick={onClick}
                        styled={[styles.multiselect, {[styles.active]: isActive}]}/>
            </div>
        </>
    );
}

CategoryBtn.defaultProps = {isActive: false};

function CollectionUploadedFilesBtn(props) {
    return (
        <>
            <Button small text='some'
                    onClick={() => {
                    }}
                    styled={[styles['file-items'],styles.multiselect]}
            />

        </>
    );
}

function OpenEditorBtn(props) {
    return (
        <>
            <Button small text='Open editor' onClick={() => {
            }} className={styles['open-editor-btn']}/>

        </>
    );
}

function UploadFileBtn({onUpload}) {
    const input = React.createRef();
    return (
        <>
            <input type="file" id="input" multiple ref={input} onChange={() => onUpload(input)}
                   className={styles['input-file']}/>
            <Button small text='Upload file'
                    className={styles['upload-file-btn']}
                    onClick={() => input.current.click()}
            />

        </>
    );
}

function AlreadyUploadedBtn(props) {
    return (
        <>
            <div>
                <Button small text='Already uploaded'
                        onClick={() => {}}
                        className={styles['already-uploaded-btn']}
                />
            </div>
        </>
    );
}

function UploadFile({translation, methods: {initUpload}, stageActions: {firstStep: {selectedCategories, categories}}}) {
    const [currentlySelected, setCurrentlySelected] = useState(0);

    return (
        <section>
            <div className={tabStyle.id_label}>
                <h2>{translate(translation, 'calculation_section.upload_file')}</h2>
            </div>
            <hr/>
            <div className={styles.wrapper}>
                {selectedCategories && selectedCategories.map((category, index, array) => {
                    return (
                        <div key={category.id} className={styles['category-container']}>
                            <CategoryBtn onClick={() => {
                                setCurrentlySelected(index);
                            }} name={category.name}
                                         id={category.id} isActive={index === currentlySelected}/>
                            {index === currentlySelected && <>
                                <CollectionUploadedFilesBtn/>
                                <OpenEditorBtn/>
                                <UploadFileBtn onUpload={(input) => initUpload(input, category.type)}/>
                                <AlreadyUploadedBtn/>
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
