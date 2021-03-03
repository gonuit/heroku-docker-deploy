import * as core from '@actions/core';
import { runCommand } from '../utils';

export const pushDockerContainer = async ({
  herokuApiKey,
  herokuAppName,
  cwd,
  processType,
}: {
  herokuAppName: string;
  herokuApiKey: string;
  processType: string;
  cwd: string;
}): Promise<boolean> => {
  try {
    core.startGroup('Pushing container to heroku registry...');
    await runCommand(`docker push registry.heroku.com/${herokuAppName}/${processType}`, {
      env: { HEROKU_API_KEY: herokuApiKey },
      options: { cwd },
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
