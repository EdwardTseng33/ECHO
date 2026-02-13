
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CheckItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center gap-4 text-base text-gray-300 mt-4 group">
    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
      <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className="font-medium">{text}</span>
  </div>
);

export const Audience: React.FC = () => {
  const { language } = useLanguage();

  const t = {
    'zh-TW': {
      title: "你的專屬遊戲場景",
      desc: "讓每一種人際關係，都變成好玩的「合作模式」。",
      scenarios: [
        {
          title: "家庭副本",
          desc: "把家事變成孩子想搶著做的「每日任務」。讓另一半的幫忙不再被視為理所當然，而是值得感謝的「神救援」。",
          check1: "發布：誰能幫忙倒垃圾？",
          check2: "獎勵：媽媽的超級擁抱"
        },
        {
          title: "職場戰役",
          desc: "打破辦公室的冷漠。透過「技能交換」任務，讓資深同事的經驗成為新人的攻略本，建立真實的革命情感。",
          check1: "發布：求救！Excel 報表卡關",
          check2: "獎勵：真心感謝 + 飲料一杯"
        },
        {
          title: "社交冒險",
          desc: "朋友不只是吃飯聊八卦。發起有趣的「挑戰任務」，讓彼此在互相激勵中一起成長，累積共同的熱血回憶。",
          check1: "發布：週末一起去淨灘",
          check2: "獎勵：獲得「環保戰士」稱號"
        }
      ]
    },
    'en-US': {
      title: "Choose Your Campaign",
      desc: "Switch every relationship to 'Co-op Mode'.",
      scenarios: [
        {
          title: "Family Co-op",
          desc: "Turn chores into 'Daily Quests' kids want to grind. Make your partner's help feel like a heroic 'Rescue', not an obligation.",
          check1: "Quest: Trash Disposal Duty",
          check2: "Reward: Super Mom Hug"
        },
        {
          title: "Office Campaign",
          desc: "Break down silos. Use 'Skill Exchange' side-quests to let veterans guide rookies, building a true guild mentality.",
          check1: "Quest: Critical! Excel Boss Fight",
          check2: "Reward: Sincere Thanks + 1 Potion (Coffee)"
        },
        {
          title: "Social Adventure",
          desc: "Beyond small talk. Launch 'Challenge Quests' to level up together and build shared epic memories.",
          check1: "Quest: Weekend Beach Raid",
          check2: "Reward: 'Eco Warrior' Title"
        }
      ]
    }
  }[language];

  return (
    <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(126,34,206,0.1),transparent)]"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">{t.title}</h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">{t.desc}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 items-stretch">
          
          {/* Families */}
          <div className="relative p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col group hover:bg-white/[0.08] transition-all shadow-2xl">
            <h3 className="text-2xl font-black mb-4 text-purple-300 flex items-center gap-2">
              <span>🏠</span> {t.scenarios[0].title}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              {t.scenarios[0].desc}
            </p>
            <div className="mt-auto border-t border-white/5 pt-6">
              <CheckItem text={t.scenarios[0].check1} />
              <CheckItem text={t.scenarios[0].check2} />
            </div>
          </div>

          {/* Workplace */}
          <div className="relative p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col group hover:bg-white/[0.08] transition-all shadow-2xl">
            <h3 className="text-2xl font-black mb-4 text-blue-300 flex items-center gap-2">
               <span>💼</span> {t.scenarios[1].title}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              {t.scenarios[1].desc}
            </p>
            <div className="mt-auto border-t border-white/5 pt-6">
              <CheckItem text={t.scenarios[1].check1} />
              <CheckItem text={t.scenarios[1].check2} />
            </div>
          </div>

          {/* Friends */}
          <div className="relative p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col group hover:bg-white/[0.08] transition-all shadow-2xl">
            <h3 className="text-2xl font-black mb-4 text-pink-300 flex items-center gap-2">
               <span>🤝</span> {t.scenarios[2].title}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              {t.scenarios[2].desc}
            </p>
            <div className="mt-auto border-t border-white/5 pt-6">
              <CheckItem text={t.scenarios[2].check1} />
              <CheckItem text={t.scenarios[2].check2} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
