export declare const pushDockerContainer: ({ herokuApiKey, herokuAppName, cwd, processType, }: {
    herokuAppName: string;
    herokuApiKey: string;
    processType: string;
    cwd: string;
}) => Promise<boolean>;
