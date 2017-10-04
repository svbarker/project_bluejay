import React from "react";
import { List, ListItem } from "material-ui/List";

const PageNotFound = () => {
  const ListItemProps = {
    primaryText: `Page Not Found`,
    secondaryText: "",
    secondaryTextLines: 2,
    style: {
      margin: "100px",
      border: "20px solid grey",
      fontSize: "50px",
      textAlign: "center",
      padding: "50px"
    }
  };

  return (
    <List>
      <ListItem {...ListItemProps} />;
    </List>
  );
};

export default PageNotFound;
