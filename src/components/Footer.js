import React from "react";
import {useTranslation} from "react-i18next";

const Footer = () => {

  const { t } = useTranslation();

  return (
    <footer className="text-xs md:text-sm p-4 bg-jet flex items-center justify-start mb-0 text-white">
      ©2022 Cavalier - {t("All rights reserved.")}.
    </footer>
  );
};

export default React.memo(Footer);
