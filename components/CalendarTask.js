import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert, Image} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from 'react-redux';
import { formatHour, formatDateWithHour } from '../helpers/helper';
import { useTheme } from "react-native-paper";
import { Entypo, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Gradient } from "./Gradient";
const mapsSrc = require('../assets/icons/maps.png')

export function Task(props) {
  const mostrarData = props.show || false
  let task = props.task;
  const navigation = useNavigation();
  const user = useSelector(state => state.user).user

  const edit = () => {
    navigation.navigate("Event", { task: task });
  };

  const theme = useTheme();

  const styles = StyleSheet.create({
    itemLeft: {
      flexDirection: "row",
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: "flex-start",
      marginVertical: 10
      // width: '100%',
    },
    square: {
      // height: "100%",
      // flex: 1,
      width: 10,
      height: '100%',
      // backgroundColor: "#55BCF6", // Definir como passar a cor da tarefa
      //marginRight: 10,
    },
    itemTaskSubject: {
      /* TODO fontFamily: '', */
      fontSize: 22,
      color: theme.colors.onSurfaceVariant,
      paddingLeft: 5,
      width: "100%",
    },
    itemDate: {
      /* TODO fontFamily: '', */
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      flexShrink: 1,
      flexWrap: 'wrap',
    },
    superItem: {
      paddingTop: 5,
      flexDirection: 'row'

    },
    atumalaca: {
      padding: 10,
      
      flexShrink: 1
      // backgroundColor: ,
    },
    iconView: {
      width: 30,
      alignItems:'center'

    },
    acontecendoAgoraMapsIcon:{
      width: 24,
      height: 24,
    },
    acontecendoAgoraRow:{
      flexDirection: "row",
      justifyContent: "flex-start",  
      alignItems: "center",
    },
    localContainer:{
      borderWidth: 1,
      borderColor: theme.colors.outline,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
      flexDirection: 'row',
      padding: 5,
      paddingRight: 10,
      marginTop:5
    },
  });

  return (
        <TouchableOpacity style={{...styles.itemLeft}} onPress={edit}>
          <Gradient style={{ ...styles.square }} color={task.color}/>

          <View style={styles.atumalaca}>
            <Text style={styles.itemTaskSubject}>{task.name}</Text>
            <View style={styles.superItem}>
              <View style={styles.iconView}>
              <MaterialCommunityIcons name="clock" size={24} color={theme.colors.onSurfaceVariant} />
              </View>
              <Text style={styles.itemDate}>
                {""}
                {mostrarData ? formatDateWithHour(task.detail.datetime_init) : formatHour(task.detail.datetime_init)} -{" "}
                {formatHour(task.detail.datetime_end)}
              </Text>
            </View>
            {task.is_subject && task.teachers.length > 0 && (
            <View style={{flexDirection: 'row', alignItems:'center'}}>
              <FontAwesome name="user" size={24} style={{margin:5 }} color={theme.colors.onSurfaceVariant} />
              <Text style={{color:theme.colors.onSurfaceVariant}}>{task.teachers[0]}{task.teachers.length > 1? " +":""}</Text>
            </View>
            )}
            
            {task.description.length > 0 &&(
            <View style={styles.superItem}>
            <View style={styles.iconView}>
            <Entypo name="text" size={24} color={theme.colors.onSurfaceVariant} />
              
            </View>
              <Text style={styles.itemDate}>{`${task.description}`}
            </Text>
            </View>)}
            {task.detail.local.length > 0 && (<View style={styles.acontecendoAgoraRow}>
            <TouchableOpacity style={styles.localContainer}
              onPress={async () => {
                let place = user.campus + ", UFSCAR, " + task.detail.local;

                const url =
                  "https://www.google.com/maps/search/?api=1&query=" +
                  encodeURI(place);

                const supported = await Linking.canOpenURL(url);

                if (supported) {
                  await Linking.openURL(url);
                } else {
                  Alert.alert(`Don't know how to open this URL: ${url}`);
                }
              }}
            
            >
              <Image style={styles.acontecendoAgoraMapsIcon} source={mapsSrc}/>
              <Text style={{color: theme.colors.onSurfaceVariant}}>
              {task.detail.local}
              </Text>
            </TouchableOpacity>
            <View style={styles.emptyflex}/>
            </View>)}
          </View>
    </TouchableOpacity>
  );

}

export function CalendarTask(props) {
  const mostrarData = props.show || false
  let task = props.task;
  const navigation = useNavigation();

  const edit = () => {
    navigation.navigate("Event", { task: task });
  };
  const user = useSelector(state => state.user).user
  

  const theme = useTheme();

  const styles = StyleSheet.create({
    itemLeft: {
      flexDirection: "row",
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: "flex-start",
      margin: 10,

    },
    square: {
      width: 10,
      height: '100%',
    },
    itemTaskSubject: {
      fontSize: 22,
      color: theme.colors.onSurfaceVariant,
      paddingLeft: 5,
      width: "100%",
    },
    itemDate: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      flexShrink: 1,
      flexWrap: 'wrap',
    },
    superItem: {
      paddingTop: 5,
      flexDirection: 'row'

    },
    atumalaca: {
      padding: 10,
      
      flexShrink: 1
    },
    iconView: {
      width: 30,
      alignItems:'center'

    },
    acontecendoAgoraMapsIcon:{
      width: 24,
      height: 24,
    },
    acontecendoAgoraRow:{
      flexDirection: "row",
      justifyContent: "flex-start",  
      alignItems: "center",
    },
    localContainer:{
      borderWidth: 1,
      borderColor: theme.colors.outline,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
      flexDirection: 'row',
      marginTop:5,
      padding: 5,
      paddingRight: 10,
    },

  });

  return (
        <TouchableOpacity style={{...styles.itemLeft}} onPress={edit}>
          <Gradient style={{ ...styles.square }} color={task.color}/>
          <View style={styles.atumalaca}>
            <Text style={styles.itemTaskSubject}>{task.name}</Text>
            <View style={styles.superItem}>
              <View style={styles.iconView}>
              <MaterialCommunityIcons name="clock" size={24} color={theme.colors.onSurfaceVariant} />
              </View>
              <Text style={styles.itemDate}>
                {""}
                {mostrarData ? formatDateWithHour(task.detail.datetime_init) : formatHour(task.detail.datetime_init)} -{" "}
                {formatHour(task.detail.datetime_end)}
                
              </Text>
            </View>
            {task.detail.local.length > 0 && (<View style={styles.acontecendoAgoraRow}>
            <TouchableOpacity style={styles.localContainer}
              onPress={async () => {
              let place = user.campus + ", UFSCAR, " + task.detail.local;
    
              const url =
                "https://www.google.com/maps/search/?api=1&query=" +
                encodeURI(place);
    
              const supported = await Linking.canOpenURL(url);
    
              if (supported) {
                await Linking.openURL(url);
              } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
              }
            }}
            
            >
              <Image style={styles.acontecendoAgoraMapsIcon} source={mapsSrc}/>
              <Text style={{color: theme.colors.onSurface}}>
              {task.detail.local}
              </Text>
            </TouchableOpacity>
            <View style={styles.emptyflex}/>
            </View>)}
          </View>
          
    </TouchableOpacity>
  );

}
