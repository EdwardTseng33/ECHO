
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Features: React.FC = () => {
  const { language } = useLanguage();

  const t = {
    'zh-TW': {
      title: "把生活過成一場好玩的遊戲",
      subtitle: "ECHO 不只是互助平台，更是一個「關係增強器」。",
      features: [
        {
          title: "互動｜發布你的日常副本",
          desc: "把無聊的家事變成「S級任務」發給老公，把跨部門難題變成「懸賞令」發給同事。讓彼此的互動不再是責任，而是有趣的挑戰。",
        },
        {
          title: "獎勵｜掉落傳說級的回聲",
          desc: "解完任務沒有虛擬金幣，但會掉落一段對方真心的「語音感謝」。這份被看見的成就感，比遊戲裡的 MVP 更真實、更暖心。",
        },
        {
          title: "成就｜你的人生英雄榜",
          desc: "不看財富排名，看貢獻排名。累積你的社會影響力點數，讓每一次的付出都成為你人生履歷上最耀眼的徽章。",
        }
      ],
      whyQuest: {
        title: "為什麼要「發任務」給朋友？",
        desc: <>直接開口求助有時很難為情，但如果是「揪團解副本」呢？<br/><br/>ECHO 透過遊戲化的介面，降低了開口求助的心理門檻。你可以發給老公一個「洗碗挑戰」，發給好友一個「陪聊任務」。完成後的回饋，讓這段關係更加緊密有趣。</>,
        tag1: "#關係遊戲化",
        tag2: "#互動零負擔"
      },
      cards: {
        card1: {
          tag: "緊急任務",
          title: "救援！誰能幫忙接小孩？",
          meta: "發布者：隔壁陳媽媽 • 獎勵：手作餅乾 + 感謝回聲"
        },
        card2: {
          tag: "日常副本",
          title: "挑戰：一週不喝手搖飲",
          meta: "發布者：健身教練 • 獎勵：教練的魔性笑聲"
        }
      }
    },
    'en-US': {
      title: "Gamify Your Real Life",
      subtitle: "ECHO isn't just a mutual aid platform; it's a Relationship Power-Up.",
      features: [
        {
          title: "Co-op | Post Daily Quests",
          desc: "Transform boring chores into 'S-Rank Quests' for your partner, or turn office blockers into 'Bounties' for colleagues. Make interaction a fun challenge, not a chore.",
        },
        {
          title: "Loot | Legendary Voice Drops",
          desc: "No virtual coins here. Completing quests drops sincere 'Voice Gratitude'. This feeling of being truly seen is warmer than any game achievement.",
        },
        {
          title: "Ranked | The Real Hero Leaderboard",
          desc: "Ranked by contribution, not net worth. Accumulate Social Impact Points. Let every act of kindness be a shining badge on your life's resume.",
        }
      ],
      whyQuest: {
        title: "Why Issue Quests to Friends?",
        desc: <>Asking for help can be awkward. But "Teaming up for a Raid"? That's just fun.<br/><br/>ECHO lowers the social friction with a gamified interface. Send a 'Dishwashing Challenge' to your spouse or a 'Chat Quest' to a friend. The feedback loop strengthens bonds effortlessly.</>,
        tag1: "#GamifiedRelations",
        tag2: "#ZeroFriction"
      },
      cards: {
        card1: {
          tag: "Urgent Quest",
          title: "Rescue! Pick up the kids?",
          meta: "From: Mom Next Door • Loot: Cookies + Echo"
        },
        card2: {
          tag: "Daily Dungeon",
          title: "Challenge: Zero Bubble Tea",
          meta: "From: Gym Coach • Loot: Evil Laugh"
        }
      }
    }
  }[language];

  const featureList = [
    {
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      ...t.features[0],
      bgColor: "hover:bg-purple-50"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      ...t.features[1],
      bgColor: "hover:bg-pink-50"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      ...t.features[2],
      bgColor: "hover:bg-blue-50"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900 tracking-tight">{t.title}</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {featureList.map((f, i) => (
            <div key={i} className={`group p-10 rounded-[3rem] bg-gray-50 ${f.bgColor} transition duration-500 border border-gray-100 flex flex-col h-full relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 cursor-default`}>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900 group-hover:text-purple-700 transition-colors">{f.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed flex-grow font-medium">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-[3rem] p-8 md:p-12 border-purple-50 flex flex-col md:flex-row items-center gap-10 hover:shadow-lg transition-shadow duration-500">
          <div className="md:w-1/2">
            <h4 className="text-2xl font-bold mb-4 text-gray-900">{t.whyQuest.title}</h4>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {t.whyQuest.desc}
            </p>
            <div className="flex gap-4 mt-6">
               <div className="px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-bold">{t.whyQuest.tag1}</div>
               <div className="px-4 py-2 bg-pink-100 rounded-full text-pink-700 text-sm font-bold">{t.whyQuest.tag2}</div>
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-1 gap-4">
             <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 transform hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-xl">📜</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black bg-red-100 text-red-600 px-2 rounded-full">{t.cards.card1.tag}</span>
                    <span className="text-gray-900 font-bold">{t.cards.card1.title}</span>
                  </div>
                  <p className="text-xs text-gray-400">{t.cards.card1.meta}</p>
                </div>
             </div>
             <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 transform hover:scale-105 transition-transform duration-300 ml-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl">🎮</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 rounded-full">{t.cards.card2.tag}</span>
                    <span className="text-gray-900 font-bold">{t.cards.card2.title}</span>
                  </div>
                  <p className="text-xs text-gray-400">{t.cards.card2.meta}</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
