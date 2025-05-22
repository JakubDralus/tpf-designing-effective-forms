import {initializeApp} from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyDH4HKFP8yeh1Ur63m8csEhLaARcef_kis",
  authDomain: "tpf-auth-3fe3d.firebaseapp.com",
  projectId: "tpf-auth-3fe3d",
  storageBucket: "tpf-auth-3fe3d.firebasestorage.app",
  messagingSenderId: "224966171993",
  appId: "1:224966171993:web:4b91b1f821f409d84b4048"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const userNameField = document.getElementById("firstName");
const emailField = document.getElementById("email");

const userSignIn = async () => {
  signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    console.log(user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage);
  });
};

const userSignOut = async () => {
  signOut(auth).then(() => {
    alert("You have been signed out!");
    
    userNameField.value = "";
    emailField.value = "";
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage);
  });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // alert("You are authenticated with Google");
    console.log('You are authenticated with Google');
    
    userNameField.value = user.displayName || "";
    emailField.value = user.email || "";
  }
});

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);
