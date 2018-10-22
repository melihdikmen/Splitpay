import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  KeyboardAvoidingView,
  StatusBar
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { observer } from "mobx-react";
import styles from "./style";
import LoginStore from "../stores/LoginStore";
@observer
export default class index extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.success = this.success.bind(this);
  }

  success() {
    this.props.navigation.navigate("AuthLoading");
  }

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
              autoCapitalize={"none"}
              onChangeText={text => {
                LoginStore.setUsername(text);
              }}
            />
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.username}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={"none"}
              onChangeText={text => {
                LoginStore.setPassword(text);
              }}
            />
          </View>

          <View style={styles.loginButton}>
            <TouchableOpacity
              disabled={LoginStore.getButton}
              style={[
                styles.button,
                { opacity: LoginStore.getButton ? 0.5 : 1 }
              ]}
              onPress={() => {
                LoginStore.login(this.success);
              }}
            >
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
