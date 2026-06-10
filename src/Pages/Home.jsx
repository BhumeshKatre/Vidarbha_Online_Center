import React, { Component } from 'react';
import Hero from '../Components/Hero';
import ServicesSection from '../Components/Services';
import ToolsSection from '../Components/ToolSection';

class Home extends Component {
  render() {
    return (
      <div>
        <Hero />
        <ServicesSection />
        <ToolsSection />
      </div>
    );
  }
}

export default Home;
