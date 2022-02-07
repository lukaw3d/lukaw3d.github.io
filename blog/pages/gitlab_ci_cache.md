# Gitlab CI - push cache only if changed

You can allow job failure, only push cache on failure, and fail based on yarn's output:

```yaml
prepare-yarn-cache:
  script:
    - yarn install --check-files --frozen-lockfile | tee yarn_log
    - |
      if grep "success Already up-to-date." yarn_log; then
        exit 0    # skip pushing cache
      else
        exit 123  # push cache
      fi
  allow_failure:
    exit_codes: 123
  cache:
    policy: pull-push
    when: on_failure

other-jobs:
  needs: ["prepare-yarn-cache"]
  cache:
    policy: pull
```

Full example: https://gitlab.com/lukaw3d/gitlab-ci-push-cache-only-if-changed

Upstream issues:
- https://gitlab.com/gitlab-org/gitlab/-/issues/226068
- https://gitlab.com/gitlab-org/gitlab-runner/-/issues/3523
