import { Method } from "@testing-library/dom";

export interface IUser {
    userName: string;
    email?: string;
    password: string
}

export interface ITabs {
    id: string,
    title: string,
    img: string | Blob,
    difficulty: string,
    likes: number,
    dislikes: number
}

// export interface Img {
//     size: number,
//     type: string,
//     name: string,
//     arrayBuffer: Method,
//     slice: string,
//     stream: string,
//     text: string

// }

export interface IComments {
    id: string,
    comment: string,
    tabId: string,
    userId: string
}