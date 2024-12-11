import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import MenuButton from "../components/MenuButton";

type AboutProps = {
    navigation: StackNavigationProp<RootStackParamList, "About">;
};

const About: React.FC<AboutProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About This Game</Text>
            <Text style={styles.text}>
                Welcome to the Text Adventure Game! This game is designed to immerse you in a story where your choices matter.
                Created by [Your Name/Team].
            </Text>
            <MenuButton title="Back to Menu" onPress={() => navigation.navigate("MainMenu")} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
        padding: 20,
    },
    title: {
        color: "white",
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
    },
    text: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
});

export default About;
