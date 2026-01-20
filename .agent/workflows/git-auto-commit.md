---
description: git statusとdiffを解析し、適切なブランチ作成・日本語での粒度の細かいコミット・マージを自動化します。
---
# 🤖 Git Auto Commit

## 1. 現状確認 // turbo

```bash
git status
```

```bash
git diff
```

## 2. コミット計画

- 変更内容を分析し、論理的な単位に分割する
- 各単位について、コミットメッセージ（日本語）を作成する
- 接頭辞をつける（feat:, fix:, docs:, style:, refactor:, chore:）

## 3. 実行

各コミット単位について：

```bash
git add <files>
```

```bash
git commit -m "<type>: <message>"
```

## 4. プッシュ（mainブランチの場合）

```bash
git push origin main
```
