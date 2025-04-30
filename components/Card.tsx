import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Link, LinkText } from './ui/link';
import { useRouter } from 'expo-router';

interface CardProps {
    title: string;
    location: string;
    rating: number;
    id: string;
}

const Card: React.FC<CardProps> = ({ title, location, rating, id }: CardProps) => {
      const backgroundColor = useThemeColor({}, 'background');
      const color = useThemeColor({}, 'text');
      const shadowColor = useThemeColor({}, 'shadowColor');
      const router = useRouter();

      const handleLinkPress = () => {
        router.push({
            pathname: '/(tabs)/(home)/[title]',
            params: { title: id },
        })
      }

    return (
        <View style={[
                { backgroundColor, shadowColor, borderColor: shadowColor },
                styles.card,
            ]}>
            <Text style={[styles.title, { color }]}>{title}</Text>
            <Text style={[styles.location, { color }]}>{location}</Text>
            <Text style={[styles.rating, { color }]}>Rating: {rating.toFixed(1)}</Text>
            <Link
                onPress={handleLinkPress}
                className='flex-row items-center justify-center'
            >
                <LinkText className=' text-blue-500 text-lg no-underline'>
                    See Details
                </LinkText>
            </Link>
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