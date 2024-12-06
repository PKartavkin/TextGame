import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Button, Dimensions, Image} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";

const STORAGE_KEY = "currentScene";

type MainMenuProps = {
    navigation: StackNavigationProp<RootStackParamList, "MainMenu">;
};

const MainMenu: React.FC<MainMenuProps> = ({ navigation }) => {
    const [canContinue, setCanContinue] = useState(false);

    useEffect(() => {
        // Check if a saved position exists
        const checkSavedScene = async () => {
            const savedScene = await AsyncStorage.getItem(STORAGE_KEY);
            setCanContinue(!!savedScene);
        };
        checkSavedScene();
    }, []);

    const handleStartNewGame = async () => {
        await AsyncStorage.removeItem(STORAGE_KEY); // Clear saved progress
        navigation.navigate("GameScreen"); // Navigate to the game
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Text Adventure Game</Text>
            <Image source={require('../assets/images/img1.png')} resizeMode="contain"
                   style={{width: 200}}
            />
            {canContinue && (
                <Button title="Continue" onPress={() => navigation.navigate("GameScreen")} />
            )}
            <Button title="Start New Game" onPress={handleStartNewGame} />
            <Button title="About" onPress={() => navigation.navigate("About")} />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        marginBottom: 20,
        alignSelf: "center",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
    },
    title: {
        color: "white",
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
    },
});

export default MainMenu;
