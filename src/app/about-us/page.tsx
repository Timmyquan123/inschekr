import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layout/wrapper";
import HeaderSeven from "@/layout/header/header-seven";
import BreadcrumbOne from "@/components/breadcrumb/breadcrumb-one";
import FooterThree from "@/layout/footer/footer-three";
import about_bg from "@/assets/images/media/img_26.jpg";
import FancyBannerThree from "@/components/fancy-banner/fancy-banner-three";
import shape from "@/assets/images/shape/shape_25.svg";
import TextFeatureOne from "@/components/text-feature/text-feature-one";
import BlockFeatureOne from "@/components/block-feature/block-feature-one";
import TextFeatureThree from "@/components/text-feature/text-feature-three";

import NewsletterBanner from "@/components/newsletter/newsletter-banner";

export const metadata: Metadata = {
  title: "About Us Page",
};

const AboutUsPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <HeaderSeven />
        {/* header end */}
        <main>
          {/* breadcrumb start */}
          <BreadcrumbOne
            title="We’re InSchekr — "
subtitle="Simplifying insurance in Nigeria with smart tools for motor, fire, marine, life, and more."
page="About Us"

            bg_img={about_bg}
            shape={shape}
            style_2={true}
          />
          {/* breadcrumb end */}

          {/* text feature one area start */}
          <TextFeatureOne style_2={true} />
          {/* text feature one area end */}

          {/* block feature one area start */}
          <BlockFeatureOne style_2={true} />
          {/* block feature one area end */}

          {/* text feature one area start */}
          <TextFeatureThree style_2={true} />
          {/* text feature one area end */}

         

          
         

          {/* fancy banner three start */}
          <FancyBannerThree />
          {/* fancy banner three end */}

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

export default AboutUsPage;
