import { Route, Routes, Link } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import React, { useState } from 'react';

import CVPage from './cv/cv-page';

import CvEditor from './cv/CvEditor';

const { Header, Content, Footer } = Layout;

export function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Header, Sider, Content } = Layout;
  return (
    <>
      <Layout>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
          }}
        >
          <div
            style={{
              float: 'left',
              width: 120,
              height: 31,
              margin: '16px 24px 16px 0',
              background: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={new Array(3).fill(null).map((_, index) => ({
              key: String(index + 1),
              label: `nav ${index + 1}`,
            }))}
          />
        </Header>
        <Content
          className="site-layout"
          style={{
            padding: '0 50px',
          }}
        >
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/page-2">Page 2</Link>
            </li>
          </ul>
        </Content>
      </Layout>

      <Routes>
        <Route path="/" element={<CvEditor />} />
      </Routes>
    </>
  );
}
export default App;
