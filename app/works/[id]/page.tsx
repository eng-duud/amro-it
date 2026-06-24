"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, GitFork, ChevronLeft } from "lucide-react";
import { projects } from "../../data";

export default function ProjectDetailPage() {
  const params = useParams();
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="display-md text-[#333] mb-4">404</div>
          <p className="text-[#555] font-dm mb-6">المشروع غير موجود</p>
          <Link href="/works" className="text-[#C9A96E] font-dm hover:underline">العودة للأعمال</Link>
        </div>
      </div>
    );
  }

  const relatedProjects = projects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top right, ${project.color}40 0%, transparent 60%)` }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[#444] font-dm text-sm mb-10"
          >
            <Link href="/" className="hover:text-[#C9A96E] transition-colors">الرئيسية</Link>
            <ChevronLeft size={14} />
            <Link href="/works" className="hover:text-[#C9A96E] transition-colors">الأعمال</Link>
            <ChevronLeft size={14} />
            <span className="text-[#C9A96E]">{project.title}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-dm text-[#C9A96E]/60 border border-[#C9A96E]/20 px-3 py-1 rounded-full uppercase tracking-widest">
                    {project.categoryLabel}
                  </span>
                  <span className="text-xs font-dm text-[#444]">{project.year}</span>
                </div>
                <h1 className="display-lg text-white mb-6">{project.title}</h1>
                <p className="text-[#666] font-dm leading-relaxed text-lg mb-8">{project.descriptionLong}</p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={project.liveUrl}
                    className="flex items-center gap-2 px-6 py-3 bg-[#C9A96E] text-[#0D0D0D] font-dm font-semibold rounded-lg hover:bg-[#E2C898] transition-colors"
                  >
                    <ExternalLink size={15} />
                    المشروع الحي
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-2 px-6 py-3 border border-[#C9A96E]/30 text-[#C9A96E] font-dm rounded-lg hover:bg-[#C9A96E]/10 hover:border-[#C9A96E] transition-all"
                  >
                    <GitFork size={15} />
                    الكود المصدري
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Visual preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16,1,0.3,1] }}
              className="relative"
            >
              <div
                className="aspect-video rounded-2xl relative overflow-hidden border border-[#1a1a1a]"
                style={{ background: `linear-gradient(135deg, ${project.color} 0%, #0d0d0d 100%)` }}
              >
                {/* Mock browser chrome */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-[#111] flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <div className="flex-1 mx-4 h-4 bg-[#1a1a1a] rounded text-[#444] text-[10px] font-dm flex items-center px-2">
                    {project.liveUrl}
                  </div>
                </div>

                {/* Mock UI */}
                <div className="absolute inset-0 top-8 p-6 opacity-40">
                  <div className="h-4 bg-white/20 rounded-full w-1/2 mb-3" />
                  <div className="h-2 bg-white/10 rounded-full w-3/4 mb-2" />
                  <div className="h-2 bg-white/10 rounded-full w-2/3 mb-6" />
                  <div className="grid grid-cols-3 gap-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-16 rounded-lg" style={{ background: project.accent + "30" }} />
                    ))}
                  </div>
                </div>

                {/* Glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${project.accent}20, transparent 70%)` }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 border-y border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#C9A96E] text-xs font-dm uppercase tracking-widest mb-6">التقنيات المستخدمة</p>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="font-dm text-sm text-white bg-[#1a1a1a] border border-[#2a2a2a] px-5 py-2.5 rounded-full hover:border-[#C9A96E]/30 hover:text-[#C9A96E] transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery (Mock) */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-[#C9A96E] text-xs font-dm uppercase tracking-widest mb-3">معرض الصور</p>
            <h2 className="display-md text-white">لقطات من المشروع</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className={`rounded-xl overflow-hidden border border-[#1a1a1a] ${i === 0 ? "md:col-span-2 aspect-video" : "aspect-square"}`}
                style={{ background: `linear-gradient(${135 + i * 30}deg, ${project.color}80, #0d0d0d)` }}
              >
                <div className="w-full h-full flex items-center justify-center opacity-30">
                  <div className="text-[#555] font-dm text-sm">لقطة شاشة {i + 1}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="section-pad bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="display-md text-white">مشاريع أخرى</h2>
            <Link href="/works" className="flex items-center gap-2 text-[#555] hover:text-[#C9A96E] text-sm font-dm transition-colors">
              كل الأعمال <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((rel, i) => (
              <motion.div
                key={rel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/works/${rel.id}`} className="block group">
                  <div className="glass rounded-xl overflow-hidden border border-[#1a1a1a] group-hover:border-[#C9A96E]/20 transition-all duration-300">
                    <div
                      className="h-32 relative"
                      style={{ background: `linear-gradient(135deg, ${rel.color} 0%, #0d0d0d 100%)` }}
                    />
                    <div className="p-5">
                      <div className="text-xs text-[#444] font-dm mb-1">{rel.categoryLabel}</div>
                      <h3 className="font-playfair text-lg text-white group-hover:text-[#C9A96E] transition-colors">{rel.title}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
