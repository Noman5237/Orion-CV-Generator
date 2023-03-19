import React from 'react';
import { Typography, Divider, Button } from 'antd';
import axios from 'axios';

import { useCallback } from 'react';
import JsPDF from 'jspdf';
const { Title, Text } = Typography;


const CVPreview = ({personalInfo, educationData,skillInfo, workExperienceData, contactInfoData, projectsData,changeData}) => {
    console.log(personalInfo,educationData, skillInfo, workExperienceData , contactInfoData , projectsData)

     const cleanLink = useCallback((link) => {
    return link.replace(/^https?:\/\//, '').replace(/^www\./, '');
  }, []);

const generatePDF = () => {

    const report = new JsPDF('portrait','pt','a4');
    report.html(document.querySelector('#cv')).then(() => {
        report.save('report.pdf');
    });

}

  return (
    <div>
        <button onClick={generatePDF} type="button">Export PDF</button>
        <div id="cv">
      <Title level={2}>{personalInfo.name}</Title>
       <Title level={3}>About Section:</Title>
  <Text>{personalInfo.about}</Text>
  <br />
   <Title level={3}>Address:</Title>
  <Text>{personalInfo.address}</Text>
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
          {/* add a button for proofreading */}
          <Button type="default" onClick={async () => {
            const response = await axios.post('/api/ai/grammar-correction', {
              text: project.description
            });
            projectsData[index].description = response.data.trim();
            changeData('projects', projectsData);
          }}>Proofread</Button>
          <br />
          <Text type="secondary">Technologies used: {project.tags.join(', ')}</Text>
          <br />
          <Text>Link: {project.link}</Text>
          <br />
        </div>
      ))}

       <Divider />
      <Title level={3}>Skills</Title> <ul>
      {skillInfo.map((skill, index) => (
        <li key={index}>
           
                
           
          <Title level={4}>{skill.name}</Title>
          <Text>proficiency :{skill.proficiency}</Text> 
          
         
          <br />
         
        </li>
      ))} </ul>
      <Divider />
      <Title level={3}>Contact Info</Title>
      {contactInfoData.map((info, index) => (

        // <div key={index}>
        //   <Title level={4}>{info.email}</Title>
        //   <Text>{info.phoneNumber} </Text>
        //   <br />
        //   <Text>Link : {info.linkedIn}</Text>
        //   <br />
          
        //   <Text>Link: {info.github}</Text>
        //   <br />
        // </div>


        <div className="text-center">
     

      <a href={`mailto:${info.email}`}>{info.email}</a>
  
        <h3>Github</h3>
      {info.github && (
        <>
          <span className="mx-1">•</span>
          <a href={info.github}>{cleanLink(info.github)}</a>

          <br />
        </>
      )}
     
     <h3>Linked In</h3>
      {info.linkedin && (
        <>
          <span className="mx-1">•</span>
          <a href={info.linkedIn}>{cleanLink(info.linkedIn)}</a>
        </>
      )}
      
    </div>
      ))}




    </div>
    </div>
  );
};

export default CVPreview;
