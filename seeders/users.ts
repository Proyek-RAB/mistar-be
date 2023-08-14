import {v4 as uuidv4} from 'uuid';

export const users = [
    {
        id: uuidv4(),
        type: 'user',
        name: 'akram albari',
        email: 'akram@gmail.com',
        password: 'abc123', 
    },
    {
        id: uuidv4(),
        type: 'admin',
        name: 'bintang',
        email: 'bintang@gmail.com',
        password: 'abc123',
    }
]