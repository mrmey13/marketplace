const dotenv = require('dotenv');
dotenv.config();

export default {
    BaseURL: process.env.REACT_APP_API_URL,
    MediaURL: process.env.REACT_APP_API_MEDIA_URL,
    System_Code: process.env.REACT_APP_SYSTEM_CODE,
    System_Name: process.env.REACT_APP_SYSTEM_NAME,
    System_Domain: process.env.REACT_APP_SYSTEM_DOMAIN,
    GoogleMapsAPI_Key: process.env.GOOGLE_MAPS_API_KEY
}