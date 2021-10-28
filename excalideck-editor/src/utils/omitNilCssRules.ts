import { isNil, omitBy } from "lodash";

export default function omitNilCssRules(
    cssRules: Record<string, string | undefined | null>
): Record<string, string> {
    return omitBy<any>(cssRules, isNil);
}
