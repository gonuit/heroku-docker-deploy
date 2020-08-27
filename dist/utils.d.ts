/// <reference types="node" />
import ChildProcess from 'child_process';
export declare const exec: typeof ChildProcess.exec.__promisify__;
export declare const cd: (dockerFilePath: string) => Promise<void>;
export declare const runCommand: (command: string, env?: Record<string, string>) => Promise<number>;
