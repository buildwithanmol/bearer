import { sign } from "jsonwebtoken";

export interface IUser {
    name: string,
    email: string,
    password: string
}

export class User {
    private user: Map<string, IUser>;

    constructor() {
        this.user = new Map<string, IUser>();
    };

    addUser(user: IUser) {
        if (this.user.has(user.email)) {
            return { success: false, message: 'User already exists' }
        }
        this.user.set(user.email, user);
        return { success: true, message: 'User added successfully' }
    }

    login(email: string, password: string) {
        const user = this.user.get(email);

        if (!user) {
            return { success: false, message: 'User does not exist' }
        };

        const isPasswordValid = user.password === password;

        if (!isPasswordValid) {
            return { success: false, message: 'Invalid password' }
        }

        const token = sign({_id: user.email
        }, 'Devyansh', {
            expiresIn: '2h'
        })

        return {
            success: true,
            message: 'Login Successful',
            data: token
        }

    }

    getUser(email: string) {
        const user = this.user.get(email);
        if(!user) {
            return {success: false, message: 'User does not exist'}
        };

        return {success: true, data: user}
    }

}