import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import BlogSidebar from "../blog-sidebar";
import heroImg from "@/assets/images/blog/blog_img_01.jpg";   // Main hero image

import icon from "@/assets/images/icon/icon_93.svg";

import { IBlog } from "@/types/blog-d-t";

const BlogDetailsArea = ({ blog }: { blog: IBlog }) => {
  const { date, title, post_info } = blog || {};
  return (
    <div className="blog-details position-relative mt-150 lg-mt-80 mb-150 lg-mb-80">
      <div className="container">
        <div className="row gx-xl-5">
          <div className="col-lg-8">
            <article className="blog-meta-two style-two">
              {/* Hero banner */}
              <figure
                className="post-img position-relative d-flex align-items-end m0"
                style={{ backgroundImage: `url(${heroImg.src})` }}
              >
                <div className="date">{date}</div>
              </figure>

              <div className="post-data">
                <div className="post-info">{post_info}</div>
                <div className="blog-title">
                  <h4>{title}</h4>
                </div>

                {/* ===== Fifth News Content ===== */}
                <div className="post-details-meta">
                  <p>
                    The Nigerian Insurers Association (<strong>NIA</strong>) has launched a dedicated <strong>Innovation Lab</strong> to
                    develop digital insurance solutions across Motor, Health, Fire, and SME lines. With collaboration from
                    fintech and startups, the Lab aims to accelerate product design, distribution, and customer experience modernization.
                  </p>

                  <h5>Objectives of the Innovation Lab</h5>
                  <ul className="style-none list-item">
                    <li>
                      <strong>Rapid prototyping:</strong> co-building embedded policies with e-commerce, ride-hailing, and agri-tech platforms.
                    </li>
                    <li>
                      <strong>Regulatory sandbox access:</strong> testing new products (e.g., usage-based, parametric flood) in real-world settings.
                    </li>
                    <li>
                      <strong>Digital training:</strong> upskilling insurers, brokers, and agents on API integration, UX design, and data literacy.
                    </li>
                  </ul>

                  <div className="quote-wrapper">
                    <div className="wrapper">
                      <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                        <Image src={icon} alt="icon" className="lazy-img" />
                      </div>
                      <div className="row">
                        <div className="col-xxl-9 col-xl-11 m-auto">
                          <h3>
                            “This Lab is not just about new tech—it’s about reimagining insurance as a seamless, everyday service.”
                          </h3>
                        </div>
                      </div>
                      <h6>
                        – NIA Chairman <span>— Abuja</span>
                      </h6>
                    </div>
                  </div>

                  {/* Inline images */}
                  

                  <h5>What this means for policyholders</h5>
                  <ul className="style-none list-item">
                    <li>Faster access to tailored policies through platforms you already use.</li>
                    <li>More transparent premiums with digital tools and smart quoting.</li>
                    <li>Improved customer experience as policies become easy and mobile-first.</li>
                  </ul>

                  <h5>Impact on insurers and startups</h5>
                  <ul className="style-none list-item">
                    <li>Opportunity to test new price models, telematics, micro-insurance in a live environment.</li>
                    <li>Support for partnerships and innovation-driven product launches.</li>
                    <li>Ability to track what consumers need and design accordingly—faster than ever.</li>
                  </ul>

                  <p>
                    As the Lab rolls out pilots and shares proof-of-concept models, expect accelerated innovation
                    cycles and broader digital insurance adoption across urban and rural Nigeria.
                  </p>
                </div>
                {/* ===== End content ===== */}

                <div className="bottom-widget d-sm-flex align-items-center justify-content-between">
                  <ul className="d-flex align-items-center tags style-none pt-20">
                    <li>Tag:</li>
                    <li><Link href="#">Insurance</Link></li>
                    <li><Link href="#">Innovation</Link></li>
                    <li><Link href="#">NIA Lab</Link></li>
                  </ul>
                  <ul className="d-flex share-icon align-items-center style-none pt-20">
                    <li>Share:</li>
                    <li><Link href="#"><i className="bi bi-facebook"></i></Link></li>
                    <li><Link href="#"><i className="bi bi-twitter"></i></Link></li>
                    <li><Link href="#"><i className="bi bi-linkedin"></i></Link></li>
                  </ul>
                </div>
              </div>
            </article>
          </div>

          <div className="col-lg-4 col-md-8">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsArea;
