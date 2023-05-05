import create from 'zustand'
import userauth from './types/userauth.type'
import createUsers from './users/users'

const useStore = create<userauth>()((...a) =>({
    ...createUsers(...a)
}))

export default useStore;