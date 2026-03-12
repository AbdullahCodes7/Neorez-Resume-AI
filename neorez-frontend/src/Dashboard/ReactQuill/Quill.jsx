import ReactQuill from "react-quill";

const Quill = ({ value, onchange, Section }) => {
  var toolbarOptions = [["bold", "italic"], ["link"]];
  const module = {
    toolbar: toolbarOptions,
  };

  return (
    <ReactQuill
      value={value}
      modules={module}
      // className="border-none outline-none font-Inter para-ex-small font-normal darkGray h-auto bg-transparent text-left"
      theme="snow"
      onChange={onchange}
    />
  );
};
export default Quill;
