import * as core from '@actions/core';
import { runCommand } from '../utils';

export const releaseDockerContainer = async ({
  herokuApiKey,
  herokuAppName,
}: {
  herokuAppName: string;
  herokuApiKey: string;
}): Promise<boolean> => {
  try {
    core.startGroup('Releasing container...');
    await runCommand(`heroku container:release web --app ${herokuAppName}`, {
      HEROKU_API_KEY: herokuApiKey,
    });
    console.log('Container released.');
    core.endGroup();
    return true;
  } catch (err) {
    core.endGroup();
    core.setFailed(`Releasing docker container failed.\nError: ${err.message}`);
    return false;
  }
};
