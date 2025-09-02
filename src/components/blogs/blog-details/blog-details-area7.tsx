import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import BlogSidebar from "../blog-sidebar";
import heroImg from "@/assets/images/blog/blog_img_01.jpg";
import inlineImg1 from "@/assets/images/blog/blog_img_07.jpg";
import inlineImg2 from "@/assets/images/blog/blog_img_08.jpg";
import icon from "@/assets/images/icon/icon_93.svg";

import { IBlog } from "@/types/blog-d-t";

/**
 * News 7
 * Title suggestion: “HMO Health Plans in Nigeria: What to Check Before You Buy”
 * You can pass your own title/date/post_info via the `blog` prop from the grid.
 */
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

                {/* ===== News 7 Content ===== */}
                <div className="post-details-meta">
                  <p>
                    Health insurance via <strong>HMOs (Health Maintenance Organizations)</strong> is growing quickly in
                    Nigeria—driven by rising healthcare costs and the need for predictable medical bills. But plans differ
                    a lot in hospital networks, exclusions, and claims processes. Here’s a practical checklist to help you
                    pick a plan that actually works when you need it.
                  </p>

                  <h5>1) Provider Network & Access</h5>
                  <ul className="style-none list-item">
                    <li>
                      Confirm your preferred <strong>hospitals/clinics</strong> are in-network—especially near home and work.
                    </li>
                    <li>
                      Check <strong>emergency care</strong> rules, referral requirements, and whether tertiary hospitals are covered.
                    </li>
                  </ul>

                  <h5>2) Benefits & Exclusions</h5>
                  <ul className="style-none list-item">
                    <li>
                      Review what’s covered: <strong>consultations, labs, scans, maternity, surgeries, medications</strong>.
                    </li>
                    <li>
                      Watch for limits on <strong>pre-existing conditions</strong>, dental/optical caps, and chronic care.
                    </li>
                  </ul>

                  

                  <h5>3) Claims Experience & Support</h5>
                  <ul className="style-none list-item">
                    <li>
                      Ask about <strong>approval timelines</strong>, 24/7 support, and how escalations are handled.
                    </li>
                    <li>
                      Look for an <strong>app/portal</strong> for e-cards, provider lists, and pre-authorization requests.
                    </li>
                  </ul>

                  <h5>4) Premiums vs. Value</h5>
                  <ul className="style-none list-item">
                    <li>
                      Compare plans by <strong>total value</strong> (coverage + network + service), not just price.
                    </li>
                    <li>
                      Consider family add-ons, maternity waiting periods, and co-payments where applicable.
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
                            “The best HMO isn’t the cheapest—it’s the one that pays quickly, covers your needs, and has your hospitals.”
                          </h3>
                        </div>
                      </div>
                      <h6>
                        Health Benefits Advisor <span>— Lagos</span>
                      </h6>
                    </div>
                  </div>

                  <h5>Quick Takeaway</h5>
                  <p>
                    Shortlist 2–3 plans that include your preferred hospitals, compare exclusions and waiting periods,
                    and read recent customer reviews. If you’re an SME, negotiate group rates—benefits and service levels
                    often improve with group policies.
                  </p>
                </div>
                {/* ===== End Content ===== */}

                <div className="bottom-widget d-sm-flex align-items-center justify-content-between">
                  <ul className="d-flex align-items-center tags style-none pt-20">
                    <li>Tag:</li>
                    <li><Link href="#">Health Insurance</Link></li>
                    <li><Link href="#">HMO</Link></li>
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
