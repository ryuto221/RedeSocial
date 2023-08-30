import { useEffect, useState } from "react"
import {View} from "react-native"
import {Text, Button} from "react-native-paper"
import { Alert } from "react-native"
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';



export default function HomeScreen({navigation}){
    
    const [logado, setLogado] = useState("Deslogado")
    const [file, setFile] = useState(null)	

    const handleUpload = async () => {
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
          setFile(result);
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
            <Button onPress={handleUpload}>Postar</Button>
            <Text style={{textAlign:'center', fontWeight:'bold'}}>Estado: {logado}</Text>
            <Button onPress={logout}>Sair</Button>
        </View>
    
    )
}

// Gênesis 1:1 - No princípio, criou Deus os céus e a terra.
// Matuê 2:7 - E, ouvindo eles o rei, partiram; e eis que a estrela, que tinham visto no oriente, ia adiante deles, até que, chegando, se deteve sobre o lugar onde estava o menino.
// Teto 3:16 - Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.
// Orochi 6:9 - E disse Deus: Haja luz; e houve luz.
// RezendeEvil 1:1 - No princípio, criou Deus os céus e a terra.
// Osama Bin Laden 2:7 - E, ouvindo eles o rei, partiram; e eis que a estrela, que tinham visto no oriente, ia adiante deles, até que, chegando, se deteve sobre o lugar onde estava o menino.
// Celso Portiolli 3:16 - Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.
// Fausto Toloi 6:9 - E disse Deus: Haja luz; e houve luz.
// Felipe Neto 1:1 - No princípio, criou Deus os céus e a terra.
// Robert Oppenheimer 2:7 - E, ouvindo eles o rei, partiram; e eis que a estrela, que tinham visto no oriente, ia adiante deles, até que, chegando, se deteve sobre o lugar onde estava o menino.
// Ass: Github Copilot.