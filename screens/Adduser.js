import { Icon } from 'native-base';
import React, { Component } from 'react';
import { Container, Text, Header, Label, Button, Content, Form, Item, Input } from 'native-base';
import { StyleSheet } from 'react-native';
const axios = require('axios');
var bodyFormData = new FormData();

export default class Adduser extends Component{
  constructor(){
    super()
    this.state = { name: "", 
                   address: "", 
                   status: "",
                   id: ""}
  }
  forceUpdateHandler(){
    this.forceUpdate();
  };
  login(){
    axios.post('http://localhost:80/user', {
      name: this.state.name,
      address: this.state.address,
      status: this.state.status,
      id: this.state.id
    })
    .then(function (response) {
      this.forceUpdateHandler()
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
    
   
  render(){
    return <Form style={styles.form}>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input onChangeText = {(name) => this.setState({name : name})  }/>
            </Item>
            <Item stackedLabel>
              <Label>Address</Label>
              <Input onChangeText = {(address) => this.setState({address : address})}/>
             </Item>
        <Item stackedLabel>
          <Label>Status</Label>
          <Input onChangeText = {(status) => this.setState({status : status})}/>
        </Item>
        <Item stackedLabel>
          <Label>Id</Label>
          <Input onChangeText = {(id) => this.setState({id : id})}/>
        </Item>
        <Button style={styles.button} onPress= {this.login.bind(this)}><Text>Add user</Text></Button>
      </Form>;
    }
}

const styles = StyleSheet.create({
   button: {
       marginTop: 40
   },
   form: {
       margin: 30
   }
  });

  