import { STabList } from "./styles";
import TabItem from "./TabItem";
import Grid from "@mui/material/Grid";
import { TabType } from "../../../models/common/tabType";

const TabList: React.FC<{
  tabs: TabType[];
  handleChange: any;
  value: number;
}> = (props) => {
  return (
    <STabList>
      <Grid container spacing={1}>
        {props.tabs.map((tab: TabType, idx: number) => (
          <TabItem
            label={tab.label}
            onClick={props.handleChange}
            idx={idx}
            value={props.value}
            nth={props.tabs.length}
            key={idx}
          ></TabItem>
        ))}
      </Grid>
    </STabList>
  );
};

export default TabList;
