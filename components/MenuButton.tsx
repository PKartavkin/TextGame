// src/components/MenuButton.tsx
import React, { useState, useContext } from 'react';
import { Pressable, Text, StyleProp, ViewStyle, Platform } from 'react-native';
import styles from '../styles/styles';
import * as Haptics from 'expo-haptics';
import useClickSound from '../hooks/useClickSound';
import { AppContext } from '../contexts/AppContext';

interface MenuButtonProps {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

const MenuButton: React.FC<MenuButtonProps> = ({ title, onPress, style }) => {
    const [pressed, setPressed] = useState(false);
    const { soundEnabled } = useContext(AppContext);
    const playClickSound = useClickSound();

    const handlePress = () => {
        // Conditionally execute haptic feedback only on supported platforms
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                .catch(error => console.error('Haptics error:', error));
        }

        if (soundEnabled) {
            playClickSound();
        }

        onPress();
    };

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            style={[
                styles.menuButton,
                pressed && styles.menuButtonPressed,
                style,
            ]}
        >
            <Text style={styles.menuButtonText}>{title}</Text>
        </Pressable>
    );
};

export default MenuButton;
