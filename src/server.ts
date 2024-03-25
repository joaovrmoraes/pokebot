import { client } from "./app";
import { env } from './env/index'

const { TOKEN } = env

client.login(TOKEN);
