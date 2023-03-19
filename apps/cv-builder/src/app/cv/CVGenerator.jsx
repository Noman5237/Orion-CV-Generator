import { Layout, Row, Col, Menu, theme, Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import CVPreview from './Components/CVPreview';
import axios from 'axios';


const CVGenerator = () => {

  const profile = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : {
    education: [],
    workExperience: [],
    projects: [],
    contact: {}
  };
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        {/* <EducationForm onSave={handleEducationSave}></EducationForm>
        <ContactForm onSave={handleContactInfoSave}></ContactForm> <ProjectsForm onSave={handleProjectsSave}></ProjectsForm>
        <WorkExperienceForm onSave={handleWorkExperienceSave}></WorkExperienceForm> */}

        <Form onFinish={async (values) => {
          const response = await axios.post('/api/ai/job-matching', {
            jobDescription: values.description,
            projects: profile.projects,
            skills: []
          });
          console.log(response.data);
        }} layout="vertical">
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: 'Please enter job description' },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="default" htmlType="submit">
              Generate CV
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12}>
        <CVPreview educationData={profile.education} workExperienceData={profile.workExperience} contactInfoData={profile.contact} projectsData={profile.projects}></CVPreview>
      </Col>
    </Row>
  );
};

export default CVGenerator;
