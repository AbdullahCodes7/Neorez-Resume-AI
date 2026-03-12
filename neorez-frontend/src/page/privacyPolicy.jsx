import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import backline from "../assets/images/home/backLine.webp";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="absolute top-1 -z-10">
        <img src={backline} alt="" />
      </div>
      <Navbar />
      <div className="cover relative">
        <div className="container">
          {/* HEADING */}
          <div className="mb-[50px] md:mb-[100px] mt-7 md:mt-40">
            <h2 className="text-center darkGray font-bold font-OpenSan mb-2">
              <span className="primary">Privacy</span> Policy
            </h2>
            <h3 className=" para-small grayShade6  text-center font-normal font-OpenSan max-w-[978px] m-auto">
              Privacy policy is a statement or legal document that explains how
              a website or app collects, uses, and protects the personal
              information of its users. It informs users about their privacy
              rights and how their data will be handled.
            </h3>
          </div>

          <div className="mt-4 md:mt-20">
            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Introduction
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                Welcome to Neorez. We are committed to protecting your personal
                information and your right to privacy. If you have any questions
                or concerns about our policy or our practices regarding your
                personal information, please contact us at [Your Contact
                Information].
              </p>
            </div>

            {/* <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Personal Information
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                We collect personal information that you provide to us such as
                name, address, contact information, passwords and security data,
                and payment information.
              </p>
            </div> */}

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Information Collection
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                We collect personal information when you register, use our
                services, or interact with our platform. This information is
                used to enhance your experience and provide better services.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Use of Information
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                Your information may be used to communicate with you, improve
                our services, and process your requests. We do not sell or share
                your data with third parties without your consent.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Data Protection
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                We employ security measures to protect your personal information
                from unauthorized access, loss, or misuse.
              </p>
              {/* <ul className="para-small grayShade6  font-normal font-OpenSan  list-disc ml-4">
                <li className="leading-6 lg10:leading-8">
                  To provide and manage our services.
                </li>
                <li className="leading-6 lg10:leading-8">
                  To create and manage user accounts.
                </li>
                <li className="leading-6 lg10:leading-8">
                  To fulfill and manage your job search and application process.
                </li>
                <li className="leading-6 lg10:leading-8">
                  To send administrative information to you.
                </li>
                <li className="leading-6 lg10:leading-8">
                  To protect our services.
                </li>
                <li className="leading-6 lg10:leading-8">
                  To enforce our terms, conditions, and policies.
                </li>
                <li className="leading-6 lg10:leading-8">
                  To respond to legal requests and prevent harm.
                </li>
              </ul> */}
            </div>

            {/* <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Sharing Your Information
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                We only share and disclose your information in the following
                situations:
              </p>
              <ul className="para-small grayShade6  font-normal font-OpenSan  list-disc ml-4">
                <li className="leading-6 lg10:leading-8">
                  Compliance with Laws: We may disclose your information where
                  we are legally required to do so in order to comply with
                  applicable law, governmental requests, a judicial proceeding,
                  court order, or legal process.
                </li>
                <li className="leading-6 lg10:leading-8">
                  Business Transfers: We may share or transfer your information
                  in connection with, or during negotiations of, any merger,
                  sale of company assets, financing, or acquisition of all or a
                  portion of our business to another company.
                </li>
                <li className="leading-6 lg10:leading-8">
                  With Your Consent: We may disclose your personal information
                  for any other purpose with your consent.
                </li>
              </ul>
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Data Security
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                We use administrative, technical, and physical security measures
                to help protect your personal information. While we have taken
                reasonable steps to secure the personal information you provide
                to us, please be aware that despite our efforts, no security
                measures are perfect or impenetrable, and no method of data
                transmission can be guaranteed against any interception or other
                type of misuse.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Your Privacy Rights
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                Depending on where you are located, you may have the following
                rights with respect to your personal information:
              </p>
              <ul className="para-small grayShade6  font-normal font-OpenSan  list-disc ml-4">
                <li className="leading-6 lg10:leading-8">
                  The right to access.
                </li>
                <li className="leading-6 lg10:leading-8">
                  The right to correction.
                </li>
                <li className="leading-6 lg10:leading-8">
                  The right to deletion.
                </li>
                <li className="leading-6 lg10:leading-8">
                  The right to restrict processing.
                </li>
                <li className="leading-6 lg10:leading-8">
                  The right to data portability.
                </li>
                <li className="leading-6 lg10:leading-8">
                  The right to withdraw consent.
                </li>
              </ul>
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Updates to This Policy
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                We may update this privacy policy from time to time in order to
                reflect, for example, changes to our practices or for other
                operational, legal, or regulatory reasons. We will notify you of
                any changes by posting the new privacy policy on this page. You
                are advised to review this privacy policy periodically for any
                changes.
              </p>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
