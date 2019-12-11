import React, { Component } from 'react';
import { Container, StyleSheet, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import Userlist from './Userlist';
import Adduser from './Adduser';

const COMPONENT = {
    ADD_USER  : true,
    USER_LIST : false
}
const COMPONENT2 = {
    Bool1  : true,
    Bool2  : false,
}
export default class Main extends Component{
    constructor(props){
        super(props);
        this.state = { 
            activeComponent : COMPONENT.USER_LIST,
        }
    }
    
    changeVisibility = (param) => {
        this.setState({activeComponent: param});
        
    }

    renderActiveComponent = () => {
        if(this.state.activeComponent === COMPONENT.ADD_USER){
            COMPONENT2.Bool1 = false
            COMPONENT2.Bool2 = true
            return <Adduser/>
        }
         if(this.state.activeComponent === COMPONENT.USER_LIST){
            COMPONENT2.Bool1 = true
            COMPONENT2.Bool2 = false
            return <Userlist/>
        }
    }

    render(){
        return (
            <Container>
                <Header>
                </Header>
                <Content>
                    {this.renderActiveComponent()}

                </Content>



                <Footer>
                <FooterTab>
                    <Button vertical active={COMPONENT2.Bool1} onPress = { ()=>{this.changeVisibility(COMPONENT.USER_LIST)} }>
                    <Icon name="apps"/>
                    <Text>User List</Text>
                    </Button>
                    <Button vertical active={COMPONENT2.Bool2} onPress = { ()=>this.changeVisibility(COMPONENT.ADD_USER) } >
                    <Icon name="person" />
                    <Text>Add User</Text>
                    </Button>
                </FooterTab>
                </Footer>
            </Container>
        );
    }
}
