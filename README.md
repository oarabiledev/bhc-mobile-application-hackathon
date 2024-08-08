# BHC Mobile Application Hackathon Directory :

Here is the github containing all required files and executables for the BhC Mobile Hackathon Competion.

This hackathon was hosted by the skillranker platform ( national platform - Botswana ), and with joint cooperation
with BHC (Botswana Housing Cooperation), to see the full details of this hackathon visit :

- [Skills Ranker](https://skillsranker.bih.co.bw/)
  
- [BHC Mobile Hackathon](https://skillsranker.bih.co.bw/event/6661c6cb153813075a150625#)

The scope of this hackathon was to develop a mobile app that would be used by customers of a housing cooperation, the 
users were supposed to be able to perfom the following tasks : 

- view any terms and conditions
- report any faults in their home
- view their rental and tps statements
- call and ask personel on the workings of stuff
- browse rental homes or book a sport in case they want to buy 
- send out rental payments and payments to user generated faults

We have done so, and deliverd too a backend app, focused on managing users, which was not submitted as part
of the final result - We did not feel like the product was good enough.

Here is our choices :

## Language And FrameWork Choice

We decided to use Javascript and an android native sdk IDE - DroidScript, it allows us to write less
code and achieve more, its robust ecosystem and familiarity and ease of using was a better choice 
than using Expo or NativeScript

## Backend

We decided to use a free, easy and well documented solution - that is Firebase.

## Lessons

And here is what we learnt :

Firstly we learnt that writing test is important and i guess now that will be something we all will remember.

Why do i say so :

To test each and every feature implemented we had to repeaatedly call the database and that in an hour lead us to 
just 5000 firebase calls while in development.

The second thing we learnt is much more on the Framework side, it is prerendering the XML Dom (Android), we are
used to using HTML DOM and it being fast, we kept on adding elements and layouts on top of each other making it
slow

Not using Node.JS, the initial thought was shipping a node powerd mobile app will give us upto a 20MB + Binary 
but we lost out in so many features, using firebase as a script made the app slower unlike if it was loaded as
a node module.

### The OutCome 

We are still waiting >3
