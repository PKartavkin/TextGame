// src/screens/MainMenu.tsx
import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import MenuButton from "../components/MenuButton"; // Import your custom button
import styles from "../styles/styles"; // Ensure styles.menuButton is defined

const STORAGE_KEY = "currentScene";

type MainMenuProps = {
    navigation: StackNavigationProp<RootStackParamList, "MainMenu">;
};

const MainMenu: React.FC<MainMenuProps> = ({ navigation }) => {
    const [canContinue, setCanContinue] = useState(false);

    useEffect(() => {
        // Check if a saved position exists
        const checkSavedScene = async () => {
            try {
                const savedScene = await AsyncStorage.getItem(STORAGE_KEY);
                setCanContinue(!!savedScene);
            } catch (error) {
                console.error("Failed to load saved scene:", error);
            }
        };
        checkSavedScene();
    }, []);

    const handleStartNewGame = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY); // Clear saved progress
            navigation.navigate("GameScreen"); // Navigate to the game
        } catch (error) {
            console.error("Failed to start new game:", error);
        }
    };

    return (
        <View style={stylesLocal.container}>
            <Text style={stylesLocal.title}>Welcome to the Text Adventure Game</Text>
            <Image
                source={require('../assets/images/img1.png')}
                resizeMode="contain"
                style={{ width: 200, height: 200 }}
            />
            {canContinue && (
                <MenuButton
                    title="Continue"
                    onPress={() => navigation.navigate("GameScreen")}
                    style={stylesLocal.button}
                />
            )}
            <MenuButton
                title="Start New Game"
                onPress={handleStartNewGame}
                style={stylesLocal.button}
            />
            <MenuButton
                title="Settings"
                onPress={() => navigation.navigate("Settings")}
                style={stylesLocal.button}
            />
            <MenuButton
                title="About"
                onPress={() => navigation.navigate("About")}
                style={stylesLocal.button}
            />
        </View>
    );
};

const stylesLocal = StyleSheet.create({
    button: {
        marginBottom: 20,
        alignSelf: "center",
    },
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
});

export default MainMenu;
