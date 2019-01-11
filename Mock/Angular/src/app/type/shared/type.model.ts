export class Type {
    TypeID: number;
    NameType: string;

    constructor(nameType: string) {
        this.NameType = nameType;
    }
}

export class Actor {
    ActorID: number;
    NameActor: string;

    constructor(name: string) {
        this.NameActor = name;
    }
}

export class Director {
    DirectorID: number;
    NameDirector: string;

    constructor(name: string) {
        this.NameDirector = name;
    }
}

export class Film {
    FilmID: number;
    FilmName: string;
    Img: string;
    Describe: string;
    Rate: string;
    Year: Date;
    Status: boolean;
    Types: any = [];
    Actors: any = [];
    Directors: any = [];

    constructor(name: string, img: string, describe: string,
         rate: string, year: Date, status: boolean) {
        this.FilmName = name;
        this.Img = img;
        this.Describe = describe;
        this.Rate = rate;
        this.Year = year;
        this.Status = status;
    }
}
