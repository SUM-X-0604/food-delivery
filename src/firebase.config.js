import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBlLPbipLCmdZTu-LwknZvRERILok26Cxs",
    authDomain: "restaurant-68cff.firebaseapp.com",
    databaseURL: "https://restaurant-68cff-default-rtdb.firebaseio.com",
    projectId: "restaurant-68cff",
    storageBucket: "restaurant-68cff.appspot.com",
    messagingSenderId: "734163366105",
    appId: "1:734163366105:web:20535958cd06a7eaff4ec8"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app)

export { app, firestore, storage }