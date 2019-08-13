import React, {Component} from 'react';
import { StyleSheet, Text, View , Image, Button, TouchableOpacity, Dimensions} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import MovieDetail from "./src/screens/MovieDetail";
import MovieList from "./src/screens/MovieList";

const {height,width} = Dimensions.get('window');


const AppNavigator = createStackNavigator({  
  MovieList:MovieList,
  MovieDetail:MovieDetail,
});

export default createAppContainer(AppNavigator);
