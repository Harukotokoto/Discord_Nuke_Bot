# Discord Nuker

### [1. .envファイルを編集](#envファイルを編集)
### [2. Node.jsをインストール](#nodejsをインストール)
### [3. Botを起動](#botを起動)

## .envファイルを編集
1. ルートフォルダの`.env`をテキストエディタなどで開き下記のように編集します。
2. `CLIENT_TOKEN`: DiscordのBotのTOKENを入力
3. `PREFIX`: Nukeの起動の際に使用する接頭辞を入力
4. `OWNERS`: []の中にNukeコマンドを使用できるユーザーIDを入力
    例: \["1105725202626793533", "1120349903885979681"\]
5. `MESSAGE`: Nukeの際に使用するチャンネル名、ロール名、サーバー名です。

## Node.jsをインストール
Node.jsをインストールします。
[直接ダウンロード](https://nodejs.org/dist/v20.9.0/node-v20.9.0-x64.msi)
[公式サイト](https://nodejs.org/en)

※パスが通っていない場合はパスも通してください
## Botを起動
Macユーザー、Linuxユーザーは`run.sh`、Windowsユーザーは`run.bat`を実行して起動してください。
起動できない場合は直接コマンドラインに`npm install`と入力してから`npm run start`と入力してください
