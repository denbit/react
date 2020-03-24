import React, {Component} from 'react'
import Button from '../../commonComponents/Button/Button'
import styles from './UploadFile.module.scss'
class UploadFile extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {small:false}
    }
    render() {
        return(
            <>
                <Button styled={styles['upload-btn']}
                       // onClick = {()=>this.setState({small:!this.state.small})}
                        text='Завантажити' {...this.state}/>
            </>
        )
    }
}

export default UploadFile