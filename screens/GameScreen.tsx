import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import scenesData from "../data/scenes.json";
import MenuButton from "../components/MenuButton";

const STORAGE_KEY = "currentScene";

// Mapping image names to their paths
const images = {
    'img1.png': require('../assets/images/img1.png'),
    'img2.png': require('../assets/images/img2.png'),
};

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

    const sceneImage = currentScene.image ? images[currentScene.image] : null;

    return (
        <SafeAreaView style={styles.container}>
            {/* Top margin */}
            <View style={styles.topMargin} />

            {/* Image section */}
            <View style={styles.imageSection}>
                {sceneImage && (
                    <Image
                        source={sceneImage}
                        style={styles.image}
                        resizeMode="contain"
                    />
                )}
            </View>

            {/* Text section */}
            <View style={styles.textSection}>
                <Text style={styles.text}>{currentScene.text}</Text>
            </View>

            {/* Buttons section */}
            <View style={styles.buttonSection}>
                {currentScene.isEnd ? (
                    <MenuButton
                        title="Go Back to Menu"
                        onPress={handleBackToMenu}
                        style={styles.menuButton} // Pass additional styles if needed
                    />
                ) : (
                    <FlatList
                        data={currentScene.choices}
                        keyExtractor={(item) => item.nextScene}
                        renderItem={({ item }) => (
                            <MenuButton
                                title={item.text}
                                onPress={() => handleChoice(item.nextScene)}
                                style={styles.menuButton} // Pass additional styles if needed
                            />
                        )}
                        contentContainerStyle={styles.buttonList}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>

            {/* Bottom margin */}
            <View style={styles.bottomMargin} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    topMargin: {
        flex: 1, // 10% of the screen
    },
    imageSection: {
        flex: 2.5, // 25% of the screen
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "80%",
        height: "80%",
    },
    textSection: {
        flex: 2.5, // 25% of the screen
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    text: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
    },
    buttonSection: {
        flex: 3, // 30% of the screen
        justifyContent: "center",
        alignItems: "center", // Center buttons horizontally
        width: "100%",
    },
    buttonList: {
        alignItems: "center", // Center FlatList items horizontally
        justifyContent: "center",
    },
    menuButton: {
        marginVertical: 5, // Spacing between buttons
    },
    bottomMargin: {
        flex: 1, // 10% of the screen
    },
});

export default GameScreen;
