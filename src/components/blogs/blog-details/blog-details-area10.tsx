import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import BlogSidebar from "../blog-sidebar";
import heroImg from "@/assets/images/blog/blog_img_01.jpg"; // hero image for the article


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
              {/* Hero section */}
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

                {/* ===== News Content ===== */}
                <div className="post-details-meta">
                  <p>
                    As Nigeria implements its landmark Insurance Industry Reform Act (NIIRA 2025), industry leaders
                    underscore the importance of <strong>execution excellence</strong>. They stress that strong
                    governance, digital processes, and timely rollout are key to bridging the gap between regulation
                    and sector trust.
                  </p>

                  <h5>Core Pillars for Effective NIIRA Execution</h5>
                  <ul className="style-none list-item">
                    <li>
                      <strong>Clear timelines:</strong> Regulators and insurers must align on phased capital infusions
                      and digital upgrades to meet compliance deadlines.
                    </li>
                    <li>
                      <strong>Digital transformation:</strong> Real-time solvency reporting, e-policy issuance, and
                      mobile claims channels are now mandatory.
                    </li>
                    <li>
                      <strong>Policyholder awareness:</strong> Education campaigns help consumers understand rights,
                      claim timelines, and complaint processes.
                    </li>
                  </ul>

                  

                  <h5>Why It Matters</h5>
                  <p>
                    Proper implementation builds policyholder trust, boosts investment, and enhances market stability,
                    laying the foundation for scalable and equitable growth in motor, fire, marine, health, and life
                    insurance classes.
                  </p>

                  <div className="quote-wrapper">
                    <div className="wrapper">
                      <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                        <Image src={icon} alt="quote icon" className="lazy-img" />
                      </div>
                      <div className="row">
                        <div className="col-xxl-9 col-xl-11 m-auto">
                          <h3>
                            “Strong capital requirements must be matched by solid execution—digital platforms and claims
                            integrity are what restore trust.”
                          </h3>
                        </div>
                      </div>
                      <h6>
                        Market Analyst <span>— Lagos, 2025</span>
                      </h6>
                    </div>
                  </div>

                  <h5>Quick Checklist</h5>
                  <ul className="style-none list-item">
                    <li>Ensure systems for solvency, claims, and e-policy issuance are live and tested.</li>
                    <li>Train agents and customers on new standards and response expectations.</li>
                    <li>Track performance—claims turnaround, digital adoption, and solvency ratio publishing.</li>
                  </ul>

                  <p className="m0">
                    For Nigeria’s insurance industry, NIIRA 2025 isn’t the finish line—it’s a launchpad. Success depends
                    on how well insurers and regulators execute with integrity, transparency, and speed.
                  </p>
                </div>
                {/* ===== End Content ===== */}

                <div className="bottom-widget d-sm-flex align-items-center justify-content-between">
                  <ul className="d-flex align-items-center tags style-none pt-20">
                    <li>Tag:</li>
                    <li>
                      <Link href="#">Regulation</Link>
                    </li>
                    <li>
                      <Link href="#">Execution</Link>
                    </li>
                    <li>
                      <Link href="#">Insurance</Link>
                    </li>
                  </ul>
                  <ul className="d-flex share-icon align-items-center style-none pt-20">
                    <li>Share:</li>
                    <li>
                      <Link href="#">
                        <i className="bi bi-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="bi bi-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="bi bi-linkedin"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4 col-md-8">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsArea;
