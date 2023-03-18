// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
//   GoogleAuthProvider,
//   signInWithPopup,
//   sendPasswordResetEmail,
//   confirmPasswordReset,
//   Auth,
// } from 'firebase/auth';
// import { createContext, useContext, useState, useEffect, FC } from 'react';
// import { auth } from '../../../config/firebase';

// type User = firebase.User | null;

// interface AuthContextType {
//   currentUser: User;
//   register: (
//     name: string,
//     email: string,
//     password: string
//   ) => Promise<firebase.auth.UserCredential>;
//   login: (
//     name: string,
//     email: string,
//     password: string
//   ) => Promise<firebase.auth.UserCredential>;
//   logout: () => Promise<void>;
//   signInWithGoogle: () => Promise<firebase.auth.UserCredential>;
//   forgotPassword: (email: string) => Promise<void>;
//   resetPassword: (oobCode: string, newPassword: string) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType>({
//   currentUser: null,
//   register: () => Promise.resolve({} as firebase.auth.UserCredential),
//   login: () => Promise.resolve({} as firebase.auth.UserCredential),
//   logout: () => Promise.resolve(),
//   signInWithGoogle: () => Promise.resolve({} as firebase.auth.UserCredential),
//   forgotPassword: () => Promise.resolve(),
//   resetPassword: () => Promise.resolve(),
// });

// export const useAuth = () => useContext(AuthContext);

// const AuthContextProvider: FC = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState<User>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//     });

//     return () => unsubscribe();
//   }, []);

//   function register(name: string, email: string, password: string) {
//     return createUserWithEmailAndPassword(auth, email, password);
//   }

//   function login(name: string, email: string, password: string) {
//     return signInWithEmailAndPassword(auth, email, password);
//   }

//   function signInWithGoogle() {
//     const provider = new GoogleAuthProvider();
//     return signInWithPopup(auth, provider);
//   }

//   function forgotPassword(email: string) {
//     return sendPasswordResetEmail(auth, email, {
//       url: 'http://localhost:3000/login',
//     });
//   }

//   function resetPassword(oobCode: string, newPassword: string) {
//     return confirmPasswordReset(auth, oobCode, newPassword);
//   }

//   function logout() {
//     return signOut(auth);
//   }

//   const value: AuthContextType = {
//     currentUser,
//     register,
//     login,
//     logout,
//     signInWithGoogle,
//     forgotPassword,
//     resetPassword,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export default AuthContextProvider;
