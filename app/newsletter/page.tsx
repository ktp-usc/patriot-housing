import Header from "@/components/header";
import Footer from "@/components/footer";
import FacebookPostCard from "@/components/FacebookPostCard";
import type { FacebookPost } from "@/components/FacebookPostCard";

const samplePosts: FacebookPost[] = [
    {
        id: "1",
        author: "Patriot Housing",
        date: "2 days ago",
        body: "We're thrilled to announce three new veteran families moved into safe, affordable homes this month. Welcome home! 🏡🇺🇸",
        hasImage: true,
        likes: 142,
        comments: 23,
        shares: 38,
    },
    {
        id: "2",
        author: "Patriot Housing",
        date: "5 days ago",
        body: "A huge thank you to everyone who volunteered at this weekend's community cleanup. Your hard work makes our neighborhoods stronger!",
        hasImage: false,
        likes: 87,
        comments: 12,
        shares: 15,
    },
    {
        id: "3",
        author: "Patriot Housing",
        date: "1 week ago",
        body: "Join us for our upcoming Veteran Resource Fair on April 12th. Free food, housing assistance, and community connections await. Spread the word!",
        hasImage: true,
        likes: 204,
        comments: 31,
        shares: 56,
    },
    {
        id: "4",
        author: "Patriot Housing",
        date: "2 weeks ago",
        body: "Did you know? Over 37,000 veterans experience homelessness each year. Together, we can change that number. Learn how you can help.",
        hasImage: false,
        likes: 312,
        comments: 47,
        shares: 91,
    },
    {
        id: "5",
        author: "Patriot Housing",
        date: "2 weeks ago",
        body: "Our latest newsletter is out! Read about the impact of your donations and see what's next for Patriot Housing in 2026.",
        hasImage: true,
        likes: 98,
        comments: 8,
        shares: 22,
    },
    {
        id: "6",
        author: "Patriot Housing",
        date: "3 weeks ago",
        body: "Happy to share that our partnership with local businesses has helped furnish 15 homes this quarter. Gratitude to our amazing sponsors! 🙏",
        hasImage: false,
        likes: 176,
        comments: 19,
        shares: 33,
    },
];

export default function NewsLetter() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Header />

            <main className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-15">
                <section className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12">
                    <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                        Newsletter
                    </h1>
                    <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
                        See what we've been up to! From all the latest news and updates
                        to success stories and events, we're keeping you updated on all
                        things Patriot Housing.
                    </p>
                </section>

                {/* Facebook feed banner */}
                <section className="mt-8 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white">
                            <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">
                                Follow us on Facebook
                            </p>
                            <p className="text-xs text-slate-500">
                                Recent posts from our page
                            </p>
                        </div>
                    </div>
                    <a
                        href="https://www.facebook.com/profile.php?id=61577514210399"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-[#1877F2] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#166FE5]"
                    >
                        Follow
                    </a>
                </section>

                {/* Post cards */}
                <section className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {samplePosts.map((post) => (
                        <FacebookPostCard key={post.id} post={post} />
                    ))}
                </section>
            </main>

            <Footer />
        </div>
    );
}