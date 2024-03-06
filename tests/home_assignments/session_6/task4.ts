enum Role  {
    Admin="Admin",
    Editor="Editor",
    Viewer="Viewer"
}

type permission = {
    create:boolean,
    edit:boolean,
    delete:boolean
}
type rolePer = {
    [key:string]:permission
}

let rolePermissions:rolePer = {
    [Role.Admin]:{
        create:true,
    edit:true,
    delete:true
    },
    [Role.Editor]:{
        create:true,
        edit:true,
        delete:false 
    },
    [Role.Viewer]:{
        create:false,
        edit:false,
        delete:false 
    }
}
function hasPermission(role:string,permission:string){
    if(rolePermissions[Role[role]][permission]==true){
        return `${role} has the permission of ${permission}`
    }
    return `${role} do not have the permission of ${permission}`
}

console.log(hasPermission(Role.Admin,'delete'));
console.log(hasPermission(Role.Editor,'create'));
console.log(hasPermission('Viewer','create'));
console.log(hasPermission('Editor','delete'));
console.log(hasPermission('Admin','create'));