# イベント構造化データの根拠と検証

確認日: 2026-10-25 JST。Google Search Console の `organizer` / `location.address` / `offers` 改善推奨への対応。

## 今回設定できる値

| 対象 | 設定 | 根拠 |
| --- | --- | --- |
| ピッパラの樹 | 主催: 劇団ココア、荻窪小劇場の住所 | 既存の公演名・[劇団公式告知](https://x.com/gekidan_cocoa/status/2093694275230085363)、`venues.ts` の公演フライヤー出典 |
| 天竺生地 vol.28 | 池袋西口GEKIBAの住所 | `venues.ts` の公演フライヤー出典 |
| 月を跨ぐ vol.20 | 主催: KAIGYAC STAGE、下北沢RBLCAFEの住所 | [主催告知](https://x.com/kaigyacstage/status/2113758692575473921)（PR #164で原文照合済み）、`venues.ts` の公式サイト出典 |
| 第3回あゆどん大運動会 | 主催: 高橋あゆみ、来場券5,500円/JPY、販売URL、予約期限11/7 23:59 JST | [主催ショップ](https://ayudon.base.shop/)の商品説明と[来場券ページ](https://ayudon.base.shop/items/153484411) |
| ツイキャス・SHOWROOMの配信 | OnlineEventAttendanceMode / VirtualLocation | 既存の公式配信リンク・開催告知。住所・無料・入場券は補完しない |

主催ショップのホームに掲載された商品説明で、税込価格・日時・主催・予約期限・会場非公開を確認。個別商品URLの直接取得はこの確認経路では失敗したが、同URLは既存データと公式ショップの商品リンクで一致している。決済方法によって手数料が異なるため、表示本文に別途手数料の可能性を記載。JSON-LDの5,500円は公表された最小来場価格で、決済手数料を一律に加算しない。在庫・販売中は推測しない。

2,000円の応援券は来場権ではないため、`offers` に使わない。主催の会場公開禁止に従い、購入者向けメール等から住所を補完しない。

## 未設定・残る確認事項

| 対象 | 未設定の情報・理由 |
| --- | --- |
| あゆどん大運動会 | 物理会場の名称・住所は非公開。追加調査で埋めない。公開会場がないためGoogleイベント機能の必須要件を満たすと主張しない |
| Homin' / lovin' | 遊空間がざびぃの検証済み住所、主催の明示的な確認が不足 |
| 天竺生地・夜ふかしキャンパス・テオリデア・ふくろうFM公開収録・合同誕生祭・KYANLY | 当該催しの主催の明示的な確認が不足。未登録会場の住所は公式会場/主催資料で確認してから `venues.ts` へ出典付きで追加 |
| 終了済み公演 | 当時の価格・URLが残っていても、今回の実装は現行 `offers` を出さない。検索・物販・応援券・配信サービスのトップURLを入場用販売URLへ流用しない |
| 無料イベント | 現行データに確認済み無料条件はない。将来、手数料を含む無料参加が公式に確認できた場合だけ明示的に `price: 0` を登録 |

未確認項目は省略するので、すべての警告がゼロになる修正ではない。過去イベントの住所・主催も、警告数を減らすためだけに推測で設定しない。

## 実装の契約

- `StructuredData` は `App` が表示している予定を受け取る。Sheets設定時にローカル予定を独立して出力しない。APIにない主催・価格をローカルの同名イベントから移植しない。
- 住所は `venues.ts` の `address` と `source` がある場合だけ再利用。Googleが認める住所のText形式を使い、郵便番号や行政区を推測分割しない。
- 主催と入場Offerは `ScheduleEvent.structuredData` に出典を持つ。Offerは表示リンクの `kind: ticket` とURLが完全一致し、価格・通貨・出典が揃う場合だけ出力。価格不明は無料ではない。
- 予約期限後・各回終了後はOfferを省略。`InStock` やキャンセル状態を推測しない。終了時刻がない回は開始時刻後のOfferを保守的に省略する。
- `occurrences` は各回を別Eventにする。各回の終了時刻が不明なら `endDate` を省略し、シリーズ最終時刻や所要時間で補完しない。`dates` だけの予定は日付だけで出力する。
- 誕生日の記念写真・記事公開・テレビ/ラジオ放送を来場Eventとして出力しない。参加する配信は明示的に有効化する。配信参加先は表示される `kind: stream` のURLと一致させる。
- 日時によるOffer失効はページ読み込み/予定更新時に評価。開いたままのタブへ時刻監視は追加しない。
- FAQ・Person等の既存データは維持。変更はイベントの意味・根拠・表示データとの整合が対象。

## 検証方法

1. `pnpm run typecheck`、`pnpm test`（`event-structured-data.test.mjs`を既存CIへ組み込み）、`pnpm run build`、Site Identity Guard、Image Overwrite Guard、差分チェックを行う。
2. ローカルの実ブラウザーで `document.querySelector('#riri-events-jsonld')` のJSONを読み、住所・主催・5,500円の入場券・配信・FAQ維持を確認する。390px/1440pxで本文とリンクを確認する。
3. [Schema Markup Validator](https://validator.schema.org/)で生成されたJSON-LDまたは公開URLを検証する。語彙として妥当なことと、Google独自機能の対象であることを区別する。
4. 本番反映後、[Googleリッチリザルトテスト](https://search.google.com/test/rich-results)に公開URLを入力。JavaScript実行後のHTML・検出Event・重大なエラー・残る推奨警告を確認。コード入力ならブラウザーで抽出したJSON-LDをscript付きHTMLへ貼り付ける。
5. Search ConsoleのURL検査で「公開URLをテスト」し、Googleが取得したHTMLを照合。該当の拡張レポートで修正の検証を開始できる場合に実施する。再クロール・再判定前に「警告解消済み」と報告しない。

Google公式: [Event構造化データ](https://developers.google.com/search/docs/appearance/structured-data/event)。イベント機能は単一イベントの個別ページ・固有URL等を要求し、物理会場がない配信だけの体験は対象外。このサイトは複数予定を掲載する1ページ構成であり、今回のプロパティ改善だけでイベントリッチリザルトへの適格性を満たすものではない。個別ページ化は別の設計・実装範囲とする。Schema.orgの正しいデータとGoogleの検索表示条件を混同しない。

Google上のリッチリザルトテスト・Search Consoleの検証操作と、再クロール後の警告解消は、ローカル/CIテストとは別の未確認事項。
