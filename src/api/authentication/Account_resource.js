//lets build some method that returns the user content by the JDW-token
// Path: src/api/authentication/Api_manager.js
// http://localhost:8080/api/account API endpoint

import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./Api_manager";


async function initSession(token) {
  try {
    console.log("Iniciando sessão");
    // define the user by the token
    const userContent =  await fetchUserContent(token); 

    const userId = userContent.id.toString();
    await AsyncStorage.setItem('userid', userId);

    if (!userContent) {
      return 401;
    }
    if (userContent) {
      return 200;
    } else {
      return 401;
    }
  } catch (error) {
    console.error("Error initializing session:", error);
    return 404;
  }
 
}

// Separate function for fetching user authorities
async function fetchUserAuthorities(token, username) {
  // console.log("Buscando autoridades do usuário", username);
  try {
    // console.log(token, "token", username, "username");
    const response = await ApiManager(`/admin/users/${username}`, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("retorno de autoridades"  );
    return response.data;
  } catch (error) {
    console.error("Error fetching user authorities:", error);
    return null;
  }
}

const fetchUserContent = async (token) => {
   console.log("Buscando conteúdo do usuário");
  try {
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Request timed out"));
      }, 10000); 
    });

    const apiPromise = ApiManager("/account", {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await Promise.race([apiPromise, timeoutPromise]);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching user content:", error);
    return null; // Handle potential errors gracefully
  }
}

const enviaSolicitacaoDeSenha = async (senhas, token) => {
  const interfaceJhipster = {
    currentPassword: senhas.senhaAtual,
    newPassword: senhas.novaSenha,
  }

  // console.log("enviando solicitação de senha", interfaceJhipster);

  try {
    const response = await ApiManager(`/account/change-password`, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: interfaceJhipster,
    });

    // console.log("retorno de solicitação de senha", response);
    return response;
  } catch (error) {
    console.error("Erro ao tentar redefinir senha", error.response.status);
    if (error.response.status && error.response.status) {
      return error.response.status;
    }

    return false; 
  }




}
  

export {
  initSession,
  fetchUserContent,
  fetchUserAuthorities,
  enviaSolicitacaoDeSenha,
};