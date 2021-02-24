declare type HerokuCredentials = {
    email: string;
    herokuApiKey: string;
    cwd: string;
};
export declare const loginToHeroku: ({ email, herokuApiKey, cwd }: HerokuCredentials) => Promise<boolean>;
export {};
