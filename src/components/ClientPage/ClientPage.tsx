import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import ClientType from '../../types/ClientType';

interface ClientPageProperties{
    match: {
        params: {
            id: number;
        }
    }
}

interface ClientPageState{
    client?: ClientType;
}

export default class ClientPage extends React.Component<ClientPageProperties>{
    state: ClientPageState;
    constructor(props: Readonly<ClientPageProperties>) {
        super(props);

        this.state = { };
    }

    render(){
        return(
            <Container>
            <Card>
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={ faListAlt } /> { this.state.client?.forename }
                    </Card.Title>
                    <Card.Text>
                        Client data
                        { this.state.client?.clientId }
                    </Card.Text>
                </Card.Body>
            </Card>
            
        </Container>
        );
    }

    componentWillMount(){
        this.getClientData();
    }

    componentWillReceiveProps(newProperties: ClientPageProperties){
        if (newProperties.match.params.id === this.props.match.params.id){
            return;
        }

        this.getClientData();
    }

    private getClientData() {
        //simuliramo logiku dostavljanja podataka
        setTimeout(() => 
        {
            const data: ClientType = {
                forename: 'Client: ' + this.props.match.params.id,
                clientId: this.props.match.params.id
            };

            this.setState({client: data,})
        }, 750);
    }
}