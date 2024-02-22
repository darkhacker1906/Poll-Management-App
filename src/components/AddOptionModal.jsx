import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { dispatch } from "../redux/store/store";
import { CircularProgress, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { AddOptionApi } from "../redux/slice/AddOptionSlice";
import { NavLink } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #454545",
  boxShadow: 24,
  p: 4,
};

export default function AddOptionModal({
  addOptionOpen,
  handleAddOptionClose,
  addOptionId
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const initialValues = {
    option: "",
  };
  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const id = addOptionId;
      const option = values.option.trim();
      if (option) {
        const data = { id, option };
        dispatch(AddOptionApi(data));
        setTimeout(() => {
         handleAddOptionClose();
        }, 200);
      } else {
        toast.error("Please enter option value", { autoClose: 1000 });
        dispatch(addPollResetReducer());
      }
      dispatch(addPollResetReducer());
      resetForm();
    },
  });

  return (
    <div>
      <Modal
        open={addOptionOpen}
        onClose={handleAddOptionClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <Stack direction={"column"} spacing={2} className="form_container">
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: "36px",
                color: "#255470",
                textDecoration: "underline",
                textAlign: "center",
              }}
            >
              Add Option Here
            </Typography>
            <TextField
              label={"Option"}
              name="option"
              value={values.title}
              onChange={handleChange}
            />
            {isLoading ? (
              <CircularProgress color="primary" />
            ) : (
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(90.9deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)",
                  "&:hover": {
                    background: "rgb(3, 195, 195)",
                  },
                }}
              >
                Update
              </Button>
            )}
              <Button
                sx={{
                  background:
                    "linear-gradient(90.9deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)",
                  "&:hover": {
                    background: "rgb(3, 195, 195)",
                  },
                  width: "100%",
                }}
                variant="contained"
                onClick={()=>handleAddOptionClose()}
              >
                Cancel
              </Button>
          </Stack>
        </form>
        </Box>
      </Modal>
    </div>
  );
}
