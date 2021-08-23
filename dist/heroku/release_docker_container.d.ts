export declare const releaseDockerContainer: ({ herokuApiKey, herokuAppName, cwd, processTypes, }: {
    herokuAppName: string;
    herokuApiKey: string;
    cwd: string;
    processTypes: string[];
}) => Promise<boolean>;
