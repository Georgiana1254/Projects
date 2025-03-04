import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@mui/material";
import React from "react";
import useForm from "./useForm"; // Asigură-te că acest hook este corect importat
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";

const initialFieldValues = {
    fullName: '',
    mobile: '',
    email: '',
    age: '',
    bloodGroup: '',
    address: ''
};

const DCandidatesForm = (props) => {

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('fullName' in fieldValues) temp.fullName = fieldValues.fullName ? "" : "This field is required.";
        if ('mobile' in fieldValues) temp.mobile = fieldValues.mobile ? "" : "This field is required.";
        if ('bloodGroup' in fieldValues) temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required.";
        if ('email' in fieldValues) temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid.";
        
        setErrors({
            ...temp
        });
   
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "");
        return false;
    };
   
    const {
        values = initialFieldValues,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialFieldValues, validate);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(values); 
        if (validate()) {
            try {
                await props.createDCandidate(values);
                window.alert('Inserted successfully!');
            } catch (error) {
                console.log("Error inserting candidate:", error);
            }
        }
    };
    
    

    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        name="fullName"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        {...(errors.fullName && { error: true, helperText: errors.fullName })}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && { error: true, helperText: errors.email })}
                    />
                    <FormControl variant="outlined" sx={{ minWidth: 230 }}>
                        {errors.bloodGroup && { error: true }}
                        <InputLabel>Blood Group</InputLabel>
                        <Select
                            name="bloodGroup"
                            value={values.bloodGroup}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="">Select Blood Group</MenuItem>
                            <MenuItem value="A+">A +ve</MenuItem>
                            <MenuItem value="A-">A -ve</MenuItem>
                            <MenuItem value="B+">B +ve</MenuItem>
                            <MenuItem value="B-">B -ve</MenuItem>
                            <MenuItem value="AB+">AB +ve</MenuItem>
                            <MenuItem value="AB-">AB -ve</MenuItem>
                            <MenuItem value="O+">O +ve</MenuItem>
                            <MenuItem value="O-">O -ve</MenuItem>
                        </Select>
                        {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        name="mobile"
                        variant="outlined"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        {...(errors.mobile && { error: true, helperText: errors.mobile })}
                    />
                    <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                        <Button variant="contained" color="secondary">
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        dCandidateList: state.dCandidate.list
    };
};

const mapActionToProps = {
    createDCandidate: actions.create,
    updateDCandidate: actions.update,
};

export default connect(mapStateToProps, mapActionToProps)(DCandidatesForm);
