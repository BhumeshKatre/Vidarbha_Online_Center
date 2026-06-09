import React, { Component } from 'react';
import Hero from '../Components/Hero';
import ServicesSection from '../Components/Services';

class Home extends Component {
  render() {
    return (
      <div>
        <Hero />
        <ServicesSection />
      </div>
    );
  }
}

export default Home;
