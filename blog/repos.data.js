export default {
  async load() {
    let allRepos = []
    for (let page = 1; page < 100; page++) {
      const repos = await (await fetch(`https://api.github.com/users/lukaw3d/repos?per_page=100&page=${page}`)).json()
      allRepos.push(...repos)
      if (repos.length < 100) break
    }
    const reposWithPages = allRepos.filter(r => r.has_pages)
    return reposWithPages
  }
}
