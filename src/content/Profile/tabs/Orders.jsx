import React from 'react';
import styles  from './orders.module.scss';
import UserService from '../../../services/userService';



class Orders extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {orders:[]};
  }
  componentDidMount() {
      UserService.instance().getCurrentOrders().then(orders=> {
          this.setState({orders});
          } );
  }

    render() {
    return <>
        <h2>Current pending order</h2>
        <table cellPadding='0'  cellSpacing='0' >
            <tr><th>Order #</th><th>Order date</th><th>Order status</th><th>Sent files</th></tr>
            { this.state.orders.map((item)=>
                <tr><td>{item.id}</td><td>{new Date(item.created_at).toDateString()}</td><td>{item.paid?'Waiting result':'Unpaid'}</td><td>{item.details_data}</td></tr>
            )}

        </table>
    </>;
  }
}

export default Orders;
