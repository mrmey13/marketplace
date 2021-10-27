const dotenv = require('dotenv');
dotenv.config();

export default {
    BaseURL: process.env.REACT_APP_API_URL,
    MediaURL: process.env.REACT_APP_API_MEDIA_URL,
    System_Code: process.env.REACT_APP_SYSTEM_CODE,
    System_Name: process.env.REACT_APP_SYSTEM_NAME,
    System_Domain: process.env.REACT_APP_SYSTEM_DOMAIN,
    GoogleMapsAPI_Key: process.env.GOOGLE_MAPS_API_KEY,

    Role_Sys_Admin: 1,
    Role_Mc_Board_Of_Control_Member: 10,
    Role_Admin: 11,
    Role_OP_User: 12,
    Role_OP_Leader: 13,
    Role_OP_Manager: 14,
    Role_Agent_Order: 21,
    Role_Agent_Card: 22,
    Role_Agent_Telesale: 23,
    Role_Merchant_User: 41,
    Role_Merchant_Leader: 42,
    Role_Merchant_Manager: 43,
    Role_HR_User: 51,
    Role_HR_Leader: 52,
    Role_HR_Manager: 53,
    Role_News_User: 61,
    Role_News_Leader: 62,
    Role_Document_HubUser: 71,
    Role_Document_HubLeader: 72,
    Role_Document_HubManager: 73,
    Role_Document_BankUser: 74,
    Role_Document_BankLeader: 75,
    Role_Document_BankManager: 76,
    Role_Card_HubUser: 81,
    Role_Card_HubLeader: 82,
    Role_Card_HubManager: 83,
    Role_Card_BankUser: 84,
    Role_Card_BankLeader: 85,
    Role_Card_BankManager: 86,

    Role_Merchant_Admin: 90,
    Role_Telesale_OP_User: 91,
    Role_Telesale_OP_Leader: 92,            //truong phong
    Role_Telesale_OP_Manager: 93,           //giam doc
    Role_Telesale_Merchant_User: 94,
    Role_Telesale_Merchant_Leader: 95,      //truong phong
    Role_Telesale_Merchant_Manager: 96,     //giam doc
    Role_Telesale_Mc_Branch_Director: 97,

    Role_HR_Mc_User: 54,
    Role_HR_Mc_Leader: 55,
    Role_HR_Mc_Branch_Director: 56,
    Role_HR_Mc_Manager: 57,

    FunctionRole_Trainer: 21,
    FunctionRole_Trainee: 22,
    FunctionRole_Management_Officer: 23,
    FunctionRole_Management_Manager: 24,

    Role_Solo_Seller: 121,
    Role_Solo_Buyer: 122,
    Role_Hub_Marketplace_User: 123,
    Role_Hub_Marketplace_TeamLeader: 124,
    Role_Hub_Marketplace_Director: 125,

    FunctionRole_Buyer: 31,
    FunctionRole_Seller: 32,
    FunctionRole_Marketplace_Executive: 41,
    FunctionRole_Marketplace_Leader: 42,
    FunctionRole_Marketplace_Director: 43,

    // Dev
    ShopUrl:"http://localhost:3002/shop",
    EtrainingUrl:"http://192.168.1.127:3000",
    HRUrl:"http://192.168.1.127:3001",
    SaleUrl:"https://general.aidriven.credito.asia",
    routeBase:"",
   
    // Deploy locally
    // ShopUrl:"http://192.168.1.127:2999/marketplace/shop",
    // EtrainingUrl:"http://192.168.1.127:2999/etraining",
    // HRUrl:"http://192.168.1.127:2999/hr",
    // SaleUrl:"https://general.aidriven.credito.asia",
    // routeBase:"marketplace",

    // production
    // ShopUrl:"http://salesplus.asia/shop",
    // EtrainingUrl:"http://etraining.salesplus.asia",
    // HRUrl:"http://hr.salesplus.asia",
    // SaleUrl:"https://general.aidriven.credito.asia",
    // routeBase:""
};

export const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
};