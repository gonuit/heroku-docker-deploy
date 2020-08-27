import * as core from '@actions/core';
import { cd, runCommand } from '../utils';

export const buildDockerImage = async ({
  dockerFilePath,
  herokuAppName,
}: {
  dockerFilePath: string;
  herokuAppName: string;
}): Promise<boolean> => {
  try {
    core.startGroup('Building docker container...');
    await cd(dockerFilePath);

    await runCommand(
      `docker build . --file Dockerfile --tag registry.heroku.com/${herokuAppName}/web`,
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
