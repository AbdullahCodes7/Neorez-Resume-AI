import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import backline from "../assets/images/home/backLine.webp";

const TermService = () => {
  return (
    <>
      <div className="absolute top-1 -z-10">
        <img src={backline} alt="" />
      </div>
      <Navbar />
      <div className="cover">
        <div className="container">
          {/* HEADING */}
          <div className="mb-[50px] md:mb-[100px] mt-7 md:mt-40">
            <h2 className="text-center darkGray font-bold font-OpenSan mb-2">
              <span className="primary">Terms</span> of Service
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
                Welcome to Neorez. These Terms of Service govern your access to
                and use of our platform, ensuring a fair and respectful
                experience for all users.
              </p>
              {/* <p className="para-small grayShade6  font-normal font-OpenSan">
                These Terms of Service (“Terms”, “Terms of Service”) govern your
                use of our web pages located at [Your Website URL] operated by
                [Your Company Name]. Our Privacy Policy also governs your use of
                our Service and explains how we collect, safeguard and disclose
                information that results from your use of our web pages. Your
                agreement with us includes these Terms and our Privacy Policy
                (“Agreements”). You acknowledge that you have read and
                understood Agreements, and agree to be bound by them.
              </p>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                If you do not agree with (or cannot comply with) Agreements,
                then you may not use the Service, but please let us know by
                emailing at [Your Contact Information] so we can try to find a
                solution. These Terms apply to all visitors, users and others
                who wish to access or use Service.
              </p> */}
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Communications
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                By using our services, you consent to receive communications
                from us electronically. We will communicate with you via email
                or through our platform.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Purchases
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan mb-2">
                By purchasing any service or product through Neorez, you agree
                to our pricing terms and conditions.
              </p>

              {/* <p className="para-small grayShade6  font-normal font-OpenSan mb-2">
                We reserve the right to refuse or cancel your order at any time
                for reasons including but not limited to: product or service
                availability, errors in the description or price of the product
                or service, error in your order or other reasons.
              </p>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                We reserve the right to refuse or cancel your order if fraud or
                an unauthorized or illegal transaction is suspected.
              </p> */}
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Contests, Sweepstakes and Promotions
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                Participation in contests and promotions may be subject to
                additional terms, which will be provided at the time of the
                promotion.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Subscriptions
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan mb-2">
                Our subscription plans offer varying features and benefits.
                Details on each plan can be found on our pricing page.
              </p>
              {/* <p className="para-small grayShade6  font-normal font-OpenSan mb-2">
                At the end of each Billing Cycle, your Subscription will
                automatically renew under the exact same conditions unless you
                cancel it or [Your Company Name] cancels it. You may cancel your
                Subscription renewal either through your online account
                management page or by contacting [Your Company Name] customer
                support team.
              </p>
              <p className="para-small grayShade6  font-normal font-OpenSan mb-2">
                A valid payment method, including credit card, is required to
                process the payment for your subscription. You shall provide
                [Your Company Name] with accurate and complete billing
                information including full name, address, state, zip code,
                telephone number, and a valid payment method information. By
                submitting such payment information, you automatically authorize
                [Your Company Name] to charge all Subscription fees incurred
                through your account to any such payment instruments.
              </p>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                Should automatic billing fail to occur for any reason, [Your
                Company Name] will issue an electronic invoice indicating that
                you must proceed manually, within a certain deadline date, with
                the full payment corresponding to the billing period as
                indicated on the invoice.
              </p> */}
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Free Trial
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan mb-2">
                We offer a free trial period for new users. After the trial
                ends, you may be prompted to select a subscription plan.
              </p>
              {/* <p className="para-small grayShade6  font-normal font-OpenSan mb-2">
                If you do enter your billing information when signing up for
                Free Trial, you will not be charged by [Your Company Name] until
                Free Trial has expired. On the last day of Free Trial period,
                unless you cancelled your Subscription, you will be
                automatically charged the applicable Subscription fees for the
                type of Subscription you have selected.
              </p>
              <p className="para-small grayShade6  font-normal font-OpenSan mb-2">
                At any time and without notice, [Your Company Name] reserves the
                right to (i) modify Terms of Service of Free Trial offer, or
                (ii) cancel such Free Trial offer.
              </p> */}
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Fee Changes
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan mb-2">
                We reserve the right to modify subscription fees with prior
                notice to users.
              </p>
              {/* <p className="para-small grayShade6  font-normal font-OpenSan mb-2">
                [Your Company Name] will provide you with a reasonable prior
                notice of any change in Subscription fees to give you an
                opportunity to terminate your Subscription before such change
                becomes effective.
              </p>
              <p className="para-small grayShade6  font-normal font-OpenSan mb-2">
                Your continued use of Service after Subscription fee change
                comes into effect constitutes your agreement to pay the modified
                Subscription fee amount.
              </p> */}
            </div>
            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Subscription Fees
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan mb-2">
                All subscription fees must be paid in full before accessing
                premium features.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Content
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan mb-2">
                Users are responsible for the content they create using our
                platform. We reserve the right to monitor and remove any content
                that violates our terms.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Refunds
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan mb-2">
                Refunds for subscription fees may be considered under certain
                conditions, as detailed in our refund policy.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Prohibited Uses
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                Users are prohibited from using our services for illegal
                activities or to infringe on the rights of others.
              </p>
              {/* <ul className="para-small grayShade6  font-normal font-OpenSan  list-decimal ml-4">
                <li className="leading-6 lg10:leading-6 ">
                  In any way that violates any applicable national or
                  international law or regulation.
                </li>
                <li className="leading-6 lg10:leading-6 ">
                  For the purpose of exploiting, harming, or attempting to
                  exploit or harm minors in any way by exposing them to
                  inappropriate content or otherwise.
                </li>
                <li className="leading-6 lg10:leading-6 ">
                  To transmit, or procure the sending of, any advertising or
                  promotional material, including any “junk mail”, “chain
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermService;
