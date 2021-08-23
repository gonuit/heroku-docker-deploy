export declare const buildDockerImage: ({ dockerfileName, dockerOptions, herokuAppName, cwd, processTypes, }: {
    dockerfileName: string;
    dockerOptions: string;
    herokuAppName: string;
    cwd: string;
    processTypes: string[];
}) => Promise<boolean>;
