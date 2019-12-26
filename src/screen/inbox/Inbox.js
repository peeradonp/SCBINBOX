import React from 'react'
import { List, Avatar, Spin, Typography, Divider, Dropdown, Menu, Icon, notification } from 'antd';
import Randomcolor from 'randomcolor'
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
        this.getMail()
    }

    getMail = () => {
        this.setState({ loading: true })

        // normal data
        let apiLink = `http://www.mocky.io/v2/5e0307a131000008156b2a85`

        // notcorrent data
        // let apiLink = `http://www.mocky.io/v2/5e0475823100004e00fd2eb2`
        // let apiLink = `http://www.mocky.io/v2/5e047a8c3100006e66fd2ee3`

        // error 404
        // let apiLink = 'http://www.mocky.io/v2/5e0479103100007300fd2ed0'

        axios.get(apiLink)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        requestData: res.data,
                        loading: false
                    })
                } else {
                    this.setState({
                        requestData: undefined,
                        loading: false
                    })
                }
            })
            .catch(err => {
                notification.open({
                    message: <span style={{ color: 'red' }}>Error!</span>,
                    description: '400 (Bad Request)',
                });
                this.setState({
                    requestData: undefined,
                    loading: false
                })
            })
    }


    render() {
        const { requestData, loading } = this.state
        return (
            <div >
                <Spin spinning={loading} tip="Loading...">
                    <List
                        header={
                            <div className='List-header' style={{ display: 'flex' }}>
                                <div className='Inbox' style={{ flex: 1 }}>
                                    <Paragraph ellipsis={{ rows: 1, expandable: false }}
                                        style={{ marginLeft: 58, fontWeight: 'bolder', color: 'black', fontSize: 18 }}
                                    >Inbox</Paragraph>
                                </div>
                                <div style={{ flex: 0, display: 'contents' }}>
                                    <Dropdown overlay={
                                        <Menu
                                            defaultSelectedKeys={['0']}
                                            defaultOpenKeys={['0']}
                                        >
                                            <Menu.Item key={0} onClick={() => { this.getMail() }}>All</Menu.Item>
                                            <Menu.Item key={1} disabled={true}>Unread</Menu.Item>
                                            <Menu.Item key={2} disabled={true}>Flagged</Menu.Item>
                                            <Menu.Item key={3} disabled={true}>Mentions</Menu.Item>
                                            <Menu.Item key={4} disabled={true}>Sort By Date</Menu.Item>
                                            <Menu.Item key={5} onClick={() => {
                                                requestData && this.setState({ requestData: requestData.sort((a, b) => a.from.name.localeCompare(b.from.name)) })
                                            }}>Sort By Name</Menu.Item>
                                        </Menu>
                                    }
                                        placement="bottomRight"
                                    >
                                        <a style={{ marginRight: 22, fontWeight: 'bolder', fontSize: 14 }} className="ant-dropdown-link">Filter<Icon style={{ paddingLeft: 4 }} type="down" /></a>
                                    </Dropdown>
                                </div>
                            </div>
                        }
                        itemLayout="horizontal"
                        dataSource={requestData}
                        pagination={true}
                        grid={{ gutter: 16, column: 1 }}
                        renderItem={item => {
                            return (
                                <List.Item className='List-active' >
                                    <List.Item.Meta
                                        avatar={<Avatar style={{ background: Randomcolor() }}  >{item.from && item.from.name ? item.from.name[0] : '?'}</Avatar>}
                                        title={
                                            <div style={{ display: 'grid' }}>
                                                <Paragraph style={{ fontWeight: 'bolder', color: 'black', fontSize: 15 }} ellipsis={{ rows: 1, expandable: false }}>
                                                    {item.from && item.from.name}</Paragraph>
                                            </div>
                                        }
                                        description={
                                            <div style={{ display: 'grid', marginTop: -18 }}>
                                                <Paragraph style={{ fontSize: 13, color: 'black' }} ellipsis={{ rows: 1, expandable: false }}>{item.subject}</Paragraph>
                                            </div>
                                        }
                                    />
                                    <div style={{ display: 'grid', marginTop: -12 }}>
                                        <Paragraph style={{ marginLeft: 48, fontSize: 13, color: 'gray' }} ellipsis={{ rows: 1, expandable: false }}>{item.body}</Paragraph>
                                    </div>
                                </List.Item>
                            )
                        }}
                    />
                </Spin>
            </div>
        )
    }
}

export default Inbox