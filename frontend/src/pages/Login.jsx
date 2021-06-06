
import { Form, Input, Button, PageHeader, message } from 'antd';
import Axios from '../config/AxiosConfig'

const Login = () => {
  const onFinishForm = async (form) => {
    try {
      const result = await Axios.post('/auth/login',form)
      localStorage.setItem('hm_token', result.token)
      window.location.href = '/'
    } catch (error) {
      if (error.response) {
        const { message:errMessage } = error.response.data.error
        message.error(errMessage || error.message)
      }else{
        message.error(error.message)
      }
    }
    
  }
  return (
    <div className='container'>
      <PageHeader 
        className="site-page-header mb-5"
        title="Login Page"
        subTitle="Login Here"
        backIcon={false}
      />
      <div className='row justify-content-center'>
        <div className='col-4 border p-5'>
          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinishForm}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;