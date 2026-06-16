import React, { useState, useEffect } from 'react';

// ==========================================
// 練習メニューデータベース（全国基準・専門知識搭載）
// ==========================================
const DRILL_DATABASE = {
  defense: {
    title: "鉄壁の連動ディフェンス（面とスライド）",
    drills: [
      {
        id: "def-1",
        stepName: "DF基本姿勢と胸でのコンタクト",
        title: "1on1における骨盤コントロールとチェストコンタクト",
        time: "30分",
        desc: "オフェンスに対して手先で押すのではなく、足で先回りして体幹（胸）で相手の突進を受け止め、コントロールする練習。",
        points: [
          "手だけでコンタクトするとファウル（プッシング）になる。胸でぶつかり、手は添えるだけ。",
          "オフェンスの骨盤の向きを瞬時に見極め、突破ルートを足先で先回りして塞ぐ。",
          "【全国基準】コンタクトの瞬間、相手の重心移動に合わせて自分の重心を5cm下げて耐える。"
        ],
        boardType: "contact",
        videoSrc: "https://www.youtube.com/embed/mock-handball-def1",
        videoTitle: "【IH常連校が実践】1対1を完全にシャットアウトする正しい姿勢とフットワーク"
      },
      {
        id: "def-2",
        stepName: "隣との間隔と声掛けスライド",
        title: "2on2におけるスライドDFとマークの受け渡し",
        time: "40分",
        desc: "オフェンスの並走攻撃やクロスプレーに対し、隣のDFと連動してズレを作らせずにスライドしてマークを受け渡す練習。",
        points: [
          "ボール保持者に対して牽制（前に出る）と、隣のDFのフォローバック（下がる）の連動性を意識する。",
          "「俺が出る！」「後ろ頼む！」の声の掛け合いをコンマ2秒以内に行う。",
          "【全国基準】隣のDFが突破されたら、0.1秒以内にカバーに入り、空いたスペースはバックステップで埋める。"
        ],
        boardType: "slide",
        videoSrc: "https://www.youtube.com/embed/mock-handball-def2",
        videoTitle: "【戦術解説】海外プロが徹底するディフェンスのスライド＆スイッチ基礎"
      },
      {
        id: "def-3",
        stepName: "組織的なフリースロー制圧",
        title: "フリースロー（FT）からのクイック再開を塞ぐ組織DF",
        time: "30分",
        desc: "相手がFTを得た瞬間から素早く壁を作り、クイックスタートによるイージーシュートを完全に防ぐ連動練習。",
        points: [
          "FTが宣告された瞬間、ボールの前に最も近い選手が立ち、素早く3mの距離をとりつつ視野を確保する。",
          "相手エースシューターへのパスラインを最優先で遮断する。",
          "【全国基準】ホイッスルから0.5秒以内に全員が所定の位置（6mライン上）にセット完了する。"
        ],
        boardType: "free-throw",
        videoSrc: "https://www.youtube.com/embed/mock-handball-def3",
        videoTitle: "【失点を防ぐ】相手の攻撃スピードをゼロにするフリースローディフェンス戦術"
      }
    ],
    reviewDrill: {
      title: "【復習】ディフェンスのスタンス再構築",
      time: "40分",
      desc: "前日の課題「コンタクト不足・足が止まる」を徹底解消。フットワークを中心とした、コンタクト位置の確認基礎練習。",
      points: [
        "素早い前後左右のシャッフルフットワークから、衝突の瞬間だけ静止して「壁」になる。",
        "【全国基準】ミスが起きたら0.5秒で頭を切り替えて次のプレー（ルーズボール回収）に走る。"
      ],
      boardType: "review-def",
      videoSrc: "https://www.youtube.com/embed/mock-handball-def-review",
      videoTitle: "【基礎徹底】足が止まるチーム必見！ディフェンスのステップワーク矯正法"
    }
  },
  fastbreak: {
    title: "1.5秒で仕留める超速攻システム",
    drills: [
      {
        id: "fb-1",
        stepName: "ルーズ即ダッシュとファーストパス",
        title: "キーパーからの1次速攻ファーストパス展開",
        time: "35分",
        desc: "シュートストップまたはパスカット直後、両サイドが爆発的なスプリントで走り出し、GKからのロングパスをキャッチする練習。",
        points: [
          "パスを受ける選手は、走りながらボールをキャッチできるよう半身（視野確保）で走る。",
          "GKはキャッチから1.5秒以内にパスを放つ。ライナー性の鋭いパスを心がける。",
          "【全国基準】シュートが入ろうが外れようが、ボールがラインを割った瞬間から3秒以内にセンターラインを突破する。"
        ],
        boardType: "fastbreak-1",
        videoSrc: "https://www.youtube.com/embed/mock-handball-fb1",
        videoTitle: "【電光石火】カウンター成功率を2倍にするキーパーの配球＆ファーストスプリント"
      },
      {
        id: "fb-2",
        stepName: "波状攻撃（二次速攻）の連動",
        title: "2次速攻におけるトレイルランナーの連動展開",
        time: "40分",
        desc: "1次速攻でシュートに行けなかった場合、後ろから遅れて走り込んでくるセンター・45度が波状攻撃を仕掛ける練習。",
        points: [
          "前線の選手は無理に突っ込まず、ボールをキープして遅れてくる走り込みに合わせる。",
          "走り込むバックプレーヤーは全力疾走のスピードを殺さずにパスを受け、ジャンプシュートを狙う。",
          "【全国基準】攻撃の波を途切れさせず、相手ディフェンスが揃う前に崩しきる展開を10秒以内に完結する。"
        ],
        boardType: "fastbreak-2",
        videoSrc: "https://www.youtube.com/embed/mock-handball-fb2",
        videoTitle: "【現代ハンド】戻りの遅い相手を粉砕するセカンドブレイク（2次速攻）の構造"
      }
    ],
    reviewDrill: {
      title: "【復習】パスミスの徹底排除＆ミドルレシーブ",
      time: "40分",
      desc: "前日の課題「キャッチミス・オーバーステップ」を解消する、確実にミドルエリアでパスを繋ぐ堅実なカウンター練習。",
      points: [
        "スピードに乗りながらも確実にキャッチできるよう、自分の胸の前で「ハンドキャッチ」を行う。",
        "【全国基準】全力疾走中でも相手ディフェンスの位置を視野の端に入れ、無理なパスをしない。"
      ],
      boardType: "review-fb",
      videoSrc: "https://www.youtube.com/embed/mock-handball-fb-review",
      videoTitle: "【パスミス撲滅】スピードに乗った状態でも絶対にミスしないキャッチ＆パス基本"
    }
  },
  offense: {
    title: "ディフェンスを裂くセットオフェンス",
    drills: [
      {
        id: "off-1",
        stepName: "並走攻撃（パラレル）とカットイン",
        title: "DFの隙間に鋭く侵入するパラレルアタック",
        time: "45分",
        desc: "45度から逆の45度、またはセンターからのパスに合わせ、スピードに乗った状態でディフェンスの隙間（間）を狙うコンビ練習。",
        points: [
          "ボールを受ける前からトップスピードで動き出し、相手DFを前後・左右に揺さぶる。",
          "隣のプレーヤーが引きつけたDFのスペースを見極め、鋭く縦に切り込む。",
          "【全国基準】接触されても軸がぶれない体幹を維持し、シュートを打ち抜くか7mスローを勝ち取る。"
        ],
        boardType: "offense-1",
        videoSrc: "https://www.youtube.com/embed/mock-handball-off1",
        videoTitle: "【得点力アップ】セットDFを切り裂くパラレルとズレの作り方"
      }
    ],
    reviewDrill: {
      title: "【復習】パス回しの質の向上（球離れのスピード）",
      time: "40分",
      desc: "パスが停滞してDFに詰められてしまう問題を解消。0.5秒以内の球離れ（クイックパス）を反復し、ズレの起点を作る練習。",
      points: [
        "キャッチと同時に次のパスコースにステップを踏み出し、手首のスナップだけでパスを送る。",
        "【全国基準】パスの弾道、スピードを味方の利き手に完璧に合わせる精密さを追求する。"
      ],
      boardType: "review-off",
      videoSrc: "https://www.youtube.com/embed/mock-handball-off-review",
      videoTitle: "【ズレを作る】パススピードを極限まで上げるキャッチ＆パスリリース"
    }
  }
};

// ==========================================
// ロードマップデータ（診断時期×課題別）
// ==========================================
const ROADMAP_TEMPLATES = {
  autumn: {
    title: "秋：新チーム始動期「徹底的な基礎作りと約束事の共有」",
    goals: [
      { id: "g1", text: "チーム全員がDFの基本スタンス（足を揃えず半身）をマスターする", done: true },
      { id: "g2", text: "フットワークメニューを規定時間内にノーミスでクリアする", done: false },
      { id: "g3", text: "ルーズボールやパスカットから1.5秒以内のファーストパス展開を共通認識にする", done: false },
      { id: "g4", text: "公式戦を想定し、自分たちの共通戦術（戦術コード名）を2つ以上確立する", done: false }
    ],
    benchmark: "【全国基準目標】練習中のパスミス回数を「1セッション5回以内」に抑え、強豪校に並ぶ集中力を養う。"
  },
  winter: {
    title: "冬：個・組織の土台作り期「フィジカル強化と緊密な連動性」",
    goals: [
      { id: "g1", text: "コンタクト強度を上げ、試合を通して当たり負けない肉体と意識を作る", done: true },
      { id: "g2", text: "相手の戦術（ダブルピヴォットなど）に対して試合中に臨機応変にDFをチェンジできる", done: false },
      { id: "g3", text: "速攻の二次攻撃（2次速攻）において、バックプレーヤーが適切なタイミングで波状参加できる", done: false },
      { id: "g4", text: "全員がシュート成功率65%以上を目指し、特にノーマークシュートを外さない", done: false }
    ],
    benchmark: "【全国基準目標】1試合走りきれる心肺機能を獲得（シャトルラン目標値：平均115回超）"
  },
  spring: {
    title: "春：実戦・県予選突破期「戦術の精度極大化と勝負強さの追求」",
    goals: [
      { id: "g1", text: "県上位校との練習試合で、DFの崩壊による連続失点を3点以内に留める", done: false },
      { id: "g2", text: "マンツーマンDFや変則DFを仕掛けられた際、パニックにならずに即座に対応する", done: false },
      { id: "g3", text: "7mスローのシューターを3人以上確立し、高い決定率（80%以上）をキープする", done: false },
      { id: "g4", text: "試合終盤の「ラスト3分」におけるマイボール・相手ボールの状況別時間稼ぎ・得点パターン構築", done: false }
    ],
    benchmark: "【全国基準目標】地区大会・県大会でシード権を獲得、平均失点「20点以下」に抑える強固なDF組織。"
  },
  summer: {
    title: "夏：IH本選・最終調整期「全国での1勝、そして日本一への挑戦」",
    goals: [
      { id: "g1", text: "全国のメガパワー・高身長DFに対するシュートバリエーション（アンダーシュート、ブラインドシュート等）の確立", done: false },
      { id: "g2", text: "連戦に耐え抜く徹底的なコンディショニングと怪我防止のセルフケア定着", done: false },
      { id: "g3", text: "猛暑下の体育館でも40分間集中を維持する徹底した給水とメンタルコントロール", done: false },
      { id: "g4", text: "チームが一丸となり、コート内外問わず「全員が主役」という強い結束を誇る状態", done: false }
    ],
    benchmark: "【全国基準目標】対戦相手の映像分析を1時間で行い、翌日の試合用の対策（相手エースの無力化計画）を即興で立てられる戦術脳。"
  }
};

// ==========================================
// 戦術盤SVGコンポーネント（静的・インタラクティブ）
// ==========================================
function TacticalBoard({ type }) {
  return (
    <div className="w-full bg-[#111827] border border-gray-700 rounded-xl p-4 overflow-hidden shadow-inner relative">
      <div className="absolute top-2 left-3 bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] px-2 py-0.5 rounded font-mono uppercase tracking-widest">
        TACTIC BOARD: {type ? type.toUpperCase() : "GENERAL"}
      </div>
      
      {/* ハンドボールコート半面SVG */}
      <svg viewBox="0 0 400 300" className="w-full h-auto mt-4 max-h-[220px]">
        {/* コート枠・床（木目や青いゴムコートを意識したダークブルー） */}
        <rect x="0" y="0" width="400" height="300" fill="#0f172a" rx="8" />
        <line x1="200" y1="0" x2="200" y2="300" stroke="#475569" strokeWidth="2" strokeDasharray="5,5" />
        
        {/* ゴールエリアライン（6m）：本来は半円だがSVGで見映え良く表現 */}
        <path d="M 0,220 C 50,220 120,190 120,150 C 120,110 50,80 0,80" fill="none" stroke="#38bdf8" strokeWidth="3" />
        
        {/* フリースローライン（9m）：破線 */}
        <path d="M 0,250 C 80,250 170,210 170,150 C 170,90 80,50 0,50" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,4" />
        
        {/* ゴール */}
        <rect x="0" y="125" width="10" height="50" fill="none" stroke="#f43f5e" strokeWidth="3" />
        <line x1="10" y1="125" x2="10" y2="175" stroke="#ffffff" strokeWidth="3" />
        
        {/* --- ドリルに応じた作戦盤アノテーション --- */}
        {type === "contact" && (
          <>
            {/* ディフェンス O1 */}
            <circle cx="105" cy="150" r="10" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" />
            <text x="101" y="154" fill="#fff" fontSize="10" fontWeight="bold">D</text>
            
            {/* オフェンス X1 */}
            <circle cx="140" cy="150" r="10" fill="#3b82f6" stroke="#fff" strokeWidth="1.5" />
            <text x="136" y="154" fill="#fff" fontSize="10" fontWeight="bold">O</text>
            
            {/* 進行方向（矢印） */}
            <path d="M 140,150 L 115,150" stroke="#eab308" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 105,150 L 95,150" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" />
            
            {/* ボールマーク */}
            <circle cx="145" cy="142" r="4" fill="#eab308" />
            
            {/* 説明テキスト */}
            <text x="160" y="145" fill="#94a3b8" fontSize="11">オフェンス突破を</text>
            <text x="160" y="160" fill="#f43f5e" fontSize="11" fontWeight="bold">胸(D)でコンタクト</text>
          </>
        )}

        {type === "slide" && (
          <>
            {/* DF1, DF2 */}
            <circle cx="100" cy="120" r="10" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" />
            <text x="96" y="124" fill="#fff" fontSize="10" fontWeight="bold">D1</text>
            <circle cx="100" cy="180" r="10" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" />
            <text x="96" y="184" fill="#fff" fontSize="10" fontWeight="bold">D2</text>
            
            {/* OF1, OF2 */}
            <circle cx="145" cy="115" r="10" fill="#3b82f6" stroke="#fff" strokeWidth="1.5" />
            <text x="141" y="119" fill="#fff" fontSize="10" fontWeight="bold">O1</text>
            <circle cx="135" cy="165" r="10" fill="#3b82f6" stroke="#fff" strokeWidth="1.5" />
            <text x="131" y="169" fill="#fff" fontSize="10" fontWeight="bold">O2</text>
            
            {/* 連動スライド矢印 */}
            <path d="M 100,120 Q 90,140 100,165" stroke="#a855f7" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrow)" />
            <text x="65" y="145" fill="#a855f7" fontSize="10">スライドフォロー</text>
            
            <text x="160" y="115" fill="#94a3b8" fontSize="10">O1カットイン誘発</text>
            <text x="160" y="185" fill="#94a3b8" fontSize="10">O2のクロスへ対応</text>
          </>
        )}

        {type === "free-throw" && (
          <>
            {/* DF壁 */}
            <circle cx="70" cy="120" r="8" fill="#f43f5e" stroke="#fff" />
            <circle cx="70" cy="140" r="8" fill="#f43f5e" stroke="#fff" />
            <circle cx="70" cy="160" r="8" fill="#f43f5e" stroke="#fff" />
            
            {/* 壁形成の指導 */}
            <line x1="70" y1="110" x2="70" y2="170" stroke="#ef4444" strokeWidth="2" />
            
            {/* パサー(O) */}
            <circle cx="130" cy="140" r="10" fill="#3b82f6" stroke="#fff" />
            <text x="126" y="144" fill="#fff" fontSize="10" fontWeight="bold">O</text>
            <circle cx="135" cy="135" r="3" fill="#eab308" /> {/* ボール */}
            
            {/* 壁の距離 */}
            <line x1="70" y1="140" x2="130" y2="140" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
            <text x="90" y="133" fill="#94a3b8" fontSize="9">3m確保</text>
            
            <text x="160" y="240" fill="#eab308" fontSize="11" fontWeight="bold">クイックスタート阻止！</text>
          </>
        )}

        {type === "fastbreak-1" && (
          <>
            {/* ゴール前のキーパー(GK) */}
            <circle cx="20" cy="150" r="10" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
            <text x="13" y="154" fill="#fff" fontSize="10" fontWeight="bold">GK</text>
            
            {/* 爆走するウイング (O) */}
            <circle cx="150" cy="45" r="10" fill="#3b82f6" stroke="#fff" strokeWidth="1.5" />
            <text x="145" y="49" fill="#fff" fontSize="10" fontWeight="bold">LW</text>
            
            {/* 爆走パスライン */}
            <path d="M 25,140 Q 70,60 140,48" stroke="#eab308" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrow)" />
            <text x="45" y="85" fill="#eab308" fontSize="10" transform="rotate(-30 45 85)">1.5秒ファーストパス</text>
            
            {/* 走るベクトル */}
            <path d="M 150,45 L 230,45" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="170" y="38" fill="#3b82f6" fontSize="10">全力スプリント</text>
          </>
        )}

        {type === "fastbreak-2" && (
          <>
            {/* ボール保持したLW */}
            <circle cx="230" cy="45" r="10" fill="#3b82f6" stroke="#fff" />
            <text x="223" y="49" fill="#fff" fontSize="9" fontWeight="bold">LW</text>
            <circle cx="235" cy="38" r="3" fill="#eab308" />
            
            {/* 後ろから走り込むセンター(CB) */}
            <circle cx="160" cy="150" r="10" fill="#3b82f6" stroke="#fff" />
            <text x="153" y="154" fill="#fff" fontSize="9" fontWeight="bold">CB</text>
            
            {/* パス＆走り込み */}
            <path d="M 230,45 L 170,140" stroke="#eab308" strokeWidth="2" strokeDasharray="3,2" markerEnd="url(#arrow)" />
            <path d="M 160,150 L 110,150" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
            
            {/* 相手DF */}
            <circle cx="95" cy="140" r="8" fill="#f43f5e" stroke="#fff" />
            <circle cx="95" cy="165" r="8" fill="#f43f5e" stroke="#fff" />
            
            <text x="175" y="110" fill="#eab308" fontSize="10">2次速攻パス</text>
            <text x="175" y="170" fill="#3b82f6" fontSize="10">トレイルラン(走り込み)</text>
          </>
        )}

        {type === "offense-1" && (
          <>
            {/* OF3人連動 */}
            <circle cx="170" cy="100" r="10" fill="#3b82f6" stroke="#fff" />
            <text x="163" y="104" fill="#fff" fontSize="9">LB</text>
            <circle cx="180" cy="150" r="10" fill="#3b82f6" stroke="#fff" />
            <text x="173" y="154" fill="#fff" fontSize="9">CB</text>
            
            {/* クロス・パラレル軌道 */}
            <path d="M 170,100 Q 140,120 120,110" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 180,150 Q 150,110 135,130" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2,2" />
            
            {/* 相手DFのズレ */}
            <circle cx="100" cy="115" r="9" fill="#f43f5e" stroke="#fff" />
            <text x="96" y="119" fill="#fff" fontSize="8">D</text>
            <path d="M 100,115 L 85,130" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2,2" />
            
            <text x="195" y="115" fill="#38bdf8" fontSize="11">パラレル崩し</text>
          </>
        )}

        {/* デフォルト（復習用など） */}
        {type && type.startsWith("review") && (
          <>
            <circle cx="120" cy="150" r="12" fill="#eab308" stroke="#fff" strokeWidth="2" />
            <text x="113" y="154" fill="#1e293b" fontSize="11" fontWeight="bold">復習</text>
            
            <circle cx="180" cy="150" r="10" fill="#3b82f6" stroke="#fff" />
            <text x="176" y="154" fill="#fff" fontSize="10">O</text>
            
            <path d="M 170,150 L 135,150" stroke="#475569" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrow)" />
            
            <text x="150" y="190" fill="#94a3b8" fontSize="11" textAnchor="middle">基本に立ち戻って徹底矯正</text>
          </>
        )}

        {/* マーカー定義 */}
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#fff" />
          </marker>
        </defs>
      </svg>
      <div className="text-right text-[10px] text-gray-500 mt-1">※青=OF / 赤=DF / 黄=ボール / 緑=GK</div>
    </div>
  );
}

// ==========================================
// 模擬動画プレーヤー（クリックするとシミュレーション再生する）
// ==========================================
function VideoPlayer({ title }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 150);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full bg-[#1e293b] border border-gray-700 rounded-xl overflow-hidden shadow-md relative">
      {/* ビデオサムネイル表示 / 再生表示 */}
      <div className="relative aspect-video w-full bg-slate-900 flex flex-col items-center justify-center">
        {isPlaying ? (
          // 再生中のシミュレーションアニメーション
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#0b1329] overflow-hidden">
            <div className="w-16 h-16 border-4 border-t-red-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4" />
            <p className="text-red-400 font-bold text-sm animate-pulse">【模擬動画再生中...】</p>
            <p className="text-gray-400 text-xs mt-1 px-4">{title}</p>
            
            {/* アニメーション用動くボール */}
            <div 
              className="absolute w-6 h-6 bg-yellow-500 rounded-full shadow-lg flex items-center justify-center text-[8px] font-bold text-slate-900 transition-all duration-300"
              style={{
                top: `${40 + Math.sin(progress / 5) * 20}%`,
                left: `${10 + progress * 0.8}%`
              }}
            >
              🏐
            </div>
          </div>
        ) : (
          // サムネイル表示
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-slate-900/40 flex flex-col justify-between p-4">
            <span className="self-end bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
              LIVE COACHING VIDEO
            </span>
            <div className="flex flex-col items-center justify-center self-center my-auto">
              <button 
                onClick={handlePlayToggle}
                className="w-16 h-16 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-400"
              >
                <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <p className="text-xs text-gray-400 mt-2 font-medium">クリックして解説映像をスタート</p>
            </div>
            <div>
              <p className="text-white text-xs font-bold line-clamp-1">{title}</p>
              <p className="text-gray-400 text-[10px]">提供：Road to IH 映像コーチングチーム</p>
            </div>
          </div>
        )}
      </div>

      {/* シミュレーションシークバー */}
      <div className="bg-slate-950 p-2 flex items-center justify-between text-xs text-gray-400">
        <button 
          onClick={handlePlayToggle}
          className="text-red-500 hover:text-red-400 font-bold px-2 py-0.5 border border-red-500/30 rounded text-[11px]"
        >
          {isPlaying ? "PAUSE" : "PLAY"}
        </button>
        <div className="flex-1 mx-3 h-1.5 bg-slate-800 rounded overflow-hidden">
          <div className="h-full bg-red-600 transition-all duration-150" style={{ width: `${progress}%` }} />
        </div>
        <span className="font-mono text-[10px]">
          {isPlaying ? `00:${Math.floor(progress/5).toString().padStart(2, '0')}` : "00:00"} / 00:20
        </span>
      </div>
    </div>
  );
}

// ==========================================
// メインコンポーネント App
// ==========================================
export default function App() {
  // アプリケーション全体の状態管理
  const [currentTab, setCurrentTab] = useState("home"); // "home" | "schedule" | "roadmap" | "check"
  
  // 診断結果（初期値：秋 ＆ ディフェンス）
  const [season, setSeason] = useState("autumn"); // "autumn" | "winter" | "spring" | "summer"
  const [focus, setFocus] = useState("defense"); // "defense" | "fastbreak" | "offense"
  
  // スケジュールタイプ（平日2時間 / 休日4時間）
  const [practiceType, setPracticeType] = useState("weekday"); // "weekday" | "weekend"

  // 1タップ自動調整のステータス（adaptiveState）
  // "normal": 通常の次のレベル / "review": 前日の課題が達成できずに復習モードに入った状態
  const [adaptiveState, setAdaptiveState] = useState("normal");
  
  // 進捗ステップ (1 ~ 3: 現在のカテゴリ練習メニュー配列の添字に連動)
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // ロードマップチェックリストの状態
  const [roadmapGoals, setRoadmapGoals] = useState(ROADMAP_TEMPLATES.autumn.goals);

  // トースト・通知メッセージ用のステータス
  const [notification, setNotification] = useState(null);

  // 診断内容が変わるたびにロードマップを更新
  useEffect(() => {
    if (ROADMAP_TEMPLATES[season]) {
      setRoadmapGoals(ROADMAP_TEMPLATES[season].goals);
    }
  }, [season]);

  // トースト表示用の補助関数
  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // 診断実行
  const handleDiagnosisSubmit = (selectedSeason, selectedFocus) => {
    setSeason(selectedSeason);
    setFocus(selectedFocus);
    setCurrentStepIndex(0);
    setAdaptiveState("normal");
    showNotification("診断完了！チームの課題に合わせた最新のカリキュラムを生成しました。", "success");
    setCurrentTab("schedule");
  };

  // ロードマップ目標のトグル
  const handleToggleGoal = (id) => {
    setRoadmapGoals(prev => 
      prev.map(goal => goal.id === id ? { ...goal, done: !goal.done } : goal)
    );
  };

  // 成果チェックの決定（⭕達成 or ❌未達成）
  const handleProgressCheckSubmit = (isAchieved) => {
    const drillSet = DRILL_DATABASE[focus];
    const maxIndex = drillSet.drills.length - 1;

    if (isAchieved) {
      // 達成：次のステップへ進む
      setAdaptiveState("normal");
      if (currentStepIndex < maxIndex) {
        setCurrentStepIndex(prev => prev + 1);
        showNotification("素晴らしい！今日の目標を見事クリアしました。明日は次の『ステップアップ練習』に移行します！", "success");
      } else {
        // 全ステップ完了した場合は最初に戻るか、他の課題を促す
        setCurrentStepIndex(0);
        showNotification("全ステップ制覇！圧倒的成長です。他の課題や時期を変えた診断も行ってみましょう！", "success");
      }
    } else {
      // 未達成：復習モードをオンにする（スケジュールが復習メニューに切り替わる）
      setAdaptiveState("review");
      showNotification("【1タップ自動調整発動】焦る必要はありません。明日の練習メニューは「課題徹底克服の復習メニュー」に自動調整されました。", "warning");
    }
    // 処理後、即座にスケジュール画面に戻して変化を確認させる
    setCurrentTab("schedule");
  };

  // 現在表示すべき練習メニューを取得
  const getCurrentDrill = () => {
    const drillSet = DRILL_DATABASE[focus];
    if (adaptiveState === "review") {
      // 復習モードのときは復習用メニューを返す
      return drillSet.reviewDrill;
    }
    // 通常時は現在のステップインデックスに合わせたメニューを返す
    return drillSet.drills[currentStepIndex] || drillSet.drills[0];
  };

  const activeDrill = getCurrentDrill();

  // シーズン名・課題名の日本語変換
  const getSeasonLabel = (key) => {
    const labels = { autumn: "秋(始動期)", winter: "冬(土台作り)", spring: "春(実戦期)", summer: "夏(最終調整)" };
    return labels[key] || key;
  };
  const getFocusLabel = (key) => {
    const labels = { defense: "ディフェンス", fastbreak: "超速攻", offense: "オフェンス" };
    return labels[key] || key;
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 font-sans flex flex-col items-center">
      
      {/* スマホサイズに最大幅を制限したプレミアムモバイル風コンテナ */}
      <div className="w-full max-w-md bg-[#0f1424] min-h-screen flex flex-col justify-between shadow-2xl relative border-x border-gray-800 pb-20">
        
        {/* ==========================================
            HEADER
            ========================================== */}
        <header className="bg-[#151c33] border-b border-slate-800 p-4 sticky top-0 z-40 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* ロゴ風エンブレム */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center font-black text-white text-sm shadow-lg shadow-red-900/40">
                IH
              </div>
              <div>
                <h1 className="text-base font-black tracking-wider bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Road to IH
                </h1>
                <p className="text-[9px] text-red-400 font-bold tracking-widest uppercase">Handball AI Coach</p>
              </div>
            </div>

            {/* 現在のステータスバッジ */}
            <div className="text-right">
              <span className="inline-block bg-[#1e293b] text-[10px] text-gray-300 px-2 py-0.5 rounded-full border border-gray-700">
                {getSeasonLabel(season)} : {getFocusLabel(focus)}
              </span>
            </div>
          </div>

          {/* 自動調整モード警告インジケータ（復習モード時にヘッダーに常時警告を表示） */}
          {adaptiveState === "review" && (
            <div className="mt-2 bg-amber-500/15 border border-amber-500/30 rounded p-1.5 flex items-center justify-between animate-pulse">
              <span className="text-[10px] text-amber-400 font-bold flex items-center">
                ⚠️ アダプティブ自動調整：【復習モード発動中】
              </span>
              <button 
                onClick={() => {
                  setAdaptiveState("normal");
                  showNotification("通常スケジュールに戻しました。", "info");
                }} 
                className="text-[9px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded hover:bg-amber-400 transition"
              >
                通常に戻す
              </button>
            </div>
          )}
        </header>

        {/* ==========================================
            NOTIFICATION TOAST
            ========================================== */}
        {notification && (
          <div className="absolute top-16 left-4 right-4 z-50 animate-bounce">
            <div className={`p-3.5 rounded-xl shadow-2xl flex items-start space-x-2 border text-xs leading-relaxed ${
              notification.type === "success" 
                ? "bg-[#10b981]/90 border-[#10b981] text-white" 
                : notification.type === "warning"
                ? "bg-[#f59e0b]/95 border-[#f59e0b] text-slate-950 font-medium"
                : "bg-blue-900/90 border-blue-500 text-white"
            }`}>
              <div className="font-bold shrink-0">ℹ️</div>
              <div>{notification.message}</div>
            </div>
          </div>
        )}

        {/* ==========================================
            MAIN CONTENT AREA
            ========================================== */}
        <main className="p-4 flex-1 overflow-y-auto">

          {/* ① トップ・診断ページ (home) */}
          {currentTab === "home" && (
            <div className="space-y-6">
              {/* ヒーローキャッチコピー */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-red-900/40 via-slate-900/80 to-slate-950 p-5 border border-red-500/20 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
                <h2 className="text-xl font-extrabold text-white leading-snug">
                  自分たちで考えて強くなる<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
                    全国基準の「AIコーチ」
                  </span>
                </h2>
                <p className="text-xs text-gray-300 mt-2">
                  Road to IHは、キャプテンと選手のための自律型練習スケジューラーです。現在の状況から「逆算」して最高のメニューを届けます。
                </p>
              </div>

              {/* クイック診断フォーム */}
              <div className="bg-[#161d30] rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                  <span className="text-lg">📋</span>
                  <h3 className="font-bold text-sm text-gray-200">2ステップ即時カリキュラム診断</h3>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const targetSeason = e.target.seasonSelect.value;
                  const targetFocus = e.target.focusSelect.value;
                  handleDiagnosisSubmit(targetSeason, targetFocus);
                }} className="space-y-4">
                  {/* 時期（診断項目 1） */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 font-semibold">
                      ステップ 1: 現在のチームの時期・フェーズ
                    </label>
                    <select 
                      name="seasonSelect"
                      defaultValue={season}
                      className="w-full bg-[#0f1424] border border-slate-700 rounded-lg p-2.5 text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="autumn">秋（新チーム始動期：基礎土台の構築）</option>
                      <option value="winter">冬（個・組織の土台作り：肉体＆戦術連動）</option>
                      <option value="spring">春（実戦突破期：完成度と勝負強さ向上）</option>
                      <option value="summer">夏（インターハイ本選：日本一への挑戦）</option>
                    </select>
                  </div>

                  {/* 課題（診断項目 2） */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 font-semibold">
                      ステップ 2: 今一番解決したい「チーム最大の弱点」
                    </label>
                    <select 
                      name="focusSelect"
                      defaultValue={focus}
                      className="w-full bg-[#0f1424] border border-slate-700 rounded-lg p-2.5 text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="defense">ディフェンス崩壊、足が止まる、接触を嫌がる</option>
                      <option value="fastbreak">速攻展開力不足、パスミスの多発、カウンター遅れ</option>
                      <option value="offense">セットオフェンス得点力不足、並走のズレを作れない</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold rounded-xl text-xs tracking-wider uppercase transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-red-900/30"
                  >
                    カリキュラム即時自動生成 ⚡
                  </button>
                </form>
              </div>

              {/* メリット＆使い方のガイドライン */}
              <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800 text-xs space-y-2.5 text-gray-400">
                <h4 className="font-bold text-gray-200 flex items-center space-x-1">
                  <span>💡</span> <span>Road to IH の使い方フロー</span>
                </h4>
                <ol className="list-decimal pl-4 space-y-1.5">
                  <li>本日の練習時間を設定し、自動生成スケジュールを把握。</li>
                  <li>戦術盤イラストと全国レベル意識ポイントを徹底共有して実践。</li>
                  <li>練習後、キャプテンを中心に「成果チェック」を1タップ入力。</li>
                  <li>達成度に応じて、AIが自動で翌日の練習メニューを個別調整！</li>
                </ol>
              </div>
            </div>
          )}

          {/* ② 今日の練習スケジュール画面 (schedule) */}
          {currentTab === "schedule" && (
            <div className="space-y-5">
              
              {/* 練習時間切り替えトグル */}
              <div className="bg-[#161d30] rounded-xl p-1.5 flex border border-slate-800">
                <button
                  onClick={() => setPracticeType("weekday")}
                  className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all ${
                    practiceType === "weekday" 
                      ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  平日用 (2時間パック)
                </button>
                <button
                  onClick={() => setPracticeType("weekend")}
                  className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all ${
                    practiceType === "weekend" 
                      ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  休日用 (4時間パック)
                </button>
              </div>

              {/* 現在のスケジュール情報ヘッダー */}
              <div className="flex justify-between items-center bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">TODAY'S THEME</p>
                  <p className="text-xs font-bold text-white">
                    {adaptiveState === "review" ? "⚠️ 【課題復習】" : `Step ${currentStepIndex + 1}: `}
                    {activeDrill.stepName || activeDrill.title}
                  </p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 px-2 py-1 rounded text-right">
                  <span className="text-[10px] text-red-400 block font-bold">総練習時間</span>
                  <span className="text-xs font-mono font-bold text-white">
                    {practiceType === "weekday" ? "120分" : "240分"}
                  </span>
                </div>
              </div>

              {/* スケジュール タイムライン */}
              <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
                
                {/* 1. ウォーミングアップ */}
                <div className="relative pl-7 group">
                  {/* マーカーポイント */}
                  <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-slate-700 border-2 border-slate-950 group-hover:bg-red-500 transition-colors" />
                  <div>
                    <span className="text-[10px] font-mono text-gray-500">
                      {practiceType === "weekday" ? "00:00 - 00:20 (20分)" : "00:00 - 00:40 (40分)"}
                    </span>
                    <h4 className="text-xs font-bold text-gray-200 mt-0.5">W-up: ダイナミックストレッチ ＆ フットワーク</h4>
                    <p className="text-[11px] text-gray-400 mt-1">
                      ハンドボールに必要な股関節と肩甲骨の可動域を広げ、アジリティを高めるアスタリスクフットワーク。
                    </p>
                  </div>
                </div>

                {/* 2. パス＆キャッチ */}
                <div className="relative pl-7 group">
                  <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-slate-700 border-2 border-slate-950" />
                  <div>
                    <span className="text-[10px] font-mono text-gray-500">
                      {practiceType === "weekday" ? "00:20 - 00:45 (25分)" : "00:40 - 01:10 (30分)"}
                    </span>
                    <h4 className="text-xs font-bold text-gray-200 mt-0.5">Basic: 対面四角パス ＆ クイックリリース</h4>
                    <p className="text-[11px] text-gray-400 mt-1">
                      動きながらキャッチし、0.3秒以内で逆サイドに放つスナップパス。パスミスの徹底的な排除を意識。
                    </p>
                  </div>
                </div>

                {/* 3. メイン練習（★ここが診断＆自動調整によって可変するコアメニュー★） */}
                <div className="relative pl-7">
                  {/* アクティブな練習を強調するための光るインジケータ */}
                  <div className="absolute left-1 top-1 w-[18px] h-[18px] rounded-full bg-red-500/20 flex items-center justify-center border border-red-500">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  </div>
                  
                  <div className="bg-[#131a30] border-2 border-red-500/40 rounded-xl p-4 mt-1 shadow-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wide">
                        今日のメイン練習 ({activeDrill.time})
                      </span>
                      {adaptiveState === "review" && (
                        <span className="bg-amber-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded animate-bounce">
                          復習
                        </span>
                      )}
                    </div>

                    {/* タイトルと説明 */}
                    <div>
                      <h4 className="text-sm font-black text-white leading-tight">{activeDrill.title}</h4>
                      <p className="text-[11px] text-gray-300 mt-1.5 leading-relaxed bg-[#0b0f19] p-2.5 rounded-lg border border-slate-800">
                        {activeDrill.desc}
                      </p>
                    </div>

                    {/* 1. 戦術盤SVG */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 block">▼ コート展開図（作戦盤）</span>
                      <TacticalBoard type={activeDrill.boardType} />
                    </div>

                    {/* 2. YouTube動画埋め込み（模擬プレーヤー） */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 block">▼ 動きの参考イメージ映像</span>
                      <VideoPlayer title={activeDrill.videoTitle} />
                    </div>

                    {/* 3. 全国基準の意識ポイント */}
                    <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-xl p-3">
                      <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-bold mb-1.5">
                        <span>🏆</span>
                        <span>全国基準の意識ポイント</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-gray-300">
                        {activeDrill.points.map((p, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-amber-500 mr-1.5 shrink-0">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 4. 実戦ゲーム or 総合練習 */}
                <div className="relative pl-7 group">
                  <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-slate-700 border-2 border-slate-950" />
                  <div>
                    <span className="text-[10px] font-mono text-gray-500">
                      {practiceType === "weekday" ? "01:30 - 01:50 (20分)" : "02:10 - 03:20 (70分)"}
                    </span>
                    <h4 className="text-xs font-bold text-gray-200 mt-0.5">Game: 攻守切替重視のミニゲーム / 6on6</h4>
                    <p className="text-[11px] text-gray-400 mt-1">
                      本日のメイン練習である「{activeDrill.stepName || "基礎コンタクト/スライド"}」が試合で実践できているかを厳しくチェック。できなければ即座にホイッスルで止めて確認。
                    </p>
                  </div>
                </div>

                {/* 5. クールダウン */}
                <div className="relative pl-7 group">
                  <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-slate-700 border-2 border-slate-950" />
                  <div>
                    <span className="text-[10px] font-mono text-gray-500">
                      {practiceType === "weekday" ? "01:50 - 02:00 (10分)" : "03:20 - 04:00 (40分)"}
                    </span>
                    <h4 className="text-xs font-bold text-gray-200 mt-0.5">Down: ストレッチ ＆ 本日の振り返りミーティング</h4>
                    <p className="text-[11px] text-gray-400 mt-1">
                      今日の設定目標が「達成(⭕)」できたか、それとも「未達成(❌)」だったかをチーム全員で投票・合意。
                    </p>
                  </div>
                </div>

              </div>

              {/* 成果チェックへの誘導バナー */}
              <div className="bg-[#161d30] border border-slate-800 rounded-xl p-4 flex justify-between items-center">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white">練習は終わりましたか？</p>
                  <p className="text-[10px] text-gray-400">成果を記録して、明日のスケジュールを自動調整しましょう。</p>
                </div>
                <button
                  onClick={() => setCurrentTab("check")}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-md transition-all active:scale-95"
                >
                  成果チェックへ ➔
                </button>
              </div>

            </div>
          )}

          {/* ③ 1ヶ月の目標ロードマップ画面 (roadmap) */}
          {currentTab === "roadmap" && (
            <div className="space-y-5">
              
              {/* ロードマップタイトルカード */}
              <div className="bg-gradient-to-r from-indigo-900/60 to-[#151c33] border border-indigo-500/20 rounded-2xl p-4">
                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">MONTHLY ROADMAP</p>
                <h3 className="text-sm font-black text-white mt-1 leading-snug">
                  {ROADMAP_TEMPLATES[season]?.title || "1ヶ月のロードマップ"}
                </h3>
                
                {/* 達成状況メーター */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400">ミッションクリア率</span>
                    <span className="text-indigo-400 font-bold font-mono">
                      {Math.round((roadmapGoals.filter(g => g.done).length / roadmapGoals.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${(roadmapGoals.filter(g => g.done).length / roadmapGoals.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* ミッションチェックリスト */}
              <div className="bg-[#161d30] rounded-2xl p-5 border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                  <span className="text-lg">🎯</span>
                  <h4 className="font-bold text-sm text-gray-200">今月の必須クリア要件（チェックリスト）</h4>
                </div>

                <p className="text-[11px] text-gray-400 leading-relaxed">
                  全国大会レベルへ到達するために、今月中に必ずチームで合意・習得すべきチェックポイントです。タップして達成記録を残しましょう。
                </p>

                <div className="space-y-3">
                  {roadmapGoals.map((goal) => (
                    <div 
                      key={goal.id}
                      onClick={() => handleToggleGoal(goal.id)}
                      className={`flex items-start space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        goal.done 
                          ? "bg-indigo-500/5 border-indigo-500/30 text-gray-300" 
                          : "bg-slate-900/40 border-slate-800 text-gray-400 hover:border-slate-700"
                      }`}
                    >
                      {/* カスタムチェックボックス */}
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                        goal.done 
                          ? "bg-indigo-600 border-indigo-500 text-white" 
                          : "border-slate-700"
                      }`}>
                        {goal.done && (
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-xs leading-relaxed ${goal.done ? "line-through text-gray-500" : ""}`}>
                        {goal.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 全国指標枠 */}
              <div className="bg-[#111827] border border-amber-500/20 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold mb-1.5">
                  <span>🏆</span>
                  <span>全国基準ベンチマーク目標値</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  {ROADMAP_TEMPLATES[season]?.benchmark}
                </p>
              </div>

            </div>
          )}

          {/* ④ 成果チェック画面 (check) */}
          {currentTab === "check" && (
            <div className="space-y-6">
              
              {/* 今日のおさらいタイトル */}
              <div className="text-center space-y-1 bg-slate-900/60 p-4 border border-slate-800 rounded-xl">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">TODAY'S MISSION</p>
                <h3 className="text-sm font-black text-white">{activeDrill.title}</h3>
                <p className="text-[11px] text-gray-400 mt-1">「全国基準の意識ポイント」を意識して徹底的にやり切れましたか？</p>
              </div>

              {/* でっかい達成/未達成選択ボタン */}
              <div className="grid grid-cols-2 gap-4">
                {/* 達成ボタン */}
                <button
                  onClick={() => handleProgressCheckSubmit(true)}
                  className="bg-gradient-to-b from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 border-b-4 border-emerald-700 text-white p-6 rounded-2xl flex flex-col items-center justify-center space-y-3 transition-transform active:scale-95 focus:outline-none"
                >
                  <span className="text-4xl">⭕</span>
                  <span className="text-sm font-black tracking-wider">達成</span>
                  <span className="text-[10px] opacity-80">明日は次のレベルへ！</span>
                </button>

                {/* 未達成ボタン */}
                <button
                  onClick={() => handleProgressCheckSubmit(false)}
                  className="bg-gradient-to-b from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 border-b-4 border-red-700 text-white p-6 rounded-2xl flex flex-col items-center justify-center space-y-3 transition-transform active:scale-95 focus:outline-none"
                >
                  <span className="text-4xl">❌</span>
                  <span className="text-sm font-black tracking-wider">未達成</span>
                  <span className="text-[10px] opacity-80">明日復習メニューで克服！</span>
                </button>
              </div>

              {/* 1タップ自動調整システムの説明 */}
              <div className="bg-[#161d30] border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="font-bold text-xs text-slate-200 flex items-center space-x-1">
                  <span>⚙️</span>
                  <span>1タップ自動調整のロジック</span>
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  「未達成」を選んでもスケジュールが複雑に崩壊することはありません。翌日のメイン練習のみが自動的に「前日の課題をクリアするための土台・復習・基礎強化」の特化メニューに置き換わり、翌々日にもう一度ステップアップへの再挑戦権が与えられます。
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-[11px] text-gray-400">
                  <span>現在の進捗状況：</span>
                  <span className="font-bold text-red-400">
                    Step {currentStepIndex + 1} / {DRILL_DATABASE[focus]?.drills.length}
                  </span>
                </div>
              </div>

            </div>
          )}

        </main>

        {/* ==========================================
            BOTTOM NAVIGATION BAR
            ========================================== */}
        <nav className="absolute bottom-0 left-0 right-0 bg-[#0c1122]/95 backdrop-blur border-t border-slate-800 grid grid-cols-4 py-2 text-center shadow-lg z-40">
          {/* ホーム / 診断 */}
          <button 
            onClick={() => setCurrentTab("home")}
            className={`flex flex-col items-center justify-center space-y-1 ${
              currentTab === "home" ? "text-red-500" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <span className="text-lg">📋</span>
            <span className="text-[9px] font-bold">診断/ホーム</span>
          </button>

          {/* 今日の練習 */}
          <button 
            onClick={() => setCurrentTab("schedule")}
            className={`flex flex-col items-center justify-center space-y-1 relative ${
              currentTab === "schedule" ? "text-red-500" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <span className="text-lg">⏱️</span>
            <span className="text-[9px] font-bold">今日の練習</span>
            {adaptiveState === "review" && (
              <span className="absolute top-1 right-5 w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            )}
          </button>

          {/* ロードマップ */}
          <button 
            onClick={() => setCurrentTab("roadmap")}
            className={`flex flex-col items-center justify-center space-y-1 ${
              currentTab === "roadmap" ? "text-red-500" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <span className="text-lg">🗺️</span>
            <span className="text-[9px] font-bold">ロードマップ</span>
          </button>

          {/* 成果チェック */}
          <button 
            onClick={() => setCurrentTab("check")}
            className={`flex flex-col items-center justify-center space-y-1 ${
              currentTab === "check" ? "text-red-500" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <span className="text-lg">✅</span>
            <span className="text-[9px] font-bold">成果チェック</span>
          </button>
        </nav>

      </div>
    </div>
  );
}