import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal
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
     < TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
      <KeyboardAvoidingView style={styles.container}>
      <Modal animationType="slide" visible={LoginStore.netCheck} transparent={true}>
        <View style={{height:20,backgroundColor:"#ff1443",justifyContent:"center",alignItems: 'center',}}>
        <Text style={{color:"white",marginLeft: 5,marginRight: 5,fontSize:13}}>İnternet Bağlantısı Hatası!Aktif bir İnternet bağlantısı yok.</Text>
        </View>
       
        </Modal>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Splitpay</Text>
        </View>

        <KeyboardAwareScrollView centerContent>
          <View style={styles.loginInput}>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.username}
              placeholder="Kullanıcı Adı"
              autoCapitalize={"none"}
              onChangeText={text => {
                LoginStore.setUsername(text);
              }}
            />
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.username}
              secureTextEntry={true}
              placeholder="Şifre"
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
      </TouchableWithoutFeedback>
    );
  }
}
