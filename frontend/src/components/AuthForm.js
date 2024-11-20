import React, { useState } from 'react';
import { Form, Input, Button, Tabs, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
const { TabPane } = Tabs;

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate(); 
  const [userStu, setUserStu] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    phone_number: '',
    address: '',
    is_active: true
  });

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const onChange = (e) => {
    setUserStu({
      ...userStu,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    if (userStu.password !== userStu.confirm_password) {
      message.error('Mật khẩu xác nhận không khớp!');
      return;
    }
    
    axios.post('http://127.0.0.1:4000/api/register/', userStu)
      .then((response) => {
        message.success('Đăng ký thành công!');
        console.log(response.data);
      })
      .catch((error) => {
        message.error('Có lỗi xảy ra trong quá trình đăng ký!');
        console.error(error);
      });
  };

  const handleLogin = (values) => {
    axios.post('http://127.0.0.1:4000/api/login/', values)
      .then((response) => {
        const { access, refresh } = response.data; // Lấy access và refresh token từ response
  
        if (access && refresh) {
          localStorage.setItem('accessToken', access);   // Lưu access token vào localStorage
          localStorage.setItem('refreshToken', refresh); // Lưu refresh token vào localStorage
          message.success('Đăng nhập thành công!');
          navigate('/list-courses');
          console.log(response.data);
        } else {
          message.error('Không tìm thấy token. Đăng nhập thất bại!');
        }
      })
      .catch((error) => {
        message.error('Có lỗi xảy ra trong quá trình đăng nhập!');
        console.error(error);
      });
  };
  

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '40px 0' }}>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Đăng Nhập" key="login">
          <Form name="login" onFinish={handleLogin}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Đăng Nhập
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        
        <TabPane tab="Đăng Ký" key="register">
          <Form name="register" onFinish={handleRegister}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Tên đăng nhập"
                name="username"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                name="email"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mật khẩu"
                name="password"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Xác nhận mật khẩu"
                name="confirm_password"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item
              name="phone_number"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Số điện thoại"
                name="phone_number"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
            >
              <Input
                prefix={<HomeOutlined />}
                placeholder="Địa chỉ"
                name="address"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Đăng Ký
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AuthForm;
