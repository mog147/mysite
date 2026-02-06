# 396 FOLIO - Official Portfolio

![396 FOLIO Preview](img/hero/hero_main.jpg)

**Design Engineering / Workflow Design / Art**
_A portfolio demonstrating the intersection of logical engineering and aesthetic time._

[English](#english) | [日本語](#japanese)

<a id="english"></a>

## 📖 Overview
This project is the official portfolio website of Momoko Tezuka, a Design Engineer based in Tokyo.
Optimized for performance and aesthetics, it utilizes standard web technologies (Vanilla JS, CSS, HTML5) without heavy frameworks to ensure maximum speed and longevity.

It also serves as a proof of concept for **"AI-Pair Programming"**, demonstrating how modern engineers can accelerate development while maintaining strict control over architectural decisions.

## 🛠 Tech Stack & Highlights

### Core Technologies
- **HTML5 (Semantic Markup)**
- **CSS3 (Variables, Glassmorphism, Responsive Grid)**
- **Vanilla JavaScript (ES6+)**
  - No external UI frameworks (React/Vue free) for lightweight performance.
  - Custom Web Components for modular architecture.

### Key Engineering Features
1.  **Component-Based Architecture (Vanilla Web Components)**
    - Implemented custom elements (e.g., `<site-header>`, `<work-card>`, `<glass-card>`) to ensure reusability and maintainability without build steps.
    - [View Source: js/components.js](js/components.js)

2.  **Serverless "News" System**
    - A lightweight logic that fetches `news.html`, parses the DOM, and dynamically renders the latest 3 updates on the homepage.
    - Eliminates the need for a backend CMS for simple updates.

3.  **Performance Optimization**
    - **Smart Loader:** JavaScript automates gallery population by probing image directories, removing the need for manual HTML updates.
    - **Intersection Observer:** Used for high-performance scroll animations (`.reveal`) and lazy loading.

## 🤖 AI-Native Development Profile
This project was developed using a **"Vibe Coding"** methodology, an advanced AI-Pair Programming workflow.

- **Role of the Engineer (Human):** Architectural decision-making, aesthetic direction (Design), logic definition, and code review.
- **Role of the AI (Agent):** Rapid prototyping, boilerplate generation, refactoring, and real-time debugging.

**Result:**
By leveraging AI as a "Junior Partner," development speed was accelerated by approx. **5x** compared to traditional coding, allowing more time to be invested in "Design" and "User Experience" — the core value of this portfolio.

This project validates that the modern engineer's role is shifting from "Code Writer" to "Architect & AI Director."

## 📂 Project Structure
```
.
├── index.html       # Landing Page
├── css/
│   └── main.css     # Single source of truth for styles (CSS Variables)
├── js/
│   ├── main.js      # Core logic (Router, Observers, Event Listeners)
│   └── components.js# Web Components definitions
└── img/             # Optimized assets
```

---

<a id="japanese"></a>

## 📖 概要 (Overview - Japanese)
本プロジェクトは、東京を拠点に活動するデザインエンジニア、Tezuka Momokoの公式ポートフォリオサイトです。
パフォーマンスと美しさ（Aesthetics）を最優先し、重量級のフレームワークに依存せず、標準的なWeb技術（Vanilla JS, CSS, HTML5）のみで構築されています。

また、本サイトは**「AIペアプログラミング（Vibe Coding）」**の実証実験でもあり、エンジニアがAIを活用することで、設計の主導権を保ちながら開発速度を飛躍的に向上させるプロセスを体現しています。

## 🛠 技術スタックとハイライト

### コアテクノロジー
- **HTML5 (Semantic Markup)**
- **CSS3 (Variables, Glassmorphism, Responsive Grid)**
- **Vanilla JavaScript (ES6+)**
  - React/Vue等のフレームワークを使用せず、軽量かつ高速な動作を実現
  - カスタムWebコンポーネントによるモジュール設計

### エンジニアリングのこだわり
1.  **コンポーネント指向アーキテクチャ (Vanilla Web Components)**
    - `<site-header>`, `<work-card>` などのカスタム要素を実装し、ビルド手順なしで再利用性と保守性を確保しています。
    - [ソースコード: js/components.js](js/components.js)

2.  **サーバーレス "News" システム**
    - `news.html` を非同期で取得・パースし、最新の3件のみをトップページに動的に展開するロジックを実装。
    - バックエンドCMSを導入することなく、静的ファイルのみで更新性を担保しています。

3.  **パフォーマンス最適化**
    - **Smart Loader:** 画像フォルダを自動スキャンしてギャラリーを生成するスクリプトにより、HTMLの修正なしで作品追加が可能。
    - **Intersection Observer:** 高パフォーマンスなスクロールアニメーション（`.reveal`）と遅延読み込みを実現。

## 🤖 AIネイティブ開発 (Vibe Coding)
本プロジェクトは、最先端のAIペアプログラミング手法 **"Vibe Coding"** を用いて開発されました。

- **エンジニア（人間）の役割:** 全体設計（アーキテクチャ）、デザインの方向性決定、ロジック定義、コードレビュー。
- **AI（エージェント）の役割:** 高速プロトタイピング、ボイラープレート生成、リファクタリング、リアルタイムデバッグ。

**成果:**
AIを「ジュニアパートナー」として活用することで、従来の手法と比較して**約5倍**の開発スピードを実現。「体験設計（UX）」や「デザインの細部」といった本質的な価値創造に時間を投資することが可能となりました。

エンジニアの定義が「コードを書く人」から「アーキテクチャを描き、AIを指揮する人（Architect & AI Director）」へと変化していることを証明するプロジェクトです。

## 🔗 Author
**Momoko Tezuka**
- Design Engineer / Workflow Designer
- Portfolio: [https://mog147.notion.site/](https://mog147.notion.site/)
