import * as core from '@actions/core';
import { runCommand } from '../utils';

export const buildDockerImage = async ({
  dockerfileName,
  dockerOptions,
  herokuAppName,
  cwd,
}: {
  dockerfileName: string;
  dockerOptions?: string | undefined;
  herokuAppName: string;
  cwd: string;
}): Promise<boolean> => {
  try {
    core.startGroup(`Building docker container...`);

    const options = dockerOptions ?? '';

    await runCommand(
      `docker build . --file ${dockerfileName} ${options} --tag registry.heroku.com/${herokuAppName}/web`,
      { options: { cwd } },
    );
    console.log('Docker container built.');
    core.endGroup();
    return true;
  } catch (err) {
    core.endGroup();
    core.setFailed(`Building container failed.\nError: ${err.message}`);
    return false;
  }
};
