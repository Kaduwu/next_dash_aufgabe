export type MockUser = {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    pw: string;
};

export type User = {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
}

const user1 : MockUser = {
    id: 1,
    username: "john",
    firstname: "Elden",
    lastname: "John",
    pw: "123"
}

const user2 : MockUser = {
    id: 2,
    username: "admin",
    firstname: "John",
    lastname: "Admin",
    pw: "123"
}

const user3 : MockUser = {
    id: 3,
    username: "user",
    firstname: "Jane",
    lastname: "User",
    pw: "123"
}

const user4 : MockUser = {
    id: 4,
    username: "Domino's Pizza, Dienstags für 50% reduziert!!",
    firstname: "Domino's Pizza, ",
    lastname: "Dienstags für 50% reduziert!!",
    pw: "123"
}

const user5 : MockUser = {
    id: 5,
    username: "karl",
    firstname: "Karl",
    lastname: "Karlson",
    pw: "123"
}

export default function getMockUser() {
    return user1;
}

export function getMockUsers() {
    return [user1, user2, user3, user4, user5];
}