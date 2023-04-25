import React from "react"
import { SAccordion } from "./styles"
import styled from "styled-components"
import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"

type Props = {
  title?: string | React.ReactNode
  icon?: IconDefinition | IconProp
  contents?: string | React.ReactNode
}

function Accordion(props: Props) {
  const parentRef = React.useRef<HTMLDivElement>(null)
  const childRef = React.useRef<HTMLDivElement>(null)
  const [isCollapse, setIsCollapse] = React.useState(false)

  const handleButtonClick = React.useCallback(() => {
    if (parentRef.current === null || childRef.current === null) {
      return
    }
    if (parentRef.current.clientHeight > 0) {
      parentRef.current.style.height = "0"
    } else {
      parentRef.current.style.height = `${childRef.current.clientHeight}px`
    }
    setIsCollapse(!isCollapse)
  }, [isCollapse])

  return (
    <SAccordion>
      <Header onClick={handleButtonClick}>
        {props.icon && (
          <FontAwesomeIcon className="select-icon" icon={props.icon} />
        )}
        <div className="title">{props.title}</div>
        <FontAwesomeIcon className="down-icon" icon={faChevronDown} />
      </Header>
      <ContentsWrapper ref={parentRef}>
        <Contents ref={childRef}>{props.contents}</Contents>
      </ContentsWrapper>
    </SAccordion>
  )
}

const Header = styled.div`
  display: flex;
  cursor: pointer;
  height: 2.2rem;
  align-items: center;
  // margin: 0 32px 0 8px;

  .down-icon {
    margin-left: auto;
  }
`

const ContentsWrapper = styled.div`
  height: 0;
  width: inherit;
  // padding: 0 8px;
  overflow: hidden;
  transition: height 0.35s ease, background 0.35s ease;
`

const Contents = styled.div`
  // padding: 0.1px;
  font-size: 14px;
`

export default React.memo(Accordion)
