const axios = require('axios');

import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./Api_manager";
import { initSession } from "./Account_resource";

// Function to verify JWT token
export default async function verifyToken() {
    try {

        const token = await AsyncStorage.getItem('token'); 

        if(token === "unlogged"){
            return 403;
        }
        if (!token) {
            return 401;
        }

        const status = await initSession(token);

        if(status === 200){
            return 200;
          } else {
            return 401;
        }
         
    } catch (error) {
        console.error('Token verification failed:', error.message);
        throw error;
    }

  
}
