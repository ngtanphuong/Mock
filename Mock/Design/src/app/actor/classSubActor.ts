
export interface ISubActor {
    ActorID: number;
    FilmID: number;
}

// SubActor class contain base infomation of  a Subactor
export class SubActor {

    // property
    public ActorID: number;
    public FilmID: number;

    // constructor
    constructor();
    constructor(iSubActor?: ISubActor) {
        this.ActorID = iSubActor && iSubActor.ActorID;
        this.FilmID = iSubActor && iSubActor.FilmID;
    }
}
