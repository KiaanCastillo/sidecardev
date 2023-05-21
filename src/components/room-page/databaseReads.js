import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue} from "firebase/database";

import axios from "axios";
  
const firebaseConfig = {
    apiKey: "AIzaSyBvfOpgYeasmMuFl_cNFf8NZUhZ6yBsD3Q",
    authDomain: "sidecar-402a5.firebaseapp.com",
    databaseURL: "https://sidecar-402a5-default-rtdb.firebaseio.com",
    projectId: "sidecar-402a5",
    storageBucket: "sidecar-402a5.appspot.com",
    messagingSenderId: "945779284465",
    appId: "1:945779284465:web:dec398402a320216cdcc50",
    measurementId: "G-NZS4NHGYMH"
};


// const returnFirebaseApp = async () => {
   
//     const result = await axios(
//         `http://localhost:3000/firebase/firebaseGet`
//         );

    
    
//     // const app = initializeApp(firebaseConfig);
//     // const db = getDatabase(app);


// }

// // Initialize Firebase

// const starCountRef = ref(db, 'posts/' + postId + '/starCount');

// // function subscribeToLobby(lobbyID){
    
// //     const obj = useState();
    
//     const dbListenerGet = async () => { 
//       const result = await axios(
//         `http://localhost:3000/firebase/firebaseGet`
//         );
  
//         setMessageListener(result.data);
//         console.log(result);
  
//         onValue(result.data, (snapshot) => {
//           const data = snapshot.val();
//           console.log(snapshot)
//           // setCodeContent(data);
//         });
//       }
  
//       dbListenerGet();
  


// // onValue(starCountRef, (snapshot) => {
// //   const data = snapshot.val();
// //   updateStarCount(postElement, data);
// // });

// // }

export default firebaseConfig;

