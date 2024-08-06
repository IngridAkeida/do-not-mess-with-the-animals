import { signInWithEmailAndPassword } from "firebase/auth";

// Função de login
const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Login bem-sucedido
      const user = userCredential.user;
      console.log('Usuário logado:', user);
    })
    .catch((error) => {
      // Erro ao logar
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Erro ao logar:', errorCode, errorMessage);
    });
};