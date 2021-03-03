export declare const releaseDockerContainer: ({ herokuApiKey, herokuAppName, cwd, processType, }: {
    herokuAppName: string;
    herokuApiKey: string;
    cwd: string;
    processType: string;
}) => Promise<boolean>;
