import { Product, Plan, User, Subscription, Payment, SystemSettings, DashboardStats, ActivityLog } from '../types';

const STORAGE_KEYS = {
  PRODUCTS: 'saas_products',
  PLANS: 'saas_plans',
  USERS: 'saas_users',
  SUBSCRIPTIONS: 'saas_subscriptions',
  PAYMENTS: 'saas_payments',
  SETTINGS: 'saas_settings',
  LOGS: 'saas_logs',
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'اشتراک ChatGPT سازمانی',
    slug: 'chatgpt',
    description: 'دسترسی سازمانی به جدیدترین مدل‌های GPT-4o، Canvas، بدون محدودیت ساعتی و با ضمانت عدم بلاک، حریم خصوصی سازمانی بدون آموزش روی داده‌ها.',
    is_active: true,
    required_fields: [
      { key: 'name', label: 'نام و نام خانوادگی', type: 'text', required: true },
      { key: 'phone', label: 'شماره موبایل فعال', type: 'phone', required: true },
    ]
  },
  {
    id: 2,
    name: 'اشتراک Gemini Advanced',
    slug: 'gemini',
    description: 'دسترسی به قدرتمندترین مدل هوش مصنوعی گوگل Ultra همراه با ۲ ترابایت فضای ابری Google One و دسترسی یکپارچه در جیمیل و داکس.',
    is_active: true,
    required_fields: [
      { key: 'name', label: 'نام و نام خانوادگی', type: 'text', required: true },
      { key: 'email', label: 'ایمیل گوگل (Gmail)', type: 'email', required: true },
      { key: 'phone', label: 'شماره تماس پشتیبانی', type: 'phone', required: false },
    ]
  }
];

const INITIAL_PLANS: Plan[] = [
  { id: 1, product_id: 1, name: 'پلن ۱ ماهه استاندارد', duration_days: 30, price: 390000, payping_product_url: 'https://payp.in/prod/gpt-1m', payping_product_code: 'gpt-1m', is_active: true, display_order: 1 },
  { id: 2, product_id: 1, name: 'پلن ۳ ماهه اقتصادی', duration_days: 90, price: 1050000, payping_product_url: 'https://payp.in/prod/gpt-3m', payping_product_code: 'gpt-3m', is_active: true, display_order: 2 },
  { id: 3, product_id: 1, name: 'پلن ۶ ماهه نقره‌ای', duration_days: 180, price: 1980000, payping_product_url: 'https://payp.in/prod/gpt-6m', payping_product_code: 'gpt-6m', is_active: true, display_order: 3 },
  { id: 4, product_id: 2, name: 'پلن ۱ ماهه اختصاصی', duration_days: 30, price: 350000, payping_product_url: 'https://payp.in/prod/gemini-1m', payping_product_code: 'gemini-1m', is_active: true, display_order: 1 },
  { id: 5, product_id: 2, name: 'پلن ۳ ماهه اختصاصی', duration_days: 90, price: 950000, payping_product_url: 'https://payp.in/prod/gemini-3m', payping_product_code: 'gemini-3m', is_active: true, display_order: 2 },
];

const INITIAL_USERS: User[] = [
  { id: 1, name: 'علی رضایی', phone: '09121112233', email: 'ali.rezaei@example.com', telegram_id: '12849501', created_at: new Date(Date.now() - 35 * 86400000).toISOString() },
  { id: 2, name: 'مریم سهرابی', phone: '09354445566', email: 'maryam.sohrabi@gmail.com', telegram_id: '98472910', created_at: new Date(Date.now() - 26 * 86400000).toISOString() },
  { id: 3, name: 'حسین احمدی', phone: '09198887766', email: 'h.ahmadi@yahoo.com', bale_id: 'bale_44921', created_at: new Date(Date.now() - 12 * 86400000).toISOString() },
  { id: 4, name: 'سارا امینی', phone: '09127776655', email: 'sara.amini@gmail.com', telegram_id: '77219034', created_at: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: 5, name: 'پیمان کاظمی', phone: '09369998877', email: 'peyman.k@gmail.com', bale_id: 'bale_55102', created_at: new Date(Date.now() - 1 * 3600000).toISOString() },
];

const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 1,
    user_id: 1,
    product_id: 1,
    plan_id: 1,
    status: 'ACTIVE',
    source_platform: 'telegram',
    customer_info: { 'name': 'علی رضایی', 'phone': '09121112233' },
    start_date: new Date(Date.now() - 27 * 86400000).toISOString(),
    end_date: new Date(Date.now() + 3 * 86400000).toISOString(), // 3 days left!
    admin_notes: 'اینوایت به Workspace ارسال شد (ali.rezaei@example.com)',
    auto_renew_count: 0,
    created_at: new Date(Date.now() - 27 * 86400000).toISOString(),
  },
  {
    id: 2,
    user_id: 2,
    product_id: 2,
    plan_id: 4,
    status: 'ACTIVE',
    source_platform: 'telegram',
    customer_info: { 'name': 'مریم سهرابی', 'email': 'maryam.sohrabi@gmail.com', 'phone': '09354445566' },
    start_date: new Date(Date.now() - 26 * 86400000).toISOString(),
    end_date: new Date(Date.now() + 4 * 86400000).toISOString(), // 4 days left!
    admin_notes: 'عضویت گروه خانواده گوگل تایید شد',
    auto_renew_count: 0,
    created_at: new Date(Date.now() - 26 * 86400000).toISOString(),
  },
  {
    id: 3,
    user_id: 3,
    product_id: 1,
    plan_id: 2,
    status: 'ACTIVE',
    source_platform: 'bale',
    customer_info: { 'name': 'حسین احمدی', 'phone': '09198887766' },
    start_date: new Date(Date.now() - 12 * 86400000).toISOString(),
    end_date: new Date(Date.now() + 78 * 86400000).toISOString(),
    admin_notes: 'اکانت Workspace اختصاصی تحویل شد',
    auto_renew_count: 0,
    created_at: new Date(Date.now() - 12 * 86400000).toISOString(),
  },
  {
    id: 4,
    user_id: 4,
    product_id: 1,
    plan_id: 1,
    status: 'EXPIRED',
    source_platform: 'telegram',
    customer_info: { 'name': 'سارا امینی', 'phone': '09127776655' },
    start_date: new Date(Date.now() - 35 * 86400000).toISOString(),
    end_date: new Date(Date.now() - 5 * 86400000).toISOString(),
    admin_notes: 'دسترسی در Workspace قطع شد',
    auto_renew_count: 0,
    created_at: new Date(Date.now() - 35 * 86400000).toISOString(),
  },
  {
    id: 5,
    user_id: 5,
    product_id: 2,
    plan_id: 4,
    status: 'PENDING_ACTIVATION',
    source_platform: 'bale',
    customer_info: { 'name': 'پیمان کاظمی', 'email': 'peyman.k@gmail.com', 'phone': '09369998877' },
    admin_notes: '',
    auto_renew_count: 0,
    created_at: new Date(Date.now() - 1 * 3600000).toISOString(),
  }
];

const INITIAL_PAYMENTS: Payment[] = [
  { id: 1, subscription_id: 1, user_id: 1, user_name: 'علی رضایی', user_phone: '09121112233', amount: 390000, client_ref_id: 'SUB-1-F8A2D9', ref_id: 'SHAPARAK_98241032', status: 'SUCCESS', created_at: new Date(Date.now() - 27 * 86400000).toISOString(), paid_at: new Date(Date.now() - 27 * 86400000).toISOString() },
  { id: 2, subscription_id: 2, user_id: 2, user_name: 'مریم سهرابی', user_phone: '09354445566', amount: 350000, client_ref_id: 'SUB-2-B31C04', ref_id: 'SHAPARAK_76104921', status: 'SUCCESS', created_at: new Date(Date.now() - 26 * 86400000).toISOString(), paid_at: new Date(Date.now() - 26 * 86400000).toISOString() },
  { id: 3, subscription_id: 3, user_id: 3, user_name: 'حسین احمدی', user_phone: '09198887766', amount: 1050000, client_ref_id: 'SUB-3-E04F7A', ref_id: 'SHAPARAK_88192034', status: 'SUCCESS', created_at: new Date(Date.now() - 12 * 86400000).toISOString(), paid_at: new Date(Date.now() - 12 * 86400000).toISOString() },
  { id: 4, subscription_id: 5, user_id: 5, user_name: 'پیمان کاظمی', user_phone: '09369998877', amount: 350000, client_ref_id: 'SUB-5-A992DC', ref_id: 'SHAPARAK_55109823', status: 'SUCCESS', created_at: new Date(Date.now() - 1 * 3600000).toISOString(), paid_at: new Date(Date.now() - 1 * 3600000).toISOString() },
];

const INITIAL_SETTINGS: SystemSettings = {
  telegram_token: '',
  bale_token: '',
  admin_telegram_chat_id: '12345678',
  payping_token: '',
  payping_return_url: 'http://localhost:8000/api/payment/callback',
  test_mode: true,
  reminder_5d_msg: 'اشتراک شما ۵ روز دیگر به پایان می‌رسد. لطفاً جهت تمدید اقدام فرمایید.',
  reminder_3d_msg: 'یادآوری دوم: ۳ روز تا پایان اشتراک شما باقی مانده است.',
  reminder_exp_msg: 'اشتراک شما امروز به پایان می‌رسد.',
  admin_expired_msg: 'اشتراک کاربر X منقضی شده است. لطفاً دسترسی را بررسی و قطع کنید.',
};

const INITIAL_LOGS: ActivityLog[] = [
  { id: '1', type: 'sale', title: 'خرید جدید در بله', description: 'پیمان کاظمی پلن یک‌ماهه Gemini Advanced را خریداری کرد.', timestamp: new Date(Date.now() - 1 * 3600000).toISOString() },
  { id: '2', type: 'reminder', title: 'ارسال پیام یادآوری ۳ روز مانده', description: 'پیام یادآوری سررسید به علی رضایی در تلگرام ارسال شد.', timestamp: new Date(Date.now() - 4 * 3600000).toISOString() },
  { id: '3', type: 'activation', title: 'فعال‌سازی اشتراک', description: 'اشتراک ChatGPT سازمانی حسین احمدی فعال شد.', timestamp: new Date(Date.now() - 12 * 86400000).toISOString() },
];

export class StorageService {
  private static getItem<T>(key: string, defaultVal: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  private static setItem<T>(key: string, val: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error('Storage error:', e);
    }
  }

  static getProducts(): Product[] {
    return this.getItem<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }

  static saveProducts(products: Product[]): void {
    this.setItem(STORAGE_KEYS.PRODUCTS, products);
  }

  static getPlans(): Plan[] {
    return this.getItem<Plan[]>(STORAGE_KEYS.PLANS, INITIAL_PLANS);
  }

  static savePlans(plans: Plan[]): void {
    this.setItem(STORAGE_KEYS.PLANS, plans);
  }

  static getUsers(): User[] {
    return this.getItem<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  }

  static saveUsers(users: User[]): void {
    this.setItem(STORAGE_KEYS.USERS, users);
  }

  static getSubscriptions(): Subscription[] {
    const subs = this.getItem<Subscription[]>(STORAGE_KEYS.SUBSCRIPTIONS, INITIAL_SUBSCRIPTIONS);
    const users = this.getUsers();
    const products = this.getProducts();
    const plans = this.getPlans();

    // Populate relations
    return subs.map(sub => ({
      ...sub,
      user: users.find(u => u.id === sub.user_id),
      product: products.find(p => p.id === sub.product_id),
      plan: plans.find(pl => pl.id === sub.plan_id),
    }));
  }

  static saveSubscriptions(subs: Subscription[]): void {
    // Strip relation objects before saving
    const plain = subs.map(({ user, product, plan, ...rest }) => rest);
    this.setItem(STORAGE_KEYS.SUBSCRIPTIONS, plain);
  }

  static getPayments(): Payment[] {
    return this.getItem<Payment[]>(STORAGE_KEYS.PAYMENTS, INITIAL_PAYMENTS);
  }

  static savePayments(payments: Payment[]): void {
    this.setItem(STORAGE_KEYS.PAYMENTS, payments);
  }

  static getSettings(): SystemSettings {
    return this.getItem<SystemSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }

  static saveSettings(settings: SystemSettings): void {
    this.setItem(STORAGE_KEYS.SETTINGS, settings);
  }

  static getLogs(): ActivityLog[] {
    return this.getItem<ActivityLog[]>(STORAGE_KEYS.LOGS, INITIAL_LOGS);
  }

  static addLog(type: ActivityLog['type'], title: string, description: string): void {
    const logs = this.getLogs();
    logs.unshift({
      id: Math.random().toString(36).substring(2, 9),
      type,
      title,
      description,
      timestamp: new Date().toISOString()
    });
    this.setItem(STORAGE_KEYS.LOGS, logs.slice(0, 50));
  }

  // --- Actions ---

  static activateSubscription(subId: number, adminNotes: string = ''): Subscription {
    const subs = this.getSubscriptions();
    const sub = subs.find(s => s.id === subId);
    if (!sub) throw new Error('اشتراک یافت نشد');

    const plan = this.getPlans().find(p => p.id === sub.plan_id);
    const duration = plan ? plan.duration_days : 30;

    const now = new Date();
    sub.status = 'ACTIVE';
    sub.start_date = now.toISOString();
    
    const end = new Date(now.getTime() + duration * 86400000);
    sub.end_date = end.toISOString();
    if (adminNotes) {
      sub.admin_notes = adminNotes;
    }

    this.saveSubscriptions(subs);
    this.addLog(
      'activation',
      'فعال‌سازی دستی اشتراک',
      `اشتراک ${sub.product?.name || ''} برای کاربر ${sub.user?.name || ''} تا تاریخ ${end.toLocaleDateString('fa-IR')} فعال شد.`
    );
    return sub;
  }

  static extendSubscription(subId: number, days: number, adminNotes?: string): Subscription {
    const subs = this.getSubscriptions();
    const sub = subs.find(s => s.id === subId);
    if (!sub) throw new Error('اشتراک یافت نشد');

    const currentEnd = sub.end_date ? new Date(sub.end_date) : new Date();
    const baseDate = currentEnd > new Date() ? currentEnd : new Date();
    const newEnd = new Date(baseDate.getTime() + days * 86400000);

    sub.end_date = newEnd.toISOString();
    sub.status = 'ACTIVE';
    sub.auto_renew_count = (sub.auto_renew_count || 0) + 1;
    if (adminNotes) {
      sub.admin_notes = adminNotes;
    }

    this.saveSubscriptions(subs);
    this.addLog(
      'renewal',
      'تمدید هوشمند اشتراک',
      `اشتراک ${sub.user?.name || ''} به مدت ${days} روز تمدید شد (تا ${newEnd.toLocaleDateString('fa-IR')}).`
    );
    return sub;
  }

  static updateSubscriptionStatus(subId: number, status: Subscription['status'], notes?: string): void {
    const subs = this.getSubscriptions();
    const sub = subs.find(s => s.id === subId);
    if (sub) {
      sub.status = status;
      if (notes !== undefined) sub.admin_notes = notes;
      this.saveSubscriptions(subs);
      this.addLog('activation', 'تغییر وضعیت اشتراک', `وضعیت اشتراک ${sub.user?.name || ''} به ${status} تغییر یافت.`);
    }
  }

  static simulatePurchase(params: {
    productId: number;
    planId: number;
    platform: 'telegram' | 'bale';
    customerInfo: Record<string, string>;
  }): { sub: Subscription; payment: Payment } {
    const users = this.getUsers();
    const plans = this.getPlans();
    const products = this.getProducts();

    const plan = plans.find(p => p.id === params.planId);
    const product = products.find(p => p.id === params.productId);
    if (!plan || !product) throw new Error('پلن یا محصول معتبر نیست.');

    const name = params.customerInfo.name || 'کاربر جدید';
    const phone = params.customerInfo.phone || '';
    const email = params.customerInfo.email || '';

    // Smart user lookup
    let user = users.find(u => (phone && u.phone === phone) || (email && u.email === email));
    if (!user) {
      user = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name,
        phone,
        email,
        telegram_id: params.platform === 'telegram' ? `sim_${Math.floor(10000000 + Math.random() * 90000000)}` : undefined,
        bale_id: params.platform === 'bale' ? `bale_${Math.floor(10000 + Math.random() * 90000)}` : undefined,
        created_at: new Date().toISOString()
      };
      users.push(user);
      this.saveUsers(users);
    }

    const subs = this.getSubscriptions();
    
    // Check for SMART RENEWAL on active/expiring subscription
    let existingSub = subs.find(s => s.user_id === user!.id && s.product_id === product.id && (s.status === 'ACTIVE' || s.status === 'PENDING_ACTIVATION'));
    let sub: Subscription;

    if (existingSub && existingSub.status === 'ACTIVE' && existingSub.end_date) {
      // Extend end_date directly
      const currentEnd = new Date(existingSub.end_date);
      const newEnd = new Date(currentEnd.getTime() + plan.duration_days * 86400000);
      existingSub.end_date = newEnd.toISOString();
      existingSub.auto_renew_count = (existingSub.auto_renew_count || 0) + 1;
      existingSub.customer_info = params.customerInfo;
      sub = existingSub;
    } else {
      // Create new pending activation
      sub = {
        id: subs.length > 0 ? Math.max(...subs.map(s => s.id)) + 1 : 1,
        user_id: user.id,
        product_id: product.id,
        plan_id: plan.id,
        status: 'PENDING_ACTIVATION',
        source_platform: params.platform,
        customer_info: params.customerInfo,
        auto_renew_count: 0,
        created_at: new Date().toISOString()
      };
      subs.unshift(sub);
    }
    this.saveSubscriptions(subs);

    // Record Payment
    const payments = this.getPayments();
    const clientRefId = `SUB-${sub.id}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const refId = `SHAPARAK_${Math.floor(10000000 + Math.random() * 90000000)}`;

    const payment: Payment = {
      id: payments.length > 0 ? Math.max(...payments.map(p => p.id)) + 1 : 1,
      subscription_id: sub.id,
      user_id: user.id,
      user_name: user.name,
      user_phone: user.phone,
      amount: plan.price,
      client_ref_id: clientRefId,
      ref_id: refId,
      status: 'SUCCESS',
      created_at: new Date().toISOString(),
      paid_at: new Date().toISOString()
    };
    payments.unshift(payment);
    this.savePayments(payments);

    this.addLog(
      'sale',
      `پرداخت موفق از ${params.platform === 'telegram' ? 'تلگرام' : 'بله'}`,
      `کاربر ${user.name} پلن ${plan.name} را با مبلغ ${plan.price.toLocaleString('fa-IR')} تومان خریداری کرد.`
    );

    return { sub, payment };
  }

  static getStats(): DashboardStats {
    const subs = this.getSubscriptions();
    const payments = this.getPayments().filter(p => p.status === 'SUCCESS');
    const users = this.getUsers();

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const monthStr = now.toISOString().substring(0, 7);

    const todaySales = payments
      .filter(p => p.paid_at && p.paid_at.startsWith(todayStr))
      .reduce((sum, p) => sum + p.amount, 0);

    const monthSales = payments
      .filter(p => p.paid_at && p.paid_at.startsWith(monthStr))
      .reduce((sum, p) => sum + p.amount, 0);

    const totalSales = payments.reduce((sum, p) => sum + p.amount, 0);

    const activeUsers = subs.filter(s => s.status === 'ACTIVE').length;
    const pendingActivation = subs.filter(s => s.status === 'PENDING_ACTIVATION').length;
    const expiredUsers = subs.filter(s => s.status === 'EXPIRED').length;

    // Expiring within 5 days
    const fiveDaysFromNow = new Date(now.getTime() + 5 * 86400000);
    const expiringSoon = subs.filter(s => {
      if (s.status !== 'ACTIVE' || !s.end_date) return false;
      const end = new Date(s.end_date);
      return end >= now && end <= fiveDaysFromNow;
    }).length;

    return {
      today_sales: todaySales,
      month_sales: monthSales,
      total_sales: totalSales,
      active_users: activeUsers,
      pending_activation: pendingActivation,
      expired_users: expiredUsers,
      expiring_soon: expiringSoon,
      total_users: users.length
    };
  }
}
