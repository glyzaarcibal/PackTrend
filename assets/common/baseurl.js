import { Platform } from 'react-native'


let baseURL = '';

{Platform.OS == 'android'
? baseURL = 'http://192.168.100.54:4000/api/v1/'
: baseURL = 'http://192.168.100.54:4000/api/v1/'
}

export default baseURL;