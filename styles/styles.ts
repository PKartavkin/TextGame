import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Styles {
    menuButton: ViewStyle;
    menuButtonPressed: ViewStyle;
    menuButtonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    menuButton: {
        width: 200,
        height: 50,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 10,
        opacity: 1,
        transform: [{ scale: 1 }],
        // Add shadow for better UI
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuButtonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.95 }],
    },
    menuButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
    // Define additional styles here
});

export default styles;
