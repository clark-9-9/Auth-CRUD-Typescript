declare namespace Express {
    export interface Request {
      user: { userId: string; name: string };
    }
}


// declare namespace Express {
//     export interface Request {
//         user: any;
//     }
//     export interface Response {
//         user: any;
//     }
// }
  