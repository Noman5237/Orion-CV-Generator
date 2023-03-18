import { Layout, Row, Col, Menu, theme,Button   } from 'antd';
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';


import ContactForm from './Components/ContactInfo';

import EducationForm from './Components/Education';
import ProjectsForm from './Components/Projects';
import WorkExperienceForm from './Components/WorExperince';
import CVPreview from './Components/CVPreview';
import { Link } from 'react-router-dom';
import PersonalInformationForm from './Components/PersonalInfo';
import SkillForm from './Components/Skill';





const CvEditor = () => {
  //write a funciton that will get the object sent from the educationForm componet and add it to the state
  //write a function that will get the object sent from the contactForm component and add it to the state
  //write a function that will get the object sent from the projectsForm component and add it to the state
  //write a function that will get the object sent from the workExperienceForm component and add it to the state
  //write a function that will get the object sent from the customSectionGenerator component and add it to the state
const [education , setEducation] = useState([])
const [workExperience, setWorkExperience] = useState([])
const [projects , setProjects] = useState([]);
const [constact , setConstact] = useState([]);
const [personalInfo , setPersonalInfo] = useState([])
const [skill , setSkill] = useState([])


const { Header, Sider, Content } = Layout;
 

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();


console.log(education , projects , constact , workExperience)
  const handleEducationSave = (data) => {
    //window.profile.education=[...window.profile.education , data]
    console.log(data)
    setEducation([...education ,data])
   
  };

const handlePersonalInformations = (data) => {
    //window.profile.education=[...window.profile.education , data]
    
    setPersonalInfo([...personalInfo ,data])
    console.log(data)

}

const handleSkill=(data)=>{
    setSkill([...skill , data])

}
  const handleContactInfoSave = (data) => {
    // window.profile.contact = [...window.profile.contact , data]
    // console.log(window.profile)

    setConstact([...constact , data])
  };

  const handleProjectsSave = (data) => {
    // window.profile.projects = [...window.profile.projects , data]
    //  console.log(window.profile)


    setProjects([...projects , data])
  };

  const handleWorkExperienceSave = (data) => {
    // window.profile.workExperience = [...window.profile.workExperience , data]
    //  console.log(window.profile)

    setWorkExperience([...workExperience , data])

  };

  return (


    
        
          <Row gutter={[16, 16]}>
      <Col span={12}>
        <PersonalInformationForm onSave={handlePersonalInformations}></PersonalInformationForm>
        <EducationForm onSave={handleEducationSave}></EducationForm>
        <SkillForm onSave={handleSkill}></SkillForm>
        <ContactForm onSave={handleContactInfoSave}></ContactForm> <ProjectsForm onSave={handleProjectsSave}></ProjectsForm>
        <WorkExperienceForm onSave={handleWorkExperienceSave}></WorkExperienceForm>
      </Col>
      <Col span={12}>
        <CVPreview personalInfo={personalInfo} educationData={education} skillInfo={skill}  workExperienceData={workExperience}  contactInfoData={constact} projectsData={projects}></CVPreview>
        
         </Col>
    </Row>
   




   
  );
};

export default CvEditor;
