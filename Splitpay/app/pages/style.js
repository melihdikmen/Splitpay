import React, { Component } from "react";
import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: "#FFF"
  },

  logo: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },

  logoText: {
    fontSize: 50,
    color: "#ff1443"
  },

  loginInput: {
    flex: 2
  },

  username: {
    borderWidth: 1,
    borderColor: "#ddd",
    height: 60,
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    padding: 5,
    paddingLeft: 10,
    backgroundColor: "#efeaeb"
  },

  loginButton: {
    flex: 2
  },

  button: {
    borderWidth: 1,
    alignItems: "center",
    height: 60,
    justifyContent: "center",
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    borderColor: "#ff1443",
    marginTop: 20,
    
  },

  buttonText: {
    fontSize: 30,
    color: "#ff1443"
  },

  registerLink: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderColor:'#ddd',
    borderTopWidth: 1,
  },
  registerText: {
    fontSize: 15,
    alignSelf: "center"
  }
}));
