import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

class Utils {
  public static cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
}
export { Utils };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const DataFormate = (value:string)=>{
// const value="12/05/25"
const parts=value.split("/");
const dt=new Date(Number(parts[2]),Number(parts[1])-1,Number(parts[0]))
return dt;
}