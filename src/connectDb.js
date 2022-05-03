// import tools from firebase 
import { initializeApp, getApps, cert } from 'firebase-admin/app';
// import firestore from firebase
import { getFirestore } from 'firebase-admin/firestore';
// import my credentials to conennt to firebase
import myCredentials from '../credentials.js';

// write a function to connect to firebase
export default function connectDb() {
    // first check to see if we are already connected...
    if (getApps().length === 0) {
        // if not, connect...
        initializeApp({
            credential: cert(myCredentials) // cert takes credentials and turns into certificate saying you have access
        });
    }
    //either way...
    // this function above will return the connection to firestore
    return getFirestore();
}
