"use client";

import { useState } from "react";
import Link from "next/link";
import { BLOGS } from "@/constants/blogs";
import { Clock, User, ArrowRight, BookOpen } from "lucide-react";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Nephrology", "Gynecology & Maternity", "Cardiology"];

  const filteredBlogs = selectedCategory === "all"
    ? BLOGS
    : BLOGS.filter(b => b.category === selectedCategory);

  return (
    <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* 1. Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">News & Articles</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-905 bg-gradient-to-r from-brand-teal to-brand-blue bg-clip-text text-transparent">
          Sai Sneh Health Blog
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Read medical updates, care guides, and healthy lifestyle tips prepared by our specialist medical advisory doctors.
        </p>
      </div>

      {/* 2. Categories Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all uppercase tracking-wider ${
              selectedCategory === cat
                ? "bg-slate-900 border-slate-900 text-white dark:bg-brand-teal dark:border-brand-teal"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {cat === "all" ? "All Articles" : cat}
          </button>
        ))}
      </div>

      {/* 3. Blog List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <article
            key={blog.id}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-2xl overflow-hidden shadow-xs hover-lift flex flex-col justify-between group"
          >
            <div>
              {/* Cover */}
              <div className="h-48 relative overflow-hidden bg-slate-100">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-950/95 px-2.5 py-1 rounded-lg shadow-md text-[10px] font-bold text-brand-teal">
                  {blog.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {blog.authorName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {blog.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-850 dark:text-white leading-snug line-clamp-2 group-hover:text-brand-teal transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
            </div>

            {/* Read Link */}
            <div className="p-6 pt-0 border-t border-slate-50 dark:border-slate-800/60 mt-4 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-medium">{blog.createdAt}</span>
              
              <Link
                href={`/blog/${blog.slug}`}
                className="text-xs font-bold text-brand-teal hover:text-brand-teal-dark flex items-center gap-1 group-hover:underline"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
