# Script to recover deleted git branches with reflog

Simple script that creates branches for each reflog entry, and a cleanup script to remove branches named "reflog/*":

mygitreflog
```sh
#!/bin/sh
how_far_back=${1:-100}  # Use 100 reflog lines by default
git reflog --format="%H" | head -n "${how_far_back}" | awk '{printf "git branch reflog/%02d %s\n",NR,$1;}' | sh


# Optional:
# Prune branches that are already contained in other branches:
reflogs=$(git for-each-ref --format="%(refname:short)" refs/heads/reflog/)
for b in $reflogs; do
  if [ `git branch --contains $b | wc -l` -ge "2" ]; then
    echo "prune $b"
    git branch -D $b
  fi
done
```

mygitreflogdelete
```sh
#!/bin/sh
git for-each-ref --format="%(refname:short)" refs/heads/reflog/ | awk '{print "git branch -D",$1;}' | sh
```
