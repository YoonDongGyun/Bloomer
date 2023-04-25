import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SInput, SDiv } from "./styles";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

function CreateInputLine({
  icon,
  placeholder,
  contentInput,
  setContentInput,
  refVal,
}: any): JSX.Element {
  return (
    <SDiv>
      <FontAwesomeIcon
        className={contentInput ? "icon active" : "icon"}
        icon={icon}
      />
      <SInput
        value={contentInput}
        onChange={(e: any) => setContentInput(e.target.value)}
        // type="text"
        placeholder={placeholder}
        ref={refVal}
      />
    </SDiv>
  );
}

export default CreateInputLine;
