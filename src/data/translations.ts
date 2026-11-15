export type Language = 'en' | 'th';

export interface Translations {
  nav: {
    overview: string;
    philosophy: string;
    servertools: string;
    signIn: string;
    settings: string;
    copyGamertag: string;
    copied: string;
    soundOn: string;
    soundOff: string;
    ambientDrone: string;
    tagline: string;
  };
  hero: {
    systemOnline: string;
    openSourceUtility: string;
    zeroBloat: string;
    xboxGamertag: string;
    subtitle: string;
    bio: string;
    explorePhilosophy: string;
    signInPortal: string;
    verified: string;
    gamertagLabel: string;
    philosophyLabel: string;
    philosophyValue: string;
    methodologyLabel: string;
    methodologyValue: string;
    projectLabel: string;
    projectValue: string;
    quote: string;
    stats: {
      repos: string;
      reposVal: string;
      lines: string;
      linesVal: string;
      packages: string;
      packagesVal: string;
      uptime: string;
      uptimeVal: string;
    };
  };
  philosophy: {
    sectionTag: string;
    title: string;
    subhead: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar1Principle: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar2Principle: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar3Principle: string;
    calcTitle: string;
    calcDesc: string;
    toolFormatting: string;
    toolState: string;
    toolDiff: string;
    toolTerminal: string;
    calcStandard: string;
    calcMinimalist: string;
    calcEliminated: string;
    stdAbbrev: string;
    mcAbbrev: string;
  };
  servertools: {
    sectionTag: string;
    title: string;
    subhead: string;
    comingSoon: string;
    wipBadge: string;
    moreInfo: string;
    economyTitle: string;
    economyDesc: string;
    tpaTitle: string;
    tpaDesc: string;
    rtpTitle: string;
    rtpDesc: string;
    shopTitle: string;
    shopDesc: string;
    footerNote: string;
    previewDetails: string;
    modalTitle: string;
    modalDesc: string;
    modalCancel: string;
    modalProceed: string;
  };
  settings: {
    title: string;
    subtitle: string;
    liquidGlassTitle: string;
    liquidGlassDesc: string;
    liquidGlassActive: string;
    liquidGlassOff: string;
    animationsTitle: string;
    animationsDesc: string;
    animationsActive: string;
    animationsOff: string;
    languageTitle: string;
    languageDesc: string;
    themeTitle: string;
    themeDesc: string;
    switchThemeLight: string;
    switchThemeDark: string;
    previewTitle: string;
    restoreDefaults: string;
    done: string;
  };
  footer: {
    tagline: string;
    bio: string;
    settings: string;
    portal: string;
    top: string;
    anonymous: string;
    copyright: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      overview: 'Overview',
      philosophy: 'Process',
      servertools: 'ServerTools',
      signIn: 'Sign In',
      settings: 'Settings',
      copyGamertag: 'Copy Xbox Gamertag: MCrganMan',
      copied: 'Copied!',
      soundOn: 'Mute ambient coding drone',
      soundOff: 'Play ambient coding drone (432Hz)',
      ambientDrone: 'Ambient Drone (432Hz)',
      tagline: 'AI Coder',
    },
    hero: {
      systemOnline: 'SYSTEM ONLINE',
      openSourceUtility: 'OPEN SOURCE & UTILITY',
      zeroBloat: 'ZERO BLOAT',
      xboxGamertag: 'XBOX: MCRGANMAN',
      subtitle: 'Minimalist AI Coder',
      bio: 'I am an AI coder building open-source tools and stripped-down utilities with ruthless simplicity. No bloated dependencies, no convoluted abstractions, and zero vanity metrics. I focus purely on high-utility tools that solve real problems.',
      explorePhilosophy: 'Explore Vibe Methodology',
      signInPortal: 'Sign In Portal',
      verified: 'Verified',
      gamertagLabel: 'Gamertag',
      philosophyLabel: 'Philosophy',
      philosophyValue: 'Zero Bloat & Utility',
      methodologyLabel: 'Methodology',
      methodologyValue: 'Rapid AI Vibe Coding',
      projectLabel: 'Bedrock Project',
      projectValue: 'ServerTools',
      quote: '"Pruning 10,000 lines of boilerplate down to pure, functional Minecraft & web utilities."',
      stats: {
        repos: 'CORE REPOSITORIES',
        reposVal: '100% Focused',
        lines: 'LINE REDUCTION',
        linesVal: '-85%',
        packages: 'EXTERNAL PACKAGES',
        packagesVal: 'Zero Bloat',
        uptime: 'SYSTEM UPTIME',
        uptimeVal: '99.9%',
      },
    },
    philosophy: {
      sectionTag: '01 / Methodology & Focus / Utility First',
      title: 'The Philosophy of AI Vibe Coding & Minimalist Utility',
      subhead: '"I don\'t have a GitHub repository, but I use AI to vibe code (since I am lazy)." As an AI coder, embracing AI isn\'t an excuse for sloppy work; it\'s a weapon against modern web bloat and over-complication.',
      pillar1Title: '1. Intent-to-Architecture',
      pillar1Desc: 'Instead of spending days configuring complex build chains, I use AI to articulate precise functional requirements. The resulting tools are self-contained and perform exactly one job impeccably.',
      pillar1Principle: 'Principle: 1 Problem = 1 Clean Solution',
      pillar2Title: '2. The Dependency Diet',
      pillar2Desc: 'Why import a 400KB package with dozens of transitive dependencies just to debounce an input or sort keys? Standard browser and Node APIs already provide the foundational primitives.',
      pillar2Principle: 'Principle: Zero unnecessary packages',
      pillar3Title: '3. Pure Utility Delivery',
      pillar3Desc: 'No star-chasing on social platforms or maintaining PR queues. Utilities are released directly as copyable scripts, shell configs, and drop-in micro-modules that solve real problems immediately.',
      pillar3Principle: 'Principle: Functionality > Ceremony',
      calcTitle: 'Interactive Audit: AI Coder vs. Standard Packages',
      calcDesc: 'Select common developer capabilities to see the bundle weight saved by MCrganMan\'s minimalist approach.',
      toolFormatting: 'Data Cleaning & Formatting',
      toolState: 'State & Event Subscriptions',
      toolDiff: 'Text & Visual Diffing',
      toolTerminal: 'Process Monitoring CLI',
      calcStandard: 'Standard',
      calcMinimalist: 'Minimalist',
      calcEliminated: 'Network bandwidth & parse overhead eliminated',
      stdAbbrev: 'Std',
      mcAbbrev: 'MC',
    },
    servertools: {
      sectionTag: '02 / MINECRAFT BEDROCK ADD-ON / OFFICIAL RELEASE',
      title: 'ServerTools for Minecraft Bedrock',
      subhead: 'A dedicated suite of Minecraft Bedrock server add-ons and commands designed for high performance, zero lag, and instant setup. Actively in progress with more updates rolling out continuously.',
      comingSoon: 'RELEASED',
      wipBadge: 'ACTIVE W.I.P · MORE UPDATES',
      moreInfo: 'More Info',
      economyTitle: 'Economy System',
      economyDesc: 'Complete currency engine with player balances, transactions, and scoreboard integration.',
      tpaTitle: 'Teleport Request',
      tpaDesc: 'Fast /tpa system with timed accept, deny, and cancellation safeguards.',
      rtpTitle: 'Random Teleport',
      rtpDesc: 'Safe wilderness spawning with ocean/lava avoidance algorithm and custom cooldowns.',
      shopTitle: 'GUI Server Shop',
      shopDesc: 'Clean form-based buy and sell menu for blocks, ores, tools, and consumables.',
      footerNote: 'Actively in progress · More Bedrock tools & updates arriving regularly',
      previewDetails: 'Preview destination details →',
      modalTitle: 'You are now leaving the portfolio',
      modalDesc: 'You are about to navigate to the official ServerTools documentation & deployment site:',
      modalCancel: 'Cancel',
      modalProceed: 'Continue to ServerTools',
    },
    settings: {
      title: 'Experience Settings',
      subtitle: 'Configure visual styling, language & motion physics',
      liquidGlassTitle: 'Liquid Glass Mode',
      liquidGlassDesc: 'Enables ultra-clear fluid refraction, dynamic backdrop blur, specular edge reflections, and translucent frosted layering across all cards and navigation.',
      liquidGlassActive: 'Active',
      liquidGlassOff: 'Off',
      animationsTitle: 'UI Animations & Motion',
      animationsDesc: 'Enables smooth micro-interactions, float states, glowing pulses, and spring transitions. Turn off for reduced motion and instant UI responses.',
      animationsActive: 'Smooth 60FPS',
      animationsOff: 'Static (Instant)',
      languageTitle: 'Language (ภาษา)',
      languageDesc: 'Choose your preferred language. Supports English and ภาษาไทย.',
      themeTitle: 'Appearance Theme',
      themeDesc: 'Currently set to',
      switchThemeLight: 'Switch to Light',
      switchThemeDark: 'Switch to Dark',
      previewTitle: 'Real-Time Style Preview',
      restoreDefaults: 'Restore Defaults',
      done: 'Done',
    },
    footer: {
      tagline: 'Minimalist AI Coder',
      bio: 'AI vibe-coded utilities and architecture. Built with liquid glass design principles and zero bloat.',
      settings: 'Settings',
      portal: 'Portal',
      top: 'Top',
      anonymous: 'Anonymous Identity Intact · Zero Trackers',
      copyright: '© 2026 MCrganMan.',
    },
  },
  th: {
    nav: {
      overview: 'ภาพรวม',
      philosophy: 'ปรัชญาการทำงาน',
      servertools: 'ServerTools',
      signIn: 'เข้าสู่ระบบ',
      settings: 'ตั้งค่า',
      copyGamertag: 'คัดลอกเกมเมอร์แท็ก Xbox: MCrganMan',
      copied: 'คัดลอกแล้ว!',
      soundOn: 'ปิดเสียงบรรยากาศการโค้ด',
      soundOff: 'เปิดเสียงบรรยากาศการโค้ด (432Hz)',
      ambientDrone: 'เสียงบรรยากาศ Ambient (432Hz)',
      tagline: 'โปรแกรมเมอร์ AI สไตล์มินิมอล',
    },
    hero: {
      systemOnline: 'ระบบออนไลน์',
      openSourceUtility: 'โอเพนซอร์ส & ยูทิลิตี้',
      zeroBloat: 'ไร้สิ่งรกรุงรัง',
      xboxGamertag: 'XBOX: MCRGANMAN',
      subtitle: 'โปรแกรมเมอร์ AI สไตล์มินิมอล',
      bio: 'ฉันเป็นโปรแกรมเมอร์ AI ที่สร้างเครื่องมือโอเพนซอร์สและยูทิลิตี้แบบเรียบง่ายไร้สิ่งรกรุงรัง ไม่พึ่งพา dependency ที่ไม่จำเป็น ไม่ซับซ้อนเกินควร และไม่มีตัวชี้วัดไร้สาระ มุ่งเน้นสร้างเครื่องมือที่มีประโยชน์สูงเพื่อแก้ปัญหาจริง',
      explorePhilosophy: 'สำรวจปรัชญา Vibe Coding',
      signInPortal: 'เข้าสู่ระบบพอร์ทัล',
      verified: 'ยืนยันแล้ว',
      gamertagLabel: 'เกมเมอร์แท็ก',
      philosophyLabel: 'ปรัชญา',
      philosophyValue: 'ไร้ส่วนเกิน & เน้นประโยชน์จริง',
      methodologyLabel: 'ระเบียบวิธี',
      methodologyValue: 'การเขียนโค้ดด้วย AI รวดเร็วทันใจ',
      projectLabel: 'โปรเจกต์ Bedrock',
      projectValue: 'ServerTools',
      quote: '"ตัดโค้ด boilerplate นับหมื่นบรรทัด ให้เหลือเพียงยูทิลิตี้ Minecraft และเว็บที่ทำงานได้จริงอย่างหมดจด"',
      stats: {
        repos: 'คลังโค้ดหลัก',
        reposVal: 'เน้นเฉพาะทาง 100%',
        lines: 'ลดบรรทัดโค้ด',
        linesVal: '-85%',
        packages: 'แพ็กเกจภายนอก',
        packagesVal: 'ไร้ส่วนเกิน',
        uptime: 'ความพร้อมระบบ',
        uptimeVal: '99.9%',
      },
    },
    philosophy: {
      sectionTag: '01 / ระเบียบวิธี & เป้าหมาย / เน้นประโยชน์จริง',
      title: 'ปรัชญาของ AI Vibe Coding & ยูทิลิตี้สไตล์มินิมอล',
      subhead: '"ฉันไม่มีคลังเก็บโค้ดบน GitHub แต่ใช้ AI ในการ vibe code (เพราะฉันขี้เกียจ)" ในฐานะ AI coder การใช้ AI ไม่ใช่ข้ออ้างในการทำงานชุ่ย แต่เป็นอาวุธต่อกรกับความบวมและความซับซ้อนเกินจำเป็นของเว็บยุคใหม่',
      pillar1Title: '1. จากเจตนาสู่สถาปัตยกรรม',
      pillar1Desc: 'แทนที่จะเสียเวลาหลายวันตั้งค่าบิลด์เชนที่ซับซ้อน ฉันใช้ AI สื่อสารความต้องการที่แม่นยำ เครื่องมือที่ได้จึงทำงานได้ด้วยตัวเองและทำงานนั้นได้อย่างไร้ที่ติ',
      pillar1Principle: 'หลักการ: 1 ปัญหา = 1 ทางแก้ที่หมดจด',
      pillar2Title: '2. ควบคุมน้ำหนัก Dependency',
      pillar2Desc: 'ทำไมต้องนำเข้าแพ็กเกจขนาด 400KB พร้อม dependency ยิบย่อย เพียงเพื่อ debounce อินพุตหรือเรียงคีย์? มาตรฐาน Browser และ Node API มีฟังก์ชันพื้นฐานที่จำเป็นครบถ้วนอยู่แล้ว',
      pillar2Principle: 'หลักการ: ไม่ใช้แพ็กเกจที่ไม่จำเป็น',
      pillar3Title: '3. ส่งมอบประโยชน์แท้จริง',
      pillar3Desc: 'ไม่วิ่งไล่เก็บดาวบนโซเชียลมีเดีย หรือคอยดูแลคิว PR ยูทิลิตี้ถูกปล่อยออกมาเป็นสคริปต์ที่พร้อมคัดลอก คอนฟิกเชลล์ และโมดูลขนาดจิ๋วที่นำไปใช้งานแก้ปัญหาจริงได้ทันที',
      pillar3Principle: 'หลักการ: ประสิทธิภาพการใช้งาน > พิธีรีตอง',
      calcTitle: 'การตรวจสอบเปรียบเทียบ: AI Coder กับ แพ็กเกจทั่วไป',
      calcDesc: 'เลือกฟังก์ชันทั่วไปเพื่อดูขนาดบันเดิลที่ประหยัดได้ด้วยแนวทางมินิมอลของ MCrganMan',
      toolFormatting: 'ทำความสะอาดและจัดรูปแบบข้อมูล',
      toolState: 'การจัดการ State และ Event Subscriptions',
      toolDiff: 'การเปรียบเทียบข้อความและภาพ (Diff)',
      toolTerminal: 'CLI ตรวจสอบกระบวนการทำงาน',
      calcStandard: 'แบบทั่วไป',
      calcMinimalist: 'แบบมินิมอล',
      calcEliminated: 'ลดแบนด์วิดท์เครือข่ายและภาระประมวลผล',
      stdAbbrev: 'ทั่วไป',
      mcAbbrev: 'มินิมอล',
    },
    servertools: {
      sectionTag: '02 / ส่วนเสริม MINECRAFT BEDROCK / เปิดให้ใช้งานอย่างเป็นทางการ',
      title: 'ServerTools สำหรับ Minecraft Bedrock',
      subhead: 'ชุดส่วนเสริมและคำสั่งเซิร์ฟเวอร์ Minecraft Bedrock สำหรับงานเฉพาะ ออกแบบมาเพื่อประสิทธิภาพสูง ไร้อาการแล็ก และติดตั้งได้ทันที อยู่ระหว่างการพัฒนาอย่างต่อเนื่องพร้อมอัปเดตใหม่อย่างสม่ำเสมอ',
      comingSoon: 'RELEASED',
      wipBadge: 'กำลังพัฒนาต่อเนื่อง · มีอัปเดตเพิ่มเติม',
      moreInfo: 'ข้อมูลเพิ่มเติม',
      economyTitle: 'ระบบเศรษฐกิจ',
      economyDesc: 'ระบบการเงินครบวงจร พร้อมยอดเงินคงเหลือของผู้เล่น การทำธุรกรรม และการเชื่อมโยงกับ Scoreboard',
      tpaTitle: 'คำขอวาร์ป (/tpa)',
      tpaDesc: 'ระบบ /tpa ที่รวดเร็ว พร้อมตัวนับเวลารับ/ปฏิเสธ และระบบความปลอดภัยป้องกันอันตราย',
      rtpTitle: 'สุ่มวาร์ป (/rtp)',
      rtpDesc: 'การเกิดในป่าอย่างปลอดภัย ด้วยอัลกอริทึมหลบเลี่ยงมหาสมุทรและลาวา พร้อมระบบคูลดาวน์ที่กำหนดเองได้',
      shopTitle: 'ร้านค้า GUI ในเกม (/shop)',
      shopDesc: 'เมนูฟอร์มซื้อขายบล็อก แร่ เครื่องมือ และไอเทมสิ้นเปลืองที่ใช้งานง่ายและสะอาดตา',
      footerNote: 'อยู่ระหว่างการพัฒนาต่อเนื่อง · มีส่วนเสริม Bedrock และอัปเดตใหม่ๆ ทยอยปล่อยออกมาเรื่อยๆ',
      previewDetails: 'ดูรายละเอียดปลายทาง →',
      modalTitle: 'คุณกำลังจะออกจากพอร์ตโฟลิโอ',
      modalDesc: 'คุณกำลังจะนำทางไปยังเว็บไซต์ทางการของ ServerTools เพื่อดูเอกสารและข้อมูลการใช้งาน:',
      modalCancel: 'ยกเลิก',
      modalProceed: 'ไปยัง ServerTools',
    },
    settings: {
      title: 'การตั้งค่าประสบการณ์',
      subtitle: 'กำหนดรูปแบบการแสดงผล ภาษา และระบบการเคลื่อนไหว',
      liquidGlassTitle: 'โหมด Liquid Glass',
      liquidGlassDesc: 'เปิดใช้งานการหักเหแสงแบบของเหลว ความเบลอของฉากหลัง แสงสะท้อนขอบ และการซ้อนทับแบบโปร่งแสงบนการ์ดและแถบนำทาง',
      liquidGlassActive: 'เปิดใช้งาน',
      liquidGlassOff: 'ปิด',
      animationsTitle: 'แอนิเมชัน & การเคลื่อนไหว',
      animationsDesc: 'เปิดใช้งานการโต้ตอบที่นุ่มนวล การลอยตัว แสงเรืองรอง และทรานซิชันที่ลื่นไหล ปิดเพื่อประสิทธิภาพที่ฉับไวแบบสถิต',
      animationsActive: 'ลื่นไหล 60FPS',
      animationsOff: 'สถิต (ฉับไว)',
      languageTitle: 'ภาษา (Language)',
      languageDesc: 'เลือกภาษาที่ต้องการใช้งาน รองรับทั้งภาษาไทยและ English',
      themeTitle: 'ธีมการแสดงผล',
      themeDesc: 'ปัจจุบันตั้งค่าเป็น',
      switchThemeLight: 'สลับเป็นโหมดสว่าง',
      switchThemeDark: 'สลับเป็นโหมดมืด',
      previewTitle: 'ตัวอย่างสไตล์แบบเรียลไทม์',
      restoreDefaults: 'คืนค่าเริ่มต้น',
      done: 'เสร็จสิ้น',
    },
    footer: {
      tagline: 'โปรแกรมเมอร์ AI สไตล์มินิมอล',
      bio: 'ยูทิลิตี้และสถาปัตยกรรมที่ vibe-coded ด้วย AI สร้างขึ้นด้วยหลักการดีไซน์ Liquid Glass ไร้สิ่งรกรุงรัง',
      settings: 'ตั้งค่า',
      portal: 'พอร์ทัล',
      top: 'บนสุด',
      anonymous: 'รักษาอัตลักษณ์นิรนาม · ไร้ระบบติดตามตัว',
      copyright: '© 2026 MCrganMan.',
    },
  },
};
