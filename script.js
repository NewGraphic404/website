/* ===================================================================
   NEW GRAPHIC CO. — JavaScript Interactions
   =================================================================== */

function isCoarsePointerView() {
    return window.matchMedia('(pointer: coarse)').matches;
}

function isTouchCapableView() {
    return isCoarsePointerView() ||
        navigator.maxTouchPoints > 0 ||
        'ontouchstart' in window;
}

function isTabletView() {
    return isTouchCapableView() &&
        window.matchMedia('(min-width: 600px) and (min-height: 700px) and (max-width: 1180px)').matches;
}

function isMobileLandscapeView() {
    return isTouchCapableView() &&
        window.matchMedia('(orientation: landscape) and (max-width: 932px) and (max-height: 520px)').matches;
}

function isMobileFastView() {
    return (window.matchMedia('(max-width: 768px)').matches || isMobileLandscapeView()) && !isTabletView();
}

function isWideTouchNavbarView() {
    return isTouchCapableView() &&
        window.matchMedia('(min-width: 760px) and (max-width: 1340px)').matches;
}

function isLandscapeNavbarTapView() {
    return isTouchCapableView() &&
        window.matchMedia('(orientation: landscape) and (max-width: 1180px) and (max-height: 700px)').matches;
}

document.addEventListener('DOMContentLoaded', () => {


    initLoader();
    initHeader();
    initMobileMenu();
    initTouchNavbarDropdowns();
    initScrollReveal();
    initAboutSlider();
    initTypewriter();
    initSmoothScroll();
    initCinematicPartners();
    initLocalization();
    initCustomCursor();
    initClientsPage();
    initSocialPage();
    initIdentityPage();
    initProfileModal();
    initFooterMarquee();
    initEmailModal();
    initBackToTop();
    initEdgeTriggers();
    initOrderForm();
    initSupportForm();
    initComplaintsForm();
    initFormMemory();
    // Populate all data-i18n elements on first load
    updateLanguage();
});

/* ---- Translations ---- */
const translations = {
    ar: {
        nav_uniforms: 'Uniforms',
        nav_trophies: 'دروع',
        nav_about: 'من نحن',
        nav_outdoor: 'Outdoor',
        nav_print: 'مطبوعات',
        nav_digital: 'ديجيتال',
        nav_giveaway: 'Giveaway',
        nav_social: 'سوشيال',
        social_title: 'أعمالنا على السوشيال',
        nav_exhibitions: 'معارض',
        nav_works: 'أعمالنا',
        nav_clients: 'عملاؤنا',
        nav_contact: 'تواصل معنا',
        nav_support: 'الدعم',
        nav_location: 'الموقع',
        loc_portsaid: 'بورسعيد',
        loc_damietta: 'دمياط',
        loc_portsaid_branch: 'فرع بورسعيد',
        loc_damietta_branch: 'فرع دمياط',
        nav_complaints: 'الشكاوى والاقتراحات',
        nav_mockups: 'موك أبز',
        hero_title_base: 'نصنع',
        hero_title_success: 'النجاح',
        hero_title_for: 'لـ',
        hero_cta: 'إيه اللي نقدر نعمله؟',
        about_label: 'من نحن',
        about_title_1: 'من الفكرة',
        about_title_2: 'للإبداع',
        about_p1: 'نيوجرافيك هي شركة دعاية وإعلان مصرية متكاملة الخدمات. نقدم حلولاً إبداعية شاملة تبدأ من تصميم الهويات البصرية المتميزة وحتى تنفيذ وإدارة الحملات الإعلانية الكبرى. يضم فريقنا نخبة من المبدعين ذوي الخبرة العميقة بفهم متطلبات السوق المصري وتوجيه رسالتكم التسويقية بدقة إلى الجمهور المستهدف.',
        about_p2: 'نفخر بمسيرتنا الحافلة بالتعاون مع قاعدة واسعة من العملاء في شتى القطاعات، مساهمين في كتابة العديد من قصص النجاح الملهمة. من الحلول الطباعية المبتكرة واللوحات الإعلانية الخارجية (Outdoor) إلى استراتيجيات التسويق الرقمي المتقدمة — نحن هنا للارتقاء بعلامتكم التجارية وضمان ريادتها وتألقها.',
        about_cta: 'اعرف أكتر عننا',
        about_slide_1: 'إبداع بلا حدود',
        about_slide_2: 'ثقة العملاء',
        about_slide_3: 'نتائج مضمونة',
        works_label: 'أعمالنا',
        works_title_1: 'مختارات من',
        works_title_2: 'أعمالنا',
        see_all: 'شوف كل أعمالنا',
        partners_label: 'عملاؤنا',
        partners_title: 'شركاء النجاح',
        about_story_title: 'قصتنا',
        about_story_p: 'عشرون عاماً من الابتكار والابداع والمثابرة تروي قصة نيوجرافيك للخدمات الاعلانية، تأسست في 2002 بدمياط وتوسعت أعمالها لتشمل القاهرة والأسكندرية وبورسعيد والعاصمة الإدارية في 2005. تلك السنوات هي التي منحتنا الأفضلية والتميز لديكم وجعلتنا نفوز بثقتكم. فمنذ البداية، عاهدنا أنفسنا على أن نكون الخيار الأول والأخير أمامكم حين تفكرون في الإستعانة بمؤسسة إعلامية متفردة تقدم خدمات إعلانية متكاملة، مستندة على فريق عمل من المحترفين والمبدعين، يسوده الود والتعاون والإحترام المتبادل والعمل بروح الفريق.',
        about_services_title: 'خدماتنا',
        about_vision_title: 'رؤيتنا',
        about_vision_p: 'الارتقاء بالخدمة الإعلانية لتضاهي المستويات العالمية.',
        about_mission_title: 'رسالتنا',
        about_mission_p: 'استمرار نجاحنا في تحقيق المعادلة الصعبة: نيوجرافيك = (السرعة، الجودة، السعر).',
        about_values_title: 'قيمنا',
        about_values_p: 'نبتكر للتميز (الاحترافية، المصداقية، نهم عملائنا، السرعة والإنجاز، السعر التنافسي، العمل بروح الفريق).',
        about_s1: 'الاستشارات التسويقية والإعلانية',
        about_s2: 'ابتكار الهوية البصرية والعلامات التجارية',
        about_s3: 'تنظيم الفعاليات بكافة أنواعها',
        about_s4: 'التصميم والطباعة الورقية',
        about_s5: 'تصميم وتنفيذ اللوحات الإعلانية',
        about_s6: 'الهدايا الإعلانية',
        about_s7: 'خدمات التسويق الإلكتروني',
        about_s8: 'تجهيزات المطاعم والكافيهات',
        about_s9: 'التصميم الداخلي والديكور',
        partner_tag: 'شريك نجاح مميز',
        cta_label: 'جاهز تبدأ؟',
        cta_title: 'تيجي نكسر الدنيا؟',
        cta_desc: 'كلمنا دلوقتي وخلينا نبدأ نشتغل مع بعض. اسمك يستاهل يلمع!',
        footer_slogan: '— من الفكرة للإبداع، نخلّي اسمك يشع',
        btn_whatsapp: 'واتساب',
        more: 'المزيد',
        footer_browse: 'تصفح',
        footer_contact: 'تواصل معنا',
        footer_follow: 'تابعنا',
        contact_email: 'البريد الإلكتروني',
        contact_phone: 'الهاتف',
        contact_address: 'العنوان',
        tag_identity: 'تصميم هوية',
        tag_exhibitions: 'تنظيم معارض',
        nav_identity: 'هوية بصرية',
        identity_title: 'الهوية البصرية',
        back_to_identities: 'رجوع للهويات',
        download_pdf: 'تحميل ملف الهوية بالكامل (PDF)',
        meta_services: 'الخدمات',
        meta_year: 'السنة',
        meta_sector: 'القطاع',
        location_eg: 'مصر',
        loader_text_base: 'نصنع',
        loader_text_success: 'النجاح',
        loader_text_for: 'لـ',
        footer_rights: 'جميع الحقوق محفوظة',
        email_modal_label: 'اختار الإيميل',
        email_modal_title: 'تواصل معنا',
        marquee_outdoor: 'أوت دور',
        marquee_print: 'مطبوعات',
        marquee_digital: 'ديجيتال ماركتنج',
        marquee_giveaway: 'Giveaway',
        marquee_exhibitions: 'تنظيم معارض',
        marquee_identity: 'تصميم هوية',
        back_home: 'العودة للرئيسية',
        btn_back: 'رجوع',
        see_all_works: 'شوف كل أعمالنا',
        clients_names: [
            'El Masria Elmasria Development',
            'KEWAN',
            'ROWAD MODERN ENGINEERING',
            'Al Baraka',
            'Awadi Urban Development',
            'Suez Canal Authority',
            'MacTronic Services',
            'RakAEZ Development',
            'AWAAED Development',
            'EASY WAY',
            'الفيروز',
            'Integrated Logistics Group ILG',
            'SALAM PROPERTIES',
            'AUD Urban Development',
            'El Shenawy Real Estate',
            'HEC'
        ],
        provinces: {
            'Port Said': 'بورسعيد',
            'Cairo': 'القاهرة',
            'Damietta': 'دمياط',
            'Alexandria': 'الإسكندرية',
            'Ismailia': 'الإسماعيلية',
            'Ain Sokhna': 'العين السخنة',
            'New Damietta': 'دمياط الجديدة'
        },
        clientsData: {
            'Cairo': [
                'شركة رغدان للدهانات', 'مجموعة شركات SGS', 'مجموعة عامر جروب "بورتو"',
                'مدارس FALCON LANGUAGE', 'مدارس NILE SONS INTERNATIONAL', 'مدارس KAUMEYA LANGUAGE',
                'مصنع shine'
            ],
            'Port Said': [
                'الوطنية للصلب "حديد المصريين"', 'شركة بورسعيد للتنمية العمرانية', 'مجموعة فنادق بالما السياحية',
                'شركة أصول للهندسة والمقاولات', 'شركة بورسعيد لتداول الحاويات والبضائع', 'توكيل ميتشل للملاحة',
                'شركة قناة السويس لتداول الحاويات', 'توكيل كاليجار للملاحة', 'مصنع عين للمركزات والعصائر',
                'مصانع افبينا للادوات الكهربية', 'مطعم وكافيه جواهر البن',
                'أمانه للديكور', 'فندق أركان "الباتروس سابقاً"', 'فندق جراند أوتيل', 'شركة أطلس للمقاولات',
                'مجموعة مطاعم ياسر الجندي', 'لوكيل لاكي دولفين', 'مطعم وكافيه العروسة', 'مطعم بكري',
                'مطعم الخديوي', 'مطعم عبده كفتة', 'شركة كرواية للمقاولات', 'مطعم أسماك سيتي',
                'حلواني ملفاي', 'معامل ميترا', 'نادي ضباط الشرطة ببورفؤاد', 'مصنع كينج فيش',
                'مصنع ريادة للمواد الغذائية', 'مصنع كابسي للدهانات', 'الاكاديمية البحرية للعلوم والتكنولوجيا',
                'بورتو سعيد', 'مصنع ايكاب للأسلاك', 'مجموعة داون تاون العقارية', 'شركة قناه السويس للحاويات',
                'مصنع موبكو للكيماويات', 'مصنع الضفائر'
            ],
            'Damietta': [
                'مجموعة سعد الدين', 'نقابة المهندسين', 'شركة تريدك للكيماويات الانشائية',
                'مؤسسة الدلتا الوطنية', 'المؤسسة المصرية للبناء', 'هيئة ميناء دمياط',
                'مصنع الخلب للكيماويات', 'مصنع ريما ايجيبتو للرخام', 'مصنع أبو غالي للصناعة البلاستيكية',
                'شركة VACCING VALLET الطبية', 'مصنع مافيل للأثاث', 'مصنع موبيليانا للأثاث',
                'البيت الفرنسي للأثاث', 'العراقي للأثاث', 'حلواني الجمل',
                'بورسلين للأدوات الصحية', 'مصنع ظلال الشام', 'مصنع ظلال وود', 'مصنع موبكو للكيماويات'
            ],
            'Alexandria': [
                'شركة الاسكندرية لتداول الحاويات والبضائع'
            ],
            'Ismailia': [
                'محطة طاقة القنطرة غرب'
            ],
            'Ain Sokhna': [
                'جامعة الجلالة'
            ],
            'New Damietta': [
                'شركة اركس للتطوير العقاري', 'شركة كونكريت للتطوير العقاري', 'شركة جيومتك للتطوير العقاري',
                'شركة جسر العالمية للتطوير العقاري', 'شركة سيدار للتطوير العقاري', 'شركة السلام للتعمير',
                'شركة ماستر للتطوير العقاري', 'شركة زوايا للتطوير العقاري', 'شركة البرلسي للتطوير العقاري',
                'شركة أعمارك للتطوير العقاري'
            ]
        },
        // Extra custom translations
        doc_title: 'New Graphic Co. | شركة نيو جرافيك للدعاية والإعلان',
        social_photos: 'صور',
        social_videos: 'فيديوهات',
        social_ads: 'الاعلانات المموله',

        // Nav & Menu additions
        nav_partners: 'شركاء النجاح',
        nav_our_clients: 'عملاؤنا',
        nav_order: 'اطلب أوردرك',

        // Order Modal translations
        order_modal_label: 'ابدأ معنا',
        order_modal_title: 'اطلب <span class="order-title--highlight">أوردرك</span>',
        order_modal_desc: 'سواء كان مشروعك صغير أو كبير — إحنا هنا نحوله لحاجة تلفت النظر. بعتلنا تفاصيل شغلتك وهنرد عليك في أقرب وقت.',
        order_feature_quick: 'رد سريع',
        order_feature_pro: 'تنفيذ احترافي',
        order_feature_price: 'سعر تنافسي',
        order_cta_btn: 'تواصل معنا دلوقتي',
        order_form_title: 'أرسل تفاصيل طلبك',
        order_label_name: 'اسمك',
        order_placeholder_name: 'مثال: أحمد محمد',
        order_label_phone: 'رقم التليفون',
        order_placeholder_phone: '01xxxxxxxxx',
        order_label_email: 'البريد الإلكتروني',
        order_placeholder_email: 'example@domain.com',
        order_label_field: 'مجال العمل / شركتك',
        order_placeholder_field: 'مثال: عقارات، مطاعم، ملابس...',
        order_label_province: 'المحافظة',
        order_select_province: 'اختار المحافظة',
        province_damietta: 'دمياط',
        province_new_damietta: 'دمياط الجديدة',
        province_cairo: 'القاهرة',
        province_giza: 'الجيزة',
        province_alexandria: 'الإسكندرية',
        province_portsaid: 'بورسعيد',
        province_ismailia: 'الإسماعيلية',
        province_suez: 'السويس',
        province_other: 'أخرى',
        province_other_placeholder: 'اكتب اسم محافظتك هنا...',
        address_label: 'طريقة تحديد العنوان',
        address_manual: 'كتابة يدوية',
        address_map: 'تحديد موقعي',
        address_manual_placeholder: 'اكتب عنوانك بالتفصيل هنا...',
        address_open_map: 'افتح الخريطة لتحديد موقعي',
        address_map_placeholder: 'سيظهر رابط موقعك هنا بعد تحديد الموقع من الخريطة...',
        address_notes_placeholder: 'ملاحظات إضافية للعنوان (مثل: الدور، الشقة، علامة مميزة...) - اختياري',
        order_label_service: 'نوع الخدمة',
        service_select: 'اختار الخدمة',
        service_outdoor: 'Outdoor / لافتات',
        service_print: 'مطبوعات',
        service_social: 'سوشيال ميديا',
        service_identity: 'هوية بصرية',
        service_exhibitions: 'تنظيم معارض',
        service_giveaway: 'هدايا دعائية',
        service_other: 'أخرى',
        order_label_details: 'تفاصيل الطلب',
        order_placeholder_details: 'اكتب تفاصيل شغلتك هنا...',
        order_submit_btn: 'ابعت الطلب',
        order_email_step_title: 'اختار الإيميل اللي هتبعت عليه',
        order_btn_back: '← رجوع',

        // Support Modal translations
        support_modal_label: 'قسم الدعم الفني',
        support_modal_title: 'مستعدين <span class="order-title--highlight">لمساعدتك</span>',
        support_modal_desc: 'فريقنا متواجد دايماً لحل مشاكلك الفنية، استقبال شكاوىك، أو الاستماع لاقتراحاتك لتطوير خدماتنا. املأ البيانات وهنتابع معاك فوراً.',
        support_feature_solutions: 'حلول سريعة',
        support_feature_personal: 'متابعة شخصية',
        support_feature_ideas: 'نرحب بأفكارك',
        support_form_title: 'تقديم طلب دعم',
        support_label_name: 'اسمك بالكامل',
        support_placeholder_name: 'مثال: أحمد محمد',
        support_label_phone: 'رقم التليفون / واتساب',
        support_placeholder_phone: '01xxxxxxxxx',
        support_label_email: 'البريد الإلكتروني',
        support_placeholder_email: 'example@domain.com',
        support_label_type: 'نوع الطلب / الاستفسار',
        support_select_type: 'اختار نوع الطلب',
        support_type_general: 'استفسار عام',
        support_type_technical: 'مشكلة فنية في الموقع',
        support_type_complaint: 'تقديم شكوى',
        support_type_suggestion: 'اقتراح لتطوير الخدمة',
        support_type_after_sales: 'خدمات ما بعد البيع ومتابعة أوردر',
        support_type_other: 'أخرى',
        support_placeholder_other: 'اكتب نوع الطلب هنا...',
        support_label_details: 'تفاصيل الرسالة',
        support_placeholder_details: 'اكتب مشكلتك أو استفسارك هنا بالتفصيل...',
        support_submit_btn: 'إرسال طلب الدعم',
        support_email_step_title: 'اختار الإيميل اللي هتبعت عليه الدعم',

        // Complaints Modal translations
        complaints_modal_label: 'صوتك مسموع',
        complaints_modal_title: 'مستعدين <span class="order-title--highlight">نسمعك</span>',
        complaints_modal_desc: 'آراؤك بتساعدنا نطور خدماتنا ونتلافى المشاكل. إذا كان عندك شكوى بخصوص أي خدمة أو اقتراح إبداعي حابب تشاركنا بيه، فريق الجودة والإدارة هيتابع معاك بشكل مباشر.',
        complaints_feature_immediate: 'اهتمام فوري',
        complaints_feature_confidential: 'سرية تامة',
        complaints_feature_continuous: 'تطوير مستمر',
        complaints_form_title: 'إرسال شكوى أو اقتراح',
        complaints_label_name: 'اسمك بالكامل',
        complaints_placeholder_name: 'مثال: أحمد محمد',
        complaints_label_phone: 'رقم التليفون / واتساب',
        complaints_placeholder_phone: '01xxxxxxxxx',
        complaints_label_email: 'البريد الإلكتروني',
        complaints_placeholder_email: 'example@domain.com',
        complaints_label_type: 'نوع الرسالة',
        complaints_select_type: 'اختار نوع الرسالة',
        complaints_type_complaint: 'تقديم شكوى',
        complaints_type_suggestion: 'تقديم اقتراح',
        complaints_type_other: 'أخرى',
        complaints_placeholder_other: 'اكتب نوع الرسالة هنا...',
        complaints_label_details: 'تفاصيل الشكوى أو الاقتراح',
        complaints_placeholder_details: 'اكتب تفاصيل شكواك أو اقتراحك هنا بالتفصيل...',
        complaints_submit_btn: 'إرسال الرسالة',
        complaints_email_step_title: 'اختار الإيميل الإداري للإرسال',

        // Featured clients marquee
        client_fayrouz: 'الفيروز',

        // Social Dropdown subdirectories
        "صور": "صور",
        "فيديوهات": "فيديوهات",
        "الاعلانات المموله": "الاعلانات المموله"
    },
    en: {
        nav_uniforms: 'Uniforms',
        nav_trophies: 'Trophies',
        nav_about: 'About',
        nav_outdoor: 'Outdoor',
        nav_print: 'Print',
        nav_digital: 'Digital',
        nav_giveaway: 'Giveaway',
        nav_social: 'Social',
        social_title: 'Our Social Work',
        nav_exhibitions: 'Exhibitions',
        nav_works: 'Our Works',
        nav_clients: 'Clients',
        nav_contact: 'Contact Us',
        nav_support: 'Support',
        nav_location: 'Location',
        loc_portsaid: 'Port Said',
        loc_damietta: 'Damietta',
        loc_portsaid_branch: 'Port Said Branch',
        loc_damietta_branch: 'Damietta Branch',
        nav_complaints: 'Complaints & Suggestions',
        nav_mockups: 'Mockups',
        hero_title_base: 'Crating',
        hero_title_success: 'Success',
        hero_title_for: 'for',
        hero_cta: 'What can we do?',
        about_label: 'About Us',
        about_title_1: 'From Idea',
        about_title_2: 'to Creativity',
        about_p1: 'New Graphic is an integrated Egyptian advertising agency. We provide everything from visual identity design to ad campaign execution. Our creative team understands the Egyptian market and knows how to deliver your message.',
        about_p2: 'We have worked with many clients in various fields. From print to outdoor to digital marketing — we are here to make your brand shine!',
        about_cta: 'Learn more about us',
        about_story_title: 'Our Story',
        about_story_p: 'Twenty years of innovation and perseverance tell the story of New Graphic. Founded in 2002 in Damietta, expanding to Cairo, Alexandria, Port Said, and the New Capital. These years have given us the excellence that won your trust. We aim to be your first choice for integrated media services, supported by a professional and creative team.',
        about_services_title: 'Our Services',
        about_vision_title: 'Our Vision',
        about_vision_p: 'Elevating advertising services to match global standards.',
        about_mission_title: 'Our Mission',
        about_mission_p: 'Continuing our success in achieving the difficult equation: New Graphic = (Speed, Quality, Price).',
        about_values_title: 'Our Values',
        about_values_p: 'Innovation for excellence (Professionalism, Credibility, Customer Passion, Speed, Competitive Pricing, Team Spirit).',
        about_s1: 'Marketing & Advertising Consultancy',
        about_s2: 'Visual Identity & Branding',
        about_s3: 'Event Management',
        about_s4: 'Paper Design & Printing',
        about_s5: 'Indoor & Outdoor Signage',
        about_s6: 'Advertising Giveaways',
        about_s7: 'Digital Marketing Services',
        about_s8: 'Restaurant & Cafe Outfitting',
        about_s9: 'Interior Design & Decor',
        about_slide_1: 'Unlimited Creativity',
        about_slide_2: 'Client Trust',
        about_slide_3: 'Guaranteed Results',
        works_label: 'Portfolio',
        works_title_1: 'Selections from',
        works_title_2: 'Our Featured Works',
        see_all: 'See All Works',
        partners_label: 'Our Clients',
        partners_title: 'Success Partners',
        partner_tag: 'Premium Success Partner',
        cta_label: 'Ready to start?',
        cta_title: 'Let\'s make something epic!',
        cta_desc: 'Contact us now and let\'s start working together. Your brand deserves to shine!',
        footer_slogan: '— From idea to creativity, we make your name glow',
        btn_whatsapp: 'WhatsApp',
        more: 'More',
        footer_browse: 'Browse',
        footer_contact: 'Contact Us',
        footer_follow: 'Follow Us',
        contact_email: 'Email',
        contact_phone: 'Phone',
        contact_address: 'Address',
        tag_identity: 'Identity Design',
        tag_exhibitions: 'Exhibitions',
        nav_identity: 'Visual Identity',
        identity_title: 'Visual Identity',
        back_to_identities: 'Back to Identities',
        download_pdf: 'Download Full PDF',
        meta_services: 'Services',
        meta_year: 'Year',
        meta_sector: 'Sector',
        location_eg: 'Egypt',
        loader_text_base: 'Creating',
        loader_text_success: 'Success',
        loader_text_for: 'for',
        footer_rights: 'All rights reserved',
        email_modal_label: 'Choose Email',
        email_modal_title: 'Contact Us',
        marquee_outdoor: 'Outdoor',
        marquee_print: 'Print',
        marquee_digital: 'Digital Marketing',
        marquee_giveaway: 'Giveaway',
        marquee_exhibitions: 'Exhibitions',
        marquee_identity: 'Identity Design',
        back_home: 'Back to Home',
        btn_back: 'Back',
        see_all_works: 'See All Our Work',
        clients_names: [
            'El Masria Elmasria Development',
            'KEWAN',
            'ROWAD MODERN ENGINEERING',
            'Al Baraka',
            'Awadi Urban Development',
            'Suez Canal Authority',
            'MacTronic Services',
            'RakAEZ Development',
            'AWAAED Development',
            'EASY WAY',
            'El Fayrouz',
            'Integrated Logistics Group ILG',
            'SALAM PROPERTIES',
            'AUD Urban Development',
            'El Shenawy Real Estate',
            'HEC'
        ],
        provinces: {
            'Port Said': 'Port Said',
            'Cairo': 'Cairo',
            'Damietta': 'Damietta',
            'Alexandria': 'Alexandria',
            'Ismailia': 'Ismailia',
            'Ain Sokhna': 'Ain Sokhna',
            'New Damietta': 'New Damietta'
        },
        clientsData: {
            'Cairo': [
                'Raghadan Paints', 'SGS Group', 'Amer Group "Porto"',
                'FALCON LANGUAGE Schools', 'NILE SONS INTERNATIONAL Schools', 'KAUMEYA LANGUAGE Schools',
                'Shine Factory'
            ],
            'Port Said': [
                'Egyptian Steel', 'Port Said Urban Development', 'Palma Hotels Group',
                'Osool Engineering & Contracting', 'Port Said Container Handling', 'Mitchell Navigation Agency',
                'Suez Canal Container Handling', 'Callegari Navigation Agency', 'Ain Concentrates & Juices',
                'Efina Electrical Appliances', 'Jawaher El Bon Cafe',
                'Amana Decor', 'Arkan Hotel', 'Grand Hotel', 'Atlas Contracting',
                'Yasser El Gendy Restaurants', 'Lucky Dolphin Agency', 'El Arousa Cafe', 'Bakri Restaurant',
                'El Khedewy Restaurant', 'Abdo Kofta Restaurant', 'Karawya Contracting', 'Fish City Restaurant',
                'Milfeuille Pastry', 'Mitra Labs', 'Police Officers Club', 'King Fish Factory',
                'Reyada Food Industries', 'Kapci Paints', 'AASTMT',
                'Porto Said', 'Ikap Wires', 'Downtown Real Estate Group', 'Suez Canal Containers',
                'Mopco Chemicals', 'Wiring harness'
            ],
            'Damietta': [
                'Saad El Din Group', 'Engineers Syndicate', 'Tridic Construction Chemicals',
                'Delta National Foundation', 'Egyptian Construction Foundation', 'Damietta Port Authority',
                'El Khalb Chemicals', 'Rima Egypto Marble', 'Abou Ghali Plastics',
                'VACCING VALLET Medical', 'Mavel Furniture', 'Mobiliana Furniture',
                'French House Furniture', 'El Iraqi Furniture', 'El Gamal Pastry',
                'Porcelain Sanitary Ware', 'Zelal El Sham', 'Zelal Wood', 'Mopco Chemicals'
            ],
            'Alexandria': [
                'Alexandria Container & Cargo Handling'
            ],
            'Ismailia': [
                'El Qantara West Power Plant'
            ],
            'Ain Sokhna': [
                'Galala University'
            ],
            'New Damietta': [
                'Arx Development', 'Concrete Development', 'Geometec Development',
                'Gesr International Development', 'Cedar Development', 'Al-Salam Construction',
                'Master Development', 'Zawaya Development', 'El-Borollosy Development',
                'Emarrak Development'
            ]
        },
        // Extra custom translations
        doc_title: 'New Graphic Co. | Advertising Excellence',
        social_photos: 'Photos',
        social_videos: 'Videos',
        social_ads: 'Sponsored Ads',

        // Nav & Menu additions
        nav_partners: 'Success Partners',
        nav_our_clients: 'Our Clients',
        nav_order: 'Order Now',

        // Order Modal translations
        order_modal_label: 'Start With Us',
        order_modal_title: 'Request <span class="order-title--highlight">Your Order</span>',
        order_modal_desc: 'Whether your project is small or large — we are here to turn it into something eye-catching. Send us your project details and we will reply as soon as possible.',
        order_feature_quick: 'Quick Response',
        order_feature_pro: 'Professional Execution',
        order_feature_price: 'Competitive Price',
        order_cta_btn: 'Contact Us Now',
        order_form_title: 'Send Your Order Details',
        order_label_name: 'Your Name',
        order_placeholder_name: 'e.g., John Doe',
        order_label_phone: 'Phone Number',
        order_placeholder_phone: '01xxxxxxxxx',
        order_label_email: 'Email Address',
        order_placeholder_email: 'example@domain.com',
        order_label_field: 'Field of Work / Company',
        order_placeholder_field: 'e.g., Real Estate, Restaurant, Clothing...',
        order_label_province: 'Province',
        order_select_province: 'Select Province',
        province_damietta: 'Damietta',
        province_new_damietta: 'New Damietta',
        province_cairo: 'Cairo',
        province_giza: 'Giza',
        province_alexandria: 'Alexandria',
        province_portsaid: 'Port Said',
        province_ismailia: 'Ismailia',
        province_suez: 'Suez',
        province_other: 'Other',
        province_other_placeholder: 'Type your province name here...',
        address_label: 'Address Verification Method',
        address_manual: 'Manual Input',
        address_map: 'My Location (Map)',
        address_manual_placeholder: 'Type your detailed address here...',
        address_open_map: 'Open Map to Pin Location',
        address_map_placeholder: 'Your location URL will appear here after selecting from the map...',
        address_notes_placeholder: 'Additional address notes (e.g., floor, apartment, landmark...) - Optional',
        order_label_service: 'Service Type',
        service_select: 'Select Service',
        service_outdoor: 'Outdoor / Signage',
        service_print: 'Prints',
        service_social: 'Social Media',
        service_identity: 'Visual Identity',
        service_exhibitions: 'Exhibitions',
        service_giveaway: 'Giveaways',
        service_other: 'Other',
        order_label_details: 'Order Details',
        order_placeholder_details: 'Type your project details here...',
        order_submit_btn: 'Send Order',
        order_email_step_title: 'Choose which email to send to',
        order_btn_back: '← Back',

        // Support Modal translations
        support_modal_label: 'Technical Support',
        support_modal_title: 'Ready <span class="order-title--highlight">To Help You</span>',
        support_modal_desc: 'Our team is always available to solve your technical problems, receive complaints, or listen to suggestions to improve our services. Fill in the data and we will follow up immediately.',
        support_feature_solutions: 'Quick Solutions',
        support_feature_personal: 'Personal Follow-up',
        support_feature_ideas: 'We Welcome Your Ideas',
        support_form_title: 'Submit Support Request',
        support_label_name: 'Your Full Name',
        support_placeholder_name: 'e.g., John Doe',
        support_label_phone: 'Phone / WhatsApp Number',
        support_placeholder_phone: '01xxxxxxxxx',
        support_label_email: 'Email Address',
        support_placeholder_email: 'example@domain.com',
        support_label_type: 'Request / Inquiry Type',
        support_select_type: 'Select Request Type',
        support_type_general: 'General Inquiry',
        support_type_technical: 'Technical Issue on Site',
        support_type_complaint: 'File a Complaint',
        support_type_suggestion: 'Service Improvement Suggestion',
        support_type_after_sales: 'After-Sales & Order Tracking',
        support_type_other: 'Other',
        support_placeholder_other: 'Type request type here...',
        support_label_details: 'Message Details',
        support_placeholder_details: 'Type your issue or inquiry in detail here...',
        support_submit_btn: 'Send Support Request',
        support_email_step_title: 'Choose which email to send support to',

        // Complaints Modal translations
        complaints_modal_label: 'Your Voice is Heard',
        complaints_modal_title: 'Ready <span class="order-title--highlight">To Listen</span>',
        complaints_modal_desc: 'Your feedback helps us develop our services and avoid problems. If you have a complaint about any service or a creative suggestion you want to share, our quality team and management will follow up with you directly.',
        complaints_feature_immediate: 'Immediate Attention',
        complaints_feature_confidential: 'Strict Confidentiality',
        complaints_feature_continuous: 'Continuous Development',
        complaints_form_title: 'Send Complaint or Suggestion',
        complaints_label_name: 'Your Full Name',
        complaints_placeholder_name: 'e.g., John Doe',
        complaints_label_phone: 'Phone / WhatsApp Number',
        complaints_placeholder_phone: '01xxxxxxxxx',
        complaints_label_email: 'Email Address',
        complaints_placeholder_email: 'example@domain.com',
        complaints_label_type: 'Message Type',
        complaints_select_type: 'Select Message Type',
        complaints_type_complaint: 'Submit a Complaint',
        complaints_type_suggestion: 'Submit a Suggestion',
        complaints_type_other: 'Other',
        complaints_placeholder_other: 'Type message type here...',
        complaints_label_details: 'Complaint or Suggestion Details',
        complaints_placeholder_details: 'Type your complaint or suggestion details here...',
        complaints_submit_btn: 'Send Message',
        complaints_email_step_title: 'Choose administrative email to send to',

        // Featured clients marquee
        client_fayrouz: 'EL FAYROUZ',

        // Social Dropdown subdirectories
        "صور": "Photos",
        "فيديوهات": "Videos",
        "الاعلانات المموله": "Sponsored Ads"
    }
};

let currentLang = 'ar';

/* ---- Client Names Cache ---- */
let clientNames = translations[currentLang].clients_names;

/* ================================================================
   PAGE LOADER
   ================================================================ */
function initLoader() {
    const loader = document.getElementById('pageLoader');
    const loaderClient = document.getElementById('loaderClient');

    if (!loader) return;

    // Show a few client names quickly in loader
    let loaderIndex = 0;
    const loaderNames = clientNames.slice(0, 5);

    const loaderInterval = setInterval(() => {
        if (loaderIndex < loaderNames.length) {
            loaderClient.textContent = loaderNames[loaderIndex];
            loaderIndex++;
        } else {
            clearInterval(loaderInterval);
        }
    }, 350); // Faster client name switching

    const header = document.getElementById('mainHeader');
    if (header) header.style.opacity = '0';

    // Start the reveal animation after loader completes - OPTIMIZED
    setTimeout(() => {
        // Add loaded class to trigger animations
        loader.classList.add('loaded');
        
        // Allow scrolling and show header after animation completes
        setTimeout(() => {
            document.body.style.overflow = '';
            loader.style.display = 'none'; // Completely remove from DOM
            
            if (header) {
                header.style.transition = 'opacity 0.6s ease';
                header.style.opacity = '1';
            }
        }, 1500); // Reduced wait time for faster reveal
        
    }, 2200); // Reduced initial delay
}


/* ================================================================
   HEADER SCROLL BEHAVIOR
   ================================================================ */
function initHeader() {
    const header = document.getElementById('mainHeader');
    if (!header) return;

    let ticking = false;

    // Map each section to the navbar theme it needs
    // 'light' = section has a light bg → navbar goes dark (inverted)
    // 'dark'  = section has a dark bg → navbar goes light/glassmorphism
    // 'orange' = orange bg → navbar goes dark with orange accents
    const sectionThemes = [
        { selector: '#hero',               theme: 'dark'   },  // dark video bg
        { selector: '#showreel',           theme: 'light'  },  // white bg
        { selector: '#portfolio',          theme: 'light'  },  // gray-100 bg
        { selector: '#clients-section',    theme: 'dark'   },  // dark bg
        { selector: '#contact',            theme: 'orange' },  // orange bg
        { selector: '.main-footer',        theme: 'dark'   },  // dark purple bg
    ];

    function updateHeaderTheme() {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
            document.body.classList.add('is-scrolled');
        } else {
            header.classList.remove('scrolled');
            document.body.classList.remove('is-scrolled');
        }

        // Detect which section the header is currently over
        let activeTheme = 'dark'; // default: dark glass (for dark backgrounds)
        const headerMid = 60; // approx middle of header
        sectionThemes.forEach(({ selector, theme }) => {
            const section = document.querySelector(selector);
            if (!section) return;
            const rect = section.getBoundingClientRect();
            // Check if this section covers the header's middle point
            if (rect.top <= headerMid && rect.bottom >= headerMid) activeTheme = theme;
        });

        header.classList.toggle('header--light',  activeTheme === 'light');
        header.classList.toggle('header--orange', activeTheme === 'orange');
        header.classList.toggle('header--dark',   activeTheme === 'dark');
        document.body.classList.toggle('is-light-theme', activeTheme === 'light');
        document.body.classList.toggle('is-orange-theme', activeTheme === 'orange');
        document.body.classList.toggle('is-dark-theme', activeTheme === 'dark');
    }

    // Dynamic mouse-tracking shimmer for premium liquid glass feel
    const pills = header.querySelectorAll('.header-pill:not(.header-pill--logo)');
    pills.forEach(pill => {
        pill.addEventListener('mousemove', (e) => {
            const rect = pill.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            pill.style.setProperty('--mouse-x', `${x}%`);
            pill.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeaderTheme();
                ticking = false;
            });
            ticking = true;
        }
    });

    updateHeaderTheme();
}

/* ================================================================
   MOBILE MENU
   ================================================================ */
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const toggleFixed = document.getElementById('menuToggleFixed');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!mobileMenu) return;

    function openMenu() {
        if (toggle) toggle.classList.add('active');
        if (toggleFixed) toggleFixed.classList.add('active');
        mobileMenu.classList.add('active');
        mobileMenu.classList.add('open-from-left');
        document.body.classList.add('menu-open');
        document.body.classList.add('menu-from-left');
    }

    function closeMenu() {
        if (toggle) toggle.classList.remove('active');
        if (toggleFixed) toggleFixed.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.classList.remove('menu-from-left');
        document.body.classList.remove('menu-from-right');
        setTimeout(() => {
            mobileMenu.classList.remove('open-from-left');
        }, 500);
    }

    function toggleMenu() {
        mobileMenu.classList.contains('active') ? closeMenu() : openMenu();
    }

    if (toggle) toggle.addEventListener('click', toggleMenu);
    if (toggleFixed) toggleFixed.addEventListener('click', toggleMenu);

    // Close menu on link click
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link, .mobile-submenu-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => closeMenu());
    });
}

/* ================================================================
   TOUCH NAVBAR DROPDOWNS
   ================================================================ */
function initTouchNavbarDropdowns() {
    const dropdownItems = document.querySelectorAll('.nav-item-with-custom-dropdown');
    if (!dropdownItems.length) return;

    const shouldUseTapDropdowns = () => isWideTouchNavbarView() || isMobileLandscapeView() || isLandscapeNavbarTapView();
    const getTrigger = (item) => Array.from(item.children).find(child => child.matches && child.matches('.nav-link'));
    const getDropdown = (item) => Array.from(item.children).find(child => child.matches && child.matches('.custom-dropdown-pill'));
    const touchPanel = document.createElement('div');
    touchPanel.className = 'touch-nav-dropdown-panel';
    touchPanel.dir = document.documentElement.dir || 'rtl';
    document.body.appendChild(touchPanel);

    const syncBodyDropdownState = () => {
        document.body.classList.toggle(
            'nav-dropdown-open',
            Boolean(document.querySelector('.nav-item-with-custom-dropdown.dropdown-open')) ||
            touchPanel.classList.contains('active')
        );
    };

    const closeDropdowns = (exceptItem = null) => {
        dropdownItems.forEach(item => {
            if (item !== exceptItem) {
                item.classList.remove('dropdown-open');
            }
        });
        touchPanel.classList.remove('active');
        touchPanel.innerHTML = '';
        syncBodyDropdownState();
    };

    const openTouchPanel = (item, dropdown) => {
        const links = Array.from(dropdown.querySelectorAll('a'));
        touchPanel.innerHTML = '';
        touchPanel.dir = dropdown.getAttribute('dir') || document.documentElement.dir || 'rtl';

        links.forEach((sourceLink, index) => {
            const panelLink = document.createElement('a');
            panelLink.className = 'touch-nav-dropdown-link';
            panelLink.href = sourceLink.getAttribute('href') || '#';
            panelLink.textContent = sourceLink.textContent.trim();
            panelLink.dataset.sourceIndex = String(index);
            if (sourceLink.target) {
                panelLink.target = sourceLink.target;
                panelLink.rel = sourceLink.rel || 'noopener';
            }

            panelLink.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                closeDropdowns();
                sourceLink.click();
            });

            touchPanel.appendChild(panelLink);
        });

        touchPanel.classList.add('active');
        item.classList.add('dropdown-open');
        syncBodyDropdownState();
    };

    let lastTapAt = 0;

    const handleTriggerTap = (event) => {
        if (!shouldUseTapDropdowns()) return;

        const targetElement = event.target instanceof Element ? event.target : null;
        const item = targetElement ? targetElement.closest('.nav-item-with-custom-dropdown') : null;
        if (!item) return;

        const trigger = getTrigger(item);
        const dropdown = getDropdown(item);
        if (!trigger || !dropdown || !trigger.contains(targetElement)) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        const now = Date.now();
        if (event.type === 'click' && now - lastTapAt < 450) {
            return;
        }
        lastTapAt = now;

        const willOpen = !item.classList.contains('dropdown-open') || !touchPanel.classList.contains('active');

        if (willOpen) {
            closeDropdowns(item);
            openTouchPanel(item, dropdown);
        } else {
            closeDropdowns();
        }
    };

    document.addEventListener('touchend', handleTriggerTap, { capture: true, passive: false });
    document.addEventListener('click', handleTriggerTap, true);

    dropdownItems.forEach(item => {
        const trigger = getTrigger(item);
        const dropdown = getDropdown(item);
        if (!trigger || !dropdown) return;

        dropdown.addEventListener('click', (event) => {
            if (!shouldUseTapDropdowns()) return;
            const targetElement = event.target instanceof Element ? event.target : null;
            if (targetElement && targetElement.closest('a')) {
                window.setTimeout(() => closeDropdowns(), 80);
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (!shouldUseTapDropdowns()) return;
        const targetElement = event.target instanceof Element ? event.target : null;
        if (
            !targetElement ||
            (
                !targetElement.closest('.nav-item-with-custom-dropdown') &&
                !targetElement.closest('.touch-nav-dropdown-panel')
            )
        ) {
            closeDropdowns();
        }
    });

    window.addEventListener('resize', () => closeDropdowns());
    window.addEventListener('orientationchange', () => closeDropdowns());
}

/* ================================================================
   EDGE TRIGGERS FOR MENU - Desktop Only
   ================================================================ */
function initEdgeTriggers() {
    const edgeTriggerLeft = document.getElementById('edgeTriggerLeft');
    const edgeTriggerRight = document.getElementById('edgeTriggerRight');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!edgeTriggerLeft || !edgeTriggerRight || !mobileMenu) return;

    const EDGE_THRESHOLD = 50; // pixels from edge to trigger
    const TRIGGER_HEIGHT = 80; // height of trigger element
    let menuIsOpen = false; // Track if menu is open
    let openFromSide = null; // Track which side menu opened from

    // Get current language/direction
    function isRTL() {
        return document.documentElement.getAttribute('lang') === 'ar';
    }

    // Function to open menu from specific side
    function openMenu(side) {
        // Remove any previous side classes
        mobileMenu.classList.remove('open-from-left', 'open-from-right');
        
        if (side === 'left') {
            mobileMenu.classList.add('open-from-left');
        } else {
            mobileMenu.classList.add('open-from-right');
        }

        // Open the menu
        mobileMenu.classList.add('active');
        document.body.classList.add('menu-open');
        document.body.classList.remove('menu-from-left', 'menu-from-right');
        document.body.classList.add(side === 'left' ? 'menu-from-left' : 'menu-from-right');
        menuIsOpen = true;
        openFromSide = side;

        // Update trigger to show close arrow and keep it visible
        if (side === 'left') {
            edgeTriggerLeft.classList.add('menu-open-indicator');
            edgeTriggerLeft.classList.add('visible');
            // Center the trigger vertically
            edgeTriggerLeft.style.top = '50%';
            edgeTriggerLeft.style.transform = 'translateY(-50%)';
        } else {
            edgeTriggerRight.classList.add('menu-open-indicator');
            edgeTriggerRight.classList.add('visible');
            // Center the trigger vertically
            edgeTriggerRight.style.top = '50%';
            edgeTriggerRight.style.transform = 'translateY(-50%)';
        }
    }

    // Function to close menu
    function closeMenu() {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.classList.remove('menu-from-left');
        document.body.classList.remove('menu-from-right');
        
        // Remove close arrow indicator
        edgeTriggerLeft.classList.remove('menu-open-indicator');
        edgeTriggerLeft.classList.remove('visible');
        edgeTriggerRight.classList.remove('menu-open-indicator');
        edgeTriggerRight.classList.remove('visible');
        
        // Reset trigger positions and transforms
        edgeTriggerLeft.style.transform = '';
        edgeTriggerRight.style.transform = '';
        
        menuIsOpen = false;
        openFromSide = null;
        
        // Reset menu position after closing
        setTimeout(() => {
            mobileMenu.classList.remove('open-from-left', 'open-from-right');
        }, 500);
    }

    // Mouse move handler
    function handleMouseMove(e) {
        // If menu is open, don't track mouse - keep trigger at center
        if (menuIsOpen) {
            return;
        }

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate trigger position (centered on mouse Y, but clamped to screen bounds)
        const triggerY = Math.max(0, Math.min(windowHeight - TRIGGER_HEIGHT, mouseY - TRIGGER_HEIGHT / 2));

        const rtl = isRTL();

        // In RTL (Arabic): show left trigger
        if (rtl) {
            if (mouseX <= EDGE_THRESHOLD) {
                edgeTriggerLeft.style.top = triggerY + 'px';
                edgeTriggerLeft.classList.add('visible');
            } else {
                edgeTriggerLeft.classList.remove('visible');
            }
        }
        // In LTR (English): show right trigger
        else {
            if (mouseX >= windowWidth - EDGE_THRESHOLD) {
                edgeTriggerRight.style.top = triggerY + 'px';
                edgeTriggerRight.classList.add('visible');
            } else {
                edgeTriggerRight.classList.remove('visible');
            }
        }
    }

    // Click handler for left trigger
    edgeTriggerLeft.addEventListener('click', () => {
        if (menuIsOpen && openFromSide === 'left') {
            closeMenu();
        } else {
            openMenu('left');
        }
    });

    // Click handler for right trigger
    edgeTriggerRight.addEventListener('click', () => {
        if (menuIsOpen && openFromSide === 'right') {
            closeMenu();
        } else {
            openMenu('right');
        }
    });

    // Click outside menu to close (desktop only)
    document.addEventListener('click', (e) => {
        // Only on desktop
        if (window.innerWidth <= 1340) return;
        
        // Only if menu is open
        if (!menuIsOpen) return;

        // Check if click is outside menu and triggers
        const isClickInsideMenu = mobileMenu.contains(e.target);
        const isClickOnTrigger = edgeTriggerLeft.contains(e.target) || edgeTriggerRight.contains(e.target);

        if (!isClickInsideMenu && !isClickOnTrigger) {
            closeMenu();
        }
    });

    // Close menu on link click
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link, .mobile-submenu-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => closeMenu());
    });

    // Add mouse move listener only on desktop
    if (window.innerWidth > 1340) {
        document.addEventListener('mousemove', handleMouseMove);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1340) {
            document.addEventListener('mousemove', handleMouseMove);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            edgeTriggerLeft.classList.remove('visible');
            edgeTriggerRight.classList.remove('visible');
        }
    });
}

/* ================================================================
   SCROLL REVEAL (Two-way)
   ================================================================ */
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal-up, .reveal-down, .reveal-left, .reveal-right');

    if (elements.length === 0) return;

    if (isMobileFastView()) {
        elements.forEach(el => el.classList.add('revealed'));
        return;
    }

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Only add 'revealed' class once, never remove it
                if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
                    if (!entry.target.classList.contains('revealed')) {
                        entry.target.classList.add('revealed');
                        // Stop observing this element after revealing
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, {
            threshold: [0, 0.15, 0.5, 1],
            rootMargin: '0px'
        });

        elements.forEach((el, index) => {
            observer.observe(el);
        });
    } else {
        elements.forEach(el => el.classList.add('revealed'));
    }
}

/* ================================================================
   ABOUT SLIDER
   ================================================================ */
function initAboutSlider() {
    // Replaced by typewriter — handled in initTypewriter()
    const slides = document.querySelectorAll('.about-slide');
    if (slides.length === 0) return;
    // legacy slider kept for fallback
}

/* ================================================================
   ABOUT TYPEWRITER
   ================================================================ */
function initTypewriterLegacy() {
    const labelEl = document.getElementById('typewriterLabel');
    const textEl  = document.getElementById('typewriterText');
    if (!labelEl || !textEl) return;

    const items = [
        {
            label: 'رؤيتنا',
            text:  'الارتقاء بالخدمة الإعلانية لتضاهي المستويات العالمية.'
        },
        {
            label: 'رسالتنا',
            text:  'استمرار نجاحنا في تحقيق المعادلة الصعبة: نيوجرافيك = (السرعة، الجودة، السعر).'
        },
        {
            label: 'قيمنا',
            text:  'نبتكر للتميز (الاحترافية، المصداقية، نهم عملائنا، السرعة والإنجاز، السعر التنافسي، العمل بروح الفريق).'
        }
    ];

    let current = 0;
    const CHAR_DELAY  = 45;   // ms per character typed
    const ERASE_DELAY = 25;   // ms per character erased
    const PAUSE_AFTER = 2800; // ms to wait before erasing

    // inject cursor span once
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    textEl.appendChild(cursor);

    function typeString(el, str, delay, cb) {
        let i = 0;
        function next() {
            if (i <= str.length) {
                // insert text before cursor
                el.childNodes[0]
                    ? el.childNodes[0].textContent = str.slice(0, i)
                    : el.insertBefore(document.createTextNode(str.slice(0, i)), cursor);
                i++;
                setTimeout(next, delay);
            } else {
                cb && cb();
            }
        }
        // ensure text node exists
        if (!el.childNodes[0] || el.childNodes[0] === cursor) {
            el.insertBefore(document.createTextNode(''), cursor);
        }
        next();
    }

    function eraseString(el, delay, cb) {
        function next() {
            const node = el.childNodes[0];
            if (node && node !== cursor && node.textContent.length > 0) {
                node.textContent = node.textContent.slice(0, -1);
                setTimeout(next, delay);
            } else {
                cb && cb();
            }
        }
        next();
    }

    const boxEl = document.querySelector('.about-typewriter-box');

    function runCycle() {
        const item = items[current];

        // type label instantly
        labelEl.textContent = item.label;

        // Measure target height before typing
        if (boxEl) {
            const tempNode = document.createTextNode(item.text);
            textEl.insertBefore(tempNode, cursor);
            
            boxEl.style.transition = 'none';
            boxEl.style.minHeight = 'unset';
            boxEl.style.height = 'auto';
            
            const targetHeight = boxEl.offsetHeight;
            
            tempNode.remove();
            
            boxEl.style.transition = 'min-height 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
            boxEl.style.minHeight = `${targetHeight}px`;
        }

        // type text
        typeString(textEl, item.text, CHAR_DELAY, () => {
            // pause then erase
            setTimeout(() => {
                eraseString(textEl, ERASE_DELAY, () => {
                    labelEl.textContent = '';
                    current = (current + 1) % items.length;
                    setTimeout(runCycle, 400);
                });
            }, PAUSE_AFTER);
        });
    }

    runCycle();
}

function initTypewriter() {
    const labelEl = document.getElementById('typewriterLabel');
    const textEl = document.getElementById('typewriterText');
    if (!labelEl || !textEl) return;

    const items = [
        { labelKey: 'about_vision_title', textKey: 'about_vision_p' },
        { labelKey: 'about_mission_title', textKey: 'about_mission_p' },
        { labelKey: 'about_values_title', textKey: 'about_values_p' }
    ];

    let current = 0;
    let runToken = 0;
    let pendingTimers = [];
    const CHAR_DELAY = 45;
    const ERASE_DELAY = 25;
    const PAUSE_AFTER = 2800;

    textEl.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    textEl.appendChild(cursor);

    const ensureCursor = () => {
        if (cursor.parentNode !== textEl) {
            textEl.appendChild(cursor);
        }
    };

    const ensureTextNode = () => {
        ensureCursor();
        if (!textEl.childNodes[0] || textEl.childNodes[0] === cursor) {
            textEl.insertBefore(document.createTextNode(''), cursor);
        }
    };

    const getItem = () => {
        const item = items[current];
        const langPack = translations[currentLang] || translations.ar;
        return {
            label: langPack[item.labelKey] || '',
            text: langPack[item.textKey] || ''
        };
    };

    const schedule = (fn, delay) => {
        const timer = setTimeout(() => {
            pendingTimers = pendingTimers.filter(item => item !== timer);
            fn();
        }, delay);
        pendingTimers.push(timer);
        return timer;
    };

    const clearPendingTimers = () => {
        pendingTimers.forEach(timer => clearTimeout(timer));
        pendingTimers = [];
    };

    const typeString = (str, token, cb) => {
        let index = 0;
        ensureTextNode();

        const next = () => {
            if (token !== runToken) return;
            if (index <= str.length) {
                textEl.childNodes[0].textContent = str.slice(0, index);
                index++;
                schedule(next, CHAR_DELAY);
            } else if (cb) {
                cb();
            }
        };

        next();
    };

    const eraseString = (token, cb) => {
        const next = () => {
            if (token !== runToken) return;
            const node = textEl.childNodes[0];
            if (node && node !== cursor && node.textContent.length > 0) {
                node.textContent = node.textContent.slice(0, -1);
                schedule(next, ERASE_DELAY);
            } else if (cb) {
                cb();
            }
        };

        next();
    };

    const boxEl = document.querySelector('.about-typewriter-box');

    const measureBox = (text) => {
        if (!boxEl) return;
        ensureCursor();
        const tempNode = document.createTextNode(text);
        textEl.insertBefore(tempNode, cursor);
        boxEl.style.transition = 'none';
        boxEl.style.minHeight = 'unset';
        boxEl.style.height = 'auto';
        const targetHeight = boxEl.offsetHeight;
        tempNode.remove();
        boxEl.style.transition = 'min-height 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
        boxEl.style.minHeight = `${targetHeight}px`;
    };

    const runCycle = (token) => {
        if (token !== runToken) return;
        const item = getItem();
        labelEl.textContent = item.label;
        measureBox(item.text);

        typeString(item.text, token, () => {
            schedule(() => {
                if (token !== runToken) return;
                eraseString(token, () => {
                    labelEl.textContent = '';
                    current = (current + 1) % items.length;
                    schedule(() => runCycle(token), 400);
                });
            }, PAUSE_AFTER);
        });
    };

    window.refreshAboutTypewriter = () => {
        runToken++;
        clearPendingTimers();
        current = 0;

        const item = getItem();
        ensureTextNode();
        labelEl.textContent = item.label;
        textEl.childNodes[0].textContent = '';
        measureBox(item.text);
        runCycle(runToken);
    };

    runToken++;
    runCycle(runToken);
}

/* ================================================================
   SMOOTH SCROLL
   ================================================================ */
function initSmoothScroll() {
    const links = document.querySelectorAll('.nav-link:not(#navClients):not(#navSocial):not(#navIdentity), .mobile-nav-link:not([href="#social-page"]):not([href="#identityPage"]), a[href="#hero"], a[href="#contact"], .footer-links a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            // Check if we're currently inside a full-page overlay (clients, portfolio choices, social, or identity)
            const clientsPage = document.getElementById('clientsPage');
            const choicesPage = document.getElementById('portfolioChoicesPage');
            const socialPage = document.getElementById('socialPage');
            const identityPage = document.getElementById('identityPage');
            const isInOverlay =
                (clientsPage && clientsPage.classList.contains('active')) ||
                (choicesPage && choicesPage.classList.contains('active')) ||
                (socialPage && socialPage.classList.contains('active')) ||
                (identityPage && identityPage.classList.contains('active'));

            if (isInOverlay) {
                // Run the logo transition, close overlays, then scroll to target
                const pageTransition = document.getElementById('pageTransition');
                if (pageTransition) {
                    pageTransition.classList.add('active');
                    setTimeout(() => {
                        // Close any open overlay
                        if (clientsPage && clientsPage.classList.contains('active')) {
                            clientsPage.classList.remove('active');
                            document.body.style.overflow = '';
                            window.history.replaceState(null, '', window.location.pathname);
                        }
                        if (choicesPage && choicesPage.classList.contains('active')) {
                            choicesPage.classList.remove('active');
                            document.body.style.overflow = '';
                            window.history.replaceState(null, '', window.location.pathname);
                        }
                        if (socialPage && socialPage.classList.contains('active')) {
                            socialPage.classList.remove('active');
                            document.body.style.overflow = '';
                            window.location.hash = '';
                        }
                        if (identityPage && identityPage.classList.contains('active')) {
                            identityPage.classList.remove('active');
                            document.body.style.overflow = '';
                            window.location.hash = '';
                        }
                        // Scroll to target
                        const headerOffset = 100;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.scrollY - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }, 900);
                    setTimeout(() => {
                        pageTransition.classList.remove('active');
                    }, 1800);
                }
            } else {
                // Normal smooth scroll
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });
}

// ================================================================
//    SPOTLIGHT PARTNERS SLIDER (MAGAZINE STYLE)
//    ================================================================ */

/* helper — get current translateX from element's transform */
function getComputedTranslateX(el) {
    const style = window.getComputedStyle(el);
    const matrix = new DOMMatrix(style.transform);
    return matrix.m41; // translateX value
}

function initCinematicPartners() {
    const namesBar   = document.getElementById('cnNamesBar');
    const namesInner = document.getElementById('cnNamesInner');
    const cardsRow   = document.getElementById('cnCardsRow');
    const infoTitle  = document.getElementById('cnInfoTitle');
    const infoDesc   = document.getElementById('cnInfoDesc');

    if (!namesBar || !namesInner || !cardsRow) return;

    let currentIndex = 0;
    let autoCycleInterval;

    const clientColors = [
        'linear-gradient(135deg,#3D1F6E,#6B3FA0)',
        'linear-gradient(135deg,#8B4513,#D2691E)',
        'linear-gradient(135deg,#1a3850,#2E6B9E)',
        'linear-gradient(135deg,#4A0E0E,#B22222)',
        'linear-gradient(135deg,#0D3B28,#1B7A51)',
        'linear-gradient(135deg,#1A1070,#3730C8)',
        'linear-gradient(135deg,#6B2040,#C0395E)',
        'linear-gradient(135deg,#2D2800,#7A6E00)',
        'linear-gradient(135deg,#003333,#006666)',
        'linear-gradient(135deg,#3B1560,#7B3DB5)',
        'linear-gradient(135deg,#001F3F,#0057B7)',
        'linear-gradient(135deg,#3D2B00,#A0720A)',
        'linear-gradient(135deg,#0E3B1A,#217A3A)',
        'linear-gradient(135deg,#3B0000,#8B0000)',
        'linear-gradient(135deg,#2A1A00,#6B4500)',
        'linear-gradient(135deg,#001040,#002B92)'
    ];

    // Map client display names → folder name + random thumb (global for use in initClientsPage)
    window.clientFolderMap = {
        'El Masria Elmasria Development': { folder: 'El Masria Elmasria Development', imgs: ['WhatsApp Image 2025-12-15 at 5.38.54 PM (2).jpg', 'WhatsApp Image 2025-12-15 at 5.38.55 PM (1).jpg', 'WhatsApp Image 2025-12-15 at 5.38.55 PM (2).jpg', 'WhatsApp Image 2025-12-15 at 5.38.55 PM (3).jpg', 'WhatsApp Image 2025-12-15 at 5.38.55 PM (4).jpg', 'WhatsApp Image 2025-12-15 at 5.38.55 PM.jpg', 'WhatsApp Image 2025-12-17 at 11.27.17 AM.jpg', 'WhatsApp Image 2025-12-17 at 11.27.18 AM (1).jpg', 'WhatsApp Image 2025-12-17 at 11.27.18 AM (2).jpg', 'WhatsApp Image 2025-12-17 at 11.27.18 AM (3).jpg', 'WhatsApp Image 2025-12-17 at 11.27.18 AM (4).jpg', 'WhatsApp Image 2025-12-17 at 11.27.18 AM.jpg', 'WhatsApp Image 2025-12-17 at 11.27.19 AM (1).jpg', 'WhatsApp Image 2025-12-17 at 11.27.19 AM (2).jpg', 'WhatsApp Image 2025-12-17 at 11.27.19 AM (3).jpg', 'WhatsApp Image 2025-12-17 at 11.27.19 AM (4).jpg', 'WhatsApp Image 2025-12-17 at 11.27.19 AM (5).jpg', 'WhatsApp Image 2025-12-17 at 11.27.19 AM.jpg', 'WhatsApp Image 2025-12-17 at 11.27.20 AM (1).jpg', 'WhatsApp Image 2025-12-17 at 11.27.20 AM (2).jpg', 'WhatsApp Image 2025-12-17 at 11.27.20 AM (3).jpg', 'WhatsApp Image 2025-12-17 at 11.27.20 AM.jpg', 'WhatsApp Image 2025-12-17 at 11.27.21 AM (1).jpg', 'WhatsApp Image 2025-12-17 at 11.27.21 AM.jpg', 'WhatsApp Image 2025-12-17 at 11.27.22 AM (1).jpg', 'WhatsApp Image 2025-12-17 at 11.27.22 AM.jpg', 'WhatsApp Image 2025-12-21 at 10.53.09 AM.jpg', 'WhatsApp Image 2025-12-21 at 10.53.10 AM.jpg', 'WhatsApp Image 2025-12-21 at 10.53.11 AM (1).jpg', 'WhatsApp Image 2025-12-21 at 10.53.11 AM.jpg', 'WhatsApp Image 2025-12-21 at 10.53.12 AM (1).jpg', 'WhatsApp Image 2025-12-21 at 10.53.12 AM.jpg', 'WhatsApp Image 2025-12-21 at 10.53.13 AM.jpg', 'WhatsApp Image 2025-12-21 at 10.53.14 AM.jpg', 'WhatsApp Image 2025-12-22 at 10.37.37 AM.jpg', 'WhatsApp Image 2025-12-22 at 10.37.38 AM.jpg', 'WhatsApp Image 2025-12-22 at 10.37.39 AM.jpg', 'WhatsApp Image 2026-01-22 at 2.11.57 PM (1).jpg', 'WhatsApp Image 2026-01-22 at 2.11.57 PM.jpg', 'WhatsApp Image 2026-01-22 at 2.13.14 PM (1).jpg', 'WhatsApp Image 2026-01-22 at 2.13.14 PM.jpg', 'WhatsApp Image 2026-01-22 at 2.13.50 PM.jpg', 'WhatsApp Image 2026-01-24 at 11.14.29 AM.jpg', 'WhatsApp Image 2026-01-24 at 11.14.30 AM (1).jpg', 'WhatsApp Image 2026-01-24 at 11.14.30 AM.jpg', 'WhatsApp Image 2026-01-24 at 11.14.31 AM (1).jpg', 'WhatsApp Image 2026-01-24 at 11.14.31 AM (2).jpg', 'WhatsApp Image 2026-01-24 at 11.14.31 AM.jpg', 'WhatsApp Image 2026-01-24 at 11.14.32 AM (1).jpg', 'WhatsApp Image 2026-01-24 at 11.14.32 AM.jpg'] },
        'KEWAN': { folder: 'KEWAN', imgs: ['WhatsApp Image 2026-01-07 at 12.46.01 PM.jpg', 'WhatsApp Image 2026-01-07 at 12.46.02 PM (1).jpg', 'WhatsApp Image 2026-01-07 at 12.46.02 PM (2).jpg', 'WhatsApp Image 2026-01-07 at 12.46.02 PM.jpg', 'WhatsApp Image 2026-01-07 at 12.46.03 PM.jpg', 'WhatsApp Image 2026-01-07 at 12.46.04 PM (1).jpg', 'WhatsApp Image 2026-01-07 at 12.46.04 PM.jpg', 'WhatsApp Image 2026-01-08 at 1.07.13 PM (1).jpg', 'WhatsApp Image 2026-01-08 at 1.07.13 PM (3) - Copy.jpg', 'WhatsApp Image 2026-01-08 at 1.07.13 PM - Copy.jpg', 'WhatsApp Image 2026-01-08 at 1.44.55 PM - Copy.jpg', 'WhatsApp Image 2026-01-12 at 5.58.57 PM (1).jpg', 'WhatsApp Image 2026-01-12 at 5.58.57 PM (2).jpg', 'WhatsApp Image 2026-01-12 at 5.58.57 PM (3).jpg', 'WhatsApp Image 2026-01-12 at 5.58.57 PM.jpg', 'WhatsApp Image 2026-01-14 at 5.22.10 PM.jpg', 'WhatsApp Image 2026-01-14 at 5.22.11 PM (1).jpg', 'WhatsApp Image 2026-01-14 at 5.22.11 PM (2).jpg', 'WhatsApp Image 2026-01-14 at 5.22.11 PM.jpg', 'WhatsApp Image 2026-01-14 at 5.22.12 PM (1).jpg', 'WhatsApp Image 2026-01-14 at 5.22.12 PM (2).jpg', 'WhatsApp Image 2026-01-14 at 5.22.12 PM.jpg', 'WhatsApp Image 2026-01-14 at 5.22.13 PM (1).jpg', 'WhatsApp Image 2026-01-14 at 5.22.13 PM (2).jpg', 'WhatsApp Image 2026-01-14 at 5.22.13 PM.jpg', 'WhatsApp Image 2026-01-14 at 5.22.28 PM (1).jpg', 'WhatsApp Image 2026-01-14 at 5.22.28 PM.jpg', 'WhatsApp Image 2026-01-14 at 5.22.30 PM.jpg', 'WhatsApp Image 2026-01-22 at 12.12.19 PM.jpg', 'WhatsApp Image 2026-01-22 at 12.12.20 PM (1).jpg', 'WhatsApp Image 2026-01-22 at 12.12.20 PM (2).jpg', 'WhatsApp Image 2026-01-22 at 12.12.20 PM (3).jpg', 'WhatsApp Image 2026-01-22 at 12.12.20 PM.jpg', 'WhatsApp Image 2026-01-24 at 10.55.16 AM (1).jpg', 'WhatsApp Image 2026-01-24 at 10.55.16 AM.jpg', 'WhatsApp Image 2026-01-24 at 10.56.21 AM.jpg'] },
        'ROWAD MODERN ENGINEERING': { folder: 'ROWAD MODERN ENGINEERING', imgs: ['WhatsApp Image 2025-11-02 at 12.46.55 PM (1) - Copy.jpg', 'WhatsApp Image 2025-11-02 at 12.46.55 PM (1).jpg', 'WhatsApp Image 2025-11-02 at 12.46.55 PM (2) - Copy.jpg', 'WhatsApp Image 2025-11-02 at 12.46.55 PM (2).jpg', 'WhatsApp Image 2025-11-02 at 12.46.55 PM - Copy.jpg', 'WhatsApp Image 2025-11-02 at 12.46.55 PM.jpg', 'WhatsApp Image 2025-11-02 at 12.46.56 PM (1) - Copy.jpg', 'WhatsApp Image 2025-11-02 at 12.46.56 PM (2).jpg', 'WhatsApp Image 2025-11-02 at 12.46.56 PM (3).jpg', 'WhatsApp Image 2025-11-02 at 12.46.56 PM (6) - Copy.jpg', 'WhatsApp Image 2025-11-02 at 12.46.56 PM (6).jpg', 'WhatsApp Image 2025-11-02 at 12.46.56 PM - Copy.jpg', 'WhatsApp Image 2025-11-02 at 12.46.56 PM.jpg', 'WhatsApp Image 2026-01-17 at 3.08.07 PM (1).jpg', 'WhatsApp Image 2026-01-17 at 3.08.07 PM.jpg', 'WhatsApp Image 2026-01-26 at 10.30.23 PM.jpg', 'WhatsApp Image 2026-01-26 at 10.30.24 PM (1).jpg', 'WhatsApp Image 2026-01-26 at 10.30.25 PM.jpg', 'WhatsApp Image 2026-01-31 at 6.44.22 PM (1).jpg', 'WhatsApp Image 2026-01-31 at 6.44.22 PM (2).jpg', 'WhatsApp Image 2026-01-31 at 6.44.22 PM (3).jpg', 'WhatsApp Image 2026-01-31 at 6.44.22 PM (4).jpg', 'WhatsApp Image 2026-01-31 at 6.44.22 PM.jpg', 'WhatsApp Image 2026-02-07 at 1.13.57 PM (1).jpg', 'WhatsApp Image 2026-02-07 at 1.13.57 PM.jpg', 'WhatsApp Image 2026-02-07 at 1.34.53 PM.jpg', 'WhatsApp Image 2026-02-07 at 1.34.54 PM (1).jpg', 'WhatsApp Image 2026-02-07 at 1.34.54 PM (2).jpg', 'WhatsApp Image 2026-02-07 at 1.34.54 PM (3).jpg', 'WhatsApp Image 2026-04-05 at 1.52.30 PM (1).jpg', 'WhatsApp Image 2026-04-05 at 1.52.30 PM.jpg'] },
        'Al Baraka': { folder: 'Al Baraka', imgs: ['WhatsApp Image 2025-12-11 at 11.19.30 AM (1).jpg', 'WhatsApp Image 2025-12-11 at 11.19.30 AM (1)_1.jpg', 'WhatsApp Image 2025-12-11 at 11.19.30 AM (2).jpg', 'WhatsApp Image 2025-12-11 at 11.19.30 AM (2)_1.jpg', 'WhatsApp Image 2025-12-11 at 11.19.30 AM (3).jpg', 'WhatsApp Image 2025-12-11 at 11.19.30 AM.jpg', 'WhatsApp Image 2025-12-11 at 11.19.30 AM_1.jpg', 'WhatsApp Image 2025-12-11 at 11.19.32 AM (1).jpg', 'WhatsApp Image 2025-12-11 at 11.19.32 AM (1)_1.jpg', 'WhatsApp Image 2025-12-11 at 11.19.32 AM (2).jpg', 'WhatsApp Image 2025-12-11 at 11.19.32 AM (2)_1.jpg', 'WhatsApp Image 2025-12-11 at 11.19.32 AM.jpg', 'WhatsApp Image 2025-12-11 at 11.19.32 AM_1.jpg', 'WhatsApp Image 2025-12-11 at 11.19.33 AM (2).jpg', 'WhatsApp Image 2025-12-11 at 11.19.33 AM.jpg', 'WhatsApp Image 2025-12-11 at 11.19.33 AM_1.jpg', 'WhatsApp Image 2025-12-11 at 11.19.34 AM (1).jpg', 'WhatsApp Image 2025-12-11 at 11.19.34 AM.jpg', 'WhatsApp Image 2026-03-23 at 12.49.51 PM (1).jpg', 'WhatsApp Image 2026-03-23 at 12.49.51 PM (2).jpg', 'WhatsApp Image 2026-03-23 at 12.49.51 PM.jpg', 'WhatsApp Image 2026-03-23 at 12.49.52 PM.jpg'] },
        'Awadi Urban Development': { folder: 'Awadi Urban Development', imgs: ['WhatsApp Image 2025-11-22 at 2.53.14 PM.jpg', 'WhatsApp Image 2025-11-22 at 2.53.15 PM (1).jpg', 'WhatsApp Image 2025-11-22 at 2.53.15 PM.jpg', 'WhatsApp Image 2025-11-22 at 2.53.16 PM (1).jpg', 'WhatsApp Image 2025-11-22 at 2.53.16 PM.jpg', 'WhatsApp Image 2025-11-22 at 2.53.17 PM.jpg', 'WhatsApp Image 2025-11-22 at 3.16.04 PM.jpg', 'WhatsApp Image 2025-12-04 at 12.20.19 PM (2).jpg', 'WhatsApp Image 2025-12-04 at 12.20.19 PM.jpg', 'WhatsApp Image 2025-12-04 at 12.20.21 PM (1).jpg', 'WhatsApp Image 2025-12-04 at 12.20.21 PM (2).jpg', 'WhatsApp Image 2025-12-15 at 1.37.34 PM (1).jpg', 'WhatsApp Image 2025-12-15 at 1.37.35 PM (1).jpg', 'WhatsApp Image 2025-12-15 at 1.37.35 PM (2).jpg', 'WhatsApp Image 2025-12-15 at 1.37.35 PM.jpg', 'WhatsApp Image 2025-12-15 at 5.38.56 PM (1).jpg', 'WhatsApp Image 2025-12-15 at 5.38.56 PM (2).jpg', 'WhatsApp Image 2025-12-15 at 5.38.57 PM.jpg', 'WhatsApp Image 2025-12-15 at 5.38.58 PM (1).jpg', 'WhatsApp Image 2025-12-15 at 5.38.58 PM.jpg', 'WhatsApp Image 2025-12-21 at 8.16.47 AM (1).jpg'] },
        'Suez Canal Authority': { folder: 'Suez Canal Authority', imgs: ['WhatsApp Image 2026-01-11 at 11.42.21 AM.jpg', 'WhatsApp Image 2026-01-11 at 11.42.23 AM (1).jpg', 'WhatsApp Image 2026-01-11 at 11.42.23 AM.jpg', 'WhatsApp Image 2026-01-11 at 11.42.24 AM.jpg', 'WhatsApp Image 2026-01-11 at 11.42.27 AM (1).jpg', 'WhatsApp Image 2026-01-11 at 11.42.30 AM (1).jpg', 'WhatsApp Image 2026-01-11 at 11.42.37 AM.jpg', 'WhatsApp Image 2026-01-11 at 11.42.38 AM (1).jpg', 'WhatsApp Image 2026-01-11 at 11.42.42 AM (1).jpg', 'WhatsApp Image 2026-01-11 at 11.42.42 AM.jpg', 'WhatsApp Image 2026-01-11 at 11.42.43 AM (1).jpg', 'WhatsApp Image 2026-01-11 at 11.42.43 AM.jpg', 'WhatsApp Image 2026-01-11 at 11.42.48 AM.jpg', 'WhatsApp Image 2026-01-11 at 11.42.52 AM.jpg', 'WhatsApp Image 2026-01-11 at 11.42.53 AM.jpg', 'WhatsApp Image 2026-01-11 at 11.42.54 AM (1).jpg', 'WhatsApp Image 2026-01-11 at 11.42.54 AM.jpg', 'WhatsApp Image 2026-01-11 at 11.42.57 AM.jpg', 'WhatsApp Image 2026-01-24 at 11.15.15 AM (1).jpg', 'WhatsApp Image 2026-01-24 at 11.15.16 AM.jpg', 'WhatsApp Image 2026-01-24 at 11.15.19 AM (1).jpg'] },
        'MacTronic Services': { folder: 'MacTronic Services', imgs: ['WhatsApp Image 2026-01-08 at 1.07.13 PM (2) - Copy.jpg', 'WhatsApp Image 2026-01-08 at 1.07.14 PM (1) - Copy.jpg', 'WhatsApp Image 2026-01-08 at 1.07.14 PM (1).jpg', 'WhatsApp Image 2026-01-08 at 1.07.14 PM (2) - Copy.jpg', 'WhatsApp Image 2026-01-08 at 1.07.14 PM.jpg', 'WhatsApp Image 2026-01-08 at 1.08.09 PM (1).jpg', 'WhatsApp Image 2026-01-08 at 1.08.09 PM (2) - Copy.jpg', 'WhatsApp Image 2026-01-08 at 1.08.09 PM.jpg', 'WhatsApp Image 2026-01-08 at 1.08.10 PM (1).jpg', 'WhatsApp Image 2026-01-08 at 1.08.10 PM (2).jpg', 'WhatsApp Image 2026-01-08 at 1.08.10 PM (3) - Copy.jpg', 'WhatsApp Image 2026-01-08 at 1.08.10 PM (4) - Copy.jpg', 'WhatsApp Image 2026-01-08 at 1.08.10 PM.jpg', 'WhatsApp Image 2026-01-08 at 1.08.11 PM (1).jpg'] },
        'RakAEZ Development': { folder: 'RakAEZ Development', imgs: ['WhatsApp Image 2026-01-29 at 1.30.31 PM (1).jpg', 'WhatsApp Image 2026-01-29 at 1.30.31 PM.jpg', 'WhatsApp Image 2026-01-29 at 1.30.32 PM (2).jpg', 'WhatsApp Image 2026-01-29 at 1.30.32 PM.jpg', 'WhatsApp Image 2026-01-31 at 11.57.01 AM (1).jpg', 'WhatsApp Image 2026-01-31 at 11.57.01 AM.jpg', 'WhatsApp Image 2026-01-31 at 11.57.02 AM (1).jpg', 'WhatsApp Image 2026-01-31 at 11.57.02 AM.jpg', 'WhatsApp Image 2026-01-31 at 11.57.03 AM (1).jpg', 'WhatsApp Image 2026-01-31 at 2.35.32 PM (1).jpg', 'WhatsApp Image 2026-01-31 at 2.35.32 PM.jpg', 'WhatsApp Image 2026-01-31 at 2.36.45 PM (1).jpg', 'WhatsApp Image 2026-01-31 at 2.36.45 PM (2).jpg', 'WhatsApp Image 2026-01-31 at 2.36.45 PM (3).jpg'] },
        'AWAAED Development': { folder: 'AWAAED Development', imgs: ['WhatsApp Image 2026-01-15 at 1.37.17 PM (1).jpg', 'WhatsApp Image 2026-01-15 at 1.37.17 PM.jpg', 'WhatsApp Image 2026-01-15 at 1.40.12 PM (1).jpg', 'WhatsApp Image 2026-01-15 at 1.40.12 PM (2).jpg', 'WhatsApp Image 2026-01-15 at 1.40.12 PM (3).jpg', 'WhatsApp Image 2026-01-15 at 1.40.12 PM (4).jpg', 'WhatsApp Image 2026-01-15 at 1.40.12 PM.jpg', 'WhatsApp Image 2026-01-15 at 1.42.25 PM.jpg', 'WhatsApp Image 2026-01-15 at 1.42.26 PM.jpg', 'WhatsApp Image 2026-01-22 at 12.27.12 PM.jpg', 'WhatsApp Image 2026-01-22 at 12.27.55 PM (1).jpg', 'WhatsApp Image 2026-01-22 at 12.27.55 PM (2).jpg', 'WhatsApp Image 2026-01-22 at 12.27.55 PM.jpg'] },
        'EASY WAY': { folder: 'EASY WAY', imgs: ['WhatsApp Image 2025-10-02 at 5.28.44 PM (1).jpg', 'WhatsApp Image 2025-10-02 at 5.28.44 PM.jpg', 'WhatsApp Image 2025-10-02 at 5.29.01 PM.jpg', 'WhatsApp Image 2025-10-02 at 5.29.02 PM (2).jpg', 'WhatsApp Image 2025-10-02 at 5.29.02 PM.jpg', 'WhatsApp Image 2025-10-05 at 11.59.48 AM.jpg', 'WhatsApp Image 2025-10-06 at 6.15.56 PM (1).jpg', 'WhatsApp Image 2025-10-06 at 6.15.56 PM (2).jpg', 'WhatsApp Image 2025-10-06 at 6.15.56 PM.jpg', 'WhatsApp Image 2025-10-06 at 6.15.57 PM (1).jpg', 'WhatsApp Image 2025-10-06 at 6.15.57 PM (2).jpg', 'WhatsApp Image 2025-10-06 at 6.15.57 PM.jpg', 'WhatsApp Image 2025-10-06 at 6.15.58 PM.jpg'] },
        'الفيروز': { folder: 'الفيروز', imgs: ['WhatsApp Image 2025-12-23 at 4.18.17 PM.jpg', 'WhatsApp Image 2025-12-23 at 4.18.18 PM (1).jpg', 'WhatsApp Image 2025-12-23 at 4.18.18 PM.jpg', 'WhatsApp Image 2025-12-23 at 4.21.22 PM.jpg', 'WhatsApp Image 2025-12-23 at 4.21.23 PM.jpg', 'WhatsApp Image 2025-12-23 at 4.21.25 PM.jpg', 'WhatsApp Image 2025-12-23 at 4.21.27 PM (1).jpg', 'WhatsApp Image 2025-12-23 at 4.21.27 PM.jpg', 'WhatsApp Image 2025-12-23 at 4.21.28 PM (1).jpg', 'WhatsApp Image 2025-12-23 at 4.21.28 PM.jpg', 'WhatsApp Image 2025-12-23 at 4.21.30 PM.jpg', 'WhatsApp Image 2025-12-23 at 4.21.31 PM.jpg'] },
        'Integrated Logistics Group ILG': { folder: 'Integrated Logistics Group ILG', imgs: ['WhatsApp Image 2026-01-18 at 1.47.15 PM.jpg', 'WhatsApp Image 2026-01-18 at 1.47.16 PM (1).jpg', 'WhatsApp Image 2026-01-18 at 1.47.16 PM (2).jpg', 'WhatsApp Image 2026-01-18 at 1.47.16 PM (4).jpg', 'WhatsApp Image 2026-01-18 at 1.47.16 PM.jpg', 'WhatsApp Image 2026-01-18 at 1.47.17 PM (1).jpg', 'WhatsApp Image 2026-01-18 at 1.47.17 PM.jpg', 'WhatsApp Image 2026-01-18 at 12.28.45 PM.jpg', 'WhatsApp Image 2026-01-18 at 12.35.32 PM.jpg'] },
        'SALAM PROPERTIES': { folder: 'SALAM PROPERTIES', imgs: ['WhatsApp Image 2025-12-28 at 12.11.10 PM.jpg', 'WhatsApp Image 2025-12-28 at 12.12.17 PM.jpg', 'WhatsApp Image 2026-03-12 at 11.10.42 AM.jpg', 'WhatsApp Image 2026-03-12 at 11.10.43 AM (1).jpg', 'WhatsApp Image 2026-03-12 at 11.10.43 AM (2).jpg', 'WhatsApp Image 2026-03-12 at 11.10.43 AM (3).jpg', 'WhatsApp Image 2026-03-12 at 11.10.43 AM (4).jpg', 'WhatsApp Image 2026-03-12 at 11.10.43 AM.jpg', 'WhatsApp Image 2026-03-12 at 11.15.41 AM.jpg'] },
        'AUD Urban Development': { folder: 'AUD Urban Development', imgs: ['WhatsApp Image 2025-11-22 at 2.53.17 PM (1).jpg', 'WhatsApp Image 2025-12-04 at 12.20.21 PM.jpg', 'WhatsApp Image 2025-12-15 at 1.37.34 PM.jpg', 'WhatsApp Image 2025-12-15 at 5.38.56 PM.jpg', 'WhatsApp Image 2025-12-15 at 5.38.58 PM (2).jpg', 'WhatsApp Image 2025-12-21 at 8.16.46 AM (1).jpg', 'WhatsApp Image 2025-12-21 at 8.16.46 AM.jpg', 'WhatsApp Image 2025-12-21 at 8.16.47 AM.jpg'] },
        'El Shenawy Real Estate': { folder: 'El Shenawy Real Estate', imgs: ['WhatsApp Image 2026-02-17 at 11.00.00 AM (1).jpg', 'WhatsApp Image 2026-02-17 at 11.00.00 AM (2).jpg', 'WhatsApp Image 2026-02-17 at 11.00.00 AM (3).jpg', 'WhatsApp Image 2026-02-17 at 11.00.00 AM.jpg', 'WhatsApp Image 2026-02-17 at 12.42.58 PM.jpg', 'WhatsApp Image 2026-02-17 at 12.43.13 PM.jpg', 'WhatsApp Image 2026-02-17 at 12.44.11 PM.jpg', 'WhatsApp Image 2026-02-17 at 12.44.48 PM.jpg'] },
        'HEC': { folder: 'HEC', imgs: ['WhatsApp Image 2026-03-10 at 11.36.39 AM (1).jpg', 'WhatsApp Image 2026-03-10 at 11.36.39 AM.jpg', 'WhatsApp Image 2026-03-10 at 11.36.39 AM_1.jpg', 'WhatsApp Image 2026-03-10 at 11.36.54 AM (1).jpg', 'WhatsApp Image 2026-03-10 at 11.36.54 AM (2).jpg', 'WhatsApp Image 2026-03-10 at 11.36.54 AM.jpg', 'WhatsApp Image 2026-03-10 at 11.36.54 AM_1.jpg'] }
    };

    function getClientThumb(name) {
        const entry = clientFolderMap[name];
        if (!entry) return null;
        // If no specific imgs listed, use first image pattern
        const imgs = entry.imgs.length ? entry.imgs : ['1.jpg','01.jpg','1 (1).jpg'];
        const randomItem = imgs[Math.floor(Math.random() * imgs.length)];
        
        let randomImg = randomItem;
        let itemFolder = entry.folder;
        if (typeof randomItem === 'object') {
            randomImg = randomItem.file;
            itemFolder = randomItem.folder || entry.folder;
        }
        
        const encodedFolder = encodeURIComponent(itemFolder);
        const encodedImg    = encodeURIComponent(randomImg).replace(/\.(png|jpeg)$/i, '.jpg');
        return `assets/featured-clients-compressed/${encodedFolder}/${encodedImg}`;
    }

    function build() {
        const names = translations[currentLang].clients_names;
        namesInner.innerHTML = '';
        cardsRow.innerHTML = '';

        names.forEach((name, i) => {
            const ni = document.createElement('span');
            ni.className = 'cn-name-item';
            ni.textContent = name;
            ni.addEventListener('click', () => { stopAutoCycle(); goTo(i); startAutoCycle(); });
            namesInner.appendChild(ni);

            const card = document.createElement('div');
            card.className = 'cn-card hidden';
            const thumb = getClientThumb(name);
            if (thumb) {
                card.innerHTML = `
                    <div class="cn-card-bg-img" style="background-image:url('${thumb}'); background-size:cover; background-position:center;"></div>
                    <div class="cn-card-overlay"></div>`;
            } else {
                card.innerHTML = `<div class="cn-card-bg-img" style="background:${clientColors[i % clientColors.length]}"></div><div class="cn-card-overlay"></div>`;
            }
            card.dataset.thumb = thumb || '';
            card.addEventListener('click', () => {
                if (!card.classList.contains('active')) {
                    stopAutoCycle(); goTo(i); startAutoCycle();
                }
            });
            cardsRow.appendChild(card);
        });

        render();
        setupDrag();
    }

    function render() {
        const names   = translations[currentLang].clients_names;
        const total   = names.length;
        const nameEls = namesInner.querySelectorAll('.cn-name-item');
        const cards   = cardsRow.querySelectorAll('.cn-card');

        // Update section background with active card's image
        const sectionBg = document.getElementById('clientsSectionBg');
        if (sectionBg && !isMobileFastView()) {
            const activeCard = Array.from(cards)[currentIndex];
            const thumb = activeCard ? activeCard.dataset.thumb : '';
            if (thumb) {
                sectionBg.style.opacity = '0';
                setTimeout(() => {
                    sectionBg.style.backgroundImage = `url('${thumb}')`;
                    sectionBg.style.opacity = '0.9';
                }, 200);
            }
        }

        // --- names ---
        nameEls.forEach((el, i) => {
            const d = i - currentIndex;
            el.classList.remove('active', 'side-1');
            if (d === 0)            el.classList.add('active');
            else if (Math.abs(d) === 1) el.classList.add('side-1');
        });

        // --- cards: position by offset from active ---
        const cardClasses = ['side-2-left','side-1-left','active','side-1-right','side-2-right','hidden'];
        cards.forEach((card, i) => {
            card.classList.remove('active','side-1-left','side-1-right','side-2-left','side-2-right','hidden');
            // compute shortest circular distance
            let d = i - currentIndex;
            if (d > total / 2)  d -= total;
            if (d < -total / 2) d += total;

            if      (d === 0)   card.classList.add('active');
            else if (d === 1)   card.classList.add('side-1-left');
            else if (d === -1)  card.classList.add('side-1-right');
            else if (d === 2)   card.classList.add('side-2-left');
            else if (d === -2)  card.classList.add('side-2-right');
            else                card.classList.add('hidden');
        });

        // --- center active name ---
        // font-size transition is 0.4s — recalculate after it settles
        function centerActiveName() {
            const activeEl = nameEls[currentIndex];
            if (!activeEl) return;
            const barRect  = namesBar.getBoundingClientRect();
            const nameRect = activeEl.getBoundingClientRect();
            // nameRect.left already includes current translateX, so:
            const barCenter = barRect.left + barRect.width / 2;
            const nameCenter = nameRect.left + nameRect.width / 2;
            const currentTx = getComputedTranslateX(namesInner);
            namesInner.style.transform = `translateX(${currentTx + (barCenter - nameCenter)}px)`;
        }

        // run immediately (for non-size-changing transitions) and after font-size settles
        requestAnimationFrame(centerActiveName);
        if (!isMobileFastView()) {
            setTimeout(centerActiveName, 420);
        }

        if (infoTitle) infoTitle.textContent = names[currentIndex];
        if (infoDesc) {
            infoDesc.innerHTML = `<span style="opacity:0.7">${translations[currentLang].partner_tag || 'شريك نجاح مميز'}</span>`;
        }
    }

    function goTo(index) {
        const total = translations[currentLang].clients_names.length;
        currentIndex = ((index % total) + total) % total;
        render();
    }

    /* ---- drag (mouse + touch) with momentum ---- */
    function setupDrag() {
        let isDown = false, startX = 0, startIndex = 0, moved = false;
        let startY = 0;
        let lastX = 0, lastTime = 0, velocityX = 0;
        let momentumAnimation = null;

        function onDown(x, y = 0) {
            isDown = true; moved = false;
            startX = x; startIndex = currentIndex;
            startY = y;
            lastX = x; lastTime = Date.now();
            velocityX = 0;
            
            // Cancel any ongoing momentum
            if (momentumAnimation) {
                cancelAnimationFrame(momentumAnimation);
                momentumAnimation = null;
            }
            
            stopAutoCycle();
        }
        
        function onUp(endX = lastX, endY = startY, isTouch = false) {
            if (!isDown) return;
            isDown = false;

            if (isTouch && isMobileFastView()) {
                const dx = endX - startX;
                const dy = endY - startY;
                const threshold = 45;

                if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy) * 1.2) {
                    goTo(startIndex + (dx > 0 ? 1 : -1));
                }
                startAutoCycle();
                return;
            }
            
            // Calculate velocity for momentum
            const now = Date.now();
            const timeDelta = now - lastTime;
            
            // If swipe was fast enough, apply momentum (lower threshold for easier activation)
            if (timeDelta < 150 && Math.abs(velocityX) > 0.3) {
                applyMomentum(velocityX);
            } else {
                startAutoCycle();
            }
        }
        
        function onMove(x, y = startY) {
            if (!isDown) return;
            const horizontalIntent = Math.abs(x - startX) > Math.abs(y - startY) * 1.15;
            if (isCoarsePointerView() && !isMobileFastView() && !horizontalIntent && Math.abs(y - startY) > 12) return;
            moved = true;
            
            // Calculate velocity
            const now = Date.now();
            const timeDelta = now - lastTime;
            if (timeDelta > 0) {
                velocityX = (x - lastX) / timeDelta;
            }
            lastX = x;
            lastTime = now;
            
            const dx = x - startX; // positive = dragging right = go to previous
            const total = translations[currentLang].clients_names.length;
            const dragStep = isCoarsePointerView() && !isMobileFastView() ? 58 : 80;
            const steps = Math.round(dx / dragStep); // drag right → prev (RTL)
            const ni = ((startIndex + steps) % total + total) % total;
            if (ni !== currentIndex) goTo(ni);
        }
        
        function applyMomentum(velocity) {
            const friction = 0.92; // Reduced friction for longer momentum
            const minVelocity = 0.02; // Lower threshold for smoother stop
            const velocityMultiplier = 1.5; // Amplify velocity for more dramatic effect
            const total = translations[currentLang].clients_names.length;
            
            // Amplify initial velocity
            velocity *= velocityMultiplier;
            
            function animate() {
                // Apply friction
                velocity *= friction;
                
                // Stop if velocity is too low
                if (Math.abs(velocity) < minVelocity) {
                    momentumAnimation = null;
                    startAutoCycle();
                    return;
                }
                
                // Calculate movement - smoother transitions
                const movement = velocity * 20; // Increased from 16 for faster scrolling
                const steps = Math.round(movement / 60); // Smaller step size for smoother animation
                
                if (steps !== 0) {
                    const newIndex = ((currentIndex + steps) % total + total) % total;
                    goTo(newIndex);
                }
                
                // Continue animation
                momentumAnimation = requestAnimationFrame(animate);
            }
            
            animate();
        }

        [namesBar, cardsRow].forEach(el => {
            el.addEventListener('mousedown',  e => onDown(e.clientX, e.clientY));
            el.addEventListener('touchstart', e => {
                const touch = e.touches[0];
                onDown(touch.clientX, touch.clientY);
            }, { passive: true });
            el.addEventListener('touchmove',  e => {
                if (isMobileFastView()) return;
                const touch = e.touches[0];
                if (Math.abs(touch.clientX - startX) > Math.abs(touch.clientY - startY) * 1.15) {
                    e.preventDefault();
                }
                onMove(touch.clientX, touch.clientY);
            }, { passive: false });
            el.addEventListener('touchend',   e => {
                const touch = e.changedTouches && e.changedTouches[0];
                onUp(touch ? touch.clientX : lastX, touch ? touch.clientY : startY, true);
            }, { passive: true });
        });

        window.addEventListener('mouseup',   onUp);
        window.addEventListener('mousemove', e => onMove(e.clientX));
    }

    /* ---- auto cycle ---- */
    function startAutoCycle() {
        if (autoCycleInterval) clearInterval(autoCycleInterval);
        autoCycleInterval = setInterval(() => {
            const total = translations[currentLang].clients_names.length;
            goTo((currentIndex + 1) % total);
        }, isMobileFastView() ? 4200 : 3500);
    }

    function stopAutoCycle() { clearInterval(autoCycleInterval); }

    window.addEventListener('resize', render);

    build();

    // wait for fonts then start — ensures centerActiveName measures correctly
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
        render();
        startAutoCycle();
    });

    // pause on mousedown (hold) only
    const section = document.getElementById('clients');
    if (section) {
        section.addEventListener('mousedown', stopAutoCycle);
        window.addEventListener('mouseup', () => {
            if (section.matches(':hover')) return;
            startAutoCycle();
        });
        // also resume if mouse leaves while holding
        section.addEventListener('mouseleave', startAutoCycle);
    }

    window.refreshPartners = () => { build(); goTo(0); };
}


/* ================================================================
   CUSTOM CURSOR
   ================================================================ */
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    const dot = cursor ? cursor.querySelector('.cursor-dot') : null;
    const ring = cursor ? cursor.querySelector('.cursor-ring') : null;

    if (!cursor || !dot || !ring || window.matchMedia("(pointer: coarse)").matches) {
        if (cursor) cursor.style.display = 'none';
        return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener('mousedown', () => {
        cursor.classList.add('is-clicking');
    });

    window.addEventListener('mouseup', () => {
        cursor.classList.remove('is-clicking');
    });

    const hoverElements = document.querySelectorAll('a, button, .client-item, .service-card, .slider-btn, .slider-dot, .partner-nav-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
    });

    const portfolioCards = document.querySelectorAll('.portfolio-item');
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', () => cursor.classList.add('is-hovering-card'));
        card.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering-card'));
    });

    // Showreel video hover
    const showreelVisual = document.getElementById('showreelVisual');
    if (showreelVisual) {
        showreelVisual.addEventListener('mouseenter', () => {
            cursor.classList.add('is-hovering-video');
            updateVideoCursor();
        });
        showreelVisual.addEventListener('mouseleave', () => {
            cursor.classList.remove('is-hovering-video');
        });
    }

    function updateVideoCursor() {
        const video = document.getElementById('showreelVideo');
        const isMuted = video && video.muted;
        
        if (!isMuted) {
            cursor.classList.add('video-unmuted');
        } else {
            cursor.classList.remove('video-unmuted');
        }
    }

    function animateCursor() {
        dotX += (mouseX - dotX) * 0.8;
        dotY += (mouseY - dotY) * 0.8;

        ringX += (mouseX - ringX) * 0.25;
        ringY += (mouseY - ringY) * 0.25;

        dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

        const more = document.getElementById('cursorMore');
        if (more) {
            const isHoveringCard = cursor.classList.contains('is-hovering-card');
            const isHoveringVideo = cursor.classList.contains('is-hovering-video');
            // translate follows mouse instantly (no delay), scale has CSS transition
            more.style.translate = `${mouseX}px ${mouseY}px`;
            more.style.scale = (isHoveringCard || isHoveringVideo) ? '1' : '0';
            
            // Update icon for video
            if (isHoveringVideo) {
                const video = document.getElementById('showreelVideo');
                const isMuted = video && video.muted;
                
                // Update cursor class for animation
                if (!isMuted) {
                    cursor.classList.add('video-unmuted');
                    more.classList.add('video-unmuted');
                } else {
                    cursor.classList.remove('video-unmuted');
                    more.classList.remove('video-unmuted');
                }
                
                // Only create SVG once
                if (!more.querySelector('svg')) {
                    more.innerHTML = `
                        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="currentColor"/>
                            <path class="sound-waves" d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/>
                            <line class="mute-line" x1="3" y1="3" x2="21" y2="21" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                        </svg>
                    `;
                }
            } else {
                const currentText = more.textContent;
                const newText = currentLang === 'ar' ? 'المزيد' : 'More';
                if (currentText !== newText || more.querySelector('svg')) {
                    more.textContent = newText;
                }
            }
        }

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
    
    // Store update function globally for video toggle
    window.updateVideoCursor = updateVideoCursor;
}

/* ================================================================
   SHOWREEL VIDEO MUTE TOGGLE
   ================================================================ */


/* ================================================================
   LOCALIZATION
   ================================================================ */
function initLocalization() {
    const langToggle = document.getElementById('langToggle');
    const langToggleMobile = document.getElementById('langToggleMobile');

    const toggleLang = () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        updateLanguage();
    };

    if (langToggle) langToggle.addEventListener('click', toggleLang);
    if (langToggleMobile) langToggleMobile.addEventListener('click', toggleLang);

    // Check pre-saved language
    const savedLang = localStorage.getItem('siteLang');
    if (savedLang && savedLang !== currentLang) {
        currentLang = savedLang;
        updateLanguage();
    }
}

function updateLanguage() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    // Toggle button text
    const langToggle = document.getElementById('langToggle');
    const langToggleMobile = document.getElementById('langToggleMobile');
    const btnText = currentLang === 'ar' ? 'EN' : 'AR';
    if (langToggle) langToggle.textContent = btnText;
    if (langToggleMobile) langToggleMobile.textContent = btnText;

    // Update all i18n elements
    const i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.setAttribute('placeholder', translations[currentLang][key]);
            } else {
                el.innerHTML = translations[currentLang][key];
            }
        }
    });

    // Update Title and Meta
    if (currentLang === 'en') {
        document.title = "New Graphic Co. | Advertising Excellence";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.content = "New Graphic Advertising Agency - Outdoor, Print, Digital Marketing, Giveaway, Exhibition Management. We make your name glow!";
    } else {
        document.title = "New Graphic Co. | شركة نيو جرافيك للدعاية والإعلان";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.content = "شركة نيو جرافيك للدعاية والإعلان - أوت دور مطبوعات ديجيتال ماركتنج جيف أواي تنظيم معارض. نخلي اسمك يلمع!";
    }

    // Save preference
    localStorage.setItem('siteLang', currentLang);

    // Re-init components that depend on text
    clientNames = translations[currentLang].clients_names;
    clientsData = translations[currentLang].clientsData;
    
    if (window.refreshPartners) window.refreshPartners();
    if (window.refreshClients) window.refreshClients();
    if (window.refreshIdentityTranslations) window.refreshIdentityTranslations();
    if (window.refreshAboutTypewriter) window.refreshAboutTypewriter();
}

function initClientsPage() {
    const clientsLink = document.getElementById('navClients');
    const clientsPage = document.getElementById('clientsPage');

    // Featured clients toggle - removed, always visible now

    // Featured clients gallery data (global)
    window.featuredClientImages = {
        'ADG Master Development Group': ['Coffee_Tea_Cup_open.jpg','Envelope  A4 3.jpg','envolp.jpg','Folder_Mockup (3).jpg','Free Premium Paper Cup Mockup.jpg','Free_Realistic_Folde.jpg','Free_Spiral_Notepad_Mockup.jpg','Free_Square_Coaster_Mockup_5.jpg','luxury_business_card_mockup (3).jpg','Mockup (3).jpg','Mug_Mockup_2 (2).jpg','Round_Coaster_Mockup.jpg'],
        'AL-MANARA': ['Gravity-Jewelry-Paper-Bag-Mockup 2.jpg','Gravity-Jewelry-Paper-Bag-Mockup.jpg','luxury_business_card_mockup (7).jpg','notepad-mockup (12).jpg','notepad-mockup 2 (4).jpg'],
        'ALAMER': ['Envelope  A4 2.jpg','envolp 2.jpg','luxury_business_card_mockup.jpg','Mockup 2.jpg','notepad-mockup.jpg'],
        'ALMAJD': ['1 (43).jpg','2 (31).jpg','luxury_business_card_mockup copy.jpg'],
        'AUD': ['1 (3).jpg','1 (4).jpg','2 (2).jpg','2 (3).jpg','3.jpg','Free_Shopping_Bag_Mockup_1.jpg','Free_Shopping_Bag_Mockup_2.jpg','Free_Spiral_Notepad_Mockup_4.jpg'],
        'CONCRETE DEVELOPMENTS': ['Flyer 2.jpg','luxury_business_card_mockup copy (2).jpg'],
        'Crave': ['1 (5).jpg','1 (6).jpg','2 (4).jpg','envolp A4 3.jpg','Notepad_Mockup_2 3.jpg','Notepad_Mockup_2.jpg'],
        'EASY WAY': ['02.jpg'],
        'Emarrak': ['1 (31).jpg','1 (32).jpg','1 (33).jpg','1 (34).jpg','1 (35).jpg','1 (36).jpg','1 (37).jpg','1 (38).jpg','2 (23).jpg','2 (24).jpg','2 (25).jpg','2 (26).jpg','2 (27).jpg','2 (28).jpg','3 (11).jpg','3 (12).jpg','3 (13).jpg','3 (14).jpg','3 (15).jpg','4 (6).jpg','4 (7).jpg','a321f61a-23b7-4164-b60b-9f0ddaeb49d6.jpeg','Envelope  A4 (8).jpg','Envelope  A4 2 (3).jpg','envolp (3).jpg','envolp A4.jpg','Free_Banner_Mockup_2 3.jpg','Free_Banner_Mockup_2 4.jpg','Free_Banner_Mockup_6.jpg','Free_Presentation_Mockup_5 (7).jpg','Free_Presentation_Mockup_5 (8).jpg','Free_Presentation_Mockup_5 2.jpg','Free_Presentation_Mockup_5 4.jpg','Free_Roll-up_Mockup_3 2.jpg','Free_Roll-up_Mockup_3 copy (2).jpg','Free_roll-up_mockup_85×200_02 3.jpg','Free_roll-up_mockup_85×200_02 copy.jpg','Free_roll-up_mockup_85×200_02.jpg','identity (2).jpg','Letter MOc.jpg','Mockup ظرف.jpg','Round_Coaster_Mockup (2).jpg'],
        'GEMOTEC DEVELOPMENTS': ['billboard 2 copy.jpg','Free_Street_Billboard_Mockup_3 copy.jpg'],
        'HAWA BAY NEW DAMIETTA': ['6.7_pen_mockup.jpg','Ballpoint_Pen_Mockup_2 copy.jpg','Free Roadside Banner Mockup PSD Template copy.jpg','Free_Roll-up_Mockup_1 copy.jpg','Free_Roll-up_Mockup_3 3.jpg','Free_Roll-up_Mockup_3 copy.jpg','Free_Shopping_Bag_Mockup_1 (2).jpg','Free_Shopping_Bag_Mockup_1 س.jpg','moc.jpg','Mockup (2).jpg','Mug_Mockup_2.jpg','Mug_Mockup_3.jpg'],
        'HAWAS': ['Folder_Mockup_2 2.jpg','Folder_Mockup_2 3.jpg','Folder_Mockup_2.jpg'],
        'MAKANAK DEVELOPMENT': ['1 (8).jpg','2 (7).jpg','Envelope  A4 (3).jpg','Free Business Card on Textured Wall Mockup copy (2).jpg','Free Luxury Envelope Mockup (3).jpg','Free_Presentation_Mockup_5 (2).jpg','Free_Realistic_Folded_Paper_Mockup (2).jpg','notepad-mockup (4).jpg','Rubber-Stamp-Mockup 2 (2).jpg'],
        'NMAA': ['01.jpg','02 (2).jpg','1 (14).jpg','2 (12).jpg','3 (6).jpg','4 (2).jpg','5 (2).jpg','Brochure_Mockup_4 copy.jpg'],
        'SOLD DEVELOPMENTS': ['02_Branding Identity Mock-up_8.png','1 (22).jpg','2 (19).jpg','3 (10).jpg','4 (5).jpg','5 (4).jpg','Construction_Banner_Mockup.jpg','Coster mocup.png','Envelope  A4 (6).jpg','Folder_Mockup (4).jpg','Free Drop Down Hanging Banner Mockup.jpg','Free Luxury Envelope Mockup 2 (3).jpg','Free Planner Mockup_01.png','Free Simple Stationery Branding Mockup.png','free stylish business card mockup.jpg','letter mockup.png','Letter...jpg','Plastic Credit Cards Free PSD Mockups_01.png','Plastic_Badge_Mockup_3.png'],
        'ZAWAYA DEVELOPMENTS': ['1 (30).jpg','Free Outdoor Vertical Building Billboard Mockup 6.jpg','Free_Billboard_Banner_Mockup.jpg','identity.jpg','Simple_Billboard_Mockup 1.jpg','Simple_Billboard_Mockup 2.jpg','Simple_Billboard_Mockup 3.jpg','Simple_Billboard_Mockup.jpg'],
        'أملاك العقارية': ['1 (42).jpg','Banner_Mockup_1.jpg','Free_Shopping_Bag_Mockup (2).jpg','Notebook Mockup 1.jpg','Notebook Mockup 2.jpg','notepad-mockup 3.jpg'],
        'المتحدة': ['1 (44).jpg'],
        'المشرق': ['Free Business Card on Textured Wall Mockup 4.jpg'],

        'شركة الدرة للتطورة': ['200-125 (2)...2.jpg','200-125 (3)... copy.jpg','200-125.jpg'],
        'شركة الهضبة': ['Construction_Fence_Mockup_3 2.jpg','Construction_Fence_Mockup_3.jpg'],
        'شركة البرلسي للتطوير العقاري': ['Envelope  A4 (2).jpg','Envelope  A4 Final-01.jpg','Folder_Mockup (2).jpg','Free Luxury Envelope Mockup (2).jpg','Free_Roll-up_Mockup_2.jpg','Free_Roll-up_Mockup_3.jpg','luxury_business_card_mockup (2).jpg','luxury_business_card_mockup (6).jpg','Mockup.jpg','notepad-mockup (3).jpg'],    };

    // Open gallery when clicking a featured client card - use event delegation
    // Client logos map - add logo filename for each client that has one
    const clientLogos = {
            'HEC': 'hec.png',
            'El Masria Elmasria Development': 'elmasria-development.jpg',
            'Emarrak':                          'emarrak-development.jpg',
            'SOLD DEVELOPMENTS':                'sold-developments.jpg',
            'HAWA BAY NEW DAMIETTA':            'hawa-bay-new-damietta.jpg',
            'ADG Master Development Group':     'mdg-master-development-group.jpg',
            'شركة البرلسي للتطوير العقاري':    'br-investment.jpg',
            'MAKANAK DEVELOPMENT':              'makanak-development.jpg',
            'NMAA':                             'nmaa.jpg',
            'ZAWAYA DEVELOPMENTS':              'zawaya-developments.jpg',
            'AUD':                              'aud-awadi-urban-development.jpg',
            'Crave':                            'crave.jpg',
            'VALENZA DEVELOPMENT':              'valenza-development.jpg',
            'QURTUBA DEVELOPMENTS':             'qurtuba-developments.jpg',
            'OPA':                              'opa-donuts-cafe.jpg',
            'KEWAN':                            'kewan-urban-development.jpg',
            'MSD':                              'msd-myanmar-diaspora-development.jpg',
            'ALHAMOOR DEVELOPMENTS':            'alhamoor-developments.jpg',
            'أملاك العقارية':                   'amlak-real-estate.jpg',
            'ALAMER':                           'alamer.jpg',
            'AL-MANARA':                        'al-manara-wood.jpg',
            'ZÜRICH DEVELOPMENTS':              'zurich.png',

            'SYSTEM':                           'system-ventilation-egypt.jpg',
            'M&K':                              'm-and-k-logistics-service.jpg',
            'SDG':                              'sdg.jpg',
            'German Saudi Investments':         'german-saudi-investments.jpg',
            'STAR WEALTH DEVELOPMENT':          'star-wealth-development.jpg',
            'PROMISE MALL':                     'promise-mall.jpg',
            'RAGO':                             'raco.jpg',
            'RIVARI':                           'rivari.jpg',
            'YADA EGYPT':                       'yada-egypt.jpg',
            'FUTURE SMART HOME':                'future-smart-system.jpg',
            'MAJESTIC GARMENTS Co':             'majestic-garments-co.jpg',
            'ALMAJD':                           'almajd.png',
            'CONCRETE DEVELOPMENTS':            'concrete.png',
            'EASY WAY':                         'easy-way.png',
            'GEMOTEC DEVELOPMENTS':             'gemotec.png',
            'HAWAS':                            'hawas.png',
            'المتحدة':                          'united-company.png',
            'المشرق':                           'mud.png',
            'شركة الهضبة':                      'hec.png',
            'شركة الدرة للتطورة':               '../الدره.png',
            'RAKAEZ':                           '../ركائز.png',
            'SAFETY FIRST COMPANY':             '../سيفتي.png',
        }

    // Apply logos to cards - sort: logo cards first, then text-only cards hidden
    const allCards = Array.from(document.querySelectorAll('.featured-client-card'));
    const grid = allCards[0]?.parentElement;

    const withLogo = [];
    const withoutLogo = [];

    allCards.forEach(card => {
        const clientName = card.dataset.client;
        const logo = clientLogos[clientName];
        if (logo) {
            card.classList.add('has-logo');
            const text = card.textContent.trim();
            card.innerHTML = `
                <img src="assets/client-logos/${logo}" alt="${text}" class="client-logo-img">
            `;
            withLogo.push(card);
        } else {
            // Text-only card - simpler style
            card.classList.add('text-only-card');
            withoutLogo.push(card);
        }
    });

    if (grid) {
        function getClientImageCount(name) {
            const legacyImgs = (window.featuredClientImages || {})[name];
            if (legacyImgs && legacyImgs.length > 0) return legacyImgs.length;
            const mapEntry = (window.clientFolderMap || {})[name];
            if (mapEntry && mapEntry.imgs) return mapEntry.imgs.length;
            return 0;
        }

        withLogo.sort((a, b) => {
            return getClientImageCount(b.dataset.client) - getClientImageCount(a.dataset.client);
        });

        // Clear and re-add logo cards first
        grid.innerHTML = '';
        withLogo.forEach(c => grid.appendChild(c));

        // Add "show more" button
        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'show-more-clients-btn';
        showMoreBtn.id = 'showMoreClientsBtn';

        // Hidden container for text-only cards
        const moreContainer = document.createElement('div');
        moreContainer.className = 'more-clients-grid';
        moreContainer.id = 'moreClientsGrid';
        moreContainer.style.display = 'none';
        withoutLogo.forEach(c => moreContainer.appendChild(c));

        grid.parentElement.appendChild(showMoreBtn);
        grid.parentElement.appendChild(moreContainer);

        showMoreBtn.addEventListener('click', () => {
            const isOpen = moreContainer.style.display !== 'none';

            if (isOpen) {
                // Close with animation
                moreContainer.classList.remove('opening');
                moreContainer.classList.add('closing');
                showMoreBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    moreContainer.style.display = 'none';
                    moreContainer.classList.remove('closing');
                    showMoreBtn.style.transform = '';
                    showMoreBtn.innerHTML = `اظهار المزيد (${withoutLogo.length} عميل) <span class="btn-arrow btn-arrow--down"></span>`;
                }, 250);
            } else {
                // Open with animation
                moreContainer.style.display = 'grid';
                void moreContainer.offsetHeight; // force reflow
                moreContainer.classList.remove('closing');
                moreContainer.classList.add('opening');
                showMoreBtn.style.transform = 'scale(0.95)';
                setTimeout(() => { showMoreBtn.style.transform = ''; }, 150);
                showMoreBtn.innerHTML = `اخفاء <span class="btn-arrow btn-arrow--up"></span>`;

                // Stagger cards - simple approach
                const cards = moreContainer.querySelectorAll('.text-only-card');
                cards.forEach((c, i) => {
                    c.style.opacity = '0';
                    c.style.transform = 'translateY(-15px)';
                    c.style.transition = `opacity 0.3s ease ${i * 0.04}s, transform 0.3s ease ${i * 0.04}s`;
                    setTimeout(() => {
                        c.style.opacity = '1';
                        c.style.transform = 'translateY(0)';
                    }, 20);
                });
            }
        });

        // Set initial button text
        showMoreBtn.innerHTML = `اظهار المزيد (${withoutLogo.length} عميل) <span class="btn-arrow btn-arrow--down"></span>`;
    }

    const clientsPageEl = document.getElementById('clientsPage');
    if (clientsPageEl) {
        clientsPageEl.addEventListener('click', (e) => {
            const card = e.target.closest('.featured-client-card');
            if (!card) return;
            if (card.classList.contains('has-logo')) return;

            const clientName = card.dataset.client;
            // featuredClientImages has full data for original clients
            const legacyImgs = (window.featuredClientImages || {})[clientName];
            if (legacyImgs && legacyImgs.length > 0) {
                const mapEntry = (window.clientFolderMap || {})[clientName];
                const folder = mapEntry ? mapEntry.folder : clientName;
                openFeaturedGallery(clientName, legacyImgs, folder);
                return;
            }
            // New clients - use clientFolderMap
            const mapEntry = (window.clientFolderMap || {})[clientName];
            if (mapEntry && mapEntry.imgs && mapEntry.imgs.length > 0) {
                openFeaturedGallery(clientName, mapEntry.imgs, mapEntry.folder, mapEntry.basePath);
                return;
            }
            openFeaturedGallery(clientName, [], clientName);
        });
    }
    const closeClients = document.getElementById('closeClients');
    const pageTransition = document.getElementById('pageTransition');
    const provinceGrid = document.getElementById('provinceGrid');
    const clientsView = document.getElementById('clientsView');
    const clientListGrid = document.getElementById('clientListGrid');
    const backToProvinces = document.getElementById('backToProvinces');
    const selectedProvinceName = document.getElementById('selectedProvinceName');

    if (!clientsLink || !clientsPage) return;

    // Handle Page Transition
    const triggerTransition = (callback) => {
        if (isMobileFastView()) {
            if (callback) callback();
            return;
        }
        pageTransition.classList.add('active');
        setTimeout(() => {
            if (callback) callback();
        }, 700); // Middle of transition
        setTimeout(() => {
            pageTransition.classList.remove('active');
        }, 1400);
    };

    // Handle internal routing
    function handleRouting() {
        const hash = window.location.hash;
        if (hash === '#clients') {
            if (!clientsPage.classList.contains('active')) {
                openClients();
            } else {
                resetClientsView();
            }
        } else if (hash.startsWith('#clients-') && hash !== '#clients-section') {
            const province = decodeURIComponent(hash.replace('#clients-', ''));
            if (!clientsPage.classList.contains('active')) {
                triggerTransition(() => {
                    clientsPage.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    showClients(province);
                });
            } else {
                showClients(province);
            }
        } else if (!hash || hash === '#') {
            if (clientsPage.classList.contains('active')) {
                closePage(true); // true means don't clear hash again
            }
        }
    }

    const closePage = (skipHash) => {
        if (clientsPage.classList.contains('active')) {
            // Check if skipHash is a boolean true, not an Event object
            const shouldClearHash = skipHash !== true;
            if (shouldClearHash) window.location.hash = '';

            triggerTransition(() => {
                clientsPage.classList.remove('active');
                document.body.style.overflow = '';
                resetClientsView();
            });
        }
    };

    clientsLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = "clients";
    });

    if (closeClients) {
        closeClients.addEventListener('click', () => closePage(false));
    }

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && clientsPage.classList.contains('active')) {
            closePage(false);
        }
    });

    window.addEventListener('hashchange', handleRouting);

    function openClients() {
        triggerTransition(() => {
            clientsPage.classList.add('active');
            document.body.style.overflow = 'hidden';
            renderProvinces();
        });
    }

    // Initial check
    setTimeout(handleRouting, 2600);

    // Close on other nav links — the smooth scroll handler manages the transition,
    // so we just silently remove the active class without a duplicate transition.
    const otherLinks = document.querySelectorAll('.nav-link:not(#navClients):not(#navSocial):not(#navIdentity), .mobile-nav-link:not([href="#clients"]):not([href="#social-page"]):not([href="#identityPage"]), .footer-links a');
    otherLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Let initSmoothScroll handle the transition; just clear state silently
            if (clientsPage.classList.contains('active')) {
                clientsPage.classList.remove('active');
                document.body.style.overflow = '';
                resetClientsView();
                window.history.replaceState(null, '', window.location.pathname);
            }
        });
    });


    // Social Hash Routing
    function handleSocialHash() {
        // Social routing lives inside initSocialPage where its state and helpers exist.
    }
    window.addEventListener('hashchange', handleSocialHash);
    setTimeout(handleSocialHash, 2900);

    // Mobile clients link - open clients page
    const mobileClientsLink = document.getElementById('mobileNavClients') || document.querySelector('.mobile-nav-link[href="#clients"], .mobile-nav-link[href="#clientsPage"]');
    if (mobileClientsLink) {
        mobileClientsLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Close mobile menu
            const toggle = document.getElementById('menuToggle');
            const mobileMenu = document.getElementById('mobileMenu');
            if (toggle) toggle.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            // Open clients page through the URL hash so browser Back can close it.
            setTimeout(() => {
                window.location.hash = "clients";
            }, 300);
        });
    }

    // Close on logo click
    const logos = document.querySelectorAll('.logo');
    logos.forEach(logo => {
        logo.addEventListener('click', (e) => {
            const socialPage = document.getElementById('socialPage');
            
            if (clientsPage.classList.contains('active')) {
                closePage(false);
            } else if (socialPage && socialPage.classList.contains('active')) {
                // Close social page and go to home
                e.preventDefault();
                const pageTransition = document.getElementById('pageTransition');
                if (pageTransition) {
                    pageTransition.classList.add('active');
                    setTimeout(() => {
                        socialPage.classList.remove('active');
                        document.body.style.overflow = '';
                        window.location.hash = '';
                        setTimeout(() => {
                            pageTransition.classList.remove('active');
                            // Scroll to home section
                            const heroSection = document.getElementById('hero');
                            if (heroSection) {
                                heroSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }, 600);
                    }, 600);
                }
            }
        });
    });

    function renderProvinces() {
        provinceGrid.innerHTML = '';
        provinceGrid.style.display = 'flex';
        clientsView.classList.remove('active');

        Object.keys(clientsData).forEach(provinceKey => {
            const provinceName = translations[currentLang].provinces[provinceKey] || provinceKey;
            const count = clientsData[provinceKey].length;

            const card = document.createElement('div');
            card.className = 'liquid-card animate-fade-in';
            card.innerHTML = `
                <h3 class="province-name">${provinceName}</h3>
                <span class="province-count">${count} ${currentLang === 'ar' ? 'عميل' : 'Clients'}</span>
            `;

            card.addEventListener('click', () => {
                window.location.hash = 'clients-' + provinceKey;
            });

            // Global cursor halo
            const cursor = document.getElementById('customCursor');
            if (cursor) {
                card.addEventListener('mouseenter', () => cursor.classList.add('is-hovering-liquid'));
                card.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering-liquid'));
            }

            provinceGrid.appendChild(card);
        });
    }

    function showClients(provinceKey) {
        const provinceName = translations[currentLang].provinces[provinceKey] || provinceKey;
        selectedProvinceName.textContent = provinceName;

        clientListGrid.innerHTML = '';
        clientsData[provinceKey].forEach((clientName, index) => {
            const card = document.createElement('div');
            // Add staggered delay class (up to 10 items for better perf, then reset)
            const staggerIdx = (index % 10) + 1;
            card.className = `client-item-card stagger-${staggerIdx}`;
            card.innerHTML = `
                <span class="client-item-name">${clientName}</span>
                <span class="client-item-arrow">←</span>
            `;

            card.addEventListener('click', () => {
                const isAr = currentLang === 'ar';
                alert(isAr ? `جاري تحميل أعمال ${clientName}...` : `Loading works for ${clientName}...`);
            });

            // Global cursor halo
            const cursor = document.getElementById('customCursor');
            if (cursor) {
                card.addEventListener('mouseenter', () => cursor.classList.add('is-hovering-liquid'));
                card.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering-liquid'));
            }

            clientListGrid.appendChild(card);

            // Trigger animation in next frame
            requestAnimationFrame(() => {
                setTimeout(() => {
                    card.classList.add('active');
                }, 50);
            });
        });

        provinceGrid.style.display = 'none';
        clientsView.classList.add('active');
    }

    function resetClientsView() {
        clientsView.classList.remove('active');
        provinceGrid.style.display = 'flex';
    }

    backToProvinces.addEventListener('click', () => {
        window.HashTracker.goBack("clients");
    });

    window.refreshClients = renderProvinces;
}



// Profile Modal Logic
function initProfileModal() {
    const openBtn = document.getElementById('openProfileBtn');
    const closeBtn = document.getElementById('closeProfileModal');
    const modal = document.getElementById('profileModal');
    const overlay = document.getElementById('modalOverlay');

    if (!openBtn || !modal) return;

    const toggleModal = (show) => {
        if (show) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    openBtn.addEventListener('click', () => toggleModal(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleModal(false));
    if (overlay) overlay.addEventListener('click', () => toggleModal(false));

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            toggleModal(false);
        }
    });
}

/* ================================================================
   FOOTER MARQUEE — JS-driven infinite scroll
   ================================================================ */
function initFooterMarquee() {
    const track = document.querySelector('.footer-marquee-inner');
    if (!track) return;

    // duplicate content 6 times upfront — no measurement needed
    const original = track.innerHTML;
    for (let i = 0; i < 5; i++) track.innerHTML += original;

    let pos = 0;
    const speed = 0.8;
    let paused = false;
    let singleW = 0;

    // measure after browser has laid out
    function measure() {
        // scrollWidth of the full track divided by number of copies = one set
        singleW = track.scrollWidth / 6;
    }

    function animate() {
        if (!paused && singleW > 0) {
            pos -= speed;
            if (pos <= -singleW) pos += singleW;
            track.style.transform = `translateX(${pos}px)`;
        }
        requestAnimationFrame(animate);
    }

    // use IntersectionObserver to measure once the marquee is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && singleW === 0) {
                measure();
            }
        });
    }, { threshold: 0 });

    const marquee = document.querySelector('.footer-marquee');
    if (marquee) {
        observer.observe(marquee);
        marquee.addEventListener('mouseenter', () => { paused = true; });
        marquee.addEventListener('mouseleave', () => { paused = false; });
    }

    // also try measuring after a short delay as fallback
    setTimeout(measure, 500);

    window.addEventListener('resize', measure);
    requestAnimationFrame(animate);
}

/* ================================================================
   FEATURED CLIENT GALLERY
   ================================================================ */

// For new clients - dynamically discover images from compressed folder
async function openFeaturedGalleryByFolder(clientName, folderName) {
    // Build image list by trying sequential filenames from compressed folder
    const encodedFolder = encodeURIComponent(folderName);
    const base = `assets/featured-clients-compressed/${encodedFolder}/`;
    
    // Get all files from the original folder
    const srcFolder = `assets/featured-clients/${encodedFolder}/`;
    
    // Use the clientFolderMap if available, otherwise try to load from compressed
    const entry = Object.values(window._clientFolderMap || {}).find(e => e.folder === folderName);
    
    // Fallback: just open with empty and show message
    openFeaturedGallery(clientName, []);
}

// Store reference for use above
window._clientFolderMap = {};

function setupLightboxPinchZoom(lb) {
    if (!lb || lb.dataset.pinchZoomReady) return;
    lb.dataset.pinchZoomReady = '1';

    const state = {
        scale: 1,
        translateX: 0,
        translateY: 0,
        startScale: 1,
        startTranslateX: 0,
        startTranslateY: 0,
        startDistance: 0,
        startCenterX: 0,
        startCenterY: 0,
        panStartX: 0,
        panStartY: 0,
        pinching: false,
        panning: false,
        blockSwipeUntil: 0
    };

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const getZoomImage = () => lb.querySelector('.gallery-lightbox-img');
    const isControlTarget = (target) => !!(target && target.closest && target.closest('.gallery-lightbox-close, .gallery-lightbox-arrow'));

    function getDistance(touches) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.hypot(dx, dy);
    }

    function getCenter(touches) {
        return {
            x: (touches[0].clientX + touches[1].clientX) / 2,
            y: (touches[0].clientY + touches[1].clientY) / 2
        };
    }

    function clampTranslation() {
        if (state.scale <= 1.01) {
            state.translateX = 0;
            state.translateY = 0;
            return;
        }

        const maxX = (window.innerWidth * (state.scale - 1) * 0.5) + 90;
        const maxY = (window.innerHeight * (state.scale - 1) * 0.5) + 90;
        state.translateX = clamp(state.translateX, -maxX, maxX);
        state.translateY = clamp(state.translateY, -maxY, maxY);
    }

    function applyZoom(withTransition = false) {
        const img = getZoomImage();
        if (!img) return;
        clampTranslation();
        img.style.transformOrigin = 'center center';
        img.style.transition = withTransition ? 'transform 0.18s ease' : 'none';
        img.style.transform = `translate3d(${state.translateX}px, ${state.translateY}px, 0) scale(${state.scale})`;
        lb.classList.toggle('is-zoomed', state.scale > 1.01);
    }

    lb._resetPinchZoom = (applyToMedia = false) => {
        state.scale = 1;
        state.translateX = 0;
        state.translateY = 0;
        state.pinching = false;
        state.panning = false;
        state.blockSwipeUntil = Date.now() + 120;
        lb.classList.remove('is-zoomed', 'is-pinching');
        if (applyToMedia) applyZoom(true);
    };

    lb._isPinchZooming = () => (
        state.pinching ||
        state.panning ||
        state.scale > 1.01 ||
        Date.now() < state.blockSwipeUntil
    );

    lb.addEventListener('touchstart', (e) => {
        if (isControlTarget(e.target)) return;
        const img = getZoomImage();
        if (!img) return;

        if (e.touches && e.touches.length >= 2) {
            e.preventDefault();
            const center = getCenter(e.touches);
            state.pinching = true;
            state.panning = false;
            state.startDistance = getDistance(e.touches) || 1;
            state.startScale = state.scale;
            state.startTranslateX = state.translateX;
            state.startTranslateY = state.translateY;
            state.startCenterX = center.x;
            state.startCenterY = center.y;
            state.blockSwipeUntil = Date.now() + 500;
            lb.classList.add('is-pinching');
            img.style.transition = 'none';
            return;
        }

        if (e.touches && e.touches.length === 1 && state.scale > 1.01) {
            e.preventDefault();
            const touch = e.touches[0];
            state.panning = true;
            state.panStartX = touch.clientX;
            state.panStartY = touch.clientY;
            state.startTranslateX = state.translateX;
            state.startTranslateY = state.translateY;
            state.blockSwipeUntil = Date.now() + 350;
            lb.classList.add('is-pinching');
        }
    }, { passive: false });

    lb.addEventListener('touchmove', (e) => {
        const img = getZoomImage();
        if (!img) return;

        if (state.pinching && e.touches && e.touches.length >= 2) {
            e.preventDefault();
            const center = getCenter(e.touches);
            const nextScale = clamp(state.startScale * (getDistance(e.touches) / state.startDistance), 1, 4);
            const focalX = (state.startCenterX - (window.innerWidth / 2) - state.startTranslateX) / state.startScale;
            const focalY = (state.startCenterY - (window.innerHeight / 2) - state.startTranslateY) / state.startScale;

            state.scale = nextScale;
            state.translateX = center.x - (window.innerWidth / 2) - (focalX * nextScale);
            state.translateY = center.y - (window.innerHeight / 2) - (focalY * nextScale);
            state.blockSwipeUntil = Date.now() + 500;
            applyZoom(false);
            return;
        }

        if (state.panning && e.touches && e.touches.length === 1 && state.scale > 1.01) {
            e.preventDefault();
            const touch = e.touches[0];
            state.translateX = state.startTranslateX + (touch.clientX - state.panStartX);
            state.translateY = state.startTranslateY + (touch.clientY - state.panStartY);
            state.blockSwipeUntil = Date.now() + 350;
            applyZoom(false);
        }
    }, { passive: false });

    lb.addEventListener('touchend', (e) => {
        if (state.pinching && (!e.touches || e.touches.length < 2)) {
            state.pinching = false;
            lb.classList.remove('is-pinching');
            state.blockSwipeUntil = Date.now() + 500;
            if (state.scale <= 1.03) {
                state.scale = 1;
                state.translateX = 0;
                state.translateY = 0;
            }
            applyZoom(true);
        }

        if (state.panning && (!e.touches || e.touches.length === 0)) {
            state.panning = false;
            lb.classList.remove('is-pinching');
            state.blockSwipeUntil = Date.now() + 300;
            applyZoom(true);
        }
    }, { passive: true });

    lb.addEventListener('touchcancel', () => {
        state.pinching = false;
        state.panning = false;
        state.blockSwipeUntil = Date.now() + 300;
        lb.classList.remove('is-pinching');
        applyZoom(true);
    }, { passive: true });
}

function openFeaturedGallery(clientName, images, folderName, basePath) {
    folderName = folderName || clientName;
    // Display name overrides (data-client key → display name)
    const clientDisplayNames = {
        'BNI':              'Bani',
        'erabully':         'Etab',
        'M2':               'MQ',
        'eljyoostore':      'Elfyoo store',
        'ASB':              'ابراج الغد',
        'Saykna':           'Saykin',
    };

    basePath   = basePath   || 'assets/featured-clients-compressed';
    const overlay = document.getElementById('featuredGalleryOverlay');
    const title = document.getElementById('featuredGalleryTitle');
    const grid = document.getElementById('featuredGalleryGrid');
    if (!overlay || !grid) return;

    title.textContent = clientDisplayNames[clientName] || clientName;
    grid.innerHTML = '';

    if (!images || images.length === 0) {
        grid.innerHTML = '<p style="color:#888;text-align:center;padding:40px">لا توجد صور</p>';
        overlay.classList.add('open');
        return;
    }

    if (window._galleryObserver) window._galleryObserver.disconnect();

    images.forEach(item => {
        let file = item;
        let itemFolder = folderName;
        if (typeof item === 'object') {
            file = item.file;
            itemFolder = item.folder || folderName;
        }

        const encodedClient = encodeURIComponent(itemFolder);
        const baseFile = encodeURIComponent(file).replace(/\.(png|jpeg)$/i, '.jpg');

        const thumbSrc = `assets/featured-clients-thumbs/${encodedClient}/${baseFile}`;
        const fullSrc  = `${basePath}/${encodedClient}/${baseFile}`;

        const wrapper = document.createElement('div');
        wrapper.className = 'featured-gallery-item';
        wrapper.dataset.thumb = thumbSrc;
        wrapper.dataset.full  = fullSrc;
        wrapper.innerHTML = `<div class="gallery-skeleton"></div>`;
        grid.appendChild(wrapper);
    });

    overlay.classList.add('open');
    overlay.scrollTop = 0;

    // Load thumbnails lazily as they scroll into view
    window._galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const wrapper = entry.target;
            if (wrapper.dataset.loaded) return;
            wrapper.dataset.loaded = '1';

            const thumbSrc = wrapper.dataset.thumb;
            const fullSrc  = wrapper.dataset.full;

            const img = document.createElement('img');
            img.alt = '';
            img.className = 'featured-gallery-img';
            img.decoding = 'async';

            img.onload = () => { wrapper.innerHTML = ''; wrapper.appendChild(img); };
            img.onerror = () => { wrapper.innerHTML = '<div class="gallery-img-error">⚠</div>'; };

            // Click → open lightbox with navigation arrows
            img.addEventListener('click', () => {
                // Get origin rect for scale animation
                const originRect = wrapper.getBoundingClientRect();

                // Get all full-size srcs in current gallery
                const allItems = Array.from(grid.querySelectorAll('.featured-gallery-item'));
                // Filter out items without data (not yet observed/loaded)
                const allFullSrcs = allItems.map(w => w.dataset.full).filter(Boolean);
                const allThumbSrcs = allItems.map(w => w.dataset.thumb).filter(Boolean);
                // Recalculate index based on filtered list
                let currentIdx = allItems.filter(w => w.dataset.full).indexOf(wrapper);
                if (currentIdx < 0) currentIdx = 0;
                let isAnimating = false;
                let navQueue = []; // queue of directions

                function processQueue() {
                    if (navQueue.length === 0 || isAnimating) return;
                    const dir = navQueue.shift();
                    const nextIdx = currentIdx + dir;
                    if (nextIdx >= 0 && nextIdx < allFullSrcs.length) {
                        currentIdx = nextIdx;
                        openLightbox(currentIdx, dir);
                    } else {
                        processQueue(); // skip invalid and try next
                    }
                }

                // Preload cache
                const preloadCache = {};
                function preload(idx) {
                    if (idx < 0 || idx >= allFullSrcs.length) return;
                    if (!allFullSrcs[idx]) return;
                    if (preloadCache[idx]) return;
                    const img = new Image();
                    img.src = allFullSrcs[idx];
                    preloadCache[idx] = img;
                }

                function openLightbox(idx, direction = 0) {
                    const existing = document.querySelector('.gallery-lightbox');

                    if (existing && direction !== 0) {
                        if (isAnimating) {
                            navQueue.push(direction);
                            return;
                        }
                        isAnimating = true;

                        const oldImg = existing.querySelector('.gallery-lightbox-img');
                        const toX    = direction > 0 ? '100%' : '-100%';
                        const fromX  = direction > 0 ? '-100%' :  '100%';

                        // Show thumbnail first as placeholder (instant)
                        const thumbSrcNew = allThumbSrcs[idx];

                        const newImg = document.createElement('img');
                        newImg.className = 'gallery-lightbox-img';
                        if (typeof existing._resetPinchZoom === 'function') existing._resetPinchZoom(false);
                        // Use cached if ready, else load compressed directly
                        const cached = preloadCache[idx];
                        newImg.src = (cached && cached.complete) ? allFullSrcs[idx] : allFullSrcs[idx];
                        newImg.style.cssText = `position:absolute; transform:translateX(${fromX}); opacity:0; transition:none;`;
                        existing.appendChild(newImg);

                        // Force reflow then animate
                        newImg.getBoundingClientRect();
                        oldImg.style.transition = 'transform 0.15s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.15s ease';
                        oldImg.style.transform  = `translateX(${toX})`;
                        oldImg.style.opacity    = '0';
                        newImg.style.transition = 'transform 0.15s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.15s ease';
                        newImg.style.transform  = 'translateX(0)';
                        newImg.style.opacity    = '1';

                        setTimeout(() => {
                            oldImg.remove();
                            newImg.style.position   = '';
                            newImg.style.transition = '';
                            newImg.style.transform  = '';
                            if (typeof existing._resetPinchZoom === 'function') existing._resetPinchZoom(false);
                            existing.querySelector('.gallery-lightbox-arrow--prev').disabled = idx === 0;
                            existing.querySelector('.gallery-lightbox-arrow--next').disabled = idx === allFullSrcs.length - 1;
                            isAnimating = false;
                            preload(idx - 1);
                            preload(idx + 1);
                            // Process next queued navigation
                            processQueue();
                        }, 160);
                        return;
                    }

                    // First open - load compressed directly (no thumbnail step)
                    const lb = document.createElement('div');
                    lb.className = 'gallery-lightbox';

                    const bg = document.createElement('div');
                    bg.className = 'gallery-lightbox-bg';
                    bg.style.opacity = '0';
                    bg.style.transition = 'opacity 0.25s ease';

                    const lbImg = document.createElement('img');
                    lbImg.className = 'gallery-lightbox-img';
                    lbImg.decoding  = 'async';
                    lbImg.src = allFullSrcs[idx];

                    // Scale-up from origin position
                    const vw = window.innerWidth;
                    const vh = window.innerHeight;
                    const scaleX = originRect.width  / vw;
                    const scaleY = originRect.height / vh;
                    const tx = originRect.left + originRect.width  / 2 - vw / 2;
                    const ty = originRect.top  + originRect.height / 2 - vh / 2;

                    lbImg.style.transform  = `translate(${tx}px, ${ty}px) scale(${scaleX}, ${scaleY})`;
                    lbImg.style.opacity    = '0';
                    lbImg.style.transition = 'none';

                    const cls = document.createElement('button');
                    cls.className   = 'gallery-lightbox-close';
                    cls.textContent = '✕';
                    cls.style.opacity = '0';

                    const prevBtn = document.createElement('button');
                    prevBtn.className = 'gallery-lightbox-arrow gallery-lightbox-arrow--prev';
                    prevBtn.disabled  = idx === 0;
                    prevBtn.style.opacity = '0';

                    const nextBtn = document.createElement('button');
                    nextBtn.className = 'gallery-lightbox-arrow gallery-lightbox-arrow--next';
                    nextBtn.disabled  = idx === allFullSrcs.length - 1;
                    nextBtn.style.opacity = '0';

                    lb.appendChild(bg);
                    lb.appendChild(lbImg);
                    lb.appendChild(cls);
                    lb.appendChild(prevBtn);
                    lb.appendChild(nextBtn);

                    document.body.appendChild(lb);
                    setupLightboxPinchZoom(lb);

                    // Trigger scale-up animation
                    requestAnimationFrame(() => requestAnimationFrame(() => {
                        bg.style.opacity   = '1';
                        cls.style.opacity  = '1';
                        cls.style.transition  = 'opacity 0.15s ease 0.05s';
                        prevBtn.style.opacity = '1';
                        prevBtn.style.transition = 'opacity 0.15s ease 0.05s';
                        nextBtn.style.opacity = '1';
                        nextBtn.style.transition = 'opacity 0.15s ease 0.05s';
                        lbImg.style.transition = 'transform 0.18s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.15s ease';
                        lbImg.style.transform  = 'translate(0, 0) scale(1)';
                        lbImg.style.opacity    = '1';
                    }));
                    function closeLightbox() {
                        if (typeof lb._resetPinchZoom === 'function') lb._resetPinchZoom(false);
                        // Scale-down back to origin
                        const vw = window.innerWidth;
                        const vh = window.innerHeight;
                        const tx = originRect.left + originRect.width  / 2 - vw / 2;
                        const ty = originRect.top  + originRect.height / 2 - vh / 2;
                        const scaleX = originRect.width  / vw;
                        const scaleY = originRect.height / vh;

                        bg.style.opacity   = '0';
                        cls.style.opacity  = '0';
                        prevBtn.style.opacity = '0';
                        nextBtn.style.opacity = '0';
                        const curImg = lb.querySelector('.gallery-lightbox-img');
                        if (curImg) {
                            curImg.style.transition = 'transform 0.18s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.15s ease';
                            curImg.style.transform  = `translate(${tx}px, ${ty}px) scale(${scaleX}, ${scaleY})`;
                            curImg.style.opacity    = '0';
                        }
                        setTimeout(() => lb.remove(), 200);
                    }

                    bg.addEventListener('click',  () => closeLightbox());
                    cls.addEventListener('click', () => closeLightbox());
                    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); navQueue.push(-1); processQueue(); });
                    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); navQueue.push(1);  processQueue(); });

                    let touchStartX = 0;
                    let touchEndX = 0;
                    let touchStartedAsZoom = false;
                    lb.addEventListener('touchstart', e => {
                        touchStartedAsZoom = (e.touches && e.touches.length > 1) || (typeof lb._isPinchZooming === 'function' && lb._isPinchZooming());
                        if (touchStartedAsZoom || !e.changedTouches || !e.changedTouches[0]) return;
                        touchStartX = e.changedTouches[0].screenX;
                    }, {passive: true});
                    lb.addEventListener('touchend', e => {
                        if (touchStartedAsZoom || (typeof lb._isPinchZooming === 'function' && lb._isPinchZooming())) {
                            touchStartedAsZoom = false;
                            return;
                        }
                        if (!e.changedTouches || !e.changedTouches[0]) return;
                        touchEndX = e.changedTouches[0].screenX;
                        const threshold = 50;
                        if (touchEndX > touchStartX + threshold && !nextBtn.disabled) { navQueue.push(1); processQueue(); }
                        if (touchEndX < touchStartX - threshold && !prevBtn.disabled) { navQueue.push(-1); processQueue(); }
                    }, {passive: true});

                    lb._keyHandler = (e) => {
                        if (e.key === 'ArrowLeft'  && currentIdx < allFullSrcs.length - 1) { navQueue.push(1);  processQueue(); }
                        if (e.key === 'ArrowRight' && currentIdx > 0)                       { navQueue.push(-1); processQueue(); }
                        if (e.key === 'Escape') closeLightbox();
                    };
                    document.addEventListener('keydown', lb._keyHandler);

                    // Preload neighbors
                    preload(idx - 1);
                    preload(idx + 1);
                }

                // Also preload the first image's neighbors right away
                preload(currentIdx - 1);
                preload(currentIdx + 1);

                openLightbox(currentIdx);
            });

            img.src = thumbSrc; // load thumbnail only
            window._galleryObserver.unobserve(wrapper);
        });
    }, { root: overlay, rootMargin: '300px', threshold: 0 });

    grid.querySelectorAll('.featured-gallery-item').forEach(item => {
        window._galleryObserver.observe(item);
    });
}


    // ==========================================
    // Custom Navigation History Tracker
    // ==========================================
    window.HashTracker = {
        stack: [],
        init: function() {
            this.stack.push(window.location.hash);
            window.addEventListener('hashchange', () => {
                this.stack.push(window.location.hash);
            });
        },
        goBack: function(fallbackHash) {
            if (this.stack.length > 1) {
                history.back();
            } else {
                window.location.hash = fallbackHash;
            }
        }
    };
    window.HashTracker.init();

    const closeBtn = document.getElementById('featuredGalleryClose');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const overlay = document.getElementById('featuredGalleryOverlay');
            overlay.classList.remove('open');
            // Disconnect observer when closing
            if (window._galleryObserver) {
                window._galleryObserver.disconnect();
            }
        });
    }


/* ================================================================
   SOCIAL PAGE
   ================================================================ */
function initSocialPage() {
    const socialPage = document.getElementById('socialPage');
    const closeBtn = document.getElementById('closeSocialPage');
    const socialGrid = document.getElementById('socialGrid');
    const pageTransition = document.getElementById('pageTransition');
    const backToSocial = document.getElementById('backToSocial');
    const socialDetailView = document.getElementById('socialDetailView');
    const socialGalleryGrid = document.getElementById('socialGalleryGrid');
    const socialCategoryName = document.getElementById('socialCategoryName');

    if (!socialPage) return;

    // Current category and view level states
    let currentCategoryKey = null;
    let currentViewLevel = 'categories'; // 'categories', 'subcategories', 'gallery'
    let currentSubcategoryName = null;
    let pendingDirectSubdirKey = null;
    let galleryScrollLoader = null;

    const isTouchPortfolioView = isMobileFastView;

    function clearGalleryScrollLoader() {
        if (galleryScrollLoader) {
            socialPage.removeEventListener('scroll', galleryScrollLoader);
            galleryScrollLoader = null;
        }
    }

    // Load data from window.PORTFOLIO_DATA
    const portfolioData = window.PORTFOLIO_DATA || {};

    // 1. Initialize Home Page Slideshows
    initHomeSlideshows();

    // 1b. Set dynamic cover backgrounds for main choice cards
    // setMainChoiceCardBackgrounds();

    function setMainChoiceCardBackgrounds() {
        if (!socialGrid) return;
        const categoriesList = ['prints', 'giveaway', 'uniforms', 'trophies', 'outdoors'];
        categoriesList.forEach(catKey => {
            const cardBg = socialGrid.querySelector(`[data-social-category="${catKey}"] .choice-card-bg`);
            if (!cardBg) return;

            const catData = portfolioData[catKey];
            if (!catData) return;

            // Gather all image paths
            let imagePaths = [];
            if (catData.has_subdirs) {
                Object.values(catData.subdirs).forEach(subdirFiles => {
                    const imagesOnly = subdirFiles.filter(f => !f.toLowerCase().endsWith('.mp4') && !f.toLowerCase().endsWith('.mp4'));
                    imagePaths.push(...imagesOnly);
                });
            } else {
                const imagesOnly = catData.files.filter(f => !f.toLowerCase().endsWith('.mp4') && !f.toLowerCase().endsWith('.mp4'));
                imagePaths = imagesOnly;
            }

             if (imagePaths.length > 0) {
                // Use a random image from the category files to keep the main menu fresh
                const randomIdx = Math.floor(Math.random() * imagePaths.length);
                const coverImage = imagePaths[randomIdx];
                const thumbCover = isMobileFastView() ? coverImage : (coverImage.startsWith('assets/portfolio/') ? coverImage.replace('assets/portfolio/', 'assets/portfolio-thumbs/') : coverImage);
                const safeCoverImage = encodeURI(thumbCover).replace(/\(/g, '%28').replace(/\)/g, '%29');
                cardBg.style.backgroundImage = `url('${safeCoverImage}')`;
            }
        });
    }

    function initHomeSlideshows() {
        const categories = ['prints', 'giveaway', 'uniforms', 'trophies', 'outdoors'];
        categories.forEach((catKey, index) => {
            const container = document.getElementById(`slideshow-${catKey}`);
            if (!container) return;

            const catData = portfolioData[catKey];
            if (!catData) return;

            // Collect all image paths (ignoring videos for home slideshow)
            let imagePaths = [];
            if (catData.has_subdirs) {
                // Gather all images from each subdir
                Object.values(catData.subdirs).forEach(subdirFiles => {
                    const imagesOnly = subdirFiles.filter(f => !f.toLowerCase().endsWith('.mp4') && !f.toLowerCase().endsWith('.mp4'));
                    imagePaths.push(...imagesOnly);
                });
            } else {
                const imagesOnly = catData.files.filter(f => !f.toLowerCase().endsWith('.mp4') && !f.toLowerCase().endsWith('.mp4'));
                imagePaths = imagesOnly;
            }

            if (imagePaths.length === 0) return;

            // Shuffle the image array so we get random files from different parts of the folder structures
            for (let i = imagePaths.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [imagePaths[i], imagePaths[j]] = [imagePaths[j], imagePaths[i]];
            }

            // Mobile keeps these covers static to avoid background intervals while browsing overlays.
            imagePaths = imagePaths.slice(0, isMobileFastView() ? 1 : 30);

            // Injected slides HTML
            container.innerHTML = imagePaths.map((path, idx) => {
                const slideSrc = isMobileFastView() ? path : (path.startsWith('assets/portfolio/') ? path.replace('assets/portfolio/', 'assets/portfolio-thumbs/') : path);
                return `
                    <div class="portfolio-slide ${idx === 0 ? 'active' : ''}">
                        <img src="${slideSrc}" class="portfolio-slide-img" alt="" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='${path}'">
                    </div>
                `;
            }).join('');

            // Start slideshow cycle with staggered delays
            const slides = container.querySelectorAll('.portfolio-slide');
            if (slides.length <= 1) return;

            let currentSlide = 0;
            const cycleInterval = 4000; // change image every 4s

            setTimeout(() => {
                setInterval(() => {
                    const prevSlide = currentSlide;
                    
                    // Pick a random slide index different from the current one
                    let nextSlide;
                    do {
                        nextSlide = Math.floor(Math.random() * slides.length);
                    } while (nextSlide === currentSlide);
                    
                    currentSlide = nextSlide;

                    // Randomize transition directions (horizontal & vertical variations)
                    const directions = [
                        { sx: '100%', sy: '0%', px: '-100%', py: '0%' },   // Slide from right
                        { sx: '-100%', sy: '0%', px: '100%', py: '0%' },   // Slide from left
                        { sx: '0%', sy: '100%', px: '0%', py: '-100%' },   // Slide from bottom
                        { sx: '0%', sy: '-100%', px: '0%', py: '100%' }    // Slide from top
                    ];
                    const dir = directions[Math.floor(Math.random() * directions.length)];
                    container.style.setProperty('--slide-x', dir.sx);
                    container.style.setProperty('--slide-y', dir.sy);
                    container.style.setProperty('--prev-x', dir.px);
                    container.style.setProperty('--prev-y', dir.py);

                    // Apply slide animation classes
                    slides.forEach((slide, sIdx) => {
                        slide.classList.remove('active', 'prev');
                        if (sIdx === currentSlide) {
                            slide.classList.add('active');
                        } else if (sIdx === prevSlide) {
                            slide.classList.add('prev');
                        }
                    });
                }, cycleInterval);
            }, index * 800); // staggered starting delay
        });
    }

    // 2. Open Page & Overlay Transition
    const triggerTransition = (callback) => {
        if (isMobileFastView()) {
            if (callback) callback();
            return;
        }
        if (!pageTransition) { if (callback) callback(); return; }
        pageTransition.classList.add('active');
        setTimeout(() => { if (callback) callback(); }, 700);
        setTimeout(() => { pageTransition.classList.remove('active'); }, 1400);
    };

    const openPage = (directCatKey = null, directSubdirKey = null, fromHash = false) => {
        if (!fromHash) {
            const nextHash = directCatKey ? '#portfolio-' + directCatKey : '#social-page';
            pendingDirectSubdirKey = directSubdirKey;
            if (window.location.hash !== nextHash) {
                window.location.hash = nextHash;
                return;
            }
        }

        if (socialPage.classList.contains('active')) {
            if (directCatKey) {
                showCategoryDetails(directCatKey, directSubdirKey);
            } else {
                resetSocialView();
            }
            return;
        }
        triggerTransition(() => {
            socialPage.classList.add('active');
            document.body.style.overflow = 'hidden';
            resetSocialView();
            if (directCatKey) showCategoryDetails(directCatKey, directSubdirKey);
        });
    };

    const closePage = (skipHash) => {
        if (!socialPage.classList.contains('active')) return;
        const shouldClearHash = skipHash !== true;
        triggerTransition(() => {
            socialPage.classList.remove('active');
            document.body.style.overflow = '';
            resetSocialView();
            if (shouldClearHash) {
                window.history.replaceState(null, '', window.location.pathname);
            }
        });
    };

    function handleSocialHash() {
        const hash = window.location.hash;

        if (hash.endsWith('-lb')) return;

        if (window.lbSessionClose && document.querySelector('.gallery-lightbox-global') && document.querySelector('.gallery-lightbox-global').style.display === 'flex') {
            window.lbSessionClose(true);
            return;
        }

        if (hash === '#social-page') {
            openPage(null, null, true);
        } else if (hash.startsWith('#portfolio-')) {
            const portfolioPath = hash.replace('#portfolio-', '');
            const [catKey, encodedSubdirKey] = portfolioPath.split('/');
            const directSubdirKey = encodedSubdirKey ? decodeURIComponent(encodedSubdirKey) : pendingDirectSubdirKey;
            pendingDirectSubdirKey = null;
            openPage(catKey, directSubdirKey, true);
        } else if (socialPage.classList.contains('active') && !hash.startsWith('#social') && !hash.startsWith('#portfolio')) {
            closePage(true);
        }
    }

    window.addEventListener('hashchange', handleSocialHash);
    setTimeout(handleSocialHash, 2900);

    function resetSocialView() {
        clearGalleryScrollLoader();
        socialPage.style.background = '';
        currentViewLevel = 'categories';
        currentCategoryKey = null;
        currentSubcategoryName = null;
        
        if (window.socialGalleryObserver) window.socialGalleryObserver.disconnect();
        if (socialDetailView) {
            socialDetailView.classList.remove('active');
            socialDetailView.style.display = 'none';
        }
        if (socialGrid) {
            socialGrid.style.display = 'grid';
            socialGrid.style.opacity = '1';
        }
    }

    // 3. Render Portfolio Categories & Details
    function renderPortfolioCategory(catKey, cardElement, clickEvent) {
        const data = portfolioData[catKey];
        if (!data) return;

        currentCategoryKey = catKey;
        const lang = document.documentElement.lang || 'ar';
        const categoryName = lang === 'ar' ? data.name_ar : data.name_en;
        const color = '#0f0c1b'; // premium dark theme

        // Perform ripple animation if clicked from grid card
        if (cardElement && !socialPage.classList.contains('expanding')) {
            window.isAnimatingRipple = true;
            window.location.hash = "#portfolio-" + catKey;
            let startX, startY;
            if (clickEvent && clickEvent.clientX) {
                startX = clickEvent.clientX;
                startY = clickEvent.clientY;
            } else {
                const rect = cardElement.getBoundingClientRect();
                startX = rect.left + rect.width / 2;
                startY = rect.top + rect.height / 2;
            }

            const ripple = document.createElement('div');
            ripple.className = 'liquid-ripple';
            Object.assign(ripple.style, {
                top: startY + 'px',
                left: startX + 'px',
                width: '300vmax',
                height: '300vmax',
                backgroundColor: color,
                borderRadius: '50%'
            });
            document.body.appendChild(ripple);
            socialPage.classList.add('expanding');

            requestAnimationFrame(() => {
                ripple.classList.add('active');
                setTimeout(() => {
                    window.isAnimatingRipple = false;
                    showCategoryDetails(catKey);
                    ripple.style.opacity = '0';
                    setTimeout(() => {
                        ripple.remove();
                        socialPage.classList.remove('expanding');
                    }, 400);
                }, 750);
            });
        } else {
            showCategoryDetails(catKey);
        }
    }

    function showCategoryDetails(catKey, directSubdirKey = null) {
        currentCategoryKey = catKey;
        const data = portfolioData[catKey];
        if (!data) return;

        socialPage.style.background = '#080412'; // beautiful dark cosmic theme
        const lang = document.documentElement.lang || 'ar';
        const categoryName = lang === 'ar' ? data.name_ar : data.name_en;
        if (socialCategoryName) socialCategoryName.textContent = categoryName;

        if (data.has_subdirs) {
            if (directSubdirKey && data.subdirs[directSubdirKey]) {
                currentViewLevel = 'gallery';
                currentSubcategoryName = directSubdirKey;
                const displaySubdir = translations[currentLang][directSubdirKey] || directSubdirKey;
                if (socialCategoryName) {
                    socialCategoryName.textContent = `${categoryName} › ${displaySubdir}`;
                }
                renderGallery(data.subdirs[directSubdirKey], `${categoryName} › ${displaySubdir}`);
            } else {
                // Render subdirectories list
                renderSubdirectories(catKey);
            }
        } else {
            // Render flat gallery files
            renderGallery(data.files, categoryName);
        }

        if (socialGrid) socialGrid.style.display = 'none';
        socialDetailView.style.display = 'block';

        requestAnimationFrame(() => {
            socialDetailView.classList.add('active');
        });
    }

    // 4. Render Subdirectories Grid
    function renderSubdirectories(catKey) {
        clearGalleryScrollLoader();
        currentViewLevel = 'subcategories';
        const catData = portfolioData[catKey];
        if (!catData || !socialGalleryGrid) return;

        socialGalleryGrid.innerHTML = '';
        socialGalleryGrid.className = 'portfolio-gallery-grid subdirs-view-grid';

        const subdirs = Object.keys(catData.subdirs);
        subdirs.forEach(subdirName => {
            const files = catData.subdirs[subdirName];
            // Find first image as cover (not a video)
            const coverImage = files.find(f => !f.toLowerCase().endsWith('.mp4') && !f.toLowerCase().endsWith('.mp4')) || files[0];

            const isVideo = coverImage.toLowerCase().endsWith('.mp4') || coverImage.toLowerCase().endsWith('.mp4');
            const card = document.createElement('div');
            card.className = 'subdir-card reveal-up';
            
            let bgHtml = '';
            if (isVideo) {
                bgHtml = `
                    <video src="${coverImage}" class="subdir-video" autoplay muted loop playsinline style="
                        position: absolute;
                        inset: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        z-index: 0;
                        pointer-events: none;
                        filter: brightness(0.65);
                        transition: filter 0.4s ease;
                    "></video>
                `;

            } else {
                // Use thumbnail for card cover for better performance
                const thumbCover = coverImage.startsWith('assets/portfolio/') ? coverImage.replace('assets/portfolio/', 'assets/portfolio-thumbs/') : coverImage;
                const safeCoverImage = encodeURI(thumbCover).replace(/\(/g, '%28').replace(/\)/g, '%29');
                card.style.backgroundImage = `url('${safeCoverImage}')`;
            }

            card.innerHTML = bgHtml + `
                <div class="subdir-card-overlay"></div>
                <div style="
                    position: absolute;
                    bottom: 25px;
                    left: 25px;
                    right: 25px;
                    z-index: 2;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                ">
                    <h4 class="subdir-title" style="
                        margin: 0;
                        font-family: 'Cairo', sans-serif;
                        color: #fff;
                        font-size: 1.35rem;
                        font-weight: 700;
                    ">${translations[currentLang][subdirName] || subdirName}</h4>
                    <span style="
                        font-size: 0.85rem;
                        background: rgba(0,0,0,0.45);
                        padding: 6px 14px;
                        border-radius: 20px;
                        color: #fff;
                        font-weight: 600;
                        backdrop-filter: blur(5px);
                    ">${files.length} ${currentLang === "ar" ? "مادة" : "items"}</span>
                </div>
            `;

            card.addEventListener('click', () => {
                const nextHash = `#portfolio-${catKey}/${encodeURIComponent(subdirName)}`;
                if (window.location.hash !== nextHash) {
                    window.location.hash = nextHash;
                    return;
                }

                currentSubcategoryName = subdirName;
                const lang = document.documentElement.lang || 'ar';
                const mainCategoryName = lang === 'ar' ? catData.name_ar : catData.name_en;
                const displaySubdir = translations[currentLang][subdirName] || subdirName;
                if (socialCategoryName) {
                    socialCategoryName.textContent = `${mainCategoryName} › ${displaySubdir}`;
                }
                renderGallery(files, `${mainCategoryName} › ${displaySubdir}`);
            });

            socialGalleryGrid.appendChild(card);
        });

        triggerIntersectionObserver();
    }

    function triggerIntersectionObserver() {
        if (window.socialGalleryObserver) window.socialGalleryObserver.disconnect();

        if (!('IntersectionObserver' in window)) {
            socialGalleryGrid.querySelectorAll('.gallery-item, .subdir-card, .reveal-up').forEach(item => item.classList.add('revealed'));
            return;
        }

        window.socialGalleryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Lazy load video source to prevent network/CPU overload
                    if (entry.target.classList.contains('video-item')) {
                        const video = entry.target.querySelector('video');
                        if (video && !video.src) {
                            video.src = video.getAttribute('data-src');
                            video.load();
                        }
                    }
                    
                    window.socialGalleryObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: isTouchPortfolioView() ? '700px' : '250px' });

        const items = socialGalleryGrid.querySelectorAll('.gallery-item:not(.revealed), .subdir-card:not(.revealed), .reveal-up:not(.revealed)');
        items.forEach(item => {
            window.socialGalleryObserver.observe(item);
        });
    }

    function isVideoFile(src) {
        return src.toLowerCase().endsWith('.mp4') || src.toLowerCase().endsWith('.mp4');
    }

    function createLightboxMedia(src) {
        if (isVideoFile(src)) {
            const el = document.createElement('video');
            el.className = 'gallery-lightbox-video';
            el.preload = 'auto';
            el.src = src;
            el.controls = true;
            el.autoplay = true;
            el.playsInline = true;
            el.style.cssText = 'max-width:90%; max-height:85vh; border-radius:12px; box-shadow:0 10px 40px rgba(0,0,0,0.6); outline:none; z-index:1; position:relative;';
            return el;
        } else {
            const el = document.createElement('img');
            el.className = 'gallery-lightbox-img';
            el.src = src;
            return el;
        }
    }

    // 5. Render Gallery Files (Images/Videos)
    function renderGallery(files, categoryTitle) {
        clearGalleryScrollLoader();
        currentViewLevel = 'gallery';
        if (!socialGalleryGrid) return;

        // Shuffle files array to randomize ordering when viewing social category
        let displayFiles = [...files];
        if (currentCategoryKey === 'social') {
            for (let i = displayFiles.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [displayFiles[i], displayFiles[j]] = [displayFiles[j], displayFiles[i]];
            }
        }

        socialGalleryGrid.className = 'portfolio-gallery-grid';
        socialGalleryGrid.innerHTML = '';

        const mobileMode = isTouchPortfolioView();
        const batchSize = mobileMode ? 18 : displayFiles.length;
        let renderedCount = 0;

        function getGalleryItemMarkup(file, index) {
            const isVideo = isVideoFile(file);
            if (isVideo) {
                const preloadMode = mobileMode ? 'none' : 'metadata';
                return `
                    <div class="gallery-item video-item" data-full="${file}" data-type="video" data-gallery-index="${index}" style="position:relative; cursor:pointer; overflow:hidden; border-radius:12px;">
                        <video data-src="${file}" class="gallery-video-element" preload="${preloadMode}" muted loop playsinline style="width:100%; height:100%; object-fit:cover; border-radius:12px;"></video>
                        <div class="video-play-overlay" style="
                            position: absolute;
                            inset: 0;
                            background: rgba(0,0,0,0.3);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            z-index: 2;
                            transition: background-color 0.3s ease;
                        ">
                            <div style="
                                width: 50px;
                                height: 50px;
                                border-radius: 50%;
                                background: rgba(245,166,35,0.9);
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                color: #000;
                                font-size: 1.2rem;
                                padding-left: 4px;
                                box-shadow: 0 4px 15px rgba(245,166,35,0.4);
                                transition: transform 0.3s ease;
                            ">▶</div>
                        </div>
                    </div>
                `;
            } else {
                const thumbSrc = file.startsWith('assets/portfolio/') ? file.replace('assets/portfolio/', 'assets/portfolio-thumbs/') : file;
                return `
                    <div class="gallery-item" data-full="${file}" data-type="image" data-gallery-index="${index}" style="cursor:pointer; overflow:hidden; border-radius:12px;">
                        <img src="${thumbSrc}" alt="${categoryTitle}" loading="lazy" decoding="async" style="width:100%; height:100%; object-fit:cover; border-radius:12px;" onerror="this.onerror=null; this.src='${file}';">
                    </div>
                `;
            }
        }

        function renderNextBatch() {
            if (renderedCount >= displayFiles.length) return;

            const end = Math.min(renderedCount + batchSize, displayFiles.length);
            const markup = displayFiles
                .slice(renderedCount, end)
                .map((file, offset) => getGalleryItemMarkup(file, renderedCount + offset))
                .join('');

            socialGalleryGrid.insertAdjacentHTML('beforeend', markup);
            renderedCount = end;
            triggerIntersectionObserver();
        }

        renderNextBatch();

        if (mobileMode && renderedCount < displayFiles.length) {
            let loadingBatch = false;
            galleryScrollLoader = () => {
                if (loadingBatch || renderedCount >= displayFiles.length) return;
                const distanceFromBottom = socialPage.scrollHeight - socialPage.scrollTop - socialPage.clientHeight;
                if (distanceFromBottom > 900) return;

                loadingBatch = true;
                requestAnimationFrame(() => {
                    renderNextBatch();
                    loadingBatch = false;
                    if (renderedCount >= displayFiles.length) clearGalleryScrollLoader();
                });
            };
            socialPage.addEventListener('scroll', galleryScrollLoader, { passive: true });
        }

        if (!mobileMode) {
            socialGalleryGrid.querySelectorAll('.gallery-item').forEach(item => {
                const media = item.querySelector('img, video');
                if (media) {
                    item.addEventListener('mouseenter', () => {
                        media.style.transform = 'scale(1.05)';
                        if (item.classList.contains('video-item')) {
                            if (media.src) {
                                media.play().catch(e => console.log('Autoplay blocked:', e));
                            }
                            const playBtn = item.querySelector('.video-play-overlay div');
                            if (playBtn) playBtn.style.transform = 'scale(1.15)';
                        }
                    });
                    item.addEventListener('mouseleave', () => {
                        media.style.transform = 'scale(1)';
                        if (item.classList.contains('video-item')) {
                            media.pause();
                            media.currentTime = 0;
                            const playBtn = item.querySelector('.video-play-overlay div');
                            if (playBtn) playBtn.style.transform = 'scale(1)';
                        }
                    });
                }
            });
        } else {
            if (renderedCount < displayFiles.length) {
                requestAnimationFrame(galleryScrollLoader);
            }
        }

        setupGalleryLightbox(displayFiles, categoryTitle);
    }

    // 6. Custom Lightbox with Video & Image support
    function setupGalleryLightbox(allFiles, categoryTitle) {
        // Create global shared lightbox elements once
        let lb = document.querySelector('.gallery-lightbox-global');
        if (!lb) {
            lb = document.createElement('div');
            lb.className = 'gallery-lightbox gallery-lightbox-global';
            lb.style.display = 'none';
            lb.innerHTML = `
                <div class="gallery-lightbox-bg"></div>
                <div class="gallery-lightbox-close">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
                <button class="gallery-lightbox-arrow gallery-lightbox-arrow--prev"></button>
                <button class="gallery-lightbox-arrow gallery-lightbox-arrow--next"></button>
            `;
            document.body.appendChild(lb);
            setupLightboxPinchZoom(lb);
        } else {
            setupLightboxPinchZoom(lb);
        }

        let currentIdx = 0;
        let isAnimating = false;
        let navQueue = [];
        let allLocalFiles = allFiles; // Capture reference
        
        function isVideoFile(src) { return src.toLowerCase().endsWith('.mp4'); }
        
        function createLightboxMedia(src) {
            if (isVideoFile(src)) {
                const el = document.createElement('video');
                el.className = 'gallery-lightbox-video';
                el.preload = 'auto';
                el.controls = true; el.autoplay = true; el.playsInline = true;
                el.style.cssText = 'max-width:90%; max-height:85vh; border-radius:12px; box-shadow:0 10px 40px rgba(0,0,0,0.6); outline:none; z-index:1; position:relative;';
                
                // Try to capture first frame from the gallery video as poster
                try {
                    const galleryVideo = socialGalleryGrid.querySelector(
                        '.video-item[data-full="' + CSS.escape(src) + '"] video, ' +
                        '.video-item[data-full="' + CSS.escape(src) + '"] video[data-src="' + CSS.escape(src) + '"]'
                    );
                    if (galleryVideo && galleryVideo.readyState >= 2 && galleryVideo.videoWidth > 0) {
                        const canvas = document.createElement('canvas');
                        canvas.width = galleryVideo.videoWidth;
                        canvas.height = galleryVideo.videoHeight;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(galleryVideo, 0, 0, canvas.width, canvas.height);
                        el.poster = canvas.toDataURL('image/jpeg', 0.85);
                    }
                } catch(e) { /* cross-origin or other error, skip poster */ }
                
                el.src = src;
                return el;
            } else {
                const el = document.createElement('img');
                el.className = 'gallery-lightbox-img';
                const thumbSrc = src.startsWith('assets/portfolio/') ? src.replace('assets/portfolio/', 'assets/portfolio-thumbs/') : src;
                el.src = thumbSrc;
                if (thumbSrc !== src) {
                    const highRes = new Image();
                    highRes.onload = () => { el.src = src; };
                    highRes.src = src;
                }
                return el;
            }
        }

        function processQueue() {
            if (navQueue.length === 0 || isAnimating) return;
            const dir = navQueue.shift();
            const nextIdx = currentIdx + dir;
            if (nextIdx >= 0 && nextIdx < allLocalFiles.length) {
                openLightbox(nextIdx, dir);
            } else {
                processQueue();
            }
        }

        function openLightbox(idx, direction = 0) {
            const fileSrc = allLocalFiles[idx];
            if (!fileSrc) return;

            // Preload adjacent
            function preloadAdjacent(i) {
                try {
                    if (i >= 0 && i < allLocalFiles.length) {
                        const src = allLocalFiles[i];
                        if (src && !src.endsWith('.mp4')) { const img = new Image(); img.src = src; }
                    }
                } catch(e) {}
            }
            preloadAdjacent(idx + 1); preloadAdjacent(idx + 2); preloadAdjacent(idx - 1);

            currentIdx = idx;

            const prevBtn = lb.querySelector('.gallery-lightbox-arrow--prev');
            const nextBtn = lb.querySelector('.gallery-lightbox-arrow--next');
            prevBtn.disabled = idx === 0;
            nextBtn.disabled = idx === allLocalFiles.length - 1;

            if (direction !== 0) {
                if (isAnimating) { navQueue.push(direction); return; }
                isAnimating = true;

                const oldMedia = lb.querySelector('.gallery-lightbox-img, .gallery-lightbox-video');
                const toX = direction > 0 ? '100%' : '-100%';
                const fromX = direction > 0 ? '-100%' : '100%';

                const newMedia = createLightboxMedia(fileSrc);
                if (typeof lb._resetPinchZoom === 'function') lb._resetPinchZoom(false);
                newMedia.style.cssText += `; position:absolute; transform:translateX(${fromX}); opacity:0; transition:none;`;
                lb.appendChild(newMedia);

                newMedia.getBoundingClientRect();
                if (oldMedia) {
                    oldMedia.style.transition = 'transform 0.15s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.15s ease';
                    oldMedia.style.transform = `translateX(${toX})`;
                    oldMedia.style.opacity = '0';
                }
                newMedia.style.transition = 'transform 0.15s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.15s ease';
                newMedia.style.transform = 'translateX(0)';
                newMedia.style.opacity = '1';

                setTimeout(() => {
                    if (oldMedia) { if (oldMedia.tagName === 'VIDEO') oldMedia.pause(); oldMedia.remove(); }
                    newMedia.style.position = ''; newMedia.style.transition = ''; newMedia.style.transform = '';
                    if (typeof lb._resetPinchZoom === 'function') lb._resetPinchZoom(false);
                    isAnimating = false; processQueue();
                }, 160);
                return;
            }

            // First open
            if (lb.style.display !== 'flex') {
                window.lbReturnScrollTop = socialPage.scrollTop;
                if (!window.location.hash.endsWith('-lb')) {
                    window.location.hash = window.location.hash + '-lb';
                }
            }
            lb.style.display = 'flex';
            lb.style.opacity = '1';
            lb.style.pointerEvents = 'auto';

            const bg = lb.querySelector('.gallery-lightbox-bg');
            const cls = lb.querySelector('.gallery-lightbox-close');
            
            // clear old media
            lb.querySelectorAll('.gallery-lightbox-img, .gallery-lightbox-video').forEach(m => m.remove());

            const newMedia = createLightboxMedia(fileSrc);
            newMedia.style.transform = 'scale(0.95)';
            newMedia.style.opacity = '0';
            lb.appendChild(newMedia);

            requestAnimationFrame(() => requestAnimationFrame(() => {
                bg.style.opacity = '1';
                cls.style.opacity = '1';
                prevBtn.style.opacity = '1';
                nextBtn.style.opacity = '1';
                newMedia.style.transition = 'transform 0.18s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.15s ease';
                newMedia.style.transform = 'translate(0, 0) scale(1)';
                newMedia.style.opacity = '1';
            }));

            // Attach listeners specific to this session
            window.lbSessionClose = (fromHistory = false) => {
                if (fromHistory !== true && window.location.hash.endsWith('-lb')) {
                    history.back();
                    return;
                }
                if (typeof lb._resetPinchZoom === 'function') lb._resetPinchZoom(false);
                bg.style.opacity = '0'; cls.style.opacity = '0'; prevBtn.style.opacity = '0'; nextBtn.style.opacity = '0';
                const curMedia = lb.querySelector('.gallery-lightbox-img, .gallery-lightbox-video');
                if (curMedia) {
                    if (curMedia.tagName === 'VIDEO') curMedia.pause();
                    curMedia.style.transition = 'transform 0.18s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.15s ease';
                    curMedia.style.transform = 'scale(0.95)';
                    curMedia.style.opacity = '0';
                }
                setTimeout(() => { lb.style.display = 'none'; lb.style.pointerEvents = 'none'; }, 200);
                requestAnimationFrame(() => {
                    if (typeof window.lbReturnScrollTop === 'number') {
                        socialPage.scrollTop = window.lbReturnScrollTop;
                    }
                });
                document.removeEventListener('keydown', window.lbKeyHandler);
            };

            window.lbKeyHandler = (e) => {
                if (e.key === 'ArrowLeft' && currentIdx < allLocalFiles.length - 1) { navQueue.push(1); processQueue(); }
                if (e.key === 'ArrowRight' && currentIdx > 0) { navQueue.push(-1); processQueue(); }
                if (e.key === 'Escape') window.lbSessionClose();
            };
            document.addEventListener('keydown', window.lbKeyHandler);
        }

        // Overwrite click listeners to ensure they use the current closure variables
        lb.querySelector('.gallery-lightbox-bg').onclick = () => { if(window.lbSessionClose) window.lbSessionClose(); };
        lb.querySelector('.gallery-lightbox-close').onclick = () => { if(window.lbSessionClose) window.lbSessionClose(); };
        lb.querySelector('.gallery-lightbox-arrow--prev').onclick = (e) => { e.stopPropagation(); navQueue.push(-1); processQueue(); };
        lb.querySelector('.gallery-lightbox-arrow--next').onclick = (e) => { e.stopPropagation(); navQueue.push(1); processQueue(); };
        lb._swipeNavigate = (dir) => {
            navQueue.push(dir);
            processQueue();
        };

        if (!lb.dataset.swipeReady) {
            lb.dataset.swipeReady = '1';

            let swipeStartX = 0;
            let swipeStartY = 0;
            let swipeStartTime = 0;

            lb.addEventListener('touchstart', (e) => {
                if ((e.touches && e.touches.length > 1) || (typeof lb._isPinchZooming === 'function' && lb._isPinchZooming())) return;
                if (!e.changedTouches || e.changedTouches.length === 0) return;
                const touch = e.changedTouches[0];
                swipeStartX = touch.clientX;
                swipeStartY = touch.clientY;
                swipeStartTime = Date.now();
            }, { passive: true });

            lb.addEventListener('touchend', (e) => {
                if (typeof lb._isPinchZooming === 'function' && lb._isPinchZooming()) return;
                if (!e.changedTouches || e.changedTouches.length === 0) return;
                const touch = e.changedTouches[0];
                const deltaX = touch.clientX - swipeStartX;
                const deltaY = touch.clientY - swipeStartY;
                const elapsed = Date.now() - swipeStartTime;

                if (elapsed > 900 || Math.abs(deltaX) < 55 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;

                const prevBtn = lb.querySelector('.gallery-lightbox-arrow--prev');
                const nextBtn = lb.querySelector('.gallery-lightbox-arrow--next');
                const dir = deltaX > 0 ? 1 : -1;

                if (dir > 0 && nextBtn && !nextBtn.disabled) {
                    if (typeof lb._swipeNavigate === 'function') lb._swipeNavigate(1);
                } else if (dir < 0 && prevBtn && !prevBtn.disabled) {
                    if (typeof lb._swipeNavigate === 'function') lb._swipeNavigate(-1);
                }
            }, { passive: true });
        }

        // IMPORTANT: Event delegation on the grid container!
        socialGalleryGrid.onclick = (e) => {
            const item = e.target.closest('.gallery-item');
            if (item) {
                const clickedIdx = Number(item.dataset.galleryIndex);
                if (Number.isInteger(clickedIdx) && clickedIdx > -1) {
                    openLightbox(clickedIdx, 0);
                }
            }
        };
    }

    // 7. Event listeners
    if (socialGrid) {
        socialGrid.querySelectorAll('.choice-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const cat = card.dataset.socialCategory;
                if (cat) renderPortfolioCategory(cat, card, e);
            });
        });
    }

    // Links on Home Page (4 categories)
    const homePrints = document.getElementById('portfolio-prints');
    const homeGiveaway = document.getElementById('portfolio-giveaway');
    const homeUniforms = document.getElementById('portfolio-uniforms');
    const homeTrophies = document.getElementById('portfolio-trophies');

    if (homePrints) {
        homePrints.style.cursor = 'pointer';
        homePrints.addEventListener('click', () => {
            openPage('prints');
        });
    }
    if (homeGiveaway) {
        homeGiveaway.style.cursor = 'pointer';
        homeGiveaway.addEventListener('click', () => {
            openPage('giveaway');
        });
    }
    if (homeUniforms) {
        homeUniforms.style.cursor = 'pointer';
        homeUniforms.addEventListener('click', () => {
            openPage('uniforms');
        });
    }
    if (homeTrophies) {
        homeTrophies.style.cursor = 'pointer';
        homeTrophies.addEventListener('click', () => {
            openPage('trophies');
        });
    }
    const homeOutdoors = document.getElementById('portfolio-outdoor');
    if (homeOutdoors) {
        homeOutdoors.style.cursor = 'pointer';
        homeOutdoors.addEventListener('click', () => {
            openPage('outdoors');
        });
    }

    // See all works banner listener
    const portfolioSeeAll = document.getElementById('portfolioSeeAll');
    if (portfolioSeeAll) {
        portfolioSeeAll.addEventListener('click', () => {
            openPage();
        });
    }

    // Back button behavior for hierarchical navigation
    if (backToSocial) {
        backToSocial.addEventListener('click', () => {
            const catData = portfolioData[currentCategoryKey];
            if (currentViewLevel === 'gallery' && catData && catData.has_subdirs) {
                // If in gallery and category has subfolders, go back to subfolders list
                const lang = document.documentElement.lang || 'ar';
                const categoryName = lang === 'ar' ? catData.name_ar : catData.name_en;
                if (socialCategoryName) socialCategoryName.textContent = categoryName;
                renderSubdirectories(currentCategoryKey);
            } else {
                // If the active category is social or exhibitions, close the overlay and return to home page
                if (currentCategoryKey === 'social' || currentCategoryKey === 'exhibitions') {
                    closePage();
                } else {
                    // Otherwise go back to main categories selection grid
                    window.HashTracker.goBack("social-page");
                }
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => closePage());
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && socialPage.classList.contains('active')) closePage();
    });

    const switchClientsToSocialPage = (hash, catKey, directSubdir = null) => {
        const clientsPage = document.getElementById('clientsPage');
        if (clientsPage) clientsPage.classList.remove('active');
        resetSocialView();
        socialPage.classList.add('active');
        document.body.style.overflow = 'hidden';
        pendingDirectSubdirKey = directSubdir;
        window.location.hash = hash;
        showCategoryDetails(catKey, directSubdir);
    };

    // Main nav links capture
    const handleSocialNavClick = (e, directSubdir = null) => {
        if (e) e.preventDefault();
        
        // Close mobile menu if open
        const toggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        if (toggle) toggle.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.classList.remove('menu-from-left');
        document.body.classList.remove('menu-from-right');

        const clientsPage = document.getElementById('clientsPage');
        if (clientsPage && clientsPage.classList.contains('active')) {
            if (isMobileFastView()) {
                switchClientsToSocialPage('#social-page', 'social', directSubdir);
                return;
            }
            const pageTransition = document.getElementById('pageTransition');
            if (pageTransition) {
                pageTransition.classList.add('active');
                setTimeout(() => {
                    clientsPage.classList.remove('active');
                    resetSocialView();
                    socialPage.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    window.location.hash = '#social-page';
                    showCategoryDetails('social', directSubdir);
                    setTimeout(() => {
                        pageTransition.classList.remove('active');
                    }, 600);
                }, 600);
            }
        } else {
            openPage('social', directSubdir);
        }
    };

    const navSocial = document.getElementById('navSocial');
    if (navSocial) {
        navSocial.addEventListener('click', (e) => handleSocialNavClick(e));
    }
    const mobileNavSocial = document.getElementById('mobileNavSocial');
    if (mobileNavSocial) {
        mobileNavSocial.addEventListener('click', (e) => handleSocialNavClick(e));
    }

    // Exhibitions Nav Links
    const handleExhibitionsNavClick = (e) => {
        if (e) e.preventDefault();
        
        // Close mobile menu if open
        const toggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        if (toggle) toggle.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.classList.remove('menu-from-left');
        document.body.classList.remove('menu-from-right');

        const clientsPage = document.getElementById('clientsPage');
        if (clientsPage && clientsPage.classList.contains('active')) {
            if (isMobileFastView()) {
                switchClientsToSocialPage('#portfolio-exhibitions', 'exhibitions');
                return;
            }
            const pageTransition = document.getElementById('pageTransition');
            if (pageTransition) {
                pageTransition.classList.add('active');
                setTimeout(() => {
                    clientsPage.classList.remove('active');
                    resetSocialView();
                    socialPage.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    window.location.hash = '#portfolio-exhibitions';
                    showCategoryDetails('exhibitions');
                    setTimeout(() => {
                        pageTransition.classList.remove('active');
                    }, 600);
                }, 600);
            }
        } else {
            openPage('exhibitions');
        }
    };

    const navExhibitions = document.getElementById('navExhibitions');
    if (navExhibitions) {
        navExhibitions.addEventListener('click', (e) => handleExhibitionsNavClick(e));
    }
    const mobileNavExhibitions = document.getElementById('mobileNavExhibitions');
    if (mobileNavExhibitions) {
        mobileNavExhibitions.addEventListener('click', (e) => handleExhibitionsNavClick(e));
    }

    // Generic Portfolio Category Nav Click Handler
    const handleCategoryNavClick = (e, catKey) => {
        if (e) e.preventDefault();
        
        // Close mobile menu if open
        const toggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        if (toggle) toggle.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.classList.remove('menu-from-left');
        document.body.classList.remove('menu-from-right');

        const clientsPage = document.getElementById('clientsPage');
        if (clientsPage && clientsPage.classList.contains('active')) {
            if (isMobileFastView()) {
                switchClientsToSocialPage(`#portfolio-${catKey}`, catKey);
                return;
            }
            const pageTransition = document.getElementById('pageTransition');
            if (pageTransition) {
                pageTransition.classList.add('active');
                setTimeout(() => {
                    clientsPage.classList.remove('active');
                    resetSocialView();
                    socialPage.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    window.location.hash = `#portfolio-${catKey}`;
                    showCategoryDetails(catKey);
                    setTimeout(() => {
                        pageTransition.classList.remove('active');
                    }, 600);
                }, 600);
            }
        } else {
            openPage(catKey);
        }
    };

    // Prints Nav Links
    const navPrints = document.getElementById('navPrints');
    if (navPrints) {
        navPrints.addEventListener('click', (e) => handleCategoryNavClick(e, 'prints'));
    }
    const mobileNavPrints = document.getElementById('mobileNavPrints');
    if (mobileNavPrints) {
        mobileNavPrints.addEventListener('click', (e) => handleCategoryNavClick(e, 'prints'));
    }

    // Outdoor Nav Links
    const navOutdoor = document.getElementById('navOutdoor');
    if (navOutdoor) {
        navOutdoor.addEventListener('click', (e) => handleCategoryNavClick(e, 'outdoors'));
    }
    const mobileNavOutdoor = document.getElementById('mobileNavOutdoor');
    if (mobileNavOutdoor) {
        mobileNavOutdoor.addEventListener('click', (e) => handleCategoryNavClick(e, 'outdoors'));
    }

    // Giveaway Nav Links
    const navGiveaway = document.getElementById('navGiveaway');
    if (navGiveaway) {
        navGiveaway.addEventListener('click', (e) => handleCategoryNavClick(e, 'giveaway'));
    }
    const mobileNavGiveaway = document.getElementById('mobileNavGiveaway');
    if (mobileNavGiveaway) {
        mobileNavGiveaway.addEventListener('click', (e) => handleCategoryNavClick(e, 'giveaway'));
    }

    // Bind click events on hover dropdown links for social categories
    document.querySelectorAll('.social-dropdown-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const subdirName = link.getAttribute('data-subdir');
            handleSocialNavClick(e, subdirName);
        });
    });
}

/* ================================================================
   EMAIL MODAL
   ================================================================ */
function initEmailModal() {
    const modal   = document.getElementById('emailModal');
    const openBtn = document.getElementById('openEmailModal');
    const closeBtn = document.getElementById('closeEmailModal');
    if (!modal || !openBtn) return;

    function open() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);

    // Mobile contact button
    const mobileContactBtn = document.getElementById('mobileContactBtn');
    if (mobileContactBtn) {
        mobileContactBtn.addEventListener('click', () => {
            // Close mobile menu first
            const toggle = document.getElementById('menuToggle');
            const mobileMenu = document.getElementById('mobileMenu');
            if (toggle) toggle.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            setTimeout(() => open(), 300);
        });
    }

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) close();
    });

    // Close on Escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) close();
    });

    // Also hook all other "تواصل معنا" nav links
    document.querySelectorAll('a[href="#contact"].nav-link--cta, a[href="#contact"].footer-cta-big').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            open();
        });
    });
}

/* ================================================================
   BACK TO TOP BUTTON
   ================================================================ */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    btn.style.display = 'flex';

    let isVisible = false;
    let lastScrollY = 0;
    let ticking = false;

    // Get the active scroll container
    function getScrollContainer() {
        const clientsPage = document.querySelector('.clients-page.active');
        const socialPage = document.querySelector('.social-page.active');
        
        if (clientsPage) return clientsPage;
        if (socialPage) return socialPage;
        return window;
    }

    // Get scroll position from container
    function getScrollY(container) {
        if (container === window) {
            return window.scrollY;
        }
        return container.scrollTop;
    }

    function updateButton() {
        const container = getScrollContainer();
        const currentScrollY = getScrollY(container);
        const scrollThreshold = isMobileFastView() ? 650 : 400;

        // Show button if scrolled down enough
        if (currentScrollY > scrollThreshold && !isVisible) {
            btn.classList.add('show');
            btn.classList.remove('hide');
            isVisible = true;
        }
        // Hide button if scrolling up OR at top
        else if ((currentScrollY < lastScrollY || currentScrollY <= scrollThreshold) && isVisible) {
            btn.classList.remove('show');
            btn.classList.add('hide');
            isVisible = false;
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    // Throttle scroll events with requestAnimationFrame
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(updateButton);
            ticking = true;
        }
    }

    // Add scroll listener to window
    window.addEventListener('scroll', handleScroll);

    // Add scroll listeners to pages
    const clientsPage = document.querySelector('.clients-page');
    const socialPage = document.querySelector('.social-page');
    
    if (clientsPage) {
        clientsPage.addEventListener('scroll', handleScroll);
    }
    if (socialPage) {
        socialPage.addEventListener('scroll', handleScroll);
    }

    // Click handler - smooth scroll to top
    btn.addEventListener('click', () => {
        const container = getScrollContainer();
        
        if (container === window) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            container.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    // Initial check
    updateButton();

    // Re-check when pages open/close
    const observer = new MutationObserver(() => {
        updateButton();
    });

    if (clientsPage) {
        observer.observe(clientsPage, { attributes: true, attributeFilter: ['class'] });
    }
    if (socialPage) {
        observer.observe(socialPage, { attributes: true, attributeFilter: ['class'] });
    }
}

/* ================================================================
   ORDER FORM
   ================================================================ */
function initOrderForm() {
    const modal      = document.getElementById('orderModal');
    const closeBtn   = document.getElementById('orderModalClose');
    const navBtn     = document.getElementById('navOrderBtn');
    const mobileOrderBtn = document.getElementById('mobileOrderBtn');
    const mobileFloatingOrderBtn = document.getElementById('mobileFloatingOrderBtn');
    if (mobileFloatingOrderBtn) {
        mobileFloatingOrderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if(typeof closeMenu === 'function') closeMenu();
            openModal();
        });
    }


    const contactBtn = document.getElementById('orderContactBtn');
    const form       = document.getElementById('orderForm');
    const emailStep  = document.getElementById('orderEmailStep');

    if (!modal) return;

    function openModal() {
        if (typeof loadPersistentFormFields === 'function') loadPersistentFormFields();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Toggle manual/map address inputs
    if (form) {
        const addressRadios = form.querySelectorAll('input[name="address_type"]');
        const manualContainer = document.getElementById('addressManualContainer');
        const mapContainer = document.getElementById('addressMapContainer');
        const manualInput = document.getElementById('orderAddressManual');
        const mapUrlInput = document.getElementById('orderAddressMapUrl');

        addressRadios.forEach(radio => {
            const updateLabelStyles = () => {
                addressRadios.forEach(r => {
                    const parent = r.parentElement;
                    if (parent) {
                        if (r.checked) {
                            parent.style.borderColor = 'var(--orange)';
                            parent.style.backgroundColor = 'rgba(245, 166, 35, 0.08)';
                        } else {
                            parent.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                            parent.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                        }
                    }
                });
            };

            // Set initial state
            updateLabelStyles();

            radio.addEventListener('change', (e) => {
                updateLabelStyles();
                if (e.target.value === 'manual') {
                    if (manualContainer) manualContainer.style.display = 'block';
                    if (mapContainer) mapContainer.style.display = 'none';
                    if (manualInput) manualInput.setAttribute('required', 'required');
                    if (mapUrlInput) mapUrlInput.removeAttribute('required');
                } else {
                    if (manualContainer) manualContainer.style.display = 'none';
                    if (mapContainer) mapContainer.style.display = 'block';
                    if (manualInput) manualInput.removeAttribute('required');
                    if (mapUrlInput) mapUrlInput.setAttribute('required', 'required');
                }
            });
        });

        // Open Map Picker in an external window
        const openMapPickerBtn = document.getElementById('openMapPickerBtn');
        if (openMapPickerBtn) {
            openMapPickerBtn.addEventListener('click', () => {
                const width = 1000;
                const height = 700;
                const left = (window.screen.width - width) / 2;
                const top = (window.screen.height - height) / 2;
                window.open('map-picker.html', 'MapPicker', `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,status=yes,resizable=yes`);
            });
        }

        // Toggle other province input
        const provinceSelect = document.getElementById('orderProvince');
        const provinceOtherInput = document.getElementById('orderProvinceOther');
        if (provinceSelect && provinceOtherInput) {
            provinceSelect.addEventListener('change', (e) => {
                if (e.target.value === 'other') {
                    provinceOtherInput.style.display = 'block';
                    provinceOtherInput.setAttribute('required', 'required');
                } else {
                    provinceOtherInput.style.display = 'none';
                    provinceOtherInput.removeAttribute('required');
                    provinceOtherInput.value = '';
                }
            });
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (navBtn) navBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    if (mobileOrderBtn) {
        mobileOrderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if(typeof closeMenu === 'function') closeMenu();
            openModal();
        });
    }
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // Contact btn closes modal and scrolls to contact
    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
            setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }, 350);
        });
    }

    if (!form) return;

    let orderData = {};

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name          = document.getElementById('orderName').value.trim();
        const phone         = document.getElementById('orderPhone').value.trim();
        const customerEmail = document.getElementById('orderEmailInput').value.trim();
        const fieldOfWork   = document.getElementById('orderFieldOfWork').value.trim();
        
        let province = document.getElementById('orderProvince').value || 'غير محدد';
        if (province === 'other') {
            const otherVal = document.getElementById('orderProvinceOther').value.trim();
            province = otherVal ? otherVal : 'أخرى';
        }
        
        const service     = document.getElementById('orderService').value || 'غير محدد';
        const details     = document.getElementById('orderDetails').value.trim();
        
        const addressType = form.querySelector('input[name="address_type"]:checked').value;
        let address = '';
        if (addressType === 'manual') {
            address = document.getElementById('orderAddressManual').value.trim();
        } else {
            const mapUrl = document.getElementById('orderAddressMapUrl').value.trim() || 'رابط الخريطة لم يتم تحديده';
            const mapNotes = document.getElementById('orderAddressMapNotes').value.trim();
            address = mapUrl;
            if (mapNotes) {
                address += ` | ملاحظات العنوان: ${mapNotes}`;
            }
        }

        if (!name || !phone || !customerEmail) return;

        // Save data and show email step
        orderData = { name, phone, customerEmail, fieldOfWork, province, address, service, details };

        form.style.display = 'none';
        emailStep.classList.add('visible');
    });

    // Email choice buttons
    const emailChoices = modal.querySelectorAll('.order-email-choice');
    
    function bindEmailChoiceEvents() {
        modal.querySelectorAll('.order-email-choice').forEach(btn => {
            btn.addEventListener('click', () => {
                const email = btn.dataset.email;
                const { name, phone, customerEmail, fieldOfWork, province, address, service, details } = orderData;

                // Disable all buttons while sending
                modal.querySelectorAll('.order-email-choice').forEach(b => { b.disabled = true; b.style.opacity = '0.5'; });

                // Construct combined message
                const combinedMessage = `
التفاصيل المطلوبة:
${details || 'لا توجد تفاصيل إضافية'}

-----------------------------------
تفاصيل إضافية للطلب:
- البريد الإلكتروني للعميل: ${customerEmail}
- مجال العمل: ${fieldOfWork}
- المحافظة: ${province}
- العنوان: ${address}
                `.trim();

                // EmailJS config
                const SERVICE_ID  = 'service_xn2ts7u';
                const TEMPLATE_ID = 'template_be1uaha';

                emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                    to_email:       email,
                    from_name:      name,
                    name:           name,
                    title:          `طلب جديد — ${service}`,
                    phone:          phone,
                    service:        service,
                    message:        details || 'لا توجد تفاصيل',
                    customer_email: customerEmail || 'غير محدد',
                    field_of_work:  fieldOfWork || 'غير محدد',
                    province:       province || 'غير محدد',
                    address:        address || 'غير محدد',
                    email:          email,
                })
                .then(() => {
                    // Show success
                    emailStep.innerHTML = `
                        <div class="order-success">
                            <div class="order-success__icon">✅</div>
                            <h3 class="order-success__title">تم إرسال الطلب!</h3>
                            <p class="order-success__msg">وصل طلبك على <strong>${email}</strong><br>هنرد عليك في أقرب وقت 🙌</p>
                        </div>`;
                    setTimeout(() => {
                        form.style.display = '';
                        emailStep.classList.remove('visible');
                        emailStep.innerHTML = originalEmailStepHTML;
                        form.reset();
                        
                        // Reset map/manual input displays
                        const manualContainer = document.getElementById('addressManualContainer');
                        const mapContainer = document.getElementById('addressMapContainer');
                        if (manualContainer) manualContainer.style.display = 'block';
                        if (mapContainer) mapContainer.style.display = 'none';
                        document.getElementById('orderAddressManual')?.setAttribute('required', 'required');
                        document.getElementById('orderAddressMapUrl')?.removeAttribute('required');
                        
                        // Reset province other input display
                        const provinceOtherInput = document.getElementById('orderProvinceOther');
                        if (provinceOtherInput) {
                            provinceOtherInput.style.display = 'none';
                            provinceOtherInput.removeAttribute('required');
                        }
                        
                        orderData = {};
                        closeModal();
                        rebindEmailChoices();
                    }, 2800);
                })
                .catch((err) => {
                    console.error('EmailJS error:', err);
                    modal.querySelectorAll('.order-email-choice').forEach(b => { b.disabled = false; b.style.opacity = ''; });
                    
                    // Show fallback: open Gmail
                    const { name, phone, customerEmail, fieldOfWork, province, address, service, details } = orderData;
                    const combinedDetails = `${details || 'لا توجد تفاصيل'}\n\n- البريد الإلكتروني للعميل: ${customerEmail}\n- مجال العمل: ${fieldOfWork}\n- المحافظة: ${province}\n- العنوان: ${address}`;
                    emailStep.innerHTML = `
                        <div class="order-fallback">
                            <div class="order-fallback__icon">⚠️</div>
                            <h3 class="order-fallback__title">حدث خطأ في الإرسال</h3>
                            <p class="order-fallback__msg">برجاء التواصل معنا مباشرة على أحد الإيميلات دي:</p>
                            <div class="order-email-choices">
                                <button class="order-email-choice order-email-fallback-btn" data-name="${name}" data-phone="${phone}" data-service="${service}" data-details="${combinedDetails}" data-email="e.newgraphic@gmail.com">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                    e.newgraphic@gmail.com
                                </button>
                                <button class="order-email-choice order-email-fallback-btn" data-name="${name}" data-phone="${phone}" data-service="${service}" data-details="${combinedDetails}" data-email="graphicn249@gmail.com">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                    graphicn249@gmail.com
                                </button>
                            </div>
                            <button class="order-email-back" id="orderFallbackBack">← رجوع</button>
                        </div>`;

                    // Bind fallback buttons
                    modal.querySelectorAll('.order-email-fallback-btn').forEach(fBtn => {
                        fBtn.addEventListener('click', () => {
                            const e       = fBtn.dataset.email;
                            const n       = fBtn.dataset.name;
                            const p       = fBtn.dataset.phone;
                            const s       = fBtn.dataset.service;
                            const d       = fBtn.dataset.details;
                            const subject = encodeURIComponent(`طلب جديد من ${n} — ${s}`);
                            const body    = encodeURIComponent(`الاسم: ${n}\nرقم التليفون: ${p}\nنوع الخدمة: ${s}\nتفاصيل الطلب:\n${d}`);
                            window.open(`https://mail.google.com/mail/?view=cm&to=${e}&su=${subject}&body=${body}`, '_blank');
                        });
                    });

                    document.getElementById('orderFallbackBack')?.addEventListener('click', () => {
                        emailStep.classList.remove('visible');
                        emailStep.innerHTML = originalEmailStepHTML;
                        form.style.display = '';
                        rebindEmailChoices();
                    });
                });
            });
        });
    }

    bindEmailChoiceEvents();

    // Back button
    const backBtn = document.getElementById('orderEmailBack');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            emailStep.classList.remove('visible');
            form.style.display = '';
        });
    }

    // Save original HTML to restore after success
    const originalEmailStepHTML = emailStep.innerHTML;

    function rebindEmailChoices() {
        bindEmailChoiceEvents();
    }
}

/* ================================================================
   SUPPORT FORM
   ================================================================ */
function initSupportForm() {
    const modal      = document.getElementById('supportModal');
    const closeBtn   = document.getElementById('supportModalClose');
    const navBtn     = document.getElementById('navSupportBtn');
    const mobileBtn  = document.getElementById('mobileSupportBtn');
    const footerBtn  = document.getElementById('footerSupportBtn');
    const form       = document.getElementById('supportForm');
    const emailStep  = document.getElementById('supportEmailStep');

    if (!modal) return;

    function openModal() {
        if (typeof loadPersistentFormFields === 'function') loadPersistentFormFields();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (navBtn) navBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    if (mobileBtn) mobileBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    if (footerBtn) footerBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    if (!form) return;

    // Toggle other support type input
    const supportTypeSelect = document.getElementById('supportType');
    const supportTypeOtherInput = document.getElementById('supportTypeOther');
    if (supportTypeSelect && supportTypeOtherInput) {
        supportTypeSelect.addEventListener('change', (e) => {
            if (e.target.value === 'other') {
                supportTypeOtherInput.style.display = 'block';
                supportTypeOtherInput.setAttribute('required', 'required');
            } else {
                supportTypeOtherInput.style.display = 'none';
                supportTypeOtherInput.removeAttribute('required');
                supportTypeOtherInput.value = '';
            }
        });
    }

    let supportData = {};

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name          = document.getElementById('supportName').value.trim();
        const phone         = document.getElementById('supportPhone').value.trim();
        const customerEmail = document.getElementById('supportEmailInput').value.trim();
        const supportType   = document.getElementById('supportType').value;
        const details       = document.getElementById('supportDetails').value.trim();

        let supportTypeArabic = 'استفسار عام';
        if (supportType === 'technical') supportTypeArabic = 'مشكلة فنية في الموقع';
        else if (supportType === 'complaint') supportTypeArabic = 'تقديم شكوى';
        else if (supportType === 'suggestion') supportTypeArabic = 'اقتراح لتطوير الخدمة';
        else if (supportType === 'after_sales') supportTypeArabic = 'خدمات ما بعد البيع ومتابعة أوردر';
        else if (supportType === 'other') {
            const otherVal = document.getElementById('supportTypeOther').value.trim();
            supportTypeArabic = otherVal ? `أخرى: ${otherVal}` : 'أخرى';
        }

        if (!name || !phone || !customerEmail) return;

        supportData = { name, phone, customerEmail, supportTypeArabic, details };

        form.style.display = 'none';
        emailStep.classList.add('visible');
    });

    // Email choice buttons for Support
    function bindEmailChoiceEvents() {
        modal.querySelectorAll('.order-email-choice').forEach(btn => {
            btn.addEventListener('click', () => {
                const email = btn.dataset.email;
                const { name, phone, customerEmail, supportTypeArabic, details } = supportData;

                modal.querySelectorAll('.order-email-choice').forEach(b => { b.disabled = true; b.style.opacity = '0.5'; });

                // Construct message
                const combinedMessage = `
تفاصيل طلب الدعم:
${details || 'لا توجد تفاصيل إضافية'}

-----------------------------------
معلومات الاتصال بالعميل:
- البريد الإلكتروني: ${customerEmail}
- رقم التليفون: ${phone}
- نوع طلب الدعم: ${supportTypeArabic}
                `.trim();

                const SERVICE_ID  = 'service_xn2ts7u';
                const TEMPLATE_ID = 'template_m847bbv'; // Support template

                emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                    to_email:       email,
                    from_name:      name,
                    name:           name,
                    title:          `🔧 طلب دعم فني جديد — ${supportTypeArabic}`,
                    phone:          phone,
                    service:        supportTypeArabic,
                    message:        details || 'لا توجد تفاصيل',
                    customer_email: customerEmail || 'غير محدد',
                    field_of_work:  'دعم فني',
                    province:       'غير محدد',
                    address:        'غير محدد',
                    email:          email,
                })
                .then(() => {
                    emailStep.innerHTML = `
                        <div class="order-success">
                            <div class="order-success__icon">✅</div>
                            <h3 class="order-success__title">تم إرسال طلب الدعم!</h3>
                            <p class="order-success__msg">وصل طلبك للدعم الفني على <strong>${email}</strong><br>هنرد عليك في أقرب وقت 🙌</p>
                        </div>`;
                    setTimeout(() => {
                        form.style.display = '';
                        emailStep.classList.remove('visible');
                        emailStep.innerHTML = originalEmailStepHTML;
                        form.reset();
                        // Reset other support type input display
                        const supportTypeOtherInput = document.getElementById('supportTypeOther');
                        if (supportTypeOtherInput) {
                            supportTypeOtherInput.style.display = 'none';
                            supportTypeOtherInput.removeAttribute('required');
                        }
                        supportData = {};
                        closeModal();
                        rebindEmailChoices();
                    }, 2800);
                })
                .catch((err) => {
                    console.error('EmailJS support error:', err);
                    modal.querySelectorAll('.order-email-choice').forEach(b => { b.disabled = false; b.style.opacity = ''; });

                    const combinedDetails = `${details || 'لا توجد تفاصيل'}\n\n- البريد الإلكتروني للعميل: ${customerEmail}\n- نوع الطلب: ${supportTypeArabic}`;
                    emailStep.innerHTML = `
                        <div class="order-fallback">
                            <div class="order-fallback__icon">⚠️</div>
                            <h3 class="order-fallback__title">حدث خطأ في الإرسال</h3>
                            <p class="order-fallback__msg">برجاء التواصل معنا مباشرة على أحد الإيميلات دي:</p>
                            <div class="order-email-choices">
                                <button class="order-email-choice order-email-fallback-btn" data-name="${name}" data-phone="${phone}" data-service="دعم فني - ${supportTypeArabic}" data-details="${combinedDetails}" data-email="e.newgraphic@gmail.com">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                    e.newgraphic@gmail.com
                                </button>
                                <button class="order-email-choice order-email-fallback-btn" data-name="${name}" data-phone="${phone}" data-service="دعم فني - ${supportTypeArabic}" data-details="${combinedDetails}" data-email="graphicn249@gmail.com">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                    graphicn249@gmail.com
                                </button>
                            </div>
                            <button class="order-email-back" id="supportFallbackBack">← رجوع</button>
                        </div>`;

                    modal.querySelectorAll('.order-email-fallback-btn').forEach(fBtn => {
                        fBtn.addEventListener('click', () => {
                            const e       = fBtn.dataset.email;
                            const n       = fBtn.dataset.name;
                            const p       = fBtn.dataset.phone;
                            const s       = fBtn.dataset.service;
                            const d       = fBtn.dataset.details;
                            const subject = encodeURIComponent(`طلب دعم فني من ${n} — ${s}`);
                            const body    = encodeURIComponent(`الاسم: ${n}\nرقم التليفون: ${p}\nنوع الطلب: ${s}\nتفاصيل الرسالة:\n${d}`);
                            window.open(`https://mail.google.com/mail/?view=cm&to=${e}&su=${subject}&body=${body}`, '_blank');
                        });
                    });

                    document.getElementById('supportFallbackBack')?.addEventListener('click', () => {
                        emailStep.classList.remove('visible');
                        emailStep.innerHTML = originalEmailStepHTML;
                        form.style.display = '';
                        rebindEmailChoices();
                    });
                });
            });
        });
    }

    bindEmailChoiceEvents();

    const backBtn = document.getElementById('supportEmailBack');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            emailStep.classList.remove('visible');
            form.style.display = '';
        });
    }

    const originalEmailStepHTML = emailStep.innerHTML;

    function rebindEmailChoices() {
        bindEmailChoiceEvents();
    }
}

/* ================================================================
   COMPLAINTS & SUGGESTIONS FORM
   ================================================================ */
function initComplaintsForm() {
    const modal      = document.getElementById('complaintsModal');
    const closeBtn   = document.getElementById('complaintsModalClose');
    const navBtn     = document.getElementById('navComplaintsBtn');
    const mobileBtn  = document.getElementById('mobileComplaintsBtn');
    const footerBtn  = document.getElementById('footerComplaintsBtn');
    const form       = document.getElementById('complaintsForm');
    const emailStep  = document.getElementById('complaintsEmailStep');

    if (!modal) return;

    function openModal() {
        if (typeof loadPersistentFormFields === 'function') loadPersistentFormFields();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (navBtn) navBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    if (mobileBtn) mobileBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    if (footerBtn) footerBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    if (!form) return;

    // Toggle other complaints type input
    const complaintsTypeSelect = document.getElementById('complaintsType');
    const complaintsTypeOtherInput = document.getElementById('complaintsTypeOther');
    if (complaintsTypeSelect && complaintsTypeOtherInput) {
        complaintsTypeSelect.addEventListener('change', (e) => {
            if (e.target.value === 'other') {
                complaintsTypeOtherInput.style.display = 'block';
                complaintsTypeOtherInput.setAttribute('required', 'required');
            } else {
                complaintsTypeOtherInput.style.display = 'none';
                complaintsTypeOtherInput.removeAttribute('required');
                complaintsTypeOtherInput.value = '';
            }
        });
    }

    let complaintsData = {};

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name          = document.getElementById('complaintsName').value.trim();
        const phone         = document.getElementById('complaintsPhone').value.trim();
        const customerEmail = document.getElementById('complaintsEmailInput').value.trim();
        const complaintsType = document.getElementById('complaintsType').value;
        const details       = document.getElementById('complaintsDetails').value.trim();

        let complaintsTypeArabic = 'عام';
        if (complaintsType === 'complaint') complaintsTypeArabic = 'تقديم شكوى';
        else if (complaintsType === 'suggestion') complaintsTypeArabic = 'تقديم اقتراح';
        else if (complaintsType === 'other') {
            const otherVal = document.getElementById('complaintsTypeOther').value.trim();
            complaintsTypeArabic = otherVal ? otherVal : 'أخرى';
        }

        if (!name || !phone || !customerEmail) return;

        complaintsData = { name, phone, customerEmail, complaintsTypeArabic, details };

        form.style.display = 'none';
        emailStep.classList.add('visible');
    });

    // Email choice buttons
    function bindEmailChoiceEvents() {
        modal.querySelectorAll('.order-email-choice').forEach(btn => {
            btn.addEventListener('click', () => {
                const email = btn.dataset.email;
                const { name, phone, customerEmail, complaintsTypeArabic, details } = complaintsData;

                modal.querySelectorAll('.order-email-choice').forEach(b => { b.disabled = true; b.style.opacity = '0.5'; });

                // Construct message
                const combinedMessage = `
تفاصيل الشكوى أو الاقتراح:
${details || 'لا توجد تفاصيل إضافية'}

-----------------------------------
معلومات الاتصال:
- البريد الإلكتروني للعميل: ${customerEmail}
- رقم التليفون: ${phone}
- نوع الرسالة: ${complaintsTypeArabic}
                `.trim();

                const SERVICE_ID  = 'service_xn2ts7u';
                const TEMPLATE_ID = 'template_m847bbv'; // Use same template as support

                emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                    to_email:       email,
                    from_name:      name,
                    name:           name,
                    title:          `💬 شكوى أو اقتراح جديد — ${complaintsTypeArabic}`,
                    phone:          phone,
                    service:        complaintsTypeArabic,
                    message:        details || 'لا توجد تفاصيل',
                    customer_email: customerEmail || 'غير محدد',
                    field_of_work:  'إدارة / جودة',
                    province:       'غير محدد',
                    address:        'غير محدد',
                    email:          email,
                })
                .then(() => {
                    emailStep.innerHTML = `
                        <div class="order-success">
                            <div class="order-success__icon">✅</div>
                            <h3 class="order-success__title">تم إرسال الرسالة بنجاح!</h3>
                            <p class="order-success__msg">وصلت رسالتك للإدارة على <strong>${email}</strong><br>هنرد عليك في أقرب وقت 🙌</p>
                        </div>`;
                    setTimeout(() => {
                        form.style.display = '';
                        emailStep.classList.remove('visible');
                        emailStep.innerHTML = originalEmailStepHTML;
                        form.reset();
                        // Reset other complaints input
                        const complaintsTypeOtherInput = document.getElementById('complaintsTypeOther');
                        if (complaintsTypeOtherInput) {
                            complaintsTypeOtherInput.style.display = 'none';
                            complaintsTypeOtherInput.removeAttribute('required');
                        }
                        complaintsData = {};
                        closeModal();
                        rebindEmailChoices();
                    }, 2800);
                })
                .catch((err) => {
                    console.error('EmailJS complaints error:', err);
                    modal.querySelectorAll('.order-email-choice').forEach(b => { b.disabled = false; b.style.opacity = ''; });

                    const combinedDetails = `${details || 'لا توجد تفاصيل'}\n\n- البريد الإلكتروني للعميل: ${customerEmail}\n- نوع الرسالة: ${complaintsTypeArabic}`;
                    emailStep.innerHTML = `
                        <div class="order-fallback">
                            <div class="order-fallback__icon">⚠️</div>
                            <h3 class="order-fallback__title">حدث خطأ في الإرسال</h3>
                            <p class="order-fallback__msg">برجاء التواصل معنا مباشرة على أحد الإيميلات دي:</p>
                            <div class="order-email-choices">
                                <button class="order-email-choice order-email-fallback-btn" data-name="${name}" data-phone="${phone}" data-service="شكاوى واقتراحات - ${complaintsTypeArabic}" data-details="${combinedDetails}" data-email="e.newgraphic@gmail.com">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                    e.newgraphic@gmail.com
                                </button>
                                <button class="order-email-choice order-email-fallback-btn" data-name="${name}" data-phone="${phone}" data-service="شكاوى واقتراحات - ${complaintsTypeArabic}" data-details="${combinedDetails}" data-email="graphicn249@gmail.com">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                    graphicn249@gmail.com
                                </button>
                            </div>
                            <button class="order-email-back" id="complaintsFallbackBack">← رجوع</button>
                        </div>`;

                    modal.querySelectorAll('.order-email-fallback-btn').forEach(fBtn => {
                        fBtn.addEventListener('click', () => {
                            const e       = fBtn.dataset.email;
                            const n       = fBtn.dataset.name;
                            const p       = fBtn.dataset.phone;
                            const s       = fBtn.dataset.service;
                            const d       = fBtn.dataset.details;
                            const subject = encodeURIComponent(`رسالة إدارية من ${n} — ${s}`);
                            const body    = encodeURIComponent(`الاسم: ${n}\nرقم التليفون: ${p}\nنوع الرسالة: ${s}\nالتفاصيل:\n${d}`);
                            window.open(`https://mail.google.com/mail/?view=cm&to=${e}&su=${subject}&body=${body}`, '_blank');
                        });
                    });

                    document.getElementById('complaintsFallbackBack')?.addEventListener('click', () => {
                        emailStep.classList.remove('visible');
                        emailStep.innerHTML = originalEmailStepHTML;
                        form.style.display = '';
                        rebindEmailChoices();
                    });
                });
            });
        });
    }

    bindEmailChoiceEvents();

    const backBtn = document.getElementById('complaintsEmailBack');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            emailStep.classList.remove('visible');
            form.style.display = '';
        });
    }

    const originalEmailStepHTML = emailStep.innerHTML;

    function rebindEmailChoices() {
        bindEmailChoiceEvents();
    }
}

function initIdentityPage() {
    const identityPage = document.getElementById('identityPage');
    const closeBtn = document.getElementById('closeIdentityPage');
    const identityChoicesGrid = document.getElementById('identityChoicesGrid');
    const identityDetailView = document.getElementById('identityDetailView');
    const backToIdentityGrid = document.getElementById('backToIdentityGrid');
    const identityDetailTitle = document.getElementById('identityDetailTitle');
    const identityDetailDesc = document.getElementById('identityDetailDesc');
    const identityDownloadBtn = document.getElementById('identityDownloadBtn');
    const identityPagesContainer = document.getElementById('identityPagesContainer');
    const pageTransition = document.getElementById('pageTransition');

    const navIdentity = document.getElementById('navIdentity');
    const mobileNavIdentity = document.getElementById('mobileNavIdentity');
    const identityAssetVersion = '1.5.18';

    if (!identityPage) return;

    const identityClients = {
        arkan: {
            name_ar: 'Arkan',
            name_en: 'Arkan',
            desc_ar: 'تصميم الهوية البصرية المتكاملة والشعار ودليل الاستخدام لشركة أركان للتطوير العقاري والمقاولات.',
            desc_en: 'Full visual identity, logo design, and brand guidelines for Arkan Real Estate Development.',
            pdf: 'assets/pdf/arkan.pdf',
            color_primary: '#d4af37',
            color_secondary: '#1c352d',
            pages: 28,
            meta: {
                services_ar: 'تصميم الهوية البصرية والقرطاسية ودليل العلامة التجارية',
                services_en: 'Visual Identity, Stationery, & Brand Guidelines',
                year: '2025',
                sector_ar: 'التطوير العقاري والمقاولات',
                sector_en: 'Real Estate & Contracting'
            },
            layout: [
                { type: 'full-bleed', pages: [1] },
                { type: 'header', title_ar: 'دليل استخدام العلامة التجارية', title_en: 'Brand Guidelines', tag_ar: '01. البداية', tag_en: '01. INTRO' },
                { type: 'full-width', pages: [2] },
                { type: 'header', title_ar: 'مفهوم وبناء الشعار', title_en: 'Logo Concept & Grid', tag_ar: '02. الشعار', tag_en: '02. LOGO' },
                { type: 'grid-2col', pages: [3, 4] },
                { type: 'grid-2col', pages: [5, 6] },
                { type: 'grid-2col', pages: [7, 8] },
                { type: 'grid-2col', pages: [9, 10] },
                { type: 'header', title_ar: 'الألوان والخطوط الرسمية', title_en: 'Color Palette & Typography', tag_ar: '03. العناصر', tag_en: '03. SYSTEM' },
                { type: 'grid-2col', pages: [11, 12] },
                { type: 'grid-2col', pages: [13, 14] },
                { type: 'header', title_ar: 'الأنماط والخلفيات الفنية', title_en: 'Brand Patterns & Graphics', tag_ar: '04. الأنماط', tag_en: '04. PATTERNS' },
                { type: 'grid-2col', pages: [15, 16] },
                { type: 'header', title_ar: 'تطبيقات القرطاسية والمراسلات', title_en: 'Stationery & Correspondence', tag_ar: '05. التطبيقات', tag_en: '05. STATIONERY' },
                { type: 'grid-2col-tilted', pages: [17, 18] },
                { type: 'grid-2col-tilted', pages: [19, 20] },
                { type: 'grid-2col-tilted', pages: [21, 22] },
                { type: 'grid-2col-tilted', pages: [23, 24] },
                { type: 'header', title_ar: 'وسائل النقل والدعاية الخارجية', title_en: 'Vehicles & Outdoor Signage', tag_ar: '06. الدعاية واللوحات', tag_en: '06. SIGNAGE' },
                { type: 'grid-2col', pages: [25, 26] },
                { type: 'full-width', pages: [27] },
                { type: 'full-bleed', pages: [28] }
            ]
        },
        emar_rk: {
            name_ar: 'Emar rk',
            name_en: 'Emar rk',
            desc_ar: 'تصميم الهوية البصرية، الشعار، ودليل العلامة التجارية لشركة Emar rk.',
            desc_en: 'Visual identity, logo design, and brand guidelines for Emar rk.',
            pdf: '',
            color_primary: '#0a633d',
            color_secondary: '#1c352d',
            pages: 7,
            meta: {
                services_ar: 'تصميم الهوية البصرية',
                services_en: 'Visual Identity',
                year: '2026',
                sector_ar: 'التطوير العقاري',
                sector_en: 'Real Estate'
            },
            layout: [
                { type: 'full-width', pages: [1, 2, 3, 4, 5, 6, 7] }
            ]
        },
        velora: {
            name_ar: 'Velora',
            name_en: 'Velora',
            desc_ar: 'تصميم شعار ومفهوم العلامة التجارية وتطبيق الهوية لمشروع فيلورا ريزيدنس.',
            desc_en: 'Logo design, branding concepts, and identity application for Velora Residence.',
            pdf: 'assets/pdf/velora.pdf',
            color_primary: '#8a2be2',
            color_secondary: '#ff69b4',
            pages: 2,
            meta: {
                services_ar: 'تصميم الشعار والهوية البصرية',
                services_en: 'Logo Design & Visual Identity',
                year: '2026',
                sector_ar: 'السكن الراقي / التطوير العقاري',
                sector_en: 'Luxury Housing & Real Estate'
            },
            layout: [
                { type: 'full-bleed', pages: [1] },
                { type: 'header', title_ar: 'تطبيقات الشعار والهوية', title_en: 'Identity Applications', tag_ar: '01. الشعار والبطاقات', tag_en: '01. LOGO & CARDS' },
                { type: 'full-bleed', pages: [2] }
            ]
        },
        elite_gym: {
            name_ar: 'Elite Gym',
            name_en: 'Elite Gym',
            desc_ar: 'تصميم الشعار وتطبيق الهوية البصرية المتكاملة للمطبوعات ووسائل التواصل الاجتماعي لـ Elite Gym.',
            desc_en: 'Branding and full visual identity application for Elite Gym prints and social assets.',
            pdf: 'assets/pdf/elite_gym.pdf',
            color_primary: '#ff3b30',
            color_secondary: '#ffcc00',
            pages: 1,
            meta: {
                services_ar: 'تصميم الشعار وهوية العلامة التجارية',
                services_en: 'Logo Design & Brand Identity',
                year: '2025',
                sector_ar: 'الصحة والرياضة',
                sector_en: 'Health & Fitness'
            },
            layout: [
                { type: 'full-bleed', pages: [1] }
            ]
        },
        nile: {
            name_ar: 'Nile',
            name_en: 'Nile',
            desc_ar: 'الهوية البصرية المتكاملة وتصميم الكتيب والقرطاسية والشعارات لمدارس النيل الدولية.',
            desc_en: 'Brand identity, booklet layout, stationary design, and guidelines for Nile International Schools.',
            pdf: 'assets/pdf/nile.pdf',
            color_primary: '#1a3aff',
            color_secondary: '#f5a623',
            pages: 14,
            meta: {
                services_ar: 'تصميم الهوية البصرية والكتب الإرشادية والزي المدرسي',
                services_en: 'Visual Identity, Brand Manuals & Uniforms',
                year: '2025',
                sector_ar: 'التعليم والمدارس الدولية',
                sector_en: 'Education & International Schools'
            },
            layout: [
                { type: 'full-bleed', pages: [1] },
                { type: 'header', title_ar: 'الرؤية وفلسفة الشعار', title_en: 'Brand Vision & Logo Philosophy', tag_ar: '01. الشعار', tag_en: '01. CONCEPT' },
                { type: 'full-width', pages: [2] },
                { type: 'grid-2col', pages: [3, 4] },
                { type: 'header', title_ar: 'نظم الألوان والخطوط الرسمية', title_en: 'Color Systems & Typography', tag_ar: '02. النظم البصرية', tag_en: '02. SYSTEM' },
                { type: 'grid-2col', pages: [5, 6] },
                { type: 'header', title_ar: 'المطبوعات والأوراق الرسمية', title_en: 'Official Stationery & Printables', tag_ar: '03. تطبيقات المطبوعات', tag_en: '03. STATIONERY' },
                { type: 'grid-2col-tilted', pages: [7, 8] },
                { type: 'header', title_ar: 'الزي المدرسي وبطاقات التعريف', title_en: 'School Uniforms & Identification Cards', tag_ar: '04. الزي والبطاقات', tag_en: '04. UNIFORMS' },
                { type: 'grid-2col-tilted', pages: [9, 10] },
                { type: 'header', title_ar: 'الإعلانات الخارجية وتصميم الحافلات', title_en: 'Outdoor Banners & Bus Branding', tag_ar: '05. الدعاية والنقل', tag_en: '05. VEHICLES' },
                { type: 'grid-2col-tilted', pages: [11, 12] },
                { type: 'full-width', pages: [13] },
                { type: 'full-bleed', pages: [14] }
            ]
        },
        german_saudi: {
            name_ar: 'German Saudi',
            name_en: 'German Saudi',
            desc_ar: 'تصميم الشعار وتطبيقات الهوية البصرية المتكاملة للمؤسسة الطبية الألمانية السعودية.',
            desc_en: 'Logo design and full visual identity applications for German Saudi Medical Institution.',
            pdf: 'assets/pdf-pages/german_saudi/page-1.jpg',
            color_primary: '#0a3570',
            color_secondary: '#d2143a',
            pages: 11,
            meta: {
                services_ar: 'تصميم الشعار وتطبيقات الهوية البصرية واللوحات',
                services_en: 'Logo Design, Identity Applications & Signage',
                year: '2025',
                sector_ar: 'الخدمات الطبية والرعاية الصحية',
                sector_en: 'Medical Services & Healthcare'
            },
            layout: [
                { type: 'full-bleed', pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }
            ]
        },
        promise_mall: {
            name_ar: 'Promise Mall',
            name_en: 'Promise Mall',
            desc_ar: 'تصميم الهوية البصرية التجارية واللوحات الإعلانية الخارجية لمجمع بروميس مول التجاري.',
            desc_en: 'Commercial brand identity and outdoor signage design for Promise Mall.',
            pdf: 'assets/pdf/promise_mall.pdf',
            color_primary: '#8b1e4f',
            color_secondary: '#c89d55',
            pages: 1,
            meta: {
                services_ar: 'تصميم الهوية التجارية والمطبوعات واللوحات الإعلانية',
                services_en: 'Brand Identity, Stationery & Signage Design',
                year: '2026',
                sector_ar: 'المراكز التجارية والترفيهية',
                sector_en: 'Shopping Malls & Entertainment'
            },
            layout: [
                { type: 'full-bleed', pages: [1] }
            ]
        }
    };

    // Trigger page transition
    const triggerTransition = (callback) => {
        if (isMobileFastView()) {
            if (callback) callback();
            return;
        }
        if (!pageTransition) { if (callback) callback(); return; }
        pageTransition.classList.add('active');
        setTimeout(() => { if (callback) callback(); }, 700);
        setTimeout(() => { pageTransition.classList.remove('active'); }, 1400);
    };

    const openPage = (directClientKey = null) => {
        if (identityPage.classList.contains('active')) {
            if (directClientKey) {
                showClientDetails(directClientKey);
            } else {
                resetView();
            }
            return;
        }
        triggerTransition(() => {
            identityPage.classList.add('active');
            document.body.style.overflow = 'hidden';
            resetView();
            if (directClientKey) showClientDetails(directClientKey);
        });
    };

    const closePage = (skipHash) => {
        if (!identityPage.classList.contains('active')) return;
        const shouldClearHash = skipHash !== true;
        triggerTransition(() => {
            identityPage.classList.remove('active');
            document.body.style.overflow = '';
            resetView();
            if (shouldClearHash) {
                window.history.replaceState(null, '', window.location.pathname);
            }
        });
    };

    function resetView() {
        identityDetailView.style.display = 'none';
        identityChoicesGrid.style.display = 'block';
        identityChoicesGrid.style.opacity = '1';
        identityPagesContainer.innerHTML = '';
        identityPage.classList.remove('detail-active');
        delete identityPage.dataset.identityClient;
    }

    function showClientDetails(clientKey) {
        const client = identityClients[clientKey];
        if (!client) return;

        identityPage.classList.add('detail-active');
        identityPage.dataset.identityClient = clientKey;

        const lang = document.documentElement.lang || 'ar';
        if (identityDetailTitle) identityDetailTitle.textContent = lang === 'ar' ? client.name_ar : client.name_en;
        if (identityDetailDesc) identityDetailDesc.textContent = lang === 'ar' ? client.desc_ar : client.desc_en;
        if (identityDownloadBtn) identityDownloadBtn.href = client.pdf;

        // Set brand theme colors dynamically for motion graphics background
        if (identityDetailView) {
            identityDetailView.style.setProperty('--brand-primary', client.color_primary || '#f5a623');
            identityDetailView.style.setProperty('--brand-secondary', client.color_secondary || '#1a3aff');
        }


        // Generate pages according to layout config
        identityPagesContainer.innerHTML = '';
        if (client.layout && client.layout.length > 0) {
            client.layout.forEach(block => {
                if (block.type === 'header') {
                    // Render Section Header Block
                    const headerBlock = document.createElement('div');
                    headerBlock.className = 'identity-page-block identity-page-block--header';
                    
                    const tag = document.createElement('span');
                    tag.className = 'gallery-section-tag';
                    tag.textContent = lang === 'ar' ? block.tag_ar : block.tag_en;
                    
                    const title = document.createElement('h4');
                    title.className = 'gallery-section-title';
                    title.textContent = lang === 'ar' ? block.title_ar : block.title_en;
                    
                    headerBlock.appendChild(tag);
                    headerBlock.appendChild(title);
                    identityPagesContainer.appendChild(headerBlock);
                } else {
                    // Render Image Block (full-bleed, grid-2col, full-width, grid-2col-tilted)
                    const imgBlock = document.createElement('div');
                    imgBlock.className = `identity-page-block identity-page-block--${block.type.replace('-tilted', '')}`;
                    if (block.type === 'grid-2col-tilted') {
                        imgBlock.className = 'identity-page-block identity-page-block--grid-2col-tilted';
                    }
                    
                    block.pages.forEach((pageNum, index) => {
                        const wrapper = document.createElement('div');
                        wrapper.className = 'identity-page-wrapper';
                        
                        const img = document.createElement('img');
                        img.src = `assets/pdf-pages/${clientKey}/page-${pageNum}.jpg?v=${identityAssetVersion}`;
                        if (block.type === 'grid-2col-tilted') {
                            img.className = `identity-page-img ${index % 2 === 0 ? 'identity-page-img--tilted-left' : 'identity-page-img--tilted-right'}`;
                        } else {
                            img.className = 'identity-page-img';
                        }
                        img.alt = `${lang === 'ar' ? client.name_ar : client.name_en} - Page ${pageNum}`;
                        img.loading = 'lazy';
                        img.decoding = 'async';
                        img.fetchPriority = pageNum === 1 ? 'high' : 'low';
                        
                        wrapper.appendChild(img);
                        imgBlock.appendChild(wrapper);
                    });
                    
                    identityPagesContainer.appendChild(imgBlock);
                }
            });
        } else {
            // Fallback to simple list if no layout config
            for (let i = 1; i <= client.pages; i++) {
                const imgBlock = document.createElement('div');
                imgBlock.className = 'identity-page-block identity-page-block--full-width';
                
                const wrapper = document.createElement('div');
                wrapper.className = 'identity-page-wrapper';
                
                const img = document.createElement('img');
                img.src = `assets/pdf-pages/${clientKey}/page-${i}.jpg?v=${identityAssetVersion}`;
                img.className = 'identity-page-img';
                img.alt = `${lang === 'ar' ? client.name_ar : client.name_en} - Page ${i}`;
                img.loading = 'lazy';
                img.decoding = 'async';
                img.fetchPriority = i === 1 ? 'high' : 'low';
                
                wrapper.appendChild(img);
                imgBlock.appendChild(wrapper);
                identityPagesContainer.appendChild(imgBlock);
            }
        }

        if (isMobileFastView() || !('IntersectionObserver' in window)) {
            identityPagesContainer.querySelectorAll('.identity-page-wrapper').forEach(w => w.classList.add('revealed'));
        } else {
            // Setup IntersectionObserver for premium scroll reveal
            const pageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        pageObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

            identityPagesContainer.querySelectorAll('.identity-page-wrapper').forEach(w => pageObserver.observe(w));
        }

        // Hide grid, show detail view
        identityChoicesGrid.style.display = 'none';
        identityDetailView.style.display = 'block';
        
        // Scroll detail view container to top
        identityPage.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Set up click handlers on choice cards
    const cards = identityChoicesGrid.querySelectorAll('.choice-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const clientKey = card.dataset.identityClient;
            if (clientKey) {
                window.location.hash = 'identity-' + clientKey;
            }
        });
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => closePage());
    }

    // Back button inside details
    if (backToIdentityGrid) {
        backToIdentityGrid.addEventListener('click', () => {
            window.HashTracker.goBack("identity");
        });
    }

    // Navbar desktop click
    if (navIdentity) {
        navIdentity.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.hash = "identity";
        });
    }

    // Navbar mobile click
    if (mobileNavIdentity) {
        mobileNavIdentity.addEventListener('click', (e) => {
            e.preventDefault();
            // Close mobile menu
            const toggle = document.getElementById('menuToggle');
            const mobileMenu = document.getElementById('mobileMenu');
            if (toggle) toggle.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            setTimeout(() => {
                window.location.hash = "identity";
            }, 300);
        });
    }

    // Hash routing
    function handleHash() {
        const hash = window.location.hash;
        if (hash === '#identity') {
            openPage();
        } else if (hash.startsWith('#identity-')) {
            const clientKey = hash.replace('#identity-', '');
            if (identityClients[clientKey]) {
                openPage(clientKey);
            } else {
                closePage();
            }
        } else {
            if (identityPage.classList.contains('active') && !hash.startsWith('#clients') && !hash.startsWith('#social')) {
                closePage(true);
            }
        }
    }

    window.addEventListener('hashchange', handleHash);
    
    // Initial check
    setTimeout(handleHash, 2800);

    // Escape key handling
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && identityPage.classList.contains('active')) {
            closePage();
        }
    });

    // Handle translation update
    window.refreshIdentityTranslations = () => {
        if (identityPage.classList.contains('active')) {
            const hash = window.location.hash;
            if (hash.startsWith('#identity-')) {
                const clientKey = hash.replace('#identity-', '');
                showClientDetails(clientKey);
            }
        }
    };
}

/* ===================================================================
   FORM MEMORY PERSISTENCE (LOCALSTORAGE)
   =================================================================== */
function loadPersistentFormFields() {
    const name = localStorage.getItem('customer_name') || '';
    const phone = localStorage.getItem('customer_phone') || '';
    const email = localStorage.getItem('customer_email') || '';

    // Order form fields
    const orderName = document.getElementById('orderName');
    const orderPhone = document.getElementById('orderPhone');
    const orderEmailInput = document.getElementById('orderEmailInput');
    if (orderName) orderName.value = name;
    if (orderPhone) orderPhone.value = phone;
    if (orderEmailInput) orderEmailInput.value = email;

    const orderFieldOfWork = document.getElementById('orderFieldOfWork');
    const orderProvince = document.getElementById('orderProvince');
    const orderProvinceOther = document.getElementById('orderProvinceOther');
    const orderAddressManual = document.getElementById('orderAddressManual');
    const orderAddressMapUrl = document.getElementById('orderAddressMapUrl');
    const orderAddressMapNotes = document.getElementById('orderAddressMapNotes');

    if (orderFieldOfWork) orderFieldOfWork.value = localStorage.getItem('order_field_of_work') || '';
    
    const savedProvince = localStorage.getItem('order_province') || '';
    if (orderProvince) {
        orderProvince.value = savedProvince;
        if (savedProvince === 'other' && orderProvinceOther) {
            orderProvinceOther.value = localStorage.getItem('order_province_other') || '';
            orderProvinceOther.style.display = 'block';
            orderProvinceOther.setAttribute('required', 'required');
        } else if (orderProvinceOther) {
            orderProvinceOther.style.display = 'none';
            orderProvinceOther.removeAttribute('required');
        }
    }
    
    if (orderAddressManual) orderAddressManual.value = localStorage.getItem('order_address_manual') || '';
    if (orderAddressMapUrl) orderAddressMapUrl.value = localStorage.getItem('order_address_map_url') || '';
    if (orderAddressMapNotes) orderAddressMapNotes.value = localStorage.getItem('order_address_map_notes') || '';

    const savedAddressType = localStorage.getItem('order_address_type') || 'manual';
    const addressRadios = document.querySelectorAll('input[name="address_type"]');
    const manualContainer = document.getElementById('addressManualContainer');
    const mapContainer = document.getElementById('addressMapContainer');
    
    addressRadios.forEach(radio => {
        if (radio.value === savedAddressType) {
            radio.checked = true;
            // Trigger container display updates manually
            if (savedAddressType === 'manual') {
                if (manualContainer) manualContainer.style.display = 'block';
                if (mapContainer) mapContainer.style.display = 'none';
                if (orderAddressManual) orderAddressManual.setAttribute('required', 'required');
                if (orderAddressMapUrl) orderAddressMapUrl.removeAttribute('required');
            } else {
                if (manualContainer) manualContainer.style.display = 'none';
                if (mapContainer) mapContainer.style.display = 'block';
                if (orderAddressManual) orderAddressManual.removeAttribute('required');
                if (orderAddressMapUrl) orderAddressMapUrl.setAttribute('required', 'required');
            }
            // Trigger radio styling change
            addressRadios.forEach(r => {
                const parent = r.parentElement;
                if (parent) {
                    if (r.checked) {
                        parent.style.borderColor = 'var(--orange)';
                        parent.style.backgroundColor = 'rgba(245, 166, 35, 0.08)';
                    } else {
                        parent.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        parent.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }
                }
            });
        }
    });

    // Support form fields
    const supportName = document.getElementById('supportName');
    const supportPhone = document.getElementById('supportPhone');
    const supportEmailInput = document.getElementById('supportEmailInput');
    if (supportName) supportName.value = name;
    if (supportPhone) supportPhone.value = phone;
    if (supportEmailInput) supportEmailInput.value = email;

    // Complaints form fields
    const complaintsName = document.getElementById('complaintsName');
    const complaintsPhone = document.getElementById('complaintsPhone');
    const complaintsEmailInput = document.getElementById('complaintsEmailInput');
    if (complaintsName) complaintsName.value = name;
    if (complaintsPhone) complaintsPhone.value = phone;
    if (complaintsEmailInput) complaintsEmailInput.value = email;
}

function initFormMemory() {
    // Shared Customer Identity Sync
    const nameInputs = [
        document.getElementById('orderName'),
        document.getElementById('supportName'),
        document.getElementById('complaintsName')
    ];
    const phoneInputs = [
        document.getElementById('orderPhone'),
        document.getElementById('supportPhone'),
        document.getElementById('complaintsPhone')
    ];
    const emailInputs = [
        document.getElementById('orderEmailInput'),
        document.getElementById('supportEmailInput'),
        document.getElementById('complaintsEmailInput')
    ];

    nameInputs.forEach(el => {
        if (!el) return;
        el.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            localStorage.setItem('customer_name', val);
            nameInputs.forEach(other => {
                if (other && other !== el) other.value = e.target.value;
            });
        });
    });

    phoneInputs.forEach(el => {
        if (!el) return;
        el.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            localStorage.setItem('customer_phone', val);
            phoneInputs.forEach(other => {
                if (other && other !== el) other.value = e.target.value;
            });
        });
    });

    emailInputs.forEach(el => {
        if (!el) return;
        el.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            localStorage.setItem('customer_email', val);
            emailInputs.forEach(other => {
                if (other && other !== el) other.value = e.target.value;
            });
        });
    });

    // Order specific fields
    const orderFieldOfWork = document.getElementById('orderFieldOfWork');
    if (orderFieldOfWork) {
        orderFieldOfWork.addEventListener('input', (e) => {
            localStorage.setItem('order_field_of_work', e.target.value.trim());
        });
    }

    const orderProvince = document.getElementById('orderProvince');
    if (orderProvince) {
        orderProvince.addEventListener('change', (e) => {
            localStorage.setItem('order_province', e.target.value);
        });
    }

    const orderProvinceOther = document.getElementById('orderProvinceOther');
    if (orderProvinceOther) {
        orderProvinceOther.addEventListener('input', (e) => {
            localStorage.setItem('order_province_other', e.target.value.trim());
        });
    }

    const addressRadios = document.querySelectorAll('input[name="address_type"]');
    addressRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                localStorage.setItem('order_address_type', e.target.value);
            }
        });
    });

    const orderAddressManual = document.getElementById('orderAddressManual');
    if (orderAddressManual) {
        orderAddressManual.addEventListener('input', (e) => {
            localStorage.setItem('order_address_manual', e.target.value.trim());
        });
    }

    const orderAddressMapUrl = document.getElementById('orderAddressMapUrl');
    if (orderAddressMapUrl) {
        orderAddressMapUrl.addEventListener('input', (e) => {
            localStorage.setItem('order_address_map_url', e.target.value.trim());
        });
    }

    const orderAddressMapNotes = document.getElementById('orderAddressMapNotes');
    if (orderAddressMapNotes) {
        orderAddressMapNotes.addEventListener('input', (e) => {
            localStorage.setItem('order_address_map_notes', e.target.value.trim());
        });
    }

    // Populate initial values
    loadPersistentFormFields();
}
