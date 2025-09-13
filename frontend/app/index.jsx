import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

const API_URL = 'http://192.168.1.3:3000';

export default function AuthScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter(); // Inicializamos el hook para la navegación
    
    const handleAuth = async () => {
        if (!email || !password) {
            setMessage('Por favor, ingrese un correo y una contraseña.');
            return;
        }

        setLoading(true);
        setMessage('');

        const endpoint = isLogin ? '/login' : '/register';

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            
            if (response.ok) {
                // Navegación exitosa: redirige al dashboard
                setMessage(data.message);
                router.replace('/dashboard'); 
            } else {
                setMessage(data.error || `Error al ${isLogin ? 'iniciar sesión' : 'registrar'}.`);
            }
        } catch (error) {
            console.error('Network Error:', error);
            setMessage('No se pudo conectar con el servidor. Por favor, asegúrese de que esté corriendo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#8A8A8A"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#8A8A8A"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            
            {message ? <Text style={styles.message}>{message}</Text> : null}

            <TouchableOpacity 
                style={styles.button} 
                onPress={handleAuth}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.toggleButton} onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.toggleButtonText}>
                    {isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia Sesión'}
                </Text>
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
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#E0E0E0',
    },
    input: {
        width: '100%',
        backgroundColor: '#2A2A2A',
        color: '#E0E0E0',
        padding: 18,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#444',
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
    toggleButton: {
        marginTop: 20,
    },
    toggleButtonText: {
        color: '#8A8A8A',
        fontSize: 16,
    },
    message: {
        color: '#FF6347',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
});