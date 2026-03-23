import { ThumbsUp, MessageCircle, Share2, ExternalLink } from "lucide-react";

export interface FacebookPost {
  id: string;
  author: string;
  date: string;
  body: string;
  hasImage: boolean;
  likes: number;
  comments: number;
  shares: number;
}

export default function FacebookPostCard({ post }: { post: FacebookPost }) {
  return (
    <article className="group flex flex-col rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5">
        {/* Avatar placeholder */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1877F2] text-sm font-bold text-white">
          PH
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {post.author}
          </p>
          <p className="text-xs text-slate-500">{post.date}</p>
        </div>
      </div>

      {/* Body */}
      <p className="px-5 pt-3 text-sm leading-relaxed text-slate-700">
        {post.body}
      </p>

      {/* Optional image placeholder */}
      {post.hasImage && (
        <div className="mx-5 mt-4 flex h-40 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-400">
          Image from Facebook
        </div>
      )}

      {/* Engagement row */}
      <div className="mt-auto flex items-center gap-5 border-t border-slate-100 px-5 py-3 text-xs text-slate-500 mt-4">
        <span className="inline-flex items-center gap-1">
          <ThumbsUp className="h-3.5 w-3.5" />
          {post.likes}
        </span>
        <span className="inline-flex items-center gap-1">
          <MessageCircle className="h-3.5 w-3.5" />
          {post.comments}
        </span>
        <span className="inline-flex items-center gap-1">
          <Share2 className="h-3.5 w-3.5" />
          {post.shares}
        </span>
      </div>

      {/* CTA */}
      <a
        href="https://www.facebook.com/profile.php?id=61577514210399"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 rounded-b-xl border-t border-slate-100 py-2.5 text-xs font-medium text-[#1877F2] transition hover:bg-slate-50"
      >
        View on Facebook <ExternalLink className="h-3 w-3" />
      </a>
    </article>
  );
}
