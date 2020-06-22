import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper';

const Home = ({ navigation }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchData = () => {
        fetch("http://192.168.1.10:3000/")
            //    http://10.0.2.2:3000/
            .then(res => res.json())
            .then(result => {
                setData(result)
                setLoading(false)
            }).catch(e => {
                console.log(e)
                Alert.alert("error while fetchng data!")
            })
    }
    useEffect(() => {
        fetchData()
    }, [])
    const renderList = ((i) => {
        return (
            <Card style={{ margin: 5 }}
                onPress={() => { navigation.navigate("Profile", { i }) }}
            >
                <View style={styles.card}>
                    <Image style={styles.empImage} source={{ uri: i.picture }} />
                    <View>
                        <Text style={styles.cardText}> {i.name}</Text>
                        <Text style={styles.cardText}>{i.position}</Text>
                    </View>

                </View>
            </Card>
        )
    })
    return (
        <View style={{ flex: 1 }}>

            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return renderList(item)
                }}
                keyExtractor={item => `${item._id}`}
                onRefresh={() => fetchData()}
                refreshing={loading}
            />


            <FAB style={styles.fabBtn} small={false} icon="plus" onPress={() => navigation.navigate("Create")} theme={{ colors: { accent: "#4fd183" } }} />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 5,
        flexDirection: "row",
        padding: 5
    },
    empImage: {
        height: 70,
        width: 70,
        borderRadius: 35
    },
    cardText: {
        marginLeft: 10,
        // paddingTop: 10,
        fontSize: 20
    },
    fabBtn: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }
})

export default Home;