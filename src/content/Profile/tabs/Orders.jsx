import React from 'react';
import styles  from './orders.module.scss';



class Orders extends React.Component {
  static state = {};
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);

  }

  render() {
    return <>
        <h2>Current pending order</h2>
        <table cellPadding='0'  cellSpacing='0' >
            <tr><th>Order #</th><th>Order date</th><th>Order status</th><th>Sent files</th></tr>
            <tr><td>Order #</td><td>Order date</td><td>Order status</td><td>Sent files</td></tr>
            <tr><td>Order #</td><td>Order date</td><td>Order status</td><td>Sent files</td></tr>
            <tr><td>Order #</td><td>Order date</td><td>Order status</td><td>Sent files</td></tr>
            <tr><td>Order #</td><td>Order date</td><td>Order status</td><td>Sent files</td></tr>
            <tr><td>Order #</td><td>Order date</td><td>Order status</td><td>Sent files</td></tr>
            <tr><td>Order #</td><td>Order date</td><td>Order status</td><td>Sent files</td></tr>
            <tr><td>Order #</td><td>Order date</td><td>Order status</td><td>Sent files</td></tr>
            <tr><td>Order #</td><td>Order date</td><td>Order status</td><td>Sent files</td></tr>
            <tr><td>Order #</td><td>Order date</td><td>Order status</td><td>Sent files</td></tr>

        </table>
    </>;
  }
}

export default Orders;
