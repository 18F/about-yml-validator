# `.about.yml` schema and tools

The `.about.yml` mechanism allows a project to publish and maintain metadata
that can be easily maintained by project owners, that is visible and
accessible to interested parties, and that can be harvested and processed by
tools and automated systems. It is implemented using the
[YAML](https://en.wikipedia.org/wiki/YAML) format.

The [18F Team API](https://team-api.18f.gov/public/api/) is the original,
primary consumer of this information, which in turn provides data for:

- [18F Hub](https://github.com/18F/hub)
- [18F Dashboard](https://github.com/18F/dashboard)
- [18F.gsa.gov](https://github.com/18F/18f.gsa.gov)

We hope that every active 18F project, [working
group](https://pages.18f.gov/grouplet-playbook/working-groups/), and
[guild](https://pages.18f.gov/grouplet-playbook/guilds/) will publish
`.about.yml` files in their respective repositories. By feeding this
information through the Team API server and into our Hub, Dashboard, and main
web site, cultivation of `.about.yml` files will help make our activity more
easily transparent to our teammates, and to anyone outside our team who wishes
to discover what we're working on (and how we work).

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0
>dedication. By submitting a pull request, you are agreeing to comply
>with this waiver of copyright interest.
