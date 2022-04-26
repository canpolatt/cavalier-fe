import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = ({ messages, loading}) => {
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Surname</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow key={"loading"}>
              <TableCell className="tableCell">Loading...</TableCell>
              <TableCell className="tableCell">Loading...</TableCell>
              <TableCell className="tableCell">Loading...</TableCell>
              <TableCell className="tableCell">Loading...</TableCell>
              <TableCell className="tableCell">Loading...</TableCell>
            </TableRow>
          ) : (
            messages?.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">{row._id}</TableCell>
                <TableCell className="tableCell">{row.name}</TableCell>
                <TableCell className="tableCell">{row.surname}</TableCell>
                <TableCell className="tableCell">{row.email}</TableCell>
                <TableCell className="tableCell truncate max-w-[1rem]">
                  {row.message}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
