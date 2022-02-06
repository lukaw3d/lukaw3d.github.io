# Script to check if your npm dependencies are still maintained

_or: Check published time of dependency@latest for each of your dependencies_

```bash
cat package.json \
| jq '.dependencies, .devDependencies | keys | .[] | "npm info --json "+.   ' -r \
| sh \
| jq '.time[.version] + " - latest " + .name + "@" + .version'
```
