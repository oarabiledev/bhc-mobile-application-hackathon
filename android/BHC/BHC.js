
/**
 * Here is the main start of the application
 * The main start is at the OnStart function
 * OnBack is when the user swipes back
 * 
 * OnData is for when user opens the app via another
 * app.
 * 
 * I built the material-design plugin 
*/

cfg.MUI
cfg.Light
app.LoadPlugin('material-design')
app.LoadPlugin( "Lottie" );

app.Script('Misc/firebase-app.js')
app.Script('Misc/firebase-auth.js')
app.Script('Misc/firebase-database.js')

var userConfig = 'userInfoStore';
let isNew = app.LoadBoolean('isNewUser',true,userConfig);

function OnStart() {
    ui.InitializeMaterialPlugin('light')
    ui.setTheme('light-medium-contrast')
    
    /* Here Is The FireBase Config, This Is Not Secure !!! */
    
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional\
    const firebaseConfig = {
        apiKey: "AIzaSyDa8-30xelWHYyGKw82givvwt8eM8KmMqE",
        authDomain: "bhc-mobile-app.firebaseapp.com",
        projectId: "bhc-mobile-app",
        storageBucket: "bhc-mobile-app.appspot.com",
        messagingSenderId: "309220637622",
        appId: "1:309220637622:web:b2078df1b709be23e01f17",
        measurementId: "G-VS9ZLB9C6B"
    };
    
    
    firebase.initializeApp(firebaseConfig)
    if (isNew) welcomeUser();
    else openApp();
}

function welcomeUser(){
    
    loginScreen = ui.createLayout('Linear','FillXY');
    
    animView = app.CreateLottie('Misc/home2.json', 1, 0.3, 'autoplay,loop')
    loginScreen.AddChild(animView)
    
    welcomeText = app.AddText(loginScreen, 'Welcome To The BHC App !', -1)
    welcomeText.SetFontFile('Misc/lexend.ttf');
    welcomeText.SetTextSize(18)
    
    emailBar = MUI.AddTEOutlineIconLeft(loginScreen,0.8,'Left','person','type your email',null,'#904A4A')
    emailBar.SetMargins(null,0.03)
    
    passwordBar = MUI.AddTEOutlineIconLeft(loginScreen,0.8,'Left,Password','lock','account password',null,'#904A4A')
    passwordBar.SetMargins(null,0.03)
    
    /**
     * Login Layout For Buttons
    */
    
    buttonsLay = ui.createLayout('Linear','Horizontal,Center');
    buttonsLay.SetMargins(0, 0.05)
    buttonsLay.SetSize(0.8,-1)
    buttonsLay.SetChildMargins(0.05,0,0.05)
    loginScreen.AddChild(buttonsLay)
    
    googleLoginBtn = MUI.AddButtonElegant(buttonsLay, 'logo_google', 0.2, -1,'#904A4A')
    googleLoginBtn.SetFontFile('Misc/f7Icons.ttf')
    
    facebookLoginBtn = MUI.AddButtonElegant(buttonsLay, 'logo_facebook', 0.2, -1,'#904A4A')
    facebookLoginBtn.SetFontFile('Misc/f7Icons.ttf')
    
    appleLoginBtn = MUI.AddButtonElegant(buttonsLay, 'logo_apple', 0.2, -1,'#904A4A')
    appleLoginBtn.SetFontFile('Misc/f7Icons.ttf')
    
    forgotPassText = app.AddText(loginScreen,'Forgot Password ?',0.8,null,'Left')
    forgotPassText.SetMargins(null,0.05)
    forgotPassText.SetFontFile('Misc/lexend.ttf')
    
    newUserText =  app.AddText(loginScreen,' I Dont Have An Account ',0.8,null,'Left')
    newUserText.SetMargins(null,0.065)
    newUserText.SetFontFile('Misc/lexend.ttf')
    
    loginButton = ui.addFilledButton('LogIn', 0.8, -1,null, loginScreen);
    loginButton.SetMargins(0, 0.04, 0, 0)
    loginButton.SetOnTouch(()=>{
        signInUserWithEmail(emailBar.GetText(), passwordBar.GetText())
    })
    app.AddLayout(loginScreen)
}


function openApp(){
    
}


function signInUserWithEmail(email, password){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        console.log(JSON.stringify(userCredential.user));
    })
   .catch((error) => {
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log(errorMessage)
    });
}

function signUpuserWithEmail(email, password){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        console.log(JSON.stringify(userCredential.user));
    })
    .catch((error) => {
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log(errorMessage)
    });
}
