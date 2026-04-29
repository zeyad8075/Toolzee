type SupportedLocale = 'en' | 'ar';

export const guideSlugs = [
  'choose-the-right-image-tool',
  'prepare-images-for-web-email-and-pdf',
  'practical-pdf-workflows',
  'qr-code-best-practices',
  'quick-text-checks-and-password-hygiene',
] as const;

export type GuideSlug = (typeof guideSlugs)[number];

interface GuideSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

interface RelatedTool {
  href: string;
  label: string;
}

interface GuideContent {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  readTime: string;
  category: string;
  sections: GuideSection[];
  takeawayTitle: string;
  takeaways: string[];
  relatedToolsTitle: string;
  relatedTools: RelatedTool[];
}

interface GuideEntry {
  slug: GuideSlug;
  en: GuideContent;
  ar: GuideContent;
}

const guides: GuideEntry[] = [
  {
    slug: 'choose-the-right-image-tool',
    en: {
      eyebrow: 'Image Guide',
      title: 'How to Choose the Right Image Tool for the Job',
      description: 'A practical guide to deciding when to compress, resize, convert, or bundle images into a PDF.',
      intro: 'Many image tasks look similar on the surface, but the right workflow depends on what problem you are actually trying to solve. This guide helps you choose the right tool before you waste time exporting the same file several times.',
      readTime: '6 min read',
      category: 'Image workflows',
      sections: [
        {
          title: 'Start with the problem, not the file',
          paragraphs: [
            'If the image already looks correct but loads slowly, your problem is usually file size, which points to compression. If it looks too large or too small in a layout, you usually need resizing instead.',
            'Format conversion matters when a file needs to work with a specific app, platform, or transparency requirement. Turning images into a PDF is a separate task entirely: it helps when you need one portable document instead of several loose files.',
          ],
          bullets: [
            'Use compression when download size is the main issue.',
            'Use resizing when pixel dimensions are wrong for the destination.',
            'Use conversion when a format is unsupported or inefficient.',
            'Use image-to-PDF when you need a single shareable document.',
          ],
        },
        {
          title: 'Compression and resizing are not the same thing',
          paragraphs: [
            'People often compress a huge image and still end up with a file that is heavier than expected because the width and height remain oversized. A 4000 pixel wide image can still be too large for a website or email even after a quality pass.',
            'Likewise, resizing alone does not always solve delivery problems. A resized image can still be saved in a heavy format or with quality settings that are much higher than the destination actually needs.',
          ],
          bullets: [
            'Resize first when the image dimensions are obviously larger than the target.',
            'Compress after resizing if you still need a smaller file.',
            'Keep an untouched original for cases where you need to export again.',
          ],
        },
        {
          title: 'Choose output formats based on use, not habit',
          paragraphs: [
            'JPEG usually works best for photos and mixed-color scenes where small file size matters. PNG is helpful when you need crisp edges, transparency, or screenshots that should stay sharp. WebP is often a good balance when the destination supports it.',
            'There is no single best format for every task. A useful workflow is to decide who will open the file, where it will be published, and whether transparency or editing flexibility matters after export.',
          ],
          bullets: [
            'Photos for websites or email: JPEG or WebP.',
            'Screenshots, graphics, and transparent assets: PNG or WebP.',
            'Documents built from images: combine them into one PDF when easy sharing matters more than image-level editing.',
          ],
        },
        {
          title: 'Work backwards from the destination',
          paragraphs: [
            'Web pages, email attachments, slide decks, print handoffs, and archive copies all have different constraints. The fastest way to make smart edits is to decide the destination before you upload anything.',
            'That habit saves time, preserves quality, and reduces repeat work. It also makes your exports feel deliberate instead of accidental.',
          ],
          bullets: [
            'Website uploads usually reward smaller dimensions and smaller file sizes.',
            'Email attachments benefit from lightweight files that still look clear on phones.',
            'Print or archive versions usually deserve a higher-quality source file than quick web copies.',
          ],
        },
      ],
      takeawayTitle: 'Quick takeaway',
      takeaways: [
        'Compression solves file-size problems.',
        'Resizing solves dimension problems.',
        'Conversion solves compatibility problems.',
        'Image-to-PDF solves organization and sharing problems.',
      ],
      relatedToolsTitle: 'Tools mentioned in this guide',
      relatedTools: [
        { href: 'compress-image', label: 'Compress Image' },
        { href: 'resize-image', label: 'Resize Image' },
        { href: 'convert-image', label: 'Convert Image' },
        { href: 'image-to-pdf', label: 'Image to PDF' },
      ],
    },
    ar: {
      eyebrow: 'دليل الصور',
      title: 'كيف تختار أداة الصور المناسبة للمهمة',
      description: 'دليل عملي يوضح متى تستخدم الضغط أو تغيير الحجم أو التحويل أو تحويل الصور إلى PDF.',
      intro: 'تبدو مهام الصور متشابهة في البداية، لكن سير العمل المناسب يعتمد على المشكلة التي تريد حلها فعلاً. يساعدك هذا الدليل على اختيار الأداة الصحيحة قبل أن تعيد تصدير الملف عدة مرات بلا داع.',
      readTime: 'قراءة 6 دقائق',
      category: 'سير عمل الصور',
      sections: [
        {
          title: 'ابدأ من المشكلة لا من الملف',
          paragraphs: [
            'إذا كانت الصورة تبدو صحيحة لكن تحميلها بطيء، فالمشكلة غالباً هي حجم الملف، وهنا يكون الضغط هو الخيار الأنسب. أما إذا كانت كبيرة جداً أو صغيرة جداً داخل التصميم، فأنت تحتاج غالباً إلى تغيير الحجم.',
            'التحويل مهم عندما تحتاج إلى تنسيق يناسب تطبيقاً أو منصة معينة أو عندما تحتاج إلى الشفافية. أما تحويل الصور إلى PDF فهو مهمة مختلفة تساعدك عندما تريد مستنداً واحداً بدلاً من عدة ملفات منفصلة.',
          ],
          bullets: [
            'استخدم الضغط عندما تكون المشكلة الأساسية هي حجم الملف.',
            'استخدم تغيير الحجم عندما تكون الأبعاد غير مناسبة للوجهة.',
            'استخدم التحويل عندما يكون التنسيق غير مناسب أو غير مدعوم.',
            'استخدم الصور إلى PDF عندما تحتاج إلى ملف واحد سهل المشاركة.',
          ],
        },
        {
          title: 'الضغط وتغيير الحجم ليسا الشيء نفسه',
          paragraphs: [
            'كثير من الناس يضغطون صورة ضخمة ثم يفاجؤون بأن الملف ما زال أثقل من المطلوب لأن العرض والارتفاع ما زالا كبيرين. فالصورة التي عرضها 4000 بكسل قد تبقى كبيرة جداً للموقع أو البريد حتى بعد الضغط.',
            'وبالعكس، تغيير الحجم وحده لا يحل المشكلة دائماً. فقد تصبح الصورة أصغر أبعاداً لكنها ما تزال محفوظة بتنسيق ثقيل أو بجودة أعلى من الحاجة الفعلية.',
          ],
          bullets: [
            'ابدأ بتغيير الحجم إذا كانت الأبعاد أكبر بوضوح من المطلوب.',
            'بعد ذلك استخدم الضغط إذا كنت ما زلت تحتاج إلى ملف أخف.',
            'احتفظ بنسخة أصلية غير معدلة إذا احتجت إلى إعادة التصدير لاحقاً.',
          ],
        },
        {
          title: 'اختر التنسيق بناءً على الاستخدام لا العادة',
          paragraphs: [
            'غالباً ما يكون JPEG مناسباً للصور الفوتوغرافية والمشاهد متعددة الألوان عندما يكون تقليل الحجم مهماً. ويكون PNG مفيداً عندما تحتاج إلى حواف واضحة أو خلفية شفافة أو لقطات شاشة حادة. أما WebP فيقدم توازناً جيداً في كثير من الحالات عندما تكون المنصة داعمة له.',
            'لا يوجد تنسيق مثالي لكل مهمة. الأفضل أن تحدد من سيفتح الملف وأين سيُنشر وهل تحتاج إلى الشفافية أو إلى المرونة في التعديل بعد التصدير.',
          ],
          bullets: [
            'صور المواقع أو البريد: JPEG أو WebP.',
            'اللقطات والرسومات والعناصر الشفافة: PNG أو WebP.',
            'المستندات المبنية من صور: اجمعها في PDF عندما تكون سهولة المشاركة أهم من تعديل كل صورة على حدة.',
          ],
        },
        {
          title: 'اعمل انطلاقاً من الوجهة النهائية',
          paragraphs: [
            'صفحات الويب والمرفقات البريدية والعروض التقديمية وملفات الطباعة والأرشفة كلها تفرض قيوداً مختلفة. أسرع طريقة لاتخاذ قرار جيد هي أن تحدد الوجهة قبل رفع أي ملف.',
            'هذه العادة توفر الوقت وتحافظ على الجودة وتقلل إعادة العمل. كما تجعل النتيجة تبدو مقصودة ومنظمة بدلاً من أن تكون مجرد تجربة عشوائية.',
          ],
          bullets: [
            'ملفات الويب تستفيد غالباً من أبعاد أصغر وأحجام أخف.',
            'مرفقات البريد تحتاج إلى ملفات خفيفة تبقى واضحة على الهاتف.',
            'نسخ الطباعة أو الأرشفة تستحق عادة جودة أعلى من نسخ الويب السريعة.',
          ],
        },
      ],
      takeawayTitle: 'الخلاصة السريعة',
      takeaways: [
        'الضغط يحل مشكلة حجم الملف.',
        'تغيير الحجم يحل مشكلة الأبعاد.',
        'التحويل يحل مشكلة التوافق.',
        'تحويل الصور إلى PDF يحل مشكلة التنظيم والمشاركة.',
      ],
      relatedToolsTitle: 'الأدوات المذكورة في هذا الدليل',
      relatedTools: [
        { href: 'compress-image', label: 'ضغط الصورة' },
        { href: 'resize-image', label: 'تغيير حجم الصورة' },
        { href: 'convert-image', label: 'تحويل الصورة' },
        { href: 'image-to-pdf', label: 'الصور إلى PDF' },
      ],
    },
  },
  {
    slug: 'prepare-images-for-web-email-and-pdf',
    en: {
      eyebrow: 'Image Guide',
      title: 'A Practical Checklist for Preparing Images for Web, Email, and PDF',
      description: 'A step-by-step image prep checklist covering size, dimensions, formats, and quality tradeoffs before you publish or share files.',
      intro: 'Good image prep is less about finding a magic setting and more about making a few smart decisions in the right order. This checklist gives you a repeatable workflow for everyday publishing and sharing tasks.',
      readTime: '7 min read',
      category: 'Image delivery',
      sections: [
        {
          title: 'Inspect the original before you change anything',
          paragraphs: [
            'Start by checking the current file size, pixel dimensions, and format. That basic scan tells you whether the problem is oversized dimensions, an inefficient format, or simply a quality setting that is too high for the destination.',
            'It also helps to ask whether the source image needs to stay editable. If it does, keep the original untouched and export a separate delivery copy.',
          ],
          bullets: [
            'Check file size and dimensions first.',
            'Note whether the image is a photo, graphic, logo, or screenshot.',
            'Preserve an original copy before making delivery edits.',
          ],
        },
        {
          title: 'Set a target based on where the image will go',
          paragraphs: [
            'Images for websites usually need different settings than images for email attachments or PDF handoffs. A web page rewards smaller file sizes and reasonable dimensions, while a PDF for internal review may tolerate larger images if legibility matters more than download weight.',
            'The goal is not to use the smallest possible file every time. The goal is to make the file small enough for the destination without creating visible problems.',
          ],
          bullets: [
            'For web pages, prioritize fast loading and enough detail for the layout.',
            'For email, balance clarity with lightweight attachments that are easy to send.',
            'For PDFs, think about whether the reader will zoom in, print, or just skim on a phone.',
          ],
        },
        {
          title: 'Use the tools in a deliberate order',
          paragraphs: [
            'A useful default order is resize, then convert if needed, then compress. That sequence prevents you from spending time optimizing pixels that will be discarded later.',
            'When you are assembling several images into a document, finish the image cleanup first and then build the PDF. That keeps the final file cleaner and easier to share.',
          ],
          bullets: [
            'Resize early when dimensions are too large.',
            'Convert only if the destination benefits from a different format.',
            'Compress after the structure of the file is settled.',
            'Build the final PDF after the image files are already prepared.',
          ],
        },
        {
          title: 'Review the output like a real user',
          paragraphs: [
            'Before sending or publishing, open the result on an ordinary screen and check whether text, edges, and important details still look trustworthy. Small defects become more obvious when screenshots contain tiny labels or when product photos need to look polished.',
            'This step is where you catch over-compression, accidental resizing mistakes, and poor format choices. A quick visual review is often faster than repeating the whole process later.',
          ],
          bullets: [
            'Zoom in on details that users actually care about.',
            'Test at normal viewing size, not only at 100 percent zoom.',
            'If the output looks soft, step back one change instead of guessing wildly.',
          ],
        },
      ],
      takeawayTitle: 'Checklist summary',
      takeaways: [
        'Inspect the source.',
        'Set a destination-specific target.',
        'Resize, convert, and compress in a sensible order.',
        'Always review the final output before you publish or send it.',
      ],
      relatedToolsTitle: 'Useful tools for this workflow',
      relatedTools: [
        { href: 'resize-image', label: 'Resize Image' },
        { href: 'convert-image', label: 'Convert Image' },
        { href: 'compress-image', label: 'Compress Image' },
        { href: 'image-to-pdf', label: 'Image to PDF' },
      ],
    },
    ar: {
      eyebrow: 'دليل الصور',
      title: 'قائمة عملية لتجهيز الصور للويب والبريد وملفات PDF',
      description: 'خطوات عملية لتجهيز الصور قبل النشر أو المشاركة، مع التركيز على الحجم والأبعاد والتنسيق وجودة الإخراج.',
      intro: 'إعداد الصور الجيد لا يعتمد على إعداد سحري واحد، بل على مجموعة قرارات ذكية تُتخذ بالترتيب الصحيح. تقدم هذه القائمة سير عمل قابلاً للتكرار لمهام النشر والمشاركة اليومية.',
      readTime: 'قراءة 7 دقائق',
      category: 'تجهيز الصور',
      sections: [
        {
          title: 'افحص الأصل قبل أي تعديل',
          paragraphs: [
            'ابدأ بمراجعة حجم الملف الحالي وأبعاده وتنسيقه. هذا الفحص السريع يخبرك ما إذا كانت المشكلة هي كبر الأبعاد أو سوء اختيار التنسيق أو إعداد جودة أعلى من الحاجة.',
            'ومن المفيد أيضاً أن تسأل نفسك إن كنت تحتاج إلى الاحتفاظ بنسخة قابلة للتعديل. إذا كانت الإجابة نعم، فاحتفظ بالأصل واصنع نسخة منفصلة للنشر أو الإرسال.',
          ],
          bullets: [
            'تحقق من حجم الملف والأبعاد أولاً.',
            'حدد ما إذا كانت الصورة فوتوغرافية أم لقطة شاشة أم رسماً أو شعاراً.',
            'احتفظ بنسخة أصلية قبل إنشاء نسخة الاستخدام النهائي.',
          ],
        },
        {
          title: 'حدد الهدف حسب مكان الاستخدام',
          paragraphs: [
            'إعدادات صور الويب تختلف عادة عن إعدادات مرفقات البريد أو ملفات PDF. فالويب يكافئ الأحجام الخفيفة والأبعاد المعقولة، بينما قد يتسامح ملف PDF الداخلي مع صور أكبر إذا كانت القراءة أهم من سرعة التحميل.',
            'الهدف ليس الوصول إلى أصغر ملف ممكن دائماً، بل إلى ملف خفيف بما يكفي للوجهة من دون إفساد المظهر أو الوضوح.',
          ],
          bullets: [
            'للويب: ركز على السرعة مع وضوح كاف داخل التصميم.',
            'للبريد: وازن بين الوضوح وخفة المرفق.',
            'لـ PDF: فكر هل سيقوم القارئ بالتكبير أو الطباعة أو مجرد التصفح السريع على الهاتف.',
          ],
        },
        {
          title: 'استخدم الأدوات بترتيب مقصود',
          paragraphs: [
            'الترتيب العملي المعتاد هو: تغيير الحجم أولاً، ثم التحويل عند الحاجة، ثم الضغط. هذا يمنعك من تحسين بكسلات ستتخلص منها لاحقاً.',
            'وعندما تجمع عدة صور في مستند واحد، نظف الصور أولاً ثم أنشئ PDF في النهاية. بهذه الطريقة يكون الملف النهائي أخف وأسهل في المشاركة.',
          ],
          bullets: [
            'ابدأ بتغيير الحجم إذا كانت الأبعاد أكبر من الحاجة.',
            'استخدم التحويل فقط عندما تستفيد الوجهة من تنسيق مختلف.',
            'نفّذ الضغط بعد استقرار شكل الملف النهائي.',
            'أنشئ PDF بعد تجهيز الصور لا قبله.',
          ],
        },
        {
          title: 'راجع النتيجة كما يراها المستخدم',
          paragraphs: [
            'قبل الإرسال أو النشر افتح النتيجة على شاشة عادية وتحقق من بقاء النصوص والحواف والتفاصيل المهمة واضحة وموثوقة. تظهر مشاكل الضغط الزائد بسرعة في اللقطات التي تحتوي على نص صغير أو في الصور التي يفترض أن تبدو احترافية.',
            'هذه الخطوة تكشف لك الأخطاء قبل أن تعيد العملية كاملة. وغالباً ما تكون مراجعة بصرية سريعة أسرع من إعادة التصدير عدة مرات بعد النشر.',
          ],
          bullets: [
            'كبّر التفاصيل التي تهم المستخدم فعلاً.',
            'اختبر النتيجة بالحجم الطبيعي لا عند تكبير 100% فقط.',
            'إذا بدت الصورة ناعمة أكثر من اللازم، ارجع خطوة واحدة بدل التخمين العشوائي.',
          ],
        },
      ],
      takeawayTitle: 'ملخص القائمة',
      takeaways: [
        'افحص الأصل.',
        'حدد هدفاً مناسباً للوجهة.',
        'رتب الخطوات: تغيير حجم ثم تحويل ثم ضغط.',
        'راجع النتيجة النهائية قبل النشر أو الإرسال.',
      ],
      relatedToolsTitle: 'أدوات مفيدة لهذا المسار',
      relatedTools: [
        { href: 'resize-image', label: 'تغيير حجم الصورة' },
        { href: 'convert-image', label: 'تحويل الصورة' },
        { href: 'compress-image', label: 'ضغط الصورة' },
        { href: 'image-to-pdf', label: 'الصور إلى PDF' },
      ],
    },
  },
  {
    slug: 'practical-pdf-workflows',
    en: {
      eyebrow: 'PDF Guide',
      title: 'Practical PDF Workflows for Merging, Splitting, Compressing, and Exporting',
      description: 'A plain-language guide to organizing PDF tasks and picking the right workflow for combining, splitting, compressing, and exporting pages.',
      intro: 'PDF work becomes easier when you treat each task as a document problem instead of a software problem. This guide helps you choose the simplest workflow based on what you need to send, save, or review.',
      readTime: '7 min read',
      category: 'PDF workflows',
      sections: [
        {
          title: 'Define the job before touching the files',
          paragraphs: [
            'Sometimes you need one combined document for delivery. Sometimes you only need a few pages from a long report. Other times the main problem is that the file is too heavy to share or too awkward to review on a phone.',
            'Once you name the actual job, the tool choice becomes much clearer. Merge when you need one packet, split when you need extraction, compress when sharing is painful, and export pages to images when visual review matters more than the PDF container.',
          ],
          bullets: [
            'Merge for one clean handoff.',
            'Split for page extraction or smaller subsets.',
            'Compress for easier sharing when the file feels too heavy.',
            'Convert to images when you need quick visual previews or slide-like assets.',
          ],
        },
        {
          title: 'Merging works best after you settle the order',
          paragraphs: [
            'Before merging, confirm which version of each document belongs in the final packet. Combining drafts too early often creates a second round of manual cleanup later.',
            'If the packet has a natural reading order, arrange the files before you merge. That small step prevents confusion for reviewers and reduces avoidable rework.',
          ],
          bullets: [
            'Confirm the final versions first.',
            'Keep the intended reading order clear before merging.',
            'Use one merged file when the audience should see a single narrative.',
          ],
        },
        {
          title: 'Splitting is useful for privacy and focus',
          paragraphs: [
            'Splitting is not only about convenience. It is often the safer choice when a long PDF contains sensitive pages that should not be forwarded or when different recipients only need different sections.',
            'A smaller PDF is also easier to review. Readers are more likely to focus when the file contains only the pages that matter to the task in front of them.',
          ],
          bullets: [
            'Extract only the pages a recipient actually needs.',
            'Use smaller subsets to reduce accidental oversharing.',
            'Split long files for cleaner review or approval loops.',
          ],
        },
        {
          title: 'Compression and export have tradeoffs',
          paragraphs: [
            'Compressing a PDF can make sharing easier, but the right balance depends on the document. Text-heavy files may shrink nicely, while image-heavy files can become softer if you push too hard.',
            'Exporting PDF pages to images is helpful when you need thumbnails, visual proofs, or assets for slides. The tradeoff is that the result is no longer a structured document, so searchability and text selection may not matter in the same way.',
          ],
          bullets: [
            'Review image-heavy PDFs carefully after compression.',
            'Use image export when the page needs to be reused visually.',
            'Keep the original PDF when document structure still matters.',
          ],
        },
      ],
      takeawayTitle: 'Best-practice summary',
      takeaways: [
        'Choose the workflow based on the document job.',
        'Merge after the file order is settled.',
        'Split to improve focus and reduce oversharing.',
        'Compress and image export are useful, but both have output tradeoffs.',
      ],
      relatedToolsTitle: 'Related PDF tools',
      relatedTools: [
        { href: 'merge-pdf', label: 'Merge PDF' },
        { href: 'split-pdf', label: 'Split PDF' },
        { href: 'compress-pdf', label: 'Compress PDF' },
        { href: 'pdf-to-image', label: 'PDF to Image' },
      ],
    },
    ar: {
      eyebrow: 'دليل PDF',
      title: 'سير عمل عملي لدمج PDF وتقسيمه وضغطه وتحويل صفحاته',
      description: 'دليل واضح لاختيار المسار المناسب عند دمج ملفات PDF أو تقسيمها أو ضغطها أو تحويل صفحاتها إلى صور.',
      intro: 'تصبح مهام PDF أسهل عندما تتعامل معها كمشكلة مستندات لا كمشكلة برنامج. يساعدك هذا الدليل على اختيار أبسط مسار حسب ما تريد إرساله أو حفظه أو مراجعته.',
      readTime: 'قراءة 7 دقائق',
      category: 'سير عمل PDF',
      sections: [
        {
          title: 'حدد المهمة قبل لمس الملفات',
          paragraphs: [
            'أحياناً تحتاج إلى ملف واحد مجمع للإرسال. وأحياناً لا تحتاج إلا إلى صفحات محددة من تقرير طويل. وفي حالات أخرى تكون المشكلة الأساسية أن الملف ثقيل جداً للمشاركة أو غير مناسب للمراجعة على الهاتف.',
            'بمجرد تسمية المهمة الحقيقية يصبح اختيار الأداة أوضح بكثير. ادمج عندما تحتاج إلى حزمة واحدة، وقسّم عندما تحتاج إلى استخراج، واضغط عندما تصبح المشاركة مزعجة، وحوّل الصفحات إلى صور عندما تكون المعاينة البصرية أهم من ملف PDF نفسه.',
          ],
          bullets: [
            'استخدم الدمج عندما تريد تسليماً واحداً منظماً.',
            'استخدم التقسيم عندما تحتاج إلى صفحات أو أجزاء محددة.',
            'استخدم الضغط عندما يصبح الملف ثقيلاً على الإرسال أو التنزيل.',
            'حوّل إلى صور عندما تحتاج إلى معاينات مرئية أو عناصر للعروض.',
          ],
        },
        {
          title: 'الدمج ينجح أكثر عندما يكون الترتيب محسوباً',
          paragraphs: [
            'قبل الدمج تأكد من أن كل ملف هو النسخة الصحيحة التي يفترض أن تدخل في الحزمة النهائية. فدمج المسودات مبكراً يؤدي غالباً إلى جولة إضافية من التنظيف لاحقاً.',
            'إذا كان للمستند ترتيب قراءة منطقي، فاضبط ترتيب الملفات قبل الدمج. هذه الخطوة البسيطة تمنع ارتباك المراجعين وتقلل العمل الزائد.',
          ],
          bullets: [
            'تحقق من النسخ النهائية أولاً.',
            'رتب الملفات حسب مسار القراءة المقصود.',
            'استخدم ملفاً واحداً مدمجاً عندما يجب أن يرى القارئ قصة أو حزمة متماسكة.',
          ],
        },
        {
          title: 'التقسيم مفيد للخصوصية ولتركيز المراجعة',
          paragraphs: [
            'التقسيم ليس فقط للراحة. بل هو خيار أكثر أماناً عندما يحتوي الملف الطويل على صفحات حساسة لا ينبغي إرسالها، أو عندما يحتاج كل مستلم إلى جزء مختلف.',
            'كما أن الملف الأصغر أسهل في المراجعة. فالقراء يركزون أكثر عندما يحتوي المستند على الصفحات المرتبطة بالمهمة الحالية فقط.',
          ],
          bullets: [
            'استخرج فقط الصفحات التي يحتاجها المستلم.',
            'استخدم الأجزاء الأصغر لتقليل خطر مشاركة معلومات زائدة.',
            'قسّم الملفات الطويلة لتسهيل دورات المراجعة والموافقة.',
          ],
        },
        {
          title: 'الضغط والتحويل إلى صور لهما مقايضات',
          paragraphs: [
            'ضغط PDF يجعل المشاركة أسهل، لكن التوازن المناسب يعتمد على طبيعة الملف. فالمستندات النصية قد تنكمش جيداً، بينما المستندات الغنية بالصور قد تصبح أنعم أو أقل وضوحاً إذا بالغت في الضغط.',
            'تحويل صفحات PDF إلى صور مفيد عندما تحتاج إلى معاينات أو إثباتات بصرية أو عناصر للعروض. لكن النتيجة لم تعد مستنداً منظماً، لذلك قد لا يعود البحث داخل النص أو تحديده بنفس الأهمية.',
          ],
          bullets: [
            'راجع ملفات PDF الغنية بالصور جيداً بعد الضغط.',
            'استخدم التحويل إلى صور عندما تحتاج إلى إعادة استخدام الصفحة بصرياً.',
            'احتفظ بالملف الأصلي عندما تظل بنية المستند مهمة.',
          ],
        },
      ],
      takeawayTitle: 'ملخص أفضل الممارسات',
      takeaways: [
        'اختر المسار بناءً على وظيفة المستند.',
        'ادمج بعد تثبيت ترتيب الملفات.',
        'قسّم لتحسين التركيز وتقليل المشاركة الزائدة.',
        'الضغط والتحويل إلى صور مفيدان لكن لكل منهما آثار على النتيجة.',
      ],
      relatedToolsTitle: 'أدوات PDF ذات الصلة',
      relatedTools: [
        { href: 'merge-pdf', label: 'دمج PDF' },
        { href: 'split-pdf', label: 'تقسيم PDF' },
        { href: 'compress-pdf', label: 'ضغط PDF' },
        { href: 'pdf-to-image', label: 'PDF إلى صور' },
      ],
    },
  },
  {
    slug: 'qr-code-best-practices',
    en: {
      eyebrow: 'QR Guide',
      title: 'QR Code Best Practices for Links, WiFi Access, WhatsApp, and Contact Cards',
      description: 'A practical guide to creating QR codes that scan reliably and fit the job, whether you are sharing a link, WiFi details, a WhatsApp chat, or contact information.',
      intro: 'A QR code only feels useful when it scans quickly and sends people to the right place without confusion. This guide covers the small decisions that make QR codes more reliable in the real world.',
      readTime: '6 min read',
      category: 'QR workflows',
      sections: [
        {
          title: 'Pick the QR type that matches the task',
          paragraphs: [
            'A general link or text QR works well for simple sharing, but specialty formats save users extra steps when the action is more specific. WiFi QR codes can help guests join a network quickly, WhatsApp QR codes can open a chat, and vCard QR codes can store contact details in a phone-friendly format.',
            'Choosing the right type improves the user experience because the destination action is built into the payload instead of being explained separately in tiny text next to the code.',
          ],
          bullets: [
            'Use a plain QR for URLs, text snippets, or broad compatibility.',
            'Use WiFi QR for in-person access to a known network.',
            'Use WhatsApp QR when the goal is to start a chat.',
            'Use vCard QR when you want people to save a contact quickly.',
          ],
        },
        {
          title: 'Keep the content clean and intentional',
          paragraphs: [
            'Short, accurate payloads are easier to manage and test. A messy destination link, a typo in a phone number, or contact details that are out of date can make a QR code look broken even when the code itself is technically valid.',
            'Before downloading, review the exact content that will be encoded. It is much easier to correct a field before printing than after the code has been shared widely.',
          ],
          bullets: [
            'Double-check URLs, phone numbers, and names before generating the code.',
            'Avoid unnecessary tracking parameters when you do not need them.',
            'Use the simplest payload that still achieves the goal.',
          ],
        },
        {
          title: 'Design for scan reliability, not decoration',
          paragraphs: [
            'High contrast is usually more important than visual flair. Dark foreground on a light background remains the safest default for posters, packaging, printed cards, and screens.',
            'Size also matters. A code that looks fine on your laptop may become frustrating when printed small or shown from a distance. The more real-world friction you expect, the more conservative your design should be.',
          ],
          bullets: [
            'Prefer strong contrast and enough whitespace around the code.',
            'Test the final size in the same medium where users will scan it.',
            'Avoid decorative color choices that reduce legibility.',
          ],
        },
        {
          title: 'Test the final output in context',
          paragraphs: [
            'A code can be valid and still be inconvenient. Test with more than one phone if possible, and try the code from the same printed size or screen distance your audience will actually use.',
            'Context matters for privacy as well. WiFi, WhatsApp, and contact QR codes often contain details that are meant for a specific audience, so think carefully before posting them in places where they can be copied indefinitely.',
          ],
          bullets: [
            'Scan the exported code before you publish it.',
            'Test in the same lighting and distance conditions that users will face.',
            'Be deliberate about where you place codes that contain private details.',
          ],
        },
      ],
      takeawayTitle: 'What matters most',
      takeaways: [
        'Use the QR type that fits the action.',
        'Keep the payload accurate and minimal.',
        'Favor contrast and size over decoration.',
        'Test the final code in the real context where people will scan it.',
      ],
      relatedToolsTitle: 'QR tools covered here',
      relatedTools: [
        { href: 'qr-generator', label: 'QR Generator' },
        { href: 'wifi-qr-code', label: 'WiFi QR Code' },
        { href: 'whatsapp-qr-code', label: 'WhatsApp QR Code' },
        { href: 'vcard-qr-code', label: 'vCard QR Code' },
      ],
    },
    ar: {
      eyebrow: 'دليل QR',
      title: 'أفضل ممارسات رموز QR للروابط والواي فاي وواتساب وجهات الاتصال',
      description: 'دليل عملي لإنشاء رموز QR سهلة المسح وملائمة للمهمة سواء كانت لرابط أو شبكة واي فاي أو محادثة واتساب أو بطاقة تواصل.',
      intro: 'يصبح رمز QR مفيداً فعلاً عندما يُمسح بسرعة ويوصل الناس إلى النتيجة الصحيحة دون ارتباك. يشرح هذا الدليل القرارات الصغيرة التي تجعل الرمز أكثر موثوقية في الاستخدام الحقيقي.',
      readTime: 'قراءة 6 دقائق',
      category: 'سير عمل QR',
      sections: [
        {
          title: 'اختر نوع QR المناسب للمهمة',
          paragraphs: [
            'رمز الرابط أو النص العادي مناسب للمشاركة البسيطة، لكن الأنواع المتخصصة توفر على المستخدم خطوات إضافية عندما تكون المهمة أكثر تحديداً. فـ QR الواي فاي يساعد الضيوف على الانضمام للشبكة بسرعة، وQR واتساب يفتح المحادثة، وQR بطاقة التواصل يساعد على حفظ البيانات مباشرة.',
            'اختيار النوع المناسب يحسن التجربة لأن الإجراء النهائي يصبح مضمناً داخل الرمز نفسه بدلاً من شرحه بجانبه بنص صغير.',
          ],
          bullets: [
            'استخدم الرمز العادي للروابط والنصوص والحالات العامة.',
            'استخدم QR الواي فاي للوصول السريع إلى شبكة معروفة.',
            'استخدم QR واتساب عندما يكون الهدف بدء محادثة مباشرة.',
            'استخدم QR بطاقة التواصل عندما تريد حفظ جهة اتصال بسرعة.',
          ],
        },
        {
          title: 'اجعل المحتوى نظيفاً ومقصوداً',
          paragraphs: [
            'المحتوى القصير والدقيق أسهل في المراجعة والاختبار. الرابط غير المرتب أو الخطأ في رقم الهاتف أو بيانات التواصل القديمة قد تجعل الرمز يبدو معطلاً رغم أن بنية الرمز صحيحة تقنياً.',
            'قبل التنزيل راجع المحتوى الفعلي الذي سيتم ترميزه. فمن الأسهل بكثير تصحيح الحقول قبل الطباعة أو النشر.',
          ],
          bullets: [
            'تحقق من الروابط والأرقام والأسماء قبل إنشاء الرمز.',
            'تجنب إضافات التتبع غير الضرورية عندما لا تحتاج إليها.',
            'استخدم أبسط محتوى يحقق الهدف المطلوب.',
          ],
        },
        {
          title: 'صمّم لأجل سهولة المسح لا لأجل الزخرفة',
          paragraphs: [
            'التباين العالي أهم غالباً من المظهر المزخرف. فالمربعات الداكنة على خلفية فاتحة تبقى الخيار الأكثر أماناً في الملصقات والبطاقات والشاشات.',
            'الحجم مهم أيضاً. قد يبدو الرمز جيداً على شاشة الكمبيوتر لكنه يصبح مزعجاً عند طباعته بحجم صغير أو عرضه من مسافة. وكلما زادت ظروف الاستخدام صعوبة احتجت إلى تصميم أكثر تحفظاً.',
          ],
          bullets: [
            'فضّل التباين القوي واترك مساحة بيضاء كافية حول الرمز.',
            'اختبر الحجم النهائي في نفس الوسيط الذي سيُستخدم فيه.',
            'تجنب ألواناً جمالية تقلل من الوضوح الفعلي.',
          ],
        },
        {
          title: 'اختبر النتيجة في سياقها الحقيقي',
          paragraphs: [
            'قد يكون الرمز صالحاً لكنه غير مريح. اختبره بأكثر من هاتف إن أمكن، وجرّبه من نفس المسافة أو الحجم المطبوع الذي سيستخدمه الجمهور.',
            'والسياق مهم أيضاً من ناحية الخصوصية. فرموز الواي فاي وواتساب وبطاقات التواصل تحمل عادة بيانات موجهة لفئة محددة، لذا فكّر جيداً قبل نشرها في أماكن يسهل نسخها منها دائماً.',
          ],
          bullets: [
            'امسح الرمز بعد التصدير وقبل النشر.',
            'اختبره في نفس ظروف الإضاءة والمسافة المتوقعة.',
            'كن حذراً في أماكن نشر الرموز التي تحمل بيانات خاصة.',
          ],
        },
      ],
      takeawayTitle: 'الأهم باختصار',
      takeaways: [
        'اختر نوع QR المناسب للفعل المطلوب.',
        'اجعل المحتوى دقيقاً ومختصراً.',
        'قدّم الوضوح والحجم المناسب على الزخرفة.',
        'اختبر الرمز في السياق الحقيقي الذي سيُستخدم فيه.',
      ],
      relatedToolsTitle: 'أدوات QR المشمولة',
      relatedTools: [
        { href: 'qr-generator', label: 'مولد QR' },
        { href: 'wifi-qr-code', label: 'QR للواي فاي' },
        { href: 'whatsapp-qr-code', label: 'QR للواتساب' },
        { href: 'vcard-qr-code', label: 'QR لبطاقة التواصل' },
      ],
    },
  },
  {
    slug: 'quick-text-checks-and-password-hygiene',
    en: {
      eyebrow: 'Text and Security Guide',
      title: 'Quick Text Checks and Better Password Hygiene for Everyday Work',
      description: 'A short guide to using word counts thoughtfully and generating strong passwords that are practical to store and reuse safely.',
      intro: 'Not every useful tool needs a long workflow. Word counting and password generation are simple tasks, but they become more valuable when you know what the numbers mean and how to handle the output responsibly.',
      readTime: '5 min read',
      category: 'Text and security basics',
      sections: [
        {
          title: 'Word count is a planning tool, not just a number',
          paragraphs: [
            'Writers, editors, students, marketers, and translators often use word counts to keep a draft aligned with a target length. Character counts and reading-time estimates become helpful when the destination has space limits or attention limits.',
            'The goal is not to hit a number blindly. A good count helps you judge whether the draft is proportionate to the job it needs to do.',
          ],
          bullets: [
            'Use word count to compare a draft against a target range.',
            'Use character count for forms, bios, and social posts.',
            'Use reading time as a rough expectation, not a strict promise.',
          ],
        },
        {
          title: 'Strong passwords depend more on length than clever tricks',
          paragraphs: [
            'A password becomes stronger when it is long, unpredictable, and unique to the account. Adding one symbol to a short reused password does less for you than using a much longer random password that is never recycled elsewhere.',
            'That is why password generators are useful: they remove the temptation to invent memorable but weak variations by hand.',
          ],
          bullets: [
            'Favor longer passwords over short complicated ones.',
            'Use a different password for each important account.',
            'Do not rely on minor variations of an old password.',
          ],
        },
        {
          title: 'Storage matters as much as generation',
          paragraphs: [
            'Generating a strong password is only part of the job. You also need a safe way to store it so you are not tempted to save it in notes, email drafts, or screenshots that are easy to lose control of.',
            'A password manager is usually the cleanest option because it lets you store long random passwords without expecting your memory to do impossible work.',
          ],
          bullets: [
            'Store strong passwords in a trusted password manager.',
            'Avoid reusing generated passwords across services.',
            'Treat exported or copied passwords as sensitive data while they are visible.',
          ],
        },
      ],
      takeawayTitle: 'Simple rules to keep',
      takeaways: [
        'Use counts to guide editing decisions, not to replace judgment.',
        'Prioritize password length, uniqueness, and randomness.',
        'Safe storage is part of password hygiene, not an afterthought.',
      ],
      relatedToolsTitle: 'Helpful tools',
      relatedTools: [
        { href: 'word-counter', label: 'Word Counter' },
        { href: 'password-generator', label: 'Password Generator' },
      ],
    },
    ar: {
      eyebrow: 'دليل النصوص والأمان',
      title: 'فحوصات النص السريعة وعادات أفضل لكلمات المرور في العمل اليومي',
      description: 'دليل مختصر لاستخدام عداد الكلمات بذكاء وإنشاء كلمات مرور قوية مع التعامل معها وتخزينها بشكل عملي وآمن.',
      intro: 'ليست كل أداة مفيدة بحاجة إلى سير عمل طويل. فعداد الكلمات ومولد كلمات المرور مهمتان بسيطتان، لكن قيمتهما تزيد عندما تفهم معنى الأرقام وكيف تتعامل مع النتيجة بشكل مسؤول.',
      readTime: 'قراءة 5 دقائق',
      category: 'أساسيات النص والأمان',
      sections: [
        {
          title: 'عداد الكلمات أداة تخطيط لا مجرد رقم',
          paragraphs: [
            'يستخدم الكتّاب والمحررون والطلاب والمسوقون والمترجمون عدد الكلمات لمطابقة المسودة مع طول مستهدف. ويصبح عدد الأحرف وتقدير وقت القراءة مفيدين عندما تفرض الوجهة حدود مساحة أو حدود انتباه.',
            'الهدف ليس مطاردة رقم بشكل أعمى. فالحساب الجيد يساعدك على معرفة ما إذا كان النص متناسباً مع المهمة التي يجب أن يؤديها.',
          ],
          bullets: [
            'استخدم عدد الكلمات لمقارنة المسودة بنطاق الطول المطلوب.',
            'استخدم عدد الأحرف للنماذج والنبذات والمنشورات القصيرة.',
            'اعتبر وقت القراءة تقديراً تقريبياً لا وعداً دقيقاً.',
          ],
        },
        {
          title: 'قوة كلمة المرور تعتمد على الطول أكثر من الحيل',
          paragraphs: [
            'تصبح كلمة المرور أقوى عندما تكون طويلة وعشوائية وفريدة للحساب. وإضافة رمز واحد إلى كلمة مرور قصيرة ومعاد استخدامها أقل فائدة من إنشاء كلمة أطول وعشوائية لا تتكرر في أي خدمة أخرى.',
            'ولهذا يكون مولد كلمات المرور مفيداً: فهو يبعدك عن إغراء ابتكار صيغ ضعيفة وسهلة التوقع يدوياً.',
          ],
          bullets: [
            'فضّل الكلمات الأطول على الكلمات القصيرة المعقدة شكلياً.',
            'استخدم كلمة مرور مختلفة لكل حساب مهم.',
            'لا تعتمد على تعديلات طفيفة لكلمة قديمة.',
          ],
        },
        {
          title: 'التخزين مهم بقدر التوليد',
          paragraphs: [
            'إنشاء كلمة مرور قوية ليس سوى جزء من المهمة. تحتاج أيضاً إلى وسيلة آمنة لحفظها كي لا تضطر إلى وضعها في الملاحظات أو البريد أو اللقطات التي يسهل فقد السيطرة عليها.',
            'غالباً ما يكون مدير كلمات المرور هو الخيار الأنظف لأنه يتيح لك الاحتفاظ بكلمات طويلة وعشوائية دون تحميل ذاكرتك ما لا يمكنها تحمله.',
          ],
          bullets: [
            'احفظ كلمات المرور القوية في مدير كلمات مرور موثوق.',
            'لا تعِد استخدام كلمة المرور المولدة في خدمات متعددة.',
            'تعامل مع كلمات المرور المنسوخة أو الظاهرة على الشاشة كبيانات حساسة.',
          ],
        },
      ],
      takeawayTitle: 'قواعد بسيطة مفيدة',
      takeaways: [
        'استخدم العدادات لتوجيه التحرير لا لاستبدال الحكم البشري.',
        'أعطِ الأولوية للطول والتفرد والعشوائية في كلمات المرور.',
        'التخزين الآمن جزء أساسي من نظافة كلمات المرور.',
      ],
      relatedToolsTitle: 'أدوات مفيدة',
      relatedTools: [
        { href: 'word-counter', label: 'عداد الكلمات' },
        { href: 'password-generator', label: 'مولد كلمات المرور' },
      ],
    },
  },
];

export function getGuidesForLocale(locale: SupportedLocale) {
  return guides.map(guide => ({
    slug: guide.slug,
    ...guide[locale],
  }));
}

export function getGuideBySlug(locale: SupportedLocale, slug: string) {
  const guide = guides.find(entry => entry.slug === slug);

  if (!guide) {
    return null;
  }

  return {
    slug: guide.slug,
    ...guide[locale],
  };
}

export function getGuidesBySlugs(locale: SupportedLocale, slugs: GuideSlug[]) {
  return slugs
    .map(slug => getGuideBySlug(locale, slug))
    .filter((guide): guide is NonNullable<ReturnType<typeof getGuideBySlug>> => Boolean(guide));
}
