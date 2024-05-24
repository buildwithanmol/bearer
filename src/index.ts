import express from 'express'
import { User } from './user';
import { user_middleware } from './middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const user = new User();

app.get('/', (req, res) => {
    res.send('Welcome to my server')
})

app.post('/api/auth/signup', (req, res) => {
    const { name, email, password } = req.body;
    const data = user.addUser({ name, email, password });

    if (!data.success) {
        return res.status(400).json(data.message)
    };

    return res.status(200).json(data.message)
})

app.post('/api/auth/signin', (req, res) => {
    const { email, password } = req.body;
    const data = user.login(email, password);

    if (!data.success) {
        return res.status(400).json(data.message)
    };

    const token = data.data;

    return res.json({ success: true, message: 'Login Successful', jwt: token });

})

app.get('/api/user', user_middleware, (req, res) => {
    const user_id = req.get('user_id');

    const data = user.getUser(user_id);

    if (!data.success) {
        return res.status(400).json(data.message)
    };

    return res.status(200).json(data.data)
})


app.listen(3000, () => {
    console.log((new Date()) + 'server is listening @port 3000')
})