
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
    
    loginBar = MUI.AddTEOutlineIconLeft(loginScreen,0.8,'Left','person','type your email',null,'#904A4A')
    loginBar.SetMargins(null,0.03)
    
    passwordBar = MUI.AddTEOutlineIconLeft(loginScreen,0.8,'Left,Password','lock','account password',null,'#904A4A')
    passwordBar.SetMargins(null,0.03)
    
    forgotPassText = app.AddText(loginScreen,'Forgot Password ?',0.8,null,'Left')
    forgotPassText.SetMargins(null,0.065)
    forgotPassText.SetFontFile('Misc/lexend.ttf')
    
    newUserText =  app.AddText(loginScreen,' I Dont Have An Account ',0.8,null,'Left')
    newUserText.SetMargins(null,0.065)
    newUserText.SetFontFile('Misc/lexend.ttf')
    
    nextButton = ui.addFilledButton('LogIn', 0.8, -1,null, loginScreen);
    nextButton.SetMargins(0, 0.17, 0, 0)
    
    app.AddLayout(loginScreen)
}


function openApp(){
    
}

