import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
  TouchableHighlight,
    Linking,
    KeyboardAvoidingView,
    Alert
} from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {Container, Content,Header, Form, Input,Item, Button,Label, } from 'native-base'
import firebase from "firebase";

import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';
const auth0ClientId = 'ZQMwkQ3aRQ0Iun6lO8Bgg1mT4TefEKws';
const auth0Domain = 'https://equippersapp.au.auth0.com';

import { globalStyles } from "../../styles/global";

require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyAWe1wOBT1uknJTnnBpaIFWJWZJAc0gAEI",
  authDomain: "expopushtest-21a17.firebaseapp.com",
  databaseURL: "https://expopushtest-21a17.firebaseio.com",
  projectId: "expopushtest-21a17",
  storageBucket: "expopushtest-21a17.appspot.com",
  messagingSenderId: "440264739101",
  appId: "1:440264739101:web:3a4ddffd763eb63efc79f4",
  measurementId: "G-F9P570SGMG"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends React.Component {
  state = {
    name: null,
  };


constructor(props){
  super(props)

  this.state = ({
    email: '',
    password: ''
  })
}

signUpUser = (email,password) => {
  try {
    if(this.state.password.length<6){
    alert("Password needs to be more than 6")
      return;
  }
  firebase.auth().createUserWithEmailAndPassword(email,password)

  } catch (error) {
    console.log(error)
    
  }

}

logInUser = (email,password) => {
  
try {
  firebase.auth().signInWithEmailAndPassword(email,password).then(function (user) {
    console.log(user)
  })
} catch (error) {
  console.log(error)
}
}
loginPCO =  () => {
  
};

handleResponse = (response) => {
  if (response.error) {
    Alert('Authentication error', response.error_description || 'something went wrong');
    return;
  }

  // Retrieve the JWT token and decode it
  const jwtToken = response.id_token;
  const decoded = jwtDecode(jwtToken);

  const { name } = decoded;
  this.setState({ name });
};
  render() {
    const { name } = this.state;
    return (

      <ImageBackground source={require("../../assets/13914.png")} style={globalStyles.giveImage}>
          <KeyboardAvoidingView style={styles.keyboardAvoidContainer} behavior="padding">
      <View>
 
      <StatusBar backgroundColor="blue" barStyle="light-content" />
  
     <View style={{backgroundColor:'#141218', padding: 20,height: vh(55), borderTopRightRadius:30,borderTopLeftRadius:30, zIndex:99, justifyContent:'flex-start'}}>
   
      
     


     <Container style={styles.container}>
       
       <Form>
         <Item floatingLabel>
           <Label
           style={styles.labelFont}
           >Email</Label>
           <Input 
           style={styles.labelFont}
           autoCorrect={false}
           autoCapitalize='none'
           onChangeText={(email) => this.setState({email})}
           />
         </Item>
         <Item floatingLabel>
           <Label
           style={styles.labelFont}
           >Password</Label>
           <Input 
           style={styles.labelFont}
           secureTextEntry={true}
           autoCorrect={false}
           autoCapitalize='none'
           onChangeText={(password) => this.setState({password})}
           />
         </Item>
         <View   style={styles.buttonWrap}>
         <Button
         full
         rounded
         light
         bordered
         onPress={()=> this.logInUser(this.state.email, this.state.password)}
         >
           
           <Text style={styles.labelFont}>Login</Text>
         </Button>
         <Button
         full
         bordered
         light
         rounded
         
         onPress={()=> this.signUpUser(this.state.email, this.state.password)}
         >
           <Text style={styles.labelFont}>Signup</Text>
         </Button>
       
         </View>
         <View>
           <Button
          full
          bordered
          light
          rounded
          
          onPress={this.loginPCO}
          >
            <Text style={styles.labelFont}>Login with Planning center</Text>
          </Button>
        
      </View>
       </Form>
     </Container>
     </View></View>
     </KeyboardAvoidingView>
    </ImageBackground>
     
    );
  }
}


const styles = StyleSheet.create({
  buttonWrap: {
    marginTop: 30,
  },
  
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'flex-start'
  },
  labelFont: {
    color:'white',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
    color: 'white',
  },
});

/**
 * Converts an object to a query string.
 */
function toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}
