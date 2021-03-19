import { Outputs } from "./constants";

export interface Results {
    [Outputs.Major]: string;
    [Outputs.Minor]: string;
    [Outputs.Patch]: string;
    [Outputs.Prerelease]: string;
    [Outputs.Input]: string;
    [Outputs.Result]: string;
}
