import React, {Component} from 'react';
import { StyleSheet,TouchableOpacity,StatusBar,ScrollView , Text, View } from 'react-native';
import PlayListElement from "../Components/PlaylistItem";
import AudioWave from "../Components/Audiowave";
import RateBar from "../Components/RateBar";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {connect} from 'react-redux'
import { NavigationEvents } from 'react-navigation';
import socketIOClient from "socket.io-client";
import * as Device from "expo-device";
// import { genid } from "../utils";

class PartyClient extends Component {
    
  render(){
    return (
    
      <View style={styles.container}>
        <NavigationEvents onDidBlur={payload =>  this.refs._scrollView.scrollTo({y: 0,x:0,animated: true})} />
      <StatusBar barStyle="dark-content" />


        {/* ======================TopPart (Playlist Queue)================ */}
        <View style={[styles.header,styles.shadow]}>
          <Text style={styles.currentMusic}>{this.props.title}</Text>
          <AudioWave color='#EE4540' style={styles.waveform} playing={this.props.isPlaying}></AudioWave>
          <RateBar style={styles.rateBar} likes={this.props.likes} dislikes={this.props.dislikes}></RateBar>
        </View>
      
        {/* ======================BottomPart (Playlist Queue)================ */}
        <View style={[styles.bottomSlot]}>

          {/* Scroll de la playlist */}
          <ScrollView ref='_scrollView' showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow : 1,alignItems: 'center', justifyContent : 'center'}}>
            <Text style={styles.bottomSlotText}>Current mixer</Text>
            <View style={{flexDirection:'row'}}>
              <MaterialCommunityIcons name="speaker-wireless" size={32} style={[{paddingTop: 2},{margin: 10},styles.currentMixer]}/>
              <Text style={styles.currentMixer}>Kraxkan</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <MaterialCommunityIcons name="star-four-points-outline" size={15} color='grey' style={{marginTop:-10}}/>
              <Text style={styles.mixerPoints}>258</Text>
            </View>
            <Text style={styles.bottomSlotText}>Next songs (6)</Text>

            <PlayListElement songName='Button up' songArtist='Odd Chap' mixerName='Michel'></PlayListElement>
            <PlayListElement songName='Manbo Rap' songArtist='Parov Stellar' mixerName='Jean-Charles'></PlayListElement>
            <PlayListElement songName='What Lana Says' songArtist='Proteler' mixerName='Norbert'></PlayListElement>
            <PlayListElement songName='Wochened Und Sonnenschein' songArtist='Wolfgang Lohr' mixerName='Jacques'></PlayListElement>
            <PlayListElement songName='Lets Do it' songArtist='11 Acorn Lane' mixerName='Someone'></PlayListElement>
            <PlayListElement songName='Dies Irae' songArtist='Apashe' mixerName='Anonymous'></PlayListElement>
          </ScrollView>
         </View>
         
       </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isPlaying: state.isPlaying,
    title: state.title,
    likes: state.likes,
    dislikes: state.dislikes,
    connectedUsers: state.connectedUsers
  }
}

export default connect(mapStateToProps, null)(PartyClient)

const styles = StyleSheet.create({
  shadow:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

  },
  container: {
    flex: 1,
    backgroundColor: 'white',
   
  },
  header: {
    height: '30%',
    alignItems : 'center',
  },
  currentMusic:{
    color : 'black',
    fontWeight : 'bold',
    marginTop: 30,
    fontSize: 20,
  },
  waveform:{
    position: 'absolute',
    top: '40%'
  },
  rateBar:{
    position: 'absolute',
    bottom: 10,
  },
  bottomSlot: {
    display: 'flex',
    backgroundColor: '#1d1427',
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    borderTopLeftRadius : 100,
  },
  bottomSlotText: {
    color: 'grey',
    marginTop : 10,
    fontWeight : 'bold',
  },
  currentMixer:{
    color: '#EE4540',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 25,
  },
  mixerPoints:{
    color: '#717171',
    fontSize: 13,
    marginTop: -10,
  },
  addBtn:{
    width : 50,
    height: 50,
    backgroundColor: '#EE4540',
    borderRadius: 50,
    position: "absolute",
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: "white",
    shadowOpacity: 0.7,
    shadowRadius: 8,

    top: 10,
    
    right: 10,
  },
  addBtnTxt:{
    color: 'white',
    fontSize : 30,
    fontWeight: 'bold'
  },
});
