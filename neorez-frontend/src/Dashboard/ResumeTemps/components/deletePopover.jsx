import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteSectionByType } from "../../../redux/resumeSlice2";

const deletePopover = ({ activeEditor, activeIndex, setActiveIndex }) => {
  // console.log("first delete", activeEditor);
  //   console.log("first delete activeIndex", activeIndex);
  const dispatch = useDispatch();

  const handleDeleteField = (editor) => {
    // console.log("activeEditor", editor);

    if (!editor) {
      console.error("No active editor selected for deletion.");
      return;
    }

    // Dispatch Redux action to delete section by type
    dispatch(deleteSectionByType(editor));

    // switch (activeEditor) {
    //   // case "profile":
    //   //   dispatch(deleteItemFromProfile({ index: activeIndex }));
    //   //   break;

    //   // case "email":
    //   // case "phone":
    //   // case "linkedIn":
    //   // case "location":
    //   //   dispatch(deleteProfileField({ field: activeEditor }));
    //   //   break;

    //   // case "body":
    //   //   dispatch(removeBodySection(activeIndex));
    //   //   break;

    //   case "workExperience":
    //     dispatch(
    //       deleteSectionByType({
    //         type: "workExperience",
    //         // index: activeIndex,
    //       })
    //     );
    //     break;

    //   case "trainingCourses":
    //     dispatch(
    //       deleteSectionByType({
    //         type: "trainingCourses",
    //         // index: activeIndex,
    //       })
    //     );
    //     break;

    //   case "projects":
    //     dispatch(deleteSectionByType({ type: "projects" }));
    //     break;

    //   case "skills":
    //     dispatch(deleteSectionByType({ type: "skills" }));
    //     break;

    //   case "about":
    //     dispatch(deleteSectionByType({ type: "about" }));
    //     break;

    //   case "certificates":
    //     dispatch(deleteSectionByType({ type: "certificates" }));
    //     break;

    //   case "languages":
    //     dispatch(deleteSectionByType({ type: "languages" }));
    //     break;

    //   default:
    //     dispatch(
    //       deleteSectionByType({
    //         type: activeEditor,
    //       })
    //     );
    //     break;
    // }

    // setActiveIndex(null); // Reset the active index after deletion
  };

  return (
    <div onClick={() => handleDeleteField(activeEditor)}>
      <button
        className="text-black"

        // style={{
        //   backgroundColor: "red",
        //   color: "#fff",
        //   border: "none",
        //   padding: "5px 10px",
        //   borderRadius: "5px",
        //   cursor: "pointer",
        //   position: "absolute",
        //   top: "0px",
        //   right: "100px",
        // }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z"
          />
        </svg>
        Delete Section
      </button>
    </div>
  );
};

export default deletePopover;
