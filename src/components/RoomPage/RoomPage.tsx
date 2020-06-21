import React from 'react';
import { Container, Card, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import RoomType from '../../types/RoomType';
import ConferenceRoomType from '../../types/ConferenceRoomType';
import RentableType from '../../types/RentableType';
import { Redirect } from 'react-router-dom';
import api, { ApiResponse } from '../../api/api';

interface RoomPageProperties{
    match: {
        params: {
            id: number;
        }
    }
}

interface RoomPageState{
    isUserLoggedIn: boolean;
    rentable?: RentableType;
    room?: RoomType;
    conferenceRoom?: ConferenceRoomType;
    message: string;
}

export default class RoomPage extends React.Component<RoomPageProperties>{
    state: RoomPageState;
    constructor(props: Readonly<RoomPageProperties>) {
        super(props);

        this.state = { 
            isUserLoggedIn: true,
            message: ""
        };
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

    private setRoomData(room: RoomType) {
        this.setState(Object.assign(this.state, {
            room: room,
        }));
    }

    private setConferenceRoom(conferenceRoom: ConferenceRoomType[]) {
        this.setState(Object.assign(this.state, {
            conferenceRoom: conferenceRoom,
        }));
    }

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

    componentDidUpdate(oldProperties: RoomPageProperties) {
        /*if (oldProperties.match.params.id === this.props.match.params.id) {
            return;
        }*/

        this.getRoomData();
    }

    private getRoomData() {
        api('api/room/' + this.props.match.params.id, 'get', {})
        .then((res: ApiResponse) => {
           // if (res.status === 'login') {
            //    return this.setLogginState(false);
            //}

            if (res.status === 'error') {
                return this.setMessage('Request error. Please try to refresh the page.');
            }

            const roomData: RoomType = {
                roomId: res.data.categoryId,
                roomNumber: res.data.roomNumber,
                bedType: res.data.bedType
                //set other params that are needed
            };

            this.setRoomData(roomData);
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
           // if (res.status === 'login') {
           //     return this.setLogginState(false);
           // }

            if (res.status === 'error') {
                return this.setMessage('Request error. Please try to refresh the page.');
            }

            if (res.data.statusCode === 0) {
                this.setMessage('');
                //this.setArticles([]);
                return;
            }
/*
            const articles: ArticleType[] =
            res.data.map((article: ArticleDto) => {
                const object: ArticleType = {
                    articleId: article.articleId,
                    name: article.name,
                    excerpt: article.excerpt,
                    description: article.description,
                    imageUrl: '',
                    price: 0,
                };

                if (article.photos !== undefined && article.photos?.length > 0) {
                    object.imageUrl = article.photos[article.photos?.length-1].imagePath;
                }

                if (article.articlePrices !== undefined && article.articlePrices?.length > 0) {
                    object.price = article.articlePrices[article.articlePrices?.length-1].price;
                }

                return object;
            });

            this.setArticles(articles);
            */
        });

       // this.getFeatures();
    }
}