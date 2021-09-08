import * as core from '@actions/core';
import { runCommand } from '../utils';

export const releaseDockerContainer = async ({
  herokuApiKey,
  herokuAppName,
  cwd,
  processTypes,
}: {
  herokuAppName: string;
  herokuApiKey: string;
  cwd: string;
  processTypes: Array<string>;
}): Promise<boolean> => {
  try {
    core.startGroup('Releasing container...');
    await runCommand(`heroku container:release ${processTypes.join(' ')} --app ${herokuAppName} --verbose`, {
      env: { HEROKU_API_KEY: herokuApiKey },
      options: { cwd },
    });
    console.log('Container released.');
    core.endGroup();
    return true;
  } catch (err) {
    core.endGroup();
    if (err instanceof Error) {
      core.setFailed(`Releasing docker container failed.\nError: ${err.message}`);
    } else {
      core.setFailed(`Releasing docker container failed.\nError: ${err}`);
    }
    return false;
  }
};
