import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import BlogSidebar from "../blog-sidebar";
import heroImg from "@/assets/images/blog/blog_img_01.jpg";

import icon from "@/assets/images/icon/icon_93.svg";

import { IBlog } from "@/types/blog-d-t";

/**
 * News 9
 * Suggested title: “Pay-As-You-Drive Motor Insurance Takes Off in Nigeria”
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
                    Nigeria’s motor insurance market is seeing rapid adoption of{" "}
                    <strong>usage-based (Pay-As-You-Drive) and telematics</strong> policies as insurers roll out
                    smartphone- and OBD-powered plans that price premiums based on real driving behaviour, mileage, and time of day.
                    Early pilots in Lagos, Abuja, and Port Harcourt report improved risk selection and{" "}
                    <strong>up to 20–30% savings</strong> for safe, low-mileage drivers.
                  </p>

                  <h5>How It Works</h5>
                  <ul className="style-none list-item">
                    <li>
                      Drivers opt in to share trip data (speeding, harsh braking, night driving) via a{" "}
                      <strong>mobile app</strong> or <strong>plug-in OBD device</strong>.
                    </li>
                    <li>
                      Safer driving earns monthly discounts; risky patterns trigger nudges and higher pricing at renewal.
                    </li>
                    <li>
                      Fleet owners get <strong>dashboards</strong> for driver scoring, route optimization, and claims evidence.
                    </li>
                  </ul>

                  

                  <h5>Why It’s Growing Now</h5>
                  <ul className="style-none list-item">
                    <li>Smartphone penetration and cheaper data plans are making app-based telematics practical.</li>
                    <li>
                      Insurers seek <strong>better loss ratios</strong> amid inflation and rising spare-parts costs.
                    </li>
                    <li>
                      Consumers want <strong>fairer pricing</strong> (pay for how much/how well you drive), not flat rates.
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
                            “Telematics is transforming motor insurance from guesswork to data-driven pricing — safer
                            drivers finally get rewarded.”
                          </h3>
                        </div>
                      </div>
                      <h6>
                        Lagos Insurtech Founder <span>— 2025</span>
                      </h6>
                    </div>
                  </div>

                  <h5>What to Watch</h5>
                  <ul className="style-none list-item">
                    <li>Data privacy and consent frameworks in policy wordings and app permissions.</li>
                    <li>Coverage for ride-hailing and delivery fleets using mileage-based premiums.</li>
                    <li>
                      Integration with <strong>claims</strong>: crash detection, First Notice of Loss (FNOL), and faster payouts.
                    </li>
                  </ul>

                  <p className="m0">
                    For motorists who drive less or drive safer, usage-based plans can significantly cut premiums — and
                    for insurers, telematics improves risk selection and fraud control, creating a clear win-win.
                  </p>
                </div>
                {/* ===== End News ===== */}

                <div className="bottom-widget d-sm-flex align-items-center justify-content-between">
                  <ul className="d-flex align-items-center tags style-none pt-20">
                    <li>Tag:</li>
                    <li><Link href="#">Motor</Link></li>
                    <li><Link href="#">Telematics</Link></li>
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
