# Tickbot :hourglass_flowing_sand:

Super simple Slackbot for task logging.

# Usage

## Setup project channel:

1. Title: `project_name`
2. `/invite tickbot`

## Interacting with Tickbot

Date input parsing handled by [datejs](https://github.com/matthewmueller/date) i.e `yesterday afternoon at 4:30pm`

+ Within a project context (channel)
  + `@tickbot new entry` create entry associated with channel project
  + `@tickbot get entries` fetch entries associated with channel project

+ Direct conversation
  + `get entries` fetch entries associated with *all* projects

## Preview

![Making an entry](/screenshots/new_entry.png)
![Fetching entries](/screenshots/get_entry.png)

## Development

```shell
npm install
gulp serve
```

## Deployment

```shell
gulp build
scp -rp dist/ ../deploy/tickbot
git init
git remote add dokku dokku:tickbot
git add -A
git commit -m 'here we go!!'
git push dokku master
```
