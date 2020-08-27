import * as core from '@actions/core';
import { runCommand } from '../utils';

export const pushDockerContainer = async ({
  herokuApiKey,
  herokuAppName,
}: {
  herokuAppName: string;
  herokuApiKey: string;
}): Promise<boolean> => {
  try {
    core.startGroup('Pushing container to heroku registry...');
    await runCommand(`heroku container:push web --app ${herokuAppName}`, {
      HEROKU_API_KEY: herokuApiKey,
    });
    console.log('Container pushed.');
    core.endGroup();
    return true;
  } catch (err) {
    core.endGroup();
    core.setFailed(`Pushing docker container failed.\nError ${err.message}`);
    return false;
  }
};
