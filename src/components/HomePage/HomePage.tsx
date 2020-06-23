import React from 'react';
//import './App.css';
import { Container, Card, CardGroup, CardImg } from 'react-bootstrap';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RentableType from '../../types/RentableType';
import { Redirect, Link } from 'react-router-dom';
//import { Redirect } from 'react-router-dom';

interface HomePageState {
  isUsesrLoggedIn: boolean;
  rentables: RentableType[];
}

class HomePage extends React.Component {
  state: HomePageState;

  constructor(props: Readonly<{}>){
    super(props);
    this.state = {
      isUsesrLoggedIn: true, //homepage svi mogu da pristupe, necu da preusmeravam
      rentables: [],
    };
  }

  componentWillMount(){
    this.goToRooms();
  }
  componentWillUpdate(){
    this.goToRooms();
  }
  private goToRooms(){
    return(
      <Redirect to="/rentables" />
    )
  }

  render (){
    //ovo se koristi ako se zahteva log in
     /*if(this.state.isUsesrLoggedIn === false){
      return(
      <Redirect to="user/login" />);
    }*/ 


    return (

      <Container>
            <Card>
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={ faHome } />
                    </Card.Title>
                    <Card.Text>
                    
                    Welcome to Hotel Una!!!
                    </Card.Text>
                </Card.Body>
            </Card>

            <CardGroup>
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>
        <Link to="/rooms" className="btn-outline-primary">Rooms</Link>
      </Card.Title>
      <Card.Text>
        Enjoy the luxury of hotel rooms. Hotel Una offers rooms for everyone, in various price ranges.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <CardImg src="https://cdn.pixabay.com/photo/2018/01/23/20/48/hotel-3102375__340.jpg" 
              alt="Logo"/>    
      
    </Card.Footer>
  </Card>
  
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>Conference rooms</Card.Title>
      <Card.Text>
      Enjoy the luxury of hotel rooms. Organize conferences and meetings in the best equipped halls.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    
    <CardImg src="https://cdn.pixabay.com/photo/2020/04/20/08/24/office-5067104_960_720.jpg" 
              alt="Logo"/>
    </Card.Footer>
  </Card>
</CardGroup>
            
        </Container>
    )
  };

  /*//ovo ce mi trebati kada dajem spisak soba ili sala, ovde imam samo dve kategorije
  private singleRoom(room: RoomType){
    return (

    );
  }*/

 
}

export default HomePage;
