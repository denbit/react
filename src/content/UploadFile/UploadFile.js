import React, {Component} from 'react'
import Button from '../../commonComponents/Button/Button'
import styles from './UploadFile.module.scss'
import ModalForm from "../ModalForm";

class UploadFile extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isShow:false
        }
    }
    render() {
        return(
            <>
                <Button styled={styles['upload-btn']}
                       onClick = {()=>this.setState({isShow:!this.state.isShow})}
                        text='Завантажити' {...this.state}/>
                {this.state.isShow && <ModalForm></ModalForm>}
            </>
        )
    }
}

export default UploadFile