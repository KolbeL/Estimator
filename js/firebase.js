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

async function fbSaveEstimate(uid, estimate, grandTotal, compressedPhotos) {
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const estimateRef = window._fbDb.doc(`users/${uid}/estimates/${id}`);

  // Save estimate metadata without photos
  const { photos, ...estimateData } = estimate;
  await estimateRef.set({ ...estimateData, grandTotal, photoCount: compressedPhotos.length,
    savedAt: firebase.firestore.FieldValue.serverTimestamp() });

  // Save each photo as its own subcollection document
  for (const photo of compressedPhotos) {
    await estimateRef.collection('photos').doc(String(photo.id)).set(photo);
  }

  return id;
}

async function fbListEstimates(uid) {
  const snap = await window._fbDb
    .collection(`users/${uid}/estimates`)
    .orderBy('savedAt', 'desc')
    .limit(100)
    .get();
  return snap.docs.map(d => {
    const data = d.data();
    return { id: d.id, ...data,
      savedAt: data.savedAt ? data.savedAt.toDate().toISOString() : null };
  });
}

async function fbLoadEstimate(uid, estimateId) {
  const ref = window._fbDb.doc(`users/${uid}/estimates/${estimateId}`);
  const snap = await ref.get();
  if (!snap.exists) return null;
  const data = snap.data();

  // Load photos from subcollection
  const photoSnap = await ref.collection('photos').get();
  const photos = photoSnap.docs.map(d => d.data());

  return { ...data, photos,
    savedAt: data.savedAt ? data.savedAt.toDate().toISOString() : null };
}

async function fbDeleteEstimate(uid, estimateId) {
  const ref = window._fbDb.doc(`users/${uid}/estimates/${estimateId}`);
  const photoSnap = await ref.collection('photos').get();
  for (const doc of photoSnap.docs) await doc.ref.delete();
  await ref.delete();
}
