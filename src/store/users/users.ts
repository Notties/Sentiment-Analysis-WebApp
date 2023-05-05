import { StateCreator } from "zustand";
import userauth from "../types/userauth.type";

// add 
const createUsers: StateCreator<userauth> = (set)=>({
    email: "",
    userId: "",
    setUserEmail(emails: string){
        set(state => ({email: state.email, emails}) )
    },
    setUserId(userIds: string){
        set(state => ({userId: state.userId, userIds}) )
    }
})

export default createUsers;