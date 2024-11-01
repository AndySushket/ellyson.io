import { initializeApp, getApps } from "firebase/app";

import { getAnalytics, logEvent, isSupported } from "firebase/analytics";


  const firebaseConfig = {
  apiKey: 'AIzaSyCDy-Q2rOXXol6_I1rOVTXBeDSlFiiBQVM',
  authDomain: 'ellyson.io',
  projectId: 'ellyson-project',
  storageBucket: 'ellyson-project.appspot.com',
  messagingSenderId: '368910366104',
  appId: '1:368910366104:web:cb58a31375ff0a8d4ce7ed',
  measurementId: 'G-XDL0R248X3',
};
const app = initializeApp(firebaseConfig);

const analytics = isSupported().then((isSupported) => (isSupported ? getAnalytics(app) : null));

export const logCustomEvent = async (event) => {
  if (!analytics) return;

  logEvent(getAnalytics(), event, { platform: "web" });
};

