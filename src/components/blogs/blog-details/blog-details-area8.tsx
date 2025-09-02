import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import BlogSidebar from "../blog-sidebar";
import heroImg from "@/assets/images/blog/blog_img_01.jpg";

import icon from "@/assets/images/icon/icon_93.svg";

import { IBlog } from "@/types/blog-d-t";

/**
 * News 8
 * Suggested title: “Flood Risks Drive Surge in Nigerian Agricultural Insurance”
 */
const BlogDetailsArea = ({ blog }: { blog: IBlog }) => {
  const { date, title, post_info } = blog || {};
  return (
    <div className="blog-details position-relative mt-150 lg-mt-80 mb-150 lg-mb-80">
      <div className="container">
        <div className="row gx-xl-5">
          <div className="col-lg-8">
            <article className="blog-meta-two style-two">
              {/* Hero image */}
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
                    Following <strong>severe flooding in 2022 and 2023</strong> that destroyed thousands of farms across
                    Kogi, Anambra, Benue, and Niger States, Nigerian farmers and agribusinesses are increasingly turning
                    to <strong>agricultural insurance</strong>. The National Insurance Commission (NAICOM) reported a{" "}
                    <strong>45% jump</strong> in agri-policy subscriptions in the first half of 2025.
                  </p>

                  <h5>Why This Matters</h5>
                  <ul className="style-none list-item">
                    <li>
                      Agriculture employs <strong>over 30% of Nigeria’s workforce</strong>, but less than 5% of farmers
                      were previously insured.
                    </li>
                    <li>
                      Climate change is making rainfall <strong>more unpredictable</strong>, pushing banks to require
                      insurance before approving agri-loans.
                    </li>
                  </ul>

                  

                  <h5>Policy Innovations</h5>
                  <p>
                    Insurers like <strong>Leadway Assurance</strong> and <strong>Royal Exchange General Insurance</strong>{" "}
                    are now offering:
                  </p>
                  <ul className="style-none list-item">
                    <li>Index-based crop insurance tied to rainfall patterns.</li>
                    <li>Livestock mortality cover for poultry and cattle farmers.</li>
                    <li>
                      Bundled packages combining insurance with <strong>farm input loans</strong> and extension services.
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
                            “Insurance is no longer a luxury for farmers; it’s a survival tool in Nigeria’s changing
                            climate.”
                          </h3>
                        </div>
                      </div>
                      <h6>
                        NAICOM Commissioner <span>— Abuja, 2025</span>
                      </h6>
                    </div>
                  </div>

                  <h5>Looking Ahead</h5>
                  <p>
                    With the Federal Government’s <strong>National Agricultural Insurance Scheme (NAIS)</strong> expansion
                    and donor-backed subsidy programs, agri-insurance adoption is projected to double by 2027. The key
                    challenge will be building farmer trust through <strong>timely claims settlement</strong>.
                  </p>
                </div>
                {/* ===== End News ===== */}

                <div className="bottom-widget d-sm-flex align-items-center justify-content-between">
                  <ul className="d-flex align-items-center tags style-none pt-20">
                    <li>Tag:</li>
                    <li><Link href="#">Agriculture</Link></li>
                    <li><Link href="#">Insurance</Link></li>
                    <li><Link href="#">Nigeria</Link></li>
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
