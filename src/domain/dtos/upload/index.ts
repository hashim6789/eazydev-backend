import { MaterialType } from "../../types";

export interface IUploadMaterialRequestDTO {
  fileName: string;
  materialType: MaterialType;
  fileType: string;
}
