import React, { useState } from 'react';
import { StatusBar, Text, TouchableOpacity, View, TextInput, ActivityIndicator, StyleSheet, Alert, ScrollView } from 'react-native';

import { Provider } from 'src/provider';
import { Colors } from 'src/constants';
import { createResource } from '../WebApiServices/SimpleApiCalls'
import { user_register, user_login } from '../WebApiServices/WebServices'
import { Screens } from 'src/screens';
// import { ScrollView } from 'react-native-gesture-handler';

interface Props { }

export const App: React.FC<Props> = () => {
  const [tabVAlue, setTabVAlue] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setisLoading] = useState(false)
  const [firstname, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')

  const onRegister = async () => {
    setisLoading(true)
    let data = {
      userName: userName,
      email: email,
      password: password
    }
    try {
      let res = await createResource(user_register, data);
      console.log(res, 'resresres');

      // navigation.navigate('Login');
      if (res.data.message == 'Created Successfully') {
        setisLoading(false)
        setTabVAlue(0)
        setEmail('')
        setPassword('')
      } else {
        Alert.alert(
          "Error",
          'Error, User not created',
        );
        setisLoading(false)

      }

    } catch (error) {
      Alert.alert(
        "Error",
        error.response.data || 'Error',
      );
      setisLoading(false)
      console.log(error, 'error', '*******************')
      // alert(error);
    }
  }

  const onLogin = async () => {
    setisLoading(true)

    console.log('submittt')
    let data = {
      email: email,
      password: password
    }
    try {
      let res = await createResource(user_login, data)
      console.log(res, 'resresres');
      setTabVAlue(3)
      setisLoading(false)
      // Alert.alert(
      //   "Error",
      //   JSON.stringify(res)
      // );
    } catch (error) {
      setisLoading(false)
      console.log(error.response.data.message, 'error');
      Alert.alert(
        "Error",
        error.response.data.message,
      );

      // alert(error);
    }

  }


  return (
    <Provider>
      {
        tabVAlue == 3 ?
          <>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="light-content"
            />
            <Screens  />
          </>
          : tabVAlue == 0 ?
            <View style={styles.container}>
              <Text style={styles.heading}>Login</Text>
              <View>
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(val) => setEmail(val)} />
                <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={(val) => setPassword(val)} />
                {!isLoading ?
                  <TouchableOpacity style={{ backgroundColor: Colors.primary, paddingVertical: 8, width: '100%', alignSelf: 'center', borderRadius: 5, alignItems: 'center' }}
                    onPress={() => onLogin()}
                  >
                    <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}> Login</Text>
                  </TouchableOpacity>
                  :
                  <ActivityIndicator size="large" color="#fff" />
                }
                <View style={{ marginTop: 10, alignItems: "center" }}>
                  <TouchableOpacity
                    // onPress={loginWithFacebook}
                    style={{ marginTop: 10, backgroundColor: "#5890FF", width: 250, borderRadius: 5, paddingHorizontal: 30, paddingVertical: 15 }}>
                    <Text style={{ fontSize: 16, color: "white", textAlign: "center" }}>Login With Facebook</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setTabVAlue(1)}>
                  <Text style={styles.text}>Dont have an account? Sign Up here</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTabVAlue(1)}>
                  <Text style={styles.forgettext}>Forget Password ??</Text>
                </TouchableOpacity>
              </View>
            </View>
            : tabVAlue == 1 ?
              <ScrollView style={styles.container}>
                <Text style={styles.heading}>Sign Up</Text>
                <View>
                  <TextInput style={styles.input} placeholder="First Name" value={firstname} onChangeText={(val) => setFirstName(val)} />
                  <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={(val) => setLastName(val)} />
                  <TextInput style={styles.input} placeholder="User Name" value={userName} onChangeText={(val) => setUserName(val)} />
                  <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(val) => setEmail(val)} />
                  <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={(val) => setPassword(val)} />
                  {!isLoading ? <TouchableOpacity style={{ backgroundColor: Colors.primary, paddingVertical: 8, width: '100%', alignSelf: 'center', borderRadius: 5, alignItems: 'center' }} onPress={_ => onRegister()}>
                    <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}> Sign Up</Text>
                  </TouchableOpacity>
                    :
                    <ActivityIndicator size="large" color="#fff" />

                  }
                  <TouchableOpacity onPress={_ => setTabVAlue(0)}>
                    <Text style={styles.text}  >Already have an account?? Back to Login</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
              :
              null


      }

    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.background,
    flex: 1,

  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFF',
    marginVertical: 100
  },
  input: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 4,
    backgroundColor: '#fff',
    color: '#363636',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
    marginVertical: 10
  },
  text: {
    color: Colors.light,
    marginTop: 25,
    alignSelf: 'center',
  },
  forgettext: {
    color: Colors.light,
    marginTop: 25,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF'
  }
});
