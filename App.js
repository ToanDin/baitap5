import {MyContextControllerProvider} from "./store"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import { useEffect } from "react"
import{NavigationContainer} from "@react-navigation/native"
import Router from "./routers/Router"

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const App =()=>{
  const USERS = firestore().collection('USERS')
  const admin ={
    fullName: 'Admin',
    email: "dinhtoan@gmail.com",
    password: "12345",
    phone: "0354252737",
    address: "BinhDuong",
    role:"admin"

  }
  useEffect(()=>{
    USERS.doc(admin.email)
    .onSnapshot(
      u =>{
        if(!u.exists) 
        {
          auth().createUserWithEmailAndPassword(admin.email, admin.password)
          .then(respone => 
          {
            USERS.doc(admin.email).set(admin)
            console.log("Add new account admin");
          }
         )
      }
    }
  )
}, []);
return(
  <MyContextControllerProvider>
    <NavigationContainer>
        <Router/>
    </NavigationContainer>
    </MyContextControllerProvider>
 
)
}

export default App


