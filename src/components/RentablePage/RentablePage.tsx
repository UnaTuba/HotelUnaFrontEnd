import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import RoomType from '../../types/RoomType';
import ConferenceRoomType from '../../types/ConferenceRoomType';
import RentableType from '../../types/RentableType';
import { Redirect, Link } from 'react-router-dom';
import api, { ApiResponse } from '../../api/api';
import SingleRoomPreview from '../SingleRoomPreview/SingleRoomPreview';

interface RentablePageProperties{
    match: {
        params: {
            id: number;
        }
    }
}

interface RentablePageState{
    isUserLoggedIn: boolean;
    rentable?: RentableType;
    room?: RoomType;
    conferenceRoom?: ConferenceRoomType;
    message: string;
}

interface RoomDto {
    roomId: number;
    numOfBeds: number;
    bedType: "single" | "double" | "bunk_bed" | "king_size";
    balcony: boolean;
    orientation: "east" | "west" | "south" | "north";
    floor: number;
    closet: boolean;
    desk: boolean;
    airConditioner: boolean;
    roomNumber: number;
}

export default class RentablePage extends React.Component<RentablePageProperties>{
    state: RentablePageState;
    constructor(props: Readonly<RentablePageProperties>) {
        super(props);

        this.state = { 
            isUserLoggedIn: true,
            message: ""
        };
    }

    private setRoom(room: RoomType) {
        this.setState(Object.assign(this.state, {
            room: room,
        }));
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

    private setRentableData(rentable: RentableType) {
        this.setState(Object.assign(this.state, {
            rentable: rentable,
        }));
    }

    /*private setConferenceRoom(conferenceRoom: ConferenceRoomType[]) {
        this.setState(Object.assign(this.state, {
            conferenceRoom: conferenceRoom,
        }));
    }*/

    render(){
        
        if (this.state.isUserLoggedIn === false) {
            return (
                <Redirect to="/user/login" />
            );
        }

        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={ faListAlt } /> { this.state.room?.roomId }
                        </Card.Title>
                        <Row>
                            <Col xs="12" md="8" lg="9">
                                { /*this.showRooms()*/this.state.rentable?.price }
                            </Col>
                        </Row>
                        
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    /*componentWillMount(){
        this.getRoomData();
    }*/

    private showRooms(){
        if (this.state.room === undefined) {
            return(
                <div>There are no rooms to be shown.</div>
            );
        }

        return (
            <Row>
                <SingleRoomPreview room={this.state.room} />
                Price: { Number(this.state.rentable?.price).toFixed(2) } RSD      
            </Row>
        );
    }

    private singleRoom(room: RoomType) {
        return (
            <SingleRoomPreview room={room} />
        );
    }
    /*private getRoomData() {
        //simuliramo logiku dostavljanja podataka
        /*setTimeout(() => 
        {
            const data: RoomType = {
                roomNumber: this.props.match.params.id,
                roomId: this.props.match.params.id
            };

            this.setState({room: data,})
        }, 750);
    }*/

    private singleRentable(rentable: RentableType) {
        return (
            <Col lg="3" md="4" sm="6" xs="12">
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title as="p">
                            { rentable.rentableId }
                            { rentable.price }
                        </Card.Title>
                        <Link to={ `/rentable/${ rentable.rentableId }` }
                              className="btn btn-primary btn-block btn-sm">
                            Open room
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        );
    }



    componentDidMount() {
        this.getRentableData();
    }

    componentDidUpdate(oldProperties: RentablePageProperties) {
        if (oldProperties.match.params.id === this.props.match.params.id) {
            return;
        }

        this.getRentableData();
    }

    private getRoomData() {
        api('api/room/' + this.props.match.params.id, 'get', {})
        .then((res: ApiResponse) => {
           // if (res.status === 'login') {
            //    return this.setLogginState(false);
          //  }

            if (res.status === 'error') {
                return this.setMessage('Request error. Please try to refresh the page.');
            }

            const rentableData: RentableType = {
                rentableId: res.data.rentableId,
                conferenceRoomId: res.data.conferenceId,
                roomId: res.data.roomId, 
                price: res.data.price,
                wifi: res.data.wifi,
            };

            this.setRentableData(rentableData);
/*
            const subcategories: CategoryType[] =
            res.data.categories.map((category: ApiCategoryDto) => {
                return {
                    categoryId: category.categoryId,
                    name: category.name,
                    bedType: 
                }
            });

            this.setSubcategories(subcategories);
    */
        });

/*
        const orderParts = this.state.filters.order.split(' ');
        const orderBy = orderParts[0];
        const orderDirection = orderParts[1].toUpperCase();

        const featureFilters: any[] = [];

        for (const item of this.state.filters.selectedFeatures) {
            let found = false;
            let foundRef = null;

            for (const featureFilter of featureFilters) {
                if (featureFilter.featureId === item.featureId) {
                    found = true;
                    foundRef = featureFilter;
                    break;
                }
            }

            if (!found) {
                featureFilters.push({
                    featureId: item.featureId,
                    values: [ item.value ],
                });
            } else {
                foundRef.values.push(item.value);
            }
        }
*/
        api('api/room/search/', 'post', {
            roomId: Number(this.props.match.params.id),
            //keywords: this.state.filters.keywords,
            //priceMin: this.state.filters.priceMininum,
            //priceMax: this.state.filters.priceMaximum,
            //features: featureFilters,
            //orderBy: orderBy,
            //orderDirection: orderDirection,
        })
        .then((res: ApiResponse) => {
          if (res.status === 'login') {
                return this.setLogginState(false);
        }

            if (res.status === 'error') {
                return this.setMessage('Request error. Please try to refresh the page.');
            }

            if (res.data.statusCode === 0) {
                this.setMessage('');
                //this.setRooms();
                return;
            }

            const room: RoomType =
            res.data.map((room: RoomDto) => {
                const object: RoomType = {
                    roomId: room.roomId,
                    roomNumber: room.roomNumber,
                    numOfBeds: room.numOfBeds,
                    bedType: room.bedType,
                    balcony: room.balcony,
                    orientation: room.orientation,
                    floor: room.floor,
                    closet: room.closet,
                    desk: room.desk,
                    airConditioner: room.airConditioner
                };

                

                return object;
            });

            this.setRoom(room);
            
        }); 

       // this.getFeatures();
    }

    private getRentableData() {
        api('api/rentable',  'get', {})
        .then((res: ApiResponse) => {
            if (res.status === 'login') {
                return this.setLogginState(false);
            }

            if (res.status === 'error') {
                console.log('Request error. Please try to refresh the page.');
                return this.setMessage('Request error. Please try to refresh the page.');
            }

            const rentableData: RentableType = {
                rentableId: res.data.rentableId,
                roomId: res.data.roomId,
                conferenceRoomId: res.data.conferenceRoomId,
                wifi: res.data.wifi,
                price: res.data.price,
                //maxCapacity: res.data.maxCapacity,
            };

            this.setRentableData(rentableData);

            

            //this.setSubcategories(subcategories);
        });

        api('api/room/search/', 'post', {
            roomId: Number(this.props.match.params.id),
            //keywords: this.state.filters.keywords,
            //priceMin: this.state.filters.priceMininum,
            //priceMax: this.state.filters.priceMaximum,
            //features: featureFilters,
            //orderBy: orderBy,
            //orderDirection: orderDirection,
        })
        .then((res: ApiResponse) => {
          if (res.status === 'login') {
                return this.setLogginState(false);
        }

            if (res.status === 'error') {
                return this.setMessage('Request error. Please try to refresh the page.');
            }

            if (res.data.statusCode === 0) {
                this.setMessage('');
                //this.setRooms();
                return;
            }

            const room: RoomType =
            res.data.map((room: RoomDto) => {
                const object: RoomType = {
                    roomId: room.roomId,
                    roomNumber: room.roomNumber,
                    numOfBeds: room.numOfBeds,
                    bedType: room.bedType,
                    balcony: room.balcony,
                    orientation: room.orientation,
                    floor: room.floor,
                    closet: room.closet,
                    desk: room.desk,
                    airConditioner: room.airConditioner
                };

                

                return object;
            });

            this.setRoom(room);
            
        }); 
    }
}