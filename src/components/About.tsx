import React from 'react';

const About = () => {
  //clear the local storage
 const c= localStorage.getItem('atoken')
  //localStorage.clear();
  return <p>${c}</p>
}

export default About;
