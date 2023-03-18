import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Typography, Card } from 'antd';

const { Title } = Typography;

const PersonalInformationForm = ({ onSave }) => {
  const dispatch = useDispatch();
  const [personalInfo, setPersonalInfo] = useState({});
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const info = {
      name: values.name,
      about: values.about,
      address: values.address,
    };
    setPersonalInfo(info);
    
    onSave(info);
    form.resetFields();
  };

  const [formVisible, setFormVisible] = useState(false);
  const handleExpandForm = () => {
    setFormVisible(!formVisible);
  };

  return (
    <Card
      style={{
        border: '1px solid #ccc',
        borderRadius: 8,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        margin: '10px',
        padding: '10px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title mark level="2">
          Personal Information
        </Title>
        <Button onClick={handleExpandForm}>
          {formVisible ? 'Hide Form' : 'Add Information'}
        </Button>
      </div>
      {formVisible && (
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: 'Please enter your name' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="About"
            name="about"
            rules={[{ required: true, message: 'Please enter some information about yourself' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: 'Please enter your address' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="default" htmlType="submit">
              Add Information
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default PersonalInformationForm;
