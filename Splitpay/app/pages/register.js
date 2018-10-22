import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  KeyboardAvoidingView,
  ToastAndroid
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { observer } from "mobx-react";
import styles from "./style";
import RegisterStore from "../stores/RegisterStore";
@observer
export default class index extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props)
  {
    super(props)
    this.success=this.success.bind(this)
  }

  success() {
    ToastAndroid.show("Kayıt başarılı.Giriş yapabilirsiniz", ToastAndroid.LONG);
    this.props.navigation.navigate("Login");
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={{ flex: 1 }} />

        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"always"}
          centerContent
        >
          <View style={styles.loginInput}>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.username}
              placeholder="Name"
              autoCapitalize={"none"}
              onChangeText={text => RegisterStore.setName(text)}
            />
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.username}
              placeholder="Username"
              autoCapitalize={"none"}
              onChangeText={text => RegisterStore.setUsername(text)}
            />
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.username}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize={"none"}
              onChangeText={text => RegisterStore.setPassword(text)}
            />
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.username}
              placeholder="Password Again"
              autoCapitalize={"none"}
              secureTextEntry={true}
              onChangeText={text => RegisterStore.setPasswordAgain(text)}
            />
          </View>

          <View style={styles.loginButton}>
            <TouchableOpacity
              disabled={RegisterStore.getButton}
              style={[
                styles.button,
                { opacity: RegisterStore.getButton ? 0.5 : 1 }
              ]}
              onPress={() => {
                RegisterStore.register(this.success);
              }}
            >
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
              Zaten bir hesabınız var mı?{" "}
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
