"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BLOGS, BlogData } from "@/constants/blogs";
import { ArrowLeft, Clock, User, Calendar, BookOpen, Share2 } from "lucide-react";

export default function BlogDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [blog, setBlog] = useState<BlogData | null>(null);

  useEffect(() => {
    if (slug) {
      const match = BLOGS.find((b) => b.slug === slug);
      if (match) setBlog(match);
    }
  }, [slug]);

  if (!blog) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-slate-500 font-medium">Loading article or post not found...</p>
        <Link href="/blog" className="text-xs text-brand-teal font-bold underline">
          Back to Blog List
        </Link>
      </div>
    );
  }

  const otherBlogs = BLOGS.filter(b => b.id !== blog.id);

  return (
    <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-slate-550 hover:text-brand-teal text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to blog catalog</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Article Body */}
        <article className="lg:col-span-8 space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <span className="bg-brand-teal/10 text-brand-teal px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider inline-block">
              {blog.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800 pb-6 pt-2">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-brand-teal" />
                <span>{blog.authorName} ({blog.authorRole})</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{blog.createdAt}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime}</span>
              </span>
            </div>
          </div>

          {/* Banner image */}
          <div className="h-96 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-850 shadow-sm relative">
            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
          </div>

          {/* Content rendered safely */}
          <div 
            className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-4 pt-4
              prose-headings:font-bold prose-headings:text-slate-800 dark:prose-headings:text-white prose-headings:mt-6 prose-headings:mb-2
              prose-h3:text-base prose-h3:text-brand-teal
              prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-2
              prose-strong:font-bold prose-strong:text-slate-800 dark:prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags list */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-500 font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>

        {/* Sidebar panels */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Author info card */}
          <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
            <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
              <User className="w-4 h-4 text-brand-teal" />
              <span>Medical Advisor</span>
            </h4>
            <div className="space-y-1">
              <span className="block font-bold text-sm text-slate-850 dark:text-white">{blog.authorName}</span>
              <span className="block text-xs text-brand-teal font-semibold">{blog.authorRole}</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed dark:text-slate-400">
              Consulting practitioner at Sai Sneh Hospital providing clinical recommendations based on certified medical evidence.
            </p>
          </div>

          {/* Other posts list */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-brand-teal" />
              <span>Recent Health Tips</span>
            </h4>

            <div className="grid grid-cols-1 gap-3">
              {otherBlogs.map((b) => (
                <Link
                  key={b.id}
                  href={`/blog/${b.slug}`}
                  className="p-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-brand-teal/30 hover:bg-brand-teal/5 rounded-xl block transition-all space-y-1.5 shadow-2xs"
                >
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-teal block">{b.category}</span>
                  <span className="block font-bold text-xs text-slate-800 dark:text-slate-200 line-clamp-2 leading-tight">
                    {b.title}
                  </span>
                  <span className="block text-[9px] text-slate-450">{b.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
