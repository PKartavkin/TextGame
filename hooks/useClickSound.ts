import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

const useClickSound = () => {
    const soundRef = useRef<Audio.Sound | null>(null);

    useEffect(() => {
        const loadSound = async () => {
            try {
                const { sound } = await Audio.Sound.createAsync(
                    require('../assets/sounds/click.mp3')
                );
                soundRef.current = sound;
            } catch (error) {
                console.error('Error loading click sound:', error);
            }
        };

        loadSound();

        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    const playSound = async () => {
        if (soundRef.current) {
            try {
                await soundRef.current.replayAsync();
            } catch (error) {
                console.error('Error playing click sound:', error);
            }
        }
    };

    return playSound;
};

export default useClickSound;
