import React from "react";
import { Collapse } from "antd";
const Faq = ({ isStartedPage }) => {
  const items = [
    {
      key: "1",
      label: "What is Neorez?",
      children: (
        <p>
          Neorez is an AI-powered resume platform designed to help job seekers
          create tailored resumes and cover letters easily.
        </p>
      ),
    },
    {
      key: "2",
      label: "How does the AI Resume Builder work?",
      children: (
        <p>
          Our AI analyzes job descriptions to optimize your resume, ensuring it
          meets the requirements of hiring managers and applicant tracking
          systems (ATS).
        </p>
      ),
    },
    {
      key: "3",
      label: "Are there any costs associated with using Neorez?",
      children: (
        <p>
          We offer various subscription plans, including a free trial, allowing
          you to explore our features before committing. Pricing details are
          available on our website.
        </p>
      ),
    },
    {
      key: "4",
      label: "Can I use Neorez for free?",
      children: (
        <p>
          Yes, we offer a free trial that lets you access our key features
          without any charge. After the trial, you can choose to continue with a
          subscription plan.
        </p>
      ),
    },
    {
      key: "5",
      label: "What types of resume templates do you offer?",
      children: (
        <p>
          Neorez provides a wide variety of professionally designed resume
          templates suitable for different industries, experience levels, and
          styles. You can customize these templates to fit your needs.
        </p>
      ),
    },
    {
      key: "6",
      label: "How do I ensure my resume is ATS-friendly?",
      children: (
        <p>
          Our AI Resume Builder is specifically designed to create ATS-friendly
          resumes. It includes features like keyword optimization and formatting
          guidelines that help ensure your resume gets past automated screening
          systems.
        </p>
      ),
    },
    {
      key: "7",
      label: "Can I download my resume in different formats?",
      children: (
        <p>
          Yes, you can download your resume in various formats, including PDF,
          Word, and plain text, making it easy to submit your application in the
          required format.
        </p>
      ),
    },
    {
      key: "8",
      label: "How do I create a cover letter using Neorez?",
      children: (
        <p>
          Our Cover Letter Builder guides you through the process of creating a
          professional cover letter. You can choose from customizable templates
          and receive suggestions tailored to your resume.
        </p>
      ),
    },
    {
      key: "9",
      label: "What if I need help while using the platform?",
      children: (
        <p>
          We offer customer support through email and live chat. Our help center
          also provides resources and tutorials to assist you in navigating the
          platform.
        </p>
      ),
    },
    {
      key: "10",
      label: "Is my personal information safe with Neorez?",
      children: (
        <p>
          Yes, we take your privacy seriously. Our Privacy Policy outlines how
          we collect, use, and protect your personal information. We use
          industry-standard security measures to safeguard your data.
        </p>
      ),
    },
  ];
  const onChange = (key) => {
    // console.log(key);
  };
  return (
    <>
      <section className={`faq ${isStartedPage ? "" : "wrap"}`}>
        <div className="container">
          <div className="mb-[50px] md:mb-[100px]">
            <h2 className="text-center darkGray font-semibold">
              Frequently Asked <span className="primary">Questions</span>
            </h2>
          </div>

          <Collapse
            items={items}
            defaultActiveKey={["1"]}
            onChange={onChange}
            // expandIcon={arrow}
            expandIconPosition={"end"}
            size={"large"}
          />
        </div>
      </section>
    </>
  );
};

export default Faq;
