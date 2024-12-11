// /contexts/AppContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppContextType {
    soundEnabled: boolean;
    setSoundEnabled: (value: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
    soundEnabled: true,
    setSoundEnabled: () => {},
});

interface AppProviderProps {
    children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [soundEnabled, setSoundEnabledState] = useState<boolean>(true);

    useEffect(() => {
        const loadSoundSetting = async () => {
            try {
                const storedValue = await AsyncStorage.getItem('soundEnabled');
                if (storedValue !== null) {
                    setSoundEnabledState(storedValue === 'true');
                }
            } catch (error) {
                console.error('Failed to load sound setting:', error);
            }
        };

        loadSoundSetting();
    }, []);

    const setSoundEnabled = async (value: boolean) => {
        try {
            setSoundEnabledState(value);
            await AsyncStorage.setItem('soundEnabled', value.toString());
        } catch (error) {
            console.error('Failed to save sound setting:', error);
        }
    };

    return (
        <AppContext.Provider value={{ soundEnabled, setSoundEnabled }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
