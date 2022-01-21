import { Button, Layout, Menu } from 'antd';
import LoginFunction from "./components/LoginFunction";
import ChooseFood from "./components/ChooseFood";
import MyCart from "./components/MyCart";
import SignupFunc from "./components/SignupFunction";
import { UserOutlined } from '@ant-design/icons';
import React from "react"
import UserInfo from './components/UserInfo';
import { Avatar, Modal, message } from 'antd';
import { getUserInfo } from './utils';
import { Space } from 'antd';



const { Content, Footer, Header } = Layout;
const { SubMenu } = Menu;


const display = {
  'font-size': '30px',
  'font-weight': 'bold',
  'color': '#6c757d',
}


const div1 = {
  'color': 'white',
  'font-weight': 'bold',
  'font-size': '15px',
}

const menu_bar = {
  'position': 'relative',
  'background': 'transparent',
  'border': 'none',
  'color': 'white',
}

const img = {
  'background-image': 'url(https://unsplash.com/photos/R-LK3sqLiBw/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8aG9tZXx8MHx8fHwxNjQyNzg5ODIy&force=true)',
  'width': '100%',
  'height': '100%',
  'position': 'fixed',
  'background-repeat': 'no-repeat',
  'background-position': '0px 0px',
  'background-size': '100% 100%',
}

const layout = {
  'position': 'relative',
  'padding': '50px',
  'top': '20px',
  'overflowY': 'auto',
}

const footer = {
  'background': 'transparent',
  'border': 'none',
  'color': 'white',
  'height': '90px',
  'text-align': 'center',
}

const header = {
  'position': 'relative',
  'background': 'transparent',
  'border': 'none',
  'color': 'white',
}

const button = {
  'background': '#ef233c',
  'color': 'yellow',
  'width': '200px',
  'height': '50px',
  'position': 'relative',
  'top': '10%',
  'left': '43%',
  'border': '1px solid rgba(0,0,0,0.21)',
  'border-bottom': '4px solid rgba(0,0,0,0.21)',
  'border-radius': '4px',
  'text-shadow': '0 1px 0 rgba(0,0,0,0.15)',
  'font-weight': 'bolder',
  'font-size': '1.5em',
}

const text = {
  'background': 'transparent',
  'border': 'none',
  'color': 'white',
  'text-align': 'center',
  'position': 'relative',
  'top': '10%',
  'font-weight': '900',
  'font-size': '500%',
}


class App extends React.Component {
  state = {
    current: 'mail',
    authed: false,
    display: 'none',
    display2: 'inline',
    infoVisible: 'none',
    userData: null
  };

  handleClick = (e) => {
    this.setState({
      display: 'inline',
      display2: 'none',

    });
  };

  onOpenInfo = () => {
    this.setState({
      infoVisible: 'inline',
      display: 'none',
      display2: 'none',

    });
  };
  onCloseInfo = () => {
    this.setState({
      infoVisible: 'none',
      display: 'inline',
      display2: 'none',

    });
  };

  info = () => {
    Modal.info({
      title: 'About Us',
      content: (
        <div>
          <p>Teejay Pei</p>
          <p>Personal Project</p>
        </div>
      ),
      onOk() { },
    });
  }

  onSuccessLogin = () => {
    this.setState({ authed: true });
    getUserInfo()
      .then((data) => {
        this.setState({ userData: data });
        console.log(data)
      })
      .catch((err) => {
        message.error(err.message);
      })
  };

 

  render() {
    const { current } = this.state;
    return (
      <>
        <Layout style={img}>

          <Header style={header}>
            <Menu selectedKeys={[current]} mode="horizontal" style={menu_bar}>

              <div>
                <Menu.Item key="app" style={display}>
                  Online Order System
                </Menu.Item>
              </div>

              <div style={{ 'margin-right': '50%' }}>
                <SubMenu key="SubMenu" title="Restaurant Partner" style={div1}>
                  <Menu.ItemGroup title="Author">
                    <Menu.Item key="setting:1">Teejay Pei</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup title="REACT">
                    <Menu.Item key="setting:3">Ant Design</Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
              </div>

              <div>
                <Menu.Item key="aboutUs" >
                  <Space wrap>
                    <a onClick={this.info} style={div1}>About Us</a>
                  </Space>
                </Menu.Item>
              </div>

              <div style={div1}>
                <Menu.Item key="cart" >
                  <div style={div1}>{this.state.authed ?
                    <>
                      <Avatar
                        icon={<UserOutlined />}
                        onClick={this.onOpenInfo}
                      />
                      <MyCart />
                    </>
                    :
                    <SignupFunc />}</div>
                </Menu.Item>
              </div>

            </Menu>
          </Header>


          <Content
            style={layout}
          >

            <div style={{ display: this.state.display2 }}>
              <h1 style={text} >
                We have <br /> everything you want</h1>
              <Button style={button} onClick={this.handleClick}>
                Order Now
              </Button>
            </div>

            <div style={{ display: this.state.display }}>
              {this.state.authed ?
                <ChooseFood />
                :
                <LoginFunction onSuccess={this.onSuccessLogin} />
              }
            </div>
            <div style={{ display: this.state.infoVisible }}>
              <UserInfo
                userData={this.state.userData}
                logout={() => {
                  this.setState({
                    authed: false,
                    display: 'inline',
                    display2: 'none',
                    infoVisible: 'none',
                    userData: null
                  })
                }}
                closeInfo={this.onCloseInfo}
              />
            </div>

          </Content>

          <Footer style={footer}>
            Online Order System ©2021 Created by Teejay Pei
          </Footer>

        </Layout>
      </>

    );
  }
}

export default App;
