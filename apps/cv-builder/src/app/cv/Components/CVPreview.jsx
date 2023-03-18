import React from 'react';
import { Typography, Divider } from 'antd';

const { Title, Text } = Typography;

const CVPreview = ({ educationData, workExperienceData, contactInfoData, projectsData}) => {
    console.log(educationData , workExperienceData , contactInfoData , projectsData)

  return (
    <div>
      <Title level={2}>{contactInfoData.fullName}</Title>
      <Text strong>{contactInfoData.email}</Text>
      <br />
      <Text>{contactInfoData.phone}</Text>
      <Divider />
      <Title level={3}>Education</Title>
      {educationData.map((education, index) => (
        <div key={index}>
          <Title level={4}>{education.degree} {education.major}</Title>
          <Text strong>{education.school}</Text>
          <br />
          <Text>{education.startDate} - {education.endDate}</Text>
          <br />
          <Text>{education.description}</Text>
          <br />
        </div>
      ))}
      <Divider />
      <Title level={3}>Work Experience</Title>
      {workExperienceData.map((workExperience, index) => (
        <div key={index}>
          <Title level={4}>{workExperience.jobTitle}</Title>
          <Text strong>{workExperience.employer}</Text>
          <br />
          <Text>{workExperience.startDate} - {workExperience.endDate || 'Present'}</Text>
          <br />
          <Text>{workExperience.description}</Text>
          <br />
        </div>
      ))}
      <Divider />
      <Title level={3}>Projects</Title>
      {projectsData.map((project, index) => (
        <div key={index}>
          <Title level={4}>{project.name}</Title>
          <Text>{project.startDate} - {project.endDate || 'Present'}</Text>
          <br />
          <Text>{project.description}</Text>
          <br />
          <Text type="secondary">Technologies used: {project.tags.join(', ')}</Text>
          <br />
          <Text>Link: {project.link}</Text>
          <br />
        </div>
      ))}
        <Divider />
      <Title level={3}>Contact Info</Title>
      {contactInfoData.map((info, index) => (
        <div key={index}>
          <Title level={4}>{info.email}</Title>
          <Text>{info.phoneNumber} </Text>
          <br />
          <Text>Link : {info.linkedIn}</Text>
          <br />
          
          <Text>Link: {info.github}</Text>
          <br />
        </div>
      ))}


    
      
    </div>
  );
};

export default CVPreview;
