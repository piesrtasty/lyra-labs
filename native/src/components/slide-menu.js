import React, { useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";

import {
  faHomeAlt,
  faArchive,
  faStar,
} from "@fortawesome/pro-regular-svg-icons";

import {
  faHomeAlt as faHomeAltSolid,
  faArchive as faArchiveSolid,
  faStar as faStarSolid,
} from "@fortawesome/pro-solid-svg-icons";

export const SlideMenuContext = React.createContext({});

var styles = StyleSheet.create({
  modal: {
    backgroundColor: "red",
    margin: 0,
    height: 200,
  },
  container: {
    flex: 1,
  },
});

const ITEM_HOME = {
  slug: "home",
  label: "Home",
  icon: faHomeAlt,
  iconSolid: faHomeAltSolid,
};

const ITEM_ARCHIVE = {
  slug: "archive",
  label: "Archive",
  icon: faArchive,
  iconSolid: faArchiveSolid,
};

const ITEM_FAVORITES = {
  slug: "favorites",
  label: "Favorites",
  icon: faStar,
  iconSolid: faStarSolid,
};

const MENU_ITEMS = [];

export const SlideMenu = ({ children }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(ITEM_HOME);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SlideMenuContext.Provider
      value={{ toggleModal, activeMenuItem, setActiveMenuItem }}
    >
      {children}
      <Modal
        isVisible={isModalVisible}
        coverScreen={false}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={styles.modal}
      >
        <View style={styles.container}>
          <Text>Hello!</Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </SlideMenuContext.Provider>
  );
};
