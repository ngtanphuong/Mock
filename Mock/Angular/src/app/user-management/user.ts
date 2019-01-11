export class User {
    UserID: number;
    Name: string;
    UserName: string;
    Password: string;
    Gender: boolean;
    Birthday: any;
    Email: string;
    Phone: string;
    isAdmin: boolean;
    acAccessToken: string;
    AccessDate: any;

    constructor (userID: number, name: string, gender: boolean, date: any, email: string,
        phone: string, role: boolean, userName: string, password: string) {
        this.UserID = userID;
        this.Name = name;
        this.UserName = userName;
        this.Password = password;
        this.Gender = gender;
        this.Birthday = date;
        this.Email = email;
        this.Phone = phone;
        this.isAdmin = role;
        this.acAccessToken = '123';
        this.AccessDate = '1996-12-15T00:00:00';
    }

}

export class UserDelete{
    UserID:number;
    constructor(userID:number){
        this.UserID=userID;
    }
}
