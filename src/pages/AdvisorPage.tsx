import { BotMessageSquare, Send, Sparkles } from 'lucide-react';
import { FormEvent, useState } from 'react';

import { useDemo } from '../store/AppContext';

const quickQuestions = ['如何开始投资？', '本月餐饮超支怎么办？', '我适合什么理财产品？', '信用卡怎么用更安全？'];

export function AdvisorPage() {
  const { chatMessages, addChatMessage } = useDemo();
  const [question, setQuestion] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addChatMessage(question);
    setQuestion('');
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.45s_ease-out]">
      <section className="glass-card p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-400 text-white">
            <BotMessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">AI 财富管家</h2>
            <p className="mt-1 text-slate-600">基于规则与模拟数据的对话式建议系统。</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-card p-6">
          <h3 className="section-title">快捷问题</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {quickQuestions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => addChatMessage(item)}
                className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-left text-sm text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-[1.75rem] bg-gradient-to-br from-slate-950 to-cyan-900 p-5 text-white">
            <div className="text-sm text-cyan-100">规则引擎能力</div>
            <div className="mt-2 text-lg font-semibold">识别预算超支、借贷压力、投资起步和信用卡风险。</div>
            <div className="mt-2 text-sm leading-6 text-cyan-50/90">
              这个 AI 不依赖后端模型调用，而是通过消费数据、预算状态和规则模板生成解释型建议，便于后续替换成真实大模型服务。
            </div>
          </div>
        </div>

        <div className="glass-card flex min-h-[36rem] flex-col p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="section-title">对话窗口</h3>
              <p className="section-subtitle mt-1">你可以直接输入问题，例如“如何开始投资？”。</p>
            </div>
            <Sparkles className="h-5 w-5 text-emerald-500" />
          </div>

          <div className="mt-5 flex-1 space-y-4 overflow-y-auto rounded-[1.75rem] bg-slate-50/80 p-4">
            {chatMessages.map((message) => (
              <div key={message.id} className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={[
                    'max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm',
                    message.role === 'user'
                      ? 'bg-slate-950 text-white'
                      : 'border border-cyan-100 bg-white text-slate-700',
                  ].join(' ')}
                >
                  <div>{message.content}</div>
                  <div className={['mt-2 text-[11px]', message.role === 'user' ? 'text-slate-400' : 'text-slate-400'].join(' ')}>
                    {message.createdAt}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="输入你的问题，比如：如何开始投资？"
              className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-300"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              发送
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
