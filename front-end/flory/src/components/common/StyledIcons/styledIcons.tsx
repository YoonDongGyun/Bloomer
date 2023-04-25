import SendIcon from "@mui/icons-material/Send"
import { styled } from "@mui/system"
import MoreVertIcon from "@mui/icons-material/MoreVert"

export const StyledSendIcon = styled(SendIcon, {
  name: "StyledHomeIcon",
  slot: "Wrapper",
})({
  cursor: "pointer",
  color: "#dec5fd",
  "&:hover": { color: "#9a1aff" },
})

export const StyledMoreVertIcon = styled(MoreVertIcon, {
  name: "StyledHomeIcon",
  slot: "Wrapper",
})({
  cursor: "pointer",
  color: "#9a1aff",
  "&:hover": { color: "#9a1aff" },
})
