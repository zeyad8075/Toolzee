type SupportedLocale = 'en' | 'ar';

export const guideSlugs = [
  'choose-the-right-image-tool',
  'prepare-images-for-web-email-and-pdf',
  'practical-pdf-workflows',
  'qr-code-best-practices',
  'quick-text-checks-and-password-hygiene',
  'reduce-image-size-for-websites',
  'resize-images-without-distortion',
  'choose-jpg-png-webp',
  'prepare-product-photos-for-online-stores',
  'make-documents-from-phone-photos',
  'organize-pdf-pages-before-sharing',
  'compress-pdf-for-email-upload',
  'turn-pdf-pages-into-preview-images',
  'safe-qr-codes-for-business-cards',
  'privacy-first-browser-tools',
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
  {
    slug: 'reduce-image-size-for-websites',
    en: {
      eyebrow: 'Image Optimization Guide',
      title: 'How to Reduce Image Size for Faster Websites',
      description: 'A practical guide to shrinking image files for websites while keeping the page clear, readable, and useful.',
      intro: 'Large images are one of the easiest ways to make a simple page feel slow. The best fix is not one magic quality number, but a sequence of small decisions about dimensions, format, and visible quality.',
      readTime: '6 min read',
      category: 'Web performance',
      sections: [
        {
          title: 'Start with display size',
          paragraphs: [
            'A website rarely needs the full resolution from a camera or phone. If an image will display at 900 pixels wide, uploading a 4000 pixel source usually adds weight without adding visible benefit.',
            'Resize the image first, then compress the delivery copy. This avoids spending time compressing pixels that the browser will only scale down later.',
          ],
          bullets: [
            'Match image width to the layout where it will appear.',
            'Keep a separate original if you may need a larger export later.',
            'Avoid using one giant image for every page placement.',
          ],
        },
        {
          title: 'Choose a format that fits the content',
          paragraphs: [
            'Photos usually compress well as JPG or WebP. Screenshots, simple graphics, and transparent assets may need PNG or WebP depending on whether transparency matters.',
            'Changing format can reduce file size dramatically, but it should not make text fuzzy or edges messy. Always inspect the final export before publishing.',
          ],
          bullets: [
            'Use JPG or WebP for most photos.',
            'Use PNG when transparency or crisp interface screenshots matter.',
            'Use WebP when the destination supports it and you want a smaller modern copy.',
          ],
        },
        {
          title: 'Check the page, not only the file',
          paragraphs: [
            'A smaller file is only useful if the page still communicates clearly. Product images, diagrams, and screenshots can tolerate different compression levels, so judge the result in context.',
            'Look at the image on a phone as well as a desktop screen. Mobile visitors are often the people most affected by heavy images and weak readability.',
          ],
          bullets: [
            'Preview important images after compression.',
            'Watch for blurry text, banding, and damaged edges.',
            'Prefer a slightly larger clear image over a tiny file that harms trust.',
          ],
        },
      ],
      takeawayTitle: 'Optimization order',
      takeaways: [
        'Resize to the real display size first.',
        'Choose the format based on image type.',
        'Compress and inspect the result in context.',
      ],
      relatedToolsTitle: 'Useful tools',
      relatedTools: [
        { href: 'resize-image', label: 'Resize Image' },
        { href: 'compress-image', label: 'Compress Image' },
        { href: 'convert-image', label: 'Convert Image' },
      ],
    },
    ar: {
      eyebrow: 'دليل تحسين الصور',
      title: 'كيف تقلل حجم الصور لتسريع مواقع الويب',
      description: 'دليل عملي لتقليل حجم الصور في المواقع مع الحفاظ على الوضوح والفائدة والثقة.',
      intro: 'الصور الكبيرة من أسرع الأسباب التي تجعل الصفحة البسيطة تبدو بطيئة. الحل الأفضل ليس رقماً سحرياً للجودة، بل سلسلة قرارات صغيرة حول الأبعاد والتنسيق والجودة المرئية.',
      readTime: 'قراءة 6 دقائق',
      category: 'أداء الويب',
      sections: [
        {
          title: 'ابدأ من حجم العرض',
          paragraphs: [
            'نادراً ما يحتاج الموقع إلى الدقة الكاملة لصورة الهاتف أو الكاميرا. إذا كانت الصورة ستظهر بعرض 900 بكسل، فإن رفع نسخة بعرض 4000 بكسل يضيف وزناً غالباً بلا فائدة واضحة.',
            'غيّر حجم الصورة أولاً ثم اضغط نسخة النشر. بهذه الطريقة لا تضيع وقتك في ضغط بكسلات سيقوم المتصفح بتصغيرها لاحقاً.',
          ],
          bullets: [
            'طابق عرض الصورة مع المكان الذي ستظهر فيه.',
            'احتفظ بنسخة أصلية إذا كنت قد تحتاج إلى تصدير أكبر لاحقاً.',
            'لا تستخدم صورة ضخمة واحدة لكل مواضع الصفحة.',
          ],
        },
        {
          title: 'اختر التنسيق حسب نوع المحتوى',
          paragraphs: [
            'غالباً ما تنضغط الصور الفوتوغرافية جيداً بصيغ JPG أو WebP. أما لقطات الشاشة والرسومات البسيطة والعناصر الشفافة فقد تحتاج PNG أو WebP حسب أهمية الشفافية.',
            'تغيير التنسيق قد يقلل الحجم كثيراً، لكنه لا يجب أن يجعل النص ضبابياً أو الحواف مشوهة. راجع النتيجة النهائية قبل النشر دائماً.',
          ],
          bullets: [
            'استخدم JPG أو WebP لمعظم الصور الفوتوغرافية.',
            'استخدم PNG عندما تهم الشفافية أو حدة لقطات الواجهة.',
            'استخدم WebP عندما تكون الجهة داعمة وتريد نسخة حديثة أخف.',
          ],
        },
        {
          title: 'افحص الصفحة لا الملف فقط',
          paragraphs: [
            'الملف الأصغر لا يفيد إذا أصبحت الصفحة أقل وضوحاً. صور المنتجات والمخططات واللقطات تتحمل مستويات ضغط مختلفة، لذلك احكم على النتيجة داخل سياقها.',
            'راجع الصورة على الهاتف كما تراجعها على سطح المكتب. زوار الهاتف غالباً هم الأكثر تأثراً بالصور الثقيلة وضعف القراءة.',
          ],
          bullets: [
            'عاين الصور المهمة بعد الضغط.',
            'انتبه للنص الضبابي والتدرجات التالفة والحواف المشوهة.',
            'فضّل صورة واضحة أكبر قليلاً على ملف صغير يضر الثقة.',
          ],
        },
      ],
      takeawayTitle: 'ترتيب التحسين',
      takeaways: [
        'غيّر الحجم إلى عرض الاستخدام الحقيقي أولاً.',
        'اختر التنسيق حسب نوع الصورة.',
        'اضغط النتيجة وراجعها داخل السياق.',
      ],
      relatedToolsTitle: 'أدوات مفيدة',
      relatedTools: [
        { href: 'resize-image', label: 'تغيير حجم الصورة' },
        { href: 'compress-image', label: 'ضغط الصورة' },
        { href: 'convert-image', label: 'تحويل الصورة' },
      ],
    },
  },
  {
    slug: 'resize-images-without-distortion',
    en: {
      eyebrow: 'Image Resizing Guide',
      title: 'How to Resize Images Without Stretching or Distortion',
      description: 'Learn how aspect ratio, target dimensions, and preview checks help keep resized images natural.',
      intro: 'Resizing is simple until a logo looks squeezed, a portrait looks wide, or a screenshot becomes unreadable. A careful resize keeps the relationship between width and height under control.',
      readTime: '5 min read',
      category: 'Image dimensions',
      sections: [
        {
          title: 'Understand aspect ratio',
          paragraphs: [
            'Aspect ratio is the relationship between width and height. If you change one side without adjusting the other proportionally, the image stretches and starts to look unnatural.',
            'Most everyday resizing should keep the aspect ratio locked unless you are intentionally preparing a cropped design area.',
          ],
          bullets: [
            'Lock aspect ratio for photos, screenshots, and logos.',
            'Use cropping when the destination requires a different shape.',
            'Avoid forcing a portrait into a wide box without planning the crop.',
          ],
        },
        {
          title: 'Pick dimensions from the destination',
          paragraphs: [
            'The right dimensions depend on where the image will be used. A profile photo, article image, store thumbnail, and email attachment all have different needs.',
            'When you know the destination, resize directly for that use instead of exporting several random versions.',
          ],
          bullets: [
            'Use smaller widths for email and quick sharing.',
            'Use layout-based widths for websites.',
            'Use square or portrait dimensions only when the platform expects them.',
          ],
        },
        {
          title: 'Preview text and edges',
          paragraphs: [
            'Some images look fine as thumbnails but fail when they contain text, charts, or small interface details. These elements need extra checking after resizing.',
            'If text becomes unreadable, choose a larger output or crop away less important surrounding space instead of shrinking everything equally.',
          ],
          bullets: [
            'Zoom in on screenshots after resizing.',
            'Check logos for soft edges.',
            'Use a larger output when small text matters.',
          ],
        },
      ],
      takeawayTitle: 'Resize safely',
      takeaways: [
        'Keep aspect ratio locked by default.',
        'Choose dimensions based on the final destination.',
        'Inspect text, faces, and logos after export.',
      ],
      relatedToolsTitle: 'Tools for this workflow',
      relatedTools: [
        { href: 'resize-image', label: 'Resize Image' },
        { href: 'compress-image', label: 'Compress Image' },
      ],
    },
    ar: {
      eyebrow: 'دليل تغيير الحجم',
      title: 'كيف تغير حجم الصور دون تمدد أو تشويه',
      description: 'تعلم كيف تساعد نسبة الأبعاد والقياسات المستهدفة والمعاينة في الحفاظ على صورة طبيعية بعد تغيير الحجم.',
      intro: 'تغيير الحجم يبدو بسيطاً إلى أن يصبح الشعار مضغوطاً أو الصورة الشخصية عريضة أو لقطة الشاشة غير مقروءة. التغيير الجيد يحافظ على العلاقة بين العرض والارتفاع.',
      readTime: 'قراءة 5 دقائق',
      category: 'أبعاد الصور',
      sections: [
        {
          title: 'افهم نسبة الأبعاد',
          paragraphs: [
            'نسبة الأبعاد هي العلاقة بين العرض والارتفاع. إذا غيرت أحد الجانبين دون تعديل الآخر بشكل متناسب، تتمدد الصورة وتبدأ بالظهور بشكل غير طبيعي.',
            'في أغلب الاستخدامات اليومية يجب إبقاء النسبة مقفلة إلا إذا كنت تجهز مساحة تصميم تحتاج إلى قص مقصود.',
          ],
          bullets: [
            'اقفل نسبة الأبعاد للصور واللقطات والشعارات.',
            'استخدم القص عندما تتطلب الوجهة شكلاً مختلفاً.',
            'لا تجبر صورة طولية على مساحة عريضة دون تخطيط للقص.',
          ],
        },
        {
          title: 'اختر الأبعاد من الوجهة',
          paragraphs: [
            'الأبعاد الصحيحة تعتمد على مكان استخدام الصورة. صورة الحساب، وصورة المقال، ومصغّر المتجر، ومرفق البريد لكل منها احتياج مختلف.',
            'عندما تعرف الوجهة، صدّر مباشرة لذلك الاستخدام بدلاً من إنشاء نسخ عشوائية عديدة.',
          ],
          bullets: [
            'استخدم عروضاً أصغر للبريد والمشاركة السريعة.',
            'استخدم أبعاداً مبنية على تصميم الصفحة للمواقع.',
            'استخدم المربع أو الطول عندما تكون المنصة تتوقع ذلك.',
          ],
        },
        {
          title: 'راجع النصوص والحواف',
          paragraphs: [
            'بعض الصور تبدو جيدة كمصغرات لكنها تفشل عندما تحتوي نصوصاً أو رسوماً أو تفاصيل واجهة صغيرة. هذه العناصر تحتاج مراجعة إضافية بعد تغيير الحجم.',
            'إذا أصبح النص غير مقروء، اختر إخراجاً أكبر أو قص مساحة غير مهمة بدلاً من تصغير كل شيء بالتساوي.',
          ],
          bullets: [
            'كبّر لقطات الشاشة بعد تغيير الحجم.',
            'افحص الشعارات بحثاً عن حواف ناعمة أكثر من اللازم.',
            'استخدم إخراجاً أكبر عندما تكون النصوص الصغيرة مهمة.',
          ],
        },
      ],
      takeawayTitle: 'تغيير آمن للحجم',
      takeaways: [
        'أبقِ نسبة الأبعاد مقفلة افتراضياً.',
        'اختر الأبعاد حسب الوجهة النهائية.',
        'راجع النصوص والوجوه والشعارات بعد التصدير.',
      ],
      relatedToolsTitle: 'أدوات هذا المسار',
      relatedTools: [
        { href: 'resize-image', label: 'تغيير حجم الصورة' },
        { href: 'compress-image', label: 'ضغط الصورة' },
      ],
    },
  },
  {
    slug: 'choose-jpg-png-webp',
    en: {
      eyebrow: 'Format Guide',
      title: 'JPG, PNG, or WebP: Which Image Format Should You Use?',
      description: 'A clear comparison of common image formats for photos, screenshots, transparency, and web publishing.',
      intro: 'Image formats are not interchangeable labels. The format you choose affects file size, transparency, sharpness, and where the file can be used.',
      readTime: '6 min read',
      category: 'Image formats',
      sections: [
        {
          title: 'Use JPG for everyday photos',
          paragraphs: [
            'JPG is widely supported and usually produces small files for photos with many colors. It is a dependable choice for product photos, article images, and email attachments.',
            'The tradeoff is that JPG is lossy and does not support transparency. If you compress too heavily, edges and gradients may start to show artifacts.',
          ],
          bullets: [
            'Best for photos and mixed-color scenes.',
            'Not suitable when transparent backgrounds are required.',
            'Check quality when text or sharp graphics are present.',
          ],
        },
        {
          title: 'Use PNG for transparency and crisp edges',
          paragraphs: [
            'PNG keeps sharp edges and supports transparency, which makes it helpful for logos, screenshots, interface images, and cut-out graphics.',
            'PNG files can become large for photos, so it is not always the best publishing format when speed matters.',
          ],
          bullets: [
            'Best for transparent assets and screenshots.',
            'Useful when crisp text or interface lines matter.',
            'Can be heavy for large photographic images.',
          ],
        },
        {
          title: 'Use WebP when the destination supports it',
          paragraphs: [
            'WebP often creates smaller files than JPG or PNG while keeping good visual quality. It can also support transparency, which makes it flexible for websites.',
            'Compatibility is much better than it used to be, but you should still think about where the file will be uploaded or opened before choosing it.',
          ],
          bullets: [
            'Great for modern websites and lightweight delivery.',
            'Useful for both photos and transparent graphics.',
            'Check platform support when submitting files to older systems.',
          ],
        },
      ],
      takeawayTitle: 'Quick choice',
      takeaways: [
        'Choose JPG for broad photo compatibility.',
        'Choose PNG for transparency and crisp edges.',
        'Choose WebP for modern web delivery when supported.',
      ],
      relatedToolsTitle: 'Format tools',
      relatedTools: [
        { href: 'convert-image', label: 'Convert Image' },
        { href: 'compress-image', label: 'Compress Image' },
      ],
    },
    ar: {
      eyebrow: 'دليل التنسيقات',
      title: 'JPG أو PNG أو WebP: أي تنسيق صورة تختار؟',
      description: 'مقارنة واضحة بين تنسيقات الصور الشائعة للصور الفوتوغرافية واللقطات والشفافية والنشر على الويب.',
      intro: 'تنسيقات الصور ليست أسماء قابلة للتبديل فقط. اختيار التنسيق يؤثر على حجم الملف والشفافية والحدة ومكان استخدام الصورة.',
      readTime: 'قراءة 6 دقائق',
      category: 'تنسيقات الصور',
      sections: [
        {
          title: 'استخدم JPG للصور اليومية',
          paragraphs: [
            'يدعم JPG على نطاق واسع وينتج غالباً ملفات صغيرة للصور كثيرة الألوان. لذلك هو خيار عملي لصور المنتجات وصور المقالات ومرفقات البريد.',
            'المقابل أنه تنسيق يفقد بعض البيانات ولا يدعم الشفافية. وإذا ضغطته بشدة قد تظهر تشوهات في الحواف والتدرجات.',
          ],
          bullets: [
            'الأفضل للصور الفوتوغرافية والمشاهد متعددة الألوان.',
            'غير مناسب عندما تحتاج إلى خلفية شفافة.',
            'راجع الجودة عندما تحتوي الصورة نصوصاً أو رسوماً حادة.',
          ],
        },
        {
          title: 'استخدم PNG للشفافية والحواف الحادة',
          paragraphs: [
            'يحافظ PNG على الحواف الواضحة ويدعم الشفافية، لذلك يناسب الشعارات ولقطات الشاشة وصور الواجهات والرسومات المفرغة.',
            'قد تصبح ملفات PNG كبيرة مع الصور الفوتوغرافية، لذلك لا يكون دائماً أفضل تنسيق للنشر عندما تكون السرعة مهمة.',
          ],
          bullets: [
            'الأفضل للعناصر الشفافة ولقطات الشاشة.',
            'مفيد عندما تهم النصوص الحادة وخطوط الواجهة.',
            'قد يكون ثقيلاً للصور الكبيرة الفوتوغرافية.',
          ],
        },
        {
          title: 'استخدم WebP عندما تكون الوجهة داعمة',
          paragraphs: [
            'ينتج WebP غالباً ملفات أصغر من JPG أو PNG مع جودة جيدة. ويمكنه أيضاً دعم الشفافية، مما يجعله مرناً للمواقع.',
            'أصبح دعمه أفضل بكثير من السابق، لكن من الحكمة معرفة أين سترفع الملف أو تفتحه قبل اختياره.',
          ],
          bullets: [
            'ممتاز للمواقع الحديثة والتسليم الخفيف.',
            'مفيد للصور الفوتوغرافية والرسومات الشفافة.',
            'تحقق من دعم المنصة عند إرسال ملفات لأنظمة قديمة.',
          ],
        },
      ],
      takeawayTitle: 'اختيار سريع',
      takeaways: [
        'اختر JPG لتوافق واسع مع الصور.',
        'اختر PNG للشفافية والحواف الواضحة.',
        'اختر WebP للنشر الحديث على الويب عند دعمه.',
      ],
      relatedToolsTitle: 'أدوات التنسيق',
      relatedTools: [
        { href: 'convert-image', label: 'تحويل الصورة' },
        { href: 'compress-image', label: 'ضغط الصورة' },
      ],
    },
  },
  {
    slug: 'prepare-product-photos-for-online-stores',
    en: {
      eyebrow: 'Store Image Guide',
      title: 'Prepare Product Photos for Online Stores and Marketplaces',
      description: 'A workflow for cleaning, resizing, and exporting product photos that load fast and look trustworthy.',
      intro: 'Product photos carry a lot of trust. They need to be clear, consistent, and light enough to load quickly without hiding the details buyers care about.',
      readTime: '7 min read',
      category: 'Product images',
      sections: [
        {
          title: 'Keep the product easy to inspect',
          paragraphs: [
            'A product image should help someone understand shape, color, texture, and condition. Cropping too tightly or compressing too heavily can remove the information that makes the image useful.',
            'Before optimization, decide which details matter for the buyer and make sure they remain visible in the final export.',
          ],
          bullets: [
            'Keep the main product large enough to inspect.',
            'Avoid heavy compression on texture and labels.',
            'Use consistent framing across similar products.',
          ],
        },
        {
          title: 'Use background removal carefully',
          paragraphs: [
            'A clean transparent or neutral background can make catalog images look more consistent. It is especially helpful for thumbnails, marketplace uploads, and comparison grids.',
            'After removing a background, inspect edges around hair, glass, shadows, handles, and thin objects. These areas often need the closest visual check.',
          ],
          bullets: [
            'Use transparent PNG when the destination needs cut-out assets.',
            'Use a neutral background when the platform expects a complete photo.',
            'Check edges before uploading a large batch.',
          ],
        },
        {
          title: 'Export for both speed and confidence',
          paragraphs: [
            'Online stores need speed, but the buyer still needs enough detail to trust what they see. A good product image is light, clear, and consistent with the rest of the listing.',
            'Resize oversized originals, choose the right format, and compress after the image already has the correct dimensions.',
          ],
          bullets: [
            'Resize before compressing.',
            'Use JPG or WebP for standard product photos.',
            'Use PNG when transparency is required.',
          ],
        },
      ],
      takeawayTitle: 'Product photo priorities',
      takeaways: [
        'Make the product inspectable first.',
        'Use clean backgrounds when they improve consistency.',
        'Optimize file size after the image composition is ready.',
      ],
      relatedToolsTitle: 'Product image tools',
      relatedTools: [
        { href: 'remove-background', label: 'Background Remover' },
        { href: 'resize-image', label: 'Resize Image' },
        { href: 'compress-image', label: 'Compress Image' },
      ],
    },
    ar: {
      eyebrow: 'دليل صور المتاجر',
      title: 'تجهيز صور المنتجات للمتاجر والمنصات',
      description: 'سير عمل لتنظيف صور المنتجات وتغيير حجمها وتصديرها بحيث تكون سريعة وواضحة وتبعث على الثقة.',
      intro: 'صور المنتجات تحمل جزءاً كبيراً من الثقة. يجب أن تكون واضحة ومتناسقة وخفيفة بما يكفي للتحميل السريع دون إخفاء التفاصيل التي تهم المشتري.',
      readTime: 'قراءة 7 دقائق',
      category: 'صور المنتجات',
      sections: [
        {
          title: 'اجعل المنتج سهل الفحص',
          paragraphs: [
            'يجب أن تساعد صورة المنتج على فهم الشكل واللون والخامة والحالة. القص المبالغ فيه أو الضغط الشديد قد يزيل المعلومات التي تجعل الصورة مفيدة.',
            'قبل التحسين، حدد التفاصيل المهمة للمشتري وتأكد من بقائها واضحة في التصدير النهائي.',
          ],
          bullets: [
            'اجعل المنتج الرئيسي كبيراً بما يكفي للفحص.',
            'تجنب الضغط القوي على الخامات والملصقات.',
            'استخدم تأطيراً متناسقاً بين المنتجات المتشابهة.',
          ],
        },
        {
          title: 'استخدم إزالة الخلفية بحذر',
          paragraphs: [
            'الخلفية النظيفة أو الشفافة تجعل صور الكتالوج أكثر تناسقاً. وهي مفيدة للمصغرات ورفعات المنصات وشبكات المقارنة.',
            'بعد إزالة الخلفية، افحص الحواف حول الشعر والزجاج والظلال والمقابض والأجسام الرفيعة. هذه المناطق تحتاج غالباً إلى مراجعة أدق.',
          ],
          bullets: [
            'استخدم PNG شفافاً عندما تحتاج الوجهة إلى عنصر مفرغ.',
            'استخدم خلفية محايدة عندما تتوقع المنصة صورة كاملة.',
            'راجع الحواف قبل رفع دفعة كبيرة.',
          ],
        },
        {
          title: 'صدّر للسرعة والثقة معاً',
          paragraphs: [
            'المتاجر تحتاج سرعة، لكن المشتري يحتاج أيضاً إلى تفاصيل كافية للثقة بما يراه. الصورة الجيدة خفيفة وواضحة ومتناسقة مع بقية القائمة.',
            'غيّر حجم النسخ الضخمة، واختر التنسيق المناسب، ثم اضغط الصورة بعد أن تصبح أبعادها صحيحة.',
          ],
          bullets: [
            'غيّر الحجم قبل الضغط.',
            'استخدم JPG أو WebP لصور المنتجات العادية.',
            'استخدم PNG عندما تكون الشفافية مطلوبة.',
          ],
        },
      ],
      takeawayTitle: 'أولويات صور المنتج',
      takeaways: [
        'اجعل المنتج قابلاً للفحص أولاً.',
        'استخدم خلفيات نظيفة عندما تحسن الاتساق.',
        'حسّن حجم الملف بعد اكتمال تركيب الصورة.',
      ],
      relatedToolsTitle: 'أدوات صور المنتجات',
      relatedTools: [
        { href: 'remove-background', label: 'إزالة الخلفية' },
        { href: 'resize-image', label: 'تغيير حجم الصورة' },
        { href: 'compress-image', label: 'ضغط الصورة' },
      ],
    },
  },
  {
    slug: 'make-documents-from-phone-photos',
    en: {
      eyebrow: 'Document Guide',
      title: 'Turn Phone Photos Into a Clean PDF Document',
      description: 'A practical workflow for turning receipts, notes, IDs, and reference photos into one organized PDF.',
      intro: 'Phone photos are convenient, but a group of loose images can be hard to send, review, or archive. A single PDF can make the same material easier to handle.',
      readTime: '6 min read',
      category: 'Image to PDF',
      sections: [
        {
          title: 'Sort before you combine',
          paragraphs: [
            'The order of images becomes the order of pages in the final document. Before building a PDF, remove duplicates, rotate sideways images, and place the files in the sequence a reader expects.',
            'This small preparation step prevents confusion later, especially for receipts, forms, handwritten notes, and step-by-step evidence.',
          ],
          bullets: [
            'Remove blurry or duplicate photos.',
            'Put pages in reading order.',
            'Rename files if it helps you keep the sequence clear.',
          ],
        },
        {
          title: 'Balance readability and file size',
          paragraphs: [
            'Documents made from photos can become large quickly. Resizing oversized images before combining them can reduce the final PDF size without making the content hard to read.',
            'If the document includes small text, do not shrink it too far. Legibility matters more than saving a few extra kilobytes.',
          ],
          bullets: [
            'Resize very large phone photos before making the PDF.',
            'Keep enough detail for names, numbers, and signatures.',
            'Compress images after checking readability.',
          ],
        },
        {
          title: 'Use one PDF when sharing matters',
          paragraphs: [
            'A PDF is useful when the recipient should review the images in a fixed order. It also helps when uploading to forms that accept one document instead of many images.',
            'Keep the original photos if you may need to rebuild the PDF later with a different order or quality setting.',
          ],
          bullets: [
            'Use PDF for forms, receipts, assignments, and reference packets.',
            'Keep originals for backup.',
            'Open the PDF once before sending it.',
          ],
        },
      ],
      takeawayTitle: 'Before sending',
      takeaways: [
        'Sort images into reading order.',
        'Make text readable before optimizing size.',
        'Preview the finished PDF once.',
      ],
      relatedToolsTitle: 'Document tools',
      relatedTools: [
        { href: 'image-to-pdf', label: 'Image to PDF' },
        { href: 'resize-image', label: 'Resize Image' },
        { href: 'compress-image', label: 'Compress Image' },
      ],
    },
    ar: {
      eyebrow: 'دليل المستندات',
      title: 'حوّل صور الهاتف إلى مستند PDF مرتب',
      description: 'سير عمل عملي لتحويل الإيصالات والملاحظات والبطاقات والصور المرجعية إلى ملف PDF واحد منظم.',
      intro: 'صور الهاتف مريحة، لكن مجموعة صور منفصلة قد تكون صعبة الإرسال أو المراجعة أو الأرشفة. ملف PDF واحد يجعل المادة نفسها أسهل في التعامل.',
      readTime: 'قراءة 6 دقائق',
      category: 'الصور إلى PDF',
      sections: [
        {
          title: 'رتب قبل الدمج',
          paragraphs: [
            'ترتيب الصور يصبح ترتيب الصفحات في المستند النهائي. قبل إنشاء PDF احذف التكرارات، وعدّل الصور الجانبية، وضع الملفات بالترتيب الذي يتوقعه القارئ.',
            'هذه الخطوة الصغيرة تمنع الارتباك لاحقاً، خصوصاً مع الإيصالات والنماذج والملاحظات المكتوبة والأدلة المتسلسلة.',
          ],
          bullets: [
            'احذف الصور الضبابية أو المكررة.',
            'ضع الصفحات بترتيب القراءة.',
            'أعد تسمية الملفات إذا كان ذلك يساعد على وضوح التسلسل.',
          ],
        },
        {
          title: 'وازن بين القراءة وحجم الملف',
          paragraphs: [
            'المستندات المبنية من الصور قد تصبح كبيرة بسرعة. تغيير حجم الصور الضخمة قبل جمعها يقلل حجم PDF النهائي دون أن يجعل المحتوى صعب القراءة.',
            'إذا كان المستند يحتوي نصاً صغيراً، فلا تصغره أكثر من اللازم. وضوح القراءة أهم من توفير بضعة كيلوبايت إضافية.',
          ],
          bullets: [
            'غيّر حجم صور الهاتف الكبيرة جداً قبل إنشاء PDF.',
            'حافظ على تفاصيل الأسماء والأرقام والتواقيع.',
            'اضغط الصور بعد التأكد من القراءة.',
          ],
        },
        {
          title: 'استخدم PDF عندما تهم المشاركة',
          paragraphs: [
            'يفيد PDF عندما يجب أن يراجع المستلم الصور بترتيب ثابت. كما يساعد عند الرفع إلى نماذج تقبل مستنداً واحداً بدلاً من صور كثيرة.',
            'احتفظ بالصور الأصلية إذا كنت قد تحتاج إلى إعادة بناء المستند بترتيب أو جودة مختلفة.',
          ],
          bullets: [
            'استخدم PDF للنماذج والإيصالات والواجبات وحزم المراجعة.',
            'احتفظ بالأصول كنسخة احتياطية.',
            'افتح PDF مرة واحدة قبل إرساله.',
          ],
        },
      ],
      takeawayTitle: 'قبل الإرسال',
      takeaways: [
        'رتب الصور حسب القراءة.',
        'اجعل النص مقروءاً قبل تقليل الحجم.',
        'عاين ملف PDF النهائي مرة واحدة.',
      ],
      relatedToolsTitle: 'أدوات المستندات',
      relatedTools: [
        { href: 'image-to-pdf', label: 'الصور إلى PDF' },
        { href: 'resize-image', label: 'تغيير حجم الصورة' },
        { href: 'compress-image', label: 'ضغط الصورة' },
      ],
    },
  },
  {
    slug: 'organize-pdf-pages-before-sharing',
    en: {
      eyebrow: 'PDF Workflow Guide',
      title: 'Organize PDF Pages Before Sharing or Uploading',
      description: 'How to decide when to merge, split, extract, or rebuild PDFs so recipients get exactly what they need.',
      intro: 'PDF work is often less about editing content and more about packaging the right pages for the right person. A clean page workflow saves time for both sender and recipient.',
      readTime: '6 min read',
      category: 'PDF organization',
      sections: [
        {
          title: 'Decide what the recipient needs',
          paragraphs: [
            'Before you merge or split files, define the recipient and the task. A manager may need the full packet, while a customer may need only a signed page or receipt.',
            'Sending fewer relevant pages can reduce confusion and avoid exposing information that is unrelated to the request.',
          ],
          bullets: [
            'Send complete packets only when context matters.',
            'Extract narrow page ranges for focused requests.',
            'Remove unrelated pages before public sharing.',
          ],
        },
        {
          title: 'Merge related files into one packet',
          paragraphs: [
            'Merging is useful when several PDFs belong to the same review: forms, invoices, attachments, or signed pages. One file is easier to upload and easier to archive.',
            'Check the order before downloading the merged version. The first page should make sense to someone opening the document cold.',
          ],
          bullets: [
            'Put cover pages or summaries first when useful.',
            'Group related attachments together.',
            'Open the merged PDF before sending.',
          ],
        },
        {
          title: 'Split when the file is too broad',
          paragraphs: [
            'Splitting helps when a PDF contains pages for different people or different tasks. Extracting page ranges keeps the final file focused.',
            'This is also useful for upload portals that ask for separate documents, such as ID, invoice, and proof of address.',
          ],
          bullets: [
            'Extract only the pages requested.',
            'Name the output file clearly.',
            'Keep the original PDF for records.',
          ],
        },
      ],
      takeawayTitle: 'PDF packaging rules',
      takeaways: [
        'Match the file to the recipient.',
        'Merge when pages belong together.',
        'Split when a large file contains unrelated sections.',
      ],
      relatedToolsTitle: 'PDF tools',
      relatedTools: [
        { href: 'merge-pdf', label: 'Merge PDF' },
        { href: 'split-pdf', label: 'Split PDF' },
        { href: 'compress-pdf', label: 'Compress PDF' },
      ],
    },
    ar: {
      eyebrow: 'دليل PDF',
      title: 'تنظيم صفحات PDF قبل المشاركة أو الرفع',
      description: 'كيف تقرر متى تدمج أو تقسّم أو تستخرج أو تعيد ترتيب ملفات PDF ليصل المستلم إلى ما يحتاجه بالضبط.',
      intro: 'العمل مع PDF غالباً لا يتعلق بتعديل المحتوى بقدر ما يتعلق بتجهيز الصفحات الصحيحة للشخص الصحيح. التنظيم الجيد يوفر وقت المرسل والمستلم.',
      readTime: 'قراءة 6 دقائق',
      category: 'تنظيم PDF',
      sections: [
        {
          title: 'حدد ما يحتاجه المستلم',
          paragraphs: [
            'قبل الدمج أو التقسيم، حدد المستلم والمهمة. قد يحتاج المدير إلى الحزمة كاملة، بينما يحتاج العميل إلى صفحة موقعة أو إيصال فقط.',
            'إرسال صفحات أقل وأكثر صلة يقلل الارتباك ويتجنب كشف معلومات لا علاقة لها بالطلب.',
          ],
          bullets: [
            'أرسل الحزم الكاملة فقط عندما يكون السياق مهماً.',
            'استخرج نطاقات الصفحات للطلبات المحددة.',
            'احذف الصفحات غير المرتبطة قبل المشاركة العامة.',
          ],
        },
        {
          title: 'ادمج الملفات المرتبطة في حزمة واحدة',
          paragraphs: [
            'الدمج مفيد عندما تنتمي عدة ملفات PDF إلى مراجعة واحدة: نماذج أو فواتير أو مرفقات أو صفحات موقعة. ملف واحد أسهل في الرفع والأرشفة.',
            'راجع الترتيب قبل تنزيل النسخة المدمجة. يجب أن تكون الصفحة الأولى مفهومة لمن يفتح المستند دون سياق سابق.',
          ],
          bullets: [
            'ضع صفحات الغلاف أو الملخص أولاً عند الحاجة.',
            'اجمع المرفقات المتشابهة معاً.',
            'افتح ملف PDF المدمج قبل الإرسال.',
          ],
        },
        {
          title: 'قسّم عندما يكون الملف واسعاً أكثر من اللازم',
          paragraphs: [
            'يساعد التقسيم عندما يحتوي PDF صفحات لأشخاص أو مهام مختلفة. استخراج نطاق الصفحات يجعل الملف النهائي مركزاً.',
            'يفيد ذلك أيضاً في بوابات الرفع التي تطلب مستندات منفصلة مثل الهوية والفاتورة وإثبات العنوان.',
          ],
          bullets: [
            'استخرج الصفحات المطلوبة فقط.',
            'سمّ الملف الناتج بوضوح.',
            'احتفظ بالملف الأصلي للسجلات.',
          ],
        },
      ],
      takeawayTitle: 'قواعد تجهيز PDF',
      takeaways: [
        'طابق الملف مع حاجة المستلم.',
        'ادمج عندما تنتمي الصفحات إلى سياق واحد.',
        'قسّم عندما يحتوي الملف الكبير أقساماً غير مرتبطة.',
      ],
      relatedToolsTitle: 'أدوات PDF',
      relatedTools: [
        { href: 'merge-pdf', label: 'دمج PDF' },
        { href: 'split-pdf', label: 'تقسيم PDF' },
        { href: 'compress-pdf', label: 'ضغط PDF' },
      ],
    },
  },
  {
    slug: 'compress-pdf-for-email-upload',
    en: {
      eyebrow: 'PDF Size Guide',
      title: 'Compress a PDF for Email, Forms, and Upload Limits',
      description: 'Understand why PDFs get large and how to prepare smaller files without losing the details that matter.',
      intro: 'Upload limits and email attachment limits can turn a simple PDF into a blocker. Compression helps, but it works best when you understand what is making the file heavy.',
      readTime: '5 min read',
      category: 'PDF compression',
      sections: [
        {
          title: 'Know what makes the PDF large',
          paragraphs: [
            'Some PDFs are large because they contain high-resolution scans or photos. Others are large because of embedded assets, repeated pages, or inefficient saving.',
            'A compact re-save can help with file structure, but image-heavy PDFs may need image cleanup before they become dramatically smaller.',
          ],
          bullets: [
            'Scanned documents are often image-heavy.',
            'Exported reports may already be optimized.',
            'Repeated images and attachments can increase size.',
          ],
        },
        {
          title: 'Compress after the pages are final',
          paragraphs: [
            'If you still need to merge, split, or remove pages, do that before compressing. Compressing too early can create repeated work and make it harder to judge the final file size.',
            'The cleanest workflow is organize first, then compress the final version you plan to send.',
          ],
          bullets: [
            'Remove unnecessary pages before compression.',
            'Merge or split first.',
            'Compress the final delivery copy.',
          ],
        },
        {
          title: 'Check readability before uploading',
          paragraphs: [
            'A smaller PDF is not useful if the recipient cannot read dates, numbers, labels, or signatures. Open the compressed file and scan the pages that contain critical details.',
            'If the file is still too large, consider whether the source images need resizing before being rebuilt into a new PDF.',
          ],
          bullets: [
            'Check important pages after compression.',
            'Keep a full-quality copy for records.',
            'Rebuild from lighter images when needed.',
          ],
        },
      ],
      takeawayTitle: 'Compression checklist',
      takeaways: [
        'Organize pages before compressing.',
        'Expect scans and photos to stay heavier.',
        'Verify readability before sending.',
      ],
      relatedToolsTitle: 'PDF size tools',
      relatedTools: [
        { href: 'compress-pdf', label: 'Compress PDF' },
        { href: 'split-pdf', label: 'Split PDF' },
        { href: 'image-to-pdf', label: 'Image to PDF' },
      ],
    },
    ar: {
      eyebrow: 'دليل حجم PDF',
      title: 'ضغط PDF للبريد والنماذج وحدود الرفع',
      description: 'افهم لماذا تكبر ملفات PDF وكيف تجهز نسخة أخف دون فقدان التفاصيل المهمة.',
      intro: 'حدود الرفع ومرفقات البريد قد تحول ملف PDF بسيطاً إلى عائق. الضغط يساعد، لكنه يعمل أفضل عندما تعرف ما الذي يجعل الملف ثقيلاً.',
      readTime: 'قراءة 5 دقائق',
      category: 'ضغط PDF',
      sections: [
        {
          title: 'اعرف سبب كبر الملف',
          paragraphs: [
            'بعض ملفات PDF كبيرة لأنها تحتوي مسوحات أو صوراً عالية الدقة. وبعضها يكبر بسبب أصول مضمّنة أو صفحات مكررة أو حفظ غير فعال.',
            'إعادة الحفظ بشكل مضغوط قد تساعد في بنية الملف، لكن ملفات PDF الغنية بالصور قد تحتاج تنظيف الصور أولاً حتى تصغر بشكل واضح.',
          ],
          bullets: [
            'المستندات الممسوحة غالباً ثقيلة بالصور.',
            'التقارير المصدرة قد تكون محسنة مسبقاً.',
            'الصور والمرفقات المكررة تزيد الحجم.',
          ],
        },
        {
          title: 'اضغط بعد اكتمال الصفحات',
          paragraphs: [
            'إذا كنت ما تزال تحتاج إلى دمج أو تقسيم أو حذف صفحات، افعل ذلك قبل الضغط. الضغط المبكر يكرر العمل ويصعّب تقدير الحجم النهائي.',
            'أنظف مسار هو التنظيم أولاً، ثم ضغط نسخة الإرسال النهائية.',
          ],
          bullets: [
            'احذف الصفحات غير الضرورية قبل الضغط.',
            'ادمج أو قسّم أولاً.',
            'اضغط نسخة التسليم النهائية.',
          ],
        },
        {
          title: 'تحقق من القراءة قبل الرفع',
          paragraphs: [
            'الملف الأصغر لا يفيد إذا لم يستطع المستلم قراءة التواريخ أو الأرقام أو الملصقات أو التواقيع. افتح الملف المضغوط وراجع الصفحات ذات التفاصيل الحرجة.',
            'إذا بقي الملف كبيراً، فكّر في تقليل الصور الأصلية قبل إعادة بنائه كملف PDF جديد.',
          ],
          bullets: [
            'راجع الصفحات المهمة بعد الضغط.',
            'احتفظ بنسخة كاملة الجودة للسجلات.',
            'أعد البناء من صور أخف عند الحاجة.',
          ],
        },
      ],
      takeawayTitle: 'قائمة الضغط',
      takeaways: [
        'نظم الصفحات قبل الضغط.',
        'توقع أن تبقى المسوحات والصور أثقل.',
        'تحقق من القراءة قبل الإرسال.',
      ],
      relatedToolsTitle: 'أدوات حجم PDF',
      relatedTools: [
        { href: 'compress-pdf', label: 'ضغط PDF' },
        { href: 'split-pdf', label: 'تقسيم PDF' },
        { href: 'image-to-pdf', label: 'الصور إلى PDF' },
      ],
    },
  },
  {
    slug: 'turn-pdf-pages-into-preview-images',
    en: {
      eyebrow: 'PDF Preview Guide',
      title: 'Turn PDF Pages Into Preview Images for Sharing and Review',
      description: 'When to export PDF pages as images for thumbnails, slides, quick previews, and visual review.',
      intro: 'Sometimes people do not need the whole PDF. They need a quick visual preview, a page image for a slide, or a thumbnail that shows what a document contains.',
      readTime: '5 min read',
      category: 'PDF previews',
      sections: [
        {
          title: 'Use images when visual review is enough',
          paragraphs: [
            'A page image is useful when the recipient only needs to inspect layout, design, or a specific page. It can be quicker than asking them to open a full PDF.',
            'This works well for previews, status updates, thumbnails, and design comments where editing the source document is not required.',
          ],
          bullets: [
            'Use images for quick previews and thumbnails.',
            'Use the original PDF when selectable text or forms matter.',
            'Export only the pages you need to show.',
          ],
        },
        {
          title: 'Choose quality based on the use',
          paragraphs: [
            'A thumbnail can be smaller and lighter than an image meant for a presentation. If the page contains small text, export at a higher quality so the content remains readable.',
            'For fast sharing, standard quality is often enough. For slides or detailed review, use a sharper export.',
          ],
          bullets: [
            'Use standard quality for lightweight previews.',
            'Use high quality for text-heavy pages.',
            'Use extra sharp output for slides or visual inspection.',
          ],
        },
        {
          title: 'Keep sensitive pages in mind',
          paragraphs: [
            'A page image can be copied and shared like any other image. Before exporting, think about whether the page includes private names, addresses, account numbers, or signatures.',
            'If a preview is public, use only pages that are safe to share or create a redacted version first.',
          ],
          bullets: [
            'Review exported images before posting publicly.',
            'Avoid sharing sensitive pages as previews.',
            'Keep the source PDF separate from public thumbnails.',
          ],
        },
      ],
      takeawayTitle: 'Preview wisely',
      takeaways: [
        'Export images when visual review is enough.',
        'Use higher quality for small text.',
        'Check sensitive information before sharing.',
      ],
      relatedToolsTitle: 'Preview tools',
      relatedTools: [
        { href: 'pdf-to-image', label: 'PDF to Image' },
        { href: 'split-pdf', label: 'Split PDF' },
      ],
    },
    ar: {
      eyebrow: 'دليل معاينات PDF',
      title: 'تحويل صفحات PDF إلى صور للمعاينة والمراجعة',
      description: 'متى تصدّر صفحات PDF كصور للمصغرات والعروض والمعاينات السريعة والمراجعة البصرية.',
      intro: 'أحياناً لا يحتاج الناس إلى ملف PDF كامل. يحتاجون إلى معاينة بصرية سريعة أو صورة صفحة لعرض أو مصغّر يوضح محتوى المستند.',
      readTime: 'قراءة 5 دقائق',
      category: 'معاينات PDF',
      sections: [
        {
          title: 'استخدم الصور عندما تكفي المراجعة البصرية',
          paragraphs: [
            'صورة الصفحة مفيدة عندما يحتاج المستلم إلى فحص التصميم أو التخطيط أو صفحة محددة فقط. قد تكون أسرع من طلب فتح ملف PDF كامل.',
            'يناسب ذلك المعاينات وتحديثات الحالة والمصغرات وتعليقات التصميم عندما لا يكون تعديل المستند الأصلي مطلوباً.',
          ],
          bullets: [
            'استخدم الصور للمعاينات السريعة والمصغرات.',
            'استخدم PDF الأصلي عندما يهم النص القابل للتحديد أو النماذج.',
            'صدّر الصفحات التي تحتاج إلى عرضها فقط.',
          ],
        },
        {
          title: 'اختر الجودة حسب الاستخدام',
          paragraphs: [
            'يمكن أن تكون المصغرة أصغر وأخف من صورة مخصصة لعرض تقديمي. إذا كانت الصفحة تحتوي نصاً صغيراً، صدّر بجودة أعلى حتى يبقى المحتوى مقروءاً.',
            'للمشاركة السريعة تكفي الجودة القياسية غالباً. أما للعروض أو المراجعة التفصيلية فاستخدم تصديراً أوضح.',
          ],
          bullets: [
            'استخدم الجودة القياسية للمعاينات الخفيفة.',
            'استخدم جودة أعلى للصفحات كثيرة النص.',
            'استخدم إخراجاً أكثر حدة للعروض أو الفحص البصري.',
          ],
        },
        {
          title: 'انتبه للصفحات الحساسة',
          paragraphs: [
            'صورة الصفحة يمكن نسخها ومشاركتها كأي صورة أخرى. قبل التصدير، فكر هل تحتوي الصفحة أسماء أو عناوين أو أرقام حسابات أو تواقيع.',
            'إذا كانت المعاينة عامة، استخدم الصفحات الآمنة فقط أو جهز نسخة منقحة أولاً.',
          ],
          bullets: [
            'راجع الصور المصدرة قبل نشرها علناً.',
            'تجنب مشاركة الصفحات الحساسة كمعاينات.',
            'افصل ملف PDF الأصلي عن المصغرات العامة.',
          ],
        },
      ],
      takeawayTitle: 'عاين بذكاء',
      takeaways: [
        'صدّر الصور عندما تكفي المراجعة البصرية.',
        'استخدم جودة أعلى للنصوص الصغيرة.',
        'تحقق من المعلومات الحساسة قبل المشاركة.',
      ],
      relatedToolsTitle: 'أدوات المعاينة',
      relatedTools: [
        { href: 'pdf-to-image', label: 'PDF إلى صورة' },
        { href: 'split-pdf', label: 'تقسيم PDF' },
      ],
    },
  },
  {
    slug: 'safe-qr-codes-for-business-cards',
    en: {
      eyebrow: 'QR Safety Guide',
      title: 'Make Safer QR Codes for Business Cards, Posters, and Events',
      description: 'A practical checklist for QR code content, scan reliability, and privacy before printing or publishing.',
      intro: 'QR codes are easy to create, but printed codes are hard to fix after distribution. A short check before publishing protects both the user experience and the information inside the code.',
      readTime: '6 min read',
      category: 'QR publishing',
      sections: [
        {
          title: 'Test the destination, not just the code',
          paragraphs: [
            'A QR code can scan correctly and still lead to a broken page, wrong number, outdated contact card, or confusing message. Always test the full journey from scan to final action.',
            'Use more than one phone if the code will be used by a broad audience. Different camera apps may handle links and contact cards slightly differently.',
          ],
          bullets: [
            'Scan the final downloaded code.',
            'Check links, phone numbers, and contact fields.',
            'Test from the expected printed size and distance.',
          ],
        },
        {
          title: 'Keep sensitive data intentional',
          paragraphs: [
            'WiFi passwords, WhatsApp numbers, and vCard details can be useful, but they also expose information to anyone who can scan the code.',
            'For public posters, prefer links to pages that can be updated later. For private spaces, specialized QR types can be helpful when the audience is trusted.',
          ],
          bullets: [
            'Avoid putting private details on public materials unless necessary.',
            'Use a website link when the information may change.',
            'Review what is encoded before printing.',
          ],
        },
        {
          title: 'Design for reliable scanning',
          paragraphs: [
            'High contrast, enough quiet space, and a reasonable printed size are more important than decoration. A beautiful code that fails to scan is not doing its job.',
            'If the code will be placed on a poster, receipt, table card, or badge, test it in that physical context before producing many copies.',
          ],
          bullets: [
            'Use strong contrast.',
            'Leave white space around the code.',
            'Avoid tiny printed codes for busy environments.',
          ],
        },
      ],
      takeawayTitle: 'Before printing',
      takeaways: [
        'Test the final destination.',
        'Be intentional with private data.',
        'Prioritize contrast, size, and quiet space.',
      ],
      relatedToolsTitle: 'QR publishing tools',
      relatedTools: [
        { href: 'qr-generator', label: 'QR Generator' },
        { href: 'whatsapp-qr-code', label: 'WhatsApp QR Code' },
        { href: 'vcard-qr-code', label: 'vCard QR Code' },
      ],
    },
    ar: {
      eyebrow: 'دليل أمان QR',
      title: 'إنشاء رموز QR أكثر أماناً للبطاقات والملصقات والفعاليات',
      description: 'قائمة عملية لمراجعة محتوى QR وموثوقية المسح والخصوصية قبل الطباعة أو النشر.',
      intro: 'إنشاء QR سهل، لكن إصلاح الرمز المطبوع بعد التوزيع صعب. مراجعة قصيرة قبل النشر تحمي تجربة المستخدم والمعلومات الموجودة داخل الرمز.',
      readTime: 'قراءة 6 دقائق',
      category: 'نشر QR',
      sections: [
        {
          title: 'اختبر الوجهة لا الرمز فقط',
          paragraphs: [
            'قد يُمسح QR بشكل صحيح لكنه يقود إلى صفحة معطلة أو رقم خاطئ أو بطاقة تواصل قديمة أو رسالة مربكة. اختبر الرحلة كاملة من المسح إلى الإجراء النهائي.',
            'استخدم أكثر من هاتف إذا كان الرمز سيصل إلى جمهور واسع. قد تتعامل تطبيقات الكاميرا مع الروابط وبطاقات التواصل بطرق مختلفة قليلاً.',
          ],
          bullets: [
            'امسح الرمز النهائي بعد التنزيل.',
            'راجع الروابط والأرقام وحقول التواصل.',
            'اختبر من الحجم والمسافة المتوقعة بعد الطباعة.',
          ],
        },
        {
          title: 'تعامل مع البيانات الحساسة بقصد',
          paragraphs: [
            'كلمات مرور الواي فاي وأرقام واتساب وبيانات vCard مفيدة، لكنها تكشف معلومات لأي شخص يستطيع مسح الرمز.',
            'للملصقات العامة، فضّل رابطاً إلى صفحة يمكن تحديثها لاحقاً. أما في المساحات الخاصة، فالأنواع المتخصصة مفيدة عندما يكون الجمهور موثوقاً.',
          ],
          bullets: [
            'لا تضع بيانات خاصة في مواد عامة إلا عند الحاجة.',
            'استخدم رابط موقع عندما تكون المعلومات قابلة للتغيير.',
            'راجع ما سيتم ترميزه قبل الطباعة.',
          ],
        },
        {
          title: 'صمّم لمسح موثوق',
          paragraphs: [
            'التباين القوي والمساحة البيضاء والحجم المناسب أهم من الزخرفة. الرمز الجميل الذي لا يُمسح لا يؤدي وظيفته.',
            'إذا كان الرمز سيُوضع على ملصق أو إيصال أو بطاقة طاولة أو شارة، اختبره في ذلك السياق الفعلي قبل إنتاج نسخ كثيرة.',
          ],
          bullets: [
            'استخدم تبايناً قوياً.',
            'اترك مساحة بيضاء حول الرمز.',
            'تجنب الرموز المطبوعة الصغيرة في البيئات المزدحمة.',
          ],
        },
      ],
      takeawayTitle: 'قبل الطباعة',
      takeaways: [
        'اختبر الوجهة النهائية.',
        'كن مقصوداً مع البيانات الخاصة.',
        'قدّم التباين والحجم والمساحة البيضاء.',
      ],
      relatedToolsTitle: 'أدوات نشر QR',
      relatedTools: [
        { href: 'qr-generator', label: 'مولد QR' },
        { href: 'whatsapp-qr-code', label: 'QR واتساب' },
        { href: 'vcard-qr-code', label: 'QR بطاقة تواصل' },
      ],
    },
  },
  {
    slug: 'privacy-first-browser-tools',
    en: {
      eyebrow: 'Privacy Guide',
      title: 'Why Browser-Based Tools Are Useful for Everyday Private Files',
      description: 'A plain-language guide to local browser processing, file privacy, and when extra caution is still needed.',
      intro: 'Many everyday file tasks do not need an account or a server upload. When a tool runs in the browser, it can reduce friction and keep more of the work on your own device.',
      readTime: '6 min read',
      category: 'Privacy basics',
      sections: [
        {
          title: 'Understand local processing',
          paragraphs: [
            'A browser-based tool can read and transform a file on your device using the browser itself. This is useful for simple tasks like resizing images, generating QR codes, counting words, or arranging PDFs.',
            'Local processing does not magically remove every privacy concern, but it can reduce unnecessary file transfers for routine work.',
          ],
          bullets: [
            'Use local tools for quick personal edits.',
            'Avoid uploading sensitive files when a browser workflow is enough.',
            'Close tabs and clear downloads when working on shared devices.',
          ],
        },
        {
          title: 'Know when caution still matters',
          paragraphs: [
            'Some outputs are sensitive even if the tool runs locally. A generated password, WiFi QR code, business contact card, or document preview should be handled carefully after download.',
            'Privacy is not only about where processing happens. It is also about where the final file is saved, shared, printed, or posted.',
          ],
          bullets: [
            'Treat generated passwords as sensitive immediately.',
            'Think before printing QR codes with private details.',
            'Review documents before sharing previews publicly.',
          ],
        },
        {
          title: 'Choose the right workflow for the file',
          paragraphs: [
            'Routine files are often fine for browser tools, especially when the tool is transparent about what runs locally. Highly sensitive legal, medical, financial, or identity documents may deserve stricter handling.',
            'The safest habit is to match the tool to the sensitivity of the material, not just to the convenience of the task.',
          ],
          bullets: [
            'Use browser tools for low-risk everyday files.',
            'Use stricter internal workflows for confidential records.',
            'Keep original files and downloaded results organized.',
          ],
        },
      ],
      takeawayTitle: 'Privacy habits',
      takeaways: [
        'Local browser tools can reduce unnecessary uploads.',
        'Downloaded outputs still need careful handling.',
        'Match the workflow to the sensitivity of the file.',
      ],
      relatedToolsTitle: 'Private-by-design tools',
      relatedTools: [
        { href: 'resize-image', label: 'Resize Image' },
        { href: 'word-counter', label: 'Word Counter' },
        { href: 'password-generator', label: 'Password Generator' },
      ],
    },
    ar: {
      eyebrow: 'دليل الخصوصية',
      title: 'لماذا تفيد أدوات المتصفح للملفات اليومية الخاصة',
      description: 'دليل واضح حول المعالجة المحلية داخل المتصفح وخصوصية الملفات ومتى تحتاج إلى حذر إضافي.',
      intro: 'كثير من مهام الملفات اليومية لا تحتاج إلى حساب أو رفع إلى خادم. عندما تعمل الأداة داخل المتصفح، يمكن أن تقلل التعقيد وتبقي جزءاً أكبر من العمل على جهازك.',
      readTime: 'قراءة 6 دقائق',
      category: 'أساسيات الخصوصية',
      sections: [
        {
          title: 'افهم المعالجة المحلية',
          paragraphs: [
            'يمكن لأداة تعمل في المتصفح أن تقرأ الملف وتحوله على جهازك باستخدام المتصفح نفسه. هذا مفيد للمهام البسيطة مثل تغيير حجم الصور أو إنشاء QR أو عد الكلمات أو ترتيب PDF.',
            'المعالجة المحلية لا تلغي كل مخاوف الخصوصية، لكنها تقلل نقل الملفات غير الضروري في الأعمال الروتينية.',
          ],
          bullets: [
            'استخدم الأدوات المحلية للتعديلات الشخصية السريعة.',
            'تجنب رفع الملفات الحساسة عندما يكفي مسار المتصفح.',
            'أغلق التبويبات وامسح التنزيلات عند العمل على أجهزة مشتركة.',
          ],
        },
        {
          title: 'اعرف متى يبقى الحذر مهماً',
          paragraphs: [
            'بعض النتائج حساسة حتى لو عملت الأداة محلياً. كلمة مرور مولدة أو QR للواي فاي أو بطاقة تواصل أو معاينة مستند يجب التعامل معها بحذر بعد التنزيل.',
            'الخصوصية لا تتعلق فقط بمكان المعالجة، بل أيضاً بمكان حفظ النتيجة ومشاركتها وطباعتها ونشرها.',
          ],
          bullets: [
            'تعامل مع كلمات المرور المولدة كبيانات حساسة فوراً.',
            'فكر قبل طباعة رموز QR التي تحمل بيانات خاصة.',
            'راجع المستندات قبل مشاركة معايناتها علناً.',
          ],
        },
        {
          title: 'اختر المسار المناسب للملف',
          paragraphs: [
            'الملفات الروتينية تناسب غالباً أدوات المتصفح، خصوصاً عندما تكون الأداة واضحة بشأن ما يعمل محلياً. أما المستندات القانونية أو الطبية أو المالية أو وثائق الهوية الحساسة فقد تحتاج إلى إجراءات أشد.',
            'أفضل عادة هي مطابقة الأداة مع حساسية المادة، لا مع سهولة المهمة فقط.',
          ],
          bullets: [
            'استخدم أدوات المتصفح للملفات اليومية منخفضة المخاطر.',
            'استخدم مسارات داخلية أشد للبيانات السرية.',
            'نظم الملفات الأصلية والنتائج المحملة.',
          ],
        },
      ],
      takeawayTitle: 'عادات خصوصية',
      takeaways: [
        'أدوات المتصفح المحلية تقلل الرفع غير الضروري.',
        'النتائج المحملة ما زالت تحتاج تعاملاً حذراً.',
        'طابق مسار العمل مع حساسية الملف.',
      ],
      relatedToolsTitle: 'أدوات تراعي الخصوصية',
      relatedTools: [
        { href: 'resize-image', label: 'تغيير حجم الصورة' },
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
