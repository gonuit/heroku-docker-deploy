export declare const buildDockerImage: ({ dockerfileName, dockerOptions, herokuAppName, cwd, }: {
    dockerfileName: string;
    dockerOptions?: string | undefined;
    herokuAppName: string;
    cwd: string;
}) => Promise<boolean>;
