/*!
 * BudouX 0.9.3（日本語モデルのみ）— 日本語の文章を「意味のまとまり」で改行させるためのライブラリ
 * https://github.com/google/budoux
 * Copyright 2021 Google LLC / Licensed under the Apache License, Version 2.0
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * npm パッケージ budoux@0.9.3 の module/ 以下（parser.js, html_processor.js,
 * dom-browser.js, data/models/ja.js）を、ブラウザでそのまま読み込めるよう1ファイルにまとめたものです。
 * 中身は変更していません（import/export の行のみ除去）。通常は編集不要です。
 */
(function () {
"use strict";
const model = { "UW3": { "。": 7360, "の": 4478, "、": 5467, "に": 4332, "を": 6132, "が": 4564, "は": 4640, "と": 3616, "る": 3294, "も": 3679, "で": 3691, "な": 3076, "た": 2637, "て": 2778, "し": 367, "く": 2925, "う": 2530, "い": 2094, "へ": 2778, "ら": 1678, "こ": 101, "や": 2601, "っ": -1770, "？": 4309, "，": 4096, "］": 2437, "?": 4618, "ぐ": 2995, "ば": 2501, "り": 1280, "！": 4013, "か": 2214, "ん": 1050, "．": 2420, "ー": -201, "]": 3518, "…": 3108, "つ": 1382, "・": 1060, "ど": 1727, "お": -2039, "空": 1557, "）": 3352, "ッ": -2051, "」": 1826, "☆": 3579, "ス": -852, "だ": 1043, "ン": -561, "笑": 3646, "イ": -913, "♪": 2798, "「": -1952, "ろ": 1352, "方": 896, "日": 835, "中": 1208, "ず": 1777, "間": 982, "々": 2075, "部": 555, "京": -1392, "ゃ": 1324, "今": 1149, "ご": -1299, "★": 2969, "フ": -1592, "電": -1418, "プ": -1246, "分": 1196, "す": 1092, "あ": 1173, "人": 351, "大": -1213, "上": 655, "ぬ": 2076, "ぁ": 1705, "後": 1304, "せ": 623, "度": 1249, "０": -780, "時": 115, "〜": 942, "ア": -1081, "感": 471, "む": 1476, "観": -943, "都": -302, "ト": -111, "１": -1299, "き": 487, "ぶ": 1278, "え": 907, "然": 1179, "以": -932, "わ": -211, "新": -874, "”": 1254, "超": 1585, "さ": -175, "夜": 1532, "ラ": -254, "体": 903, "カ": -509, "ロ": -730, "変": 752, "[": -1016, "択": 968, "昔": 1717, "ド": -549, "品": 131, "シ": -711, "味": 546, "『": -819, "ち": 586, "光": -303, "［": -723, "ジ": -170, "水": 366, "年": 345, "秋": 1136, "タ": -123, "段": 63, "的": 403, "ぞ": 994, "学": -427, "皆": 782, "ぱ": 760, "果": 343, "ま": -23, "み": 213, "じ": 541, "　": 443, "発": -509, "最": -542, "素": -436, "自": -330, "題": 789, "ｏ": -447, "区": 905, "用": -431, "ね": 706, "料": -380, "：": 394, "場": -117, "一": -5, "よ": 394, "れ": 184, "番": 295, "系": 608, "色": 484, "機": -184, "バ": -222, "技": 242, "け": 109, "程": 512, "意": -156, "デ": -304, "行": -331, "斤": 515, "所": 259, "開": -195, "子": -227, "】": 434, "レ": -162, "入": -184, "ニ": -125, "ク": 107, "前": 217, "テ": -105, "』": 281, "月": 126, "週": 143, "不": -77, "代": -81, "モ": -107, "台": 228, "選": -94, "現": -51, "５": -42, "生": -29, "始": -33, "能": -16, "別": 12, "細": 12, "作": -4 }, "UW4": { "の": -4556, "。": -7968, "に": -4649, "、": -8112, "が": -4058, "は": -3839, "て": -3946, "る": -5834, "で": -3124, "を": -5180, "と": -3261, "っ": -4819, "か": -2902, "り": -4637, "う": -2814, "な": -2150, "ま": -1685, "た": -2023, "い": -1577, "し": -1955, "お": 899, "ら": -5266, "そ": 410, "だ": -2236, "れ": -4479, "す": -1643, "ん": -4505, "ち": -2418, "あ": 261, "ー": -2977, "き": -1845, "」": -6469, "も": -2929, "私": 2012, "「": 2340, "け": -3764, "や": -1388, "見": 1090, "く": -3067, "ご": 271, "よ": -1353, "み": -921, "大": 657, "一": 571, "思": 1141, "さ": -1761, "？": -5676, "[": 3543, "人": 503, "め": -2468, "』": -5121, "行": 433, "ン": -2261, "ッ": -2346, "！": -5212, "わ": -1741, "，": -4847, "じ": -2495, "・": -1449, "今": 1462, "ぐ": -1874, "?": -4410, "京": 357, "せ": -1944, "え": -2257, "時": 460, "１": 1029, "『": 981, "（": 2706, "使": 865, "合": -1649, "言": 384, "べ": -3202, "ろ": -3153, "何": 744, "デ": 611, "日": 270, "ル": -1115, "…": -3126, "食": 298, "ば": -2639, "．": -3347, "広": 604, "空": 1245, "場": 432, "へ": -1897, "自": 700, "笑": -3427, "つ": -1276, "特": 1375, "２": 814, "リ": -1049, "エ": 312, "［": 1695, "）": -4253, "煙": 2247, "ず": -2063, "帯": -1161, "多": 1190, "]": -1408, "ゃ": -2594, "最": 981, "当": 51, "効": 52, "ど": -875, "良": 92, "ね": -2455, "び": -1827, "綺": 2417, "］": -1498, "ゆ": -835, "携": 157, "ぁ": -1594, "間": -688, "来": 87, "手": 133, "ぶ": -1685, "タ": -314, "ト": -353, "ぎ": -1477, "ょ": -2003, "方": -480, "フ": -490, "ひ": 523, "”": -1346, "こ": -540, "ス": -165, "新": 376, "０": -429, "♪": -2073, "〜": -1746, "書": 612, "イ": -154, "的": -952, "僕": 1107, "☆": -1751, "ぼ": -998, "用": -624, "能": -710, "ュ": -782, "ざ": -1078, "無": 336, "む": -1295, "公": 390, "ぜ": -1511, "カ": 214, "不": 694, "本": -134, "回": -1178, "制": 816, "　": -1386, "小": 742, "物": -328, "バ": 289, "街": 639, "続": -658, "ぞ": -1183, "水": 309, "返": -339, "ほ": -348, "二": 611, "入": 101, "少": 281, "美": 242, "臭": 1205, "ｏ": -612, "機": -120, "取": -519, "誰": 1033, "ロ": -237, "げ": -904, "３": 429, "足": 653, "換": -667, "ド": -295, "づ": -762, "東": 761, "祭": 563, "夏": 517, "話": 370, "友": 83, "ク": -222, "系": 249, "楽": 371, "服": 813, "代": -215, "込": -584, "気": 73, "年": -370, "ニ": -239, "高": 102, "コ": 56, "表": 164, "切": -361, "オ": 148, "(": 594, "★": -836, "真": -515, "父": 496, "他": 144, "聞": 211, "ラ": -41, "【": 531, "買": 273, "グ": -136, "有": 290, "ビ": -137, "全": 101, "４": -171, "ム": -194, "度": -220, "狭": 322, "通": -56, "四": 277, "品": -182, "Ｓ": -129, "森": -444, "心": 71, "海": 140, "甘": 152, "サ": 4, "彼": 60, "家": 86, "鞍": 121, "頑": 133, "参": 81, "実": 46, "例": 93, "秋": 93, "＾": -101, "ミ": -33, "券": -54, "情": -21, "声": 12, "動": -8, "住": 4 }, "UW5": { "。": -2181, "、": -1080, "な": -670, "っ": 1246, "う": 445, "は": -1046, "に": -770, "で": -961, "き": 1106, "と": -893, "そ": -782, "る": 464, "す": -704, "い": 348, "を": -766, "え": 735, "の": -842, "べ": 2001, "ま": -102, "じ": 754, "し": -340, "ん": 981, "れ": 463, "動": 1426, "か": 192, "ラ": 506, "・": -978, "あ": -405, "め": 519, "帯": 337, "つ": 1089, "よ": -489, "さ": -314, "京": 107, "日": 574, "が": -572, "ル": -681, "」": -1106, "能": 72, "力": 489, "ト": -432, "ら": 246, "せ": -426, "ぼ": 1423, "供": 261, "ず": 803, "わ": 582, "へ": -999, "く": 352, "ン": -244, "年": 948, "だ": -492, "り": 191, "思": -353, "も": -225, "ち": 524, "］": -414, "使": -1240, "器": -238, "ざ": 338, "！": -301, "利": 788, "上": -434, "て": 206, "ス": -285, "イ": 193, "体": -1459, "．": -215, "水": -438, "ろ": -34, "ぎ": 321, "当": 615, "び": 599, "こ": 67, "む": 758, "電": -194, "バ": -53, "大": -252, "的": -257, "[": -400, "ュ": -267, "作": 359, "先": -820, "言": -228, "寺": -276, "？": -246, "景": 280, "…": -194, "本": 187, "所": 44, "々": 242, "ャ": 72, "一": -185, "Ｎ": 766, "グ": -100, "丈": 320, "葉": 122, "顔": -185, "回": 184, "ど": -9, "１": -105, "デ": -131, "見": -44, "ば": 13, "オ": -74, "２": -107, "ロ": 47, "目": -50, "要": 25 }, "UW2": { "。": -1620, "の": -946, "、": -1560, "を": -2541, "し": 196, "に": -1152, "か": 54, "と": -1195, "も": -954, "っ": 115, "が": -823, "な": -413, "れ": -84, "で": -1016, "ま": 345, "て": -905, "お": -1189, "以": 2487, "そ": -493, "す": 437, "だ": 363, "う": -614, "全": 1251, "一": 1233, "さ": 695, "く": -712, "少": 585, "い": -163, "は": -1040, "手": 1430, "ん": 242, "け": 161, "つ": -625, "見": -308, "め": 64, "結": 2131, "特": 666, "食": 260, "あ": -181, "毎": 1536, "わ": 353, "ゆ": 809, "法": 1381, "場": 220, "ラ": -521, "」": 196, "ほ": 743, "同": 531, "関": 1432, "味": 551, "良": 218, "る": -403, "水": 746, "人": 84, "選": 182, "ひ": -2140, "多": 534, "や": -610, "知": -972, "イ": -159, "た": -259, "ぱ": 270, "ど": -209, "随": 1589, "「": -319, "容": 1329, "？": -613, "ご": -480, "ぜ": 929, "サ": -584, "ー": 210, "グ": -441, "目": -751, "み": -120, "取": -397, "パ": 684, "本": 588, "０": 106, "我": -915, "り": -220, "境": -297, "１": 176, "和": 759, "能": 305, "２": -244, "ね": 352, "ぐ": -387, "メ": -40, "デ": -483, "大": 151, "ろ": -127, "，": -501, "新": -268, "々": 307, "ぶ": 84, "き": -126, "世": -382, "ノ": 436, "３": -336, "立": -474, "先": 380, "シ": -421, "］": -260, "?": -394, "ケ": -521, "安": -95, "４": 331, "バ": 409, "電": 275, "＾": 104, "作": -51, "甘": 16, "是": 537, "ば": -186, "三": 496, "級": 667, "言": -5, "格": 721, "ル": 36, "Ｐ": -621, "団": 645, "…": 248, "下": 303, "文": 118, "落": -523, "最": 236, "素": -401, "]": -188, "許": 532, "［": -53, "奇": 216, "ジ": -115, "フ": -49, "直": 306, "★": -385, "早": 191, "如": 419, "車": 70, "生": 97, "Ｈ": -149, "『": -201, "昔": 210, "次": -179, "家": 56, "残": 165, "百": -139, "レ": -86, "案": 142, "敗": 137, "５": -111, "ら": -17, "空": -21, "間": -12, "用": -29, "ア": -25, "介": 71, "鹿": -88, "ド": 12 }, "UW1": { "い": -150, "に": -417, "で": -297, "つ": 251, "と": 129, "の": 65, "は": -185, "が": -211, "り": -114, "う": 105, "見": 239, "そ": 159, "な": -218, "て": 137, "す": 203, "ん": 206, "知": 109, "携": -321, "か": -188, "始": 721, "バ": 395, "へ": -222, "十": -281, "上": -149, "く": 145, "し": -70, "水": 136, "。": -54, "新": 332, "プ": -797, "［": -530, "明": 877, "タ": 233, "き": -16, "ス": -215, "ッ": 387, "０": 216, "イ": -408, "リ": 340, "ち": 246, "大": 244, "っ": 183, "た": -89, "安": -469, "３": -312, "．": -433, "ど": 202, "や": -258, "日": 12, "メ": 420, "話": -151, "今": 134, "効": 608, "自": 372, "こ": 90, "行": -43, "ろ": 321, "え": -127, "長": 654, "小": 240, "れ": 100, "機": 120, "オ": 368, "間": 272, "時": -185, "壊": -387, "『": -563, "・": 43, "作": 104, "２": 127, "ャ": 271, "！": 58, "撮": -145, "個": -233, "」": -142, "京": -102, "何": 155, "苦": -493, "認": -185, "ン": 35, "る": -35, "取": 88, "右": 180, "人": -70, "少": -105, "進": 138, "ざ": 65, "も": 8, "内": -158, "積": -94, "を": -12, "議": 29, "ケ": -25, "ね": -29, "豊": 71, "]": -16, "カ": 12 }, "UW6": { "。": -297, "が": 361, "の": 157, "で": 157, "さ": 954, "な": 244, "を": 158, "う": 213, "に": 331, "は": 216, "し": 499, "や": 637, "り": 538, "っ": 488, "ぱ": 1089, "か": 319, "」": -178, "い": 352, "も": 111, "こ": 220, "お": -407, "せ": -274, "み": 690, "め": 913, "つ": 724, "る": 184, "ー": -172, "グ": 770, "け": -204, "ど": 62, "そ": 246, "コ": 198, "場": -605, "ん": 380, "く": 146, "ま": 389, "れ": 180, "０": 699, "ン": -321, "タ": 322, "的": 371, "と": 46, "電": 367, "ク": -285, "空": 607, "人": -95, "ろ": 483, "送": -1595, "気": 536, "画": 467, "・": -195, "わ": 306, "付": 41, "見": -186, "パ": -556, "返": 1159, "１": 112, "水": 898, "出": 532, "：": 616, "思": -166, "ュ": 226, "学": -457, "ル": 181, "込": 460, "供": -392, "地": 474, "遊": -296, "ぎ": 651, "ば": 16, "過": 242, "よ": 127, "カ": 210, "デ": -190, "て": -54, "］": -108, "最": -221, "来": -156, "制": 407, "寺": 315, "言": -223, "シ": -168, "自": 234, "日": 37, "ょ": -238, "た": 22, "、": 9, "じ": 112, "亭": 376, "だ": -52, "ず": -140, "広": -82, "方": -86, "家": -102, "び": 68, "ピ": 89 }, "TW1": { "よいよ": 3883, "またま": 3804, "をもつ": 1739, "もはや": 2582, "ありが": -2649, "おって": 3035, "という": 407, "で見る": -2947, "こんに": -486, "ような": 1185, "が良い": 774, "・・・": 1407, "ていく": 1047, "んどん": 1410, "ました": -1039, "ふだん": 1962, "できる": 415, "かなり": 1974, "だんど": -1522, "その時": 2276, "すきと": -3041, "いとこ": -798, "甘えが": -1204, "やはり": 2006, "たちの": 273, "ながら": 1135, "、それ": 747, "ひとつ": 1322, "とんど": 783, "ない、": -1562, "でかけ": -673, "かなか": 740, "なんと": -1109, "ことも": -290, "持って": -1039, "ょうど": 826, "十分に": -350, "たまた": -754, "しかし": 731, "っかり": 731, "に来て": 674, "ょっと": -331, "る」と": -982, "困った": 668, "として": 257, "ていて": 260, "もなく": 124, "かった": -79, "そして": 216, "は一つ": -689, "くらい": 114, "は正直": 331, "レベル": 353, "なって": -85, "くさん": 218, "入れる": 242, "すごく": 290, "。夕方": 166, "おけば": 143, "ろいろ": 113, "んでも": 151, "まるで": 68, "のうち": 131, "にして": -16, "００円": 8, "のバス": 29, "。ただ": 29 }, "BW2": { "とこ": -1686, "とい": 229, "ない": -3463, "せく": 6067, "てい": -1517, "とお": -2649, "です": -2965, "たと": 696, "であ": -3443, "へよ": 3573, "ので": -1967, "いよ": -3016, "のみ": -3049, "てお": -2179, "にも": -1382, "うご": 1930, "でき": -2137, "など": -2405, "、と": -1250, "でも": -1913, "たま": -1298, "たい": -2120, "くな": -1741, "るよ": -682, "くだ": -2314, "には": -774, "帯電": -1396, "のが": -1140, "でし": -1765, "のだ": -1080, "うど": -1975, "てき": -2075, "本イ": 2074, "のは": -1284, "もし": -906, "の前": -1563, "てみ": -2128, "いま": -986, "はじ": -2128, "いと": -938, "いい": -947, "いた": -1285, "いも": 759, "い合": -1590, "徴エ": 1530, "らな": -239, "てく": -1200, "こそ": -1318, "やす": -1388, "なく": -947, "らゆ": -1072, "てあ": -2149, "なか": -623, "うや": -1084, "うこ": -178, "て行": -2221, "人い": 1482, "び上": 1791, "う映": 885, "のか": -670, "ると": -559, "もあ": -626, "のも": -915, "した": -723, "ても": -586, "のい": 248, "を返": -1650, "とも": -579, "ただ": -1366, "とき": -760, "たち": -561, "こし": 414, "どこ": -711, "とか": -1047, "のご": -1168, "はい": -813, "いな": -465, "なあ": -1601, "しい": -383, "かな": -463, "もつ": -688, "でな": -1204, "すご": -942, "にし": -455, "」と": -411, "。笑": -1208, "ども": -655, "の１": -1758, "い日": 405, "係な": 616, "し…": 1779, "くし": -697, "とめ": -360, "では": -586, "とと": -645, "」で": 890, "いし": -754, "にな": -67, "そこ": -1027, "なぁ": -613, "はあ": -512, "もな": -21, "が観": -927, "すも": 577, "はず": -581, "がっ": -399, "かし": -338, "、な": -261, "グと": 736, "・・": -403, "いつ": -148, "にぎ": -358, "とは": -334, "気な": 327, "らい": -310, "でい": -188, "］私": -583, "日と": 359, "て欲": -444, "がし": 91, "日本": -276, "りな": 227, "るな": -245, "よう": -230, "うい": -180, "中さ": 310, "な場": 74, "中だ": 191, "の方": 108, "たも": 109, "たよ": -121, "のサ": 112, "たし": -207, "ルや": 129, "なこ": -102, "てや": -116, "て来": -197, "るし": -132, "よい": -110, "るの": -46, "もう": -72, "れた": -55, "がの": 54, "るが": -67, "たな": -46, "いで": -25, "ぱな": 25, "、清": -20, "るか": -8 }, "BW1": { "しい": 1568, "から": 1712, "ない": 1216, "いう": 537, "よう": -1258, "のみ": 3231, "んに": -1202, "こそ": 2555, "れた": 1290, "とか": 1793, "もは": -3611, "まま": 2257, "その": -1288, "るの": -1346, "こと": -1690, "少し": 1862, "」と": 307, "ても": 793, "んだ": 790, "して": -157, "のは": 1265, "、真": 4949, "うな": 508, "つな": -1636, "たら": 1220, "でも": 871, "より": 1691, "かも": -1779, "まも": -3432, "では": -304, "この": -1215, "たい": 691, "最近": 1883, "った": 237, "。・": 2844, "には": 453, "たの": -1080, "たと": -1177, "とが": -1296, "んな": 164, "白い": 1283, "くれ": 2274, "かし": 1606, "とき": 1991, "もう": 1497, "やく": 1326, "が、": 1096, "全部": 704, "。」": 2211, "おで": -3868, "は、": 906, "まと": -1910, "もの": -686, "なら": 1173, "んで": -470, "にも": 604, "とで": 1553, "気に": -315, "ただ": 1278, "ちが": -639, "い、": -401, "もし": 1440, "晶の": 2542, "思い": -1517, "なぐ": 1196, "あー": 1783, "同じ": 1129, "のが": 886, "で、": 414, "まだ": 793, "けど": 740, "いと": -277, "りゃ": 1641, "なぜ": 1655, "よく": 581, "の間": 1512, "た．": 1585, "がと": -830, "てい": -491, "かけ": -42, "人気": 1243, "神社": 910, "だけ": 596, "まり": 464, "れて": -391, "した": 323, "いで": -1020, "青い": 406, "、今": 791, "りと": 642, "くて": 695, "きた": 490, "の後": 962, "２、": -1970, "使い": -1007, "れが": -552, "やら": 972, "普段": 703, "とう": 85, "きの": -936, "敵な": 533, "いの": -219, "買い": -766, "と、": 302, "るに": -625, "れる": 76, "ック": 277, "いい": -406, "なく": 331, "らな": -725, "ので": 211, "など": 629, "取り": -453, "との": 400, "問い": -418, "、と": 346, "か，": -1352, "べき": 912, "効果": 1256, "ゃあ": 633, "０円": 367, "ると": 86, "ぶん": 652, "安に": -717, "いも": -741, "是非": 283, "甘味": 546, "ここ": 131, "寺、": -1115, "パサ": 459, "か、": -422, "分け": 597, "言い": -576, "かき": 514, "世の": -650, "ころ": 401, "お店": 672, "だし": 667, "現在": 536, "的な": 246, "えば": 256, "の上": 770, "うか": 242, "ろう": -484, "めて": 130, "で…": 808, "＾＾": 383, "とも": -106, "は頭": 972, "馬の": -720, "てる": 184, "いた": 161, "さん": 94, "じて": 321, "待ち": -455, "ｏｒ": 419, "める": -160, "わけ": 340, "ねー": 320, "絶対": 465, "だん": 143, "ため": 461, "ぱり": 297, "こう": -215, "うや": -171, "すい": 50, "っと": -13, "うえ": 413, "知る": -236, "リー": 173, "いし": 190, "んて": 115, "舞う": 250, "とは": -93, "のも": 97, "すの": -100, "利な": 153, "りは": -253, "すが": -69, "大変": 30, "本語": 142, "ては": -102, "人、": -193, "使う": 90, "とい": -64, "ほぼ": 110, "せん": 50, "す☆": 71, "空き": -50, "多く": -75, "かと": -20, "以上": 12, "４日": 4, "なー": 8, "離宮": 4 }, "BW3": { "こと": 1223, "もの": 3842, "いう": 728, "いい": 1168, "その": 2339, "ちは": -1039, "この": 2255, "まと": 1857, "とき": 2378, "おで": 1012, "して": 235, "はじ": 2407, "うま": 3367, "これ": 2311, "ちょ": 2243, "でも": 1761, "なる": 346, "なっ": -590, "ある": -256, "受け": 930, "可能": 107, "が、": 1583, "なん": 277, "そう": -1861, "とて": 2507, "こそ": -1684, "とい": -711, "おり": -1393, "でき": 929, "もら": 2724, "かか": 1911, "上が": 1030, "メー": 458, "から": -1102, "当日": 2268, "かけ": 2181, "たま": 1025, "さん": -2131, "ため": 1067, "で、": 1097, "とも": 1317, "しま": -333, "ゆる": -797, "かっ": -1213, "です": -889, "より": -1180, "分か": 1490, "もう": 2291, "よく": 1387, "ない": 524, "しい": -1091, "ます": -735, "もん": 1025, "すぐ": 1558, "すご": 1479, "した": 893, "いと": -60, "まし": -1029, "機器": -1637, "が観": 2232, "とっ": 871, "つな": 1317, "・・": -1587, "さい": -882, "いて": -426, "ころ": -324, "あと": 1221, "がん": 1901, "とり": 1121, "まぁ": 1449, "つぶ": 679, "いろ": 400, "はま": 1076, "うち": 631, "しゃ": 379, "なら": -450, "いか": 673, "だけ": -750, "みた": -1197, "だろ": -1491, "はず": 758, "わか": 706, "よう": -506, "デザ": 544, "なく": 444, "はる": 767, "いま": 567, "と思": -557, "にぎ": 647, "つい": 580, "さあ": 648, "きま": -579, "かも": -607, "もと": 1131, "まだ": 619, "もつ": 1068, "あり": 108, "始ま": 235, "すか": -408, "何で": 499, "おす": 372, "日が": 427, "きる": -892, "とこ": 468, "ぼっ": -1025, "ええ": 1054, "以上": -356, "なか": 267, "たっ": 568, "出来": -587, "どこ": 439, "入れ": 154, "そこ": 183, "ひと": 398, "はし": 725, "まも": 278, "みん": 469, "なさ": 218, "ルー": 302, "一に": -657, "たい": -115, "ごと": -249, "なに": 364, "つけ": 474, "しか": -181, "入場": 429, "いた": -45, "んで": 265, "いら": 303, "アプ": 48, "行く": 124, "もっ": 318, "し、": -36, "そし": 352, "まで": -274, "いる": 136, "こん": -107, "最近": 163, "ただ": 303, "とら": 352, "変え": 268, "いつ": 74, "とつ": -254, "電話": -39, "友人": 104, "ぼれ": -408, "通り": -230, "すき": 187, "つき": 372, "だい": 68, "など": -95, "電車": 86, "かき": 271, "ませ": -98, "色は": 115, "書い": 89, "みろ": 72, "祭り": 67, "そく": -97, "使っ": 55, "あふ": 67, "しく": -63, "こだ": 50, "なき": 12, "はい": 8, "ほど": -4 }, "TW3": { "のよう": -1412, "という": 537, "ている": -2523, "、そし": -3750, "のまま": -534, "ること": -370, "の本は": -1319, "らない": -1558, "すこと": 874, "てしま": -1696, "になっ": -453, "ーした": 1305, "へよう": 8, "とした": -1321, "と言っ": -1462, "である": -886, "のよい": 535, "」って": 907, "てほし": -945, "ばいい": -1212, "はまっ": -1277, "として": 118, "はない": -459, "と同時": -1302, "であっ": -1121, "ていう": 555, "ところ": -847, "、また": -835, "ておき": -599, "る方は": -679, "ういう": -584, "といっ": -55, "ととも": -490, "はそれ": -568, "にでも": -600, "てない": -325, "といい": -491, "くして": -261, "たこと": -102, "のこの": -148, "があっ": 84, "，それ": -71 }, "TW2": { "いとこ": -3724, "してお": -1381, "気に入": -3681, "ではな": -1979, "ちがう": -1683, "分にあ": -2585, "そのま": -1377, "んでい": -1872, "うにな": -935, "そもそ": -1862, "どんど": -915, "ではあ": -1747, "とがあ": -1027, "女の子": -1722, "れはそ": -1393, "国人が": 960, "っての": 1313, "らと言": -1214, "からな": -674, "てもい": -1290, "でもあ": -1380, "んなん": 1011, "からし": 521, "ともあ": -669, "でもな": -1022, "その後": -576, "れるこ": 241, "まるで": -251, "ってこ": -358, "しかな": 407, "とにな": -257, "ものす": -791, "それ以": 193, "したこ": -254, "っとい": -354, "のに対": -198, "とがで": -161, "るにつ": -63 }, "TW4": { "ところ": 3207, "ありが": 2582, "ような": -2297, "もはや": 3312, "どのよ": 3898, "ある。": -561, "くらい": 1880, "ように": -1480, "可能性": 2323, "いよい": 1673, "ようや": 2339, "ことが": -1148, "プログ": 1689, "しかし": 2007, "ちがう": 2340, "が、そ": 1280, "とおり": 2002, "うどん": 2141, "した。": -1525, "かなり": 2314, "あるい": -3206, "いっぱ": 1964, "ことに": -1226, "ありま": -911, "だって": 1343, "しゃべ": 1970, "ことで": 330, "で、そ": 1151, "してお": 1228, "できた": 1468, "いろい": 1037, "ない。": 209, "ことも": -915, "わけで": -600, "ちなみ": 1897, "おりに": -426, "なんと": 1057, "だった": -1415, "やって": 174, "とこが": 1174, "そうで": -720, "でも、": 465, "して人": -1127, "なんて": -506, "こと。": 532, "おりま": 1588, "いかな": 449, "これは": 1061, "いって": -305, "いけな": -420, "ってこ": 333, "ことを": 362, "の京都": 402, "なんか": 475, "かけら": 607, "はじま": 329, "そのま": 357, "ようで": -694, "すると": 217, "ひとつ": 73, "勝手に": 825, "しない": 279, "ことは": -247, "ないと": 225, "でもま": 657, "いまし": -521, "いえば": 426, "どんど": 393, "とこ取": -211, "かった": -162, "メール": 52, "インテ": 204, "いくさ": -190, "はまっ": 86, "いくら": 137, "います": -106, "なかな": 85, "あるも": 59, "あたり": -55, "京都に": 12 } };

/**
 * @license
 * Copyright 2021 Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Parses an html string and returns a parsed html document.
 * @param html An HTML string.
 * @return A Document.
 */
const parseFromString = (html) => {
    return new window.DOMParser().parseFromString(html, 'text/html');
};

/**
 * @license
 * Copyright 2021 Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Base BudouX parser.
 */
class Parser {
    /**
     * Constructs a BudouX parser.
     * @param model A model data.
     */
    constructor(model) {
        this.model = new Map(Object.entries(model).map(([k, v]) => [
            k,
            new Map(Object.entries(v)),
        ]));
        this.baseScore =
            -0.5 *
                [...this.model.values()]
                    .flatMap((group) => [...group.values()])
                    .reduce((prev, curr) => prev + curr, 0);
    }
    /**
     * Parses the input sentence and returns a list of semantic chunks.
     *
     * @param sentence An input sentence.
     * @return The retrieved chunks.
     */
    parse(sentence) {
        if (sentence === '')
            return [];
        const boundaries = this.parseBoundaries(sentence);
        const result = [];
        let start = 0;
        for (const boundary of boundaries) {
            result.push(sentence.slice(start, boundary));
            start = boundary;
        }
        result.push(sentence.slice(start));
        return result;
    }
    /**
     * Parses the input sentence and returns a list of boundaries.
     *
     * @param sentence An input sentence.
     * @return The list of boundaries.
     */
    parseBoundaries(sentence) {
        const result = [];
        const uw1 = this.model.get('UW1');
        const uw2 = this.model.get('UW2');
        const uw3 = this.model.get('UW3');
        const uw4 = this.model.get('UW4');
        const uw5 = this.model.get('UW5');
        const uw6 = this.model.get('UW6');
        const bw1 = this.model.get('BW1');
        const bw2 = this.model.get('BW2');
        const bw3 = this.model.get('BW3');
        const tw1 = this.model.get('TW1');
        const tw2 = this.model.get('TW2');
        const tw3 = this.model.get('TW3');
        const tw4 = this.model.get('TW4');
        for (let i = 1; i < sentence.length; i++) {
            let score = this.baseScore;
            // NOTE: Score values in models may be negative.
            score += (uw1 === null || uw1 === void 0 ? void 0 : uw1.get(sentence.substring(i - 3, i - 2))) || 0;
            score += (uw2 === null || uw2 === void 0 ? void 0 : uw2.get(sentence.substring(i - 2, i - 1))) || 0;
            score += (uw3 === null || uw3 === void 0 ? void 0 : uw3.get(sentence.substring(i - 1, i))) || 0;
            score += (uw4 === null || uw4 === void 0 ? void 0 : uw4.get(sentence.substring(i, i + 1))) || 0;
            score += (uw5 === null || uw5 === void 0 ? void 0 : uw5.get(sentence.substring(i + 1, i + 2))) || 0;
            score += (uw6 === null || uw6 === void 0 ? void 0 : uw6.get(sentence.substring(i + 2, i + 3))) || 0;
            score += (bw1 === null || bw1 === void 0 ? void 0 : bw1.get(sentence.substring(i - 2, i))) || 0;
            score += (bw2 === null || bw2 === void 0 ? void 0 : bw2.get(sentence.substring(i - 1, i + 1))) || 0;
            score += (bw3 === null || bw3 === void 0 ? void 0 : bw3.get(sentence.substring(i, i + 2))) || 0;
            score += (tw1 === null || tw1 === void 0 ? void 0 : tw1.get(sentence.substring(i - 3, i))) || 0;
            score += (tw2 === null || tw2 === void 0 ? void 0 : tw2.get(sentence.substring(i - 2, i + 1))) || 0;
            score += (tw3 === null || tw3 === void 0 ? void 0 : tw3.get(sentence.substring(i - 1, i + 2))) || 0;
            score += (tw4 === null || tw4 === void 0 ? void 0 : tw4.get(sentence.substring(i, i + 3))) || 0;
            if (score > 0)
                result.push(i);
        }
        return result;
    }
}

/**
 * @license
 * Copyright 2021 Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const assert = console.assert;
const ZWSP_CODEPOINT = 0x200b; // U+200B ZERO WIDTH SPACE
const ZWSP = String.fromCharCode(ZWSP_CODEPOINT);
// We could use `Node.TEXT_NODE` and `Node.ELEMENT_NODE` in a browser context,
// but we define the same here for Node.js environments.
const NodeType = {
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    DOCUMENT_FRAGMENT_NODE: 11,
};
const DomAction = {
    Inline: 0, // An inline content, becomes a part of a paragraph.
    Block: 1, // A nested paragraph.
    Skip: 2, // Skip the content. The content before and after are connected.
    Break: 3, // A forced break. The content before and after become paragraphs.
    NoBreak: 4, // The content provides context, but it's not breakable.
    BreakOpportunity: 5, // Force a break opportunity.
};
/**
 * Determines the action from an element name, as defined in
 * {@link https://html.spec.whatwg.org/multipage/rendering.html HTML Rendering}.
 * See also {@link actionForElement}.
 */
const domActions = {
    // Hidden elements
    // https://html.spec.whatwg.org/multipage/rendering.html#hidden-elements
    AREA: DomAction.Skip,
    BASE: DomAction.Skip,
    BASEFONT: DomAction.Skip,
    DATALIST: DomAction.Skip,
    HEAD: DomAction.Skip,
    LINK: DomAction.Skip,
    META: DomAction.Skip,
    NOEMBED: DomAction.Skip,
    NOFRAMES: DomAction.Skip,
    PARAM: DomAction.Skip,
    RP: DomAction.Skip,
    SCRIPT: DomAction.Skip,
    STYLE: DomAction.Skip,
    TEMPLATE: DomAction.Skip,
    TITLE: DomAction.Skip,
    NOSCRIPT: DomAction.Skip,
    // Flow content
    // https://html.spec.whatwg.org/multipage/rendering.html#flow-content-3
    HR: DomAction.Break,
    // Disable if `white-space: pre`.
    LISTING: DomAction.Skip,
    PLAINTEXT: DomAction.Skip,
    PRE: DomAction.Skip,
    XMP: DomAction.Skip,
    // Phrasing content
    // https://html.spec.whatwg.org/multipage/rendering.html#phrasing-content-3
    BR: DomAction.Break,
    RT: DomAction.Skip,
    WBR: DomAction.BreakOpportunity,
    // Form controls
    // https://html.spec.whatwg.org/multipage/rendering.html#form-controls
    INPUT: DomAction.Skip,
    SELECT: DomAction.Skip,
    BUTTON: DomAction.Skip,
    TEXTAREA: DomAction.Skip,
    // Other elements where the phrase-based line breaking should be disabled.
    // https://github.com/google/budoux/blob/main/budoux/skip_nodes.json
    ABBR: DomAction.Skip,
    CODE: DomAction.Skip,
    IFRAME: DomAction.Skip,
    TIME: DomAction.Skip,
    VAR: DomAction.Skip,
    // Deprecated, but supported in all browsers.
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nobr
    NOBR: DomAction.NoBreak,
};
const defaultBlockElements = new Set([
    // 15.3.2 The page
    'HTML',
    'BODY',
    // 15.3.3 Flow content
    'ADDRESS',
    'BLOCKQUOTE',
    'CENTER',
    'DIALOG',
    'DIV',
    'FIGURE',
    'FIGCAPTION',
    'FOOTER',
    'FORM',
    'HEADER',
    'LEGEND',
    'LISTING',
    'MAIN',
    'P',
    // 15.3.6 Sections and headings
    'ARTICLE',
    'ASIDE',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'HGROUP',
    'NAV',
    'SECTION',
    // 15.3.7 Lists
    'DIR',
    'DD',
    'DL',
    'DT',
    'MENU',
    'OL',
    'UL',
    'LI',
    // 15.3.8 Tables
    'TABLE',
    'CAPTION',
    'COL',
    'TR',
    'TD',
    'TH',
    // 15.3.12 The fieldset and legend elements
    'FIELDSET',
    // 15.5.4 The details and summary elements
    'DETAILS',
    'SUMMARY',
    // 15.5.12 The marquee element
    'MARQUEE',
]);
/**
 * Determine the action for a CSS `display` property value.
 * @param display The value of the CSS `display` property.
 * @return The {@link domActions} for the value.
 */
function actionForDisplay(display) {
    // Handle common cases first.
    if (display === 'inline')
        return DomAction.Inline;
    if (display === 'block')
        return DomAction.Block;
    // Handle Ruby base as in-flow.
    if (display.startsWith('ruby')) {
        if (display === 'ruby-text')
            return DomAction.Skip;
        return DomAction.Inline;
    }
    // Handle other values including multi-value syntax as blocks.
    // https://drafts.csswg.org/css-display/#the-display-properties
    return DomAction.Block;
}
/**
 * Determine the action for an element or document fragment.
 * @param element An element or document fragment to determine the action for.
 * @return The {@link domActions} for the element.
 */
function actionForElement(element) {
    if (isDocumentFragment(element)) {
        return DomAction.Block;
    }
    const nodeName = element.nodeName;
    const action = domActions[nodeName];
    if (action !== undefined)
        return action;
    if (typeof globalThis.getComputedStyle === 'function') {
        const style = globalThis.getComputedStyle(element);
        switch (style.whiteSpace) {
            case 'nowrap':
            case 'pre':
                return DomAction.NoBreak;
        }
        const display = style.display;
        if (display)
            return actionForDisplay(display);
        // `display` is an empty string if the element is not connected.
    }
    // Use the built-in rules if the `display` property is empty, or if
    // `getComputedStyle` is missing (e.g., jsdom.)
    return defaultBlockElements.has(nodeName)
        ? DomAction.Block
        : DomAction.Inline;
}
/**
 * Applies wrapping styles to make linebreak controls work in children.
 * @param element A parent element to apply the styles.
 */
const applyWrapStyle = (element) => {
    element.style.wordBreak = 'keep-all';
    element.style.overflowWrap = 'anywhere';
};
/**
 * Represents a node in {@link Paragraph}.
 *
 * It wraps a {@link Text} or a {@link string}.
 *
 * A {@link string} provides the context for the parser, but it can't be split.
 */
class NodeOrText {
    constructor(nodeOrText) {
        this.chunks = [];
        this.hasBreakOpportunityAfter = false;
        this.nodeOrText = nodeOrText;
    }
    static isString(value) {
        return typeof value === 'string';
    }
    get canSplit() {
        return !NodeOrText.isString(this.nodeOrText);
    }
    get text() {
        return NodeOrText.isString(this.nodeOrText)
            ? this.nodeOrText
            : this.nodeOrText.nodeValue;
    }
    get length() {
        var _a;
        var _b;
        return (_b = (_a = this.text) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    }
    /**
     * Split the {@link Text} in the same way as the {@link chunks}.
     * Joining all {@link chunks} must be equal to {@link text}.
     */
    split(separator) {
        const chunks = this.chunks;
        assert(chunks.length === 0 || chunks.join('') === this.text);
        if (chunks.length <= 1)
            return;
        if (NodeOrText.isString(this.nodeOrText))
            return;
        const node = this.nodeOrText;
        if (typeof separator === 'string') {
            // If the `separator` is a string, insert it at each boundary.
            node.nodeValue = chunks.join(separator);
            return;
        }
        // Otherwise create a `Text` node for each chunk, with the separator node
        // between them, and replace the `node` with them.
        const document = node.ownerDocument;
        let nodes = [];
        for (const chunk of chunks) {
            if (chunk)
                nodes.push(document.createTextNode(chunk));
            // Add a separator between chunks. To simplify the logic, add a separator
            // after each chunk, then remove the last one.
            // To avoid `cloneNode` for the temporary one that is going to be removed,
            // add `null` as a marker, then replace them with `cloneNode` later.
            nodes.push(null);
        }
        nodes.pop();
        nodes = nodes.map(n => (n ? n : separator.cloneNode(true)));
        node.replaceWith(...nodes);
    }
}
class NodeOrTextForTesting extends NodeOrText {
}
function isDocumentFragment(node) {
    return node.nodeType === NodeType.DOCUMENT_FRAGMENT_NODE;
}
/**
 * Represents a "paragraph", broken by block boundaries or forced breaks.
 *
 * A CSS
 * {@link https://drafts.csswg.org/css2/#inline-formatting inline formatting context}
 * is usually a "paragraph", but it can be broken into multiple paragraphs by
 * forced breaks such as `<br>`.
 */
class Paragraph {
    constructor(element) {
        this.nodes = [];
        this.element = element;
    }
    isEmpty() {
        return this.nodes.length === 0;
    }
    get text() {
        return this.nodes.map(node => node.text).join('');
    }
    get lastNode() {
        return this.nodes.length ? this.nodes[this.nodes.length - 1] : undefined;
    }
    setHasBreakOpportunityAfter() {
        const lastNode = this.lastNode;
        if (lastNode)
            lastNode.hasBreakOpportunityAfter = true;
    }
    /**
     * @return Indices of forced break opportunities in the source.
     * They can be created by `<wbr>` tag or `&ZeroWidthSpace;`.
     */
    getForcedOpportunities() {
        const opportunities = [];
        let len = 0;
        for (const node of this.nodes) {
            if (node.canSplit) {
                const text = node.text;
                if (text) {
                    for (let i = 0; i < text.length; ++i) {
                        if (text.charCodeAt(i) === ZWSP_CODEPOINT) {
                            opportunities.push(len + i + 1);
                        }
                    }
                }
            }
            len += node.length;
            if (node.hasBreakOpportunityAfter) {
                opportunities.push(len);
            }
        }
        return opportunities;
    }
    /**
     * @return Filtered {@param boundaries} by excluding
     * {@link getForcedOpportunities} if it's not empty.
     * Otherwise {@param boundaries}.
     */
    excludeForcedOpportunities(boundaries) {
        const forcedOpportunities = this.getForcedOpportunities();
        if (!forcedOpportunities.length)
            return boundaries;
        const set = new Set(forcedOpportunities);
        return boundaries.filter(i => !set.has(i));
    }
}
class ParagraphForTesting extends Paragraph {
}
/**
 * Adds HTML processing support to a BudouX {@link Parser}.
 */
class HTMLProcessor {
    /**
     * @param parser A BudouX {@link Parser} to compute semantic line breaks.
     */
    constructor(parser, options) {
        /** See {@link HTMLProcessorOptions.separator}. */
        this.separator = ZWSP;
        this.parser_ = parser;
        if (options !== undefined) {
            if (options.className !== undefined)
                this.className = options.className;
            if (options.separator !== undefined)
                this.separator = options.separator;
        }
    }
    /**
     * Checks if the given element has a text node in its children.
     *
     * @param ele An element to be checked.
     * @return Whether the element has a child text node.
     */
    static hasChildTextNode(ele) {
        for (const child of ele.childNodes) {
            if (child.nodeType === NodeType.TEXT_NODE)
                return true;
        }
        return false;
    }
    /**
     * Applies markups for semantic line breaks to the given HTML element or document fragment.
     *
     * It breaks descendant nodes into paragraphs,
     * and applies the BudouX to each paragraph.
     * @param element The input element or document fragment.
     */
    applyToElement(element) {
        for (const block of this.getBlocks(element)) {
            assert(!block.isEmpty());
            this.applyToParagraph(block);
        }
    }
    /**
     * Find paragraphs from a given HTML element or document fragment.
     * @param element The root element or document fragment to find paragraphs.
     * @param parent The parent {@link Paragraph} if any.
     * @return A list of {@link Paragraph}s.
     */
    *getBlocks(element, parent) {
        assert(element.nodeType === NodeType.ELEMENT_NODE ||
            element.nodeType === NodeType.DOCUMENT_FRAGMENT_NODE);
        // Skip if it was once applied to this element.
        if (!isDocumentFragment(element) &&
            this.className &&
            element.classList.contains(this.className))
            return;
        const action = actionForElement(element);
        if (action === DomAction.Skip)
            return;
        if (action === DomAction.Break) {
            if (parent && !parent.isEmpty()) {
                parent.setHasBreakOpportunityAfter();
                yield parent;
                parent.nodes = [];
            }
            assert(!element.firstChild);
            return;
        }
        if (action === DomAction.BreakOpportunity) {
            if (parent)
                parent.setHasBreakOpportunityAfter();
            return;
        }
        // Determine if this element creates a new inline formatting context, or if
        // this element belongs to the parent inline formatting context.
        assert(action === DomAction.Block ||
            action === DomAction.Inline ||
            action === DomAction.NoBreak);
        const isNewBlock = !parent || action === DomAction.Block;
        const block = isNewBlock ? new Paragraph(element) : parent;
        // Collect all text nodes in this inline formatting context, while searching
        // descendant elements recursively.
        for (const child of element.childNodes) {
            switch (child.nodeType) {
                case NodeType.ELEMENT_NODE:
                    for (const childBlock of this.getBlocks(child, block))
                        yield childBlock;
                    break;
                case NodeType.TEXT_NODE:
                    if (action === DomAction.NoBreak) {
                        const text = child.nodeValue;
                        if (text) {
                            block.nodes.push(new NodeOrText(text));
                        }
                        break;
                    }
                    block.nodes.push(new NodeOrText(child));
                    break;
            }
        }
        // Apply if this is an inline formatting context.
        if (isNewBlock && !block.isEmpty())
            yield block;
    }
    /**
     * Apply the BudouX to the given {@link Paragraph}.
     * @param paragraph The {@link Paragraph} to apply.
     */
    applyToParagraph(paragraph) {
        assert(paragraph.nodes.length > 0);
        if (!paragraph.nodes.some(node => node.canSplit))
            return;
        const text = paragraph.text;
        // No changes if whitespace-only.
        if (/^\s*$/.test(text))
            return;
        // Compute the phrase boundaries.
        const boundaries = this.parser_.parseBoundaries(text);
        // No changes if single phrase.
        if (boundaries.length <= 0)
            return;
        // The boundaries should be between 1 and `text.length - 1` in the
        // ascending order.
        assert(boundaries[0] > 0);
        assert(boundaries.every((x, i) => i === 0 || x > boundaries[i - 1]));
        assert(boundaries[boundaries.length - 1] < text.length);
        // Don't insert separators before or after whitespace, as in Python and Java.
        const adjustedBoundaries = paragraph
            .excludeForcedOpportunities(boundaries)
            .filter(i => !/\s/.test(text[i - 1]) && !/\s/.test(text[i]));
        // Add a sentinel to help iterating.
        adjustedBoundaries.push(text.length + 1);
        this.splitNodes(paragraph.nodes, adjustedBoundaries);
        this.applyBlockStyle(paragraph.element);
    }
    /**
     * Split {@link NodeOrText} at the specified boundaries.
     * @param nodes A list of {@link NodeOrText}.
     * @param boundaries A list of indices of the text to split at.
     */
    splitNodes(nodes, boundaries) {
        var _a;
        assert(boundaries.length > 0);
        assert(boundaries.every((x, i) => i === 0 || x > boundaries[i - 1]));
        const textLen = nodes.reduce((sum, node) => sum + node.length, 0);
        // The last boundary must be a sentinel.
        assert(boundaries[boundaries.length - 1] > textLen);
        // Distribute `boundaries` to `node.chunks`.
        let boundary_index = 0;
        let boundary = boundaries[0];
        assert(boundary > 0);
        let nodeStart = 0; // the start index of the `nodeText` in the whole text.
        let lastNode = null;
        for (const node of nodes) {
            assert(boundary >= nodeStart);
            assert(node.chunks.length === 0);
            const nodeText = node.text;
            if (!nodeText)
                continue;
            const nodeLength = nodeText.length;
            const nodeEnd = nodeStart + nodeLength;
            assert(!lastNode || lastNode.canSplit);
            if (!node.canSplit) {
                // If there's a boundary between nodes and `lastNode.canSplit`, add a
                // boundary to the end of the `lastNode`.
                if (lastNode && boundary === nodeStart) {
                    if (lastNode.chunks.length === 0)
                        lastNode.chunks.push((_a = lastNode.text) !== null && _a !== void 0 ? _a : '');
                    lastNode.chunks.push('');
                }
                while (boundary < nodeEnd) {
                    boundary = boundaries[++boundary_index];
                }
                lastNode = null;
                nodeStart = nodeEnd;
                continue;
            }
            // Check if the next boundary is in this `node`.
            lastNode = node;
            if (boundary >= nodeEnd) {
                nodeStart = nodeEnd;
                continue;
            }
            // Compute the boundary indices in the `node`.
            const chunks = node.chunks;
            let chunkStartInNode = 0;
            while (boundary < nodeEnd) {
                const boundaryInNode = boundary - nodeStart;
                assert(boundaryInNode >= chunkStartInNode);
                chunks.push(nodeText.slice(chunkStartInNode, boundaryInNode));
                chunkStartInNode = boundaryInNode;
                boundary = boundaries[++boundary_index];
            }
            // Add the rest of the `nodeText`.
            assert(chunkStartInNode < nodeLength);
            chunks.push(nodeText.slice(chunkStartInNode));
            nodeStart = nodeEnd;
        }
        // Check if all nodes and boundaries are consumed.
        assert(nodeStart === textLen);
        assert(boundary_index < boundaries.length);
        assert(boundaries[boundary_index] >= textLen);
        // `node.chunks` are finalized. Split them.
        for (const node of nodes) {
            node.split(this.separator);
        }
    }
    /**
     * Applies the block style to the given element or document fragment.
     * @param element The element or document fragment to apply the block style.
     */
    applyBlockStyle(element) {
        if (isDocumentFragment(element)) {
            if (HTMLProcessor.hasChildTextNode(element)) {
                const doc = element.ownerDocument;
                if (doc) {
                    const wrapper = doc.createElement('span');
                    wrapper.append(...Array.from(element.childNodes));
                    element.append(wrapper);
                    this.applyBlockStyle(wrapper);
                }
            }
            return;
        }
        if (this.className) {
            element.classList.add(this.className);
            return;
        }
        applyWrapStyle(element);
    }
}
/**
 * BudouX {@link Parser} with HTML processing support.
 */
class HTMLProcessingParser extends Parser {
    constructor(model, htmlProcessorOptions = {
        separator: ZWSP,
    }) {
        super(model);
        this.htmlProcessor = new HTMLProcessor(this, htmlProcessorOptions);
    }
    /**
     * Applies markups for semantic line breaks to the given HTML element or document fragment.
     * @param parentElement The input element or document fragment.
     */
    applyToElement(parentElement) {
        this.htmlProcessor.applyToElement(parentElement);
    }
    /**
     * Translates the given HTML string to another HTML string with markups
     * for semantic line breaks.
     * @param html An input html string.
     * @return The translated HTML string.
     */
    translateHTMLString(html) {
        if (html === '')
            return html;
        const doc = parseFromString(html);
        if (HTMLProcessor.hasChildTextNode(doc.body) ||
            doc.body.children.length !== 1) {
            const wrapper = doc.createElement('span');
            wrapper.append(...doc.body.childNodes);
            doc.body.append(wrapper);
        }
        this.applyToElement(doc.body.firstElementChild);
        return doc.body.innerHTML;
    }
}

window.BudouXJa = new HTMLProcessingParser(model);
})();
