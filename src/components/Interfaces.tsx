export interface IUser {
    userName: string;
    email?: string;
    password: string
}

export interface ITabs {
    id: string,
    title: string,
    imgUrl: string,
    difficulty: string,
    likes: number,
    dislikes: number
}

export interface IComments {
    id: string,
    comment: string,
    tabId: string,
    userId: string
}