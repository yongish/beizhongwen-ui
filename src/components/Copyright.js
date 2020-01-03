import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        背中文 Beizhongwen
      </Link>{" "}
      {new Date().getFullYear()}
      {". "}
      <Link href="https://app.termly.io/document/privacy-policy/8c9df9e2-f50d-42bb-93b8-107e897034d1">
        Privacy policy
      </Link>
    </Typography>
  );
}
