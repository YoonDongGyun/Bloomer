import { ReduxStateType } from "../reduxStateType"
import { gardenType } from "./gardenType"

export type GardenStateType = {
  gardenList: gardenType[]
  gardenData: gardenType
  otherGardenData: gardenType
}
