import React from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RoomType from '../../types/RoomType';
import { ApiConfig } from '../../config/api.config';
import api, { ApiResponse } from '../../api/api';

interface SingleRoomPreviewProperties {
    room: RoomType,
}

interface SingleRoomPreviewState {
    quantity: number;
}

export default class SingleRoomPreview extends React.Component<SingleRoomPreviewProperties> {
    state: SingleRoomPreviewState;

    constructor(props: Readonly<SingleRoomPreviewProperties>) {
        super(props);

        this.state = {
            quantity: 1,
        }
    }

    private quantityChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            quantity: Number(event.target.value),
        });
    }

    render() {
        return (
            <Col lg="4" md="6" sm="6" xs="12">
                <Card className="mb-3">
                    
                    <Card.Body>
                        <Card.Title as="p">
                            <strong>{ this.props.room.roomNumber }</strong>
                        </Card.Title>
                        <Link to={ `/room/${ this.props.room.roomId }` }
                              className="btn btn-primary btn-block btn-sm">
                            Open room page
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}
