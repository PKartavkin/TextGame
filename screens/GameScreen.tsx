import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import scenesData from "../data/scenes.json";
import MenuButton from "../components/MenuButton";

const STORAGE_KEY = "currentScene";

const GameScreen: React.FC = ({ navigation }: any) => {
    const [currentSceneId, setCurrentSceneId] = useState(scenesData.stats.currentScene);

    useEffect(() => {
        // Load saved scene on mount
        const loadScene = async () => {
            const savedScene = await AsyncStorage.getItem(STORAGE_KEY);
            if (savedScene) {
                setCurrentSceneId(savedScene);
            }
        };
        loadScene();
    }, []);

    const currentScene = scenesData.scenes[currentSceneId];

    const handleChoice = async (nextSceneId: string) => {
        setCurrentSceneId(nextSceneId);
        await AsyncStorage.setItem(STORAGE_KEY, nextSceneId); // Save the scene
    };
    const handleBackToMenu = async () => {
        await AsyncStorage.removeItem(STORAGE_KEY); // Clear saved progress
        navigation.navigate("MainMenu"); // Navigate back to Main Menu
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{currentScene.text}</Text>
            {currentScene.isEnd ? (
                <MenuButton title="Go Back to Menu" onPress={handleBackToMenu} />
            ) : (
                <FlatList
                    data={currentScene.choices}
                    keyExtractor={(item) => item.nextScene}
                    renderItem={({ item }) => (
                        <MenuButton title={item.text} onPress={() => handleChoice(item.nextScene)} />
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#121212",
    },
    text: {
        color: "white",
        fontSize: 18,
        marginBottom: 20,
    },
});

export default GameScreen;
