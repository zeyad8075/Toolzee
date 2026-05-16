import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ImageIcon, Megaphone, ShieldCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import SupportNote from '@/components/content/SupportNote';
import JsonLd from '@/components/seo/JsonLd';
import ToolIcon, { type ToolIconKey } from '@/components/tools/ToolIcon';
import { getGuidesForLocale } from '@/lib/guides';
import { buildLocalizedMetadata } from '@/lib/metadata';
import { buildItemListSchema, buildWebsiteSchema } from '@/lib/structured-data';

const homePageContent = {
  en: {
    title: 'Toolzee – Free Online Tools',
    description: 'Free browser-based tools for images, PDFs, QR codes, text utilities, and passwords.',
    toolListLabel: 'Toolzee tools',
  },
  ar: {
    title: 'Toolzee – أدوات مجانية عبر الإنترنت',
    description: 'أدوات مجانية تعمل عبر المتصفح للصور وPDF وQR والنصوص وكلمات المرور.',
    toolListLabel: 'أدوات Toolzee',
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = homePageContent[locale === 'ar' ? 'ar' : 'en'];

  return buildLocalizedMetadata({
    locale: locale === 'ar' ? 'ar' : 'en',
    path: '',
    title: page.title,
    description: page.description,
  });
}

const toolCards = [
  { key: 'compress', href: 'compress-image', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 22%, transparent), color-mix(in srgb, var(--accent-2) 7%, transparent))' },
  { key: 'convert', href: 'convert-image', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, transparent), color-mix(in srgb, var(--accent-2) 5%, transparent))' },
  { key: 'resize', href: 'resize-image', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-2) 18%, transparent), color-mix(in srgb, var(--accent) 5%, transparent))' },
  { key: 'removeBackground', href: 'remove-background', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 16%, transparent), color-mix(in srgb, var(--surface-2) 72%, transparent))' },
  { key: 'qr', href: 'qr-generator', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 20%, transparent), color-mix(in srgb, var(--surface-2) 70%, transparent))' },
  { key: 'imageToPdf', href: 'image-to-pdf', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-2) 20%, transparent), color-mix(in srgb, var(--surface-2) 60%, transparent))' },
  { key: 'mergePdf', href: 'merge-pdf', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, transparent), color-mix(in srgb, var(--surface-2) 68%, transparent))' },
  { key: 'splitPdf', href: 'split-pdf', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-2) 16%, transparent), color-mix(in srgb, var(--surface-2) 68%, transparent))' },
  { key: 'compressPdf', href: 'compress-pdf', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 14%, transparent), color-mix(in srgb, var(--accent-2) 8%, transparent))' },
  { key: 'pdfToImage', href: 'pdf-to-image', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-2) 18%, transparent), color-mix(in srgb, var(--surface-2) 72%, transparent))' },
  { key: 'rotatePdf', href: 'rotate-pdf', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 17%, transparent), color-mix(in srgb, var(--surface-2) 66%, transparent))' },
  { key: 'removePdfPages', href: 'remove-pdf-pages', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-2) 15%, transparent), color-mix(in srgb, var(--surface-2) 70%, transparent))' },
  { key: 'extractPdfPages', href: 'extract-pdf-pages', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 15%, transparent), color-mix(in srgb, var(--surface-2) 70%, transparent))' },
  { key: 'addPageNumbers', href: 'add-page-numbers', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-2) 17%, transparent), color-mix(in srgb, var(--surface-2) 65%, transparent))' },
  { key: 'addWatermark', href: 'add-watermark', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 16%, transparent), color-mix(in srgb, var(--accent-2) 6%, transparent))' },
  { key: 'wordCounter', href: 'word-counter', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 16%, transparent), color-mix(in srgb, var(--surface-2) 72%, transparent))' },
  { key: 'passwordGenerator', href: 'password-generator', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-2) 16%, transparent), color-mix(in srgb, var(--surface-2) 65%, transparent))' },
  { key: 'wifiQr', href: 'wifi-qr-code', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, transparent), color-mix(in srgb, var(--surface-2) 65%, transparent))' },
  { key: 'whatsappQr', href: 'whatsapp-qr-code', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-2) 18%, transparent), color-mix(in srgb, var(--surface-2) 70%, transparent))' },
  { key: 'vcardQr', href: 'vcard-qr-code', gradient: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 15%, transparent), color-mix(in srgb, var(--accent-2) 6%, transparent))' },
] satisfies Array<{ key: ToolIconKey; href: string; gradient: string }>;

const homeEditorialContent = {
  en: {
    decisionTitle: 'Choose the right workflow first',
    decisionIntro: 'Most file tasks become easier when you decide what outcome you need before opening a tool. These quick paths help visitors understand which workflow actually fits the job.',
    decisionCards: [
      {
        title: 'Choosing the right image workflow',
        desc: 'Compression, resizing, conversion, and image-to-PDF solve different problems. Start with the destination, then pick the tool.',
        href: 'guides/choose-the-right-image-tool',
        cta: 'Read image guide',
      },
      {
        title: 'Handling PDFs without extra software',
        desc: 'Merge packets, extract the right pages, reduce heavy files, or export visual previews when review is the goal.',
        href: 'guides/practical-pdf-workflows',
        cta: 'Read PDF guide',
      },
      {
        title: 'Making QR codes that scan reliably',
        desc: 'Choose the right QR type, keep the payload clean, and test the final size before you print or share it.',
        href: 'guides/qr-code-best-practices',
        cta: 'Read QR guide',
      },
    ],
    guidesTitle: 'Original guides that support the tools',
    guidesIntro: 'The tools are fast, but the site should still help visitors make better decisions. These guides explain tradeoffs, common mistakes, and practical use cases in plain language.',
    guidesBrowse: 'Browse all guides',
    trustTitle: 'What makes Toolzee more useful than a bare tool shell',
    trustIntro: 'A good utility site should not stop at a button and a download. It should explain what the tool does, when to use it, and how to avoid avoidable mistakes.',
    trustCards: [
      {
        title: 'Original supporting content',
        desc: 'Guides, help copy, and policy pages are written around the actual Toolzee workflows instead of filler text.',
      },
      {
        title: 'Clear public pages',
        desc: 'About, privacy, terms, and contact information are available from every page so visitors can evaluate the site before using it.',
      },
      {
        title: 'Privacy-aware monetization',
        desc: 'Google ads and analytics are tied to visitor choice through the site privacy controls instead of loading blindly on first paint.',
      },
    ],
    toolNotes: {
      compress: 'Best for website uploads, product photos, and email attachments that need smaller file sizes.',
      convert: 'Helpful when a platform needs JPG, transparency needs PNG, or you want a modern WebP copy.',
      resize: 'Use before publishing when the image dimensions are much larger than the layout needs.',
      removeBackground: 'Create transparent PNGs for product photos, profiles, thumbnails, and social posts.',
      qr: 'Create simple QR codes for links, landing pages, menus, or short text.',
      imageToPdf: 'Turn several reference images into one document that is easier to send and store.',
      mergePdf: 'Combine reports, forms, or signed pages into a single review packet.',
      splitPdf: 'Pull out the exact pages each recipient actually needs.',
      compressPdf: 'Shrink PDFs that are awkward to share or upload.',
      pdfToImage: 'Export pages as images for previews, slides, or thumbnails.',
      rotatePdf: 'Fix sideways scanned pages before sharing or archiving.',
      removePdfPages: 'Delete blank, duplicate, or sensitive pages from a PDF.',
      extractPdfPages: 'Save only the pages you need as a new PDF.',
      addPageNumbers: 'Add simple numbering for packets, drafts, and reviews.',
      addWatermark: 'Stamp a visible label across every PDF page.',
      wordCounter: 'Check draft length, character limits, and rough reading time before publishing.',
      passwordGenerator: 'Generate long random passwords for accounts that need stronger security.',
      wifiQr: 'Help guests join a network without typing the password manually.',
      whatsappQr: 'Start chats from posters, receipts, profiles, or support handoffs.',
      vcardQr: 'Make business cards and event handouts easier to save to a phone.',
    } satisfies Record<ToolIconKey, string>,
  },
  ar: {
    decisionTitle: 'اختر سير العمل المناسب أولاً',
    decisionIntro: 'تصبح معظم مهام الملفات أسهل عندما تحدد النتيجة التي تريدها قبل فتح الأداة. تساعد هذه المسارات السريعة الزائر على فهم الأداة المناسبة للمهمة فعلاً.',
    decisionCards: [
      {
        title: 'اختيار مسار الصور المناسب',
        desc: 'الضغط وتغيير الحجم والتحويل وتحويل الصور إلى PDF تعالج مشاكل مختلفة. ابدأ من الوجهة ثم اختر الأداة.',
        href: 'guides/choose-the-right-image-tool',
        cta: 'اقرأ دليل الصور',
      },
      {
        title: 'التعامل مع PDF دون برامج إضافية',
        desc: 'ادمج الحزم، واستخرج الصفحات المطلوبة، وقلل حجم الملفات الثقيلة، أو حوّل الصفحات إلى صور عندما تكون المراجعة البصرية هي الهدف.',
        href: 'guides/practical-pdf-workflows',
        cta: 'اقرأ دليل PDF',
      },
      {
        title: 'إنشاء رموز QR سهلة المسح',
        desc: 'اختر نوع QR المناسب، واجعل المحتوى نظيفاً، واختبر الحجم النهائي قبل الطباعة أو النشر.',
        href: 'guides/qr-code-best-practices',
        cta: 'اقرأ دليل QR',
      },
    ],
    guidesTitle: 'أدلة أصلية تدعم الأدوات',
    guidesIntro: 'الأدوات سريعة، لكن الموقع يجب أن يساعد الزائر أيضاً على اتخاذ قرار أفضل. تشرح هذه الأدلة المقايضات والأخطاء الشائعة وحالات الاستخدام العملية بلغة واضحة.',
    guidesBrowse: 'تصفح جميع الأدلة',
    trustTitle: 'ما الذي يجعل Toolzee أكثر فائدة من مجرد صفحة أداة',
    trustIntro: 'الموقع الجيد لا يكتفي بزر تنزيل فقط، بل يشرح ما الذي تفعله الأداة ومتى تستخدمها وكيف تتجنب الأخطاء القابلة للتفادي.',
    trustCards: [
      {
        title: 'محتوى داعم أصلي',
        desc: 'الأدلة ونصوص المساعدة والصفحات التعريفية مكتوبة حول سير العمل الفعلي في Toolzee وليست نصوصاً حشوية.',
      },
      {
        title: 'صفحات عامة واضحة',
        desc: 'صفحات حول وخصوصية وشروط واتصال متاحة من كل صفحة حتى يتمكن الزائر من تقييم الموقع قبل الاستخدام.',
      },
      {
        title: 'تمويل يراعي الخصوصية',
        desc: 'إعلانات Google والتحليلات مرتبطة باختيار الزائر من إعدادات الخصوصية بدلاً من تحميلها تلقائياً منذ اللحظة الأولى.',
      },
    ],
    toolNotes: {
      compress: 'مناسب لرفع الصور إلى المواقع وصور المنتجات ومرفقات البريد التي تحتاج إلى حجم أخف.',
      convert: 'مفيد عندما تتطلب المنصة JPG أو تحتاج إلى الشفافية مع PNG أو تريد نسخة WebP أحدث.',
      resize: 'استخدمه قبل النشر عندما تكون أبعاد الصورة أكبر بكثير من حاجة التصميم.',
      removeBackground: 'أنشئ صور PNG شفافة للمنتجات والصور الشخصية والمصغرات ومنشورات الشبكات.',
      qr: 'أنشئ رموز QR بسيطة للروابط والصفحات المقصودة والقوائم أو النصوص القصيرة.',
      imageToPdf: 'حوّل عدة صور مرجعية إلى مستند واحد أسهل في الإرسال والحفظ.',
      mergePdf: 'اجمع التقارير أو النماذج أو الصفحات الموقعة في حزمة مراجعة واحدة.',
      splitPdf: 'استخرج الصفحات التي يحتاجها كل مستلم فقط.',
      compressPdf: 'قلل حجم ملفات PDF التي يصعب رفعها أو مشاركتها.',
      pdfToImage: 'حوّل الصفحات إلى صور لاستخدامها في المعاينات أو العروض أو المصغرات.',
      rotatePdf: 'صحح الصفحات الممسوحة بشكل جانبي قبل المشاركة أو الأرشفة.',
      removePdfPages: 'احذف الصفحات الفارغة أو المكررة أو الحساسة من ملف PDF.',
      extractPdfPages: 'احفظ الصفحات التي تحتاجها فقط في ملف PDF جديد.',
      addPageNumbers: 'أضف ترقيماً بسيطاً للحزم والمسودات والمراجعات.',
      addWatermark: 'ضع تسمية مرئية كعلامة مائية على كل صفحات PDF.',
      wordCounter: 'راجع طول المسودة وحدود الأحرف ووقت القراءة التقريبي قبل النشر.',
      passwordGenerator: 'أنشئ كلمات مرور طويلة وعشوائية للحسابات التي تحتاج إلى أمان أقوى.',
      wifiQr: 'ساعد الضيوف على الاتصال بالشبكة دون كتابة كلمة المرور يدوياً.',
      whatsappQr: 'ابدأ محادثات من الملصقات أو الفواتير أو الصفحات الشخصية أو تحويلات الدعم.',
      vcardQr: 'اجعل بطاقات العمل والمنشورات أسهل للحفظ كجهة اتصال على الهاتف.',
    } satisfies Record<ToolIconKey, string>,
  },
} as const;

type FeatureIconKey = 'browserTools' | 'private' | 'ads';

function FeatureIcon({ name }: { name: FeatureIconKey }) {
  const icons = {
    browserTools: ImageIcon,
    private: ShieldCheck,
    ads: Megaphone,
  };
  const Icon = icons[name];

  return <Icon aria-hidden="true" size={24} strokeWidth={2.1} />;
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const page = homePageContent[normalizedLocale];
  const editorial = homeEditorialContent[normalizedLocale];
  const t = await getTranslations();
  const guides = getGuidesForLocale(normalizedLocale);
  const toolList = toolCards.map(card => ({
    name: t(`tools.${card.key}.name`),
    path: card.href,
  }));
  const features = (locale === 'ar'
    ? [
        { icon: 'browserTools', title: 'أدوات الصور محلية', desc: 'الضغط والتحويل وتغيير الحجم وتوليد QR تعمل مباشرة داخل متصفحك.' },
        { icon: 'private', title: 'بدون حساب', desc: 'يمكنك استخدام الأدوات الأساسية فوراً دون إنشاء حساب أو رفع ملفات الصور إلى خادمنا.' },
        { icon: 'ads', title: 'مجاني ومدعوم بالإعلانات', desc: 'تبقى الأدوات الأساسية مجانية عبر إعلانات واضحة وغير مضللة.' },
      ]
    : [
        { icon: 'browserTools', title: 'Browser-based image tools', desc: 'Compression, conversion, resizing, and QR generation happen directly in your browser.' },
        { icon: 'private', title: 'No account needed', desc: 'Use the core tools immediately without creating an account or uploading image files to our server.' },
        { icon: 'ads', title: 'Free and ad-supported', desc: 'The core tools stay free through clearly labeled ads.' },
      ]) satisfies Array<{ icon: FeatureIconKey; title: string; desc: string }>;

  return (
    <div>
      <JsonLd id="toolzee-website-schema" data={buildWebsiteSchema(normalizedLocale, page.description)} />
      <JsonLd id="toolzee-itemlist-schema" data={buildItemListSchema(normalizedLocale, page.toolListLabel, toolList)} />

      {/* Hero */}
      <section style={{
        padding: '80px 24px 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow orbs */}
        <div style={{
          position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-soft) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 100,
            background: 'var(--accent-soft)', border: '1px solid var(--accent-border)',
            fontSize: 13, color: 'var(--accent-2)', marginBottom: 28, fontWeight: 500,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            {t('hero.badge')}
          </div>

          <h1 style={{
            fontSize: 'clamp(42px, 7vw, 76px)', fontWeight: 800,
            lineHeight: 1.05, letterSpacing: '-0.03em',
            marginBottom: 8, fontFamily: 'var(--font-heading)',
          }}>
            {t('hero.title')}<br />
            <span className="gradient-text">{t('hero.titleHighlight')}</span>
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 19px)',
            color: 'var(--text-2)', lineHeight: 1.7,
            maxWidth: 560, margin: '20px auto 40px',
          }}>
            {t('hero.subtitle')}
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#tools" className="btn-primary" style={{
              padding: '14px 32px', borderRadius: 12,
              fontWeight: 700, fontSize: 15, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              {t('hero.cta')} <ArrowRight aria-hidden="true" size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section style={{
        padding: '0 24px 48px',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
        }}>
          {features.map(f => (
            <div key={f.icon} style={{
              padding: '20px 24px', borderRadius: 14,
              background: 'var(--surface)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'flex-start', gap: 14,
            }}>
              <span style={{ color: 'var(--accent)', flexShrink: 0 }}>
                <FeatureIcon name={f.icon} />
              </span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{f.title}</div>
                <div style={{ color: 'var(--text-3)', fontSize: 13, lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 24px 68px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ maxWidth: 760, marginBottom: 24 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>
              {editorial.decisionTitle}
            </h2>
            <p style={{ color: 'var(--text-2)', fontSize: 16, lineHeight: 1.8 }}>
              {editorial.decisionIntro}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 18,
          }}>
            {editorial.decisionCards.map(card => (
              <Link
                key={card.href}
                href={`/${normalizedLocale}/${card.href}`}
                className="tool-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  padding: '22px 20px',
                  borderRadius: 20,
                  textDecoration: 'none',
                }}
              >
                <div style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {normalizedLocale === 'ar' ? 'دليل عملي' : 'Practical guide'}
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-heading)', lineHeight: 1.25 }}>
                  {card.title}
                </h3>
                <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.75, flex: 1 }}>
                  {card.desc}
                </p>
                <div style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  {card.cta} <ArrowRight aria-hidden="true" size={15} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section id="tools" style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>
              {t('tools.title')}
            </h2>
            <p style={{ color: 'var(--text-2)', fontSize: 16 }}>{t('tools.subtitle')}</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}>
            {toolCards.map(card => (
              <ToolCard key={card.key} card={card} locale={locale} t={t} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 72px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'end', flexWrap: 'wrap', marginBottom: 24 }}>
            <div style={{ maxWidth: 760 }}>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>
                {editorial.guidesTitle}
              </h2>
              <p style={{ color: 'var(--text-2)', fontSize: 16, lineHeight: 1.8 }}>
                {editorial.guidesIntro}
              </p>
            </div>
            <Link href={`/${normalizedLocale}/guides`} className="btn-ghost" style={{
              textDecoration: 'none',
              borderRadius: 14,
              padding: '12px 16px',
              fontWeight: 700,
              fontSize: 14,
            }}>
              {editorial.guidesBrowse}
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 18,
          }}>
            {guides.map(guide => (
              <Link
                key={guide.slug}
                href={`/${normalizedLocale}/guides/${guide.slug}`}
                className="tool-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  padding: '22px 20px',
                  borderRadius: 20,
                  textDecoration: 'none',
                }}
              >
                <div style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {guide.category}
                </div>
                <h3 style={{ fontSize: 21, fontWeight: 800, fontFamily: 'var(--font-heading)', lineHeight: 1.3 }}>
                  {guide.title}
                </h3>
                <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.75, flex: 1 }}>
                  {guide.description}
                </p>
                <div style={{ color: 'var(--text-3)', fontSize: 13 }}>{guide.readTime}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 68px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ maxWidth: 760, marginBottom: 24 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12, fontFamily: 'var(--font-heading)' }}>
              {editorial.trustTitle}
            </h2>
            <p style={{ color: 'var(--text-2)', fontSize: 16, lineHeight: 1.8 }}>
              {editorial.trustIntro}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 18,
          }}>
            {editorial.trustCards.map(card => (
              <div key={card.title} style={{
                padding: '22px 20px',
                borderRadius: 20,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10, fontFamily: 'var(--font-heading)' }}>
                  {card.title}
                </h3>
                <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.75 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{
        maxWidth: 800, margin: '0 auto 60px', padding: '0 24px',
      }}>
        <SupportNote title={t('supportNote.title')} body={t('supportNote.body')} />
      </div>
    </div>
  );
}

function ToolCard({
  card,
  locale,
  t,
}: {
  card: typeof toolCards[0];
  locale: string;
  t: Awaited<ReturnType<typeof getTranslations>>;
}) {
  return (
    <Link href={`/${locale}/${card.href}`} className="tool-card" style={{
      borderRadius: 16, padding: 28, textDecoration: 'none',
      display: 'flex', flexDirection: 'column', gap: 12,
      background: card.gradient,
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: 'var(--surface)', border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent)',
      }}>
        <ToolIcon name={card.key} size={24} strokeWidth={2.2} />
      </div>
      <div>
        <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>
          {t(`tools.${card.key}.name`)}
        </h3>
        <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.5 }}>
          {t(`tools.${card.key}.desc`)}
        </p>
        <p style={{ color: 'var(--text-3)', fontSize: 13, lineHeight: 1.6, marginTop: 10 }}>
          {homeEditorialContent[(locale === 'ar' ? 'ar' : 'en')].toolNotes[card.key]}
        </p>
      </div>
      <div style={{
        marginTop: 'auto', fontSize: 13, color: 'var(--accent)',
        fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4,
      }}>
        {t('common.free')} · {t('common.fast')} <ArrowRight aria-hidden="true" size={14} />
      </div>
    </Link>
  );
}
