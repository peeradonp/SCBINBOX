import React from 'react'
import { List, Avatar, Spin, Typography } from 'antd';
import axios from 'axios';

const { Paragraph, Title } = Typography;

class Inbox extends React.Component {
    state = {
        collapsed: false,
        requestData: undefined,
        loading: true
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    componentDidMount() {
        let apiLink = `http://www.mocky.io/v2/5e0307a131000008156b2a85`
        axios.get(apiLink)
            .then(res => {
                this.setState({
                    requestData: res.data,
                    loading: false
                })
            })
    }

    render() {
        const { requestData, loading } = this.state
        console.log(requestData)
        return (
            <div >
                <Spin spinning={loading} tip="Loading...">
                    <List
                        itemLayout="horizontal"
                        dataSource={requestData}
                        renderItem={item => (
                            <a onClick={() => { console.log("asd") }}>
                                <List.Item >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar>{item.from.name[0]}</Avatar>
                                        }
                                        title={
                                            <span >{item.subject}</span >
                                        }
                                        description={
                                            <span >{item.body}</span>
                                        }
                                    />
                                    {/* <span>{item.body}</span> */}
                                    asd
                                </List.Item>
                            </a>
                        )}
                    />
                </Spin>
            </div>
        )
    }
}

export default Inbox

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];