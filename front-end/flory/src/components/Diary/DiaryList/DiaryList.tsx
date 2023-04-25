import { DiaryType } from "../../../models/diary/diaryType";
import DiaryListItem from "../DiaryListItem/DiaryListItem";

interface DiaryListProps {
  DIARY_LIST: DiaryType[];
  page: string;
}
const DiaryList = ({ DIARY_LIST, page }: DiaryListProps): JSX.Element => {
  return (
    <div>
      {DIARY_LIST.length !== 0 ? (
        DIARY_LIST.map((diary: DiaryType, idx: number) => (
          <div style={{ marginBottom: "1.2rem" }}>
            <DiaryListItem diary={diary} key={idx} page={page} />
          </div>
        ))
      ) : (
        <div>일기가 아직 없습니다 🌻</div>
      )}
    </div>
  );
};
export default DiaryList;
