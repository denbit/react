import React from 'react';
import styles from './orders.module.scss';
import UserService from '../../../services/userService';
import {readFile} from "../../../services/filesService";

export default class OldOrders extends React.Component {
    static state = {};
    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            oldOrders: [
                {
                    orderId: 1,
                    created_at: new Date(),
                    made_at: new Date(),
                    sentFiles: [
                        {id: 1, fileName: 'file_1.txt'},
                        {id: 2, fileName: 'file_2.txt'},
                       ],

                    resultFiles: [
                        {fileName: 'file_Result_1.txt', content: 'ArrayBuffer', type: 'application'},
                        {fileName: 'file_Result_2.txt', content: 'ArrayBuffer', type: 'application'},
                    ],
                },
                {
                    orderId: 2,
                    created_at: new Date(),
                    made_at: new Date(),
                    sentFiles: [
                        {id: 3, fileName: 'file_1.txt'},
                        {id: 4, fileName: 'file_2.txt'},
                    ],

                    resultFiles: [
                        {fileName: 'file_Result_1.txt', content: 'ArrayBuffer', type: 'application'},
                        {fileName: 'file_Result_2.txt', content: 'ArrayBuffer', type: 'application'},
                    ],
                }
            ],
        }
    }

    componentDidMount() {
        UserService.instance().getOldOrders().then(r => {
            console.log('............r..............',r);

        }).catch(console.error);
        this.readOldOrders()
    }



    readOldOrders(){
        const newState = {...this.state}
        const ids = new Set();
        newState.oldOrders.forEach((item,index,array) => {
            item.sentFiles.forEach((file) => {
                ids.add(file.id)
            })
        })
        newState.ids = ids;
        // this.setState(newState)
        readFile(ids).then(res=>{
            console.log('reeeeeeeees',res)})
        // console.log('newState',newState)
    }

    saveData() {
        // var a = document.createElement("a");
        // document.body.appendChild(a);
        // a.style = "display: none";

            window.URL.revokeObjectURL(url);
    };


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
                {this.state.oldOrders.map((collection, index) => {
                    return (
                        <tr key={index}>
                            <td>{collection.orderId}</td>
                            <td>{collection.created_at.toDateString()}</td>
                            <td>{collection.made_at.toDateString()}</td>
                            <td>{collection.sentFiles.map((file) => {
                                const data = {x: 123, s: "hello, world123", d: new Date()},
                                fileName = "my-download.json";
                                var json = JSON.stringify(data),
                                    blob = new File([json], fileName, {type: "octet/stream"}),
                                    url = window.URL.createObjectURL(blob);
                                console.log('blob',blob)
                                console.log('url',url)

                                return (
                                    <div key={file.id}>
                                        <a id='link' href={url} className={styles['sent-files']} onClick={() => {
                                            this.saveData
                                        }}>{file.fileName}</a>
                                    </div>
                                )
                            })}
                            </td>
                            <td>{collection.resultFiles.map((file, index) => {
                                return (
                                    <div key={index}>
                                        <div className={styles['sent-files']} onClick={() => {
                                            console.log('preview');
                                        }}>{file.fileName}</div>
                                    </div>
                                )
                            })}
                            </td>
                        </tr>
                    )
                })}
            </table>
        </>;
    }
}
