import React, {
    Component
} from 'react';
import {
    ActivityIndicator,
    ListView,
    Text,
    View,
    AsyncStorage,
    Button
} from 'react-native';

class Feed extends Component {
    static navigationOptions = {
        title: 'Bitcoin news',
        headerLeft: null
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
        this.navigate = this.props.navigation.navigate;
    }

    componentDidMount() {
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        AsyncStorage.getItem('data').then(value => {
                let data = JSON.parse(value);
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(data),
                }, function() {
                    // do something with new state
                })
            })
            .catch(error => {
                console.log(error);
            });
        return fetch('http://microchain.io/api/news/5925a5b82a37d71100415e5f')
            .then((response) => response.json())
            .then((responseJson) => {
                AsyncStorage.setItem('data', responseJson.body).then(() => {
                        let data = JSON.parse(responseJson.body);
                        this.setState({
                            isLoading: false,
                            dataSource: ds.cloneWithRows(data),
                        }, function() {
                            // do something with new state
                        });
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onLogOut() { 
        var self = this;
        AsyncStorage.removeItem('user')
            .then(() => { 
                self.navigate('Login');
            })
            .catch(error => console.log(error));
    }
    
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.text}, {rowData.date}</Text>}
            />
        <Button
          onPress={() => this.onLogOut()}
          title="Log Out"  
        />    
      </View>
    );
  }
}
export default Feed;