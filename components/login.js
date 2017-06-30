import React, { Component }  from 'react';
import { Text, View, StyleSheet, Button, TextInput, AsyncStorage } from 'react-native';
import DialogBox from 'react-native-dialogbox';

class Login extends Component {
  static navigationOptions = {
    title: '',
    header: null
  };

  constructor(props) { 
    super(props);
    this.navigate = this.props.navigation.navigate;
  }
  
  componentWillMount() { 
    const self = this;
    AsyncStorage.getItem('user').then(value => { 
      if (value) { 
        self.navigate('Feed');
      }
    })
      .catch(error => { 
        console.log(error);
      })
  }

  onLogin() {
    const self = this;
    if (!this.state) {
      this.dialogbox.alert('Input Username and Password');
    } else if (this.state.username !== 'admin' && this.state.password !== '123321') {
      this.dialogbox.alert('Incorrect login or passsword');
    } else {
      AsyncStorage.setItem('user', 'true')
        .then(() => {
        self.state.username = this.state.password = '';
        self.navigate('Feed');
      })
        .catch(error => { 
          self.dialogbox.alert(error);
        });  
    }  
  }

  render() {
    return (
      <View>
        <Text>BTC Feed</Text>
         <TextInput 
          placeholder="Username" 
          placeholderTextColor="#FFF"
          onChangeText={(username) => this.setState({username})}
              />
           <TextInput 
            placeholderTextColor="#FFF"
            placeholder="Password" 
            onChangeText={(password) => this.setState({password})}
            secureTextEntry 
              />
        <Button
          onPress={() => this.onLogin()}
          title="Log In"  
        />
        <DialogBox ref={dialogbox => { this.dialogbox = dialogbox }}/>
      </View>
    );
  }
 }
 
export default Login;