import {test} from"@playwright/test"
let accessToken:any;
let uri:string;
let opp_id:any;

test('Generate AuthToken',async({request})=>{
   const response = await request.post("https://login.salesforce.com/services/oauth2/token",{
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
            "Connection":"Keep-alive"
        },
        form:{
             "grant_type":"password",
             "client_id":"3MVG9q4K8Dm94dAypzQ1seqvpeJukTyMgGqabOFZXEMqd.31H34x.Cc3ajtOyXkboZhqTYlOg14TJnQedlhkF",
             "client_secret":"4B26E7C5D9C0FCECB6F959A60C7C2B236A3F006C93147A87F52A82AAB184914D",
             "username":"kannugovil@3logic.com",
             "password":"Krit@rth_1"
        }
   })

   const generateToken = await response.json();
   accessToken = generateToken.access_token;
   uri= generateToken.instance_url;
})
test('Create an Opportunity',async({request})=>{
    const response = await request.post(`${uri}/services/data/v58.0/sobjects/Opportunity`,{
    "headers":{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${accessToken}`
    },
    "data":{
        "Name": "Test opportunity via API by Kritarth Govil",
        "stagename":"Needs Analysis",
        "CloseDate":"2024-03-25",
        "Probability": "10"
    }
    })
    const responseJson = await response.json();
    opp_id = await responseJson.id;
})
test('Get an Opportunity',async({request})=>{
    const response = await request.get(`${uri}/services/data/v58.0/sobjects/Opportunity/${opp_id}`,{
    "headers":{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${accessToken}`
    },
    })
    const responseJson = await response.json();
    // console.log(responseJson);
    console.log(responseJson.Id);
    console.log(responseJson.Name);
})
test('Patch an Opportunity',async({request})=>{
    const response = await request.patch(`${uri}/services/data/v58.0/sobjects/Opportunity/${opp_id}`,{
    "headers":{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${accessToken}`
    },
    "data":{
        "Name":"Test opportunity Name changed again by Kritarth Govil"
    }
    })
    console.log(response.status());
})