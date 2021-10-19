import cs from './const';

export const getRole = () => {
    var user = localStorage.getItem(cs.System_Code + '-user');
    if (!user) return null;
    var userrole = JSON.parse(String(user)).role;
    return userrole;
};

export const getUser = () => {
    var user = localStorage.getItem(cs.System_Code + '-user');
    if (!user) return null;
    var username = JSON.parse(String(user)).name;
    return username;
};

export const getFunctionRoles = () => {
    var user = localStorage.getItem(cs.System_Code + '-user');
    if (!user) return null;
    var userFunctionRoles = JSON.parse(String(user)).functionRoles;
    return userFunctionRoles;
}

export const hasToken = () => {
    var token = localStorage.getItem(cs.System_Code + '-token');
    return !(!token || token === null || token === 'null' || token === undefined)
}

export const isTrainer = () => {
    var user = localStorage.getItem(cs.System_Code + '-user');
    if (!user) return null;
    var userFunctionRoles = JSON.parse(String(user)).functionRoles;
    let isTrainer = false;
    userFunctionRoles.forEach(element => {
        if (element.functionRoleId === cs.FunctionRole_Trainer) {
            isTrainer = true;
            return false;
        }
    });
    return isTrainer;
}

export const isTrainee = () => {
    var user = localStorage.getItem(cs.System_Code + '-user');
    if (!user) return null;
    var userFunctionRoles = JSON.parse(String(user)).functionRoles;
    let isTrainee = false;
    userFunctionRoles.forEach(element => {
        if (element.functionRoleId === cs.FunctionRole_Trainee) {
            isTrainee = true;
            return false;
        }
    });
    return isTrainee;
}

export const isManagementOfficer = () => {
    var user = localStorage.getItem(cs.System_Code + '-user');
    if (!user) return null;
    var userFunctionRoles = JSON.parse(String(user)).functionRoles;
    let isMO = false;
    userFunctionRoles.forEach(element => {
        if (element.functionRoleId === cs.FunctionRole_Management_Officer) {
            isMO = true;
            return false;
        }
    });
    return isMO;
}

export const isManagementManager = () => {
    var user = localStorage.getItem(cs.System_Code + '-user');
    if (!user) return null;
    var userFunctionRoles = JSON.parse(String(user)).functionRoles;
    let isMM = false;
    userFunctionRoles.forEach(element => {
        if (element.functionRoleId === cs.FunctionRole_Management_Manager) {
            isMM = true;
            return false;
        }
    });
    return isMM;
}

export const isSoloUser = () => {
    var user = localStorage.getItem(cs.System_Code + '-user');
    if (!user) return null;
    var userRole = JSON.parse(String(user)).role;
    let isSolo = false;
    // userFunctionRoles.forEach(element => {
    //     if (element.functionRoleId === cs.FunctionRole_Seller) {
    //         isSolo = true;
    //         return false;
    //     }
    // });
    if (userRole === cs.Role_Solo_Buyer || userRole === cs.Role_Solo_Seller) {
        isSolo = true;
    }
    return isSolo;
}

export const isMarketplaceAdmin = () => {
    var user = localStorage.getItem(cs.System_Code + '-user');
    if (!user) return null;
    var userRole = JSON.parse(String(user)).role;
    var userFunctionRoles = JSON.parse(String(user)).functionRoles;

    let flag1 = false;
    let flag2 = false;

    if (userRole === cs.Role_Hub_Marketplace_User || userRole === cs.Role_Hub_Marketplace_TeamLeader
        || userRole === cs.Role_Hub_Marketplace_Director) {
        flag1 = true;
    }
    let tmp = userFunctionRoles.filter(element =>
        element.functionRoleId === cs.FunctionRole_Marketplace_Leader ||
        element.functionRoleId === cs.FunctionRole_Marketplace_Executive ||
        element.functionRoleId === cs.FunctionRole_Marketplace_Director
    );

    if (tmp && tmp.length > 0) {
        flag2 = true;
    }

    return flag1 || flag2;
}

export const isSeller = () => {
    var user = localStorage.getItem(cs.System_Code + '-user');
    if (!user) return null;
    var userRole = JSON.parse(String(user)).role;
    var userFunctionRoles = JSON.parse(String(user)).functionRoles;

    let tmp = userFunctionRoles.filter(element =>
        element.functionRoleId === cs.FunctionRole_Seller
    );

    if ((userRole && (userRole === cs.Role_Solo_Seller))
        || (tmp && tmp.length > 0)
    ) {
        return true
    }
    return false;
}