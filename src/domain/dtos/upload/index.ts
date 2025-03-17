import { MaterialType } from "../material/material";

export interface IUploadMaterialRequestDTO {
  fileName: string;
  materialType: MaterialType;
  fileType: string;
}
