import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, ButtonGroup } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DCandidateForm from "./DCandidateForm";
import { useToasts } from "react-toast-notifications";

const DCandidates = ({ ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllDCandidates()
    }, []) 

    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteDCandidate(id, () => addToast("Deleted successfully", { appearance: 'info' }))
    }

    return (
        <Paper sx={{ margin: 2, padding: 2 }} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <DCandidateForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ "& .MuiTableCell-head": { fontSize: "1.25rem" } }}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dCandidateList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.fullName}</TableCell>
                                            <TableCell>{record.mobile}</TableCell>
                                            <TableCell>{record.bloodGroup}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                <Button><EditIcon color="primary"
                                                        onClick={() => {
                                                            console.log('Editing candidate with id:', record.id); 
                                                            setCurrentId(record.id);
                                                        }} />
                                                    </Button>

                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    dCandidateList: state.dCandidate.list
})

const mapActionToProps = {
    fetchAllDCandidates: actions.fetchAll,
    deleteDCandidate: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(DCandidates);
