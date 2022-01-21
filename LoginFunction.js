import React from "react";
import { Form, Input, Button, message } from "antd";
import { login } from "../utils";

const style1 = {
  'background': 'none',
  'border-color': '#ffa260',
  'text-color': '#ffa260',
  'border': '5px soild',
  'background-color': 'black',
  'box-shadow': '3px 3px 5px gold',
  'font-size': '17px',
  
}

const style2 = {
  'background': 'none',
  'border-color': 'black',
  'border': '2px soild',
  'background-color': 'black',
}

const box = {
  'background': 'transparent',
  'border-color': 'white',
  'color': 'white',
}

class LoginForm extends React.Component {
  state = {
    loading: false,
    Mouse: false,
  };

  onMouseOver = () => {
    this.setState({
      Mouse: true,
    })
  }

  onMouseLeave = () => {
    this.setState({
      Mouse: false,
    })
  }

  onFinish = (data) => {
    this.setState({
      loading: true,
    });
    login(data)
      .then(() => {
        message.success(`Login Successful`);
        this.props.onSuccess();
      })
      .catch((err) => {
        message.error(err.message);
        console.log(err);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render = () => {
    return (
      <Form
        name="normal_login"
        onFinish={this.onFinish}
        style={{
          width: 300,
          margin: "auto",
        }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" style={box} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input type={"password"} placeholder="Password" style={box} />
        </Form.Item>

        <Form.Item>
          <Button type="primary"
            htmlType="submit"
            loading={this.state.loading}
            onMouseEnter={this.onMouseOver}
            onMouseLeave={this.onMouseLeave}
            style={this.state.Mouse ? style1 : style2}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    );
  };
}

export default LoginForm;