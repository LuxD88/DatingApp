export interface User {
    username: string;
    token: string;
    photoUrl: string;
    knownAs: string;
    gender: string;
}

// only demonstration purpose - not used in the DatingApp

// type dependency in TypeScript

// let data: number | string = 42;
// data = "10";

// interface Car {
//     color: string;
//     model: string;
//     topSpeed?: number;  // topSpeed is optional
// }

// const car1: Car = {
//     color: 'blue',
//     model: 'BMW',
//     // topSpeed: 200
// }

// const car2: Car = {
//     color: 'red',
//     model: 'Mercedes',
//     topSpeed: 100
// }

// const multiply = (x: number, y: number) => {
//     return x * y;
// }