import { useEffect, useState } from "react"
import {View} from "react-native"
import {Text, Button} from "react-native-paper"
import { Alert } from "react-native"
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Image } from "react-native";


export default function HomeScreen({navigation}){
    
    const [logado, setLogado] = useState("Deslogado")
    const [file, setFile] = useState(null)	
    const [enviando, setEnviando] = useState(false)

    const storage = getStorage();

    const pickImage = async () => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos de permissões de rolagem para fazer isso funcionar!');
        }
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
        });
        if (!result.canceled) {
          setFile(result.assets[0].uri);
        } else if (result.canceled) {
            Alert.alert('Você não selecionou uma imagem');
        } else {
            Alert.alert('Erro ao selecionar a imagem');
        }
    }

    const uploadImage = async () => {
        if (file == null) {
            alert('Você não selecionou uma imagem');
        } else {
            const { uri } = file;
            const filename = uri.substring();
            const imageRef = ref(storage, `images/${filename}`);

            uploadBytes(imageRef, file).then ((snapshot) => 
            {
                alert('Imagem postada com sucesso!');
                setFile(null);
            }).catch((error) => {
                alert('Erro ao postar a imagem');
            }
            );
        }
    }

    const user = auth.currentUser;
    function logout(){
        signOut(auth).then(() => {
            alert("Usuário deslogado com sucesso.")
        }).catch((error) => {
            alert("Erro ao deslogar usuário.")
        }
        )
    }
    onAuthStateChanged(auth, (user) => {
        if (user){
            setLogado("Logado")
        } else {
            setLogado("Deslogado")
            navigation.navigate("login")
        }
    })
    if(!user) return(
        <View>
            <Text style={{textAlign:'center'}}>HOME</Text>
            <Button onPress={()=> {navigation.navigate("login")}}>Login</Button>
            <Button onPress={()=> {navigation.navigate("register")}}>Registrar</Button>

            <Text style={{textAlign:'center', fontWeight:'bold'}}>Estado: {logado}</Text>   
        </View>
    )
    else return (
        <View>
            <Text style={{textAlign:'center'}}>Twittelopes</Text>
            <Button onPress={pickImage}>Selecione uma imagem!</Button>
            {file !== null ? (
                <Image source={{ uri: file.uri }} style={{width:200, height: 200}}/>
            ) : null}
            <Button onPress={uploadImage}>Postar</Button>
            <Text style={{textAlign:'center', fontWeight:'bold'}}>Estado: {logado}</Text>
            <Button onPress={logout}>Sair</Button>
        </View>
    
    )
}
