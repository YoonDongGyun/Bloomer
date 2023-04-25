import BasicModal from "../../common/Modal/BasicModal/BasicModal";
import SearchMap from "../../Map/SearchMap/SearchMap";
import { useState } from "react";
import LocaList from "../../common/List/LocaList";
import MapSearchInput from "../../Map/MapSearchInput/MapSearchInput";

function DiaryLocationModal({ place, setPlace }: any): JSX.Element {
  const [keyword, setKeyword] = useState<any>({
    word: place.placeName | place.address,
    new: true,
  });
  const [locations, setLocations] = useState<any>([]);

  const onClickHere = () => {
    setKeyword("");
  };

  const func = {
    place,
    setPlace,
    keyword,
    setKeyword,
    locations,
    setLocations,
  };

  return (
    <BasicModal
      modalButton={
        <button className="location-switch__button">위치 변경</button>
      }
    >
      <h3>위치 설정</h3>
      <MapSearchInput
        setKeyword={setKeyword}
        onClickHere={onClickHere}
        page="map"
      />
      <SearchMap func={func} />

      <p>{place.placeName ? place.placeName : place.address}</p>

      <div style={{ width: "100%", overflowY: "auto" }}>
        <LocaList func={func} />
      </div>
    </BasicModal>
  );
}

export default DiaryLocationModal;
