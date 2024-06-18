import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const rows = [
    {
        username:"Waqas Qazi",
        name:"name",
        email: "qaziwaqas144@gmail.com",
        age:24,
        gender:"Male"
    },
    {
        username:"Waqas Qazi",
        name:"name",
        email: "qaziwaqas144@gmail.com",
        age:24,
        gender:"Male"
    },
    {
        username:"Waqas Qazi",
        email: "qaziwaqas144@gmail.com",
        age:24,
        gender:"Male"
    }
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper} className='w-75 mx-auto'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="left">Calories</TableCell>
            <TableCell align="left">Fat&nbsp;(g)</TableCell>
            <TableCell align="left">Carbs&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.age}</TableCell>
              <TableCell align="left">{row.gender}</TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
