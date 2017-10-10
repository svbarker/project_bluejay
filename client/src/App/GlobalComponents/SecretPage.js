import React from "react";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";

const SecretPage = () => {
  return (
    <div>
      <h1>Secret things</h1>
      <h5>Tell me a secret!</h5>
      <TextField
        style={{ backgroundColor: "white", color: "black" }}
        fullWidth={true}
      />
      <FlatButton
        style={{ backgroundColor: "white", color: "black" }}
        secondary={true}
        label="Cast your secrets into the abyss of the interwebs"
      />
    </div>
  );
};
export default SecretPage;
