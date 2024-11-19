import { getMockUsers } from "./user"

export function loginCheck(username : String, pw : String) {
    const users = getMockUsers();
    console.log("Username: " + username + ", Pw: " + pw);
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].pw == pw) {
            return users[i];
        }
    }
    return false;
}