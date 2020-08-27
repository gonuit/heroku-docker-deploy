import ChildProcess from 'child_process';
import { promisify } from 'util';
import { spawn } from 'child_process';

export const exec = promisify(ChildProcess.exec);

export const cd = async (dockerFilePath: string): Promise<void> => {
  await exec(`cd ${dockerFilePath}`);
};

export const runCommand = async (
  command: string,
  env: Record<string, string> = {},
): Promise<number> => {
  const parts = command.split(' ').filter((part) => Boolean(part));
  if (parts.length === 0) throw new Error('Wrong command provided');

  return new Promise<number>((resolve, reject) => {
    const args = parts.slice(1, parts.length);

    const processEnv = Object.create(process.env);
    const commandEnv = Object.assign(processEnv, env);

    const command = spawn(parts[0], args, {
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
