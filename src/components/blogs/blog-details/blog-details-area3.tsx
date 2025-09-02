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

                {/* ===== Third News Content ===== */}
                <div className="post-details-meta">
                  <p>
                    Nigerian insurers are piloting <strong>parametric flood insurance</strong> for households and SMEs in
                    high-risk areas, starting with clusters in Lagos and Bayelsa. Unlike traditional policies, payouts are
                    triggered automatically when an agreed flood index crosses a threshold, speeding up relief and cutting
                    paperwork.
                  </p>

                  <h5>How parametric flood cover works</h5>
                  <ul className="style-none list-item">
                    <li>
                      <strong>Objective triggers:</strong> satellite rainfall, river-gauge levels, or water-depth sensors define when a payout is due.
                    </li>
                    <li>
                      <strong>Fast payouts:</strong> once the index breaches the trigger, payments are processed without loss assessment visits.
                    </li>
                    <li>
                      <strong>Transparent pricing:</strong> premiums reflect location risk bands and historical flood frequency.
                    </li>
                  </ul>

                  <p>
                    Brokers say the product is designed to complement existing property policies by filling gaps in
                    catastrophe response. For micro and small businesses, faster liquidity after a flood can reduce downtime
                    and inventory losses, improving resilience.
                  </p>

                  <div className="quote-wrapper">
                    <div className="wrapper">
                      <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                        <Image src={icon} alt="icon" className="lazy-img" />
                      </div>
                      <div className="row">
                        <div className="col-xxl-9 col-xl-11 m-auto">
                          <h3>
                            “Speed matters after floods. Parametric triggers move cash to customers when they need it most.”
                          </h3>
                        </div>
                      </div>
                      <h6>
                        Market Watch <span>— Nigeria</span>
                      </h6>
                    </div>
                  </div>

                 

                  <h5>What to check before you buy</h5>
                  <ul className="style-none list-item">
                    <li>Trigger definition and data source (e.g., rain gauge vs. satellite precipitation).</li>
                    <li>Payout table: amount paid at each trigger level and annual maximum benefit.</li>
                    <li>Waiting period, geographic coordinates covered, and exclusions.</li>
                  </ul>

                  <p>
                    Rollout will expand through insurers and partners in states with recurring seasonal flooding.
                    Customers can bundle parametric flood with existing fire or homeowners’ cover for broader protection.
                  </p>
                </div>
                {/* ===== End content ===== */}

                <div className="bottom-widget d-sm-flex align-items-center justify-content-between">
                  <ul className="d-flex align-items-center tags style-none pt-20">
                    <li>Tag:</li>
                    <li><Link href="#">Insurance</Link></li>
                    <li><Link href="#">Flood</Link></li>
                    <li><Link href="#">Parametric</Link></li>
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
