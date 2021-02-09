import * as core from '@actions/core';
import { cd, runCommand } from '../utils';

export const buildDockerImage = async ({
  dockerfileName,
  dockerFilePath,
  dockerOptions,
  herokuAppName,
}: {
  dockerfileName: string;
  dockerFilePath: string;
  dockerOptions?: string | undefined;
  herokuAppName: string;
}): Promise<boolean> => {
  try {
    core.startGroup('Building docker container...');
    await cd(dockerFilePath);

    const options = dockerOptions ?? '';

    await runCommand(
      `docker build --file ${dockerfileName} ${options} --tag registry.heroku.com/${herokuAppName}/web .`,
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
