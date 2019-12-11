
import React, { Component } from 'react';
import { Container, Text, View, Header, Body, Button, Content, Form, Card, CardItem, Item, Input } from 'native-base';
import { throwStatement, thisTypeAnnotation } from '@babel/types';
import User from './profile.js'
const axios = require('axios');

export default class Userlist extends Component{
    constructor(){
        super()
        this.state = { 
            showTheThing : true,
            name : "",
            status : "",
            id : "",
            address : "",
            userresponse : [{}],
        }
    }
 
    componentDidMount(){
        let ref = this;
        axios.get('http://localhost:80/users').then(function (response) {
            ref.setState({userresponse : response.data})
        }).catch(function (error) {
            console.log(error);
        })
    }
    
    showUser(user){
        this.setState({showTheThing : false})
        this.setState({name : user.name})
        this.setState({address : user.address})
        this.setState({status : user.status})
        this.setState({id : user.id})
    }

    render(){
        return (
        <View>
            {
                this.state.showTheThing ? this.state.userresponse.map((user, key) => {
                    return (
                    <Button onPress={() => this.showUser(user)} key={key}>    
                        <Text>{user.name}</Text>
                    </Button>
                    );
                }) : 
            <Card>
                <CardItem header>
                    <Text>User Description</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            {this.state.name}
                        </Text>
                        <Text>
                            {this.state.address}
                        </Text>
                        <Text>
                            {this.state.status}
                        </Text>
                        <Text>
                            {this.state.id}
                        </Text>    
                    </Body>
                    
                </CardItem>
                <Button onPress={() => this.setState({showTheThing : true})}>           
                    <Text>Back</Text>   
                </Button>
            </Card>
    
            }
        </View>
        )
    }
}

