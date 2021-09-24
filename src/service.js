import cs from './const';

export const getRole = () => {
    var user = localStorage.getItem(cs.System_Code + '-user');
    if (!user) return null;
    var userrole = JSON.parse(String(user)).role;
    return userrole;
};

export const getFunctionRoles = () => {
    var user = localStorage.getItem(cs.System_Code + '-user');
    if (!user) return null;
    var userFunctionRoles = JSON.parse(String(user)).functionRoles;
    return userFunctionRoles;
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
    if (userRole === cs.Role_Solo_Buyer || cs.Role_Solo_Seller) {
        isSolo = true;
    }
    return isSolo;
}