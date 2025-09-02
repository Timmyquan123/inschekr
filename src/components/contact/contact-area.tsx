import React from "react";
import Image, { StaticImageData } from "next/image";
// internal
import icon_1 from "@/assets/images/icon/icon_90.svg";
import icon_2 from "@/assets/images/icon/icon_91.svg";

import icon_4 from "@/assets/images/assets/ils_07.svg";
import ContactForm from "../forms/contact-form";

// address block item
function AddressBlock({
  icon,
  title,
  subtitle,
}: {
  icon: StaticImageData;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="address-block-one text-center mb-40 wow fadeInUp">
      <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
        <Image src={icon} alt="icon" className="lazy-img" />
      </div>
      <h5 className="title">{title}</h5>
      <p dangerouslySetInnerHTML={{ __html: subtitle }}></p>
    </div>
  );
}

const ContactArea = () => {
  return (
    <div className="contact-us-section pt-150 lg-pt-80">
      <div className="container">
        <div className="position-relative">
          <div className="row">
            <div className="col-12 m-auto">
              <div className="row">
                <div className="col-md-4">
                  <AddressBlock
                    icon={icon_1}
                    title="Our Address"
                    subtitle="Lagos, Nigeria"
                  />
                </div>
                <div className="col-md-4">
                  <AddressBlock
                    icon={icon_2}
                    title="Contact Info"
                    subtitle='Send us a mail at <br/><a href="mailto:InSchekr@gmai.com" className="call text-lg fw-500">InScheckr@gmail.com</a>'
                  />
                </div>
                
              </div>
            </div>
          </div>

          <div className="bg-wrapper light-bg mt-80 lg-mt-40">
            <div className="row">
              <div className="col-lg-5">
                <div className="d-flex flex-column flex-lg-column-reverse">
                  <div className="row">
                    <div className="col-md-8 col-6 me-auto ms-auto">
                      <Image
                        src={icon_4}
                        alt="icon"
                        className="lazy-img me-auto ms-auto"
                      />
                    </div>
                  </div>
                  <div className="title-one text-center text-lg-start md-mt-20 mb-70 md-mb-30">
                    <h2>Have inquiries? Reach out via message</h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="form-style-one ps-xl-5">
                  {/* form start */}
                  <ContactForm />
                  {/* form end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ContactArea;
