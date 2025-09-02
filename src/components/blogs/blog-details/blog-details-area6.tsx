import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import BlogSidebar from "../blog-sidebar";
import heroImg from "@/assets/images/blog/blog_img_01.jpg";

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
              {/* Hero */}
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

                {/* ===== Sixth News Content ===== */}
                <div className="post-details-meta">
                  <p>
                    In Nigeria, understanding the difference between <strong>Term Life</strong> and <strong>Whole Life</strong>
                    insurance can make all the difference in securing your family’s future. Term plans are affordable and
                    purely protective, while Whole Life offers lifelong coverage plus cash value accumulation.
                  </p>

                  <h5>Term Life: Affordability & Focus</h5>
                  <ul className="style-none list-item">
                    <li>
                      <strong>Low premiums</strong> for a fixed term (e.g., 10, 20, or 30 years).
                    </li>
                    <li>
                      <strong>No cash savings</strong>; coverage ends if not renewed or converted.
                    </li>
                    <li>
                      <strong>Convertibility options</strong> often available to switch to Whole Life later.
                    </li>
                  </ul>

                  <h5>Whole Life: Lifelong Coverage & Value</h5>
                  <ul className="style-none list-item">
                    <li>
                      <strong>Premiums fixed or increasing</strong> depending on plan, but cover lasts your entire life.
                    </li>
                    <li>
                      Builds <strong>cash surrender value</strong> you can borrow against or withdraw.
                    </li>
                    <li>
                      Usually more expensive, but adds an investment component.
                    </li>
                  </ul>

                  

                  <h5>Which Should You Choose?</h5>
                  <ul className="style-none list-item">
                    <li>Need cost-effective cover for a limited period? Go Term.</li>
                    <li>Want lifelong protection with a savings component? Whole Life might fit.</li>
                    <li>Have dependents and estate planning goals? Diversified combo approaches exist.</li>
                  </ul>

                  <div className="quote-wrapper">
                    <div className="wrapper">
                      <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                        <Image src={icon} alt="icon" className="lazy-img" />
                      </div>
                      <div className="row">
                        <div className="col-xxl-9 col-xl-11 m-auto">
                          <h3>
                            “Term life gives broad protection at low cost, while whole life offers peace of mind and value.”
                          </h3>
                        </div>
                      </div>
                      <h6>
                        Financial Advisor <span>— Lagos</span>
                      </h6>
                    </div>
                  </div>

                  <p>
                    Many Nigerians begin with Term Life to protect immediate responsibilities, then later transition to
                    Whole Life as wealth grows. Always compare policy illustrations to understand long-term premiums and
                    benefits fully.
                  </p>
                </div>
                {/* ===== End Content ===== */}

                <div className="bottom-widget d-sm-flex align-items-center justify-content-between">
                  <ul className="d-flex align-items-center tags style-none pt-20">
                    <li>Tag:</li>
                    <li><Link href="#">Insurance</Link></li>
                    <li><Link href="#">Life Insurance</Link></li>
                    <li><Link href="#">Term vs Whole</Link></li>
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
            {/* blog sidebar */}
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsArea;
