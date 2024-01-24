---
sidebar: false
navbar: false
---

# Luka Jeran

Software Development and Consulting

[GitHub](https://github.com/lukaw3d) &nbsp;
[GitLab](https://gitlab.com/lukaw3d) &nbsp;
[LinkedIn](https://www.linkedin.com/in/luka-jeran-0a609022a/) &nbsp;

<hr>

[random notes / blog](./random)


### Repos with github pages:

<script setup>
import { data as reposWithPages } from './repos.data.js'
</script>

<ul>
  <li v-for="r of reposWithPages">
    <a :href="r.html_url" :key="r.id">{{ r.name }}</a>
  </li>
</ul>
