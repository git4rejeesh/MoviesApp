import React, {Component} from 'react';
import { StyleSheet, ScrollView, Image, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

const {height,width} = Dimensions.get('window');

export default class MovieDetail extends Component {
  
  static navigationOptions = {
    title: 'Movie Details',
    headerStyle: {
      backgroundColor: '#D32F2E',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {movieDetails: this.props.navigation.getParam('movie_details', "test")};
  }

  componentDidMount() {
    console.log(this.state.movieDetails);
  }

  render() {
    
    return (
      <View style={styles.container}>
          
          {/* Scroll View  */}
          <ScrollView style={styles.scrollViewContainer} >
            <Image  source={this.state.movieDetails && this.state.movieDetails.Poster != 'N/A' && this.state.movieDetails.Poster != '' ? {uri: this.state.movieDetails.Poster} : require('../images/empty_project.png') }   style={{ width:"100%", height:400}}></Image>            
            <Text style={styles.textStyle}>{this.state.movieDetails.Title}</Text>
            <Text style={styles.textStyle}>Type : {this.state.movieDetails.Type}</Text>
            <Text style={styles.textStyle}>Year : {this.state.movieDetails.Year}</Text>
            <Text style={styles.textStyle}>Rated : {this.state.movieDetails.Rated}</Text>
            <Text style={styles.textStyle}>Released : {this.state.movieDetails.Released}</Text>
            <Text style={styles.textStyle}>Runtime : {this.state.movieDetails.Runtime}</Text>
            <Text style={styles.textStyle}>Actors : {this.state.movieDetails.Actors}</Text>
            <Text style={styles.textStyle}>Awards : {this.state.movieDetails.Awards}</Text>
            <Text style={styles.textStyle}>BoxOffice : {this.state.movieDetails.BoxOffice}</Text>
            <Text style={styles.textStyle}>Country : {this.state.movieDetails.Country}</Text>
            <Text style={styles.textStyle}>DVD : {this.state.movieDetails.DVD}</Text>
            <Text style={styles.textStyle}>Director : {this.state.movieDetails.Director}</Text>
            <Text style={styles.textStyle}>Genre : {this.state.movieDetails.Genre}</Text>
            <Text style={styles.textStyle}>Language : {this.state.movieDetails.Language}</Text>
            <Text style={styles.textStyle}>Metascore : {this.state.movieDetails.Metascore}</Text>
            <Text style={styles.textStyle}>Plot : {this.state.movieDetails.Plot}</Text>
            <Text style={styles.textStyle}>Production : {this.state.movieDetails.Production}</Text>
            <Text style={styles.textStyle}>Writer : {this.state.movieDetails.Writer}</Text>
            <Text style={styles.textStyle}>imdbID : {this.state.movieDetails.imdbID}</Text>
            <Text style={styles.textStyle}>imdbRating : {this.state.movieDetails.imdbRating}</Text>
            <Text style={[styles.textStyle,{ marginBottom:8}]}>imdbVotes : {this.state.movieDetails.imdbVotes}</Text>
          </ScrollView>
        </View> 
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303030",
  },

  scrollViewContainer: {
    width: "100%",
  },
  textStyle: {
    width:"100%", 
    marginTop:8, 
    marginLeft:8, 
    color:'white', 
    fontSize:15, 
    fontWeight:"400"
  },
  
});
