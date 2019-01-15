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
    filmModel = new Array<FavoriteFilm>();

    constructor (userID: number, name: string, gender: boolean, date: any, email: string,
        phone: string, role: boolean, userName: string, password: string, status: boolean, filmModel: Array<FavoriteFilm>) {
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
        this.filmModel = filmModel;
    }
    public static getDefault(): User {
        return new User(1, '123', null, null, '', '', null, '', '', null, []);
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
    Img: string;
    Describe: string;
    Rate: number;
    Year: any;
    Status: boolean;
    TypeFilms = null;
    Actors = null;
    Directors = null;

    constructor(filmId: number, filmName: string, img: string, describe: string, rate: number, year: any, status: boolean) {
        this.FilmId = filmId;
        this.FilmName = filmName;
        this.Img = img;
        this.Rate = rate;
        this.Status = status;
        this.Year = year;
        this.Describe = describe;
    }
}
