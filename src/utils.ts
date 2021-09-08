import ChildProcess from 'child_process';
import { promisify } from 'util';
import p from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
import assert from 'assert';

export const exec = promisify(ChildProcess.exec);

export const getCwdFromPath = (path: string): string => {
  assert(path, 'Path cannot be null or undefined.');

  const cwd = process.cwd();
  return p.join(cwd, path);
};

export const assertDirExists = (dirPath: string): void => {
  const directoryExists = fs.existsSync(dirPath);
  assert(directoryExists, `Directory: "${dirPath}" does not exist.`);
};

export const assertFileExists = (path: string): void => {
  const directoryExists = fs.existsSync(path);
  assert(directoryExists, `File: "${path}" does not exist.`);
};

interface RunCommandOptions {
  env?: Record<string, string>;
  options?: Omit<ChildProcess.SpawnOptions, 'env' | 'stdio'>;
}

export const runCommand = async (command: string, { options, env }: RunCommandOptions = {}): Promise<number> => {
  console.log(`$ ${command}`);
  const parts = command.split(' ').filter((part) => Boolean(part));
  if (parts.length === 0) throw new Error('Wrong command provided');

  return new Promise<number>((resolve, reject) => {
    const args = parts.slice(1, parts.length);

    const processEnv = Object.create(process.env);
    const commandEnv = Object.assign(processEnv, env);

    const command = spawn(parts[0], args, {
      ...options,
      env: commandEnv,
      stdio: 'inherit',
    });

    const onExit = (code: number) => {
      if (code === 0) resolve(code);
      else reject(code);
    };

    command.on('exit', onExit);
    command.on('close', onExit);
    command.on('error', reject);
  });
};
