import { info, setFailed } from "@actions/core";
import { Octokit } from "@octokit/action";

const octokit = new Octokit();

async function merge(source: string, target: string) {
	const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
	info(`merge branch:${source} to: ${target}`);
	await octokit.repos.merge({
		owner: owner,
		repo: repo,
		base: target,
		head: source,
		commit_message: `Merged '${source}' into '${target}'.`
	});
}

async function run() {
	const source = process.env.GITHUB_HEAD_REF;
	const target = process.env.GITHUB_BASE_REF;
	try {
		await merge(source, target);
		info(`merged ${source} into ${target}`);
	} catch (error) {
		setFailed(`${source} merge failed: ${error.message}`);
	}
}

run();
