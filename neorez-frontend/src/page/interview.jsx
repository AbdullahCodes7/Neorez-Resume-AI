import React from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import backline from "../assets/images/home/backLine.webp";

const Interview = () => {
  return (
    <>
      <div className="absolute top-1 -z-10">
        <img src={backline} alt="" />
      </div>
      <Navbar />
      <div className="policy">
        <div className="container">
          {/* HEADING */}
          <div className="mb-[50px] md:mb-[100px] mt-7 md:mt-40">
            <h2 className="text-center darkGray font-bold font-OpenSan mb-2">
              <span className="primary">Interview </span> Tips
            </h2>
            {/* <h3 className=" para-small grayShade6  text-center font-normal font-OpenSan max-w-[978px] m-auto">
              Lorem ipsum dolor sit amet consectetur. Eros vulputate morbi
              integer proin dis elit quam quis. At varius lacus integer odio
              imperdiet tempus diam proin purus.
            </h3> */}
          </div>

          <div className="mt-4 md:mt-20">
            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Prepare Thoroughly
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                Before the interview, immerse yourself in the company’s mission,
                values, and culture. Understand their products and services to
                demonstrate genuine interest and align your responses with their
                goals.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Research the Company
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                Dig deep into the company’s background. Familiarize yourself
                with recent news, projects, and industry trends. This knowledge
                will help you tailor your answers and ask insightful questions
                during the interview.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Understand the Job Description
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                Thoroughly analyze the job requirements. Prepare specific
                examples of how your skills and experiences match these
                requirements. Using the STAR method (Situation, Task, Action,
                Result) can help you structure your answers effectively.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Practice Common Interview Questions
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                Anticipate typical interview questions such as “Tell me about
                yourself.” Prepare for behavioral and technical questions that
                are relevant to the position, allowing you to respond
                confidently and concisely.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Dress Appropriately
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                Choose professional attire that aligns with the company’s dress
                code. Ensure your clothes are clean, well-fitted, and
                appropriate for the workplace to make a positive first
                impression.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Bring Necessary Materials
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                Pack essential materials such as copies of your resume, a
                portfolio (if applicable), and a notepad with a pen for jotting
                down notes. Being organized reflects professionalism and
                preparedness
              </p>
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Arrive Early
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                Plan your route and aim to arrive 10-15 minutes early. This
                allows time to settle in and shows respect for the interviewer's
                schedule. Be polite to everyone you encounter on your way in.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Demonstrate Good Body Language
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                Exhibit confidence through positive body language. Maintain good
                posture, make eye contact, and use nods and smiles to show
                engagement and interest in the conversation.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Ask Thoughtful Questions
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                Prepare a list of insightful questions about the team, company
                culture, and job responsibilities. Thoughtful inquiries show
                your interest and help you determine if the company is the right
                fit for you.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Follow-Up
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                After the interview, send a thank-you email within 24 hours.
                Express your appreciation for the opportunity, reiterate your
                interest in the position, and mention a specific detail from the
                interview to personalize your message.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="darkGray font-bold font-OpenSan mb-1 black-shade">
                Reflect and Improve
              </h3>
              <p className="para-small grayShade6  font-normal font-OpenSan">
                Post-interview, take time to assess your performance. Consider
                what went well and what could be improved. If you don’t get the
                job, seek constructive feedback to enhance your interview skills
                for future opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Interview;
