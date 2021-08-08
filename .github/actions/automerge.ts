import { getInput, info, setFailed } from "@actions/core";
import { context } from "@actions/github";
import { Octokit } from "@octokit/rest";

const token = getInput("github_token");
const octokit = new Octokit({ auth: token });
const repo = context.repo;

async function merge(source: string, target: string) {
	info(`merge branch:${source} to: ${target}`);
	await octokit.repos.merge({
		owner: repo.owner,
		repo: repo.repo,
		base: target,
		head: source,
		commit_message: `Merged '${source}' into '${target}'.`
	});
}

async function run() {
	const source = getInput("source");
	const target = getInput("target");
	info(`merge ${source} into ${target}`);

	try {
		await merge(source, target);
	} catch (error) {
		setFailed(`${source} merge failed: ${error.message}`);
	}
}

run();
