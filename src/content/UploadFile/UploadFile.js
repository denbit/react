import React, {Component} from 'react'
import Button from '../../commonComponents/Button/Button'
import styles from './UploadFile.module.scss'

class UploadFile extends Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {

        return (
            <>
                <Button styled={styles['upload-btn']}
                        onClick={this.props.onClick}
                        text='Завантажити'/>
            </>
        )
    }
}

export default UploadFile