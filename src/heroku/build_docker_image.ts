import * as core from '@actions/core';
import { runCommand } from '../utils';

export const buildDockerImage = async ({
  dockerfileName,
  dockerOptions,
  herokuAppName,
  cwd,
  processTypes,
}: {
  dockerfileName: string;
  dockerOptions: string;
  herokuAppName: string;
  cwd: string;
  processTypes: string[];
}): Promise<boolean> => {
  try {
    core.startGroup('Building docker container...');

    const tags = processTypes.map(processType => `--tag registry.heroku.com/${herokuAppName}/${processType}`);

    await runCommand(
      `docker build --file ${dockerfileName} ${dockerOptions} ${tags.join(' ')} .`,
      { options: { cwd } },
    );
    console.log('Docker container built.');
    core.endGroup();
    return true;
  } catch (err) {
    core.endGroup();
    if (err instanceof Error) {
      core.setFailed(`Building container failed.\nError: ${err.message}`);
    } else {
      core.setFailed(`Building container failed.\nError: ${err}`);
    }
    return false;
  }
};
