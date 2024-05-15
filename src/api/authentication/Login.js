

import { fetchUserContent, fetchUserVigiaProfile, fetchUserAuthorities, initSession } from "./Account_resource";
import ApiManager from "./Api_manager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = async (username, password, rememberMe) => {
  try {
    //  const soPraSaber1 = await AsyncStorage.getAllKeys();
    //  console.log(soPraSaber1, "soPraSaber1");

    await AsyncStorage.clear();
    // console.log("AsyncStorage Cleared");

  const response = await ApiManager("/authenticate", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({ username, password, rememberMe }),
      timeout: 10000,
    });

    // Check for API response errors
    // console.log(response, "response");
    if (!response || response.status !== 200) {
      
      throw new Error(response ? response.statusText : "API response is empty");
      
    }

    // Store token
    // console.log(response, "response.data");
    const token = response.data.id_token;
    await AsyncStorage.setItem('token', token);

    const status = await initSession(token);

    if(status === 200){
      return 200;
    } else {
      return 401;
    }



    // // Separated section for fetching user authorities
    // const accessDefinition = await fetchUserAuthorities(token, username);

    // const userContent = await fetchUserContent(token);

    // console.log(userContent, "userContent");
    // await AsyncStorage.setItem('userid', userContent.id);

    // console.log(userContent, "userContent");
    // // Store authorities if available
    // if (accessDefinition && accessDefinition.data.authorities.length > 0) {
    //   await AsyncStorage.setItem('adm', 'true');
    // } else {
    //   const response = await fetchUserVigiaProfile(userContent.id, token);
    //   console.log(response, "response");
    //   await AsyncStorage.setItem('id_vigia', response.id);
    // }

    // const soPraSaber = await AsyncStorage.getAllKeys();
    // console.log(soPraSaber, "soPraSaber");
  } catch (error) {
    console.error(error, error.code);
    return error.code === 'ERR_NETWORK' ? 408 : 401;
  }
};

module.exports = {
  Login,
};