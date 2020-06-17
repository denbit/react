import React from 'react';
import styles from './orders.module.scss';
import UserService from '../../../services/userService';

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
                    {id: 21, fileName: 'file_1.txt'},
                    {id: 22, fileName: 'file_2.txt'},
                    {id: 23, fileName: 'file_3.txt'},
                    {id: 24, fileName: 'file_4.txt'},
                    {id: 25, fileName: 'file_5.txt'}],

                resultFiles: [
                    {fileName: 'file_Result_1.txt', content: 'ArrayBuffer', type: 'application'},
                    {fileName: 'file_Result_2.txt', content: 'ArrayBuffer', type: 'application'},
                    {fileName: 'file_Result_3.txt', content: 'ArrayBuffer', type: 'application'},
                    {fileName: 'file_Result_4.txt', content: 'ArrayBuffer', type: 'application'},
                    {fileName: 'file_Result_5.txt', content: 'ArrayBuffer', type: 'application'},
                ],
                },
                {
                orderId: 2,
                created_at: new Date(),
                made_at: new Date(),
                sentFiles: [
                    {id: 26, fileName: 'file_1.txt'},
                    {id: 27, fileName: 'file_2.txt'},
                    {id: 23, fileName: 'file_3.txt'},
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
        console.log('...........................');
        UserService.instance().getOldOrders().then(r => {
            console.log(r);

        }).catch(console.error);


    }

    saveData() {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, fileName) {
            var json = JSON.stringify(data),
                blob = new File([json], fileName,{type: "octet/stream"}),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    };





    render() {
        const data = { x: 123, s: "hello, world123", d: new Date() },
        fileName = "my-download.json";
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
                                    .....
                                    return (
                                        <div key={file.id}>
                                            <div className={styles['sent-files']} onClick={() => {this.saveData()(data, fileName)}}>{file.fileName}</div>

                                        </div>
                                    )
                                })}
                                </td>
                                <td>{collection.resultFiles.map((file, index) => {
                                    return (
                                        <div key={index}>
                                            <div className={styles['sent-files']} onClick={() => {
                                                console.log('preview');}}>{file.fileName}</div>
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
