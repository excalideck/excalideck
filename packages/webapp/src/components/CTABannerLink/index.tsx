import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import "./index.css";

interface Props {
    to: string;
    openInNewTab: boolean;
    icon: IconProp;
    text: ReactNode;
}

export default function CTABannerLink({ to, openInNewTab, icon, text }: Props) {
    return (
        <a
            className="CTABannerLink"
            href={to}
            target={openInNewTab ? "_blank" : "_top"}
            rel="noreferrer"
        >
            <span className="CTABannerLinkIcon">
                <FontAwesomeIcon icon={icon} />
            </span>
            <span className="CTABannerLinkText">{text}</span>
        </a>
    );
}
