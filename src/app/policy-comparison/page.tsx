import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layout/wrapper";
import HeaderSeven from "@/layout/header/header-seven";
import BreadcrumbOne from "@/components/breadcrumb/breadcrumb-one";
import FooterThree from "@/layout/footer/footer-three";
import service_bg from "@/assets/images/media/img_32.jpg";

import shape from "@/assets/images/shape/shape_27.svg";
import PolicyComparison from "@/components/services/policy-comparison";
import NewsletterBanner from "@/components/newsletter/newsletter-banner";

export const metadata: Metadata = {
  title: "Service Details Page",
};

const PolicyComparisons = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <HeaderSeven />
        {/* header end */}
        <main>
          {/* breadcrumb start */}
          <BreadcrumbOne
            title="InSchekr Service "
            subtitle="Smarter insurance decisions made simple — from VIN to value, premium to policy."
            page="Services"
            shape={shape}
            bg_img={service_bg}
            style_2={true}
            cls="me-xl-4"
          />
          {/* breadcrumb end */}

          {/* service details area start */}
          <PolicyComparison />
          {/* service details area end */}

          

          {/* news letter start */}
          <NewsletterBanner />
          {/* news letter end */}
        </main>

        {/* footer start */}
        <FooterThree style_2={true} />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default PolicyComparisons;
