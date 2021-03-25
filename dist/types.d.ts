import { Outputs } from "./constants";
export interface Results {
    [Outputs.Major]: string;
    [Outputs.Minor]: string;
    [Outputs.Patch]: string;
    [Outputs.Micro]: string;
    [Outputs.Prerelease]: string;
    [Outputs.Input]: string;
    [Outputs.Result]: string;
    [Outputs.Postrelease]: string;
    [Outputs.Build]: string;
    [Outputs.IsPrerelease]: boolean;
}
