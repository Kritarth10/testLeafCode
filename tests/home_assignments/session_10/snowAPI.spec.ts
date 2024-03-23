import {test,expect} from "@playwright/test"
const url = "https://dev62671.service-now.com"
const path = "/api/now/table"
let sysId;

test('Create a Change Request',async({request})=>{
    const response = await request.post(`${url}${path}/change_request`,{
        headers:{
            "Authorization":"Basic YWRtaW46M2tzJUxWZXFXSis5"
        }
    });
    expect(response).toBeOK();
    expect(response.status()).toBe(201);
    const responseJson = await response.json();
    expect(await responseJson).toHaveProperty('result')
    expect(await responseJson.result).toHaveProperty('number')
    expect(await responseJson.result).toHaveProperty('sys_id')
    sysId = responseJson.result.sys_id
})
test('Get the newly created Change Request',async({request})=>{
    const response = await request.get(`${url}${path}/change_request/${sysId}`,{
        headers:{
            "Authorization":"Basic YWRtaW46M2tzJUxWZXFXSis5"
        }
    });
    expect(response).toBeOK();
    expect(response.status()).toBe(200);
    const responseJson = await response.json();
    expect(await responseJson).toHaveProperty('result')
    expect(await responseJson.result).toHaveProperty('number')
    expect(await responseJson.result).toHaveProperty('sys_id')
    sysId = responseJson.result.sys_id
})
test('Modify the newly created Change Request',async({request})=>{
    const response = await request.put(`${url}${path}/change_request/${sysId}`,{
        headers:{
            "Authorization":"Basic YWRtaW46M2tzJUxWZXFXSis5"
        },
        data:{
            "short_description":"short description added by Kritarth Govil via API"
        }
    });
    expect(response).toBeOK();
    expect(response.status()).toBe(200);
    const responseJson = await response.json();
    expect(responseJson).toHaveProperty('result')
    expect(responseJson.result).toHaveProperty('number')
    expect(responseJson.result.short_description).toBe("short description added by Kritarth Govil via API")
});
test('Delete the newly created Change Request',async({request})=>{
    const response = await request.delete(`${url}${path}/change_request/${sysId}`,{
        headers:{
            "Authorization":"Basic YWRtaW46M2tzJUxWZXFXSis5"
        }
    });
    expect(response).toBeOK();
    expect(response.status()).toBe(204);
});