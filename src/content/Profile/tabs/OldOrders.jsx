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
        }).catch(console.error);
        // this.readOldOrders()
    }



    readOldOrders(){
        const newState = {...this.state}
        const ids = new Set();
        newState.oldOrders.forEach((item,index,array) => {
            item.inboundData.forEach((file) => {
                ids.add(file.id)
            })
        })
        newState.ids = ids;
        this.setState(newState)
        readFile(ids).then(res=>{
            // console.log('reeeeeeeees',res)})
        // console.log('newState',newState)
    })
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
                            <td>{collection.createdAt}</td>
                            <td>{collection.madeAt}</td>
                            <InboundData collection={collection}/>
                            <OutboundData collection={collection}/>
                        </tr>
                    )
                })}
            </table>
        </>;
    }
}
