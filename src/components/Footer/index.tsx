import { useTranslation } from "react-i18next";
import "./style.scss";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className="Footer">
      <br />
      {t('footer.website')}
      <br />
      {t('footer.thanks')}
      <br />
      {t('footer.webDev')}
      <br />
      {t('footer.copyright')}
      <br />
      <br />
    </div>
  );
}

export default Footer;
