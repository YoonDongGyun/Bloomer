import { STabItem } from "./styles";
import Grid from "@mui/material/Grid";

const TabItem: React.FC<{
  label: string;
  onClick: any;
  idx: number;
  value: number;
  nth: number;
}> = (props) => {
  const isValue = props.value === props.idx;

  const onClick = () => {
    props.onClick(props.idx);
  };
  return (
    <Grid item xs={props.nth === 3 ? 4 : 6}>
      <STabItem isValue={isValue} onClick={onClick}>
        {props.label}
      </STabItem>
    </Grid>
  );
};

export default TabItem;
