import { CircleCheckBig, PlayCircle, Trophy, BookOpen, Rocket } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { MetricCard } from '../components/MetricCard';
import { ProgressBar } from '../components/ProgressBar';
import { useDemo } from '../store/AppContext';

const quizQuestions = [
  { id: 'q1', question: '复利最核心的作用是什么？', options: ['让时间放大资金增长', '让消费更自由', '让风险完全消失'], answer: 0 },
  { id: 'q2', question: '信用卡最安全的使用方式是？', options: ['按时全额还款', '只还最低还款', '把卡当作额外收入'], answer: 0 },
  { id: 'q3', question: '建立预算的第一步通常是？', options: ['先了解收入和固定支出', '先买理财产品', '先增加消费额'], answer: 0 },
];

export function LearningPage() {
  const {
    learningTopics,
    portfolio,
    scenarioTasks,
    updateTopicProgress,
    updatePortfolioAllocation,
    startScenarioTask,
    completeScenarioTask,
    addGrowthEvent,
    unlockAchievement,
  } = useDemo();
  const [answers, setAnswers] = useState<Record<string, number | undefined>>({});
  const [quizResult, setQuizResult] = useState<number | null>(null);

  const completion = useMemo(
    () => Math.round(learningTopics.reduce((sum, topic) => sum + topic.progress, 0) / learningTopics.length),
    [learningTopics],
  );

  const handleSubmitQuiz = () => {
    const score = quizQuestions.reduce((sum, item) => (answers[item.id] === item.answer ? sum + 1 : sum), 0);
    const percent = Math.round((score / quizQuestions.length) * 100);
    setQuizResult(percent);
    addGrowthEvent('完成知识测验', `金融知识测验得分 ${percent} 分`, percent >= 80 ? 45 : 20);
    if (percent >= 80) {
      unlockAchievement('ach-5');
    }
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.45s_ease-out]">
      <section className="glass-card p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">金融学习中心</h2>
            <p className="mt-2 max-w-3xl text-base leading-7 text-slate-600">
              学习路径、模拟实验室与知识测验，帮助青年建立更稳健的金融判断能力。
            </p>
          </div>
          <MetricCard title="学习完成度" value={`${completion}%`} hint="主题平均进度" accent="bg-emerald-50 text-emerald-700" />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-cyan-500" />
            <div>
              <h3 className="section-title">学习路径</h3>
              <p className="section-subtitle mt-1">按主题分层学习，从基础到进阶。</p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {learningTopics.map((topic) => (
              <div key={topic.id} className="rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">{topic.title}</div>
                    <div className="mt-1 text-sm leading-6 text-slate-500">{topic.summary}</div>
                  </div>
                  <div className="chip bg-slate-100 text-slate-600">{topic.lessons.length} 节课</div>
                </div>
                <div className="mt-4">
                  <ProgressBar value={topic.progress} label="掌握度" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {topic.lessons.map((lesson) => (
                    <span key={lesson} className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800">
                      {lesson}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateTopicProgress(topic.id, Math.min(100, topic.progress + 12));
                    addGrowthEvent(`学习 ${topic.title}`, '完成一次学习打卡', 18);
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
                >
                  <CircleCheckBig className="h-4 w-4" />
                  完成学习打卡
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3">
              <PlayCircle className="h-5 w-5 text-emerald-500" />
              <div>
                <h3 className="section-title">模拟实验室</h3>
                <p className="section-subtitle mt-1">把资产配置视作虚拟投资组合进行练习。</p>
              </div>
            </div>

            <div className="mt-5 h-72 rounded-[1.75rem] bg-slate-50 p-3">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={portfolio} dataKey="ratio" nameKey="name" innerRadius={56} outerRadius={92} paddingAngle={4}>
                    {portfolio.map((entry) => (
                      <Cell key={entry.id} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 space-y-3">
              {portfolio.map((item) => (
                <div key={item.id} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                    <span>{item.name}</span>
                    <span>{item.ratio}%</span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={item.ratio}
                      onChange={(event) => updatePortfolioAllocation(item.id, Number(event.target.value))}
                      className="h-2 flex-1 appearance-none rounded-full bg-slate-200 accent-cyan-600"
                    />
                    <span className="text-xs text-slate-400">模拟</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Rocket className="h-4 w-4 text-cyan-600" />
                情景任务中心
              </div>
              <div className="mt-3 space-y-3">
                {scenarioTasks.map((task) => (
                  <div key={task.id} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-medium text-slate-900">{task.title}</div>
                      <div
                        className={[
                          'rounded-full px-2.5 py-1 text-xs font-semibold',
                          task.status === 'done'
                            ? 'bg-emerald-100 text-emerald-700'
                            : task.status === 'in_progress'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-200 text-slate-600',
                        ].join(' ')}
                      >
                        {task.status === 'done' ? '已完成' : task.status === 'in_progress' ? '进行中' : '待开始'}
                      </div>
                    </div>
                    <div className="mt-2 text-xs leading-6 text-slate-600">{task.scene}</div>
                    <div className="mt-1 text-xs text-cyan-700">目标：{task.goal}</div>
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => startScenarioTask(task.id)}
                        disabled={task.status !== 'todo'}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-cyan-200 hover:text-cyan-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        开始任务
                      </button>
                      <button
                        type="button"
                        onClick={() => completeScenarioTask(task.id)}
                        disabled={task.status === 'done'}
                        className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        完成并领取 +{task.rewardPoints}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3">
              <Trophy className="h-5 w-5 text-amber-500" />
              <div>
                <h3 className="section-title">知识测验</h3>
                <p className="section-subtitle mt-1">巩固基础金融常识。</p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {quizQuestions.map((item) => (
                <div key={item.id} className="rounded-[1.5rem] border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="font-medium text-slate-900">{item.question}</div>
                  <div className="mt-3 space-y-2">
                    {item.options.map((option, index) => (
                      <label key={option} className="flex cursor-pointer items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
                        <input
                          type="radio"
                          name={item.id}
                          checked={answers[item.id] === index}
                          onChange={() => setAnswers((current) => ({ ...current, [item.id]: index }))}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleSubmitQuiz}
              className="mt-5 w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              提交测验
            </button>

            {quizResult !== null ? (
              <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700">
                你的得分是 {quizResult} 分，继续保持学习节奏，成长积分会继续上升。
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
