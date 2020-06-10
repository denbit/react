import styles from './uploadFile.module.scss';
import Button from '../../../commonComponents/Button/Button';
import React from 'react';

export function CategoryBtn({onClick, name, isActive}) {
  return (
      <>
          <Button small text={name} onClick={onClick}
                  styled={[styles.multiselect, {[styles.active]: isActive}]}/>
      </>
  );
}

CategoryBtn.defaultProps = {isActive: false};
