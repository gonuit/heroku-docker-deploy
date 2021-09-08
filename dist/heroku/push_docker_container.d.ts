export declare const pushDockerContainer: ({ herokuApiKey, herokuAppName, cwd, processTypes, }: {
    herokuAppName: string;
    herokuApiKey: string;
    processTypes: string[];
    cwd: string;
}) => Promise<boolean>;
