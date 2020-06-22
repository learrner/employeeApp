import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

const Profile = ({ navigation, route }) => {
    const openDial = () => {
        if (Platform.OS === "android") {
            Linking.openURL(`tel:${phone}`)
        } else {
            Linking.openURL(`telPrompt:${phone}`)
        }
    }
    const deleteEmployee = (id) => {
        fetch("http://192.168.1.10:3000/delete", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })
        }).then(res => res.json())
            .then(data => {
                Alert.alert(`${data.name} is deleted`)
                navigation.navigate('Home')
            }).catch(e => {
                console.log(e)
                Alert.alert("Error Occurred while deleting")
            })
    }
    const { _id, email, phone, name, salary, position, picture } = route.params.i
    return (
        <View style={styles.root}>
            <LinearGradient
                colors={["#0579f5", "#82d6fa"]}
                style={styles.gradientStyle}
            />
            <View style={{ alignItems: "center" }}>

                <Image
                    source={{ uri: picture }}
                    style={styles.imageStyle}
                />
            </View>
            <View style={{ alignItems: "center", margin: 15 }}>
                <Title> {name} </Title>
                <Text style={{ fontSize: 20 }}> {position} </Text>
            </View>
            <View>
                <Card style={styles.myCard} onPress={() => {
                    Linking.openURL(`mailto:${email}`)
                }}>
                    <View style={styles.cardContent}>
                        <MaterialIcons name="email" size={24} color="#0579f5" />
                        <Text style={{ fontSize: 20 }}> {email} </Text>
                    </View>
                </Card>
                <Card style={styles.myCard} onPress={() => openDial()}>
                    <View style={styles.cardContent}>
                        <Entypo name="phone" size={24} color="#0579f5" />
                        <Text style={{ fontSize: 20 }}> {phone} </Text>
                    </View>
                </Card>
                <Card style={styles.myCard}>
                    <View style={styles.cardContent}>
                        <MaterialIcons name="attach-money" size={24} color="#0579f5" />
                        <Text style={{ fontSize: 20 }}> {salary} </Text>
                    </View>
                </Card>
            </View>
            <View style={styles.btnStyle}>

                <Button
                    theme={{ colors: { primary: "#0579f5" } }}
                    // style={styles.textfieldInput}
                    icon="account-edit"
                    mode="contained"
                    onPress={() => navigation.navigate("Create", { _id, email, phone, name, salary, position, picture })}>Edit
            </Button>

                <Button
                    theme={{ colors: { primary: "#0579f5" } }}
                    // style={styles.textfieldInput}
                    icon="delete"
                    mode="contained"
                    onPress={() => deleteEmployee(_id)}>Fire Employee
            </Button>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    gradientStyle: {
        height: "20%"
    },
    imageStyle: {
        height: 120,
        width: 120,
        borderRadius: 60,
        marginTop: -60
    },
    myCard: {
        margin: 3,
    },
    cardContent: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    btnStyle: {
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 10
    }
})

export default Profile;