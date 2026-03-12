/* eslint-disable no-unused-vars */
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./page/home";
import Register from "./page/register";
import SignIn from "./page/signIn";
import Verification from "./page/verification";
import PasswordRecovery from "./page/passRecovery";
import SetPassword from "./page/setPassword";
import DashboardMain from "./Dashboard/dashboardMain";
import PrivacyPolicy from "./page/privacyPolicy";
import TermService from "./page/terms&service";
import Contact from "./page/contact";
import Interview from "./page/interview";
import Resume from "./page/resumeTemplates";
import CoverLetter from "./page/coverLetter";
import Jobs from "./page/jobs";
import MyResume from "./page/myResume";
import Index from "./Dashboard";
import Extension from "./page/dashboard/userDashboard/extension";
import GetStarted from "./page/dashboard/userDashboard/getStarted";
import Upgrade from "./page/dashboard/userDashboard/upgrade";
import SavedDocuments from "./page/dashboard/userDashboard/savedDocuments";
import Settings from "./page/dashboard/userDashboard/settings";
import UseResumeTemplate from "./Dashboard/Templates/useResumeTemplate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseCoverLetterTemplate from "./Dashboard/Templates/useCoverLetter";
import AdminSetting from "./page/dashboard/adminDashboard/adminSetting";
import AdminContent from "./page/dashboard/adminDashboard/adminContent";
import AdminDashboard from "./page/dashboard/adminDashboard/adminDashboard";
import Update from "./Dashboard/AdminDashboard/update";
import BasicInfo from "./page/dashboard/userDashboard/basicInfo";
import UpdateScript from "./Dashboard/AdminDashboard/updateScript";
import ResumesCatagory from "./Dashboard/UserDashboard/Templates/resumeCatagory";
import ChooseResume from "./page/dashboard/userDashboard/chooseResume";
import ViewResumeTemplate from "./page/dashboard/userDashboard/viewResumeTemplate";
import ChooseCoverletter from "./page/dashboard/userDashboard/chooseCoverletter";
import ViewCoverletterTemplate from "./page/dashboard/userDashboard/viewCoverletterTemplate";
import AdminPricingEdit from "./Dashboard/AdminDashboard/adminpricingEdit";
import Features from "./Dashboard/AdminDashboard/adminContent/features";
import Blogs from "./Dashboard/AdminDashboard/adminContent/blogs";
import PricingPlan from "./Dashboard/AdminDashboard/adminContent/pricingPlan";
import Howitwork from "./components/home/howitwork";
import FeaturesAdmin from "./Dashboard/AdminDashboard/adminContent/features";
import Work from "./Dashboard/AdminDashboard/adminContent/work";
import Rearrange from "./Dashboard/UserDashboard/ResumeBuilder/rearrange";
import ViewBlogPage from "./page/viewallblog";
import SingleBlog from "./page/singleBlog";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { setUserInfo } from "./redux/userInfo";
import ProtectedRoute from "./utils/protectedRoute";
// Create the SectionsContext
const SectionsContext = createContext();

// Custom hook to use the SectionsContext
export const useSectionsContext = () => useContext(SectionsContext);

const AppLayout = () => {
  const initialState = {
    sections: [
      {
        header: "profile",
        type: "profile",
        profileImage: "",
        name: "ISABEEL MERCADO",
        contactNumber: "+1234567890",
        email: "isabel.mercado@example.com",
        address: "123 Main St, New York, NY",
        jobTitle: "Business Manager",
        links: ["https://linkedin.com/in/isabelmercado"],
        column: "left",
      },
      {
        header: "about",
        type: "about",
        items: [
          {
            description:
              "A highly skilled business manager with 10+ years of experience in managing cross-functional teams, developing strategies, and driving business growth.",
            isAIgenerated: false,
          },
        ],
        column: "right",
      },
      {
        column: "left",
        header: "Education",
        type: "education",
        items: [
          {
            degree: "MBA in Business Management",
            institution: "Harvard Business School",
            reference: "Dr. John Doe",
            startDate: "September 2012",
            endDate: "June 2014",
          },
          // {
          //   degree: "Bachelor of Business Administration",
          //   institution: "New York University",
          //   reference: "Prof. Jane Smith",
          //   startDate: "September 2008",
          //   endDate: "June 2012",
          // },
        ],
      },
      {
        column: "right",
        header: "Work Experience",
        type: "workExperience",
        items: [
          {
            jobTitle: "Senior Business Manager",
            company: "ABC Corp",
            startDate: "July 2018",
            endDate: "Present",
            description:
              "Leading a team of 15 in overseeing day-to-day business operations, developing marketing strategies, and driving revenue growth.",
            isAIgenerated: false,
          },
          {
            jobTitle: "Business Analyst",
            company: "XYZ Ltd",
            startDate: "June 2014",
            endDate: "June 2018",
            description:
              "Analyzed business processes, developed improvement strategies, and provided detailed reports to stakeholders.",
            isAIgenerated: false,
          },
        ],
      },
      {
        column: "left",
        header: "skills",
        type: "skills",
        items: [
          {
            name: "Project Management",
            level: "Expert",
          },
          {
            name: "Data Analysis",
            level: "Advanced",
          },
          {
            name: "Strategic Planning",
            level: "Expert",
          },
        ],
      },
      {
        column: "left",
        header: "languages",
        type: "languages",
        items: [
          {
            name: "English",
            proficiency: "Native",
          },
        ],
      },
      {
        column: "right",
        header: "certifications",
        type: "certificates",
        items: [
          {
            title: "Certified Project Manager",
            date: "March 2020",
            description: "Completed PMP certification from PMI.",
            isAIgenerated: false,
          },
        ],
      },
      {
        column: "right",
        header: "Interest",
        type: "hobbies",
        items: [
          {
            name: "Gaming",
          },
          {
            name: "Reading",
          },
          {
            name: "Traveling",
          },
        ],
      },
      {
        column: "right",
        header: "Summary",
        type: "summary",
        items: [
          {
            description: "Write your summary here",
          },
        ],
      },
      {
        column: "right",
        header: "Custom Title",
        type: "customTitle",
        items: [
          {
            description: "This is the custom content",
          },
        ],
      },
    ],
  };

  const [sectionsState, setSectionsState] = useState(initialState);
  const [extensionState, setExtensionState] = useState("");
  const dispatch = useDispatch();
  var resumeRef = useRef(null);
  var coverLetterRef = useRef(null);
  // Retrieve the user object from localStorage
  const userString = localStorage.getItem("user");

  // Parse the JSON string into an object
  const user = JSON.parse(userString);
  const userGoogleId = user?.userId;
  const userId =
    useSelector((state) => state?.user?.userInfo?.data?._id) ||
    userGoogleId ||
    user;

  const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;

  const handleGetUserInfo = async () => {
    if (userId) {
      try {
        const response = await axios.get(`${ApiUrl}/userInfo/${userId}`);
        // console.log("response.data", response?.data);
        dispatch(setUserInfo(response?.data));
      } catch (err) {
        console.log("error", err);
      }
    }s
  };

  useEffect(() => {
    handleGetUserInfo();
  }, []);

  return (
    <>
      <SectionsContext.Provider
        value={{
          sectionsState,
          setSectionsState,
          setExtensionState,
          extensionState,
        }}
      >
        <ToastContainer />
        <RouterProvider router={appRouter(resumeRef, coverLetterRef)} />
      </SectionsContext.Provider>
    </>
  );
};
const AppNew = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const appRouter = (resumeRef, coverLetterRef) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/all-blog",
      element: <ViewBlogPage />,
    },
    {
      path: "/blog/:id",
      element: <SingleBlog />,
    },

    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <Register />,
    },
    {
      path: "/set-password",
      element: <SetPassword />,
    },
    {
      path: "/verification/:email",
      element: <Verification />,
    },

    {
      path: "/password-recovery",
      element: <PasswordRecovery />,
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "/terms-service",
      element: <TermService />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/interview",
      element: <Interview />,
    },
    {
      path: "/resume",
      element: <Resume />,
    },
    {
      path: "/cover-letter",
      element: <CoverLetter />,
    },
    {
      path: "/my-jobs",
      element: <Jobs />,
    },
    {
      path: "/my-resume",
      element: <MyResume />,
    },
    //NEW CCOMPONENTS
    //RESUME CATAGORY
    {
      path: "/resume-catagory",
      element: <ResumesCatagory />,
    },
    // USER DASHBOARD PAGE
    // CHOOSE TEMPLATE(RESUME)
    {
      path: "/choose-resume",
      element: <ChooseResume />,
    },
    // CHOOSE TEMPLATE(COVER LETTER)
    {
      path: "/choose-coverletter",
      element: <ChooseCoverletter />,
    },

    {
      path: "/",
      element: (
        <ProtectedRoute>
          <DashboardMain
            resumeRef={resumeRef}
            coverLetterRef={coverLetterRef}
          />
        </ProtectedRoute>
      ),
      children: [
        //USER DASHBOARD PAGES
        {
          path: "/dashboard",
          element: <Index />,
        },
        {
          path: "/extension",
          element: <Extension />,
        },
        {
          path: "/started",
          element: <GetStarted />,
        },
        {
          path: "/upgrade-plan",
          element: <Upgrade />,
        },
        {
          path: "/documents",
          element: <SavedDocuments />,
        },
        {
          path: "/info",
          element: <BasicInfo />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },

        //USER DASHBOARD COMPONENTS
        {
          path: "/use-resume",
          element: <UseResumeTemplate />,
        },
        {
          path: "/use-coverletter",
          element: <UseCoverLetterTemplate />,
        },

        {
          path: "/use-coverletter",
          element: <UseCoverLetterTemplate />,
        },

        //ADMIN DASHBOARD PAGES
        {
          path: "/admin-setting",
          element: <AdminSetting />,
        },
        {
          path: "/content",
          element: <AdminContent />,
        },
        {
          path: "/admin-dashboard",
          element: <AdminDashboard />,
        },
        //ADMIN CONTENT PAGES

        {
          path: "/feature-admin",
          element: <FeaturesAdmin />,
        },
        {
          path: "/blog-admin",
          element: <Blogs />,
        },

        {
          path: "/pricing-plan",
          element: <PricingPlan />,
        },
        {
          path: "/work",
          element: <Work />,
        },
        {
          path: "/update",
          element: <Update />,
        },
        {
          path: "/update-script",
          element: <UpdateScript />,
        },
        {
          path: "/admin-pricing",
          element: <AdminPricingEdit />,
        },
        //Resume Builder Pages
        {
          path: "/view-resume/:id/:uid",
          element: <ViewResumeTemplate resumeRef={resumeRef} />,
        },
        //Coverletter Builder Pages
        {
          // path: "/view-coverletter/:id/:uid",
          path: "/view-coverletter/:id/:uid",
          element: <ViewCoverletterTemplate coverLetterRef={coverLetterRef} />,
        },

        {
          path: "*",
          element: <Index />,
        },
      ],
    },
  ]);

export default AppLayout;
