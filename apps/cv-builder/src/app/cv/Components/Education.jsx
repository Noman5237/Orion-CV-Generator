import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, DatePicker, Button,Typography  , Card } from 'antd';

const { Title } = Typography;
const EducationForm = ({onSave}) => {
  const dispatch = useDispatch();
  const [education, setEducation] = useState({});
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const educ = {
      school: values.school,
      degree: values.degree,
      fieldOfStudy: values.fieldOfStudy,
      startDate: values.startDate.format('YYYY-MM-DD'),
      endDate: values.endDate.format('YYYY-MM-DD'),
    };
    setEducation(educ);
    
    onSave(educ);
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
          Education Information
        </Title>
        <Button onClick={handleExpandForm}>
          {formVisible ? 'Hide Form' : 'Add Education'}
        </Button>
      </div>
      {formVisible && (
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="School/University"
            name="school"
            rules={[
              { required: true, message: 'Please enter school/university' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Degree"
            name="degree"
            rules={[{ required: true, message: 'Please enter degree' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Field of Study"
            name="fieldOfStudy"
            rules={[
              { required: true, message: 'Please enter field of study' },
            ]}
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
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: 'Please select end date' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="default" htmlType="submit">
              Add Education
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default EducationForm;