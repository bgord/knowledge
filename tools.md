**Get MIME types of all the apps, useful when changing defaults**

`$ cat ~/.config/mimeapps.list`

---

**Set a default browser**

`$ xdg-settings set default-web-browser firefox-developer-edition.desktop`

---

**Search through terminal history through `fzf`**

`history | fzf`

- `--tac` to search in reversed order

---

**Fix problems with screen after detach an external monitor**

`xrandr`

---

**Generate ctags for a project**

`$ ctags -R .`

---

**Prettier ignore**

```
// prettier-ignore
const a = { a: 2, b:3};

<!-- prettier-ignore-start -->
<!-- prettier-ignore-end -->
```

---

**Prettify all files that Git takes into account**

`$ git ls-files | grep '\.jsx\|\.json\|\.js\?$' | xargs prettier --write --config .prettierrc`

---

**To disable eslint**

```
/* eslint-disable */`  - all rules
/* eslint-disable no-console */ - only specific roles
```

---

**Linux count lines of code tracked by git**

`$ git ls-files | xargs cat | wc -l`

---

**sxiv**

- an image viewer
- `+` / `-` to zoom in/out
- `hjkl` to navigate
- `|` `_` to flip vertically and horizontally

**Kill the process running on the port 3000**

`fuser -k 3000/tcp`

On MAC:

```
Run:

lsof -i :3000 (where 3000 is your current port in use)

then check status of the reported PID :

ps ax | grep <PID>

finally, "begone with it":

kill -QUIT <PID>
```

---

**TTY**

- means terminal

**Show all connected devices**

`lsblk`

---

**Rip a mp3 from the cd**

`asunder`

---

**tail**

Prints the last 10 lines of each file, to standard output.
It can precede the output with an filename, when displaying many of them.
`-f` to follow a file, acts like a live preview
`-n` to specify number of lines being printed

`tail -f -n 15 linux.md other.md`

---

**Sketch file in Linux**

Upload a `*.sketch` file to Figma, or Avocode.

---

**Create a mapping for a combination with Alt key**

`M-s` for Alt-S

---

**Unzip a file into directory**

`$ unzip design.zip -d design`

---

**408 HTTP status**

It means that request has timed out.

---

**Tee**

It reads the standard input, and both writes it to the file, and displays on the standard output.

`ls -alh | tee debug.file`

---

**What does /usr /dev mean?**

`/usr` means "universal system resources"
`/dev` means "devices"

---

**Hide grep ouput**

Useful when trying to find things (and then asserting it).

`$ cat filename.txt | grep -q 'dot'`

---

**How to count words in the file?**

`$ wc -w file.txt` // get a number of words
`$ wc -l file.txt` // get a number of lines

---

**What does \$@ mean?**

It is a variable containing all the command variables except of the first one.

---

**How to move a directory/file in Ranger?**

`dd` on the directory/file you want to move, then navigate to the path you want to paste, and `pp`.

---

**How to structure a Makefile for containerized react app?**

Basic structure:

```
mfs:
  ./npm.sh run frontend:start
```

When a script is dependent on the another:

```
populate:
  ./npm.sh run api:populate

start: populate
  ./npm.sh run api:start
```

---

**What's a purpose of `.PHONY` in Makefiles?**

`PHONY` means `pozer/fałszywy/oszust` in polish.
Typically a target of the make command is a file, `.PHONY` is to register a command as a something not related to the file, but just a command.

---

**How to extract the tar file?**

eXtract Ve File

`tar xvf filenamme.tar`
`tar xvf filenamme.tar --directory /output`

---

**Head**

By default it prints the first 10 lines of the file.

`head .gitignore -n 5`

`-n` is being used to print n first lines.

---

**Why open VPN won't start?**

After you update a kernel, open vpn needs a restart to run properly.

---

**What is a workspace in Manjaro?**

It's a separate Desktop environment, it shares the same menu bar.

To go to the next workspace: `Ctrl + Fn + Right Arrow`.
To go to the previous workspace: `Ctrl + Fn + Left Arrow`.
To go to the n-th workspace: `Ctrl + Fn + F<n>`

---

**How to search for whole word with `ag`?**

`ag -w COMPLETE`

---

**How to send a file through netcat?**

The netcat (`nc`) is like `cat`, but through net.

If I want to send something to the person in the same network, I need to know his IP address. Run `ip` on their machine, go to `2.` and grab `IP` from `inet` line.

The person should have `nc -l -p |port| > |filename|` running.
To send the file I run: `cat |filename| | nc |ip| |port|`.

---

**How to prettify a JSON file in the terminal?**

`$ cat db.json | jq .`

---

**How to pass header to httpie request?**

`$ http GET localhost/api/files x-api-key:xxx`

---

**How to upload a file with `httpie`?**

`$ http -f POST localhost/api/file payment@payment.csv uploadedBy=me`

---

**Are headers encrypted over SSL?**

Yes.

---

**chroot**

Run a program with changed root directory.

---

**How to fix a magnifier mode in Manjaro?**

`Alt + Scroll Down`

---

**How to configure husky**

```
	"husky": {
		"hooks": {
			"pre-commit": "npm run frontend:lint && npm run frontend:stylelint",
			"pre-push": "npm run frontend:test"
		}
	}
```

---

**How to setup Travis CI in a React repository?**

Filename: `.travis.yml`

```
language: node_js
node_js:
  - "8"
script:
  - echo 'Build starts!'
  - echo 'Testing...'
  - npm run test
  - echo 'Linting...'
  - npm run lint
  - echo 'Building...'
  - npm run build
cache:
  directories:
    - node_modules
```

After given GitHub repository is integrated, Travis will automatically look for `.travis.yml` file to look up the config.

---

**How to add a Travis status badge?**

```
[![Build Status](https://travis-ci.org/bgord/bgord-tools.svg?branch=master)](https://travis-ci.org/bgord/bgord-tools)
```

It checks the latest push build on the default branch.

Click on the "build unknown" badge in Travis.

---

**How to remap Caps Lock to Escape?**

`setxkbmap -option caps:escape`

---

**How to run a shell script/command on startup?**

```
$ crontab -e

# Edit an opened file
@reboot  /home/user/test.sh
```

---

**How to send an array in httpie?**

`$ http POST localhost:8080/preprocess ids='["x", "y"]'`

---

**How to stop a service in Linux?**

`$ sudo systemctl stop nginx`

---

**Webpack doesn't recompile watched files**

Add the following lines to your configuration:

```
watchOptions: {
  poll: true,
  ignored: /node_modules/
}
```

---

**How to reprovision a machine?**

```
vagrant up
cp ./provisioning/.../vars-local/secrets.yml /tmp/secrets.yml
<provisioning command>
```

---

**How to open a Firefox dev-console with a shortcut?**

`Ctrl-k`

---

**How to format HTML in a string?**

```js
const someText = /* HTML */ ` <h1>SomeHTML</h1> `;
```

---

**How to move a running process to background and to foreground?**

To move a process to background: `C-z`.
To move a process to foreground: `$ fg`.

---

**How to change date/time in Manjaro?**

Go to Settings Manager -> Manjaro Settings Manager -> Time and Date.

---

**How to diff two files?**

`diff file1 file1`

---

**Strange Fn key behaviour**

It's caused because of locked Fn key (Esc + Fn).
To unlock it, press the same combination.

---

**Outdated Vagrant plugins**

Error message:

```
Vagrant failed to initialize at a very early stage. The plugins failed to initialize correctly.
```

Solution:

```bash
$ vagrant plugin update
```

---

**Android Studio plugin installation**

File -> Settings -> Plugins

---

**Using find to find a file path**

```bash
$ find / -name 'filename.txt'
```

---

**Disk usage on Linux**

```bash
$ df
```

---

**Freeze/Unfreeze VIM**

```
Freeze: Ctrl-S
Unfreeze: Ctrl-Q
```

---

**Share a file or serve a directory in local network**

```bash
$ yarn global add http-server
$ cd ./dir
$ hs -p 8888 # or http-server
```

---

**Zip files/directories**

```
$ ls
my_app/ README.md

$ zip -r pack my_app README.md
```

Outputs the bundle to the pack.zip file which contains the README.md file and recursively traversed my_app directory.

---

**Create all directories if needed**

```bash
$ mkdir -p $HOME/some/non/existant/path
```

---

**ESLint extend config in package.json**

```json
{
  "eslintConfig": {
    "extends": "bgord"
  }
}
```

---

**Make text content editable in browser**

```js
document.designMode = "on";
```

---

**Npm install in an Adonis project without installing Chromium**

```
$ PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm install
```

---

**ESLint ignore node_modules**

Create `.eslintignore` file.

```
node_modules/
```

---

**Cannot run Docker command in Husky hook**

Error message: "the input device is not a tty".

The problem is that by default `docker-compose exec` allocates a TTY, to avoid that, add a `-T` option.

---

**Use PurgeCSS with TailwindCSS**

Install required packages:

```bash
$ npm i @fullhuman/postcss-purgecss autoprefixer postcss-cli tailwindcss
```

Add `postcss.config.js` file:

```js
module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    process.env.NODE_ENV === "production" &&
      require("@fullhuman/postcss-purgecss")({
        content: ["./frontend/src/**/.tsx", "./frontend/index.html"],
        defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      }),
  ],
};
```

---

**Take a screenshot of a part of a screen**

```bash
$ scrot -s image.png
```

---

**Define basic auth credentials in httpie**

```bash
$ http GET localhost:3000 -a admin:1234
```

---

**Download an app from f-droid**

Go to the f-droid page, download an apk, and use the installed app to download apps.

---

**SSH to a Vagrant machine without vagrant ssh**

```bash
$ ssh -i .vagrant/machines/<machine_name>/virtualbox/private_key -p <forwarded_port_guest> <user>@<machine_private_network_ip>
```

---

**`scp` copy local file to a remote**

```bash
$ scp filename.txt user@<remote_host_ip>:/remote/dir/to/copy/to
```

---

**`npx` mechanics**

It either: checks `node_modules/.bin`, global cache, or installs all packages required to run an action.

e.g: `npx eslint .`

---

**Noticeable discoloration or ghosting of previous image**

It's called screen burn-in, some tips: [1](https://www.lifewire.com/fix-screen-burn-in-4178041).

---

**Get a size of a directory**

```sh
$ du -sh some_dir
```

---

**Ls only for directories**

```
$ ls -d */
```

---

**Login to a VPS via ssh for the first time**

```bash
$ ssh root@137.74.192.86
```

Then, you'll be prompted to enter a password

---

**Check your machine's public IP**

```bash
$ curl ifconfig.me
```

---

**Check if a user has access to sudo**

```
$ sudo -l -U user_name
```

---

**What's /home/bartosz/.ssh/authorized_keys file for**

It's a file stored on a server, which contains a list of public keys that are allow to ssh to as this user (in this case bartosz) to the given machine.

There should be one public key per line.

---

**How to give somone access to a server**

First, decide which user you want this person to login as. Then, go to `/home/<user>/.ssh` directory and add the person's public key to `authorized_keys` file.

---

**Empty clipboard after copying from KeePassX**

It may be the case that you closed KeePassX before pasting the password.

---

**apt-get in Ubuntu**

```bash
$ apt-get update    # update the list of packages
$ apt-get upgrade   # upgrade the packages themselves
```

---

**Change user's password**

```bash
$ passwd bartosz
```

---

**Change ssh default port for an Ubuntu machine**

```bash
$ vim /etc/ssh/sshd_config

# Find a "#Port 22" line (22 is the default port)
# Uncomment it - remove the "#"
# Change it to, say, "Port 25"

$ /etc/init.d/ssh restart # to apply changes
```

---

**Specify a port while connecting via ssh**

```bash
$ ssh user@machine -p 25
```

---

**List all users on a machine**

```bash
$ cat /etc/passwd
```

---

**Add a new user**

```bash
$ useradd usern_ame
```

---

**Recursively set a user as an owner of directory(ies)**

```bash
$ chown deploy:deploy /home/deploy -R
```

---

**Setup a new user on an Ubuntu machine**

```
$ useradd deploy
$ mkdir /home/deploy
$ mkdir /home/deploy/.ssh
$ chmod 700 /home/deploy/.ssh                   # rwx access for an owner
$ touch /home/deploy/.ssh/authorized_keys
$ chmod 400 /home/deploy/.ssh/authorized_keys   # r access for an owner
$ chown deploy:deploy /home/deploy -R           # make deploy the owner
```

---

**Login to a server by an identity file via ssh**

> ~/.ssh/id_rsa must be a private file corresponding to a public key defined in authorized_keys on a machine you trying to log into

```
$ ssh -i ~/.ssh/id_rsa  user@machine
```

---

**Define an ssh config for a connection**

```
$ vim ~/.ssh/config
# Add a new entry:

Host some-machine-name
  User some-user
  Port 25
  IdentityFile ~/.ssh/id_rsa
```

> If you experience an error regarding unknown host "some-machine-name", you can add the "<ip> some-machine-name" pair to the /etc/hosts file.

---

**Make a user one of the sudoers**

```
$ export EDITOR=vim;
$ visudo

# Add a new entry:
deploy  ALL=(ALL) ALL
```

---

**Disable root user via ssh**

```
$ vim /etc/ssh/sshd_config

# Find a line: "PermitRootLogin yes"
# And change it to: "PermitRootLogin no"

```

---

**SSH config file location**

```
/etc/ssh/sshd_config
```

---

**Setup ufw**

```bash
$ ufw status # likely to be "inactive"
$ ufw allow 80
$ ufw enable # restart the config
```

---

**Seting up a new VPS guides**

[0](https://docs.ovh.com/pl/vps/porady-zabezpieczenie-vps/)
[1](https://plusbryan.com/my-first-5-minutes-on-a-server-or-essential-security-for-linux-servers)

---

**Make Webpack simultaneously watch and build files**

Add `watch: true` in the Webpack config, then run it as `webpack --mode development`.
It doesn't start the server though.

---

**Access development/production mode in Webpack config**

Return a function accepting env and argv parameters instead of an object.

```js
module.exports = (env, argv) => {
  console.log(argv.mode); // development/production
};
```

---

**Create a odt/ods file from an unzipped folder**

[1](https://gist.github.com/mems/5475170)

---

**Setup a custom domain for a Netlify project**

[0](https://www.youtube.com/watch?v=Q9giWrfIJKk)

---

**Create a Gatsby blog and deploy it with Netlify**

[0](https://www.youtube.com/watch?v=729oQL9uQVo)

---

**MacOS Spotlight shortcut**

```
CMD + space
```

---

**Generate ssh key**

```
$ cd ~/.ssh
$ ssh-keygen -f id_rsa_<name>
```

---

**Cypress create a custom assertion**

[0](https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/extending-cypress__chai-assertions)
[1](https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/extending-cypress__chai-assertions/cypress/support/index.js)

---

**Find and replace placeholder text in files with sed**

`sed -i 's/{{{name}}}/name/g' file1.txt file2.txt`

---

**Husky doesn't get called**

`npm uninstall husky && npm i -D husky`

---

**Create a .tar.gz**

`tar czvf public-output.tar.gz public/`

---

**Extract a .tar.bz2**

`tar xjf file.tar.bz2`

---

**Nodemon polling**

`nodemon -L --delay 300ms server.js`

(WARNING: it may cause some performance issues)

---

**ESLint doesn't work for jsx/tsx files**

```
"lint": "eslint . --ext .js,.tsx,.ts --ignore-pattern node_modules/",
```

---

**Ledger stats**

```bash
$ ledreg --period 'last dec' --sort amount --subtotal # how much I spent last december
$ ledreg --period 'last dec' --sort amount --subtotal Presents # how much I spent on presents last december
```

---

**Write files to a USB drive**

https://askubuntu.com/a/37775

---

**Setup HCAPTCHA**

Go to the https://www.hcaptcha.com/ page and find two keys:

- HCAPTCHA_SECRET_KEY: a secret key used to verify the hcaptcha response on the server
- HCAPTCHA_SITE_KEY: a public key used to fetch hcaptcha challanges on the frontend

Install the `hcaptcha` package and create a backend middleware like this:

```js
const validata_hcaptcha_response = async (req, res, next) => {
  const { HCAPTCHA_SECRET_KEY } = process.env;

  const hcaptcha_response_token = req.body.token;

  try {
    if (!hcaptcha_response_token) {
      throw new Error();
    }

    const hcaptcha_result = await hcaptcha.verify(
      HCAPTCHA_SECRET_KEY,
      hcaptcha_response_token
    );

    if (hcaptcha_result.success) {
      return next();
    } else {
      throw new Error();
    }
  } catch (error) {
    res.json({
      status: 0,
      message: res.__("you_must_solve_a_captcha"),
    });
  }
};
```

On the frontend use a React/Vue/vanilla package.

---

**POST request in curl**

```bash
$ curl -d "param1=value1&param2=value2" -X POST http://localhost:3000/data
```

---

**Webpack access current npm package app version**

```
// in webpack.config.js

process.env.npm_package_version

```

---

**Create a mock sftp server**

```
docker run -v /tmp/upload:/home/ftp/upload -p 2222:22 -d atmoz/sftp ftp:pass:1000
```

After that, get the IP address of the container:

```
docker container ls
docker inspect <container-id> # look for NetworkSettings.IPAddress
```

Then, sftp to the server in the container, cd to the upload
directory and you're good to go. (Notice the way we avoid writing to
~/.ssh/known_hosts, which is a problem after you destroy and
recreate the container.)

```
$ sftp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -o LogLevel=quiet ftp@172.17.0.2
password: pass

$ cd upload
```

`/tmp/upload` on your local machine is synced with `/home/ftp/upload` in the container.

---

**`scp` copy a file from remote to the local machine**

```bash
scp <user>@<remote_host_ip>:/remote/dir local_dir
```

---

**Simulate offline scenario in Firefox**

(Alt) File -> Work offline

---

**Remove a symlink**

```bash
$ rm x
```

---

**Export gpg key**

```
$ gpg --export adres@email.pl >/tmp/klucz
$ gpg --armour --output /tmp/klucz2 --export adres@email.pl
```

[0](https://pl.wikibooks.org/wiki/GnuPG/Eksport_klucza_publicznego)

---

**Add white background to PNG instead of transparency**

```bash
$ convert -flatten img1.png img1-white.png
```

---

**Multiple webpack output files**

Return an array instead of an object.

```js
var path = require("path");
var webpack = require("../../");

module.exports = [
  {
    name: "mobile",
    // mode: "development || "production",
    entry: "./example",
    output: {
      path: path.join(__dirname, "dist"),
      filename: "mobile.js",
    },
    plugins: [
      new webpack.DefinePlugin({
        ENV: JSON.stringify("mobile"),
      }),
    ],
  },

  {
    name: "desktop",
    // mode: "development || "production",
    entry: "./example",
    output: {
      path: path.join(__dirname, "dist"),
      filename: "desktop.js",
    },
    plugins: [
      new webpack.DefinePlugin({
        ENV: JSON.stringify("desktop"),
      }),
    ],
  },
];
```

[0](https://github.com/webpack/webpack/blob/master/examples/multi-compiler/webpack.config.js)

---

**Webpack copy files to a build directory**

```js
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: ["./resources/assets/scripts/dashboard.js"],
  output: {
    path: path.join(__dirname, "public"),
    filename: "app.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env"] },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "resources/assets/scripts/*.js",
          to: path.join(__dirname, "public"),
          globOptions: {
            ignore: ["./resources/assets/scripts/dashboard.js"],
          },
          flatten: true,
        },
      ],
    }),
  ],
};
```

---

**Lilypond example**

```
\version "2.20.0"
\time 4/4

<<
  {
    g'8 g'4 e'8 r8 e'8 e'4 c'8 r8 c'8 a8 d'8 r8 g'8 g'8
  }

  \lyrics {
    Krynica, _ _ _ _ Krynica, _ _ _ _ Krynica, _ _ _ _ ajaj!
  }
>>
```

```
$ lilypond <texfile>
```

---

**Both ESM and CommonJS in webpack**

```js
// index.js
import nav from "./nav.js"; // works!
import { footer } from "./footer.js"; // works!
const { footer } = require("./footer.js"); // works too, but not recommended!
```

```js
// nav.js
export default "nav";
```

```js
// footer.js
const footer = "footer";

module.exports = { footer };
```

---

**Firefox doesn't recognize .localhost domain**

Add `127.0.0.1 jf.localhost` line to `/etc/hosts`.

---

**Configure Gmail for SMTP outgoing connections**

[0](https://www.androidauthority.com/gmail-smtp-settings-801100/)

---

**Wordpress change admin email in database**

[0](https://www.greengeeks.com/tutorials/article/change-admin-email-address-in-wordpress/)

---

**Best ssh key format**

ed25519

```bash
$ ssh-keygen -o -a 100 -t ed25519 -f ~/.ssh/id_ed25519 -C "john@example.com"
```

[0](https://medium.com/risan/upgrade-your-ssh-key-to-ed25519-c6e8d60d3c54)

---

**ls -al output meaning**

[0](https://www.garron.me/en/go2linux/ls-file-permissions.html)

---

**Extract rar archive on Linux**

```
$ unrar x dir.rar
```

**Ban usage of certain types in ESLint**

```json
"@typescript-eslint/ban-types": ["error",
{
    "types": {
        "React.StatelessComponent": { "message": "Please use React.FC instead.", "fixWith": "React.FC" },
        "React.FunctionalComponent": { "message": "Please use React.FC instead.", "fixWith": "React.FC" },
     }
   }
]
```

---

**Wordpress GraphQL problem**

Change the permalinks format in Wordpress to something non-default, e.g "Post name".

[0](https://docs.wpgraphql.com/getting-started/install-and-activate/#verify-the-endpoint-works)

---

**Check which groups current UNIX user belongs to**

```bash
$ groups
```

---

**Wordpress PHP out of memory error**

Add the following to the `wp-config.php` file.

```
define('WP_MEMORY_LIMIT', ini_get('512MB'));
```

---

**Wordpress asssets/uploads missing CORS header**

[0](https://stackoverflow.com/a/20453033)

---

**Yarn interactive package upgrade**

```
yarn upgrade-interactive
```

---

**Convert package-lock.json to yarn.lock**

```
synp --source-file /path/to/yarn.lock
synp --source-file /path/to/package-lock.json
```

[0](https://github.com/imsnif/synp)

---

**Convert symlinks to files while copying**

```
$ cp -r --derefernce ../dir dir/
```

---

**Localtunnel**

```bash
$ npx localtunnel --port 8000
```

---

**Resize an image with ImageMagick preserving aspect ratio**

```bash
$ convert image.png -resize x200 output.png
$ convert image.png -resize 200x output.png
```

---

**Resize an image with ImageMagick ignoring aspect ratio**

```
$ convert image.png -resize 200x300! output.png
```

---

**Markdown table**

```
| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |
```

---

**Query JSON file properties with jq**

```bash
$ cat package.json | jq .devDependencies.typescript
```

---

**Hide reCAPTCHA v3 badge**

It's allowed to hide the badge:

```css
.grecaptcha-badge {
  visibility: hidden;
}
```

Unless you include the following text in the user flow:

```html
This site is protected by reCAPTCHA and the Google
<a href="https://policies.google.com/privacy">Privacy Policy</a> and
<a href="https://policies.google.com/terms">Terms of Service</a> apply.
```

---

**Compress video**

You can modify the bitrate (1000k below) to fiddle with the quality.

```
$ ffmpeg -i video.mp4 -vcodec h264 -b:v 1000k -acodec mp3 output.mp4
```

---

**Convert markdown to pdf**

```
$ pandoc source.md -s -o output.pdf
```

---

**Check how much space do files of certain extension take**

```
$ find . -name "*.pdf" | xargs du -sch
```

---

**Compress images**

```
$ convert -strip -interlace Plane -quality 75% -adaptive-resize 75% $FILE $FILE
```

---

**Change directory after entering ssh server**

Add the following to the end of `/home/<user>/.bash_profile`

```
cd /path/co/cd/to
```

---

**rsync a directory to remote**

```
rsync -azP public server:/path/
```

---

**PostCSS with Webpack 5**

Setup

```bash
$ npm install -D postcss-loader postcss-preset-env doiuse
```

```js
// postcss.config.js

module.exports = {
  plugins: {
    "postcss-preset-env": {},
    doiuse: {
      ignoreFiles: ["**/reset.min.css"],
    },
  },
};
```

```js
// webpack.config.js
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      }
```

---

**Exclude opera mini from browserslist**

```json
  "browserslist": [
    "defaults",
    "last 2 versions",
    "not dead",
    "> 1%",
    "not IE 11",
    "not op_mini all"
  ]
```

---

**Test what parts of the app Facebook crawler sees**

```bash
$ curl -v --compressed -H "Range: bytes=0-524288" -H "Connection: close" -A "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)" "$URL"
```

---

**Generate a placeholder image with ImageMagick**

```
$ convert -size 100x100 xc:#990000 whatever.png
```

---

**Rsync ignores dotfiles**

Make sure to include slashes at the end of both paths.

```
rsync -azP --delete source/ server:/target/
```

---

**Execute a script via ssh**

```
ssh server "/path/to/script.sh"
```

---

**Change shell to bash after SSHing to a server**

```
chsh -s /bin/bash
```

---

**Check Ubuntu version**

```
lsb_release -a
```

---

**List all groups current user belongs to**

```
groups
```

---

**Exclude a file in rsync**

In the following example the file `src_directory/file.txt` will not be transferred:

```
$ rsync -a --exclude 'file.txt' src_directory/ dst_directory/
```

---

**Add transparent background**

```
convert test.png -transparent white transparent.png
```

---

**Get first video frame**

```
ffmpeg -i inputfile.mkv -vf "select=eq(n\,0)" -q:v 3 output_image.jpg
```

---

**Get image size**

```
magick identify rose.jpg
```

---

**Colored two files diff**

```
diff -u dev.html prod.html| diff-so-fancy
```

---

**Convert psd to png**

```
$ convert 'image.psd[0]' image.png
```

---

**Prettier format GraphQL string template literal**

```
const foo = /* GraphQL */`{ foo { bar } }`
```

---

**systemd enable vs start**

`enable` makes a service start on boot
`start` just starts a service

---

**nodemailer your email to kindle did not include any attachments**

```js
return mailer.send({
  from: Env.SMTP_USER,
  to: Env.EMAIL_TO_DELIVER_TO,
  subject: "Newspaper",
  text: "Sent from raok.", // usually due to missing text/html content
  attachments: [{ filename: "newspaper.mobi", path }],
});
```

---

**Preact with esbuild**

```
$ npm i preact react@:npm@preact/compat react-dom@npm:@preact/compat
$ npm i -D esbuild typescript
```

```
// frontend/index.tsx
import { h, render } from "preact";
import "@preact/compat";

function App() {
  return <div>preact</div>;
}

render(<App />, document.querySelector("#root") ?? document.body);

// Running the watcher
npx esbuild frontend/index.tsx \
  --bundle \
  --watch \
  --outdir=static/

// tsconfig.json
{
 "compilerOptions": {
   "strict": true,
   "esModuleInterop": true,
   "jsx": "react",
   "jsxFactory": "h",
   "jsxFragmentFactory": "Fragment"
 },
}

// Serving the file under /static/index.js, e.g
<script async src="/index.js"></script>
```

---

**Open a file or url in a default application**

```
$xdg-open stats.html
```

---

**Create a video from audio and image**

```
$ ffmpeg -r 1 -loop 1 -i image.png -i audio.wav -acodec copy -r 1 -shortest -vcodec libx264 utwor-nieznany.flv
```

---

**microbundle Cannot find name h error**

```
microbundle --jsx React.createElement
```

---

**sytemd enable vs start**

Enable makes a service launch on boot

Start just launches a service.

---

**Fix Lighthouse's passive listeners warning**

[0](https://stackoverflow.com/questions/60357083/does-not-use-passive-listeners-to-improve-scrolling-performance-lighthouse-repo/62177358#62177358)

---

**Create an example ffmpeg mp4 video**

```bash
$ ffmpeg -f lavfi -i rgbtestsrc -pix_fmt yuv420p -t 30 rgbtestsrc.mp4
```

---

**WebP**

Originates from WebM video codec.

WebM supports infra-frame compression - each frame is compressed, and then differences between frames are also compressed.

WebP is a single frame of WebM file.

WebP can be both lossy or lossless.

It takes a pixel and applies a range of predictions of what would adjacent pixels look like.
Then it applies sort of a Huffman encoding.

---

**Brotli compression in gatsby**

File extension: `.br`

Generate brotli files for a Gatsby app:

- install `gatsby-plugin-brotli`
- add the following config to `gatsby-config.js`:

```
  {
    resolve: "gatsby-plugin-brotli",
    options: { extensions: ["css", "html", "js", "svg"] },
  },
```

---

**Check what a domain resolves to**

```
$ nslookup www.example.com
```

---

**Check what a domain resolves to with given DNS server IP**

```
$ nslookup www.example.com 8.8.8.8
```

---

**Do nothing scripts**

The very first step in an attempt to automate a manual or semi-manual process.

Create a script that merely display steps that are required to accomplish a goal.
Make pressing the Enter key go to the next step.
Display comments, commands, and helpful messages.
As the time passes, automate some of the steps.
End up automating the whole process.

https://blog.danslimmon.com/2019/07/15/do-nothing-scripting-the-key-to-gradual-automation/

---

**Configure a WordPress site with nginx reverse-proxy**

docker-compose.yml

```
version: "3.9"

services:
  db:
    image: mysql:5.7
    volumes:
      - ./db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: secret

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    volumes:
      - ./wordpress_data:/var/www/html
    ports:
      - "8005:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: secret
      WORDPRESS_DB_NAME: wordpress
volumes:
  db_data:
  wordpress_data:
```

Standard nginx reverse-proxy:

```
server {
        auth_basic "Welcome to UFD!";

        listen 80;
        server_name ufd-test.bgord.me www.ufd-test.bgord.me;
        location / {
                proxy_pass http://localhost:8005;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_connect_timeout 150;
                proxy_send_timeout 100;
                proxy_read_timeout 100;
                proxy_buffers 4 32k;
                client_max_body_size 8m;
                client_body_buffer_size 128k;
        }

        listen 443 ssl;
        ssl_certificate /etc/letsencrypt/live/bgord.me/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/bgord.me/privkey.pem;

        if ($scheme = http) {
                return 301 https://$server_name$request_uri;
        }
}
```

To resolve the `Blocked loading mixed active content “http://*.bgord.me/wp-includes/css/dashicons.min.css?ver=5.8.2”` error, add to `wp-config.php`.

```
$_SERVER['HTTPS'] = 'on';
```

---

**Execute a command when file changes**

```
$ ls static | entr -s "npx "
```

https://www.cloudsavvyit.com/5736/how-to-run-a-linux-command-when-a-file-set-changes/

---

**Generate random strng**

```
$ openssl rand -base64 <length>
```

---

**Get last frame from a video with ffmpeg**

```
ffmpeg -sseof -3 -i video.mp4 -update 1 -q:v 1 last-frame.jpg
```

---

**Get SSL certificat for wildcard subdomain with certbot**

```
sudo certbot certonly --manual \
  -d *.<domain> \
  -d <domain> \
  --agree-tos \
  --manual-public-ip-logging-ok \
  --preferred-challenges dns-01 \
  --server https://acme-v02.api.letsencrypt.org/directory \
  -m <email>
```

---

**Convert wav to mp3**

```
$ ffmpeg -i input.wav -vn -ar 44100 -ac 2 -b:a 192k output.mp3

-i - input file

-vn - Disable video, to make sure no video (including album cover image) is included if the source would be a video file

-ar - Set the audio sampling frequency. For output streams it is set by default to the frequency of the corresponding input stream. For input streams this option only makes sense for audio grabbing devices and raw demuxers and is mapped to the corresponding demuxer options.

-ac - Set the number of audio channels. For output streams it is set by default to the number of input audio channels. For input streams this option only makes sense for audio grabbing devices and raw demuxers and is mapped to the corresponding demuxer options. So used here to make sure it is stereo (2 channels)

-b:a - Converts the audio bitrate to be exact 192kbit per second
```

---

**Create video from an image and an mp3 file**

```
$ ffmpeg -loop 1 -i img.jpg -i music.mp3 -shortest -acodec copy -vcodec mjpeg result.mkv
```

---

**sqlite backup**

Don't use `cp` - it's transactionally unsafe.

---

**Correct permissions for ssh files and keys**

600

---

**Compress favicon file**

```bash
convert -colors 4 favicon.ico out.ico
convert -colors 8 favicon.ico out.ico
convert -colors 16 favicon.ico out.ico
```

---

**Copy a directory with dotfiles**

```
cp -a path/to/source/. target
```

---

**Setup webOS dev env**

- Create an LG dev account - https://webostv.developer.lge.com/develop/app-test/preparing-account/
- Download developer mode app on TV - https://webostv.developer.lge.com/develop/app-test/using-devmode-app/
- Enable dev mode status, key server
- install ares-cli globally - https://github.com/webosose/ares-cli
- https://www.webosbrew.org/pages/configuring-sdk.html#configuring-webososeares-cli-with-developer-mode-app
- choose name "tv"
- build the app

```
yarn build && && ares-package --no-minify build -o build
```

- run the app on tv

```
ares-install -d tv build\<app.name>.ipk && ares-inspect -d tv -a some.url.com --open,
```

---
