import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Dashboard() {
    const router = useRouter();

    const handleLogout = () => {
        // En un proyecto real, aquí borrarías el token de autenticación.
        // Por ahora, solo volvemos a la pantalla de login.
        router.replace('/'); 
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Bienvenido a tu proyecto!</Text>
            <Text style={styles.subtitle}>Has iniciado sesión correctamente.</Text>

            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C1C1C',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#E0E0E0',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 40,
        color: '#8A8A8A',
        textAlign: 'center',
    },
    button: {
        width: '100%',
        backgroundColor: '#6A5ACD',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});