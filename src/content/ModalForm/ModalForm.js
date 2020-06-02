import React from 'react';
import styles from './form.module.scss';

const ProgressBar = () => <div>ProgressBar</div>

function StageControl() {
    return <div className={styles.modal}>
        <SelectCategories/>
    </div>;
}

function SelectCategories() {
    return <div className={''}>
        Selector
    </div>;
}

class ModalForm extends React.Component<{}> {
    render() {
        return (
            <>
                <ProgressBar/>
                <StageControl/>
            </>
        )
    }
}

export default ModalForm