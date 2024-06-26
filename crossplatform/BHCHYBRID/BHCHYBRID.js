_AddPermissions('Network,Camera')

cfg.MUI
cfg.Light
cfg.Portrait
/**
 * Basically here im using these methods to save data that 
 * is stored betweenn
 * multiple app starts, meaning it remembers eeverything.
 */
//app.ClearData('userConfig')
let isNew = app.LoadBoolean('isNewUser', true, 'userConfig');

let dfltObject = {
    name : 'app',
    email : 'app@app.app'
}

let loginInfo = app.LoadJson('loginInfo', JSON.stringify(dfltObject), 'userConfig')
//app.ClearData('userConfig')

app.LoadPlugin('DsNav');
app.LoadPlugin('PopUp')
app.LoadPlugin("Lottie");
app.LoadPlugin("Support");
app.LoadPlugin("Animator");

app.EnableBackKey(false);

const firebaseConfig = {
    apiKey: "AIzaSyDa8-30xelWHYyGKw82givvwt8eM8KmMqE",
    authDomain: "bhc-mobile-app.firebaseapp.com",
    projectId: "bhc-mobile-app",
    storageBucket: "bhc-mobile-app.appspot.com",
    messagingSenderId: "309220637622",
    appId: "1:309220637622:web:b2078df1b709be23e01f17", 
    measurementId: "G-VS9ZLB9C6B"
};

let myriadpro = 'Misc/MYRIADPRO-REGULAR.OTF';

app.Script('Misc/firebase-app.js');
app.Script('Misc/firebase-firestore.js')
app.Script('firebase-storage.js')
app.Script('Misc/firebase-auth.js')

function OnStart() {
    splashlay = app.CreateLayout('Linear', 'FillXY,H/VCenter');

    splashicon = app.CreateImage('Img/bhcTransparent.png', 0.5, -1)
    splashicon.Animate('FadeIn', null, 410)
    splashlay.AddChild(splashicon)
    
    app.Script('Material.js')

    setTimeout(function() {
        ui.InitializeMaterialPlugin('light')
        ui.setTheme('light-medium-contrast')
        
        if (isNew) loginScreen();
        else OnUser();
        splashlay.Animate('FadeOut',()=>{
            app.DestroyLayout(splashlay);
        }, 500)
    }, 1000)
    
    firebase.initializeApp(firebaseConfig)
    app.AddLayout(splashlay)
}

var dw = DW();
var dh = DH();

function loginScreen(){
    container = app.CreateLayout( "Absolute", "FillXY")
    
    currentView = true ;
    
    /** FIRST PAGE : THE LOGIN PAGE **/
    loginScreen = ui.createLayout('Linear', 'FillXY',1, 1, container);
    loginScreen.SetBackColor('#FFFBFE')
    loginScreen.SetPosition(0,0)
    loginScreen.SetChildMargins(0, 0.02, 0, 0.02)
    loginScreen.Animate('FadeIn',null, 250);
    
    loginScreen.IsInView = function(){
        if (currentView) return true;
        else return false;
    }
    //animView = app.AddImage(loginScreen, 'Img/bhcTransparent.png', 0.5, -1)
    animView = app.CreateLottie('Misc/home2.json', 1, 0.3, 'autoplay,loop')
    loginScreen.AddChild(animView)

    let welcomeText = app.AddText(loginScreen, 'Welcome To The BHC App !', -1)
    welcomeText.SetFontFile(myriadpro);
    welcomeText.SetTextSize(18)

    let emailBar = MUI.AddTEOutlineIconLeft(loginScreen, 0.8, 'Left', 'person', 'type your email', null, '#904A4A')
    emailBar.SetMargins(null, 0.03)

    let passwordBar = MUI.AddTEOutlineIconLeft(loginScreen, 0.8, 'Left,Password', 'lock', 'account password', null, '#904A4A')
    passwordBar.SetMargins(null, 0.03)
    passwordBar.SetOnEnter(function(){
        signInUserWithEmail(emailBar.GetText(), passwordBar.GetText())
        app.HideKeyboard()
        let popup = app.CreatePopUp();
        popup.Align('Top')
        popup.SetText("[fa-info-circle] We are logging you in >3")
        popup.AnimateIn('SlideFromBottom')
        popup.AnimateOut('SlideToBottom')
        popup.Duration("long")
        popup.Show();
    })
    let buttonsLay = app.CreateLayout('Linear', 'Horizontal,Center');
    
    buttonsLay.SetSize(0.8, -1)
    buttonsLay.SetChildMargins(0.05, 0, 0.05)
    loginScreen.AddChild(buttonsLay)

    let googleLoginBtn = MUI.AddButtonElegant(buttonsLay, 'logo_google', 0.2, -1, primary)
    googleLoginBtn.SetFontFile('Misc/f7Icons.ttf')

    let facebookLoginBtn = MUI.AddButtonElegant(buttonsLay, 'logo_facebook', 0.2, -1, primary)
    facebookLoginBtn.SetFontFile('Misc/f7Icons.ttf')

    let appleLoginBtn = MUI.AddButtonElegant(buttonsLay, 'logo_apple', 0.2, -1, primary)
    appleLoginBtn.SetFontFile('Misc/f7Icons.ttf')

    let forgotPassText = app.AddText(loginScreen, 'Forgot Password ?', 0.8, null, 'Left')

    forgotPassText.SetFontFile('Misc/lexend.ttf')

    let newUserText = app.AddText(loginScreen, 'I Dont Have An Account ', 0.8, null, 'Left')

    newUserText.SetFontFile('Misc/lexend.ttf')

    newUserText.SetOnTouchDown(function() {
        startTransition();
    })

    let loginButton = ui.addFilledButton('LogIn', 0.8, -1, null, loginScreen);

    loginButton.SetOnTouch(() => {
        signInUserWithEmail(emailBar.GetText(), passwordBar.GetText())
        app.HideKeyboard()
        let popup = app.CreatePopUp();
        popup.Align('Top')
        popup.SetText("[fa-info-circle] We are logging you in >3")
        popup.AnimateIn('SlideFromBottom')
        popup.AnimateOut('SlideToBottom')
        popup.Duration("long")
        popup.Show();
    })
    
    /** SECOND PAGE : SIGN UP SCREEN **/
    
    signUpScreen = ui.createLayout('Linear', 'FillXY,Top',1 ,1, container);
    signUpScreen.SetPosition(1,0)
    signUpScreen.SetBackColor('#FFFBFE')
    
    signUpScreen.IsInView = function(){
        if (currentView) return true;
        else return false;
    }

    signUpScreen.SetChildMargins(0, 0.02, 0, 0.025)

    let textBar = app.AddText(signUpScreen, 'Hi Welcome To The BHC App\n Lets Make You An Account', -1, -1, 'Multiline')
    textBar.SetTextSize(18)
    textBar.SetFontFile(myriadpro)
    let nameBar = MUI.AddTEOutlineIconLeft(signUpScreen, 0.8, 'Left', 'person', 'type your name', true, '#904A4A')
    nameBar.SetMargins(null, 0.03)

    let signUpEmail = MUI.AddTEOutlineIconLeft(signUpScreen, 0.8, 'Left', 'email', 'type your email', true, '#904A4A')
    signUpEmail.SetMargins(null, 0.03)

    let phoneBar = MUI.AddTEOutlineIconLeft(signUpScreen, 0.8, 'Left,Number', 'phone', 'type your number', true, '#904A4A')
    phoneBar.SetMargins(null, 0.03)

    let signUpPasswordBar = MUI.AddTEOutlineIconLeft(signUpScreen, 0.8, 'Left,Password', 'lock', 'type your password', true, '#904A4A')
    signUpPasswordBar.SetMargins(null, 0.03)


    let checkPassword = MUI.AddTEOutlineIconLeft(signUpScreen, 0.8, 'Left,Password', 'lock', 're-type your password', true, '#904A4A')
    checkPassword.SetMargins(null, 0.03)

    let alternativeSignUpText = app.AddText(signUpScreen, 'Or You can also sign up using :', 0.8, null, 'Left')
    alternativeSignUpText.SetFontFile('Misc/lexend.ttf')

    let alternativeRow = app.CreateLayout('Linear', 'Horizontal,Center');
    alternativeRow.SetSize(0.8, -1)
    alternativeRow.SetChildMargins(0.05, 0, 0.05)
    signUpScreen.AddChild(alternativeRow)


    let googleSignUpBtn = MUI.AddButtonElegant(alternativeRow, 'logo_google', 0.2, -1, '#904A4A')
    googleSignUpBtn.SetFontFile('Misc/f7Icons.ttf')

    let facebookSignUpBtn = MUI.AddButtonElegant(alternativeRow, 'logo_facebook', 0.2, -1, '#904A4A')
    facebookSignUpBtn.SetFontFile('Misc/f7Icons.ttf')

    let appleSignUpBtn = MUI.AddButtonElegant(alternativeRow, 'logo_apple', 0.2, -1, '#904A4A')
    appleSignUpBtn.SetFontFile('Misc/f7Icons.ttf')

    let signUpBtn = ui.addFilledButton('SignUp', 0.8, -1, null, signUpScreen);

    signUpBtn.SetOnTouch(() => {
        /**
         * We do checks to see if fields are empty and tell the user, if fine 
         * We Continue
         */
        if (isValidEmail(signUpEmail.GetText()) == true && isValidNumber(phoneBar.GetText()) == true) {
            if (signUpPasswordBar.GetText().length >= 8) {
                if (signUpPasswordBar.GetText() !== checkPassword.GetText()) {
                    let snackbar = ui.addSnackBar('Hey Your Passwords Dont Match', 'ok', 0.85, 'top')
                    snackbar.Show();
                } else {
                    signUpUserWithEmail(signUpEmail.GetText(), signUpPasswordBar.GetText(), phoneBar.GetText(), nameBar.GetText())
                    let popup = app.CreatePopUp();
                    popup.Align('Top')
                    popup.SetText("[fa-info-circle] We are logging you in >3")
                    popup.AnimateIn('SlideFromBottom')
                    popup.AnimateOut('SlideToBottom')
                    popup.Duration("long")
                    popup.Show();
                }
            } else {
                let snackbar = ui.addSnackBar('Your Password Should Be Longer', 'ok', 0.85, 'top')
                snackbar.Show();
            }
        } else {
            let snackbar = ui.addSnackBar('Please Make Sure Your Email or Number Is Valid', 'ok', 0.85, 'top')
            snackbar.Show();
        }

    })
    
    app.AddLayout(container);
}

function startTransition(){
    loginScreen.CreateAnimation()
        .Scale( 0.4, 0.4 )
        .PositionX( -dw * 0.25 )
        .Start()
        .SetOnCompleted( startTransition_End )

    signUpScreen.CreateAnimation()
        .Scale( 0.4, 0.4 )
        .PositionX( dw * 0.25 )
        .Then()
        .Position( 0, 0 )
        .Then()
        .Scale( 1, 1 )
        .Start()
    currentView = false;
}

function exitTransition(){
    signUpScreen.CreateAnimation()
        .Scale( 0.4, 0.4 )
        .PositionX( dw * 0.25 )
        .Start()
        .SetOnCompleted( exitTransition_End )

    loginScreen.CreateAnimation()
        .Scale( 0.4, 0.4 )
        .PositionX( -dw * 0.25 )
        .Then()
        .Position( 0, 0 )
        .Then()
        .Scale( 1, 1 )
        .Start()
    currentView = true;
}


function startTransition_End() {
    container.ChildToFront( signUpScreen )
}

function exitTransition_End(){
    container.ChildToFront( loginScreen )
}


function loginUser() {
    loginScreen = ui.createLayout('Linear', 'FillXY');
    loginScreen.SetChildMargins(0, 0.02, 0, 0.02)
    loginScreen.Animate('FadeIn',null, 250);
    
    animView = app.CreateLottie('Misc/home2.json', 1, 0.3, 'autoplay,loop')
    loginScreen.AddChild(animView)

    let welcomeText = app.AddText(loginScreen, 'Welcome To The BHC App !', -1)
    welcomeText.SetFontFile('Misc/lexend.ttf');
    welcomeText.SetTextSize(18)

    let emailBar = MUI.AddTEOutlineIconLeft(loginScreen, 0.8, 'Left', 'person', 'type your email', null, '#904A4A')
    emailBar.SetMargins(null, 0.03)

    let passwordBar = MUI.AddTEOutlineIconLeft(loginScreen, 0.8, 'Left,Password', 'lock', 'account password', null, '#904A4A')
    passwordBar.SetMargins(null, 0.03)

    let buttonsLay = ui.createLayout('Linear', 'Horizontal,Center');
    buttonsLay.SetSize(0.8, -1)
    buttonsLay.SetChildMargins(0.05, 0, 0.05)
    loginScreen.AddChild(buttonsLay)

    let googleLoginBtn = MUI.AddButtonElegant(buttonsLay, 'logo_google', 0.2, -1, primary)
    googleLoginBtn.SetFontFile('Misc/f7Icons.ttf')

    let facebookLoginBtn = MUI.AddButtonElegant(buttonsLay, 'logo_facebook', 0.2, -1, primary)
    facebookLoginBtn.SetFontFile('Misc/f7Icons.ttf')

    let appleLoginBtn = MUI.AddButtonElegant(buttonsLay, 'logo_apple', 0.2, -1, primary)
    appleLoginBtn.SetFontFile('Misc/f7Icons.ttf')

    let forgotPassText = app.AddText(loginScreen, 'Forgot Password ?', 0.8, null, 'Left')

    forgotPassText.SetFontFile('Misc/lexend.ttf')

    let newUserText = app.AddText(loginScreen, ' I Dont Have An Account ', 0.8, null, 'Left')

    newUserText.SetFontFile('Misc/lexend.ttf')

    newUserText.SetOnTouch(function() {
        signUpUser();
        app.DestroyLayout(loginScreen)
    })

    let loginButton = ui.addFilledButton('LogIn', 0.8, -1, null, loginScreen);

    loginButton.SetOnTouch(() => {
        signInUserWithEmail(emailBar.GetText(), passwordBar.GetText())
    })

    app.AddLayout(loginScreen)
}

function signUpUser() {
    signUpScreen = ui.createLayout('Linear', 'FillXY,Top');
    signUpScreen.SetSize(1, 1)

    signUpScreen.SetChildMargins(0, 0.02, 0, 0.025)

    let textBar = app.AddText(signUpScreen, 'Hi Welcome To The BHC App\n Lets Make You An Account', -1, -1, 'Multiline')
    textBar.SetTextSize(18)
    textBar.SetFontFile(myriadpro)
    let nameBar = MUI.AddTEOutlineIconLeft(signUpScreen, 0.8, 'Left', 'person', 'type your name', true, '#904A4A')
    nameBar.SetMargins(null, 0.03)

    let emailBar = MUI.AddTEOutlineIconLeft(signUpScreen, 0.8, 'Left', 'email', 'type your email', true, '#904A4A')
    emailBar.SetMargins(null, 0.03)

    let phoneBar = MUI.AddTEOutlineIconLeft(signUpScreen, 0.8, 'Left,Number', 'phone', 'type your number', true, '#904A4A')
    phoneBar.SetMargins(null, 0.03)

    let passwordBar = MUI.AddTEOutlineIconLeft(signUpScreen, 0.8, 'Left,Password', 'lock', 'type your password', true, '#904A4A')
    passwordBar.SetMargins(null, 0.03)


    let checkPassword = MUI.AddTEOutlineIconLeft(signUpScreen, 0.8, 'Left,Password', 'lock', 're-type your password', true, '#904A4A')
    checkPassword.SetMargins(null, 0.03)

    let alternativeSignUpText = app.AddText(signUpScreen, 'Or You can also sign up using :', 0.8, null, 'Left')
    alternativeSignUpText.SetFontFile('Misc/lexend.ttf')

    let alternativeRow = ui.createLayout('Linear', 'Horizontal,Center');
    alternativeRow.SetSize(0.8, -1)
    alternativeRow.SetChildMargins(0.05, 0, 0.05)
    signUpScreen.AddChild(alternativeRow)


    let googleLoginBtn = MUI.AddButtonElegant(alternativeRow, 'logo_google', 0.2, -1, '#904A4A')
    googleLoginBtn.SetFontFile('Misc/f7Icons.ttf')

    let facebookLoginBtn = MUI.AddButtonElegant(alternativeRow, 'logo_facebook', 0.2, -1, '#904A4A')
    facebookLoginBtn.SetFontFile('Misc/f7Icons.ttf')

    let appleLoginBtn = MUI.AddButtonElegant(alternativeRow, 'logo_apple', 0.2, -1, '#904A4A')
    appleLoginBtn.SetFontFile('Misc/f7Icons.ttf')

    let signUpBtn = ui.addFilledButton('SignUp', 0.8, -1, null, signUpScreen);

    signUpBtn.SetOnTouch(() => {
        /**
         * We do checks to see if fields are empty and tell the user, if fine 
         * We Continue
         */
        if (isValidEmail(emailBar.GetText()) == true && isValidNumber(phoneBar.GetText()) == true) {
            if (passwordBar.GetText().length >= 8) {
                if (passwordBar.GetText() !== checkPassword.GetText()) {
                    let snackbar = ui.addSnackBar('Hey Your Passwords Dont Match', 'ok', 0.85, 'top')
                    snackbar.Show();
                } else {
                    signUpUserWithEmail(emailBar.GetText(), passwordBar.GetText(), phoneBar.GetText(), nameBar.GetText())
                }
            } else {
                let snackbar = ui.addSnackBar('Your Password Should Be Longer', 'ok', 0.85, 'top')
                snackbar.Show();
            }
        } else {
            let snackbar = ui.addSnackBar('Please Make Sure Your Email or Number Is Valid', 'ok', 0.85, 'top')
            snackbar.Show();
        }

    })
    app.AddLayout(signUpScreen)
}

/**
 * Weakly check if something is an email
*/

function isValidEmail(email) {
    if (typeof email == 'string') {
        if (email.includes('@')) return true;
        else return false;
    } else return false;
}

function isValidNumber(number) {
    if (number.length >= 7) return true;
    else return false;
}

function signInUserWithEmail(email, password) {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        let user = userCredential.user;

        app.SaveJson('loginInfo', {
            name: user.displayName,
            pin : password,
            email: user.email,
            id: user.uid
        }, 'userConfig');
        app.SaveBoolean('isNewUser', false, 'userConfig');
        OnUser()
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
    });
}

function signInUser(email, password){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
    console.log('User Logged Persistently')
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

function signUpUserWithEmail(email, password, phoneNumber, displayName) {
    let fixedNumber = '+267' + phoneNumber;

    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = firebase.auth().currentUser;

        /* Update User Names.. */
        /* Fake Update Phone Number, We Would Need To Verify It*/

        user.updateProfile({
            displayName: displayName,
            phoneNumber: fixedNumber
        })
        .then(() => {
            app.SaveJson('loginInfo', {
                name: user.displayName,
                pin : password,
                email: user.email,
                id: user.uid
        }, 'userConfig');

        app.SaveBoolean('isNewUser', false, 'userConfig');
        OnUser()
            })
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
}


function getUserInfo(info) {
    let json = app.LoadJson('loginInfo', {}, 'userConfig')
    return json[info]
}

let niceHouse = {
    Rent : 5000,
    Model : 120,
    Region : 'Serowe',
    ownerShipModel : 'rent'
}

let aightHouse = {
    Rent : 2100,
    Model : 67,
    Region : 'Selebi-Phikwe',
    ownerShipModel : 'rent'
}

let midHouse = {
    Rent : 3800,
    Model : 98,
    Region : 'Francistown-Gerald',
    ownerShipModel : 'rent'
}

function OnUser() {
    
    let db = firebase.firestore();
    let fileURL = 'none'
    let data = app.ReadFile('FAQ.txt');
    let support = app.CreateSupport();
    
    /**************************************************************************/
    /**************************************************************************/
    
    /* HOME SECTION */
    
    /**************************************************************************/
    /**************************************************************************/
    
    
    let homeLay = ui.createLayout('linear', 'fillxy,h/vcenter');
    homeLay.SetChildMargins(0.05,0.02,0.05)
    homeLay.Animate('FadeIn', null, 350)
    
    let homeCard = ui.createLayout('Card');
    homeCard.SetSize(0.9, 0.2)    
    homeLay.AddChild(homeCard)
    
    let insideCard = ui.createLayout('Absolute','FillXY,Bottom', 1, 0.2, homeCard)
    insideCard.SetBackground('Img/leaf.png')
    
    let bhcCornerImg = app.AddImage(insideCard, 'Img/bhcTransparent.png', 0.2, -1)
    bhcCornerImg.SetPosition(0.7,0.0)
    let welcomeView = app.AddText(insideCard, `Hello ${getUserInfo('name')} 👋`, -1, -1, 'Left,Bottom');
    welcomeView.SetTextSize(22);
    welcomeView.SetTextColor(scrim)
    welcomeView.SetPosition(0.02,0.15)
    
    let issuesCard = ui.createLayout('Card');
    issuesCard.SetSize(0.9, 0.15)    
    
    
    
    let issuesCardIn = ui.createLayout('Linear','FillXY,VCenter', 0.9, 0.15)
    issuesCard.AddChild(issuesCardIn)
    
    var listf = [
        {title : "Rent", icon: "report", color : "#904A4A"},
        {title : "Account & Issues", icon: "report", color : "#904A4A"}
    ]
    var stableItem = {title : "Account & Issues", icon: "report",
    color : "#904A4A"}
    
    var issueItem = {title : "Account & Issues", icon: "report",
    color : "#904A4A", badge: 1}
    
    let cardIssues = MUI.CreateListSimple(listf, 0.9, 0.15)
    issuesCardIn.AddChild(cardIssues);
    var isIssueThere = false;
    
    signInUser(getUserInfo('email'), getUserInfo('pin'))
    
    /** Get Any User Issues With Their Account And Notify Them **/
    db.collection('reports&Faults').doc(getUserInfo('name'))
    .get().then((doc)=>{
        if (doc.exists) {
            cardIssues.Animate('FadeIn',()=>{
                isIssueThere = true;
                cardIssues.RemoveItem(1);
                cardIssues.AppendItem(issueItem)
                //Do Not Use SetBadge has a weid issue
            },250)
        }
    })
    
    /* Listen For Changes On The Document */
    db.collection('reports&Faults').doc(getUserInfo('name'))
    .onSnapshot((doc)=>{
        if (doc.exists && !isIssueThere) {
            let data = doc.data();
            cardIssues.RemoveItem(1);
            cardIssues.AppendItem(issueItem)
            //Do Not Use SetBadge has a weid issue 
        } 
        else {
            // Document has been deleted
            isIssueThere = false;
            cardIssues.RemoveItem(1);
            cardIssues.AppendItem(stableItem)
        }
    })
    
    homeLay.AddChild(issuesCard)
    
    let rentButton = app.AddButton(homeLay, 'View Your Rent Or TPS Statements', 0.9, -1, 'FontAwesome');
    rentButton.SetStyle(primary,primary, 2, null ,null, 0)
    rentButton.SetOnTouch(function(){
        
    });
    
    let aplBtn = app.AddButton(homeLay, 'View Application Procedures', 0.9, -1, 'FontAwesome');
    aplBtn.SetStyle(primary,primary, 2, null ,null, 0)
    aplBtn.SetTextColor('white')
    rentButton.SetTextColor('white')
    
    /** Fetch The News Feed **/
    /** While Fetching, Show Progress Loader **/
    
    let frame = ui.createLayout('Frame','FillXY,H/VCenter', 0.9, -1, homeLay)
    let progress = support.CreateProgress(0.9);    
    progress.SetBarColor(primary);
    progress.SetSpin(true);
    
    
    let bhcNewsLst = app.CreateList(data, 0.9, -1,'Expand')
    bhcNewsLst.Hide();
    frame.AddChild(progress)
    frame.AddChild(bhcNewsLst)
    
    var newsRef = db.collection('articles');
    newsRef.get().then((snapshot) => {
    const output = [];
    snapshot.forEach((doc) => {
        const data = doc.data();
        const title = doc.id;
        const link = data.link;
        output.push(`${title}:${link}:null`);
    });
    let news = output;
    bhcNewsLst.SetList(news)
    progress.Hide();
    bhcNewsLst.Animate('FadeIn',function(){
        bhcNewsLst.Show();
    },550)
    
    bhcNewsLst.SetOnTouch((title,body,icon, index)=>{
        let modelData = output[index];
        let firstColon = modelData.indexOf(':')
        let lastColon = modelData.lastIndexOf(':')
        let unfitLink = modelData.substr(firstColon + 1, lastColon)
        let outputLink = unfitLink.slice(0, -5)
        app.OpenUrl(outputLink)
    })
    }) 
    .catch((error) => {
        /** Show A Network Issue Animation **/
        console.error(error.message)
    });
 
    
    /**************************************************************************/
    /**************************************************************************/
    
    /* SEARCH SECTION */
    
    /**************************************************************************/
    /**************************************************************************/
    let searchLay = ui.createLayout('linear', 'fillxy,h/vcenter');
    let homeSearchBar = MUI.CreateTextEditSearch(0.8, "NoKeyboard", "Search For A Home >3")
    
    
    searchLay.AddChild(homeSearchBar);
    
    
    
    /**************************************************************************/
    /**************************************************************************/
    
    /* ISSUES SECTION */
    
    /**************************************************************************/
    /**************************************************************************/
    let issuesLay = ui.createLayout('linear', 'fillxy');
    issuesLay.SetChildMargins(0, 0.03);
    issuesLay.Animate('FadeIn',null, 350)
    /* Shows The User Actions Like : Report / Ask / Inform */
    let displayText = app.AddText(issuesLay, `Hi ${getUserInfo('name')} this is your\nBHC Enquiries Section`, -1, -1, 'Multiline');
    displayText.SetFontFile('Misc/lexend.ttf');
    displayText.SetTextSize(18);

    let searchBar = MUI.CreateTextEditUnique(0.85, "Left", "Search For FAQ's");
    issuesLay.AddChild(searchBar);

    
    let newslst = app.CreateList(data, 0.85, 0.5);
    issuesLay.AddChild(newslst);        
    
    let reportBtn = app.AddButton(issuesLay, '[fa-flag] Report An Issue', 0.85, -1, 'FontAwesome');
    reportBtn.SetTextColor(surface);
    
    reportBtn.SetStyle(primary, primary, 0.8, null, null, 0);
    reportBtn.SetOnTouch(() => {
        
    let reportUI = MUI.CreateLayout('Linear', 'FillXY');
    reportUI.SetSize(1, 0.85);
    reportUI.SetChildMargins(0, 0.025);
    
    reportBottomSheet = ui.addBottomSheet(reportUI, 0.85, 'nocorner');
    
    aissueTitle = MUI.AddTEOutlineIconLeft(reportUI, 0.85, 'Left', 'person', 'type your issue title', false, '#904A4A');
    
    
    issueCategory = MUI.AddTEOutlineIconLeft(reportUI, 0.85, 'NoKeyboard', 'person', 'select your issue type', false, '#904A4A');
    issueCategory.SetOnTouch(() => { issueTypeList.Show(); });
    
    reportBottomSheet.Show();

    let reportList = [
        { name: 'Issue With House', check: false },
        { name: 'Change Of Tenancy', check: false }
    ];

    issueTypeList = MUI.CreateCheckList('What Is Your Issue ?', reportList, secondary, true);
    issueTypeList.SetTextEdit(issueCategory);

    homeIssueType = MUI.AddTEOutlineIconLeft(reportUI, 0.85, 'NoKeyboard', 'person', 'select a house problem', false, '#904A4A');
    homeIssueType.SetOnTouch(() => { lsd.Show(); });

    let list = [
        { name: "Electrical", icon: "person", color: "#f44336" },
        { name: "Plumbing", icon: "room", color: "#9c27b0" },
        { name: "Carpentry (garage, windows & frames)", icon: "account_circle", color: "#4285f4" },
        { name: "Masonry (Walls or Floor)", icon: "email", color: "#009688" },
        { name: "External (fence, sewage system, water supply)", icon: "email", color: "#009688" }
    ];
    
    lsd = MUI.CreateListDialog("Choose The Type Of House Issue", list, secondary, true);
    lsd.SetTextEdit(homeIssueType);

    issueArea = MUI.AddTextAreaOutlineA(reportUI, 0.85, 0.25, 'Hey describe your issue here >3', false, '#904A4A');

    let attachImagesBtn = MUI.AddButtonOutline(reportUI, 'Attach Image', 0.85, -1);
    attachImagesBtn.SetOnTouch(function () {
        app.ChooseImage('internal', function (path) {
            reportTYPE.SetEnabled(false);
            const storage = firebase.storage().ref();
            const imageRef = storage.child(getUserInfo('name') + path);

            const uploadTask = imageRef.put(path);
            uploadTask.then(snapshot => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    fileURL = downloadURL;
                    reportTYPE.SetEnabled(true);
                });
            })
            .catch(err => {
                alert(err);
            });
        });
    });

    let reportTYPE = app.AddButton(reportUI, '[fa-paper-plane] Send Your Report', 0.85, -1, 'FontAwesome');
    reportTYPE.SetTextColor(surface);
    reportTYPE.SetStyle(primary, primary, 0.8, null, null, 0);
    reportTYPE.SetOnTouch(function(){
        db.collection("reports&Faults").doc(getUserInfo('name')).set({
            IssueTitle: aissueTitle.GetText(),
            IssueCategory: issueCategory.GetText(),
            HouseIssue: homeIssueType.GetText(),
            UserDescription: issueArea.GetText(),
            UserImage: fileURL ? fileURL : 'none',
            CalculatedSeverity: getSeverity(issueCategory.GetText(), homeIssueType.GetText()),
            email: getUserInfo('email')
        })
        .then(() => {
            reportBottomSheet.Dismiss();
            let alert = ui.addSnackBar('We received your report, we will email you back.', null, 0.85, 'top');
            setTimeout(() => {
                alert.Show();
            }, 570);
        })
        .catch(error => {
            alert(`Hi, we couldn't receive your report, please try again later\n${error}`);
        });
    });
});

    let submitBtn = app.AddButton(issuesLay, '[fa-question] Submit A Question', 0.85, -1, 'FontAwesome');
    submitBtn.SetTextColor(surface);

    submitBtn.SetStyle(primary, primary, 0.8, null, null, 0);
    submitBtn.SetOnTouch(function () {
        let submitLay = ui.createLayout('Linear', 'FillXY');
        submitLay.SetSize(1, 0.45);
        submitLay.SetChildMargins(0, 0.015);

        let issueTitle = MUI.AddTEOutlineIconLeft(submitLay, 0.8, 'Left', 'person', 'type your issue title', false, '#904A4A');

        let issueArea = MUI.AddTextAreaOutlineA(submitLay, 0.8, 0.2, 'Hey type your issue here >3', false, '#904A4A');

        let submitBtnInner = ui.addFilledButton('Submit', 0.8, -1, 'paper-plane', submitLay);
        submitBtnInner.SetMargins(0, 0.05);
        submitBtnInner.SetOnTouch(function () {
            nav.Dismiss();
            if (issueTitle.GetText().length > 4 && issueArea.GetText().length >= 4) {
                db.collection("userEnquiries").doc(getUserInfo('name')).set({
                    title: issueTitle.GetText(),
                    email: getUserInfo('email'),
                    question: issueArea.GetText()
                })
                .then(() => {
                    let alert = ui.addSnackBar('We received your message, we will email you back.', null, 0.85, 'top');
                    setTimeout(() => {
                        alert.Show();
                    }, 570);
                })
                .catch((error) => {
                    alert("Message Not Sent :( ", 'Hi, an error occurred while trying to send your message.');
                    console.log(error);
                });
            } else {
                let alert = ui.addSnackBar('You Are Attempting To Send An Empty Message !', null, 0.85, 'top');
                alert.Show();
            }
        });
        let nav = ui.addBottomSheet(submitLay, 0.45);
        nav.Show();
    });

    
    /**************************************************************************/
    /**************************************************************************/
    
    /* ACCOUNT SECTION */
    
    /**************************************************************************/
    /**************************************************************************/
    let accountLay = ui.createLayout('linear', 'fillxy');
    accountLay.SetChildMargins(0,0.045)
    
    let accountImage = app.AddImage(accountLay, 'Img/user.png', 0.5, -1)
    
    let appDevs = app.ReadFile('Devs.txt')
    let developerList = app.CreateList(appDevs,0.85, -1)
    accountLay.AddChild(developerList)
    
    let logOutBtn = app.AddButton(accountLay, 'Log Out', 0.85, -1)
    logOutBtn.SetOnTouch(function(){
        const user = firebase.auth();
        user.signOut().then(() => {
            app.ClearData('userConfig');
            app.Exit();
        }).catch((error) => {
            alert(`Sorry Couldnt Log Out, Try Again: \n${error.message}`)
        });
    })
    let deleteAccBtn = app.AddButton(accountLay, 'Delete Account', 0.85, -1)
    deleteAccBtn.SetOnTouch(function(){
        const user = firebase.auth().currentUser;
        user.delete().then(() => {
            app.ClearData('userConfig');
            alert('Account Deleted, Exiting :')
            setTimeout(function(){
                app.Exit()
            },3500)
        }).catch((error) => {
            alert(`Sorry Couldnt Delete Account, Try Again`)
        });
    })
    dsnav = app.CreateDSNav(surface, "#eaeaea");
    dsnav.SetIconFontFile('Misc/f7Icons.ttf');

    dsnav.SetIcon("house,search,pin,person_crop_circle", "Home,Find Home,Issues,You");

    dsnav.SetIconColor(onSurfaceVariant);
    
    dsnav.SetActiveTabColor(bottomAppBarFAB.value);
    dsnav.SetIconSize(21);
    dsnav.AddChild([homeLay], [searchLay], [issuesLay], [accountLay]);
    dsnav.Set();
}


function getSeverity(issueType, houseProblem){
    if (issueType == 'Change Of Tenancy') return 'normal';
    else {
        let highRiskIssues = ['Electrical','Plumbing'];
        if (highRiskIssues.includes(houseProblem)){
            return 'emergency'
        }
        if (['External (fence,sewage system, water supply)'].includes(houseProblem)){
            return 'urgent'
        }
        else return 'normal';
    }
}

let inv = 1;
function OnBack() {
    try { 
        if (loginScreen.IsInView()) app.ToBack();
        else exitTransition();
        
        if (inv == 4) inv = 0, app.ToBack();
        if (dsnav.GetActiveTab() == 0) app.ToBack();
        else {
            if (dsnav.GetActiveTab() == 0) app.ToBack();
            dsnav.Goto(dsnav.GetActiveTab() - inv);
            inv += 1;
            console.log('GOTO : ',inv)
        }   
    
    } catch (err) { console.log(err) }
}
