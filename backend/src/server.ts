import express, {Request, Response} from 'express';

const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.post('/', (req: Request, res: Response) => {
    const { name } = req.body;
    res.send(`Hello, ${name}!`);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});