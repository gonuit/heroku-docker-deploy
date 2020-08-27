declare type HerokuCredentials = {
    email: string;
    herokuApiKey: string;
};
export declare const loginToHeroku: ({ email, herokuApiKey, }: HerokuCredentials) => Promise<boolean>;
export {};
