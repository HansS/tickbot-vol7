# Tickbot :hourglass_flowing_sand:

Leveraging [Tickspot](https://github.com/tick/tick-api) API in Slack for time management and logging.

# Usage

## Members: Request invite to the team [Tick](https://volume-7.tickspot.com).

## Admins: Setup channel following these guidelines

1. Title: `project_name`
2. Purpose: `client_name:project_budget`
3. `/invite tickbot`

## Interacting with Tickbot

+ Within a project context (channel)
  + `@tickbot new task` create task associated with channel project
  + `@tickbot new entry` create entry associated with channel project
  + `@tickbot get entries` fetch entries associated with channel project


+ Direct conversation
  + `get entries` fetch entries associated with *all* projects

# Preview

![Making an entry](/screenshots/new_entry.png)
![Fetching entries](/screenshots/get_entry.png)
