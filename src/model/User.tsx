// import { v4 as uuidv4 } from 'uuid';

class User {
    email: string;
    password:string;

    constructor(email:string,password:string) {
        this.email = email;
        this.password = password;
    }
}

export default User;


