import { ModelCredentials } from './credentials.model';

export class ModelIdentification {
    credentials?: ModelCredentials;
    token?: string;
    session: boolean = false;
}