import { createUserWithEmailAndPassword } from "firebase/auth";

// Função de signup
const signUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Cadastro bem-sucedido
      const user = userCredential.user;
      console.log('Usuário cadastrado:', user);
    })
    .catch((error) => {
      // Erro ao cadastrar
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Erro ao cadastrar:', errorCode, errorMessage);
    });
};