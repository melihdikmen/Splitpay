import React, { Component } from "react";
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList
} from "react-native";
import { observer } from "mobx-react";
import HomeHeader from "../components/Home/HomeHeader";
import Groups from "../components/Home/groups";

import GroupsStore from "../stores/GroupsStore";
@observer
export default class index extends Component {
  static navigationOptions = {
    headerTitle: <HomeHeader />,
    headerStyle: {
      elevation: 0
    }
  };

  componentWillMount() {
    GroupsStore.getAll();
  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor="#ff1443" barStyle="light-content" />
        <FlatList
          data={GroupsStore.getGroups}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Groups groupName={item.groupName} info={item.groupInfo} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
