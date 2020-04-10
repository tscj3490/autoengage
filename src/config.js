const DEV_MODE = 1
const PRODUCT_MODE = 2

const CONFIG_MODE = PRODUCT_MODE

export const SERVICE_API_URL = (
    CONFIG_MODE==DEV_MODE?
    "http://192.168.1.165:7000":
    "http://159.122.201.34:30558"       //To do: replace with real service url
);
export const SERVICE_FILE_URL = (
    CONFIG_MODE==DEV_MODE?
    "http://192.168.1.165:7000":
    "http://159.122.201.34:30558"       //To do:s replace with real service url
);

export const firebaseConfig = {
    apiKey: "AIzaSyDETl5diKbDoNTI_MUZDFgnTPpSkbrSvoM",
    authDomain: "greenbay-chat.firebaseapp.com",
    databaseURL: "https://greenbay-chat.firebaseio.com",
    projectId: "greenbay-chat",
    storageBucket: "greenbay-chat.appspot.com",
    messagingSenderId: "935587814271",
}