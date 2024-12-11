import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainMenu from "../screens/MainMenu";
import GameScreen from "../screens/GameScreen";
import About from "../screens/About";
import Settings from "../screens/Settings";

export type RootStackParamList = {
    MainMenu: undefined;
    GameScreen: undefined;
    About: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="MainMenu" component={MainMenu} />
            <Stack.Screen name="GameScreen" component={GameScreen} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
