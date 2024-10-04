import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, IconButton, Box, InputAdornment, Checkbox
} from '@mui/material';
import {
  ExpandMore, ExpandLess, RadioButtonUnchecked, Search, Cached
} from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faSort } from '@fortawesome/free-solid-svg-icons';

// I created a sample data for deployments
const deployments = [
  { id: '12FD12', name: 'Mails Server Cert', authority: 'Digicert', algorithm: 'RSA 2048', expiration: 'Aug 31 2024', status: 'active',
    subItems: [
        { name: 'QRS549.esi.com', os: 'Windows', agent: '21', status: 'deployed and bound' }
      ]
   },
  {
    id: '12AD32', name: 'Accounting System', authority: 'Digicert', algorithm: 'RSA 4096', expiration: 'Jul 10 2024', status: 'expiring',
    subItems: [
      { name: 'TRS123.twi.com', os: 'Linux', agent: '23', status: 'deployed' },
      { name: 'TRS125.twi.com', os: 'Windows', agent: '25', status: 'deployed and bound' }
    ]
  },
  { id: '12AD59', name: 'Khalix Dev Servers', authority: 'Sectigo', algorithm: 'RSA 2048', expiration: 'Jul 15 2024', status: 'active',
    subItems: [
        { name: 'wss.poi.com', os: 'Linux', agent: '28', status: 'deployed' },
      ]
   },
  { id: '12AD69', name: 'RMIS System', authority: 'Digicert', algorithm: 'RSA 2048', expiration: 'Mar 14 2024', status: 'expired',
    subItems: [
        { name: 'LIA561.lpi.com', os: 'Linux', agent: '23', status: 'deployed' },
        { name: 'LIA562.lpi.com', os: 'Windows', agent: '27', status: 'deployed and bound' },
        { name: 'LIA567.lpi.com', os: 'Windows', agent: '24', status: 'deployed and bound' }
      ]
   },
  { id: '12AF13', name: 'RMIS System', authority: 'Digicert', algorithm: 'ECC 384', expiration: 'Aug 12 2024', status: 'active' }
];


const DeploymentTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRows, setExpandedRows] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false); 

 
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };


  const toggleRowExpansion = (rowId) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  };

 
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedDeployments = [...deployments].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });


  // This fucntion Collapses the row when the checkbox is unchecked
  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      
      setExpandedRows((prev) => ({
        ...prev,
        [id]: false,
      }));
    } else {
      setSelectedRows([...selectedRows, id]);
      setExpandedRows((prev) => ({
        ...prev,
        [id]: true,
      }));
    }
  };
  

  
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]); 
    } else {
      const allRowIds = sortedDeployments.map((deployment) => deployment.id);
      setSelectedRows(allRowIds); 
    }
    setSelectAll(!selectAll);
  };

  
  const renderStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <FontAwesomeIcon icon={faCircle} style={{ color: 'green', fontSize: '18px'}} />;
      case 'expiring':
        return  <FontAwesomeIcon icon={faCircle} style={{ color: 'orange', fontSize: '18px'}} />;
      case 'expired':
        return <FontAwesomeIcon icon={faCircle} style={{ color: 'red', fontSize: '18px'}} />;
      default:
        return <RadioButtonUnchecked style={{ color: 'grey' }} />;
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Button variant="contained"  style={{ marginRight: '20px', height: '40px',backgroundColor: '#3a3b38', color: '#FFC300' }}>
          + Add New
        </Button>

        <TextField 
         placeholder="Search"
         size="small" 
          onChange={handleSearch}
           value={searchTerm}
            InputProps={{
            startAdornment: (
              <InputAdornment position="start">
             <Search style={{ color: 'grey' }} />
          </InputAdornment>
    ),
  }}
  style={{ width: '400px' }} 
/>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: '#44453c' }}>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll} 
                />
              </TableCell>
              <TableCell></TableCell>
              <TableCell
                onClick={() => handleSort('id')}
                style={{ cursor: 'pointer', lineHeight: '16px', fontWeight: '500', color: '#FFC300' }}
              >
                DEPLOYMENT ID <FontAwesomeIcon icon={faSort} style={{ color: '#FFC300', marginLeft: '5px' }} />
              </TableCell>
              <TableCell
                onClick={() => handleSort('name')}
                style={{ cursor: 'pointer', lineHeight: '16px', fontWeight: '500', color: '#FFC300' }}
              >
                NAME <FontAwesomeIcon icon={faSort} style={{ color: '#FFC300', marginLeft: '5px' }} />
              </TableCell>
              <TableCell style={{ fontWeight: '500', color: '#FFC300' }}>AUTHORITY</TableCell>
              <TableCell style={{ fontWeight: '500', color: '#FFC300' }}>ALGORITHM</TableCell>
              <TableCell style={{ fontWeight: '500', color: '#FFC300' }}>EXPIRATION DATE</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedDeployments
              .filter(
                (deployment) =>
                  deployment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  deployment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  deployment.authority.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  deployment.expiration.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((deployment) => (
                <React.Fragment key={deployment.id}>
                  <TableRow style={{ backgroundColor: expandedRows[deployment.id] ? 'lightgrey' : 'inherit' }}>
  <TableCell>
    <Checkbox
      checked={selectedRows.includes(deployment.id)}
      onChange={() => handleCheckboxChange(deployment.id)}
    />
  </TableCell>
  <TableCell>
    {deployment.subItems && (
      <IconButton
        onClick={() => toggleRowExpansion(deployment.id)}
        style={{
          borderRadius: '50%',
          backgroundColor: 'lightgrey',
          padding: '0px',
        }}
      >
        {expandedRows[deployment.id] ? (
          <ExpandLess style={{ fontWeight: expandedRows[deployment.id] ? 'bold' : 'normal',
            transform: 'rotate(-180deg)'
           }} />
        ) : (
          <ExpandMore
            style={{
              fontWeight: expandedRows[deployment.id] ? 'bold' : 'normal',
              transform: 'rotate(-90deg)'
            }}
          />
        )}
      </IconButton>
    )}
  </TableCell>
  <TableCell>{deployment.id}</TableCell>
  <TableCell>{deployment.name}</TableCell>
  <TableCell>{deployment.authority}</TableCell>
  <TableCell>{deployment.algorithm}</TableCell>
  <TableCell>
    <div 
      style={{
        padding: '5px 10px',
        backgroundColor: '#3a3b38',
        color: '#FFC300',
        display: 'inline-block',
        minWidth: '100px',
        textAlign: 'center',
        borderRadius:'5px'
      }}
    >
      {deployment.expiration}
    </div>
  </TableCell>
  <TableCell>
    <Button
      variant="contained"
      style={{
        backgroundColor: '#FFC300',
        color: 'black',
      }}
    >
      <Cached style={{ color: 'black', marginRight: '5px' }} />
      RENEW
    </Button>
  </TableCell>
  <TableCell>{renderStatusIcon(deployment.status)}</TableCell>
  <TableCell>
    {selectedRows.includes(deployment.id) && (
      <>
        <Button
          variant="contained"
          style={{ marginRight: '5px', backgroundColor: '#FFC300', color: '#3a3b38',fontWeight:'500' }}
        >
          Edit
        </Button>
        <Button variant="contained" style={{ backgroundColor: '#FFC300', color: '#3a3b38',fontWeight:'500' }}>
          Delete
        </Button>
      </>
    )}
  </TableCell>
</TableRow>

                  {expandedRows[deployment.id] &&
                    deployment.subItems?.map((subItem, index) => (
                      <TableRow key={index}  style={{ backgroundColor: '#eff7f4 ' }}>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell><a href={`https://${subItem.name}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue' }}>{subItem.name}</a></TableCell>
                        <TableCell>{subItem.os}</TableCell>
                        <TableCell>{subItem.agent}</TableCell>
                        <TableCell>{subItem.status}</TableCell>
                        <TableCell colSpan={3}></TableCell>
                      </TableRow>
                    ))}
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DeploymentTable;
