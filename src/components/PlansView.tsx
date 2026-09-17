import React, { useState } from 'react';
import { Layers, Plus, DollarSign, Calendar, Trash2 } from 'lucide-react';
import { Plan, Product } from '../types';

interface PlansViewProps {
  plans: Plan[];
  products: Product[];
  selectedProductId?: number;
  onSavePlans: (plans: Plan[]) => void;
}

export const PlansView: React.FC<PlansViewProps> = ({
  plans,
  products,
  selectedProductId,
  onSavePlans,
}) => {
  const [activeProductId, setActiveProductId] = useState<number>(
    selectedProductId || (products.length > 0 ? products[0].id : 1)
  );

  const [showAddModal, setShowAddModal] = useState(false);
  const [planName, setPlanName] = useState('');
  const [planDuration, setPlanDuration] = useState(30);
  const [planPrice, setPlanPrice] = useState(390000);

  const filteredPlans = plans.filter((p) => p.product_id === activeProductId);
  const currentProduct = products.find((p) => p.id === activeProductId);

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!planName) return;

    const newPlan: Plan = {
      id: plans.length > 0 ? Math.max(...plans.map((p) => p.id)) + 1 : 1,
      product_id: activeProductId,
      name: planName,
      duration_days: planDuration,
      price: planPrice,
      is_active: true,
      display_order: filteredPlans.length + 1,
    };

    onSavePlans([...plans, newPlan]);
    setShowAddModal(false);
    setPlanName('');
  };

  const togglePlanActive = (planId: number) => {
    const updated = plans.map((p) => (p.id === planId ? { ...p, is_active: !p.is_active } : p));
    onSavePlans(updated);
  };

  const deletePlan = (planId: number) => {
    if (confirm('آیا از حذف این پلن مطمئن هستید؟')) {
      onSavePlans(plans.filter((p) => p.id !== planId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            مدیریت پلن‌ها و قیمت‌گذاری
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            تعیین مدت زمان، قیمت فاکتور PayPing و وضعیت هر پلن برای محصولات
          </p>
        </div>
        <button
          id="btn-add-plan"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          افزودن پلن جدید به {currentProduct?.name}
        </button>
      </div>

      {/* Product Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {products.map((prod) => (
          <button
            key={prod.id}
            id={`tab-prod-plan-${prod.id}`}
            onClick={() => setActiveProductId(prod.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeProductId === prod.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {prod.name}
          </button>
        ))}
      </div>

      {/* Plans List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white">{plan.name}</span>
                <button
                  onClick={() => togglePlanActive(plan.id)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border cursor-pointer ${
                    plan.is_active
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}
                >
                  {plan.is_active ? 'فعال در منو' : 'غیرفعال'}
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    مبلغ پلن:
                  </span>
                  <span className="font-bold text-emerald-400 text-sm">
                    {plan.price.toLocaleString('fa-IR')} <span className="text-[10px] font-normal text-slate-400">تومان</span>
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    مدت اشتراک:
                  </span>
                  <span className="font-bold text-white text-xs">{plan.duration_days} روز</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono">ID: {plan.id}</span>
              <button
                onClick={() => deletePlan(plan.id)}
                className="text-xs text-slate-500 hover:text-red-400 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                حذف پلن
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add Plan */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">
              افزودن پلن جدید برای {currentProduct?.name}
            </h3>

            <form onSubmit={handleCreatePlan} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">نام پلن:</label>
                <input
                  type="text"
                  required
                  placeholder="مثلاً: پلن سه‌ماهه تخفیف ویژه"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">مدت اعتبار (تعداد روز):</label>
                <input
                  type="number"
                  required
                  value={planDuration}
                  onChange={(e) => setPlanDuration(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">قیمت به تومان:</label>
                <input
                  type="number"
                  required
                  value={planPrice}
                  onChange={(e) => setPlanPrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
                >
                  افزودن پلن
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
