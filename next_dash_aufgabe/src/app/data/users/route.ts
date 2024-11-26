export const users = [
    {id: 1, name: "user", pw: "123", firstname: "John", lastname: "User"},
    {id: 2, name: "admin", pw: "123", firstname: "John", lastname: "Admin"},
    {id: 3, name: "kadu", pw: "123", firstname: "Kaduwu", lastname: "Uwu"},
    {id: 4, name: "nur", pw: "123", firstname: "Nur", lastname: "Eis"},
    {id: 5, name: "ransu", pw: "123", firstname: "Ransu", lastname: "Solainteau"},
]

export async function GET() {
    return Response.json(users);
}