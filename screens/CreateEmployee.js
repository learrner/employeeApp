import React, { useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'

const CreateEmployee = ({ navigation, route }) => {
    if (route.params) {
        console.log(route.params)

    }
    const updateState = (type) => {
        if (route.params) {
            switch (type) {
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "email":
                    return route.params.email
                case "position":
                    return route.params.position
                case "salary":
                    return route.params.salary
                case "picture":
                    return route.params.picture
            }
        } else {
            return ""
        }
    }

    const [name, setName] = useState(updateState("name"))
    const [phone, setPhone] = useState(updateState("phone"))
    const [email, setEmail] = useState(updateState("email"))
    const [salary, setSalary] = useState(updateState("salary"))
    const [picture, setPicture] = useState(updateState("picture"))
    const [position, setPosition] = useState(updateState("position"))
    const [modal, setModal] = useState(false)
    const [shift, setShift] = useState(false)

    const submitData = () => {
        fetch("http://192.168.1.10:3000/send-data", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                phone,
                email,
                salary,
                picture,
                position
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                Alert.alert(`${data.name} is saved successfully`)
                navigation.navigate('Home')
            }).catch(e => {
                console.log(e)
                Alert.alert("error while uploading data")
            })
    }

    const updateDetails = () => {
        fetch("http://192.168.1.10:3000/update", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: route.params._id,
                name,
                phone,
                email,
                salary,
                picture,
                position
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                Alert.alert(`${data.name} is updated successfully`)
                navigation.navigate('Home')
            }).catch(e => {
                console.log(e)
                Alert.alert("error while uploading data")
            })
    }

    const pickFromGallery = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            console.log(data)
            if (!data.cancelled) {
                let newFile = {
                    uri: data.uri,
                    type: `test/${data.uri.split('.')[1]}`,
                    name: `test.${data.uri.split('.')[1]}`
                }
                handleImage(newFile)
            }
        } else {
            Alert.alert("We need permission")
        }
    }
    const pickFromCamera = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA)
        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            console.log(data)
            if (!data.cancelled) {
                let newFile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`
                }
                console.log(newFile)
                handleImage(newFile)
            }
        } else {
            Alert.alert("We need permission")
        }
    }
    const handleImage = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'employeeApp')
        data.append('cloud_name', 'gunjangid')
        // Image upload: https://api.cloudinary.com/v1_1/gunjangid/image/upload

        fetch("https://api.cloudinary.com/v1_1/gunjangid/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).then(data => {
            console.log(data)
            setPicture(data.url)
            setModal(false)
        }).catch(e => {
            console.log(e)
            Alert.alert("error while uploading Image")
        })
    }
    return (
        <KeyboardAvoidingView behavior="position" enabled={shift}>
            <View>
                <TextInput
                    label="Name"
                    style={styles.textfieldInput}
                    value={name}
                    mode="outlined"
                    onFocus={() => setShift(false)}
                    theme={{ colors: { primary: "#4fd183" } }}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    label="Phone"
                    style={styles.textfieldInput}
                    value={phone}
                    mode="outlined"
                    onFocus={() => setShift(false)}
                    keyboardType="number-pad"
                    theme={{ colors: { primary: "#4fd183" } }}
                    onChangeText={text => setPhone(text)}
                />
                <TextInput
                    label="Email"
                    style={styles.textfieldInput}
                    value={email}
                    theme={{ colors: { primary: "#4fd183" } }}
                    onFocus={() => setShift(false)}
                    mode="outlined"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    label="Salary"
                    style={styles.textfieldInput}
                    theme={{ colors: { primary: "#4fd183" } }}
                    onFocus={() => setShift(true)}
                    value={salary}
                    mode="outlined"
                    onChangeText={text => setSalary(text)}
                />
                <TextInput
                    label="Position"
                    style={styles.textfieldInput}
                    theme={{ colors: { primary: "#4fd183" } }}
                    onFocus={() => setShift(true)}
                    value={position}
                    mode="outlined"
                    onChangeText={text => setPosition(text)}
                />

                <Button
                    style={styles.textfieldInput}
                    icon={picture == "" ? "upload" : "check"}
                    mode="contained"
                    onPress={() => setModal(true)}
                >Upload Image
            </Button>
                {route.params ?
                    <Button style={styles.textfieldInput} icon="upload" mode="contained" onPress={() => updateDetails()}
                    >Update Details
            </Button>
                    : <Button style={styles.textfieldInput} icon="upload" mode="contained" onPress={() => submitData()}
                    >save
            </Button>}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => { setModal(false) }} >
                    <View style={styles.modalView}>
                        <View style={styles.modalBtnView}>

                            <Button icon="camera" mode="contained" onPress={() => pickFromCamera(true)}
                            >Camera</Button>

                            <Button icon="folder" mode="contained" onPress={() => pickFromGallery(true)}
                            >Gallery</Button>
                        </View>

                        <Button icon="upload" onPress={() => setModal(false)}
                        >Cancel</Button>

                    </View>
                </Modal>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    textfieldInput: {
        margin: 5
    },
    modalView: {
        position: "absolute",
        bottom: 2,
        width: "100%"
    },
    modalBtnView: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }
})

export default CreateEmployee;