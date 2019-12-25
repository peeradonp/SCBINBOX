import { Layout, Menu, Icon, Avatar } from 'antd';
import styled from 'styled-components';

const { Header, Sider, Content } = Layout;

class Sidebar extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout className='max-height' >
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"

                >
                    <div style={{ padding: '22px 18px' }} >
                        <span style={{ color: '#ffffff' }}>INBOX</span>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="inbox" />
                            <span>Inbox</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: '0px 16px' }} >
                        <div style={{ flex: 1, textAlign: 'end' }}>
                            <Avatar icon="user" />
                        </div>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{this.props.children}</div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Sidebar
