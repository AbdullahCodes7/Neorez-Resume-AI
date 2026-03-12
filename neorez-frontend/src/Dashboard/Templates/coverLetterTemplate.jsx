import React from "react";
import line from "../../assets/icons/dashboard/line.svg";
import rectangle from "../../assets/icons/dashboard/rectangle.svg";

const CoverLetterTemplate = () => {
  return (
    <div className="modal-wrap  resume-outline px-[40px] py-[40px]">
      <div className="generateModal">
        <div className="ml-9 mt-4 relative ">
          <img src={line} alt="line image" />
          <img src={rectangle} alt="line image" className="absolute top-12" />

          <div className="flex flex-col absolute top-6 left-[20px]">
            <h2 className="font-OpenSans text-[27px] font-normal mediumBlack  ">
              Nancel Camebert
            </h2>

            <h3 className="font-bold font-OpenSan para-ex-small mediumGray capitalize">
              Web UX/UI Designer
            </h3>

            <p className="font-normal font-OpenSan para-ex-small mediumGray w-[383px] bg-transparent border-none outline-none ">
              Lorem ipsum dolor sit amet consectetur. Quis facilisi justo
              integer malesuada. Augue quis mauris vitae amet adipiscing semper
              suspendisse velit. Volutpat morbi et lacus nec dignissim neque.
              Dictum non elit sed lectus odio.
            </p>
          </div>
        </div>
        <p className="ml-9 mt-[100px] mb-3 font-normal font-OpenSan mediumBlack text-[10px] capitalize bg-transparent ">
          Dear, Mr. Daniel
        </p>

        <div className="generateBox ">
          <p className="font-normal font-OpenSan mediumGray para-ex-small bg-transparent border-none outline-none w-full ">
            Lorem ipsum dolor sit amet consectetur. Quis facilisi justo integer
            malesuada. Augue quis mauris vitae amet adipiscing semper
            suspendisse velit. Volutpat morbi et lacus nec dignissim neque.
            Dictum non elit sed lectus odio. Feugiat ac euismod feugiat eget.
            Etiam ullamcorper ligula sed in.
          </p>
          <p className="font-normal font-OpenSan mediumGray para-ex-small bg-transparent border-none outline-none w-full ">
            Dolor ultrices eget orci nisi orci nibh. Sed eget volutpat facilisi
            quis blandit diam eu consequat ac. Nunc posuere dictumst morbi etiam
            suscipit. Posuere tellus tincidunt amet tortor vitae arcu ultricies.
            Turpis nunc id elementum fusce nibh magna mattis arcu aliquet. Purus
            id sit in sit ullamcorper elit.
          </p>
          <p className="font-normal font-OpenSan mediumGray para-ex-small bg-transparent border-none outline-none w-full ">
            Suspendisse pretium dui id vitae ornare turpis. Integer cras
            adipiscing orci lacus sagittis nibh tellus duis sit. At libero morbi
            vel cras gravida venenatis vel. Vestibulum quis elit et tellus in
            varius in in.
          </p>
        </div>
        <div>
          <p className="bg-transparent capitalize font-normal font-OpenSan mediumBlack para-ex-small mt-2 ml-[74px]  border-none outline-none">
            Best regards
          </p>

          <div className="ml-[103px] mt-4 flex flex-col">
            <p className=" font-normal font-OpenSan primary para-small bg-transparent capitalize">
              Nancel Camebert
            </p>

            <p className=" font-normal font-OpenSan mediumGray para-ex-small bg-transparent capitalize">
              Web UX/UI Designer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterTemplate;
