import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import {faHome,faUpload} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  return (
    <Container>
    
      <FontAwesomeIcon icon={ faHome } />
      &lt;3&lt;3 Welcome to Hotel Una!!! &lt;3&lt;3
      <FontAwesomeIcon icon={ faUpload } />  Upload
    </Container>
  );
}

export default App;
