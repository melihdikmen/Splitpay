/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { ScrollView, StyleSheet, Image, View, CameraRoll,TouchableOpacity } from "react-native";
import ExpenseStore from "../../stores/ExpenseStore"

export default class PickPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: null
    };
  }

  componentDidMount() {
    CameraRoll.getPhotos({
      first: 200,
      assetType: "Photos"
    })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch(err => {
        //Error Loading Images
      });
  }

  render() {
    return (
      <View>
        <ScrollView
          contentContainerStyle={{ flexWrap: "wrap", flexDirection: "row" }}
        >
          {this.state.photos != null &&
            this.state.photos.map((p, i) => {
              return (
                <TouchableOpacity onPress={()=>{ExpenseStore.setImage(p.node.image.uri)}}>
                  
                  <View style={{}}>
                    <Image
                      key={i}
                      style={{
                        width: 80,
                        height: 80,
                        margin: 4
                      }}
                      source={{ uri: p.node.image.uri }}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
