import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  KeyboardAvoidingView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { observer } from "mobx-react";
import styles from "./style";
@observer
export default class index extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Splitpay</Text>
        </View>

        <KeyboardAwareScrollView centerContent>
          <View style={styles.loginInput}>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.username}
              placeholder="Username"
            />
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.username}
              placeholder="Password"
            />
          </View>
         
          <View style={styles.loginButton}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
          </KeyboardAwareScrollView>
        <View style={styles.registerLink}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Register");
            }}
          >
            <Text style={styles.registerText}>
              Hesabınız yok mu?{" "}
              <Text style={{ fontWeight: "bold" }}>Hemen şimdi kaydolun.</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
