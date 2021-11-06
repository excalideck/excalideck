import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import CTABannerLink from "../CTABannerLink";
import "./index.css";

export default function CTABanner() {
    return (
        <div className="CTABanner">
            <CTABannerLink
                to="https://app.excalideck.com"
                openInNewTab={false}
                icon={faPen}
                text="Start New"
            />
            <CTABannerLink
                to="https://github.com/excalideck/excalideck"
                openInNewTab={true}
                icon={faGithub}
                text="Fork Me"
            />
        </div>
    );
}
