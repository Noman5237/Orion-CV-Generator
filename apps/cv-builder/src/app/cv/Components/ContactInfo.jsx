import { useState } from 'react';

import { Input, Button,Typography , Card ,Form} from 'antd';

const { Title } = Typography;
const ContactForm = ({onSave}) => {
  const [contactInfo, setContactInfo] = useState({});
   const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [github, setGithub] = useState('');

  const handleSubmit = (e) => {
    const contactInfo = {
        email,
        phoneNumber,
        linkedIn,
        github,

    }
    setContactInfo(contactInfo);
   onSave(contactInfo);

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
        padding:'10px'
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
          Contact Info
        </Title>
        <Button onClick={handleExpandForm}>
          {formVisible ? 'Hide Form' : 'Add Contact Info'}
        </Button>
      </div>
        {formVisible && (
   <Form form={form} onFinish={handleSubmit}>
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[{ required: true }]}
      >
        <Input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Item>
      <Form.Item name="linkedIn" label="LinkedIn" rules={[{ required: true }]}>
        <Input
          type="url"
          value={linkedIn}
          onChange={(e) => setLinkedIn(e.target.value)}
        />
      </Form.Item>
      <Form.Item name="github" label="GitHub" rules={[{ required: true }]}>
        <Input
          type="url"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form>)}
    </Card>
  );
};

export default ContactForm;
