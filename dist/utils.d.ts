/// <reference types="node" />
import ChildProcess from 'child_process';
export declare const exec: typeof ChildProcess.exec.__promisify__;
export declare const getCwd: (path: string) => string;
export declare const assertDirExists: (dirPath: string) => void;
interface RunCommandOptions {
    env?: Record<string, string>;
    options?: Omit<ChildProcess.SpawnOptions, 'env' | 'stdio'>;
}
export declare const runCommand: (command: string, { options, env }?: RunCommandOptions) => Promise<number>;
export {};
