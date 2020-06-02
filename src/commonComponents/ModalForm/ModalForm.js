import React from 'react';
import styles from './form.module.scss';

class ModalForm extends React.Component<{}> {
	render() {
		return (
			<div className={styles.modal}>
				{this.props.children}
			</div>
		)
	}
}

export default ModalForm