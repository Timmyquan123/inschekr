import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import BlogSidebar from "../blog-sidebar";
import heroImg from "@/assets/images/blog/blog_img_01.jpg"; // use a distinct hero if you like

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

                {/* ===== Fourth News Content ===== */}
                <div className="post-details-meta">
                  <p>
                    Nigeria’s insurance market is set for a broader digital push as aggregators, brokers,
                    and carriers deepen online distribution for <strong>motor, health, SME property, travel, and life</strong>.
                    The move aims to reduce acquisition costs, expand reach, and improve price transparency for consumers.
                  </p>

                  <h5>What’s changing for customers?</h5>
                  <ul className="style-none list-item">
                    <li>
                      <strong>Side-by-side comparisons</strong> of premiums, benefits, exclusions, and excesses across multiple insurers.
                    </li>
                    <li>
                      <strong>Instant policy issuance</strong> and digital certificates for motor and travel insurance.
                    </li>
                    <li>
                      <strong>Faster claims initiation</strong> via embedded portals and API connections to underwriters.
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
                            “Digital distribution is shifting the market from agent-only to truly customer-led discovery and purchase.”
                          </h3>
                        </div>
                      </div>
                      <h6>
                        Industry Round-Up <span>— InsurTech Nigeria</span>
                      </h6>
                    </div>
                  </div>

                  

                  <h5>Impact on insurers & brokers</h5>
                  <p>
                    Carriers are investing in <strong>product APIs</strong> and pricing engines to serve quotes in real time,
                    while brokers are adopting <strong>embedded finance</strong> hooks to place covers inside e-commerce,
                    auto-dealer, and travel flows. With clearer metrics—from quote-to-bind to claims cycle time—firms
                    can tune pricing, reduce churn, and offer usage-based add-ons.
                  </p>

                  <h5>What to watch next</h5>
                  <ul className="style-none list-item">
                    <li>Stronger KYC and anti-fraud tooling in digital onboarding.</li>
                    <li>Wider adoption of <em>instant motor e-certificates</em> and QR verification.</li>
                    <li>Expansion of online comparison beyond motor into fire, marine, and group life.</li>
                  </ul>

                  <p className="m0">
                    For customers, the bottom line is simple: <strong>more choice, faster purchase, and clearer value</strong>.
                    For the industry, digital rails unlock scale—provided service and claims stay front and centre.
                  </p>
                </div>
                {/* ===== End content ===== */}

                <div className="bottom-widget d-sm-flex align-items-center justify-content-between">
                  <ul className="d-flex align-items-center tags style-none pt-20">
                    <li>Tag:</li>
                    <li><Link href="#">Insurance</Link></li>
                    <li><Link href="#">Digital</Link></li>
                    <li><Link href="#">Aggregator</Link></li>
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
            {/* blog sidebar start */}
            <BlogSidebar />
            {/* blog sidebar end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsArea;
