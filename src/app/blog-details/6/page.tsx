import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layout/wrapper";
import HeaderSeven from "@/layout/header/header-seven";
import BreadcrumbOne from "@/components/breadcrumb/breadcrumb-one";
import FooterThree from "@/layout/footer/footer-three";
import blog_bg from "@/assets/images/media/img_32.jpg";
import FancyBannerThree from "@/components/fancy-banner/fancy-banner-three";
import BlogDetailsArea6 from "@/components/blogs/blog-details/blog-details-area6";
import shape from "@/assets/images/shape/shape_35.svg";
import blog_data from "@/data/blog-data";
import NewsletterBanner from "@/components/newsletter/newsletter-banner";

export const metadata: Metadata = {
  title: "Blog Details Page",
};

const BlogDetailsPage = () => {
  const blog = blog_data[5]
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <HeaderSeven />
        {/* header end */}
        <main>
          {/* breadcrumb start */}
          <BreadcrumbOne
            title="Single Blog Details"
            subtitle="Meet our expertise, guiding you through financial intricacies with precision"
            page="Blog"
            bg_img={blog_bg}
            style_2={true}
            shape={shape}
          />
          {/* breadcrumb end */}

          {/* blog details area start */}
          {blog && <BlogDetailsArea6 blog={blog} />}
          {/* blog details area end */}

          {/* fancy banner three start */}
          <FancyBannerThree />
          {/* fancy banner three end */}

          {/* news letter start */}
          <NewsletterBanner />
          {/* news letter end */}
        </main>

        {/* footer start */}
        <FooterThree style_2={true} />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default BlogDetailsPage;
