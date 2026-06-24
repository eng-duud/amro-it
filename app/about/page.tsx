"use client";

import { motion } from "framer-motion";
import { Download, MapPin, Mail, Calendar } from "lucide-react";
import { stats, skills, experience, siteData } from "../data";
import AnimatedCounter from "../components/AnimatedCounter";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)" }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}>
            <p className="text-[#C9A96E] text-xs font-dm uppercase tracking-widest mb-4">من أنا</p>
            <h1 className="display-lg text-white mb-8">
              مطور يؤمن بأن الكود
              <br />
              <span className="gold-text">هو فن بلغة مختلفة</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left - Bio */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            >
              {/* Avatar placeholder */}
              <div className="relative w-full max-w-sm mb-10 mx-auto lg:mx-0">
                <div className="aspect-square rounded-2xl overflow-hidden glass border border-[#C9A96E]/20 relative">
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)" }}
                  >
                    <div className="text-center">
                      <div className="font-playfair text-[120px] text-[#C9A96E]/20 leading-none select-none">ع</div>
                      <div className="text-[#C9A96E]/40 font-dm text-sm">عمرو الجمل</div>
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(circle at 30% 30%, rgba(201,169,110,0.08), transparent 60%)" }}
                  />
                </div>
                {/* Gold accent border */}
                <div className="absolute -bottom-3 -right-3 w-24 h-24 border border-[#C9A96E]/20 rounded-xl -z-10" />
              </div>

              {/* Info cards */}
              <div className="space-y-3">
                {[
                  { icon: MapPin, text: siteData.location },
                  { icon: Mail, text: siteData.email },
                  { icon: Calendar, text: "6+ سنوات من الخبرة" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-[#555] font-dm text-sm">
                    <Icon size={14} className="text-[#C9A96E]" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 border border-[#C9A96E]/30 text-[#C9A96E] font-dm text-sm rounded-lg hover:bg-[#C9A96E]/10 hover:border-[#C9A96E] transition-all duration-300"
              >
                <Download size={15} />
                تحميل السيرة الذاتية
              </a>
            </motion.div>

            {/* Right - Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            >
              <div className="space-y-6 text-[#666] font-dm leading-relaxed">
                <p className="text-lg text-[#888]">
                  أنا <strong className="text-white">عمرو خالد الجمل</strong>، مطور Full-Stack شغوف بصناعة منتجات رقمية ذات أثر حقيقي.
                </p>
                <p>
                  بدأت رحلتي في عالم التطوير قبل أكثر من 6 سنوات، وخلال هذه الفترة عملت على مشاريع متنوعة تراوحت بين أنظمة إدارة ضخمة، ومنصات تجارة إلكترونية، وتطبيقات موبايل ووجهات مستخدم تفاعلية ومميزة.
                </p>
                <p>
                  أؤمن بأن المنتج الجيد يجمع بين الكود النظيف الفعّال والتصميم الجميل الوظيفي. كل سطر كود أكتبه يعكس اهتمامي بالتفاصيل والسعي نحو الكمال.
                </p>
                <p>
                  خارج عالم البرمجة، أحب استكشاف تقنيات جديدة، المساهمة في مشاريع مفتوحة المصدر، وتعليم المطورين الجدد.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-10">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="glass rounded-xl p-5"
                  >
                    <div className="font-playfair text-3xl gold-text font-bold mb-1">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[#444] font-dm text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section-pad bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-[#C9A96E] text-xs font-dm uppercase tracking-widest mb-3">المسيرة المهنية</p>
            <h2 className="display-md text-white">الخبرة العملية</h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A96E]/30 via-[#C9A96E]/10 to-transparent md:right-auto md:left-[200px]" />

            <div className="space-y-10">
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16,1,0.3,1] }}
                  className="flex flex-col md:flex-row gap-6 md:gap-10"
                >
                  {/* Date */}
                  <div className="md:w-48 flex-shrink-0 md:text-left text-[#444] font-dm text-sm pt-1">
                    {exp.period}
                  </div>

                  {/* Dot */}
                  <div className="hidden md:flex flex-shrink-0 items-start pt-2">
                    <div className="glow-dot" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 glass rounded-xl p-6 glass-hover">
                    <h3 className="font-playfair text-xl text-white mb-1">{exp.role}</h3>
                    <div className="text-[#C9A96E]/70 font-dm text-sm mb-3">{exp.company}</div>
                    <p className="text-[#555] font-dm text-sm leading-relaxed mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span key={t} className="text-xs font-dm text-[#444] bg-[#1a1a1a] px-3 py-1 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-[#C9A96E] text-xs font-dm uppercase tracking-widest mb-3">الأدوات والتقنيات</p>
            <h2 className="display-md text-white">ترسانة المهارات</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className="glass rounded-xl p-5 hover:border-[#C9A96E]/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-dm text-white text-sm">{skill.name}</span>
                    <span className="text-[10px] font-dm text-[#333] uppercase tracking-wider border border-[#2a2a2a] px-2 py-0.5 rounded-full">
                      {skill.category}
                    </span>
                  </div>
                  <span className="font-dm text-[#C9A96E] text-xs font-medium">{skill.level}%</span>
                </div>
                <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 + 0.2, duration: 1.2, ease: [0.16,1,0.3,1] }}
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #C9A96E, #E2C898)" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
