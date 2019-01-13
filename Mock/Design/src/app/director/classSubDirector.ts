
export interface ISubDirector {
    DirectorID: number;
    FilmID: number;
}

// SubDirector class contain base infomation of  a SubDirector
export class SubDirector {

    // property
    public DirectorID: number;
    public FilmID: number;

    // constructor
    constructor();
    constructor(iSubDirector?: ISubDirector) {
        this.DirectorID = iSubDirector && iSubDirector.DirectorID;
        this.FilmID = iSubDirector && iSubDirector.FilmID;
    }
}
