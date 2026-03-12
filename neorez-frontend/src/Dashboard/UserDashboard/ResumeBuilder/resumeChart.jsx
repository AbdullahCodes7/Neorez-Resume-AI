import React from "react";
import { Progress, Card, Typography } from "antd";

const { Text, Title } = Typography;

const ResumeMatchCard = ({ resumeData }) => {
  return (
    <div className="w-full">
      <Card
        style={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          textAlign: "center",
        }}
      >
        <Title level={4} style={{ marginBottom: 0 }}>
          Score
        </Title>

        {/* Circular Progress */}
        <div style={{ margin: "20px 0", position: "relative" }}>
          {/* Inner shadow effect */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100px",
              height: "100px",
              // borderRadius: "50%",
              // background: "radial-gradient(circle, rgba(173, 216, 230, 0.6))",
              // zIndex: 1,
            }}
          />
          <Progress
            className="resumeanalysechart"
            type="circle"
            percent={resumeData?.OverallScore}
            size={140} // Make the circle larger
            strokeColor={{
              "10%": "#102E7A", // Teal
              "15%": "#00CED1", // Teal
              "35%": "#FF59C6", // Pink start
              "85%": "#9400D3", // Purple
              "16%": "#1E90FF", // Blue
              "11%": "#655EAC", // Teal
            }}
            strokeWidth={8} // Increase stroke width to make it thicker
            format={(percent) => `${percent}%`}
            //   style={{
            //     borderRadius: "100%", // Rounding the edges
            //     zIndex: 2, // Place above the inner shadow effect
            //   }}
          />
        </div>

        {/* Display Review */}
        <div style={{ textAlign: "left", marginTop: "20px" }}>
          <div style={{ marginBottom: 16 }}>
            <p className="para-small font-extrabold darkGray font-OpenSan">
              Review:
            </p>
            <p className="para-small font-medium darkGray font-OpenSan">
              {resumeData?.ReviewInOneLine}
            </p>
          </div>
          {resumeData?.JobTitleMatch && (
            <div style={{ marginBottom: 16 }}>
              <p className="para-small font-extrabold darkGray font-OpenSan">
                JobTitle Match:
              </p>
              <p className="para-small font-medium darkGray font-OpenSan">
                {resumeData?.JobTitleMatch}
              </p>
            </div>
          )}
          {resumeData?.missingKeywords &&
            resumeData?.missingKeywords?.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <p className="para-small font-extrabold darkGray font-OpenSan">
                  Missing Keywords:
                </p>
                <p className="para-small font-medium darkGray font-OpenSan">
                  {resumeData.missingKeywords.map((item, index) => (
                    <>
                      <div className="flex flex-col gap-2 mb-1">
                        {/* <span className="font-bold darkGray font-OpenSan capitalize">
                      suggestion:{" "}
                      <span className="text-sm font-medium font-OpenSan">
                        {item.suggestion}
                      </span>
                    </span> */}
                        <span className="font-bold darkGray font-OpenSan capitalize">
                          Keyword:{" "}
                          <span className="text-sm font-medium font-OpenSan">
                            {item.keyword}
                          </span>
                        </span>
                        <span className="font-bold darkGray font-OpenSan capitalize">
                          reason:{" "}
                          <span className="text-sm font-medium font-OpenSan">
                            {item.reason}
                          </span>
                        </span>
                        <span className="text-sm font-OpenSan">
                          {item.value}
                        </span>
                      </div>
                    </>
                  ))}
                </p>
              </div>
            )}
          {resumeData?.areasOfImprovement?.length > 0 && (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <p className="para-small font-extrabold darkGray font-OpenSan mb-2">
                Areas of Improvement:
              </p>

              {resumeData?.areasOfImprovement?.map((variable, index) => {
                // const [key, value] = Object.entries(variable)[0];
                return (
                  <li key={index} className="mb-4 ">
                    <div className="flex flex-col mb-1">
                      <span className="font-bold darkGray font-OpenSan capitalize">
                        Section:{" "}
                        <span className="font-medium text-sm font-OpenSan">
                          {variable?.section}
                        </span>
                      </span>
                      <span className="font-bold darkGray font-OpenSan capitalize">
                        Issues:{" "}
                        <span className=" font-medium text-sm font-OpenSan">
                          {variable?.issue}
                        </span>
                      </span>
                      <span className="font-bold darkGray font-OpenSan capitalize">
                        Suggestions:{" "}
                        <span className="font-medium text-sm font-OpenSan">
                          {variable?.suggestion}
                        </span>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <ul style={{ listStyleType: "none", padding: 0 }}>
            {resumeData.variablesScoreDependsOn?.map((variable, index) => {
              const [key, value] = Object.entries(variable)[0];
              const maxScore = 25; // Assuming 15 is the maximum score for each category
              const percent = (value / maxScore) * 100;

              return (
                <li key={index} className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium darkGray font-OpenSan capitalize">
                      {key}
                    </span>
                    <span className="text-sm font-OpenSan">
                      {value}/{maxScore}
                    </span>
                  </div>
                  <Progress
                    percent={percent}
                    strokeColor="#108ee9"
                    trailColor="#f0f0f0"
                    showInfo={false} // Hide percentage inside the bar
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default ResumeMatchCard;
