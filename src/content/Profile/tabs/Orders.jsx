import React from 'react';
import styles from './orders.module.scss';
import UserService from '../../../services/userService';
import InboundData from "./commonComponents/InboundData";

class Orders extends React.Component {

    static propTypes = {};
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            ids: new Set(),
        };
    }

    componentDidMount() {
        UserService.instance().getCurrentOrders().then(orders => {
            this.setState({orders});
            this.createIds()
        });
    }

    createIds(){
        const newState = {...this.state}
        newState.orders.forEach((item,index,array) => {
            item.inboundData.forEach((file) => {
                newState.ids.add(file.id)
            })
        })
        this.setState(newState);
    }

    render() {
        return <>
            <h2>Current pending order</h2>
            <table cellPadding='0' cellSpacing='0'>
                <tr>
                    <th>Order #</th>
                    <th>Order date</th>
                    <th>Order status</th>
                    <th>Sent files</th>
                </tr>
                {this.state.orders.map((item) =>
                    <tr>
                        <td>{item.id}</td>
                        <td>{new Date(item.createdAt).toDateString()}</td>
                        <td>{item.paid ? 'Waiting result' : 'Unpaid'}</td>
                        <td> <InboundData inboundData={item.inboundData} ids={this.state.ids}/></td>
                    </tr>,
                )}

            </table>
        </>;
    }
}

export default Orders;
