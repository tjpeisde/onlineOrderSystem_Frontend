import { useEffect, useState } from "react";
import { Input, Form, Modal, Card, message } from 'antd';
import { List, Button, Avatar, Typography } from 'antd';
import { EditOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Col, Row, Affix } from 'antd';
import { PhoneOutlined, MailOutlined , FullscreenOutlined,RollbackOutlined } from '@ant-design/icons';
import { updatePassword, getUserInfo } from "../utils";
import { OmitProps } from "antd/lib/transfer/ListBody";

const infoStyle = {
    width: '25%',
    textAlign: 'center',
};
const historyStyle = {
    width: '75%',
    textAlign: 'center',
};

const submit_color = {
    'background-color': '#343a40',

    'border-color': '#495057',
}

const data = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
];
const { Meta } = Card;

const UserInfo = (props) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [detailModal, setDetailModal] = useState({
        visible: false,
        orderHistory: null
    })


    const onFinish = (data) => {
        updatePassword(data.password)
            .then(() => {
                setPasswordVisible(false);
                message.success('Update successful');
                props.logout();
            })
            .catch((err) => {
                message.error(err.message);
            })

    }

    const onMoreDetail = (data) => {
        setDetailModal({
            visible: true,
            orderHistory: data
        });
    }
    const onCloseDetail = () => {
        setDetailModal({
            visible: false,
            orderHistory: null
        });
    }

    const onCloseInfo = () =>{
        console.log("onCloseInfo");
        props.closeInfo();
    }


    return (
        <>
            <div className="site-card-border-less-wrapper">
                <Row gutter={16} align="top">
                    <Col span={6}>
                        <Card
                            title="Customer Info" bordered={false}
                            actions={[
                                <div onClick={() => { setPasswordVisible(!passwordVisible) }}>
                                    <EditOutlined key="edit" />
                                    Password
                                </div>,
                                <div onClick={() => { props.logout() }}>
                                    <UserDeleteOutlined key="logout" />
                                    Logout
                                </div>
                            ]}>
                            <Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title={(<p>{props.userData?.firstName} {props.userData?.lastName} </p>)}
                                description={(<><p>  <MailOutlined key="email" /> {props.userData?.email}</p>
                                    <p>  <PhoneOutlined key="phone" /> {props.userData?.phone}</p></>)}
                            />

                        </Card>
                    </Col>

                    <Col span={18}>

                        <Card title="Order History"
                            bordered={false}
                            extra={<a onClick={onCloseInfo}> <RollbackOutlined />Back</a>}
                        >
                            <List
                                itemLayout="horizontal"
                                dataSource={props.userData?.orderHistoryList}
                                renderItem={item => (
                                    <List.Item
                                        actions={[<a onClick={() => onMoreDetail(item)} ><FullscreenOutlined  key="list-loadmore-more"  /> more detail</a>]}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar size="large" src={item.historyItemList[0].menuItem.imageUrl} />}
                                            title={
                                                <p>
                                                    <Typography.Text mark> ORDER#: {item.id}</Typography.Text>

                                                </p>}
                                            description={<p>[{item.date}] Total : ${item.totalPrice}</p>}
                                        />

                                    </List.Item>
                                )}
                            />

                        </Card>
                    </Col>

                    <Modal
                        title="Change Password"
                        visible={passwordVisible}
                        onCancel={() => setPasswordVisible(false)}
                        footer={null}
                        destroyOnClose={true}
                    >
                        <Form
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    { required: true, message: "Please input your password!" },
                                ]}
                            >
                                <Input placeholder="Password" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={submit_color}>
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    {detailModal.orderHistory &&
                        <Modal
                            title={`ORDER# ${detailModal.orderHistory.id}  [${detailModal.orderHistory.date}]`}
                            visible={detailModal.visible}
                            onCancel={onCloseDetail}
                            footer={null}
                            destroyOnClose={true}
                        >
                            <List
                                itemLayout="horizontal"
                                dataSource={detailModal.orderHistory.historyItemList}
                                renderItem={(item) => (
                                    <List.Item >
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.menuItem.imageUrl} />}
                                            title={item.menuItem.name}
                                            description={`$${item.price}  X  ${item.quantity}`}
                                        />
                                    </List.Item>
                                )}
                            />
                            <p> Total : ${detailModal.orderHistory.totalPrice}</p>

                        </Modal>
                    }
                </Row>


            </div>
        </>
    )
};
export default UserInfo;