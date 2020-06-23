import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import RoomType from '../../types/RoomType';
import api, { ApiResponse } from '../../api/api';
import { Redirect } from 'react-router-dom';

interface RoomPageProperties{
    match: {
        params: {
            id: number;
        }
    }
}

interface RoomDto {
    roomId?: number;
    numOfBeds?: number;
    bedType?: "single" | "double" | "bunk_bed" | "king_size";
    balcony?: boolean;
    orientation?: "east" | "west" | "south" | "north";
    floor?: number;
    closet?: boolean;
    desk?: boolean;
    airConditioner?: boolean;
    roomNumber?: number;
}

interface RoomPageState{
    isUserLoggedIn: boolean;
    rooms: RoomDto[];
    message: string;
}

export default class RoomPage extends React.Component<RoomPageProperties>{
    state: RoomPageState;
    constructor(props: Readonly<RoomPageProperties>) {
        super(props);

        this.state = { isUserLoggedIn: true, message: '', rooms: []};
    }

    private setLogginState(isLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isUserLoggedIn: isLoggedIn,
        });

        this.setState(newState);
    }

    private setMessage(message: string) {
        const newState = Object.assign(this.state, {
            message: message,
        });

        this.setState(newState);
    }
/*
    private setClientData(client: ClientType) {
        console.log(client);
        this.setState(Object.assign(this.state, {
            client: client,
        }));
    }
*/
    private setRoomData(rooms: RoomType[]) {
        console.log(rooms);
        this.setState(Object.assign(this.state, {
            rooms: rooms,
        }));
    }

    render(){
        if (this.state.isUserLoggedIn === false) {
            return (
                <Redirect to="/user/login" />
            );
        }
        return(
            <Container>
            <Card>
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={ faListAlt } /> All rooms in Hotel Una
                    </Card.Title>
                    <Card.Text>
                       
                        { this.state.rooms.map(this.printRoomRow, this) }
                        
                    </Card.Text>
                </Card.Body>
            </Card>
            
        </Container>
        );
    }

    private printRoomRow(room: RoomType) {
        return (
            <tr>
                <td>Room number: { room.roomNumber}</td>
                <td> Floor: {room.floor }  </td>
                <td> Number of beds {room.numOfBeds }  </td>
                <td> Bed type { room.bedType }  </td>
                <td> Room orientation { room.orientation }  </td>
                <td> Balcony {room.balcony }  </td>
                <td> Air Conditioner { room.airConditioner }</td>
                <td> Closet { room.closet }</td>
                <td> Desk { room.desk }</td>
            </tr>
        );
    }
   /* componentWillMount(){
        this.getClientData();
    }

    componentWillReceiveProps(newProperties: ClientPageProperties){
        if (newProperties.match.params.id === this.props.match.params.id){
            return;
        }

        this.getClientData();
    }*/

    componentDidMount() {
        this.getRoomData();
    }

    componentDidUpdate(oldProperties: RoomPageProperties) {
        if (oldProperties.match.params.id === this.props.match.params.id) {
            return;
        }

        this.getRoomData();
    }

    private getRoomData() {
//+ this.props.match.params.id
        api('api/room' , 'get', {})
        .then((res: ApiResponse) => {
            const data: RoomDto[] = res.data;
            const rooms: RoomType[] = data.map(room => ({
                roomId: room.roomId,
                numOfBeds: room.numOfBeds,
                bedType: room.bedType,
                balcony: room.balcony,
                orientation: room.orientation,
                floor: room.floor,
                closet: room.closet,
                desk: room.closet,
                airConditioner: room.airConditioner,
                roomNumber: room.roomNumber
            }));
            if (res.status === 'login') {
                return this.setLogginState(false);
            }

            if (res.status === 'error') {
                return this.setMessage('Request error. Please try to refresh the page.');
            }
/*
            const clientData: ClientType = {
                clientId: res.data.clientId,
                forename: res.data.forename,
                surname: res.data.surname,
                phone: res.data.phone,
                address: res.data.address,
            };
            */
            
            this.setRoomData(rooms);
/*
            const subcategories: ClientType[] =
            res.data.categories.map((client: ApiClientDto) => {
                return {
                    clientId: client.clientId,
                    forename: client.forename,
                    surname: client.surname,
                    phone: client.phone,
                    address: client.address,
                }
            });

            this.setSubcategories(subcategories);*/


            //simuliramo logiku dostavljanja podataka
        /*setTimeout(() => 
        {
            const data: ClientType = {
                forename: 'Client: ' + this.props.match.params.id,
                clientId: this.props.match.params.id
            };

            this.setState({client: data,})
        }, 750);*/
        });
    }
}