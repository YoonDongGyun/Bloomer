import React from "react"
import { SPost } from "./styles"

function Post(props: any) {
  return (
    <SPost>
      <div className="subject">
        <div className="post-title">{props.title}</div>
        {props.addition && (
          <div className="addition">
            { props.addition }
          </div>
        )}
      </div>
      <div>{props.content}</div>
    </SPost>
  )
}

export default Post
