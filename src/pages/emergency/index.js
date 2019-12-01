import React, { Component } from "react";
import * as RNFS from 'react-native-fs'

import {
  View, Text, StyleSheet, Platform, PermissionsAndroid,
  Linking,
  Alert, FlatList, TextInput, TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Contacts from 'react-native-contacts';
import ContactsWrapper from 'react-native-contacts-wrapper';

import styles from './estilo';

export default class Sobre extends Component {

  state = {
    name: '',
    phoneNumber: ''
  }

  save = () => {
    if (this.state.name === '')
      return

    else if (this.state.phoneNumber === '')
      return

    let content = `${this.state.name}\n${this.state.phoneNumber}`
    let filePath = `${RNFS.DocumentDirectoryPath}/emergencyContact.txt`

    RNFS.writeFile(filePath, content, 'utf8').then(success => {
      console.log('Contato salvo com sucesso!')
    }).catch(error => {
      console.error(error)
    })
  }

  read = () => {
    let filePath = `${RNFS.DocumentDirectoryPath}/emergencyContact.txt`

    let content = RNFS.readFile(filePath, 'utf8')

    let aux = content.toString().split('\n')

    this.setState({ name: aux[1] })
    this.setState({ phoneNumber: aux[2] })
  }
  onButtonPressed = () => (

    ContactsWrapper.getContact()
      .then((contact) => {
        console.log(contact)
      })
      .catch((error) => {
        console.log("ERROR CODE: ", error.code);
        console.log("ERROR MESSAGE: ", error.message);
      })
  );

  componentDidMount() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: ' This app would like to see your contacts'
        }
      ).then(() => {
        this.getList();
      })
    } else if (Platform.OS === 'ios') {
      this.getList();
    }
  }

  getList = () => {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        console.log("cannot access");
      } else {
        this.setState({ contacts });
        console.log(contacts);
      }
    })
  }

  render() {
    return (
      <View style={styles.conainer}>
        <View style={styles.top}>

          <TouchableOpacity style={styles.profileImage}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name="arrow-left" size={40} color="#fabb00" />
          </TouchableOpacity>

        </View>

        <View style={styles.center}>
        </View>
        <View style={styles.bottom}>
          <View style={{ height: '10%', }}>
            <Text style={styles.texto}>Contato de emergência:</Text>
            <Text style={styles.texto}>{this.state.name = "Police"}</Text>
            <Text style={styles.texto}>{this.state.phoneNumber = "8938349"}</Text>
          </View>
          <View style={{ height: '60%', }}>
            <Text style={styles.texto}></Text>
          </View>

          <View style={styles.menu}>
            <View style={styles.bottomItem}>
              <TouchableOpacity style={styles.bottomItemInner}
                onPress={() => this.onButtonPressed()}
              >
                <Text style={styles.texto2}>Escolher Contato</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

      </View>
    );
  }
}