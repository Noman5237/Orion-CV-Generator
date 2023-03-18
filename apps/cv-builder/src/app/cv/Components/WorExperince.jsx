import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, DatePicker, Button, Typography, Card , Select } from 'antd';

const { Title } = Typography;

const WorkExperienceForm = ({onSave}) => {
  const dispatch = useDispatch();
  const [workExperience, setWorkExperience] = useState([]);

  const onFinish = (values) => {
    const experience = {
      employer: values.employer,
      jobTitle: values.jobTitle,
      startDate: values.startDate.format('YYYY-MM-DD'),
      endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : 'Present',
     
    };
    setWorkExperience([...workExperience, experience]);
    onSave(experience);
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
          Work Experience Information
        </Title>
        <Button onClick={handleExpandForm}>
          {formVisible ? 'Hide Form' : 'Add Work Experience'}
        </Button>
      </div>
      {formVisible && (
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Employer"
            name="employer"
            rules={[{ required: true, message: 'Please enter employer name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Job Title"
            name="jobTitle"
            rules={[{ required: true, message: 'Please enter job title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Please select start date' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item label="End Date" name="endDate">
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Ongoing"
            name="ongoing"
            valuePropName="checked"
            style={{ marginBottom: 0 }}
          >
            <input type="checkbox" />
          </Form.Item>
          
          <Form.Item>
            <Button type="default" htmlType="submit">
              Add Work Experience
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export  default WorkExperienceForm;
