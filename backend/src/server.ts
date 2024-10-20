import express, {Request, Response} from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send({message: 'Hello, World!'});
});

app.post('/', (req: Request, res: Response) => {
    const { name } = req.body;
    res.send({message: `Hello, ${name}!`});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});