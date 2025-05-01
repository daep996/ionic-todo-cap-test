import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
import { environment } from '../../environments/environment.local'
// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
apiKey: environment.firebase.apiKey,
authDomain: environment.firebase.authDomain,
projectId: environment.firebase.projectId,
storageBucket: environment.firebase.storageBucket,
messagingSenderId: environment.firebase.messagingSenderId,
appId: environment.firebase.appId,
measurementId: environment.firebase.measurementId,
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
// const analytics = getAnalytics(firebaseApp)

export default firebaseApp