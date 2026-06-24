"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink, GitFork } from "lucide-react";
import { projects } from "../data";

const filters = [
  { id: "all", label: "الكل" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "mobile", label: "Mobile" },
];

export default function WorksPage() {
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}>
            <p className="text-[#C9A96E] text-xs font-dm uppercase tracking-widest mb-4">ما بنيته</p>
            <h1 className="display-lg text-white mb-6">
              معرض الأعمال
            </h1>
            <p className="text-[#555] font-dm max-w-xl leading-relaxed">
              مجموعة من أبرز المشاريع التي عملت عليها — من أنظمة معقدة إلى تجارب مستخدم مبهرة.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className={`filter-tab ${active === f.id ? "active" : ""}`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16,1,0.3,1] }}
                >
                  <Link href={`/works/${project.id}`} className="block group project-card">
                    <div className="glass rounded-2xl overflow-hidden border border-[#1a1a1a] group-hover:border-[#C9A96E]/20 transition-all duration-500 h-full">
                      {/* Project color block */}
                      <div
                        className="h-48 relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${project.color} 0%, #0d0d0d 100%)` }}
                      >
                        {/* Mock UI pattern */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="space-y-2 w-4/5 opacity-30">
                            <div className="h-3 bg-white/20 rounded-full w-3/4" />
                            <div className="h-2 bg-white/10 rounded-full w-full" />
                            <div className="h-2 bg-white/10 rounded-full w-2/3" />
                            <div className="mt-4 flex gap-2">
                              <div className="h-16 w-1/3 rounded-lg" style={{ background: project.accent + "40" }} />
                              <div className="h-16 w-1/3 rounded-lg" style={{ background: project.accent + "20" }} />
                              <div className="h-16 w-1/3 rounded-lg" style={{ background: project.accent + "30" }} />
                            </div>
                          </div>
                        </div>

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex gap-3">
                            <span className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white">
                              <ExternalLink size={16} />
                            </span>
                            <span className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white">
                              <GitFork size={16} />
                            </span>
                          </div>
                        </div>

                        {/* Category badge */}
                        <div className="absolute top-4 right-4">
                          <span className="text-xs font-dm text-white/60 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                            {project.categoryLabel}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="text-[#444] font-dm text-xs mb-2">{project.year}</div>
                        <h3 className="font-playfair text-xl text-white mb-2 group-hover:text-[#C9A96E] transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-[#444] font-dm text-sm leading-relaxed mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.slice(0, 3).map((t) => (
                            <span key={t} className="text-xs font-dm text-[#333] bg-[#1a1a1a] px-2 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="text-xs font-dm text-[#333] bg-[#1a1a1a] px-2 py-0.5 rounded">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
