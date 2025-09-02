import React from "react";
import Link from "next/link";
import blog_data from "@/data/blog-data";

const BlogSidebar = () => {
  const recent_blogs = blog_data.filter((b) => b.page === "blog-list").slice(-2);
  return (
    <div className="blog-sidebar md-mt-60 ps-xxl-4">
    
      <div className="contact-banner text-center mt-50 lg-mt-30">
        <h3 className="mb-20">
          Any Questions? <br />
          Let’s talk
        </h3>
        <Link href="/contact" className="tran3s fw-500">
          Let’s Talk
        </Link>
      </div>
    </div>
  );
};

export default BlogSidebar;
