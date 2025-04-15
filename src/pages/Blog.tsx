
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const Blog = () => {
  const posts = [
    {
      title: "Building Lasting Habits: A Comprehensive Guide",
      date: "2025-04-15",
      category: "Guides",
      excerpt: "Learn the science behind habit formation and how to build habits that stick."
    },
    {
      title: "The Power of Consistency in Personal Growth",
      date: "2025-04-14",
      category: "Personal Development",
      excerpt: "Discover why consistency is the key to achieving your personal growth goals."
    },
    {
      title: "5 Common Habit-Building Mistakes to Avoid",
      date: "2025-04-13",
      category: "Tips",
      excerpt: "Are you making these common mistakes in your habit-building journey?"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">HabitFlow Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.title} className="hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-primary">{post.category}</span>
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold">{post.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
