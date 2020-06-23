import React from 'react';
import { Nav, Container, Card, CardImg } from 'react-bootstrap';
import { Link, HashRouter } from 'react-router-dom';


export class MainMenuItem {
    text: string ='';
    link: string = '#';

    constructor(text: string, link: string){
        this.text = text;
        this.link = link;
    }
}

interface MainMenuProperties {
    items: MainMenuItem[];
}
interface MainMenuState {
    items: MainMenuItem[];
}
export class MainMenu extends React.Component<MainMenuProperties> {
    state: MainMenuState;
    constructor(props: Readonly<MainMenuProperties>){
        super(props);
        this.state = {
            items: props.items,
        };

        //demonstration how set works
        /*setInterval(()=> {
            const staraLista = [... this.state.items];
            staraLista.push(new MainMenuItem("Proba","/proba/"));
            this.setItems(staraLista);
        },2000);
        
        //what should be done, connect to API, receive info, add Item
        //or smthng like that :O
        */

;    }

    setItems(items: MainMenuItem[]){
        this.setState({
            items: items,
        });
    }
    
    render(){
        return (
            
            <Container>
                <Card> 
                    <Card.Header >
                        <CardImg
                   
                    src="https://cdn.pixabay.com/photo/2016/11/10/19/20/banner-1814989__340.jpg" 
                    alt="Logo" 
                    />
                </Card.Header>
              </Card>
                <Nav variant="tabs">
                    <HashRouter>
                        { this.state.items.map(this.makeNavLink) }
                    </HashRouter>
                </Nav>
                
            </Container>
        );
    }
    private makeNavLink(item: MainMenuItem){
        return (
        <Link to={ item.link } className="nav-link">
            { item.text }
        </Link>)
        ;
    }
}