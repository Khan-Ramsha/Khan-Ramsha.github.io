# Ramsha's Portfolio

## Local setup on Windows

If you are using Windows, it is **highly recommended** to use [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/install), which is a compatibility layer for running Linux on top of Windows. You can follow [these instructions](https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-11-with-gui-support) to install WSL and Ubuntu on your machine. You only need to go up to the step 4 of the tutorial (you don't have to enable the optional `systemd` nor the graphical applications), and then you can follow the instructions below to install docker. You can install docker natively on Windows as well, but it has been having some issues as can be seen in [#1540](https://github.com/alshedivat/al-folio/issues/1540), [#2007](https://github.com/alshedivat/al-folio/issues/2007).

## Local setup using Docker (Recommended)

Using Docker to install Jekyll and Ruby dependencies is the easiest way.

You need to take the following steps to get `al-folio` up and running on your local machine:

- First, install [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/).
- Finally, run the following command that will pull the latest pre-built image from DockerHub and will run your website.

```bash
$ docker compose pull
$ docker compose up
```

Note that when you run it for the first time, it will download a docker image of size 400MB or so. To see the template running, open your browser and go to `http://localhost:8080`. You should see a copy of the theme's demo website.

Now, feel free to customize the theme however you like (don't forget to change the name!). Also, your changes should be automatically rendered in real-time (or maybe after a few seconds).

> Beta: You can also use the slimmed docker image with a size below 100MBs and exact same functionality. Just use `docker compose -f docker-compose-slim.yml up`

### Build your own docker image

> Note: this approach is only necessary if you would like to build an older or very custom version of al-folio.

Build and run a new docker image using:

```bash
$ docker compose up --build
```

> If you want to update jekyll, install new ruby packages, etc., all you have to do is build the image again using `--force-recreate` argument at the end of the previous command! It will download Ruby and Jekyll and install all Ruby packages again from scratch.

If you want to use a specific docker version, you can do so by changing `latest` tag to `your_version` in `docker-compose.yaml`. For example, you might have created your website on `v0.10.0` and you want to stick with that.

### Have Bugs on Docker Image?

Sometimes, there might be some bugs in the current docker image. It might be version mismatch or anything. If you want to debug and easily solve the problem for yourself you can do the following steps:

```
docker compose up -d
docker compose logs
```

Then you can see the bug! You can enter the container via this command:

```
docker compose exec -it jekyll /bin/bash
```

Then you can run the script:

```
./bin/entry_point.sh
```

You might see problems for package dependecy or something which is not available. You can fix it now by using

```
bundle install
./bin/entry_point.sh
```

Most likely, this will solve the problem but it shouldn't really happen. So, please open a bug report for us.

## Local Setup with Development Containers

`al-folio` supports [Development Containers](https://containers.dev/supporting).
For example, when you open the repository with Visual Studio Code (VSCode), it prompts you to install the necessary extension and automatically install everything necessary.

## Local Setup (Legacy, no longer supported)

For a hands-on walkthrough of running al-folio locally without using Docker, check out [this cool blog post](https://george-gca.github.io/blog/2022/running-local-al-folio/) by one of the community members!

Assuming you have [Ruby](https://www.ruby-lang.org/en/downloads/) and [Bundler](https://bundler.io/) installed on your system (_hint: for ease of managing ruby gems, consider using [rbenv](https://github.com/rbenv/rbenv)_), and also [Python](https://www.python.org/) and [pip](https://pypi.org/project/pip/) (_hint: for ease of managing python packages, consider using a virtual environment, like [venv](https://docs.python.org/pt-br/3/library/venv.html) or [conda](https://docs.conda.io/en/latest/)_).

```bash
$ bundle install
# assuming pip is your Python package manager
$ pip install jupyter
$ bundle exec jekyll serve
```

To see the template running, open your browser and go to `http://localhost:4000`. You should see a copy of the theme's [demo website](https://alshedivat.github.io/al-folio/). Now, feel free to customize the theme however you like. After you are done, remember to **commit** your final changes.

## Deployment

Deploying your website to [GitHub Pages](https://pages.github.com/) is the most popular option.
Starting version [v0.3.5](https://github.com/alshedivat/al-folio/releases/tag/v0.3.5), **al-folio** will automatically re-deploy your webpage each time you push new changes to your repository **main branch**! :sparkles:

### For personal and organization webpages

1. The name of your repository **MUST BE** `<your-github-username>.github.io` or `<your-github-orgname>.github.io`.
2. In `_config.yml`, set `url` to `https://<your-github-username>.github.io` and leave `baseurl` empty.
3. Set up automatic deployment of your webpage (see instructions below).
4. Make changes to your main branch, commit, and push!
5. After deployment, the webpage will become available at `<your-github-username>.github.io`.

### For project pages

1. In `_config.yml`, set `url` to `https://<your-github-username>.github.io` and `baseurl` to `/<your-repository-name>/`.
2. Set up automatic deployment of your webpage (see instructions below).
3. Make changes to your main branch, commit, and push!
4. After deployment, the webpage will become available at `<your-github-username>.github.io/<your-repository-name>/`.

### Enabling automatic deployment

1. Click on **Actions** tab and **Enable GitHub Actions**; do not worry about creating any workflows as everything has already been set for you.
2. Go to `Settings -> Actions -> General -> Workflow permissions`, and give `Read and write permissions` to GitHub Actions
3. Make any other changes to your webpage, commit, and push to your main branch. This will automatically trigger the **Deploy** action.
4. Wait for a few minutes and let the action complete. You can see the progress in the **Actions** tab. If completed successfully, in addition to the `main` branch, your repository should now have a newly built `gh-pages` branch. **Do NOT touch this branch!**
5. Finally, in the **Settings** of your repository, in the Pages section, set the branch to `gh-pages` (**NOT** to `main`). For more details, see [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#choosing-a-publishing-source).

If you keep your site on another branch, open `.github/workflows/deploy.yml` **on the branch you keep your website on** and change `on->push->branches` and `on->pull\_request->branches` to the branch you keep your website on. This will trigger the action on pulls/pushes on that branch. The action will then deploy the website on the branch it was triggered from.

### Manual deployment to GitHub Pages

If you need to manually re-deploy your website to GitHub pages, go to Actions, click "Deploy" in the left sidebar, then "Run workflow."

### Deploy on [Netlify](https://www.netlify.com/)

1. [Use this template -> Create a new repository](https://github.com/new?template_name=al-folio&template_owner=alshedivat).
2. Netlify: **Add new site** -> **Import an existing project** -> **GitHub** and give Netlify access to the repository you just created.
3. Netlify: In the deploy settings
   - Set **Branch to deploy** to `main`
   - **Base directory** is empty
   - Set **Build command** to `sed -i "s/^\(baseurl: \).*$/baseurl:/" _config.yml && bundle exec jekyll build`
   - Set **Publish directory** to `_site`

4. Netlify: Add the following two **environment variables**
   - | Key            | Value                                                                                  |
     | -------------- | -------------------------------------------------------------------------------------- |
     | `JEKYLL_ENV`   | `production`                                                                           |
     | `RUBY_VERSION` | set to the Ruby version found in `.github/workflows/deploy.yml` (for example, `3.3.5`) |

5. Netlify: Click **Deploy** and wait for the site to be published. If you want to use your own domain name, follow the steps in [this documentation](https://docs.netlify.com/domains-https/custom-domains/).
