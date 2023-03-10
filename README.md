# react-to-task
Slackで特定のチャンネル上の投稿にリアクションが来たとき、その内容をNotionのデータベースに追加するやつ

# env
```
SLACK_REACTION=
NOTION_DATABASE_ID=
SLACK_BOT_TOKEN=
NOTION_TOKEN=
```

## できること（予定）

流れ
1. Slack上で、メッセージに指定のリアクションが追加される
2. 指定のNotion DBにメッセージが転記される（メッセージ`必須`、添付ファイルなどは`任意` ※努力目標）
