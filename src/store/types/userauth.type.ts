interface userAuth{
    email: string
    userId: string
    setUserEmail:(email: string) => void
    setUserId:(userId: string) => void
}

export default userAuth;