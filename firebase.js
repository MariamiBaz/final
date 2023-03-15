const firebaseConfig = {
  apiKey: "AIzaSyC11eg5m3uZUbbJjjbZ9WZE_x3t16A5aRI",
  authDomain: "project1239-799fc.firebaseapp.com",
  projectId: "project1239-799fc",
  storageBucket: "project1239-799fc.appspot.com",
  messagingSenderId: "980251572806",
  appId: "1:980251572806:web:ce5ff8dcd47139e3526847",
  measurementId: "G-G312MS4MPW",
};

firebase.initializeApp(firebaseConfig);
function generateFirebaseItem(ID, value) {
  return {
    id: ID,
    data: value,
  };
}

function addElementInFirebase(REF, data) {
  firebase.database().ref(`${REF}/${randomID()}`).set(data);
}

function getRefFromFirebase(REF) {
  const result = [];
  firebase
    .database()
    .ref(REF)
    .on("value", (response) => {
      response.forEach((element) => {
        result.push(generateFirebaseItem(element.key, element.val()));
      });
    });
  return result;
}

function getElementFromFirebase(REF, id) {
  const array = getArrayFromFirebase(REF);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      array.forEach((element) => {
        if (element.id === id) {
          resolve(element);
        }
      });
      reject("404");
    }, 1000);
  });
}

function updateDataInFirebaseByID(REF, id, data) {
  firebase.database().ref(`${REF}/${id}`).set(data);
}

function removeElementFromFirebase(REF, id) {
  firabase.database().ref(`${REF}/${id}`).remove();
}

function removeRefFromFirebase(REF) {
  firebase.database().ref(REF).remove();
}
