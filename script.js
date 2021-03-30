function signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
            // The signed-in user info.
        var user = result.user;
            
            /* If the user is signed in correctly, [user] will be an object with the auth data
               loadInfo(user) then takes that information and replaces the "Sign In" link with 
               the user's data. */

        loadInfo(user);
    }).catch(function(error) {
            // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
            // The email of the user's account used.
        var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
    });
}

function checkLoggedIn() {
    
    // This function checks if the user is signed in. I usually have this run every time a page
    // loads in order to keep people from being signed out and still accessing the page.

    console.log('checked log');
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

            /* If the user is signed in correctly, [user] will be an object with the auth data
               loadInfo(user) then takes that information and replaces the "Sign In" link with 
               the user's data. */

            loadInfo(user);
        } else {

            // No user is signed in.

        }
    });
}

function loadInfo(user) {
    console.log(user);
    var name = user.displayName;  // User's Google account display name
    var img = user.photoURL;  // User's Google icon
    var info = '<div class="ui simple dropdown item">'+
        name+'<img class="ui avatar image" src="'+img+'" style="margin-left:10px">'+
        '<div class="menu">'+
        '<a class="item" href="#" onclick="signOut()">Sign out</a>'+
        '</div></div>';
    document.getElementById('userInfo').innerHTML = info;   // This replaces the "Sign In" link with
                                                            // the code in [info];
}

function signOut() {
    firebase.auth().signOut().then(function() {
        location.reload();
    }).catch(function(error) {
        // An error happened.
    });
}
