import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Typography, Card } from 'antd';

const { Title } = Typography;

const SkillForm = ({ onSave }) => {
  const dispatch = useDispatch();
  const [skill, setSkill] = useState({});
  const [form] = Form.useForm();
  
  const onFinish = (values) => {
    const newSkill = {
      name: values.name,
      proficiency: values.proficiency,
    };
    setSkill(newSkill);
    
    onSave(newSkill);
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
          Skills Information
        </Title>
        <Button onClick={handleExpandForm}>
          {formVisible ? 'Hide Form' : 'Add Skill'}
        </Button>
      </div>
      {formVisible && (
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Skill Name"
            name="name"
            rules={[
              { required: true, message: 'Please enter a skill name' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Proficiency"
            name="proficiency"
            rules={[{ required: true, message: 'Please enter a proficiency' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="default" htmlType="submit">
              Add Skill
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default SkillForm;
