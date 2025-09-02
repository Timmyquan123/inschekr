import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layout/wrapper";
import HeaderSeven from "@/layout/header/header-seven";
import FooterTwo from "@/layout/footer/footer-two";
import FancyBannerThree from "@/components/fancy-banner/fancy-banner-three";
import BreadcrumbTwo from "@/components/breadcrumb/breadcrumb-two";
import ServiceTwoArea from "@/components/services/service-v2-area";

export const metadata: Metadata = {
  title: "Service v2 Page",
};

const ServiceTwoPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <HeaderSeven />
        {/* header end */}
        <main>
          {/* breadcrumb start */}
          <BreadcrumbTwo
            title="Service Details"
            subtitle="Smarter insurance decisions made simple — from VIN to value, premium to policy."
            page="Services"
            style_4={true}
            col="col-xl-8 m-auto"
          />
          {/* breadcrumb end */}

          {/* service area start */}
          <ServiceTwoArea />
          {/* service area end */}

          {/* fancy banner three start */}
          <FancyBannerThree />
          {/* fancy banner three end */}
        </main>

        {/* footer start */}
        <FooterTwo />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default ServiceTwoPage;
