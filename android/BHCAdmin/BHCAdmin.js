_AddPermissions('Network')
//Configure app to use NodeJS as the main scripting engine
//giving you the full power of Node directly in your app!
cfg.NodeESM

//Configure for Material UI and light theme.
cfg.MUI, cfg.Light

//Make sure the required node modules are installed to ide.
//(This downloads modules from https://www.npmjs.com).


import { getAuth } from 'firebase-admin/auth';
const master = require("FIREBASE_CONFIG.json");
var admin = require("firebase-admin");
const ui = require('Material.js');
app.LoadPlugin('Support')
app.LoadPlugin('DsNav')


admin.initializeApp({
  credential: admin.credential.cert(master)
});

//Called when application is started.
export function OnStart() {
    ui.InitializeMaterialPlugin()
    ui.setTheme('light-medium-contrast');
    let support = app.CreateSupport();
    
    
    let home = ui.createLayout('linear','fillxy,bottom');
    
    let getUserbtn = app.AddButton(home, 'Get A User Account', 0.85, -1, 'FontAwesome')
    getUserbtn.SetStyle(`#904A4A`,`#904A4A`, 2, null ,null, 0)
    getUserbtn.SetTextColor('white')
    getUserbtn.SetOnTouch(function(){
        let waysList = [
            { name : "Email"},
            { name : "Phone Number"}
        ]
        let questionSheet = MUI.CreateListDialog('Get Account Via', waysList,'#904A4A', true)
        questionSheet.SetOnSelect(questionSheetOnTouch)
        questionSheet.Show()
    })
    let addUsersBtn = app.AddButton(home, 'Create A User Account', 0.85, -1, 'FontAwesome');
    addUsersBtn.SetStyle(`#904A4A`,`#904A4A`, 2, null ,null, 0)
    addUsersBtn.SetTextColor('white')
    addUsersBtn.SetOnTouch(function(){
        let page = support.CreateBottomSheet();
        
        let form = ui.createLayout('linear','fillxy');
        form.SetChildMargins(0, 0.02);
        form.SetSize(1, 0.6)
        page.AddChild(form);
        
        
        let name = MUI.AddTEOutlineIconLeft(form, 0.8, 'Left', 'person', 'name & surname', null, '#904A4A')
        
        let email = MUI.AddTEOutlineIconLeft(form, 0.8, 'Left', 'mail', 'email in here', null, '#904A4A')
        
        let number = MUI.AddTEOutlineIconLeft(form, 0.8, 'Left,Number', 'phone', 'phone number here', null, '#904A4A')
        
        let passkey = MUI.AddTEOutlineIconLeft(form, 0.8, 'Left,Password', 'person', 'password in here', null, '#904A4A')
        
        let createBtn = app.AddButton(form, 'Create This Account', 0.85, -1, 'FontAwesome');
        createBtn.SetStyle(`#904A4A`,`#904A4A`, 2, null ,null, 0)
        createBtn.SetTextColor('white')
        createBtn.SetOnTouch(function(){
            getAuth()
            .createUser({
                displayName : name.GetText(),
                email : email.GetText(),
                phoneNumber : `+267` + number.GetText(),
                password : passkey.GetText()
            })
            .then((userRecord)=>{
                page.Dismiss();
                alert(`${userRecord.displayName} has been created.`)
            })
            .catch((err)=>{
                alert(err.message)
            })
        })
        page.Show()
    })
    
    let store = ui.createLayout('linear','fillxy')
    
    
    let reports = ui.createLayout('linear','fillxy');
    
    
    let enquries = ui.createLayout('linear','fillxy');
    
    let dsnav = app.CreateDSNav("#FFFFFF", "#FFFFFF");dsnav.SetIcon("house,shop,flag,question","Home, Store,Reports, Enquries")
    dsnav.SetActiveTabColor("#583B3B")
    dsnav.SetIconSize(21)
    dsnav.SetIconFontFile('Misc/f7Icons.ttf')
    dsnav.AddChild([home],[store],[reports],[enquries])
    dsnav.Set()
}

function questionSheetOnTouch(item){
    if (item == 'Email'){
        let emailDialog = app.CreateDialog('Fetch/Update User Via Email');
    
    let emailInputLay = ui.createLayout('linear','fillxy')
    emailInputLay.SetSize(0.9,0.5);
    emailDialog.AddLayout(emailInputLay)
    
    let emailInput = MUI.AddTEOutlineIconLeft(emailInputLay, 0.8, 'Left', 'person', 'name & surname', null, '#904A4A')
    emailInput.SetOnEnter(function(){
        
    })
    emailDialog.Show()
    }
    else {
        
    }
}

function getAccountByQr(){
    
}


function getAccountByNumber(){
    
}

function getAccountByMail(){
    //questionSheet.Dismiss();
    let emailDialog = app.CreateDialog('Fetch/Update User Via Email');
    
    let emailInputLay = ui.createLayout('linear','fillxy')
    emailInputLay.SetSize(0.5,0.5);
    emailDialog.AddLayout(emailInputLay)
    
    let emailInput = MUI.AddTEOutlineIconLeft(emailInputLay, 0.8, 'Left', 'person', 'name & surname', null, '#904A4A')
    emailDialog.Show()
}
