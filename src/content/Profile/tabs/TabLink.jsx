import React from 'react';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames';
import styles from './tabLink.module.scss';
function TabLink(props) {
    return <>
        {props.isParent&&props.router
        ?
        <NavLink replace to={''} className={classNames(styles.link, props.className, {[styles.link__active]:props.isActive})} onClick={()=>props.router.push(props.to, props.data)}>
            {props.children}
        </NavLink>
        :
        <NavLink replace className={classNames(styles.link, props.className, {[styles.link__active]:props.isActive})} to={props.to}>
            {props.children}
        </NavLink>}</>;
}

TabLink.defaultProps = {}

export default TabLink;
