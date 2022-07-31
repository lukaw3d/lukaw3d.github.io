# Script to check installed sizes of npm dependencies

```bash
deps=`cat package.json | jq '.dependencies, .devDependencies | keys | .[]' -r`
for i in $deps; do
  sizes=`yarn why $i --json --no-progress | grep "Disk size with unique dependencies" | jq '.data' -r`
  echo "$i "$sizes""
done
```
