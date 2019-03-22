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

var rootRef = firebase.database().ref();




var messagesRef = rootRef.child("users");
    
    var userId = 0;

    // For user authentication
    function authHandler(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        // Set the gravatar
        document.getElementById('gravatar').src = authData.password.profileImageURL;
      }
    }

    // Log the user in with an email combination
    messagesRef.authWithPassword({
      email    : 'hello@deanhume.com',
      password : 'dean123'
    }, authHandler);

    messagesRef.onAuth(function(authData) {
       userId = authData.uid;
    });

    var messageField = document.getElementById('messageInput');
    var messageResults = document.getElementById('results');

    // Save data to firebase
    function savedata(){
      var message = messageField.value;

      messagesRef.child('users').child(userId).push({fieldName:'messageField', text:message});
      messageField.value = '';
    }

    // Update results when data is added
    messagesRef.child('users').child(userId).limitToLast(10).on('child_added', function (snapshot) {
        var data = snapshot.val();
        console.log(snapshot.val());
        var message = data.text;

        if (message != undefined)
        {
          messageResults.value += '\n' + message;
        }
    });