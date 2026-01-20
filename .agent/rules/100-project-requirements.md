# プロジェクト要件 (Project Requirements)

このルールは `ZG_PROJECT/manus-gallery` 特有の要件を定義します。

## 重要: 要件定義書

詳細な要件は以下のファイルに定義されています。迷ったときはこのファイルを参照してください：
`ZG_PROJECT/manus-gallery/docs/requirements.yml`

## プロジェクト概要

**Manus図鑑 (manus-zukan)**

- **コンセプト**: 誰でも・いつでも・無料で見られるAI作品のオンラインギャラリー
- **MVP機能**:
  - ギャラリーグリッド表示
  - カテゴリフィルター（Tool, Art, Game, Utility等）
  - リアルタイムキーワード検索
  - 投稿フォーム（Google Form）への誘導
- **スコープ外（初期フェーズ）**:
  - ログイン機能
  - コメント・いいえ機能
  - 内部投稿フォーム
  - 詳細ページ（一覧から直接外部リンクへ飛ぶ）

## データモデル (Project)

`projects.json` 等で管理される静的データの構造：

- **ID**: 一意なID
- **Title**: 作品タイトル
- **Description**: 短い説明
- **Category**: Tool / Art / Game / Utility
- **Thumbnail URL**: サムネイル画像
- **Project URL**: 作品へのリンク
- **Creator Name**: 作者名
- **Creator X URL**: 作者のX（Twitter）リンク
- **Status**: approved のみ表示

## UI要件

- **モバイルファースト**: レスポンシブデザイン必須
- **カード**: サムネイル、タイトル、説明、リンク必須
- **外部リンク**: `target="_blank" rel="noopener noreferrer"` を付与

## 非機能要件

- **アクセシビリティ**: キーボード操作可能、フォーカス表示、Altテキスト
- **SEO**: 基本的なメタタグ設定
