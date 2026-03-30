import Header from "@/components/header";
import Footer from "@/components/footer";
import { fetchJson } from "@/client/api/jsonutils";

// Meta Graph API configuration - add your credentials below
const META_PAGE_ID = process.env.META_PAGE_ID || "YOUR_PAGE_ID_HERE";
const META_PAGE_ACCESS_TOKEN = process.env.META_PAGE_ACCESS_TOKEN || "YOUR_ACCESS_TOKEN_HERE";
const META_GRAPH_VERSION = "v20.0";

interface FacebookPost {
    id: string;
    message: string;
    created_time: string;
    permalink_url: string;
    full_picture?: string;
}

interface FacebookFeedResponse {
    data: FacebookPost[];
}

async function getFacebookPosts(): Promise<FacebookPost[]> {
    try {
        const url = `https://graph.facebook.com/${META_GRAPH_VERSION}/${META_PAGE_ID}/feed?fields=message,created_time,permalink_url,full_picture&limit=25&access_token=${META_PAGE_ACCESS_TOKEN}`;
        
        const response = await fetchJson<FacebookFeedResponse>(url);
        
        if (!response.data || !Array.isArray(response.data)) {
            return [];
        }

        const allPosts = response.data;
        
        // Get pinned posts (containing #pinned in message)
        const pinnedPosts = allPosts.filter(post => post.message?.includes("#pinned"));
        
        // Get 3 most recent posts
        const recentPosts = allPosts.slice(0, 3);
        
        // Combine: all pinned posts + recent 3 (avoiding duplicates)
        const combined = [...pinnedPosts];
        for (const post of recentPosts) {
            if (!combined.find(p => p.id === post.id)) {
                combined.push(post);
            }
        }
        
        return combined;
    } catch (error) {
        console.error("Error fetching Facebook posts:", error);
        return [];
    }
}

export default async function NewsLetter() {
    const posts = await getFacebookPosts();

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Header />

            <main className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-15">
                <section className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12">
                    <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                        Newsletter
                    </h1>
                    <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
                        Latest updates from our Facebook page
                    </p>
                </section>

                {posts.length > 0 ? (
                    <section className="mt-8 grid gap-6">
                        {posts.map((post) => (
                            <div key={post.id} className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow">
                                {post.full_picture && (
                                    <img 
                                        src={post.full_picture} 
                                        alt="Post" 
                                        className="w-full h-64 object-cover rounded-lg mb-4"
                                    />
                                )}
                                <p className="text-slate-700 mb-4 whitespace-pre-wrap">{post.message}</p>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">
                                        {new Date(post.created_time).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                    <a 
                                        href={post.permalink_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        Read on Facebook →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </section>
                ) : (
                    <section className="mt-8">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                            <p className="text-slate-600">No posts available at the moment. Configure META_PAGE_ID and META_PAGE_ACCESS_TOKEN to display updates.</p>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>

    );
}