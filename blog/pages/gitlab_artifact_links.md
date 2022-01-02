# Gitlab has magic links to job artifacts (including HTML)

`https://gitlab.com/<username>/<project>/-/jobs/artifacts/<branch>/file/<path>?job=<job_name>`

https://docs.gitlab.com/ee/ci/pipelines/job_artifacts.html#access-the-latest-job-artifacts-by-url

e.g. this `build_storybook` job https://gitlab.com/gitlab-org/gitlab-ui/-/jobs/1927405894
created artifact https://gitlab.com/gitlab-org/gitlab-ui/-/jobs/1927405894/artifacts/browse/ with HTML file inside.

To link to latest such artifact from README:
- folder https://gitlab.com/gitlab-org/gitlab-ui/-/jobs/artifacts/main/browse/public?job=build_storybook
- HTML file https://gitlab.com/gitlab-org/gitlab-ui/-/jobs/artifacts/main/file/public/index.html?job=build_storybook

Loading time is awful tho.
