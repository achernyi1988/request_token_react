
import {combineReducers} from 'redux'
import {USER_ACCOUNT, USER_DATA} from "./types"


const userAccountReducer = (state = null, action) =>{
    if(USER_ACCOUNT === action.type){
        return action.payload;
    }
    return state;
}

const userDataReducer = (state = null, action) =>{
    if(USER_DATA === action.type){
        return action.payload;
    }
    return state;
}



export default combineReducers({
    isLoggin : userAccountReducer,
    userData: userDataReducer
})