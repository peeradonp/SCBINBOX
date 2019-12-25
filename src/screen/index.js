import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';
import Sidebar from '../../src/components/sidebar'
import Inbox from './inbox/Inbox'

const { Header, Sider, Content } = Layout;

class Index extends React.Component {
    render() {
        return (
            <div >
                <Sidebar>
                    <Inbox />
                </Sidebar>
            </div>
        );
    }
}

export default Index
