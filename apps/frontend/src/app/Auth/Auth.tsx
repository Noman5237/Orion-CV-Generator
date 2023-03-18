import React, { useState } from 'react';
import { auth, googleProvider } from '../../config/firebase';
import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  getRedirectResult,
} from 'firebase/auth';

export default function () {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [aToken, setAToken] = useState('');
  useState(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (res: any) => {
      if (res) {
        setUser(res);
      } else {
        setUser(null);
      }
      setError('');
      setLoading(false);
    });
    return unsubscribe;
  });

  //   const signIn = async () => {
  //     try {
  //       await createUserWithEmailAndPassword(auth, email, password);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  console.log(auth.currentUser);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log(auth.currentUser);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGithub = () => {
    setLoading(true);
    setError('');
    signInWithPopup(auth, new GithubAuthProvider())
      .then(async (res) => {
        const val = JSON.parse(JSON.stringify(res));
        console.log(val);
        setAToken("AIzaSyCGpi1HIYcBiH9Rp8udJAHzrsEp6rnAzUI");
        const headers = {
  Authorization: `Bearer ${aToken}`,
};
//         const getUserData = async () => {
//   try {
//     const response = await axios.get('https://api.github.com/user', { headers });
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

getUserData();
        
        console.log(res);
      })
      .catch((err) => setError(err.code))
      .finally(() => setLoading(false));
  };

  const getGithubToken = () => {
    setLoading(true);
    setError('');

    getRedirectResult(auth)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(
          result as any
        );
        if (credential) {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const token = credential.accessToken;
          console.log('I am called', token);
          // ...
        }

        // The signed-in user info.
        const user = result?.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.

        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const logout = async () => {
    try {
      console.log(auth.currentUser);
      await signOut(auth);
      console.log(auth.currentUser);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button onClick={signInWithGoogle}> Sign In With Google</button>
      <button onClick={signInWithGithub}> Sign In With Github</button>
      <button onClick={getGithubToken}> Get Git HubToken</button>

      <button onClick={logout}> Logout </button>
    </div>
  );
}
