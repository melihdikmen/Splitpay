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
        <View style={{ flex: 1 }} />

        <KeyboardAwareScrollView keyboardShouldPersistTaps={"always"} centerContent>
          <View style={styles.loginInput}>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.username}
              placeholder="Name"
            />
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
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.username}
              placeholder="Password Again"
            />
          </View>

          <View style={styles.loginButton}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Kaydol</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.registerLink}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
          >
            <Text style={styles.registerText}>
              Zaten bir hesabın var mı?{" "}
              <Text style={{ fontWeight: "bold" }}>
                Hemen şimdi giriş yapın.
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
