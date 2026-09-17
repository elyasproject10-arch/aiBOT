import React, { useState } from 'react';
import { Terminal, Copy, Check, Server, ShieldCheck, GitBranch } from 'lucide-react';

export const DeploymentGuideView: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: '۱. دریافت سورس کد از GitHub روی سرور مجازی (VPS)',
      cmd: `git clone https://github.com/YOUR_USERNAME/saas-subscription-manager.git\ncd saas-subscription-manager`,
      desc: 'کد پروژه را در مسیر دلخواه روی سرور لینوکس (اوبونتو/دبیان) کلون کنید.'
    },
    {
      title: '۲. ایجاد و تنظیم فایل محیطی (.env)',
      cmd: `cp .env.example .env\nnano .env`,
      desc: 'توکن‌های ربات تلگرام، بله و PayPing خود را در فایل .env ذخیره کنید.'
    },
    {
      title: '۳. اجرای سریع با یک دستور از طریق Docker Compose',
      cmd: `docker compose up -d --build`,
      desc: 'کانتینر داکر به صورت خودکار پایتون، ربات تلگرام، ربات بله، وب‌سرور FastAPI و پنل وب را اجرا می‌کند.'
    },
    {
      title: '۴. مشاهده لاگ‌های زنده ربات‌ها و زمان‌بندی یادآوری',
      cmd: `docker compose logs -f`,
      desc: 'بررسی وضعیت آنلاین بودن هر دو بات و بررسی ارسال پیام‌های سررسید.'
    }
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-400" />
          راهنمای استقرار پروژه روی سرور مجازی (VPS با Docker)
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          مراحل انتقال به مخزن GitHub و اجرای نسخه MVP عملیاتی با داکر روی سرور
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold text-slate-200">
            <GitBranch className="w-4 h-4 text-sky-400" />
            گیت‌هاب آماده
          </div>
          <p className="text-slate-400 text-[11px]">شامل .gitignore و بدون اطلاعات حساس در کد</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold text-slate-200">
            <Server className="w-4 h-4 text-emerald-400" />
            داکر سبک (Single Container)
          </div>
          <p className="text-slate-400 text-[11px]">پایتون ۳.۱۱ اسلیم به همراه کش پایگاه‌داده داکر</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold text-slate-200">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            پایگاه داده مشترک
          </div>
          <p className="text-slate-400 text-[11px]">پوشه data دیتابیس در ولوم Docker مپ شده است</p>
        </div>
      </div>

      {/* Step by step terminal commands */}
      <div className="space-y-4">
        {steps.map((step, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-slate-200">{step.title}</h3>
              <button
                onClick={() => copyToClipboard(step.cmd, idx)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 cursor-pointer"
              >
                {copiedIndex === idx ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">کپی شد!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    کپی دستور
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-400">{step.desc}</p>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/90 font-mono text-[11px] text-slate-200 overflow-x-auto whitespace-pre">
              {step.cmd}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
