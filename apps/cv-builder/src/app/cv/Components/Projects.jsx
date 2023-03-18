import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Typography, Card, Tag,Select } from 'antd';

const { Title } = Typography;

const ProjectForm = ({onSave}) => {
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
    const [tags, setTags] = useState([]);


const removeTag = (tag) => {
  const newTags = tags.filter((t) => t !== tag);
  setTags(newTags);
}

  const onFinish = (values) => {
    const project = {
      name: values.name,
      description: values.description,
      link: values.link,
      tags: values.tags,
    };
    setProjects([...projects, project]);
    onSave(projects);
  };

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
          Projects Information
        </Title>
        <Button onClick={handleExpandForm}>
          {formVisible ? 'Hide Form' : 'Add Project'}
        </Button>
      </div>
      {formVisible && (
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Project Name"
            name="name"
            rules={[{ required: true, message: 'Please enter project name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: 'Please enter project description' },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Link"
            name="link"
            rules={[{ required: true, message: 'Please enter project link' }]}
          >
            <Input />
          </Form.Item>
        <Form.Item
            label="Technologies Used"
            name="technologies"
            rules={[
              {
                required: true,
                message: 'Please enter technologies used',
                type: 'array',
              },
            ]}
          >
            <Select
              mode="tags"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
            />
          </Form.Item>
          <Form.Item>
            <Button type="default" htmlType="submit">
              Add Project
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default ProjectForm;
