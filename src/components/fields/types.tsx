import { Control } from "react-hook-form";

export interface IBaseFieldProps {
  label: string;
  name: string;
  control: Control<any>;
  onChange?: (e: any) => void;
}
