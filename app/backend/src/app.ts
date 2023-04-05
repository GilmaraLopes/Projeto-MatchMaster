import * as express from 'express';
import matchesRoutes from './router/matchesRoutes';
import teamsRoutes from './router/teamsRoutes';
import userRoutes from './router/loginRoutes';
import errorMiddleware from './middlewares/error-middleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.Routers();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private Routers(): void {
    this.app.use('/teams', teamsRoutes);
    this.app.use('/matches', matchesRoutes);
    this.app.use('/login', userRoutes);
    this.app.use(errorMiddleware);
    this.app.use('/role', userRoutes);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
