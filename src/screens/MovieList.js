import React, {Component} from 'react';
import {Share, Alert, AsyncStorage, StyleSheet, FlatList, Text, ActivityIndicator, TouchableHighlight, Image, ScrollView, TextInput, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Dimensions } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { List, ListItem, SearchBar, } from 'react-native-elements';
import Toast, {DURATION} from 'react-native-easy-toast';
import ActionSheet from 'react-native-actionsheet';
//import AsyncStorage from '@react-native-community/async-storage';
import "../constants";

const {height,width} = Dimensions.get('window');

export default class MovieList extends Component {
  
  static navigationOptions = {
    title: 'Movies',
    headerStyle: {
      backgroundColor: '#D32F2E',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'left',
      flex:1,
    },
  };
  
  constructor(props) {
    super(props);
    this.state = {movieName: "" , isLoading:false, movieData:[]};
  }

  componentDidMount() {
    
  }

  movieNameChangedHandler = val => {
    
    this.setState({
      movieName: val
    });
  };

  searchMovieByName = async (movieName) => {

    if('' == movieName.trim()) {
      alert('Movie name is empty!.');
      this.setState({movieName:'', isLoading: false});
      return;
    }

    console.log("searchMovieByName");
    this.setState({isLoading: true});

    var url = global.API_URL + global.API_KEY;
//    console.log(url);

    var data = {
      // "s":  movieName,
      // "page": "1",
      // "apikey": global.API_KEY
    }

    return fetch( global.API_URL+ '?s=' + movieName + '&page=1&apikey=' + global.API_KEY, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ',
      },
      body:  JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((responseJson) => {

        if("True" == responseJson.Response ) {

          try {
            if(responseJson.Search &&  '0' < responseJson.Search.length) {
              for (let i = 0; i < responseJson.Search.length; i++) {
                responseJson.Search[i].isFavorite = false;
              }
              this.setState({ movieData: responseJson.Search});
              this.setState({isLoading: false});
              console.log(movieName);
              console.log(this.state.movieData);
            }

          } catch (error) {
            this.refs.toast.show('Oops! Something went wrong, Try again later.',1000);
            this.setState({isLoading: false});
          }
        }
        
      })
      .catch((error) =>{
        this.refs.toast.show('Oops! Something went wrong, Try again later.',3500);
        this.setState({isLoading: false});
      });
  }

  movieNameChangedHandler = val => {
    
    this.setState({
      movieName: val
    });
  };

  searchMovieByID = async (movieID) => {

    console.log("searchMovieByID");
    this.setState({isLoading: true});

    var data = {
     
    }

    return fetch( global.API_URL+ '?i=' + movieID + '&apikey=' + global.API_KEY, {
    
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ',
      },
      body:  JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((responseJson) => {

        console.log(responseJson);

        if("True" == responseJson.Response ) {

          try {
            this.setState({isLoading: false});
            this.props.navigation.navigate('MovieDetail', {"movie_details": responseJson})

          } catch (error) {
            this.refs.toast.show('Oops! Something went wrong, Try again later.',1000);
          }
        } 
        this.setState({isLoading: false});
      })
      .catch((error) =>{
        this.refs.toast.show('Oops! Something went wrong, Try again later.',3500);
        this.setState({isLoading: false});
      });
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message: this.state.movieActionSheetItem.Title,          
          url: this.state.movieActionSheetItem.Poster,
      });

      if (result.action === Share.sharedAction) {

        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('FavoriteMovies');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
    } catch (error) {
      // Error saving data
    }
  };

  markOrUnmarkAsFavorite = async () => {

    var alertString = "test";
    var temp = this.state.movieActionSheetItem.isFavorite;

    true == temp ? alertString = "Remove favorite ?" : alertString = "Mark as favorite";

    console.log(temp);

    Alert.alert(
      
      "", alertString,

      [
        //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => {

          console.log('OK Pressed');
          var tempArray = this.state.movieData;
          var temp = this.state.movieActionSheetItem.isFavorite;
          var tempItem = this.state.movieActionSheetItem;
          tempItem.isFavorite = !temp;
          tempArray[this.state.movieIndex] = tempItem;
          tempIndex = this.state.movieIndex;
                        
          this.setState({ 'movieData': tempArray});
          console.log(this.state.movieData);
          this.setState({'movieActionSheetItem': '', 'movieIndex': ''});
        } },
      ],

      {cancelable: false},
    );

    

  };

  render() {
    if(this.state.isLoading == true) {
      return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center",backgroundColor:'#303030'}}>
        <ActivityIndicator size="large" color="#dd4b45" />
          <Toast ref="toast"
            position='bottom' positionValue={200}
            style={{backgroundColor:'#dd4b45',borderRadius: 2}}
          />
        </View>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>

            {/* Movie List action sheet */}
            <ActionSheet
              ref={o => this.MovieActionSheet = o}
              title={'Choose your option'}
              options={ ['Share', 'View details', 'Close']}
              //options={ true == this.state.movieActionSheetItem ? ['Share', 'View details', 'Remove favorite', 'Close'] : ['Share', 'View details', 'Mark as favorite', 'Close']}
              cancelButtonIndex={3}
              destructiveButtonIndex={3}
              onPress={(index) => { 
                if(0 == index) {
                  this.onShare();
                }
                else if(1 == index) {
                  this.searchMovieByID(this.state.movieActionSheetItem.imdbID)
                }
                else if(2 == index) {
                  // var tempArray = this.state.movieData;
                  // var temp = this.state.movieActionSheetItem.isFavorite;
                  // var tempItem = this.state.movieActionSheetItem;
                  // tempItem.isFavorite = !temp;
                  // tempArray[this.state.movieIndex] = tempItem;
                  // tempIndex = this.state.movieIndex;
                  
                  // this.setState({ 'movieData': tempArray});
                  // console.log(this.state.movieData);

                }
              }}
            /> 

            {/* Search bar  */}
            <View style={styles.inputContainer}>        
              <TextInput
                placeholder="Enter movie name"
                value={this.state.movieName}
                onChangeText={this.movieNameChangedHandler}
                style={styles.movieInput}
              />        
              <TouchableOpacity activeOpacity={.6} onPress={() => {this.searchMovieByName(this.state.movieName)}} 
                    style={styles.movieButton}>
                    <Text style={{color:'white', fontSize:15, fontWeight:'bold'}}>Search</Text>
              </TouchableOpacity>
            </View>

            {/* Scroll View  */}
            <ScrollView style={styles.scrollViewContainer}>
              {this.state.movieData &&  '0' < this.state.movieData.length ?  this.state.movieData.map((item,i) => (
                <View style={styles.movieListView} key={i}>
                  <TouchableOpacity style={{  width:"35%", height:120,  }} activeOpacity={.6} onPress={() => { this.searchMovieByID(item.imdbID)}}>
                  {/* <Image resizeMode="contain"  style={{flex:1}} source={item.Poster && item.Poster != 'N/A' && item.Poster != '' ? {uri: item.Poster} : require('../images/empty_project.png') } ></Image> */}
                    {item.Poster && item.Poster != 'N/A' && item.Poster != '' ? <Image resizeMode="contain"  style={{flex:1}} source={{uri: item.Poster} } ></Image>
                    : <Image resizeMode="contain"  style={{marginLeft:8, width:"80%", height:"100%",}} source={ require('../images/empty_project.png') } ></Image> }
                  </TouchableOpacity>
                  {/* source={require('../images/empty_project.png')} */}
                  <Text onPress={() => { this.searchMovieByID(item.imdbID)}} style={{width:"50%", color:'white', fontSize:15, fontWeight:"400"}}>{item.Title}</Text>
                  <View style={{height:150, justifyContent:"space-between", }}>
                    <TouchableOpacity style={{alignSelf:"flex-start", height:50, width:50, marginRight:0, justifyContent:'center', alignItems:'center'}} onPress={() => { this.setState({'movieActionSheetItem': item, 'movieIndex': i}); this.MovieActionSheet.show();}}><Image style={{ width: 20, height: 20}} source={require('../images/ellipsis_white.png')} /></TouchableOpacity>
                    {/* <TouchableOpacity style={{alignSelf:"flex-end", height:50, width:50, marginRight:0, justifyContent:'center', alignItems:'center'}} onPress={() => { this.setState({'movieActionSheetItem': item, 'movieIndex': i}); this.markOrUnmarkAsFavorite(); } } ><Image style={{ width: 20, height: 20}} source={ true == item.isFavorite ? require('../images/heart_love.png') : require('../images/heart_white.png')} /></TouchableOpacity> */}
                  </View>
                </View>
              )):null}
            </ScrollView>

          </View> 
        </TouchableWithoutFeedback>

      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 16,
    backgroundColor: "#303030",
    alignItems: "center",
    justifyContent: "flex-start"
  },

  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  movieInput: {
    marginTop:8,
    marginLeft:8,
    width: "70%",
    height:40,
    color:'#fff',
  },
  movieButton: {
    marginTop:8,
    marginRight:8,
    width: "25%",
    height:40,
    alignItems:'center', 
    justifyContent:'center', 
    borderRadius:30, 
    backgroundColor:'#D32F2E',
  },
  scrollViewContainer: {
    width: "100%",
    marginTop:10, 
    borderTopColor:"#434343",
    borderTopWidth:1,
    //backgroundColor:'white',
  },
  movieListView: {
    width: "100%",
    height:150,
    flexDirection: 'row',
    borderBottomWidth:1,
    borderBottomColor:"#434343",
    justifyContent:"space-between",
    alignItems:'center',
  },
});
