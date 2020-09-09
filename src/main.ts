import * as core from '@actions/core';
import { loginToHeroku } from './heroku/login_to_heroku';
import { buildDockerImage } from './heroku/build_docker_image';
import { pushDockerContainer } from './heroku/push_docker_container';
import { releaseDockerContainer } from './heroku/release_docker_container';
import assert from 'assert';

const DEFAULT_DOCKERFILE_NAME = 'Dockerfile';

(async () => {
  try {
    const email = core.getInput('email', { required: true });
    const herokuApiKey = core.getInput('heroku_api_key', { required: true });
    const herokuAppName = core.getInput('heroku_app_name', { required: true });
    const dockerFilePath = core.getInput('dockerfile_directory', {
      required: true,
    });
    const dockerfileName =
      core.getInput('dockerfile_name') ?? DEFAULT_DOCKERFILE_NAME;
    const dockerOptions = core.getInput('docker_options');

    assert(email, 'Missing required field: `email`.');
    assert(herokuApiKey, 'Missing required field: `heroku_api_key`.');
    assert(herokuAppName, 'Missing required field: `heroku_app_name`.');
    assert(dockerFilePath, 'Missing required field: `dockerfile_directory`.');

    const logged = await loginToHeroku({ email, herokuApiKey });
    if (!logged) return;

    const built = await buildDockerImage({
      dockerfileName,
      dockerFilePath,
      dockerOptions,
      herokuAppName,
    });
    if (!built) return;

    const pushed = await pushDockerContainer({ herokuApiKey, herokuAppName });
    if (!pushed) return;

    const released = await releaseDockerContainer({
      herokuApiKey,
      herokuAppName,
    });
    if (!released) return;

    console.log('Successfully deployed! 💪 🚀');
  } catch (err) {
    core.setFailed(`Something goes wrong 😧.\nError: ${err.message}`);
  }
})();
