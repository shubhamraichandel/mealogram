var app_firebase = {};

(function(){
     // Initialize Firebase
 var config = {
    apiKey: "AIzaSyD8SfZs5mKZGSHH5Uo5XmjqhkaA1L4DNgo",
    authDomain: "mealo-d7871.firebaseapp.com",
    databaseURL: "https://mealo-d7871.firebaseio.com",
    projectId: "mealo-d7871",
    storageBucket: "mealo-d7871.appspot.com",
    messagingSenderId: "425720264223"
};
firebase.initializeApp(config);

  app_firebase = firebase;

})()