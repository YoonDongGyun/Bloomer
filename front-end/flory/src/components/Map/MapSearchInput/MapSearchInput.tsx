import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useRef } from "react";
import { SPaper } from "./styles";

function MapSearchInput({
  setKeyword,
  onClickHere,
  handleClick,
  page,
  groupKeyword,
}: any): JSX.Element {
  const keywordInput = useRef<HTMLInputElement>(null);
  const onSearch = (e: any) => {
    if (page === "map") {
      setKeyword({ word: keywordInput.current?.value, new: true });
    } else {
      groupKeyword.current = keywordInput.current;
      handleClick();
    }
  };

  return (
    <SPaper page={page}>
      {page === "map" ? (
        <InputBase
          className="input-base"
          inputRef={keywordInput}
          placeholder="위치 검색하기"
        />
      ) : (
        <InputBase
          className="input-base"
          inputRef={keywordInput}
          placeholder="그룹명/키워드 검색하기"
        />
      )}
      <IconButton className="btn" onClick={onSearch}>
        <SearchIcon />
      </IconButton>
      {page === "map" && (
        <>
          <Divider className="divider" orientation="vertical" />
          <IconButton className="btn" color="secondary" onClick={onClickHere}>
            <MyLocationIcon />
          </IconButton>
        </>
      )}
    </SPaper>
  );
}

export default MapSearchInput;
