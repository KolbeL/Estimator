(function () {
  if (typeof FIREBASE_CONFIG === 'undefined' || FIREBASE_CONFIG.apiKey === 'YOUR_API_KEY') return;
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    window._fbAuth  = firebase.auth();
    window._fbDb    = firebase.firestore();
    window._fbReady = true;
  } catch (e) {
    console.warn('Firebase init failed:', e);
  }
})();

function fbOnAuthChange(cb) {
  if (!window._fbReady) { cb(null); return; }
  window._fbAuth.onAuthStateChanged(cb);
}

async function fbSignIn(email, password) {
  return window._fbAuth.signInWithEmailAndPassword(email, password);
}

async function fbCreateAccount(email, password) {
  return window._fbAuth.createUserWithEmailAndPassword(email, password);
}

function fbSignOut() {
  return window._fbAuth.signOut();
}

async function fbSaveSettings(uid, settings) {
  return window._fbDb.doc(`users/${uid}/data/settings`).set(settings);
}

async function fbLoadSettings(uid) {
  const snap = await window._fbDb.doc(`users/${uid}/data/settings`).get();
  return snap.exists ? snap.data() : null;
}
