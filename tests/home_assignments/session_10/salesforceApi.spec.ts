import {test,expect} from"@playwright/test"
let accessToken:any;
let uri:string;
let opp_id:any;
let recentOppId:any

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
   expect(response).toBeOK();
   expect(response.status()).toBe(200);
   expect(await response.json()).toHaveProperty('access_token')
   expect(await response.json()).toHaveProperty('instance_url')
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
        "Name": "Test opportunity via API by Kritarth Govil for Home Assignment",
        "stagename":"Needs Analysis",
        "CloseDate":"2025-03-31",
        "Probability": "10"
    }
    })
    expect(response).toBeOK();
    expect(response.status()).toBe(201);
    expect(await response.json()).toHaveProperty('success')
    expect(await response.json()).toHaveProperty('errors')
    const responseJson = await response.json();
    expect(responseJson.success).toBe(true);
    opp_id = await responseJson.id;
})
test('Patch an Opportunity',async({request})=>{
    const response = await request.patch(`${uri}/services/data/v58.0/sobjects/Opportunity/${opp_id}`,{
    "headers":{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${accessToken}`
    },
    "data":{
        "Name":"Test opportunity Name changed again by Kritarth Govil",
        "stagename":"Prospecting",
        "Type":"New Customer"
    }
    })
    expect(response).toBeOK();
    expect(response.status()).toBe(204);
})
test('Get an Opportunity',async({request})=>{
    const response = await request.get(`${uri}/services/data/v59.0/query?q=SELECT FIELDS(ALL) FROM Opportunity LIMIT 200`,{
    "headers":{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${accessToken}`
    },
    })
    expect(response).toBeOK();
    expect(response.status()).toBe(200);
    const responseJson = await response.json();
    expect(responseJson.done).toBe(true);
    expect(responseJson.totalSize).toBeLessThanOrEqual(200);
    expect(responseJson).toHaveProperty('records');
    recentOppId = responseJson.records[0].Id;
})
test('Delete the recent Opportunity',async({request})=>{
    const response = await request.delete(`${uri}/services/data/v59.0/sobjects/Opportunity/${recentOppId}`,{
    "headers":{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${accessToken}`
    },
    })
    expect(response).toBeOK();
    expect(response.status()).toBe(204);
})

