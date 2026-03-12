import React from "react";
import blog1 from "../../assets/images/apply.jpg";
import blog2 from "../../assets/images/closeup.jpg";
import blog3 from "../../assets/images/form.jpg";
import blog4 from "../../assets/images/interview.jpg";
import Button from "../shared/button";
import { Link, useNavigate } from "react-router-dom";

const Blog = ({ isAdminContent }) => {
  const navigate = useNavigate();
  const blogs = [
    {
       id: 1,
       img: blog1,
       title: "You May Be Perfect for the Job—But Only If the Employer Can See It",
       content: "You might be the ideal candidate for a job—your skills, experience, and personality all align perfectly with what the employer is looking for. But here’s the catch: it only counts if the employer can see how perfect you are.",
     
       sections: [
         {
           title:
             "You May Be Perfect for the Job—But Only If the Employer Can See It",
           content:
             "You might be the ideal candidate for a job—your skills, experience, and personality all align perfectly with what the employer is looking for. But here’s the catch: it only counts if the employer can see how perfect you are. And that’s where a lot of job seekers fall short. It’s not enough to be qualified—you have to communicate that qualification in a way that resonates with the employer. This means speaking their language, using their tone, and making sure your resume and cover letter are a 'perfect' match for the job posting.",
         },
         {
           title: "The Power of NLP: Speaking Their Language",
           contents: [
             "Natural Language Processing (NLP) might sound like something out of a tech seminar, but it’s incredibly relevant to your job search. In simple terms, NLP is about understanding and using language in a way that aligns with the person or system you’re communicating with. For your job search, this means using the same words, phrases, and tone that the employer uses in their job description and company materials.",
             "Why does this matter? Because many companies use Applicant Tracking Systems (ATS) that rely on NLP algorithms to filter resumes. These systems are programmed to scan for specific keywords and phrases that match the job description. If your resume doesn’t include those exact terms, it might never make it to a human recruiter, no matter how qualified you are.",
             "But it’s not just about getting past the ATS. Even when your resume reaches a human, using the same language as the job posting creates a sense of alignment. It shows that you’re not just applying to any job—you’re applying to this job, and you’ve taken the time to tailor your application to fit exactly what they’re looking for.",
           ],
         },
         {
           title: "Matching the Employer’s Tone: Why It Matters",
           contents: [
             "Tone is another critical element. Different companies have different cultures, and that culture is often reflected in their job postings. Some companies might have a formal, traditional tone, while others might be more casual or even playful. By matching the tone of your resume and cover letter to the tone of the job posting, you’re signaling that you understand and fit into the company culture.",
             "For example, if a job posting is written in a straightforward, no-nonsense style, your resume and cover letter should reflect that. On the other hand, if the posting is full of energy and buzzwords, don’t be afraid to inject some of that enthusiasm into your application. It’s about mirroring the employer’s communication style to create a sense of rapport before you even meet them.",
           ],
         },
         {
           title: "Making Your Resume and Cover Letter a 'Perfect' Match",
           contents: [
             "So, how do you make sure your resume and cover letter are a perfect match for the job? It starts with careful reading. Study the job description closely. Highlight the key skills, qualifications, and experiences they’re looking for, and make sure those are front and center on your resume. But don’t stop there—look at the specific words and phrases they use, and incorporate those into your application.",
             "If they’re looking for someone who can 'manage cross-functional teams' and you’ve done that, don’t just say you’ve led teams—use their exact wording: 'Managed cross-functional teams to achieve XYZ.' If they value 'innovative problem-solving,' make sure your resume speaks directly to your experience with 'innovative problem-solving,' not just 'creative thinking' or 'problem-solving.'",
             "The goal is to create a sense of seamless fit between your application and the job posting. When an employer reads your resume, they should feel like you’re speaking directly to their needs, using their language. This not only increases your chances of making it past the ATS but also helps create a stronger connection with the human recruiter reviewing your application.",
           ],
         },
         {
           title: "Final Thoughts: Make Your Perfection Visible",
           contents: [
             "Being perfect for a job isn’t enough—you have to make sure the employer can see it. By using the same NLP words and phrases as the job description, matching the employer’s tone, and ensuring your resume and cover letter are tailored specifically to the job, you’re not just applying—you’re positioning yourself as the ideal candidate.",
             "Remember, it’s about more than just listing your qualifications. It’s about framing those qualifications in a way that speaks directly to the employer’s needs and expectations. When you do that, you’re not just showing that you’re qualified—you’re showing that you’re the perfect fit. And that’s what gets you noticed, and ultimately, hired.",
           ],
         },
       ],
     },
   
     {
       id: 2,
       img: blog2,
       title: "Working for Your Next Job: A Lesson in Career Trajectory",
       content:
         'My father used to say, "Never forget, you are working for your next job, not the one you have now." It’s a simple statement, but it took me far too many years to fully grasp the wisdom behind it.',
         "sections": [
           {
             "title": "Working for Your Next Job: A Lesson in Career Trajectory",
             "content": "My father used to say, \"Never forget, you are working for your next job, not the one you have now.\" It’s a simple statement, but it took me far too many years to fully grasp the wisdom behind it. Our careers are very much a journey, a series of stops where we pick up tools, skills, and experiences that help us successfully navigate what’s ahead. In the world of recruiting, we often refer to this as your career trajectory. The question is: Are you moving forward, or are you moving forward and back at the same time?"
           },
           {
             "title": "The Concept of Career Trajectory: Moving Forward with Purpose",
             "contents": [
               "Career trajectory isn’t just about climbing the corporate ladder; it’s about the direction in which your career is headed. Is there positive inertia? Are you consistently building on what you’ve learned, or are you finding yourself in a cycle of lateral moves that don’t really advance your skills or your career?",
               "Take, for example, the role of a regional sales manager. You might love the autonomy, the client interaction, and the satisfaction of meeting sales goals. But what if, in the back of your mind, you have aspirations of moving into a higher administrative role or even a corporate leadership position? If you stay in that regional sales manager role indefinitely, you may find that it becomes a limiting factor, especially if you’re not gaining the administrative or strategic skills needed for that next step."
             ]
           },
           {
             "title": "Preparing for the Job You Want",
             "contents": [
               "The key is to recognize these potential limitations before they become barriers. If you’re happy staying where you are, that’s great. But if you have bigger aspirations, you need to start filling in those gaps now, before you’re in the position of needing to look for your next job.",
               "I’ve taken jobs in the past simply to learn new skills. It wasn’t always about the money or the title—it was about positioning myself for the future. You don’t always have to change jobs to do this, either. Freelancing, taking classes, or attending conferences and workshops can all be effective ways to gain the skills you need for the role you want."
             ]
           },
           {
             "title": "The Importance of Positive Inertia",
             "content": "Positive inertia in your career means that each role you take on should build upon the last, adding to your skillset and experience in a meaningful way. This doesn’t necessarily mean always moving up in title, but it does mean moving forward in capability and knowledge. When you equip yourself for the job you want, you’re not just preparing for the next step—you’re also creating a narrative of growth and development that will be attractive to future employers."
           },
           {
             "title": "Final Thoughts: Equip Yourself for the Journey Ahead",
             "contents": [
               "Remember, your career is a journey, and each step along the way should be a strategic one. Whether you’re content in your current role or eyeing the next big opportunity, never stop equipping yourself with the skills and knowledge that will serve you in the future. Work for your next job, not just the one you have now, and you’ll find that your career trajectory is one of continuous forward momentum."
             ]
           }
         ],
   
     },
     // 3
     {
       id: 3,
      
     
       title:
         "Why Applying for a Remote Job is Tougher Than You Think: The Global Challenge",
       content:
         "In a world where remote and hybrid positions are becoming the norm, it might seem like the job market has opened up in unprecedented ways.",
       img: blog3,
       "sections": [
         {
           "title": "\"You Aren’t Wrong, The Game is Rigged: Why Getting Hired Can Be So Damn Difficult\"",
           "content": "Let’s be real—the job market feels like a rigged game. You’re putting yourself out there, trying to find a job that matches your skills, but it’s like every employer is speaking a different language. The buzzwords, the specific software requirements, the endless lists of skills—even within the same field, it seems like every job posting wants something different. How are you supposed to keep up?"
         },
         {
           "title": "The Reality of Employer Expectations",
           "contents": [
             "One of the biggest challenges is just understanding what employers want. You could be applying for two identical-sounding jobs, but one employer wants you to be a master of HubSpot, while the other is all about Marketo. Both tools might do the same thing, but unless you know how to convey that in your resume or cover letter, you’re already at a disadvantage.",
             "Hiring Manager Challenges: Here’s the kicker: many hiring managers don’t even fully understand the tools or skills they’re asking for. They’re relying on what the last person in the role did or what some vendor recommended. They just want someone who can get the job done, but they might not know the best way to identify that person. Your job is to make it as easy as possible for them to see that you’re the solution they’re looking for."
           ]
         },
         {
           "title": "Getting Past the Gatekeepers",
           "contents": [
             "So, how do you get past the gatekeepers—the ATS software, the HR reps, and the hiring managers who are scanning your resume for reasons to move on to the next candidate? It starts with understanding that your resume isn’t just a list of your experiences. It’s an ad, and it has to sell you as the perfect fit for the job.",
             "When employers are looking at resumes, they’re often just scanning for keywords or phrases that match the job description. If you’ve spent years mastering Shopify but the job posting is asking for BigCommerce, they might not even consider you unless you make it clear that you can do what they need. This is where tailoring your resume to each job is crucial."
           ]
         },
         {
           "title": "Keyword Optimization",
           "contents": [
             "When employers are looking at resumes, they’re often just scanning for keywords or phrases that match the job description. If you’ve spent years mastering Shopify but the job posting is asking for BigCommerce, they might not even consider you unless you make it clear that you can do what they need. This is where tailoring your resume to each job is crucial."
           ]
         },
         {
           "title": "A Personal Story: Adapting to Client Needs",
           "contents": [
             "Let me share a personal story that might help illustrate this point. I was doing freelance work, and a client wanted a marketing person with Canva experience. Now, I’d only briefly looked at Canva before, but I’d spent over a dozen years mastering Photoshop—a much more complex design tool. Did I argue that I was actually over-qualified and try to convince them that Photoshop was better? Nope. I took a few hours to familiarize myself with Canva, added it to my list of skills, and moved on.",
             "The point is, your resume needs to speak directly to what the employer is asking for. They don’t care if you’re a master of something else if it’s not what they think they need. You have to meet them where they are and make it obvious that you can deliver exactly what they’re looking for."
           ]
         },
         {
           "title": "Making a Positive First Impression",
           "contents": [
             "The first impression you make is critical, and in the job application process, that first impression is often your resume. This is why it’s so important to customize it for each job you apply for. Don’t just rely on a generic, one-size-fits-all resume. You need to tailor it so that it matches the employer’s expectations as closely as possible.",
             "When you’re applying for a job, think about what the hiring manager really wants. They’re focused on results. They want to know if you can deliver. Your resume should leave no doubt that you’re the person who can get the job done. And remember, the simpler and clearer you make it, the better. Don’t overcomplicate things—just make sure your resume does the heavy lifting of selling you as the solution to their problem."
           ]
         },
       
         {
           "title": "Final Thoughts: The Game Might Be Rigged, But You Can Still Win",
           "contents": [
             "Yes, the job market can feel like a rigged game. The expectations are often unclear, the competition is fierce, and the gatekeepers are looking for reasons to exclude you. But by understanding what employers are really looking for and tailoring your resume to meet those expectations, you can tilt the odds in your favor.",
             "Your resume is your ad—make sure it sells you as the perfect fit for the job. Simplify your approach, be strategic, and most importantly, make it easy for the employer to see that you’re exactly what they need. The game might be tough, but with the right strategy, you can still win."
           ]
         }
       ],
   
     },
   
     // 4
     {
       id: 4,
       title:
         "You Aren’t Wrong, The Game is Rigged: Why Getting Hired Can Be So Damn Difficult",
       content:
         "Let’s be real—the job market feels like a rigged game. You’re putting yourself out there, trying to find a job that matches your skills, but it’s like every employer is speaking a different language.",
       img: blog4,
   
       "sections": [
         {
           "title": "\"You Aren’t Wrong, The Game is Rigged: Why Getting Hired Can Be So Damn Difficult\"",
           "content": "Let’s be real—the job market feels like a rigged game. You’re putting yourself out there, trying to find a job that matches your skills, but it’s like every employer is speaking a different language. The buzzwords, the specific software requirements, the endless lists of skills—even within the same field, it seems like every job posting wants something different. How are you supposed to keep up?"
         },
         {
           "title": "The Reality of Employer Expectations",
           "contents": [
             "One of the biggest challenges is just understanding what employers want. You could be applying for two identical-sounding jobs, but one employer wants you to be a master of HubSpot, while the other is all about Marketo. Both tools might do the same thing, but unless you know how to convey that in your resume or cover letter, you’re already at a disadvantage.",
             "Hiring Manager Challenges: Here’s the kicker: many hiring managers don’t even fully understand the tools or skills they’re asking for. They’re relying on what the last person in the role did or what some vendor recommended. They just want someone who can get the job done, but they might not know the best way to identify that person. Your job is to make it as easy as possible for them to see that you’re the solution they’re looking for."
           ]
         },
         {
           "title": "Getting Past the Gatekeepers",
           "contents": [
             "So, how do you get past the gatekeepers—the ATS software, the HR reps, and the hiring managers who are scanning your resume for reasons to move on to the next candidate? It starts with understanding that your resume isn’t just a list of your experiences. It’s an ad, and it has to sell you as the perfect fit for the job.",
             "When employers are looking at resumes, they’re often just scanning for keywords or phrases that match the job description. If you’ve spent years mastering Shopify but the job posting is asking for BigCommerce, they might not even consider you unless you make it clear that you can do what they need. This is where tailoring your resume to each job is crucial."
           ]
         },
         {
           "title": "Keyword Optimization",
           "contents": [
             "When employers are looking at resumes, they’re often just scanning for keywords or phrases that match the job description. If you’ve spent years mastering Shopify but the job posting is asking for BigCommerce, they might not even consider you unless you make it clear that you can do what they need. This is where tailoring your resume to each job is crucial."
           ]
         },
         {
           "title": "A Personal Story: Adapting to Client Needs",
           "contents": [
             "Let me share a personal story that might help illustrate this point. I was doing freelance work, and a client wanted a marketing person with Canva experience. Now, I’d only briefly looked at Canva before, but I’d spent over a dozen years mastering Photoshop—a much more complex design tool. Did I argue that I was actually over-qualified and try to convince them that Photoshop was better? Nope. I took a few hours to familiarize myself with Canva, added it to my list of skills, and moved on.",
             "The point is, your resume needs to speak directly to what the employer is asking for. They don’t care if you’re a master of something else if it’s not what they think they need. You have to meet them where they are and make it obvious that you can deliver exactly what they’re looking for."
           ]
         },
         {
           "title": "Making a Positive First Impression",
           "contents": [
             "The first impression you make is critical, and in the job application process, that first impression is often your resume. This is why it’s so important to customize it for each job you apply for. Don’t just rely on a generic, one-size-fits-all resume. You need to tailor it so that it matches the employer’s expectations as closely as possible.",
             "When you’re applying for a job, think about what the hiring manager really wants. They’re focused on results. They want to know if you can deliver. Your resume should leave no doubt that you’re the person who can get the job done. And remember, the simpler and clearer you make it, the better. Don’t overcomplicate things—just make sure your resume does the heavy lifting of selling you as the solution to their problem."
           ]
         },
       
         {
           "title": "Final Thoughts: The Game Might Be Rigged, But You Can Still Win",
           "contents": [
             "Yes, the job market can feel like a rigged game. The expectations are often unclear, the competition is fierce, and the gatekeepers are looking for reasons to exclude you. But by understanding what employers are really looking for and tailoring your resume to meet those expectations, you can tilt the odds in your favor.",
             "Your resume is your ad—make sure it sells you as the perfect fit for the job. Simplify your approach, be strategic, and most importantly, make it easy for the employer to see that you’re exactly what they need. The game might be tough, but with the right strategy, you can still win."
           ]
         }
       ],
     },
  ];

  return (
    <section className="blog">
      <div className="container">
        <div className={`${isAdminContent ? "" : "wrap"}`}>
          {/* HEADING */}
          <div className="mb-[50px] md:mb-[100px]">
            <h2 className="text-center darkGray font-semibold">
              <span className="primary">Articles </span>and Resources
            </h2>
          </div>

          {/* Blog */}
          <div className="blog-container">
            <div className="flex flex-wrap justify-around">
              {blogs.map((blog, index) => (
                <div
                  key={blog.id}
                  className={`max-w-[350px] md:max-w-[281.5px] ${
                    index >= 2 ? "hidden lg10:block" : ""
                  }`}
                >
                  <div className="flex flex-col gap-4">
                    <h3 className="black-shade font-bold line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="darkGray line-clamp-3">{blog.content}</p>
                    <div
                      className={`${isAdminContent ? "relative overlay" : ""}`}
                    >
                      <div >
                      <img
                        src={blog.img}
                        alt={`blog image ${blog.id}`}
                        className="rounded-xl h-[230px] w-[100%] object-cover"
                      />
                        </div>
                    
                      {isAdminContent && (
                        <Button
                          text="Replace Image"
                          className="text-nowrap btn-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                        />
                      )}
                    </div>
                    {/* Updated "Read More" Link */}
                    <p
                // href={`/blog/${blog.id}`}
                onClick={() => navigate(`/blog/${blog.id}`, { state: { blog } })}

                className="text-[#2a9df4] font-semibold mt-3 inline-block cursor-pointer"
              >
                Read More
              </p> 
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center w-full">
              <Link
                to="/all-blog"
                className="px-[42.667px] py-[10.667px] mt-[33px] bg-[#2a9df4] text-[#fefefc] text-center text-[17px] font-normal leading-[21.333px] capitalize rounded-[8px] border-none"
              >
                View All
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
