import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

interface CardProps {
    title: string;
    location: string;
    rating: number;
    link: string;
}

const Card: React.FC<CardProps> = ({ title, location, rating, link }) => {
      const backgroundColor = useThemeColor({}, 'background');
      const color = useThemeColor({}, 'text');
      const shadowColor = useThemeColor({}, 'shadowColor');

    return (
        <View style={[
                { backgroundColor, shadowColor, borderColor: shadowColor },
                styles.card,
            ]}>
            <Text style={[styles.title, { color }]}>{title}</Text>
            <Text style={[styles.location, { color }]}>{location}</Text>
            <Text style={[styles.rating, { color }]}>Rating: {rating.toFixed(1)}</Text>
            <TouchableOpacity style={styles.button} onPress={() => console.log(`Link pressed: ${link}`)}>
                <Text style={styles.link}>See Details</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    location: {
        fontSize: 14,
        marginBottom: 4,
    },
    rating: {
        fontSize: 14,
        marginBottom: 8,
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    link: {
        fontSize: 14,
        color: '#1e90ff',
        textDecorationLine: 'underline',
    },
});

export default Card;