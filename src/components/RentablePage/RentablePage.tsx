import React from 'react';
import { Container, Card, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import RoomType from '../../types/RoomType';
import ConferenceRoomType from '../../types/ConferenceRoomType';
import RentableType from '../../types/RentableType';
import { Redirect } from 'react-router-dom';
import api, { ApiResponse } from '../../api/api';

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

                        { this.showRooms() }
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    /*componentWillMount(){
        this.getRoomData();
    }*/

    /*componentWillReceiveProps(newProperties: RoomPageProperties){
        if (newProperties.match.params.id === this.props.match.params.id){
            return;
        }

        this.getRoomData();
    }*/

    private showRooms(){
        if (this.state.room === undefined) {
            return;
        }

        return (
            <Row>
                { this.state.room?.roomNumber }
            </Row>
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





    componentDidMount() {
        this.getRoomData();
    }

    componentDidUpdate(oldProperties: RentablePageProperties) {
        if (oldProperties.match.params.id === this.props.match.params.id) {
            return;
        }

        this.getRoomData();
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
          //  if (res.status === 'login') {
          //      return this.setLogginState(false);
          //  }

            if (res.status === 'error') {
                return this.setMessage('Request error. Please try to refresh the page.');
            }

            if (res.data.statusCode === 0) {
                this.setMessage('');
                //this.setRoom();
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
}