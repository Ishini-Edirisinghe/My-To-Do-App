export interface ITask {
    createdAt: Date;
    title: string;
    description: string;
    id: number;
}

export class Task {

    title: string;
    description: string;
    id: number;

    constructor(){
        this.title = '';
        this.description = '';
        this.id = 0;
    }
}