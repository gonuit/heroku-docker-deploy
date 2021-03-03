export declare const buildDockerImage: ({ dockerfileName, dockerOptions, herokuAppName, cwd, processType, }: {
    dockerfileName: string;
    dockerOptions: string;
    herokuAppName: string;
    cwd: string;
    processType: string;
}) => Promise<boolean>;
