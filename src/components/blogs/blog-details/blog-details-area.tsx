import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import BlogSidebar from "../blog-sidebar";
import blog_1 from "@/assets/images/blog/blog_img_01.jpg";
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
              <figure
                className="post-img position-relative d-flex align-items-end m0"
                style={{ backgroundImage: `url(${blog_1.src})` }}
              >
                <div className="date">{date}</div>
              </figure>

              <div className="post-data">
                <div className="post-info">{post_info}</div>
                <div className="blog-title">
                  <h4>{title}</h4>
                </div>

                {/* ===== BEGIN CLEAN CONTENT (no markdown or contentReference) ===== */}
                <div className="post-details-meta">
                  <p>
                    On <strong>5 August 2025</strong>, President Bola Ahmed Tinubu signed the landmark
                    <em> Nigerian Insurance Industry Reform Act, 2025 (NIIRA 2025)</em>, marking the most
                    comprehensive overhaul of the sector in over two decades.
                  </p>

                  <h5>Key Highlights of NIIRA 2025</h5>
                  <ul className="style-none list-item">
                    <li>
                      <strong>Stricter capital requirements:</strong> ₦15 billion for non-life insurers, ₦10 billion for life
                      insurers, and ₦35 billion for reinsurers.
                    </li>
                    <li>
                      <strong>Claims protection:</strong> zero tolerance for delayed claims with strict timelines and sanctions
                      for non-compliance.
                    </li>
                    <li>
                      <strong>Technology & transparency:</strong> mandatory digital reporting, solvency monitoring, and customer
                      data protections.
                    </li>
                    <li>
                      <strong>Market expansion:</strong> incentives for micro-insurance, agriculture, health, and MSME segments.
                    </li>
                  </ul>

                  <p>
                    The reforms aim to boost policyholder confidence, deepen penetration (currently among the lowest in
                    Africa), and attract new investment into underwriting and distribution. Operators now have defined
                    transition windows to meet the new capitalization thresholds and systems requirements.
                  </p>

                  <div className="quote-wrapper">
                    <div className="wrapper">
                      <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                        <Image src={icon} alt="icon" className="lazy-img" />
                      </div>
                      <div className="row">
                        <div className="col-xxl-9 col-xl-11 m-auto">
                          <h3>
                            “Faster, fairer claims and stronger balance sheets will restore trust and unlock growth across the
                            insurance value chain.”
                          </h3>
                        </div>
                      </div>
                      <h6>
                        Industry Commentary <span>— Lagos</span>
                      </h6>
                    </div>
                  </div>

                  

                  <h5>What this means for consumers</h5>
                  <ul className="style-none list-item">
                    <li>Stronger protections and clearer timelines for claims payment.</li>
                    <li>More product options (including micro-insurance) and better digital experiences.</li>
                    <li>Potential premium adjustments as insurers recapitalize and upgrade systems.</li>
                  </ul>

                  <h5>What this means for insurers & brokers</h5>
                  <ul className="style-none list-item">
                    <li>Capital planning, potential mergers/partnerships, and tighter risk management.</li>
                    <li>Mandatory digital reporting and enhanced compliance functions.</li>
                    <li>Opportunities in underserved lines like agriculture, health, and MSME covers.</li>
                  </ul>
                </div>
                {/* ===== END CLEAN CONTENT ===== */}

                <div className="bottom-widget d-sm-flex align-items-center justify-content-between">
                  <ul className="d-flex align-items-center tags style-none pt-20">
                    <li>Tag:</li>
                    <li>
                      <Link href="#">Insurance</Link>
                    </li>
                    <li>
                      <Link href="#">Nigeria</Link>
                    </li>
                    <li>
                      <Link href="#">Regulation</Link>
                    </li>
                  </ul>
                  <ul className="d-flex share-icon align-items-center style-none pt-20">
                    <li>Share:</li>
                    <li>
                      <Link href="#"><i className="bi bi-facebook"></i></Link>
                    </li>
                    <li>
                      <Link href="#"><i className="bi bi-twitter"></i></Link>
                    </li>
                    <li>
                      <Link href="#"><i className="bi bi-linkedin"></i></Link>
                    </li>
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
