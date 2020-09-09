export declare const buildDockerImage: ({ dockerfileName, dockerFilePath, dockerOptions, herokuAppName, }: {
    dockerfileName: string;
    dockerFilePath: string;
    dockerOptions?: string | undefined;
    herokuAppName: string;
}) => Promise<boolean>;
