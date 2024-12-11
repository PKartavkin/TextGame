import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import MenuButton from "../components/MenuButton";

type AboutProps = {
    navigation: StackNavigationProp<RootStackParamList, "Settings">;
};

const About: React.FC<AboutProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.text}>
                Not Implemented
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
