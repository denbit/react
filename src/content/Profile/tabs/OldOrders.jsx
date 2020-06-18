import React from 'react';
import styles from './orders.module.scss';
import UserService from '../../../services/userService';
import {readFile} from "../../../services/filesService";
import InboundData from "./commonComponents/InboundData";
import OutboundData from "./commonComponents/OutboundData";

export default class OldOrders extends React.Component {
    static state = {};
    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            ids: new Set(),
            oldOrders: [],
        }
    }

    componentDidMount() {
        UserService.instance().getOldOrders().then(response => {
            const newState = {...this.state}
            response.forEach((item) => {
                newState.oldOrders.push(item)
            });
            this.setState(newState)
            this.createIds()
        }).catch(console.error);

    }

    createIds(){
        const newState = {...this.state}
        newState.oldOrders.forEach((item,index,array) => {
            item.inboundData.forEach((file) => {
                newState.ids.add(file.id)
            })
        })
        this.setState(newState);
    }



    saveData() {
        // var a = document.createElement("a");
        // document.body.appendChild(a);
        // a.style = "display: none";

            window.URL.revokeObjectURL(url);
    }


    render() {
        return <>
            <h2>Previous orders</h2>
            <table cellPadding='0' cellSpacing='0'>
                <tr>
                    <th>Order #</th>
                    <th>Order date</th>
                    <th>Result date</th>
                    <th>Sent files</th>
                    <th>Result files</th>
                </tr>
                {this.state.oldOrders.length && this.state.oldOrders.map((collection, index) => {
                    return (
                        <tr key={index}>
                            <td>{collection.id}</td>
                            <td>{ new Date(collection.createdAt).toDateString()}</td>
                            <td>{ new Date(collection.madeAt).toDateString()}</td>
                            <td>
                                <InboundData inboundData={collection.inboundData} ids={this.state.ids}/>
                            </td>
                            { this.state.ids.size && <OutboundData collection={collection} />}
                        </tr>
                    )
                })}
            </table>
        </>;
    }
}
