export interface IUser {
    userName: string;
    email?: string;
    password: string
}

export interface ITabs {
    title: string,
    imgUrl: string,
    difficulty: string,
    likes: number,
    dislikes: number
}