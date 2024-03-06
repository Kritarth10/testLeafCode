var Role;
(function (Role) {
    Role["Admin"] = "Admin";
    Role["Editor"] = "Editor";
    Role["Viewer"] = "Viewer";
})(Role || (Role = {}));
var rolePermissions = {
    "Admin": {
        create: true,
        edit: true,
        "delete": true
    },
    "Editor": {
        create: true,
        edit: true,
        "delete": false
    },
    "Viewer": {
        create: false,
        edit: false,
        "delete": false
    }
};
function hasPermission(role, permission) {
    if (rolePermissions[Role[role]][permission] == true) {
        return "".concat(role, " has the permission of ").concat(permission);
    }
    return "".concat(role, " do not have the permission of ").concat(permission);
}
console.log(hasPermission(Role.Admin, 'delete'));
console.log(hasPermission(Role.Editor, 'create'));
console.log(hasPermission('Viewer', 'create'));
console.log(hasPermission('Editor', 'delete'));
console.log(hasPermission('Admin', 'create'));
