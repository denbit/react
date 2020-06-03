import React from 'react';
import styles  from './orders.module.scss';

export default class OldOrders extends React.Component {
  static state = {};
  static propTypes = {};

  constructor(props) {
    super(props);

  }

  render() {
      return <>
          <h2>Previous orders</h2>
          <table cellPadding='0'  cellSpacing='0'>
              <tr><th>Order #</th><th>Order date</th><th>Result date</th><th>Sent files</th><th>Result files</th></tr>
              <tr><td>Order #</td><td>Order date</td><td>Order status</td><td>Sent files</td><td>Sent files</td></tr>
              <tr><td>Order #</td><td>Order date</td><td>Order status</td><td>Sent files</td><td>Sent files</td></tr>
              <tr><td>Order #</td><td>Order date</td><td>Order status</td><td>Sent files</td><td>Sent files</td></tr>
              <tr><td>Order #</td><td>Order date</td><td>Order status</td><td>Sent files</td><td>Sent files</td></tr>
              <tr><td>Order #</td><td>Order date</td><td>Order status</td><td>Sent files</td><td>Sent files</td></tr>
              <tr><td>Order #</td><td>Order date</td><td>Order status</td><td>Sent files</td><td>Sent files</td></tr>
              <tr><td>Order #</td><td>Order date</td><td>Order status</td><td>Sent files</td><td>Sent files</td></tr>
              <tr><td>Order #</td><td>Order date</td><td>Order status</td><td>Sent files</td><td>Sent files</td></tr>
          </table>
      </>
  }
}
