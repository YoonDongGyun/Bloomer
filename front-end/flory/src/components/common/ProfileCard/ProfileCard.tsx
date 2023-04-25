import styled from "styled-components"
import Paper from "@mui/material/Paper"

const CardTop = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  // min-height: 17vh;
`
const CardBottom = styled.div`
  box-sizing: border-box;
  // padding: 5% 15%;
  display: flex;
  flex-direction: column;
  background-color: transparent;
`
const Name = styled.div`
  font-size: 2.5vh;
  font-weight: bold;
  text-align: center;
`

function ProfileCard(props: any) {
  const { header, name, body, width, height, className } = props
  return (
    <Paper
      elevation={3}
      children={
        <>
          <CardTop>{header}</CardTop>
          <CardBottom className={className}>
            <Name>{name}</Name>
            {body}
          </CardBottom>
        </>
      }
      sx={{
        width: width || "100%",
        height: height || "inherit",
      }}
      style={{
        // overflow : 'auto',
        boxShadow: "none",
        padding: "10px",
        zIndex: "10",
        background: "transparent",
      }}
    />
  )
}

export default ProfileCard
