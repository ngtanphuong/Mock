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
    Status: boolean;
    FavoriteFilm = new Array<FavoriteFilm>();

    constructor (userID: number, name: string, gender: boolean, date: any, email: string,
        phone: string, role: boolean, userName: string, password: string, status: boolean, favoriteFilm: Array<FavoriteFilm>) {
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
        this.AccessDate = '1996-12-15';
        this.Status = status;
        this.FavoriteFilm = favoriteFilm;
    }

}

export class UserDelete {
    UserID: number;
    constructor(userID: number) {
        this.UserID = userID;
    }
}


export class FavoriteFilm {
    FilmId: number;
    FilmName: string;
    constructor(filmId: number, filmName: string) {
        this.FilmId = filmId;
        this.FilmName = filmName;
    }
}

export class UserSetRole {
    UserID: number;
    Admin: boolean;
    constructor(userID: number, admin: boolean) {
        this.Admin = admin;
        this.UserID = userID;
    }
}
