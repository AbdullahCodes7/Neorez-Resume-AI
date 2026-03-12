import React from "react";
import { useLocation, useParams } from "react-router-dom";

// import blogsData from "./singleblog.json"; // JSON data import

function SingleBlog() {
  // const { id } = useParams();
  // Find the matching blog post by ID
  // const blog = blogsData.find((b) => b.id === parseInt(id));
  const location = useLocation();
  const { blog } = location.state;

  // Handle cases where the blog is not found
  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold">Blog not found</p>
      </div>
    );
  }

  // Function to render dynamic sections based on blog content
  const renderSections = () => {
    if (!blog.sections || blog.sections.length === 0) {
      return <p>No additional content available.</p>;
    }

    return blog.sections.map((section, index) => (
      <div key={index} className="mt-6">
        <h4 className="font-bold text-2xl text-[#333] mb-3">{section.title}</h4>
        {section.contents ? (
          section.contents.map((content, contentIndex) => (
            <p
              key={contentIndex}
              className="text-[18px] font-normal text-[#333] pb-3 "
            >
              {content}
            </p>
          ))
        ) : (
          <p className="text-[18px] font-normal text-[#333]">
            {section.content}
          </p>
        )}
      </div>
    ));
  };

  return (
    <section className="singleBlog-sec ">
      <div className="container mx-auto ">
        <div className="singleBlog flex flex-col ">
          {/* Blog Image */}
          <div
  className="h-[40vh] md:h-[80vh] w-full rounded-3xl bg-cover  bg-no-repeat"
  style={{
    backgroundImage: `url(${blog?.img})`,
  }}
  aria-label="Blog"
></div>

          {/* Blog Title */}
          {/* <h3 className="font-bold text-3xl text-[#333]">{blog.title}</h3> */}

          {/* Render Sections */}
          {renderSections()}
        </div>
      </div>
    </section>
  );
}

export default SingleBlog;
