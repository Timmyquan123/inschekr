import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import screen_1 from "@/assets/images/assets/screen_04.svg";
import screen_2 from "@/assets/images/assets/screen_05.svg";
import shape from "@/assets/images/shape/shape_06.svg";

// image style
const imageStyle = {
  height: "auto",
};

const TextFeatureThree = ({ cls, style_2 }: { cls?: string; style_2?: boolean }) => {
  return (
    <>
      {!style_2 && (
        <div className={`text-feature-three position-relative ${cls ? cls : "mt-30 pb-150 lg-pb-80"}`}>
          <div className="container">
            <div className="row">
              <div className="col-xxl-5 col-lg-6 ms-auto d-flex flex-column order-lg-last wow fadeInRight">
                <div className="title-one">
                  <div className="upper-title">About InSchekr</div>
                  <h2>Tools that make insurance simple.</h2>
                </div>
                <p className="text-lg mt-45 lg-mt-30 mb-35 lg-mb-30">
                  InSchekr helps Nigerians decode VINs, estimate car values, calculate premiums, and compare policies
                  across Motor, Fire, Marine, Health, & Life—so you can choose confidently.
                </p>
                <div>
                  <Link href="/about" className="btn-four mt-15">
                    Learn More
                  </Link>
                </div>

                <div className="counter-wrapper mt-60 lg-mt-40 pt-25 lg-pt-10">
                  <div className="row">
                    <div className="col-xl-6 col-sm-5">
                      <div className="counter-block-one mt-20">
                        <div className="main-count fw-bold">
                          <span className="counter">10</span>k+
                        </div>
                        <p className="m0">VINs decoded</p>
                      </div>
                    </div>
                    <div className="col-xl-6 col-sm-7">
                      <div className="counter-block-one mt-20">
                        <div className="main-count fw-bold">
                          <span className="counter">25</span>k+
                        </div>
                        <p className="m0">Policies compared</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-6 col-lg-5 d-flex order-lg-first wow fadeInLeft">
                <div className="media-wrapper w-100 position-relative">
                  <Image src={screen_1} alt="InSchekr screens" className="lazy-img shapes screen_01" style={imageStyle} />
                  <Image src={screen_2} alt="InSchekr features" className="lazy-img shapes screen_02" style={imageStyle} />
                </div>
              </div>
            </div>
          </div>
          <Image src={shape} alt="shape" className="lazy-img shapes shape_01" />
        </div>
      )}

      {style_2 && (
        <div className="text-feature-three text-feature-one position-relative mt-150 lg-mt-80 pb-150 lg-pb-80">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xxl-5 col-lg-6 ms-auto d-flex flex-column order-lg-last wow fadeInRight">
                <div className="title-one">
                  <div className="upper-title">Have Questions?</div>
                  <h2>Get guidance in minutes.</h2>
                </div>
                <p className="text-lg mt-35 lg-mt-10 mb-30">
                  Not sure which cover fits? Our tools & team help you decode vehicles, estimate value, and compare
                  premiums—fast and clearly.
                </p>
                <div>
                  <Link href="/contact" className="btn-four mt-15">
                    Ask the Team
                  </Link>
                </div>

                <div className="counter-wrapper mt-50 lg-mt-40 pt-5">
                  <div className="row">
                    <div className="col-xl-6 col-sm-5">
                      <div className="counter-block-one mt-20">
                        <div className="main-count fw-bold">
                          <span className="counter">5</span>+
                        </div>
                        <p className="m0">Insurance classes</p>
                      </div>
                    </div>
                    <div className="col-xl-6 col-sm-7">
                      <div className="counter-block-one mt-20">
                        <div className="main-count fw-bold">
                          <span className="counter">99</span>%
                        </div>
                        <p className="m0">User satisfaction</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-7 col-lg-6 wow fadeInLeft">
                <div className="media-list-item me-auto pe-xxl-5 pe-4 ps-xxl-5 ps-4 pb-35 md-mt-40 d-flex align-items-end">
                  <ul className="style-none">
                    <li>VIN / Chassis decoder with make, model & year.</li>
                    <li>Car value estimator calibrated for Nigerian market.</li>
                    <li>Premium calculator & policy comparison across classes.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TextFeatureThree;
