import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import GithubRoute from './routes/github.route';
import validateEnv from './utils/validateEnv';
import CampaignsRoute from './routes/campaigns.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new GithubRoute(), new CampaignsRoute()]);

app.listen();
